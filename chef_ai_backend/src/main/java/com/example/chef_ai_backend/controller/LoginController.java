package com.example.chef_ai_backend.controller;

import com.example.chef_ai_backend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private LoginService loginService;

    /**
     * 微信登录接口
     * @param request 包含code的请求体
     * @return 登录结果，包含token和用户信息
     */
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {
        String code = request.get("code");
        if (code == null || code.isEmpty()) {
            throw new IllegalArgumentException("缺少code参数");
        }
        return loginService.loginWithWechat(code);
    }
}