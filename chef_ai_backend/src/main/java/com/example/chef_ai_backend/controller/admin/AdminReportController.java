package com.example.chef_ai_backend.controller.admin;

import com.example.chef_ai_backend.service.AdminReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin/community")
@CrossOrigin(origins = "*")
public class AdminReportController {
    @Autowired
    private AdminReportService adminReportService;

    @GetMapping("/reports")
    public Map<String, Object> listReports(@RequestParam(required = false, name = "target_type") String targetType,
                                           @RequestParam(required = false) String status,
                                           @RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "10") int pageSize) {
        return adminReportService.listReports(targetType, status, page, pageSize);
    }

    @PostMapping("/reports/{id}/resolve")
    public Map<String, Object> resolve(@PathVariable("id") Long id,
                                       @RequestBody Map<String, String> body) {
        String decision = body.get("decision");
        return adminReportService.resolve(id, decision);
    }
}
