package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.UserMapper;
import com.example.chef_ai_backend.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserMapper userMapper;
    public UserService(UserMapper userMapper) { this.userMapper = userMapper; }

    public User getById(Long id) {
        return userMapper.selectById(id);
    }

    // 只更新非空字段（XML里用 <set> 做动态更新）
    public void updateUserSelective(User user) {
        userMapper.updateSelective(user);
    }

    public void updateAvatar(Long userId, String avatarUrl) {
        User u = new User();
        u.setId(userId);
        u.setAvatarUrl(avatarUrl);
        userMapper.updateAvatar(u);
    }
}