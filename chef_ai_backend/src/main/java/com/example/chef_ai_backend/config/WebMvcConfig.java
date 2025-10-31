package com.example.chef_ai_backend.config;

import com.example.chef_ai_backend.interceptor.TokenInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web 配置：注册拦截器，指定拦截规则
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Autowired
    private TokenInterceptor tokenInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenInterceptor)
                .addPathPatterns("/api/**") // 拦截所有 /api 开头的接口（需要登录的接口）
                .excludePathPatterns("/api/user/login") // 放行登录接口（无需 Token）
                .excludePathPatterns("/api/logout") // 放行退出登录接口（虽然需要Token，但由业务逻辑处理）
                .excludePathPatterns("/api/user/register") // 放行注册接口（如有）
                .excludePathPatterns("/api/common/**") // 放行公共接口（如验证码、图片上传等）
                .excludePathPatterns("/api/recipes/**") // 放行菜谱相关接口（允许未登录用户查看菜谱）
                .excludePathPatterns("/api/home"); // 放行首页接口（允许未登录用户查看首页内容）
    }
}