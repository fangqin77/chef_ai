package com.example.chef_ai_backend.controller;

import com.example.chef_ai_backend.service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/notifications")
    public Map<String, Object> getUserNotifications(@RequestParam(defaultValue = "1") int page,
                                                    @RequestParam(defaultValue = "20") int pageSize,
                                                    HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return Map.of("success", false, "message", "未登录");
        Map<String, Object> data = notificationService.listNotifications(userId, page, pageSize);
        data.put("success", true);
        return data;
    }
}
