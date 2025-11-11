package com.example.chef_ai_backend.mapper;

import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

public interface NotificationMapper {
    // 列出“我的帖子被评论”的通知（按评论时间倒序）
    List<Map<String, Object>> listUserPostCommentNotifications(@Param("userId") Long userId,
                                                               @Param("offset") int offset,
                                                               @Param("limit") int limit);

    int countUserPostCommentNotifications(@Param("userId") Long userId);
}
