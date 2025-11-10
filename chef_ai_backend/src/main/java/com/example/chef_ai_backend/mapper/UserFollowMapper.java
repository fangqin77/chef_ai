package com.example.chef_ai_backend.mapper;

import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserFollowMapper {
    int insertFollow(@Param("followerId") Long followerId, @Param("followeeId") Long followeeId);
    int deleteFollow(@Param("followerId") Long followerId, @Param("followeeId") Long followeeId);
    Integer countFollowing(@Param("userId") Long userId); // 我关注的人数
    Integer countFollowers(@Param("userId") Long userId); // 关注我的人数
    List<Long> listFollowing(@Param("userId") Long userId, @Param("offset") int offset, @Param("limit") int limit);
    List<Long> listFollowers(@Param("userId") Long userId, @Param("offset") int offset, @Param("limit") int limit);
    Boolean isFollowing(@Param("followerId") Long followerId, @Param("followeeId") Long followeeId);
}