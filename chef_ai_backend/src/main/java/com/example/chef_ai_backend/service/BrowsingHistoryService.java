package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.BrowsingHistoryMapper;
import com.example.chef_ai_backend.model.BrowsingHistory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BrowsingHistoryService {
    private final BrowsingHistoryMapper browsingHistoryMapper;

    public BrowsingHistoryService(BrowsingHistoryMapper browsingHistoryMapper) {
        this.browsingHistoryMapper = browsingHistoryMapper;
    }

    public void recordBrowsing(Long userId, Long postId) {
        browsingHistoryMapper.insertOrUpdate(userId, postId);
    }

    public Map<String, Object> getUserBrowsingHistory(Long userId, int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        java.util.List<java.util.Map<String, Object>> list = browsingHistoryMapper.listUserBrowsingHistory(userId, offset, pageSize);
        // 将帖子图片媒体JSON解析为数组，方便前端使用
        for (java.util.Map<String, Object> item : list) {
            Object mediaJson = item.get("post_media_json");
            if (mediaJson instanceof String) {
                try {
                    java.util.List<Object> medias = com.alibaba.fastjson2.JSON.parseArray((String) mediaJson);
                    item.put("post_media_list", medias);
                } catch (Exception ignore) {}
            }
        }
        int total = browsingHistoryMapper.countUserBrowsingHistory(userId);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("total", total);
        result.put("page", page);
        result.put("pageSize", pageSize);
        return result;
    }

    public boolean clearBrowsingHistory(Long userId) {
        return browsingHistoryMapper.clearUserBrowsingHistory(userId) > 0;
    }
}