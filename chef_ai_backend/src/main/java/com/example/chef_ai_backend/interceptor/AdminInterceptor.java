package com.example.chef_ai_backend.interceptor;

import com.example.chef_ai_backend.util.AdminTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.PrintWriter;

@Component
public class AdminInterceptor implements HandlerInterceptor {
    private static final Logger log = LoggerFactory.getLogger(AdminInterceptor.class);

    @Autowired
    private AdminTokenUtil adminTokenUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String uri = request.getRequestURI();
        // 预检请求直接放行
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return false; // 不继续进入后续链路
        }
        if ("/admin/auth/login".equals(uri)) {
            return true;
        }
        String token = request.getHeader("Admin-Token");
        Long adminUserId = adminTokenUtil.validate(token);
        if (adminUserId == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");
            PrintWriter writer = response.getWriter();
            writer.write("{\"success\":false,\"message\":\"未登录或Token无效\",\"code\":401}");
            writer.flush();
            writer.close();
            return false;
        }
        request.setAttribute("adminUserId", adminUserId);
        return true;
    }
}
