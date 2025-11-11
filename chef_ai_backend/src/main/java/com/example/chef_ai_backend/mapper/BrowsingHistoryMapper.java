package com.example.chef_ai_backend.mapper;

import com.example.chef_ai_backend.model.BrowsingHistory;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BrowsingHistoryMapper {
    int insertOrUpdate(@Param("userId") Long userId, @Param("postId") Long postId);

    java.util.List<java.util.Map<String, Object>> listUserBrowsingHistory(@Param("userId") Long userId,
                                                  @Param("offset") int offset,
                                                  @Param("limit") int limit);

    int countUserBrowsingHistory(@Param("userId") Long userId);

    int clearUserBrowsingHistory(@Param("userId") Long userId);
}