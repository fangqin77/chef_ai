package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.FavoriteMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminFavoriteService {

    @Autowired
    private FavoriteMapper favoriteMapper;

    public Map<String,Object> favorite(Long adminUserId, Integer recipeId){
        if (adminUserId == null || recipeId == null) return Map.of("success", false, "message", "参数缺失");
        favoriteMapper.insertFavorite(adminUserId, recipeId);
        return Map.of("success", true);
    }

    public Map<String,Object> unfavorite(Long adminUserId, Integer recipeId){
        if (adminUserId == null || recipeId == null) return Map.of("success", false, "message", "参数缺失");
        favoriteMapper.deleteFavorite(adminUserId, recipeId);
        return Map.of("success", true);
    }

    public Map<String,Object> list(Long adminUserId, int page, int pageSize){
        int offset = (Math.max(page,1)-1) * Math.max(pageSize,1);
        List<Map<String,Object>> list = favoriteMapper.listFavorites(adminUserId, offset, pageSize);
        int total = favoriteMapper.countFavorites(adminUserId);
        Map<String,Object> data = new HashMap<>();
        data.put("list", list);
        data.put("total", total);
        data.put("page", page);
        data.put("pageSize", pageSize);
        return Map.of("success", true, "data", data);
    }
}
