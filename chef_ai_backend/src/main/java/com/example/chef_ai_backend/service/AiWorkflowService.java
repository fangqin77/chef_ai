package com.example.chef_ai_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * Dify 对话流服务：负责与 Dify chat-messages 交互。
 * 预留配置参数（请在环境变量或配置文件中填写）：
 * - DIFY_API_KEY: Dify 的 API Key（示例：app-xxxxx）
 * - DIFY_CHAT_URL: 对话流端点（示例：https://dify.aipfuture.com/v1/chat-messages）
 * - DIFY_TIMEOUT_MS: 超时时间（毫秒，默认 15000）
 */
@Service
public class AiWorkflowService {

    @Value("${dify.apiKey:}")
    private String difyApiKey; // 预留：DIFY_API_KEY

    @Value("${dify.chatUrl:}")
    private String difyChatUrl; // 预留：DIFY_CHAT_URL（chat-messages 端点）

    @Value("${dify.timeoutMs:15000}")
    private int difyTimeoutMs; // 预留：DIFY_TIMEOUT_MS

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * 执行工作流
     * @param userId 当前用户ID（用于风控与限流）
     * @param query  前端问题/输入
     * @param lang   语言（如 zh/en），可为空
     * @param context 上下文（任意对象）
     * @param variables 业务变量（任意对象）
     * @return 统一返回结构
     */
    public Map<String, Object> executeWorkflow(Long userId, String query, String lang, Object context, Object variables) {
        if (difyApiKey == null || difyApiKey.isEmpty() || difyChatUrl == null || difyChatUrl.isEmpty()) {
            return Map.of(
                    "success", false,
                    "message", "Dify 配置缺失，请填写 dify.apiKey 与 dify.chatUrl"
            );
        }
        if (query == null || query.isEmpty()) {
            return Map.of("success", false, "message", "参数 query 不能为空");
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + difyApiKey);

        Map<String, Object> payload = new HashMap<>();
        // Dify 对话流标准输入
        payload.put("query", query);               // 必填：用户问题
        payload.put("response_mode", "blocking"); // 同步阻塞返回
        payload.put("user", String.valueOf(userId));
        // inputs 可选：用于传递结构化变量
        Map<String, Object> inputs = new HashMap<>();
        // 适配 Dify 应用表单：部分实例要求在 inputs 中提供必填字段 userInput
        inputs.put("userInput", query);
        inputs.put("lang", lang);
        inputs.put("context", context);
        inputs.put("variables", variables);
        payload.put("inputs", inputs);
        
        // 可选：conversation_id（从 context 或 variables 中取），仅当为合法 UUID 时传递
        if (context instanceof Map<?, ?> ctx && ctx.containsKey("conversationId")) {
            Object convId = ((Map<?, ?>) ctx).get("conversationId");
            if (convId != null) {
                String convStr = String.valueOf(convId);
                // 简单 UUID 校验（8-4-4-4-12 十六进制）
                if (convStr.matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")) {
                    payload.put("conversation_id", convStr);
                }
            }
        }

        try {
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
            Map resp = restTemplate.postForObject(difyChatUrl, entity, Map.class);
            return Map.of("success", true, "data", resp);
        } catch (Exception e) {
            return Map.of("success", false, "message", "调用 Dify 失败: " + e.getMessage());
        }
    }
}
