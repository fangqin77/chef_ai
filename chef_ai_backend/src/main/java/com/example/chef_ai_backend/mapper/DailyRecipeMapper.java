package com.example.chef_ai_backend.mapper;

import com.example.chef_ai_backend.model.DailyRecipe;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface DailyRecipeMapper {
    // 添加到每日菜谱
    int insertDailyRecipe(DailyRecipe dailyRecipe);
    
    // 从每日菜谱中移除
    int deleteDailyRecipe(@Param("recipeId") Integer recipeId, @Param("userId") Long userId, @Param("date") LocalDate date);
    
    // 检查某天是否已添加某菜谱到每日菜谱
    DailyRecipe selectDailyRecipe(@Param("recipeId") Integer recipeId, @Param("userId") Long userId, @Param("date") LocalDate date);
    
    // 获取用户某天的每日菜谱列表
    List<DailyRecipe> selectUserDailyRecipes(@Param("userId") Long userId, @Param("date") LocalDate date);
    
    // 获取用户某天的每日菜谱详细信息列表（包含菜谱信息）
    List<Map<String, Object>> selectUserDailyRecipesWithDetails(@Param("userId") Long userId, @Param("date") LocalDate date);
    
    // 获取用户一段时间内的每日菜谱列表
    List<DailyRecipe> selectUserDailyRecipesByPeriod(@Param("userId") Long userId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    // 统计用户某天的每日菜谱数量
    int countUserDailyRecipes(@Param("userId") Long userId, @Param("date") LocalDate date);
}