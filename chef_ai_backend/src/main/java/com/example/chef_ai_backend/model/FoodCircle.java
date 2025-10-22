package com.example.chef_ai_backend.model;

import java.time.LocalDateTime;

public class FoodCircle {
    private Integer dynamicId;
    private Integer userId;
    private String content;
    private String imgList;
    private Integer likeCount;
    private Integer commentCount;
    private LocalDateTime createTime;

    public Integer getDynamicId() { return dynamicId; }
    public void setDynamicId(Integer dynamicId) { this.dynamicId = dynamicId; }

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getImgList() { return imgList; }
    public void setImgList(String imgList) { this.imgList = imgList; }

    public Integer getLikeCount() { return likeCount; }
    public void setLikeCount(Integer likeCount) { this.likeCount = likeCount; }

    public Integer getCommentCount() { return commentCount; }
    public void setCommentCount(Integer commentCount) { this.commentCount = commentCount; }

    public LocalDateTime getCreateTime() { return createTime; }
    public void setCreateTime(LocalDateTime createTime) { this.createTime = createTime; }
}