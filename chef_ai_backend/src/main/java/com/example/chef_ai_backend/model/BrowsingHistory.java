package com.example.chef_ai_backend.model;

import java.time.LocalDateTime;

public class BrowsingHistory {
    private Long id;
    private Long userId;
    private Long postId;
    private LocalDateTime browseTime;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getPostId() { return postId; }
    public void setPostId(Long postId) { this.postId = postId; }

    public LocalDateTime getBrowseTime() { return browseTime; }
    public void setBrowseTime(LocalDateTime browseTime) { this.browseTime = browseTime; }
}