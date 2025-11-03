package com.example.chef_ai_backend.controller;

import com.example.chef_ai_backend.model.User;
import com.example.chef_ai_backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) { this.userService = userService; }

    // 获取用户信息（需要 Token）
    @GetMapping("/info")
    public Map<String, Object> getUserInfo(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("loginUserId");
        User user = userService.getById(userId);
        return Map.of("success", true, "data", user);
    }

    // 更新用户信息（允许更新昵称/地区/电话等：根据你的表字段调整）
    @PostMapping("/update")
    public Map<String, Object> updateUserInfo(HttpServletRequest request,
                                              @RequestBody User payload) {
        Long userId = (Long) request.getAttribute("loginUserId");
        payload.setId(userId);
        userService.updateUserSelective(payload);
        return Map.of("success", true, "msg", "更新成功");
    }

    // 更新头像
    @PostMapping("/update-avatar")
    public Map<String, Object> updateAvatar(HttpServletRequest request,
                                            @RequestBody Map<String, String> body) {
        Long userId = (Long) request.getAttribute("loginUserId");
        String avatar = body.get("avatar");
        userService.updateAvatar(userId, avatar);
        return Map.of("success", true, "msg", "头像更新成功");
    }
}