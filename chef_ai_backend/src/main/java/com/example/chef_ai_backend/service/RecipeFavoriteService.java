package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.RecipeFavoriteMapper;
import com.example.chef_ai_backend.mapper.RecipeMapper;
import com.example.chef_ai_backend.model.Recipe;
import com.example.chef_ai_backend.model.RecipeFavorite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecipeFavoriteService {
    
    @Autowired
    private RecipeFavoriteMapper recipeFavoriteMapper;
    
    @Autowired
    private RecipeMapper recipeMapper;

    /**
     * 添加菜谱收藏
     * @param recipeId 菜谱ID
     * @param userId 用户ID
     * @return 操作结果
     */
    public Map<String, Object> addFavorite(Integer recipeId, Long userId) {
        Map<String, Object> result = new HashMap<>();
        
        // 检查菜谱是否存在
        Recipe recipe = recipeMapper.selectById(recipeId);
        if (recipe == null) {
            result.put("success", false);
            result.put("message", "菜谱不存在");
            return result;
        }
        
        // 检查是否已收藏
        RecipeFavorite existingFavorite = recipeFavoriteMapper.selectFavorite(recipeId, userId);
        if (existingFavorite != null) {
            result.put("success", false);
            result.put("message", "已收藏该菜谱");
            return result;
        }
        
        // 添加收藏
        RecipeFavorite favorite = new RecipeFavorite(recipeId, userId);
        int rows = recipeFavoriteMapper.insertFavorite(favorite);
        
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "收藏成功");
        } else {
            result.put("success", false);
            result.put("message", "收藏失败");
        }
        
        return result;
    }

    /**
     * 取消菜谱收藏
     * @param recipeId 菜谱ID
     * @param userId 用户ID
     * @return 操作结果
     */
    public Map<String, Object> removeFavorite(Integer recipeId, Long userId) {
        Map<String, Object> result = new HashMap<>();
        
        // 检查是否已收藏
        RecipeFavorite existingFavorite = recipeFavoriteMapper.selectFavorite(recipeId, userId);
        if (existingFavorite == null) {
            result.put("success", false);
            result.put("message", "未收藏该菜谱");
            return result;
        }
        
        // 取消收藏
        int rows = recipeFavoriteMapper.deleteFavorite(recipeId, userId);
        
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "取消收藏成功");
        } else {
            result.put("success", false);
            result.put("message", "取消收藏失败");
        }
        
        return result;
    }

    /**
     * 检查是否已收藏
     * @param recipeId 菜谱ID
     * @param userId 用户ID
     * @return 是否已收藏
     */
    public Map<String, Object> isFavorite(Integer recipeId, Long userId) {
        Map<String, Object> result = new HashMap<>();
        
        RecipeFavorite favorite = recipeFavoriteMapper.selectFavorite(recipeId, userId);
        boolean favorited = (favorite != null);
        
        result.put("success", true);
        result.put("data", Map.of("favorited", favorited));
        
        return result;
    }

    /**
     * 获取用户收藏列表
     * @param userId 用户ID
     * @param page 页码
     * @param pageSize 每页数量
     * @return 收藏列表
     */
    public Map<String, Object> getUserFavorites(Long userId, int page, int pageSize) {
        Map<String, Object> result = new HashMap<>();
        
        int offset = (page - 1) * pageSize;
        List<RecipeFavorite> favorites = recipeFavoriteMapper.selectUserFavorites(userId, offset, pageSize);
        int total = recipeFavoriteMapper.countUserFavorites(userId);
        
        result.put("success", true);
        result.put("data", Map.of(
            "list", favorites,
            "total", total,
            "page", page,
            "pageSize", pageSize
        ));
        
        return result;
    }

    /**
     * 获取菜谱被收藏次数
     * @param recipeId 菜谱ID
     * @return 收藏次数
     */
    public Map<String, Object> getRecipeFavoriteCount(Integer recipeId) {
        Map<String, Object> result = new HashMap<>();
        
        int count = recipeFavoriteMapper.countRecipeFavorites(recipeId);
        
        result.put("success", true);
        result.put("data", Map.of("count", count));
        
        return result;
    }
}