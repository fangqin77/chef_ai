package com.example.chef_ai_backend.controller;

import com.example.chef_ai_backend.service.LoginService;
import com.example.chef_ai_backend.util.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")  // 允许所有来源跨域（开发环境临时使用）
public class LoginController {

    @Autowired
    private LoginService loginService;
    
    @Autowired
    private TokenUtil tokenUtil;

    /**
     * 微信登录接口
     * @param request 包含code的请求体
     * @return 登录结果，包含token和用户信息
     */
    @PostMapping("/user/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {
        String code = request.get("code");
        if (code == null || code.isEmpty()) {
            throw new IllegalArgumentException("缺少code参数");
        }
        return loginService.loginWithWechat(code);
    }
    
    /**
     * 退出登录：注销 Token
     * @param token 请求头中的 Token
     * @return 退出结果
     */
    @PostMapping("/logout")
    public Map<String, Object> logout(@RequestHeader("Token") String token) {
        tokenUtil.invalidateToken(token);
        // 构造返回结果
        Map<String, Object> result = Map.of("success", true, "msg", "退出登录成功");
        return result;
    }
}