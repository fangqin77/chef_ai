package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.AuditLogMapper;
import com.example.chef_ai_backend.mapper.CommunityMapper;
import com.example.chef_ai_backend.model.AuditLog;
import com.example.chef_ai_backend.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminCommentService {
    @Autowired
    private CommunityMapper communityMapper;
    @Autowired
    private AuditLogMapper auditLogMapper;

    public Map<String, Object> listComments(Long postId, String keyword, String auditStatus, String status, int page, int pageSize) {
        int offset = (Math.max(page, 1) - 1) * Math.max(pageSize, 1);
        java.util.List<java.util.Map<String, Object>> list = communityMapper.listAdminCommentsView(postId, keyword, auditStatus, status, offset, pageSize);
        int total = communityMapper.countAdminComments(postId, keyword, auditStatus, status);
        Map<String, Object> data = new HashMap<>();
        data.put("list", list);
        data.put("total", total);
        data.put("page", page);
        data.put("pageSize", pageSize);
        return Map.of("success", true, "data", data);
    }

    @Transactional
    public Map<String, Object> auditComment(Long commentId, String action, Long operatorId) {
        String to = switch (action) { case "approve" -> "approved"; case "reject" -> "rejected"; default -> null; };
        if (to == null) throw new IllegalArgumentException("非法审核动作");
        int updated = communityMapper.updateCommentAuditStatus(commentId, null, to);
        if (updated == 0) {
            // 幂等视为成功
        }
        AuditLog log = new AuditLog();
        log.setTargetType("comment");
        log.setTargetId(commentId);
        log.setAction(action);
        log.setOperatorId(operatorId);
        auditLogMapper.insert(log);
        return Map.of("success", true, "data", Map.of("newAuditStatus", to));
    }
}
