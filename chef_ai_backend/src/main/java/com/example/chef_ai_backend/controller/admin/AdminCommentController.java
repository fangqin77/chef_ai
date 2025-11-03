package com.example.chef_ai_backend.controller.admin;

import com.example.chef_ai_backend.service.AdminCommentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin/community")
@CrossOrigin(origins = "*")
public class AdminCommentController {
    @Autowired
    private AdminCommentService adminCommentService;

    @GetMapping("/comments")
    public Map<String, Object> listComments(@RequestParam(required = false) Long postId,
                                            @RequestParam(required = false) String keyword,
                                            @RequestParam(required = false, name = "audit_status") String auditStatus,
                                            @RequestParam(required = false) String status,
                                            @RequestParam(defaultValue = "1") int page,
                                            @RequestParam(defaultValue = "10") int pageSize) {
        return adminCommentService.listComments(postId, keyword, auditStatus, status, page, pageSize);
    }

    @PostMapping("/comments/{id}/audit")
    public Map<String, Object> audit(@PathVariable("id") Long id,
                                     @RequestBody Map<String, String> body,
                                     HttpServletRequest request) {
        String action = body.get("action");
        Long adminUserId = (Long) request.getAttribute("adminUserId");
        return adminCommentService.auditComment(id, action, adminUserId);
    }
}
