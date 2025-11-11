package com.example.chef_ai_backend.controller;

import com.example.chef_ai_backend.model.Post;
import com.example.chef_ai_backend.model.User;
import com.example.chef_ai_backend.service.CommunityService;
import com.example.chef_ai_backend.service.UserService;
import com.example.chef_ai_backend.util.TokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/community")
@CrossOrigin(origins = "*")
public class CommunityExtraController {

    private final CommunityService communityService;
    private final UserService userService;

    @Autowired
    private TokenUtil tokenUtil;

    public CommunityExtraController(CommunityService communityService, UserService userService) {
        this.communityService = communityService;
        this.userService = userService;
    }

    private Long currentUserId(HttpServletRequest req) {
        Object v = req.getAttribute("userId");
        if (v instanceof Long) return (Long) v;
        String token = req.getHeader("Token");
        if (token == null || token.isEmpty()) {
            String auth = req.getHeader("Authorization");
            if (auth != null) token = auth.startsWith("Bearer ") ? auth.substring(7) : auth;
        }
        if (token == null || token.isEmpty()) return null;
        return tokenUtil.validateToken(token);
    }

    // 通过评论ID查看对应帖子信息（用于“我的评论”查看帖子）
    @GetMapping("/comments/{id}/post")
    public Map<String, Object> getPostByComment(@PathVariable Long id,
                                                HttpServletRequest request) {
        Long uid = currentUserId(request);
        if (uid == null) return Map.of("success", false, "message", "未登录");
        Post post = communityService.getPostByComment(id, uid);
        if (post == null) return Map.of("success", false, "message", "帖子不存在或不可见");
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
}
