package com.example.chef_ai_backend.mapper;

import com.example.chef_ai_backend.model.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {
    List<User> selectRecommended(@Param("limit") int limit);
    User selectByOpenid(String openid);
    void updateById(User user);
    void insert(User user);
    
    User selectById(@Param("id") Long id);

    int updateSelective(User user);

    int updateAvatar(User user);

    // 新增：查询用户简介（昵称/头像/简介）
    User selectUserIntroduction(@Param("userId") Long userId);

    // 统计：该用户所有帖子获赞总数（SUM posts.like_count）
    Integer sumUserPostLikes(@Param("userId") Long userId);

    // 统计：该用户帖子被收藏的用户数（去重）
    Integer countUserPostFans(@Param("userId") Long userId);
}