package com.example.chef_ai_backend.model;

import java.time.LocalDateTime;

public class User {
    private Integer userId;
    private String username;
    private String avatar;
    private String signature;
    private Integer followCount;
    private Integer fanCount;
    private Integer likeCount;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getSignature() { return signature; }
    public void setSignature(String signature) { this.signature = signature; }

    public Integer getFollowCount() { return followCount; }
    public void setFollowCount(Integer followCount) { this.followCount = followCount; }

    public Integer getFanCount() { return fanCount; }
    public void setFanCount(Integer fanCount) { this.fanCount = fanCount; }

    public Integer getLikeCount() { return likeCount; }
    public void setLikeCount(Integer likeCount) { this.likeCount = likeCount; }

    public LocalDateTime getCreateTime() { return createTime; }
    public void setCreateTime(LocalDateTime createTime) { this.createTime = createTime; }

    public LocalDateTime getUpdateTime() { return updateTime; }
    public void setUpdateTime(LocalDateTime updateTime) { this.updateTime = updateTime; }
}