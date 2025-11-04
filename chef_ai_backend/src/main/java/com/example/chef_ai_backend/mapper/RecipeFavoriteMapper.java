package com.example.chef_ai_backend.mapper;

import com.example.chef_ai_backend.model.RecipeFavorite;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RecipeFavoriteMapper {
    // 添加收藏
    int insertFavorite(RecipeFavorite favorite);
    
    // 取消收藏
    int deleteFavorite(@Param("recipeId") Integer recipeId, @Param("userId") Long userId);
    
    // 检查是否已收藏
    RecipeFavorite selectFavorite(@Param("recipeId") Integer recipeId, @Param("userId") Long userId);
    
    // 获取用户收藏列表
    List<RecipeFavorite> selectUserFavorites(@Param("userId") Long userId, @Param("offset") int offset, @Param("limit") int limit);

    // 获取用户收藏的菜谱视图（菜谱字段 + 收藏时间 favorite_time）
    java.util.List<java.util.Map<String, Object>> selectUserFavoriteRecipesView(@Param("userId") Long userId, @Param("offset") int offset, @Param("limit") int limit);
    
    // 统计用户收藏数量
    int countUserFavorites(@Param("userId") Long userId);
    
    // 获取收藏了指定菜谱的用户列表
    List<RecipeFavorite> selectRecipeFavorites(@Param("recipeId") Integer recipeId, @Param("offset") int offset, @Param("limit") int limit);
    
    // 统计菜谱被收藏次数
    int countRecipeFavorites(@Param("recipeId") Integer recipeId);
}