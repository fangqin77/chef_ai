package com.example.chef_ai_backend.controller.admin;

import com.example.chef_ai_backend.service.AdminCommunityService;
import com.example.chef_ai_backend.service.AdminCommentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin/community/comments")
@CrossOrigin(origins = "*")
public class AdminCommentController {

    @Autowired
    private AdminCommunityService adminCommunityService;
    @Autowired
    private AdminCommentService adminCommentService;

    // 评论列表（管理端）
    @GetMapping("")
    public Map<String, Object> listComments(@RequestParam(required = false) Long postId,
                                            @RequestParam(required = false) String keyword,
                                            @RequestParam(required = false, name = "audit_status") String auditStatus,
                                            @RequestParam(required = false) String status,
                                            @RequestParam(defaultValue = "1") int page,
                                            @RequestParam(defaultValue = "10") int pageSize) {
        return adminCommentService.listComments(postId, keyword, auditStatus, status, page, pageSize);
    }

    // 评论审核（管理端）
    @PostMapping("/{id}/audit")
    public Map<String, Object> audit(@PathVariable("id") Long id,
                                     @RequestBody Map<String, String> body,
                                     HttpServletRequest request) {
        String action = body.get("action");
        Long adminUserId = (Long) request.getAttribute("adminUserId");
        return adminCommentService.auditComment(id, action, adminUserId);
    }

    // 管理端：硬删除评论（真实删除数据库记录）
    @DeleteMapping("/{id}")
    public Map<String, Object> hardDeleteComment(@PathVariable("id") Long id, HttpServletRequest request) {
        Long adminUserId = (Long) request.getAttribute("adminUserId");
        return adminCommunityService.deleteCommentHard(id, adminUserId);
    }
}
