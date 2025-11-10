package com.example.chef_ai_backend.controller;

import com.example.chef_ai_backend.service.UserFollowService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user/follows")
@CrossOrigin(origins = "*")
public class UserFollowController {

    private final UserFollowService followService;

    public UserFollowController(UserFollowService followService) {
        this.followService = followService;
    }

    @PostMapping("/{targetId}")
    public Map<String,Object> follow(@PathVariable("targetId") Long targetId, HttpServletRequest request){
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return Map.of("success", false, "message", "未登录");
        return followService.follow(userId, targetId);
    }

    @DeleteMapping("/{targetId}")
    public Map<String,Object> unfollow(@PathVariable("targetId") Long targetId, HttpServletRequest request){
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return Map.of("success", false, "message", "未登录");
        return followService.unfollow(userId, targetId);
    }

    @GetMapping("/stats")
    public Map<String,Object> stats(HttpServletRequest request){
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return Map.of("success", false, "message", "未登录");
        return followService.stats(userId);
    }

    @GetMapping("/following")
    public Map<String,Object> following(@RequestParam(defaultValue = "1") int page,
                                        @RequestParam(defaultValue = "20") int pageSize,
                                        HttpServletRequest request){
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return Map.of("success", false, "message", "未登录");
        return followService.followingList(userId, page, pageSize);
    }

    @GetMapping("/followers")
    public Map<String,Object> followers(@RequestParam(defaultValue = "1") int page,
                                        @RequestParam(defaultValue = "20") int pageSize,
                                        HttpServletRequest request){
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return Map.of("success", false, "message", "未登录");
        return followService.followersList(userId, page, pageSize);
    }

    @GetMapping("/check/{targetId}")
    public Map<String,Object> check(@PathVariable("targetId") Long targetId, HttpServletRequest request){
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return Map.of("success", false, "message", "未登录");
        return followService.isFollowing(userId, targetId);
    }
}