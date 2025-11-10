package com.example.chef_ai_backend.model;

import java.time.LocalDateTime;

public class UserFollow {
    private Long id;
    private Long followerId; // 关注者
    private Long followeeId; // 被关注者
    private LocalDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getFollowerId() { return followerId; }
    public void setFollowerId(Long followerId) { this.followerId = followerId; }

    public Long getFolloweeId() { return followeeId; }
    public void setFolloweeId(Long followeeId) { this.followeeId = followeeId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}