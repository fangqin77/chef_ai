package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.UserFollowMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserFollowService {
    private final UserFollowMapper followMapper;

    public UserFollowService(UserFollowMapper followMapper) {
        this.followMapper = followMapper;
    }

    public Map<String,Object> follow(Long followerId, Long followeeId) {
        if (followerId == null || followeeId == null || followerId.equals(followeeId)) {
            return Map.of("success", false, "message", "参数不合法");
        }
        followMapper.insertFollow(followerId, followeeId);
        return Map.of("success", true);
    }

    public Map<String,Object> unfollow(Long followerId, Long followeeId) {
        if (followerId == null || followeeId == null || followerId.equals(followeeId)) {
            return Map.of("success", false, "message", "参数不合法");
        }
        followMapper.deleteFollow(followerId, followeeId);
        return Map.of("success", true);
    }

    public Map<String,Object> stats(Long userId) {
        int followCount = safeInt(followMapper.countFollowing(userId));
        int fansCount = safeInt(followMapper.countFollowers(userId));
        return Map.of("success", true, "data", Map.of("followCount", followCount, "fansCount", fansCount));
    }

    public Map<String,Object> followingList(Long userId, int page, int pageSize) {
        int offset = (Math.max(page,1)-1) * Math.max(pageSize,1);
        List<Long> list = followMapper.listFollowing(userId, offset, pageSize);
        return Map.of("success", true, "data", Map.of("list", list, "page", page, "pageSize", pageSize));
    }

    public Map<String,Object> followersList(Long userId, int page, int pageSize) {
        int offset = (Math.max(page,1)-1) * Math.max(pageSize,1);
        List<Long> list = followMapper.listFollowers(userId, offset, pageSize);
        return Map.of("success", true, "data", Map.of("list", list, "page", page, "pageSize", pageSize));
    }

    public Map<String,Object> isFollowing(Long followerId, Long followeeId) {
        Boolean f = followMapper.isFollowing(followerId, followeeId);
        return Map.of("success", true, "data", Map.of("following", Boolean.TRUE.equals(f)));
    }

    private int safeInt(Integer v) { return v == null ? 0 : v; }
}