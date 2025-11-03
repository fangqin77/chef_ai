package com.example.chef_ai_backend.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Component
public class AdminTokenUtil {
    private static final Logger log = LoggerFactory.getLogger(AdminTokenUtil.class);
    private static final long TOKEN_EXPIRE_SECONDS = 7 * 24 * 60 * 60;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    public String generate(Long adminUserId) {
        String raw = adminUserId + "_" + System.currentTimeMillis() + "_" + UUID.randomUUID().toString().replace("-", "");
        String token = java.util.Base64.getUrlEncoder().encodeToString(raw.getBytes());
        stringRedisTemplate.opsForValue().set("admin_token:" + token, adminUserId.toString(), TOKEN_EXPIRE_SECONDS, TimeUnit.SECONDS);
        log.info("Admin token created: {} for adminUserId {}", token, adminUserId);
        return token;
    }

    public Long validate(String token) {
        if (token == null || token.isBlank()) return null;
        String val = stringRedisTemplate.opsForValue().get("admin_token:" + token);
        if (val == null) return null;
        stringRedisTemplate.expire("admin_token:" + token, TOKEN_EXPIRE_SECONDS, TimeUnit.SECONDS);
        return Long.parseLong(val);
    }

    public void invalidate(String token) {
        if (token == null || token.isBlank()) return;
        stringRedisTemplate.delete("admin_token:" + token);
    }
}
