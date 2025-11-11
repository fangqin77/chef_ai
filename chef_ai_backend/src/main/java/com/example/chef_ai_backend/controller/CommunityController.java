package com.example.chef_ai_backend.controller;

import com.alibaba.fastjson2.JSON;
import com.example.chef_ai_backend.model.Post;
import com.example.chef_ai_backend.model.User;
import com.example.chef_ai_backend.service.CommunityService;
import com.example.chef_ai_backend.service.UserService;
import com.example.chef_ai_backend.util.TokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 社区模块控制器：提供帖子列表、发帖、评论、点赞、收藏、举报等接口。
 * - 列表仅返回审核通过且正常的帖子
 * - 发帖默认写入审核状态（当前配置为发布即通过）
 * - 评论默认待审核
 * - 点赞、收藏为幂等操作
 */
@RestController
@RequestMapping("/api/community")
@CrossOrigin(origins = "*")
public class CommunityController {
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(CommunityController.class);

    private final CommunityService communityService;
    private final UserService userService;

    @Autowired
    private TokenUtil tokenUtil;

    public CommunityController(CommunityService communityService, UserService userService) {
        this.communityService = communityService;
        this.userService = userService;
    }

    // 工具：从拦截器放入的属性中获取当前登录用户ID；若没有则从请求头兜底解析 Token
    private Long currentUserId(HttpServletRequest req) {
        Object v = req.getAttribute("userId");
        if (v instanceof Long) {
            Long id = (Long) v;
            log.info("currentUserId: 来自拦截器的 userId={}", id);
            return id;
        }
        // 兜底：从请求头读取 Token 或 Authorization 并校验
        String token = req.getHeader("Token");
        String tokenSource = "Token";
        if (token == null || token.isEmpty()) {
            String auth = req.getHeader("Authorization");
            if (auth != null) {
                if (auth.startsWith("Bearer ")) token = auth.substring(7);
                else token = auth;
                tokenSource = "Authorization";
            }
        }
        if (token == null || token.isEmpty()) {
            log.warn("currentUserId: 请求头未携带 Token/Authorization");
            return null;
        }
        Long uid = tokenUtil.validateToken(token);
        log.info("currentUserId: 通过{}头校验 token 结果 userId={}", tokenSource, uid);
        return uid;
    }

    // 帖子列表（仅返回审核通过且正常的内容）
    @GetMapping("/posts")
    public Map<String, Object> listPosts(@RequestParam(defaultValue = "1") int page,
                                         @RequestParam(defaultValue = "10") int pageSize,
                                         @RequestParam(required = false) String keyword,
                                         @RequestParam(required = false) Long userId) {
        return communityService.listPosts(keyword, userId, page, pageSize);
    }

