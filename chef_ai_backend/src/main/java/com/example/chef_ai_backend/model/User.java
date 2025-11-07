package com.example.chef_ai_backend.model;

import java.time.LocalDateTime;

public class User {
    private Long id;                       // 用户ID（主键）
    private String openid;                 // 微信openid（唯一标识）
    private String sessionKey;             // 微信会话密钥
    private String token;                  // 系统登录令牌
    private LocalDateTime tokenExpireAt;   // 令牌过期时间
    private String unionid;                // 微信unionid（多账号关联）
    private String nickname;               // 用户昵称
    private String avatarUrl;              // 用户头像URL
    private Integer gender;                // 性别（1-男，2-女，0-未知）
    private String phone;                  // 手机号
    private String province;               // 省份
    private String city;                   // 城市
    private String country;                // 国家
    private Integer status;                // 状态（1-正常，0-禁用）
    private LocalDateTime lastLoginAt;     // 最后登录时间
    private Integer loginCount;            // 登录次数
    private LocalDateTime createdAt;       // 创建时间
    private LocalDateTime updatedAt;       // 更新时间

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOpenid() { return openid; }
    public void setOpenid(String openid) { this.openid = openid; }

    public String getSessionKey() { return sessionKey; }
    public void setSessionKey(String sessionKey) { this.sessionKey = sessionKey; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public LocalDateTime getTokenExpireAt() { return tokenExpireAt; }
    public void setTokenExpireAt(LocalDateTime tokenExpireAt) { this.tokenExpireAt = tokenExpireAt; }

    public String getUnionid() { return unionid; }
    public void setUnionid(String unionid) { this.unionid = unionid; }

    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public Integer getGender() { return gender; }
    public void setGender(Integer gender) { this.gender = gender; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getProvince() { return province; }
    public void setProvince(String province) { this.province = province; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }

    public LocalDateTime getLastLoginAt() { return lastLoginAt; }
    public void setLastLoginAt(LocalDateTime lastLoginAt) { this.lastLoginAt = lastLoginAt; }

    public Integer getLoginCount() { return loginCount; }
    public void setLoginCount(Integer loginCount) { this.loginCount = loginCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}