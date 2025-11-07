package com.example.chef_ai_backend.controller;

import com.example.chef_ai_backend.service.RecipeFavoriteService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeFavoriteController {
    
    @Autowired
    private RecipeFavoriteService recipeFavoriteService;

    /**
     * 添加菜谱收藏
     * @param recipeId 菜谱ID
     * @return 操作结果
     */
    @PostMapping("/{recipeId}/favorite")
    public Map<String, Object> addFavorite(@PathVariable Integer recipeId, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "用户未登录");
        }
        
        return recipeFavoriteService.addFavorite(recipeId, userId);
    }

    /**
     * 取消菜谱收藏
     * @param recipeId 菜谱ID
     * @return 操作结果
     */
    @DeleteMapping("/{recipeId}/favorite")
    public Map<String, Object> removeFavorite(@PathVariable Integer recipeId, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "用户未登录");
        }
        
        return recipeFavoriteService.removeFavorite(recipeId, userId);
    }

    /**
     * 检查是否已收藏
     * @param recipeId 菜谱ID
     * @return 是否已收藏
     */
    @GetMapping("/{recipeId}/favorite")
    public Map<String, Object> isFavorite(@PathVariable Integer recipeId, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "用户未登录");
        }
        
        return recipeFavoriteService.isFavorite(recipeId, userId);
    }

    /**
     * 获取用户收藏列表
     * @param page 页码
     * @param pageSize 每页数量
     * @return 收藏列表
     */
    @GetMapping("/favorites")
    public Map<String, Object> getUserFavorites(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "用户未登录");
        }
        
        return recipeFavoriteService.getUserFavorites(userId, page, pageSize);
    }

    /**
     * 获取菜谱被收藏次数
     * @param recipeId 菜谱ID
     * @return 收藏次数
     */
    @GetMapping("/{recipeId}/favorite-count")
    public Map<String, Object> getRecipeFavoriteCount(@PathVariable Integer recipeId) {
        return recipeFavoriteService.getRecipeFavoriteCount(recipeId);
    }
    
    /**
     * 添加菜谱到每日菜谱
     * @param recipeId 菜谱ID
     * @return 操作结果
     */
    @PostMapping("/favorite/{recipeId}/add-to-daily")
    public Map<String, Object> addToDailyRecipes(@PathVariable Integer recipeId, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "用户未登录");
        }
        
        return recipeFavoriteService.addToDailyRecipes(recipeId, userId);
    }
    
    /**
     * 添加菜谱到每日菜谱（支持选择日期）
     * @param recipeId 菜谱ID
     * @param date 前端选择的日期（格式：yyyy-MM-dd，可选）
     * @return 操作结果
     */
    @PostMapping("/favorite/{recipeId}/add-to-daily-with-date")
    public Map<String, Object> addToDailyRecipes(
            @PathVariable Integer recipeId, 
            @RequestParam(required = false) String date, // 新增日期参数
            HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return Map.of("success", false, "message", "用户未登录");
        }
        
        // 解析日期（若为空则由service处理默认值）
        LocalDate targetDate = null;
        if (date != null && !date.isEmpty()) {
            try {
                targetDate = LocalDate.parse(date);
            } catch (DateTimeParseException e) {
                return Map.of("success", false, "message", "日期格式错误，应为yyyy-MM-dd");
            }
        }
        
        return recipeFavoriteService.addToDailyRecipes(recipeId, userId, targetDate);
    }
}