    // 查询本人帖子（含待审/驳回）
    @GetMapping("/posts/my")
    public Map<String, Object> listMyPosts(@RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "10") int pageSize,
                                           HttpServletRequest request) {
        Long uid = currentUserId(request);
        return communityService.listMyPosts(uid, page, pageSize);
    }

    // 我的作品视图（含昵称/头像）
    @GetMapping("/posts/my/view")
    public Map<String, Object> listMyPostsView(@RequestParam(defaultValue = "1") int page,
                                               @RequestParam(defaultValue = "10") int pageSize,
                                               HttpServletRequest request) {
        Long uid = currentUserId(request);
        return communityService.listMyPosts(uid, page, pageSize);
    }

    // 帖子详情（非作者仅可见已审核+正常）
    @GetMapping("/posts/{id}")
    public Map<String, Object> getPost(@PathVariable Long id, HttpServletRequest request) {
        Long viewerId = currentUserId(request);
        Post post = communityService.getPostForViewer(id, viewerId);
        if (post == null) {
            return Map.of("success", false, "message", "帖子不存在或不可见");
        }
        User author = userService.getById(post.getUserId());
        return Map.of(
            "success", true,
            "data", Map.of(
                "post", post,
                "author", Map.of(
                    "id", author != null ? author.getId() : null,
                    "nickname", author != null ? author.getNickname() : null,
                    "avatar_url", author != null ? author.getAvatarUrl() : null
                )
            )
        );
    }

    // 发表帖子（默认进入待审核状态）
    @PostMapping("/posts")
    public Map<String, Object> createPost(@RequestBody Map<String, Object> body,
                                          HttpServletRequest request) {
        try {
            log.info("接收参数：{}", body);
            Long uid = currentUserId(request);
            log.info("当前用户 ID：{}", uid);
            if (uid == null) {
                // 更具体的消息，便于前端与排查
                return Map.of(
                    "success", false,
                    "code", 401,
                    "message", "未登录或Token无效，请重新登录后重试"
                );
            }

            String content = (String) body.get("content");
            // 检查内容是否为空
            if (content == null || content.trim().isEmpty()) {
                return Map.of("success", false, "message", "帖子内容不能为空");
            }
            
            // mediaList 前端传数组，这里简单存为 JSON 字符串
            Object mediaList = body.get("mediaList");
            // 确保 mediaList 是数组或空数组
            if (mediaList == null) {
                mediaList = new Object[0]; // 空数组
            }
            
            String mediaJson = com.alibaba.fastjson2.JSON.toJSONString(mediaList);
            Object visibilityObj = body.get("visibility");
            
            // 处理 visibility 参数，确保是整数类型
            Integer visibility = 1; // 默认值
            if (visibilityObj instanceof Number) {
                visibility = ((Number) visibilityObj).intValue();
            } else if (visibilityObj instanceof String) {
                try {
                    visibility = Integer.parseInt((String) visibilityObj);
                } catch (NumberFormatException e) {
                    // 保持默认值
                }
            }
            
            Long id = communityService.createPost(uid, content, mediaJson, visibility);
            return Map.of("success", true, "data", Map.of("id", id, "audit_status", "pending"));
        } catch (Exception e) {
            // 捕获所有异常并返回错误信息
            e.printStackTrace();
            return Map.of("success", false, "message", "发布失败：" + e.getMessage());
        }
    }

    // 删除本人帖子（软删除）
    @DeleteMapping("/posts/{id}")
    public Map<String, Object> deletePost(@PathVariable Long id, HttpServletRequest request) {
        Long uid = currentUserId(request);
        if (uid == null) return Map.of("success", false, "code", 401, "message", "未登录或Token无效");
        boolean ok = communityService.deleteMyPost(uid, id);
        return Map.of("success", ok);
    }

    // 帖子评论列表
    @GetMapping("/posts/{id}/comments")
    public Map<String, Object> listComments(@PathVariable Long id,
                                            @RequestParam(required = false) Long parentId,
                                            @RequestParam(defaultValue = "1") int page,
                                            @RequestParam(defaultValue = "10") int pageSize) {
        return communityService.listComments(id, parentId, page, pageSize);
    }

    // 发表评论（默认待审核）
    @PostMapping("/posts/{id}/comments")
    public Map<String, Object> createComment(@PathVariable Long id,
                                             @RequestBody Map<String, Object> body,
                                             HttpServletRequest request) {
        Long uid = currentUserId(request);
        String content = (String) body.get("content");
        Long parentId = body.get("parentId") == null ? null : ((Number) body.get("parentId")).longValue();
        Long cid = communityService.createComment(uid, id, parentId, content);
        return Map.of("id", cid, "audit_status", "pending");
    }

    // 删除本人评论（软删除）
    @DeleteMapping("/comments/{id}")
    public Map<String, Object> deleteComment(@PathVariable Long id,
                                             HttpServletRequest request) {
        Long uid = currentUserId(request);
        boolean ok = communityService.deleteMyComment(uid, id);
        return Map.of("success", ok);
    }

    // 编辑本人评论
    @PutMapping("/comments/{id}")
    public Map<String, Object> updateComment(@PathVariable Long id,
                                             @RequestBody Map<String, Object> body,
                                             HttpServletRequest request) {
        Long uid = currentUserId(request);
        if (uid == null) return Map.of("success", false, "code", 401, "message", "未登录或Token无效");
        String content = (String) body.get("content");
        boolean ok = communityService.updateMyComment(uid, id, content);
        return Map.of("success", ok);
    }

    // 点赞
    @PostMapping("/posts/{id}/like")
    public Map<String, Object> like(@PathVariable Long id, HttpServletRequest request) {
        Long uid = currentUserId(request);
        boolean ok = communityService.likePost(uid, id);
        return Map.of("success", ok);
    }

    // 取消点赞
    @DeleteMapping("/posts/{id}/like")
    public Map<String, Object> unlike(@PathVariable Long id, HttpServletRequest request) {
        Long uid = currentUserId(request);
        boolean ok = communityService.cancelLikePost(uid, id);
        return Map.of("success", ok);
    }

    // 收藏/取消收藏
    @PostMapping("/posts/{id}/favorite")
    public Map<String, Object> favorite(@PathVariable Long id, HttpServletRequest request) {
        Long uid = currentUserId(request);
        boolean ok = communityService.favoritePost(uid, id);
        return Map.of("success", ok);
    }
    @DeleteMapping("/posts/{id}/favorite")
    public Map<String, Object> unFavorite(@PathVariable Long id, HttpServletRequest request) {
        Long uid = currentUserId(request);
        boolean ok = communityService.cancelFavoritePost(uid, id);
        return Map.of("success", ok);
    }

    // 举报
    @PostMapping("/reports")
    public Map<String, Object> report(@RequestBody Map<String, Object> body,
                                      HttpServletRequest request) {
        Long uid = currentUserId(request);
        String targetType = (String) body.get("targetType"); // post|comment
        Long targetId = ((Number) body.get("targetId")).longValue();
        String reasonCode = (String) body.get("reasonCode");
        String text = (String) body.get("text");
        communityService.report(targetType, targetId, uid, reasonCode, text);
        return Map.of("status", "pending");
    }

    // 编辑社区帖子（仅作者可编辑）
    @PutMapping("/posts/{id}")
    public Map<String, Object> updatePost(@PathVariable Long id,
                                          @RequestBody Map<String, Object> body,
                                          HttpServletRequest request) {
        Long uid = currentUserId(request);
        if (uid == null) return Map.of("success", false, "message", "未登录");
        String content = (String) body.get("content");
        Object mediaList = body.get("mediaList");
        String mediaJson = com.alibaba.fastjson2.JSON.toJSONString(mediaList == null ? new Object[0] : mediaList);
        Integer visibility = 1;
        Object visibilityObj = body.get("visibility");
        if (visibilityObj instanceof Number) visibility = ((Number) visibilityObj).intValue();
        else if (visibilityObj instanceof String) {
            try { visibility = Integer.parseInt((String) visibilityObj); } catch (Exception ignored) {}
        }
        boolean ok = communityService.updatePost(uid, id, content, mediaJson, visibility);
        return Map.of("success", ok);
    }

    // 获取当前用户收藏的帖子列表
    @GetMapping("/posts/favorites")
    public Map<String, Object> listFavoritePosts(@RequestParam(defaultValue = "1") int page,
                                                 @RequestParam(defaultValue = "20") int pageSize,
                                                 HttpServletRequest request) {
        Long uid = currentUserId(request);
        if (uid == null) return Map.of("success", false, "message", "未登录");
        return communityService.listFavoritePosts(uid, page, pageSize);
    }

    // 获取当前用户发表的评论列表
    @GetMapping("/comments/my")
    public Map<String, Object> listMyComments(@RequestParam(defaultValue = "1") int page,
                                              @RequestParam(defaultValue = "20") int pageSize,
                                              HttpServletRequest request) {
        Long uid = currentUserId(request);
        if (uid == null) return Map.of("success", false, "message", "未登录");
        return communityService.listMyComments(uid, page, pageSize);
    }
}