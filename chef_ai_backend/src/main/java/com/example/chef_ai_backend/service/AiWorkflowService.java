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
 * Dify 工作流服务：负责与 Dify API 交互。
 * 预留配置参数（请在环境变量或配置文件中填写）：
 * - DIFY_API_KEY: Dify 的 API Key（示例：sk-xxxxx）
 * - DIFY_WORKFLOW_URL: 工作流执行 URL（示例：https://api.dify.ai/v1/workflows/<workflow_id>/execute）
 * - DIFY_TIMEOUT_MS: 超时时间（毫秒，默认 15000）
 */
@Service
public class AiWorkflowService {

    @Value("${dify.apiKey:}")
    private String difyApiKey; // 预留：DIFY_API_KEY

    @Value("${dify.workflowUrl:}")
    private String difyWorkflowUrl; // 预留：DIFY_WORKFLOW_URL

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
        if (difyApiKey == null || difyApiKey.isEmpty() || difyWorkflowUrl == null || difyWorkflowUrl.isEmpty()) {
            return Map.of(
                    "success", false,
                    "message", "Dify 配置缺失，请填写 dify.apiKey 与 dify.workflowUrl"
            );
        }
        if (query == null || query.isEmpty()) {
            return Map.of("success", false, "message", "参数 query 不能为空");
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + difyApiKey);

        Map<String, Object> payload = new HashMap<>();
        // 预留：将你的工作流输入变量名映射到这里
        // 示例：inputs.query, inputs.lang, inputs.context, inputs.variables
        Map<String, Object> inputs = new HashMap<>();
        inputs.put("query", query);           // 必填：用户问题
        inputs.put("lang", lang);             // 可选：语言
        inputs.put("context", context);       // 可选：上下文（如 page=home）
        inputs.put("variables", variables);   // 可选：业务变量（如城市/偏好）

        payload.put("inputs", inputs);
        payload.put("response_mode", "blocking"); // 同步阻塞返回
        payload.put("user", String.valueOf(userId)); // 标识用户（便于 Dify 审计）

        try {
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
            Map resp = restTemplate.postForObject(difyWorkflowUrl, entity, Map.class);
            // 预留：根据你的工作流返回结构进行提取与简化
            return Map.of("success", true, "data", resp);
        } catch (Exception e) {
            return Map.of("success", false, "message", "调用 Dify 失败: " + e.getMessage());
        }
    }
}
