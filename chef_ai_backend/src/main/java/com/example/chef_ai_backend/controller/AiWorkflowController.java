package com.example.chef_ai_backend.controller;

import com.example.chef_ai_backend.service.AiWorkflowService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Dify 工作流代理控制器：
 * - 前端调用本接口，后端携带密钥转发到 Dify 工作流
 * - 目的：避免在前端暴露 Dify API Key，并统一做鉴权/限流/日志
 */
@RestController
@RequestMapping("/api/ai/workflow")
@CrossOrigin(origins = "*")
public class AiWorkflowController {

    @Autowired
    private AiWorkflowService aiWorkflowService;

    /**
     * 执行工作流
     * 前端请求示例：
     * POST /api/ai/workflow/execute
     * Body: {
     *   "query": "今天吃什么？",
     *   "lang": "zh",
     *   "context": {"page": "home"},
     *   "variables": {"city": "深圳"}
     * }
     * 说明：
     * - 需要登录（从拦截器读取 userId），用于风控与限流
     * - 后端将参数映射到 Dify 工作流输入，并返回简化或原始结果
     */
    @PostMapping("/execute")
    public Map<String, Object> execute(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "未登录");
        }

        String query = body == null ? null : (String) body.get("query");
        String lang = body == null ? null : (String) body.get("lang");
        Object context = body == null ? null : body.get("context");
        Object variables = body == null ? null : body.get("variables");

        Map<String, Object> result = aiWorkflowService.executeWorkflow(userId, query, lang, context, variables);
        return result;
    }
}
