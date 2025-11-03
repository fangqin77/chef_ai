package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.CommunityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminReportService {
    @Autowired
    private CommunityMapper communityMapper;

    public Map<String, Object> listReports(String targetType, String status, int page, int pageSize) {
        int offset = (Math.max(page, 1) - 1) * Math.max(pageSize, 1);
        List<Map<String, Object>> list = communityMapper.listAdminReports(targetType, status, offset, pageSize);
        int total = communityMapper.countAdminReports(targetType, status);
        Map<String, Object> data = new HashMap<>();
        data.put("list", list);
        data.put("total", total);
        data.put("page", page);
        data.put("pageSize", pageSize);
        return Map.of("success", true, "data", data);
    }

    @Transactional
    public Map<String, Object> resolve(Long reportId, String decision) {
        String to = switch (decision) { case "approved" -> "approved"; case "rejected" -> "rejected"; default -> null; };
        if (to == null) throw new IllegalArgumentException("非法举报处理结果");
        communityMapper.updateReportStatus(reportId, to);
        // 可选联动：approved 时对目标内容进行 shadow 等处置（此处留给二期实现）
        return Map.of("success", true, "data", Map.of("status", to));
    }
}
