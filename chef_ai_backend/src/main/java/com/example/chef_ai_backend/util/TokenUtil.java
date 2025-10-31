package com.example.chef_ai_backend.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import java.util.Base64;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * Token 工具类：生成 Base64 Token + Redis 存储/验证/注销
 */
@Component
public class TokenUtil {
    // Token 有效期：7天（转换为秒）
    private static final long TOKEN_EXPIRE_SECONDS = 7 * 24 * 60 * 60;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    /**
     * 生成 Base64 Token 并存储到 Redis
     * @param userId 用户ID（关联 Token 和用户）
     * @return Base64 编码的 Token 字符串
     */
    public String generateToken(Long userId) {
        // 1. 原有 Base64 Token 生成逻辑（保持与你系统一致）
        // 拼接内容：用户ID + 时间戳 + 随机字符串（确保唯一性）
        String rawToken = userId + "_" + System.currentTimeMillis() + "_" + UUID.randomUUID().toString().replace("-", "");
        // Base64 URL 安全编码（避免特殊字符导致的传输问题）
        String base64Token = Base64.getUrlEncoder().encodeToString(rawToken.getBytes());

        // 2. 存储到 Redis：key=token:{token值}, value=userId, 设过期时间
        stringRedisTemplate.opsForValue().set(
            "token:" + base64Token,  // Redis Key 前缀（便于区分和批量清理）
            userId.toString(),       // Redis Value 存用户ID（轻量化存储）
            TOKEN_EXPIRE_SECONDS,    // 过期时间
            TimeUnit.SECONDS         // 时间单位
        );

        return base64Token;
    }

    /**
     * 验证 Token 有效性（从 Redis 校验）
     * @param token 前端传入的 Base64 Token
     * @return 有效返回用户ID，无效返回 null
     */
    public Long validateToken(String token) {
        if (token == null || token.trim().isEmpty()) {
            return null;
        }

        // 1. 从 Redis 查询 Token 是否存在（存在则未过期）
        String userIdStr = stringRedisTemplate.opsForValue().get("token:" + token);
        if (userIdStr == null) {
            return null; // Token 不存在或已过期
        }

        // 2. 滑动窗口：验证成功后刷新 Token 有效期（延长7天）
        stringRedisTemplate.expire("token:" + token, TOKEN_EXPIRE_SECONDS, TimeUnit.SECONDS);

        // 3. 返回用户ID（用于后续业务逻辑）
        return Long.parseLong(userIdStr);
    }

    /**
     * 注销 Token（退出登录时调用）
     * @param token 前端传入的 Base64 Token
     */
    public void invalidateToken(String token) {
        if (token != null && !token.trim().isEmpty()) {
            stringRedisTemplate.delete("token:" + token);
        }
    }
}