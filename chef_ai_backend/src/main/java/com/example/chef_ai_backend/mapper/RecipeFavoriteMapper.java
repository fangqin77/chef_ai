package com.example.chef_ai_backend.mapper;

import com.example.chef_ai_backend.model.RecipeFavorite;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
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
    
    // 新增收藏（带计划日期）
    int insert(@Param("userId") Long userId, @Param("recipeId") Integer recipeId, @Param("planCookDate") LocalDate planCookDate);
    
    // 校验重复收藏
    RecipeFavorite selectByUserAndRecipe(@Param("userId") Long userId, @Param("recipeId") Integer recipeId);
    
    // 更新计划日期
    int updatePlanDate(@Param("userId") Long userId, @Param("recipeId") Integer recipeId, @Param("planCookDate") LocalDate planCookDate);
    
    // 取消计划（清空日期）
    int clearPlanDate(@Param("userId") Long userId, @Param("recipeId") Integer recipeId);
    
    // 每日菜谱查询（按计划日期）
    List<RecipeFavorite> selectDailyFavorites(@Param("userId") Long userId, @Param("targetDate") LocalDate targetDate);
}