package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.AdminUserMapper;
import com.example.chef_ai_backend.model.AdminUser;
import com.example.chef_ai_backend.util.AdminTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminAuthService {
    @Autowired
    private AdminUserMapper adminUserMapper;
    @Autowired
    private AdminTokenUtil adminTokenUtil;

    public Map<String, Object> login(String username, String password) {
        AdminUser user = adminUserMapper.selectByUsername(username);
        if (user == null) throw new RuntimeException("用户不存在或已禁用");
        // 简版密码校验（生产建议改为 BCrypt）
        if (!user.getPasswordHash().equals(password)) {
            throw new RuntimeException("用户名或密码错误");
        }
        String token = adminTokenUtil.generate(user.getId());
        Map<String, Object> data = new HashMap<>();
        data.put("adminToken", token);
        data.put("role", user.getRole());
        data.put("user", Map.of("id", user.getId(), "username", user.getUsername()));
        return Map.of("success", true, "data", data);
    }

    public Map<String, Object> logout(String token) {
        adminTokenUtil.invalidate(token);
        return Map.of("success", true);
    }
}
