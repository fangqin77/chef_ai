package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.AuditLogMapper;
import com.example.chef_ai_backend.mapper.CommunityMapper;
import com.example.chef_ai_backend.model.AuditLog;
import com.example.chef_ai_backend.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminCommunityService {
    @Autowired
    private CommunityMapper communityMapper;
    @Autowired
    private AuditLogMapper auditLogMapper;

    public Map<String, Object> listPosts(String keyword, String auditStatus, String status, Long userId, int page, int pageSize) {
        int offset = (Math.max(page, 1) - 1) * Math.max(pageSize, 1);
        List<Post> list = communityMapper.listAdminPosts(keyword, auditStatus, status, userId, offset, pageSize);
        int total = communityMapper.countAdminPosts(keyword, auditStatus, status, userId);
        Map<String, Object> data = new HashMap<>();
        data.put("list", list);
        data.put("total", total);
        data.put("page", page);
        data.put("pageSize", pageSize);
        return Map.of("success", true, "data", data);
    }

    public Map<String, Object> getPost(Long id) {
        Post p = communityMapper.getPostById(id);
        return Map.of("success", true, "data", p);
    }

    @Transactional
    public Map<String, Object> auditPost(Long postId, String action, Long operatorId) {
        String to = switch (action) { case "approve" -> "approved"; case "reject" -> "rejected"; default -> null; };
        if (to == null) throw new IllegalArgumentException("非法审核动作");
        int updated = communityMapper.updatePostAuditStatus(postId, null, to);
        if (updated == 0) {
            // 幂等：视为成功
        }
        AuditLog log = new AuditLog();
        log.setTargetType("post");
        log.setTargetId(postId);
        log.setAction(action);
        log.setReason(null);
        log.setOperatorId(operatorId);
        auditLogMapper.insert(log);
        return Map.of("success", true, "data", Map.of("newAuditStatus", to));
    }
}
