package com.example.chef_ai_backend.interceptor;

import com.example.chef_ai_backend.util.TokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

// 替换 javax.servlet.http -> jakarta.servlet.http
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * 登录校验拦截器：统一从请求头读取 Token/Authorization 并校验。
 * - 放行登录接口
 * - 校验失败返回 401 未授权
 * - 校验通过将 userId/loginUserId 写入请求属性供后续接口使用
 */
@Component
public class TokenInterceptor implements HandlerInterceptor {
    private static final Logger log = LoggerFactory.getLogger(TokenInterceptor.class);
    
    @Autowired
    private TokenUtil tokenUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestUri = request.getRequestURI();
        log.info("当前请求路径：{}", requestUri); // 打印请求路径

        // 若路径是登录接口，直接放行（双重保险）
        if ("/api/user/login".equals(requestUri)) {
            log.info("登录接口，跳过 Token 校验");
            return true;
        }
        
        // 1. 从请求头获取 Token（支持 Token 和 Authorization: Bearer 两种方式）
        String token = request.getHeader("Token");
        if (token == null || token.isEmpty()) {
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null) {
                // 兼容不带 Bearer 前缀的情况（仅临时过渡用）
                if (authHeader.startsWith("Bearer ")) {
                    token = authHeader.substring(7);
                } else {
                    token = authHeader; // 直接使用 Authorization 头的内容作为 token
                }
                log.info("从Authorization头获取Token：{}", token);
            }
        }
        log.info("从请求头获取Token：{}", token);

        // 2. 验证 Token 有效性
        Long userId = tokenUtil.validateToken(token);
        if (userId == null) {
            // Token 无效或过期：返回 401 未授权
            log.warn("Token无效或已过期，token：{}", token);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");
            PrintWriter writer = response.getWriter();
            writer.write("{\"success\":false,\"msg\":\"Token无效或已过期，请重新登录\",\"code\":401}");
            writer.flush();
            writer.close();
            return false; // 拦截请求，不允许访问后续接口
        }

        // 3. Token 有效：将用户ID存入请求属性（后续接口可直接获取）
        request.setAttribute("userId", userId);
        request.setAttribute("loginUserId", userId);
        log.info("Token验证通过，userId：{}", userId);
        return true; // 放行请求
    }
}