package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.NotificationMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NotificationService {
    private final NotificationMapper notificationMapper;

    public NotificationService(NotificationMapper notificationMapper) {
        this.notificationMapper = notificationMapper;
    }

    private Map<String, Object> toPageResult(List<?> list, int total, int page, int pageSize) {
        Map<String, Object> r = new HashMap<>();
        r.put("list", list);
        r.put("total", total);
        r.put("page", page);
        r.put("pageSize", pageSize);
        return r;
    }

    public Map<String, Object> listNotifications(Long userId, int page, int pageSize) {
        int safePage = Math.max(page, 1);
        int safeSize = Math.max(pageSize, 1);
        int offset = (safePage - 1) * safeSize;
        List<Map<String, Object>> list = notificationMapper.listUserPostCommentNotifications(userId, offset, safeSize);
        int total = notificationMapper.countUserPostCommentNotifications(userId);
        return toPageResult(list, total, safePage, safeSize);
    }
}
