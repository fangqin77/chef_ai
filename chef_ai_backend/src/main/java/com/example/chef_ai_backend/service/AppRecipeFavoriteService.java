package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.RecipeFavoriteMapper;
import com.example.chef_ai_backend.model.RecipeFavorite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AppRecipeFavoriteService {
    @Autowired
    private RecipeFavoriteMapper recipeFavoriteMapper;

    public Map<String, Object> favorite(Long userId, Integer recipeId) {
        if (userId == null || recipeId == null) return Map.of("success", false, "message", "参数不完整");
        RecipeFavorite existed = recipeFavoriteMapper.selectFavorite(recipeId, userId);
        if (existed != null) {
            return Map.of("success", true, "data", Map.of("favorited", true));
        }
        RecipeFavorite rf = new RecipeFavorite();
        rf.setUserId(userId);
        rf.setRecipeId(recipeId);
        rf.setCreatedAt(LocalDateTime.now());
        recipeFavoriteMapper.insertFavorite(rf);
        return Map.of("success", true, "data", Map.of("favorited", true));
    }

    public Map<String, Object> unfavorite(Long userId, Integer recipeId) {
        if (userId == null || recipeId == null) return Map.of("success", false, "message", "参数不完整");
        recipeFavoriteMapper.deleteFavorite(recipeId, userId);
        return Map.of("success", true, "data", Map.of("favorited", false));
    }

    public Map<String, Object> listUserFavorites(Long userId, int page, int pageSize, boolean withView) {
        int offset = (Math.max(page, 1) - 1) * Math.max(pageSize, 1);
        int total = recipeFavoriteMapper.countUserFavorites(userId);
        Map<String, Object> data = new HashMap<>();
        data.put("total", total);
        data.put("page", page);
        data.put("pageSize", pageSize);
        if (withView) {
            java.util.List<java.util.Map<String, Object>> list = recipeFavoriteMapper.selectUserFavoriteRecipesView(userId, offset, pageSize);
            data.put("list", list);
        } else {
            java.util.List<RecipeFavorite> list = recipeFavoriteMapper.selectUserFavorites(userId, offset, pageSize);
            data.put("list", list);
        }
        return Map.of("success", true, "data", data);
    }
}
