package com.example.chef_ai_backend.controller;

import com.alibaba.fastjson2.JSON;
import com.example.chef_ai_backend.model.Post;
import com.example.chef_ai_backend.service.CommunityService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/community")
@CrossOrigin(origins = "*")
public class CommunityController {
    private final CommunityService communityService;

    public CommunityController(CommunityService communityService) {
        this.communityService = communityService;
    }

    // 工具：从拦截器放入的属性中获取当前登录用户ID
    private Long currentUserId(HttpServletRequest req) {
        Object v = req.getAttribute("loginUserId");
        return v == null ? null : (Long) v;
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
    @GetMapping("/my/posts")
    public Map<String, Object> listMyPosts(@RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "10") int pageSize,
                                           HttpServletRequest request) {
        Long uid = currentUserId(request);
        return communityService.listMyPosts(uid, page, pageSize);
    }

    // 帖子详情（非作者仅可见已审核+正常）
    @GetMapping("/posts/{id}")
    public Post getPost(@PathVariable Long id, HttpServletRequest request) {
        Long viewerId = currentUserId(request);
        return communityService.getPostForViewer(id, viewerId);
    }

    // 发表帖子（默认进入待审核状态）
    @PostMapping("/posts")
    public Map<String, Object> createPost(@RequestBody Map<String, Object> body,
                                          HttpServletRequest request) {
        Long uid = currentUserId(request);
        String content = (String) body.get("content");
        // mediaList 前端传数组，这里简单存为 JSON 字符串
        String mediaJson = com.alibaba.fastjson2.JSON.toJSONString(body.get("mediaList"));
        Integer visibility = (Integer) body.getOrDefault("visibility", 1);
        Long id = communityService.createPost(uid, content, mediaJson, visibility);
        return Map.of("id", id, "audit_status", "pending");
    }

    // 删除本人帖子（软删除）
    @DeleteMapping("/posts/{id}")
    public Map<String, Object> deletePost(@PathVariable Long id, HttpServletRequest request) {
        Long uid = currentUserId(request);
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
                                             @RequestParam Long postId,
                                             HttpServletRequest request) {
        Long uid = currentUserId(request);
        boolean ok = communityService.deleteMyComment(uid, id, postId);
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
}