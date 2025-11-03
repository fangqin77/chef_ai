package com.example.chef_ai_backend.controller.admin;

import com.example.chef_ai_backend.service.AdminAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin/auth")
@CrossOrigin(origins = "*")
public class AdminAuthController {
    @Autowired
    private AdminAuthService adminAuthService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        return adminAuthService.login(username, password);
    }

    @PostMapping("/logout")
    public Map<String, Object> logout(@RequestHeader("Admin-Token") String token) {
        return adminAuthService.logout(token);
    }
}
