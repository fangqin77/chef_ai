package com.example.chef_ai_backend.mapper;

import com.example.chef_ai_backend.model.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {
    List<User> selectRecommended(@Param("limit") int limit);
    User selectByOpenid(String openid);
    void updateById(User user);
    void insert(User user);
}