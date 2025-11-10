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
        List<BrowsingHistory> list = browsingHistoryMapper.listUserBrowsingHistory(userId, offset, pageSize);
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