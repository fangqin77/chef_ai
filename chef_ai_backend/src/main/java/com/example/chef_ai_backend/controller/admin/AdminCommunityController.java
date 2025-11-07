package com.example.chef_ai_backend.controller.admin;

import com.example.chef_ai_backend.service.AdminCommunityService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 管理端社区控制器：提供帖子管理的查询与审核接口。
 * - 支持按审核状态/用户/关键词分页查询
 * - 审核操作支持 approve/reject
 */
@RestController
@RequestMapping("/admin/community")
@CrossOrigin(origins = "*")
public class AdminCommunityController {
    @Autowired
    private AdminCommunityService adminCommunityService;

    @GetMapping("/posts")
    public Map<String, Object> listPosts(@RequestParam(required = false) String keyword,
                                         @RequestParam(required = false, name = "audit_status") String auditStatus,
                                         @RequestParam(required = false) String status,
                                         @RequestParam(required = false) Long userId,
                                         @RequestParam(defaultValue = "1") int page,
                                         @RequestParam(defaultValue = "10") int pageSize) {
        return adminCommunityService.listPosts(keyword, auditStatus, status, userId, page, pageSize);
    }

    @GetMapping("/posts/{id}")
    public Map<String, Object> getPost(@PathVariable Long id) {
        return adminCommunityService.getPost(id);
    }

    @PostMapping("/posts/{id}/audit")
    public Map<String, Object> audit(@PathVariable Long id,
                                     @RequestBody Map<String, String> body,
                                     HttpServletRequest request) {
        String action = body.get("action");
        Long adminUserId = (Long) request.getAttribute("adminUserId");
        return adminCommunityService.auditPost(id, action, adminUserId);
    }
}
