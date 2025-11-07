package com.example.chef_ai_backend.controller;

import com.example.chef_ai_backend.service.DailyRecipeService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class DailyRecipeController {
    
    @Autowired
    private DailyRecipeService dailyRecipeService;

    /**
     * 添加菜谱到每日菜谱
     * @param recipeId 菜谱ID
     * @param date 日期（格式：yyyy-MM-dd）
     * @return 操作结果
     */
    @PostMapping("/{recipeId}/add-to-daily")
    public Map<String, Object> addToDailyRecipes(@PathVariable Integer recipeId, 
                                                 @RequestParam(required = false) String date,
                                                 HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "用户未登录");
        }
        
        // 如果没有指定日期，则使用今天
        LocalDate targetDate = (date != null) ? LocalDate.parse(date) : LocalDate.now();
        
        return dailyRecipeService.addToDailyRecipes(recipeId, userId, targetDate);
    }

    /**
     * 从每日菜谱中移除
     * @param recipeId 菜谱ID
     * @param date 日期（格式：yyyy-MM-dd）
     * @return 操作结果
     */
    @DeleteMapping("/{recipeId}/remove-from-daily")
    public Map<String, Object> removeFromDailyRecipes(@PathVariable Integer recipeId,
                                                      @RequestParam(required = false) String date,
                                                      HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "用户未登录");
        }
        
        // 如果没有指定日期，则使用今天
        LocalDate targetDate = (date != null) ? LocalDate.parse(date) : LocalDate.now();
        
        return dailyRecipeService.removeFromDailyRecipes(recipeId, userId, targetDate);
    }

    /**
     * 检查是否已添加到每日菜谱
     * @param recipeId 菜谱ID
     * @param date 日期（格式：yyyy-MM-dd）
     * @return 是否已添加
     */
    @GetMapping("/{recipeId}/in-daily")
    public Map<String, Object> isAddedToDailyRecipes(@PathVariable Integer recipeId,
                                                     @RequestParam(required = false) String date,
                                                     HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "用户未登录");
        }
        
        // 如果没有指定日期，则使用今天
        LocalDate targetDate = (date != null) ? LocalDate.parse(date) : LocalDate.now();
        
        return dailyRecipeService.isAddedToDailyRecipes(recipeId, userId, targetDate);
    }

    /**
     * 获取用户某天的每日菜谱列表
     * @param date 日期（格式：yyyy-MM-dd）
     * @return 每日菜谱列表
     */
    @GetMapping("/daily")
    public Map<String, Object> getUserDailyRecipes(@RequestParam(required = false) String date,
                                                   HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "用户未登录");
        }
        
        // 如果没有指定日期，则使用今天
        LocalDate targetDate = (date != null) ? LocalDate.parse(date) : LocalDate.now();
        
        return dailyRecipeService.getUserDailyRecipes(userId, targetDate);
    }
    
    /**
     * 获取用户某天的每日菜谱详细信息列表
     * @param date 日期（格式：yyyy-MM-dd）
     * @return 每日菜谱详细信息列表
     */
    @GetMapping("/daily/details")
    public Map<String, Object> getUserDailyRecipesWithDetails(@RequestParam(required = false) String date,
                                                              HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "用户未登录");
        }
        
        // 如果没有指定日期，则使用今天
        LocalDate targetDate = (date != null) ? LocalDate.parse(date) : LocalDate.now();
        
        return dailyRecipeService.getUserDailyRecipesWithDetails(userId, targetDate);
    }
    
    /**
     * 获取用户一段时间内的每日菜谱（按日期分组）
     * @param startDate 开始日期（格式：yyyy-MM-dd，可选）
     * @param endDate 结束日期（格式：yyyy-MM-dd，可选）
     * @return 按日期分类的菜谱列表
     */
    @GetMapping("/daily/grouped")
    public Map<String, Object> getUserDailyRecipesGroupedByDate(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            HttpServletRequest request) {
        
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "用户未登录");
        }
        
        // 解析日期参数
        LocalDate targetStart = null;
        if (startDate != null && !startDate.isEmpty()) {
            try {
                targetStart = LocalDate.parse(startDate);
            } catch (DateTimeParseException e) {
                return Map.of("success", false, "message", "开始日期格式错误，应为yyyy-MM-dd");
            }
        }
        
        LocalDate targetEnd = null;
        if (endDate != null && !endDate.isEmpty()) {
            try {
                targetEnd = LocalDate.parse(endDate);
            } catch (DateTimeParseException e) {
                return Map.of("success", false, "message", "结束日期格式错误，应为yyyy-MM-dd");
            }
        }
        
        return dailyRecipeService.getUserDailyRecipesGroupedByDate(userId, targetStart, targetEnd);
    }
}