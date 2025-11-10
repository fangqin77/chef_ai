package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.UserMapper;
import com.example.chef_ai_backend.mapper.UserFollowMapper;
import com.example.chef_ai_backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class UserService {
    private final UserMapper userMapper;
    @Autowired private UserFollowMapper followMapper;
    public UserService(UserMapper userMapper) { this.userMapper = userMapper; }

    public User getById(Long id) {
        return userMapper.selectById(id);
    }

    public User getUserIntroduction(Long userId) {
        return userMapper.selectUserIntroduction(userId);
    }

    public Map<String, Object> getUserIntroWithStats(Long userId) {
        User intro = userMapper.selectUserIntroduction(userId);
        int likeCount = safeInt(userMapper.sumUserPostLikes(userId));
        int fansCount = safeInt(userMapper.countUserPostFans(userId));
        // 真实关注关系：我关注的人数 & 关注我的人数
        int followCount = safeInt(followMapper.countFollowing(userId));
        Map<String, Object> data = new java.util.HashMap<>();
        if (intro != null) {
            data.put("id", intro.getId());
            data.put("nickname", intro.getNickname());
            data.put("avatar_url", intro.getAvatarUrl());
            // 不返回 introduction 字段，但返回 description
            data.put("description", intro.getDescription());
        }
        data.put("followCount", followCount);
        data.put("fansCount", fansCount);
        data.put("likeCount", likeCount);
        return data;
    }

    private int safeInt(Integer v) { return v == null ? 0 : v; }

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