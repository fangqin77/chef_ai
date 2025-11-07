package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.DailyRecipeMapper;
import com.example.chef_ai_backend.mapper.RecipeMapper;
import com.example.chef_ai_backend.model.DailyRecipe;
import com.example.chef_ai_backend.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
public class DailyRecipeService {
    
    @Autowired
    private DailyRecipeMapper dailyRecipeMapper;
    
    @Autowired
    private RecipeMapper recipeMapper;

    /**
     * 添加菜谱到每日菜谱
     * @param recipeId 菜谱ID
     * @param userId 用户ID
     * @param date 日期
     * @return 操作结果
     */
    public Map<String, Object> addToDailyRecipes(Integer recipeId, Long userId, LocalDate date) {
        Map<String, Object> result = new HashMap<>();
        
        // 检查菜谱是否存在
        Recipe recipe = recipeMapper.selectById(recipeId);
        if (recipe == null) {
            result.put("success", false);
            result.put("message", "菜谱不存在");
            return result;
        }
        
        // 检查是否已添加到该日期的每日菜谱
        DailyRecipe existingDailyRecipe = dailyRecipeMapper.selectDailyRecipe(recipeId, userId, date);
        if (existingDailyRecipe != null) {
            result.put("success", false);
            result.put("message", "已添加到该日期的每日菜谱");
            return result;
        }
        
        // 添加到每日菜谱
        DailyRecipe dailyRecipe = new DailyRecipe(recipeId, userId, date);
        int rows = dailyRecipeMapper.insertDailyRecipe(dailyRecipe);
        
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "已添加到每日菜谱");
        } else {
            result.put("success", false);
            result.put("message", "添加失败");
        }
        
        return result;
    }

    /**
     * 从每日菜谱中移除
     * @param recipeId 菜谱ID
     * @param userId 用户ID
     * @param date 日期
     * @return 操作结果
     */
    public Map<String, Object> removeFromDailyRecipes(Integer recipeId, Long userId, LocalDate date) {
        Map<String, Object> result = new HashMap<>();
        
        // 检查是否已添加到该日期的每日菜谱
        DailyRecipe existingDailyRecipe = dailyRecipeMapper.selectDailyRecipe(recipeId, userId, date);
        if (existingDailyRecipe == null) {
            result.put("success", false);
            result.put("message", "未添加到该日期的每日菜谱");
            return result;
        }
        
        // 从每日菜谱中移除
        int rows = dailyRecipeMapper.deleteDailyRecipe(recipeId, userId, date);
        
        if (rows > 0) {
            result.put("success", true);
            result.put("message", "已从每日菜谱中移除");
        } else {
            result.put("success", false);
            result.put("message", "移除失败");
        }
        
        return result;
    }

    /**
     * 检查是否已添加到每日菜谱
     * @param recipeId 菜谱ID
     * @param userId 用户ID
     * @param date 日期
     * @return 是否已添加
     */
    public Map<String, Object> isAddedToDailyRecipes(Integer recipeId, Long userId, LocalDate date) {
        Map<String, Object> result = new HashMap<>();
        
        DailyRecipe dailyRecipe = dailyRecipeMapper.selectDailyRecipe(recipeId, userId, date);
        boolean added = (dailyRecipe != null);
        
        result.put("success", true);
        result.put("data", Map.of("added", added));
        
        return result;
    }

    /**
     * 获取用户某天的每日菜谱列表
     * @param userId 用户ID
     * @param date 日期
     * @return 每日菜谱列表
     */
    public Map<String, Object> getUserDailyRecipes(Long userId, LocalDate date) {
        Map<String, Object> result = new HashMap<>();
        
        List<DailyRecipe> dailyRecipes = dailyRecipeMapper.selectUserDailyRecipes(userId, date);
        
        // 直接将list作为data的值，而非嵌套在list字段中
        result.put("success", true);
        result.put("data", dailyRecipes); // 关键修改
        
        return result;
    }

    /**
     * 获取用户某天的每日菜谱详细信息列表
     * @param userId 用户ID
     * @param date 日期
     * @return 每日菜谱详细信息列表
     */
    public Map<String, Object> getUserDailyRecipesWithDetails(Long userId, LocalDate date) {
        Map<String, Object> result = new HashMap<>();
        
        List<Map<String, Object>> dailyRecipes = dailyRecipeMapper.selectUserDailyRecipesWithDetails(userId, date);
        
        // 直接将list作为data的值，而非嵌套在list字段中
        result.put("success", true);
        result.put("data", dailyRecipes); // 关键修改
        
        return result;
    }

    /**
     * 获取用户一段时间内的每日菜谱列表
     * @param userId 用户ID
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @return 每日菜谱列表
     */
    public Map<String, Object> getUserDailyRecipesByPeriod(Long userId, LocalDate startDate, LocalDate endDate) {
        Map<String, Object> result = new HashMap<>();
        
        List<DailyRecipe> dailyRecipes = dailyRecipeMapper.selectUserDailyRecipesByPeriod(userId, startDate, endDate);
        
        result.put("success", true);
        result.put("data", Map.of("list", dailyRecipes));
        
        return result;
    }
    
    /**
     * 获取用户一段时间内的每日菜谱（按日期分组）
     * @param userId 用户ID
     * @param startDate 开始日期（可选，默认30天前）
     * @param endDate 结束日期（可选，默认今天）
     * @return 按日期分组的菜谱列表，格式：{ "2025-11-04": [...], "2025-11-05": [...] }
     */
    public Map<String, Object> getUserDailyRecipesGroupedByDate(
            Long userId, 
            LocalDate startDate, 
            LocalDate endDate) {
        
        // 设置默认日期范围（近30天）
        LocalDate defaultEnd = LocalDate.now();
        LocalDate defaultStart = defaultEnd.minusDays(30);
        LocalDate targetStart = startDate != null ? startDate : defaultStart;
        LocalDate targetEnd = endDate != null ? endDate : defaultEnd;
        
        // 查询该时间段内的所有每日菜谱
        List<DailyRecipe> dailyRecipes = dailyRecipeMapper.selectUserDailyRecipesByPeriod(
                userId, targetStart, targetEnd);
        
        // 按日期分组
        Map<String, List<DailyRecipe>> groupedByDate = new TreeMap<>(); // TreeMap保证日期升序
        for (DailyRecipe recipe : dailyRecipes) {
            String dateStr = recipe.getDate().toString(); // 转换为yyyy-MM-dd字符串
            groupedByDate.computeIfAbsent(dateStr, k -> new ArrayList<>()).add(recipe);
        }
        
        return Map.of(
                "success", true,
                "data", Map.of(
                        "groupedList", groupedByDate,
                        "startDate", targetStart.toString(),
                        "endDate", targetEnd.toString()
                )
        );
    }
}