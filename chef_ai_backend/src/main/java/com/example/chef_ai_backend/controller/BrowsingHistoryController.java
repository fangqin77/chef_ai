package com.example.chef_ai_backend.controller;

import com.example.chef_ai_backend.service.BrowsingHistoryService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/browsing")
@CrossOrigin(origins = "*")
public class BrowsingHistoryController {

    private final BrowsingHistoryService browsingHistoryService;

    public BrowsingHistoryController(BrowsingHistoryService browsingHistoryService) {
        this.browsingHistoryService = browsingHistoryService;
    }

    @PostMapping("/history/record")
    public Map<String, Object> recordBrowsing(@RequestParam Long postId, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "未登录");
        }
        browsingHistoryService.recordBrowsing(userId, postId);
        return Map.of("success", true);
    }

    @GetMapping("/history")
    public Map<String, Object> getUserBrowsingHistory(@RequestParam(defaultValue = "1") int page,
                                                      @RequestParam(defaultValue = "20") int pageSize,
                                                      HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            // 兜底兼容：从请求头或查询参数读取 token
            String token = request.getHeader("Token");
            if (token == null || token.isEmpty()) {
                String xToken = request.getHeader("X-Token");
                String lowerToken = request.getHeader("token");
                if (xToken != null && !xToken.isEmpty()) token = xToken;
                else if (lowerToken != null && !lowerToken.isEmpty()) token = lowerToken;
            }
            if ((token == null || token.isEmpty())) {
                String auth = request.getHeader("Authorization");
                if (auth != null && !auth.isEmpty()) token = auth.startsWith("Bearer ") ? auth.substring(7) : auth;
            }
            if ((token == null || token.isEmpty())) {
                String queryToken = request.getParameter("token");
                if (queryToken != null && !queryToken.isEmpty()) token = queryToken;
            }
            if (token == null || token.isEmpty()) {
                return Map.of("success", false, "message", "未登录");
            }
        }
        return browsingHistoryService.getUserBrowsingHistory(userId, page, pageSize);
    }

    @DeleteMapping("/history")
    public Map<String, Object> clearBrowsingHistory(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "未登录");
        }
        boolean ok = browsingHistoryService.clearBrowsingHistory(userId);
        return Map.of("success", ok);
    }
}