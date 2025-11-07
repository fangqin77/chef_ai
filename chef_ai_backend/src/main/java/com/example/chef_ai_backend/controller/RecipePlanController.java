package com.example.chef_ai_backend.controller;

import com.example.chef_ai_backend.model.RecipeVO;
import com.example.chef_ai_backend.service.RecipeFavoriteService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

/**
 * 每日菜谱计划相关接口控制器。
 *
 * 功能概述：
 * - 收藏并设置计划烹饪日期（新增收藏记录并保存 plan_cook_date）
 * - 修改计划烹饪日期（更新 plan_cook_date）
 * - 取消计划（清空 plan_cook_date）
 * - 根据日期获取当日计划菜谱列表（仅返回简化字段）
 * - 获取用户收藏菜谱的视图（含收藏时间与计划日期）
 */
@RestController
@RequestMapping("/api/recipes/favorites/plan")
@CrossOrigin(origins = "*")
public class RecipePlanController {
    
    @Autowired
    private RecipeFavoriteService favoriteService;

    /**
     * 收藏菜谱并设置计划烹饪日期。
     *
     * 请求示例：POST /api/recipes/favorites/plan?recipeId=1007&planCookDate=2025-11-08
     * 业务说明：
     * - 需要登录（由拦截器校验 Token），未登录返回 "未登录"
     * - 若该菜谱已被当前用户收藏，则返回 "已收藏"
     * - 成功则写入收藏记录，并保存计划日期到 recipe_favorites.plan_cook_date
     */
    @PostMapping
    public Map<String, Object> collect(@RequestParam Integer recipeId, 
                                       @RequestParam LocalDate planCookDate, 
                                       HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return Map.of("success", false, "message", "未登录");
        
        try {
            favoriteService.collect(userId, recipeId, planCookDate);
            return Map.of("success", true, "message", "收藏成功");
        } catch (RuntimeException e) {
            return Map.of("success", false, "message", e.getMessage());
        }
    }

    /**
     * 修改计划烹饪日期。
     *
     * 请求示例：PUT /api/recipes/favorites/plan/update?recipeId=1007&newDate=2025-11-10
     * 业务说明：
     * - 需要登录
     * - 将指定菜谱的 plan_cook_date 更新为新日期
     */
    @PutMapping("/update")
    public Map<String, Object> updatePlan(@RequestParam Integer recipeId, 
                                          @RequestParam LocalDate newDate, 
                                          HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return Map.of("success", false, "message", "未登录");
        
        favoriteService.updatePlan(userId, recipeId, newDate);
        return Map.of("success", true, "message", "计划更新成功");
    }

    /**
     * 取消计划（清空计划日期）。
     *
     * 请求示例：PUT /api/recipes/favorites/plan/cancel?recipeId=1007
     * 业务说明：
     * - 需要登录
     * - 将指定菜谱的 plan_cook_date 清空为 NULL
     */
    @PutMapping("/cancel")
    public Map<String, Object> cancelPlan(@RequestParam Integer recipeId, 
                                          HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return Map.of("success", false, "message", "未登录");
        
        favoriteService.cancelPlan(userId, recipeId);
        return Map.of("success", true, "message", "计划已取消");
    }

    /**
     * 获取每日计划的菜谱列表。
     *
     * 请求示例：GET /api/recipes/favorites/plan/daily?date=2025-11-08
     * 业务说明：
     * - 需要登录
     * - 按 userId 与 plan_cook_date 精确匹配查询当日计划的收藏记录
     * - 返回简化字段：id（菜谱ID）、name（菜谱名称）、imageUrl（feature 字段）、plannedDate（计划日期）
     */
    @GetMapping("/daily")
    public Map<String, Object> getDaily(@RequestParam(required = false) LocalDate date, 
                                        HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return Map.of("success", false, "message", "未登录");
        
        List<RecipeVO> list = favoriteService.getDailyFavorites(userId, date);
        // 仅返回所需四个字段
        List<Map<String, Object>> simpleList = list.stream().map(vo -> {
            Map<String, Object> m = new HashMap<>();
            m.put("id", vo.getRecipeId());
            m.put("name", vo.getRecipeName());
            m.put("imageUrl", vo.getFeature());
            m.put("plannedDate", vo.getPlanCookDate());
            return m;
        }).toList();
        return Map.of("success", true, "data", simpleList);
    }
    
    /**
     * 获取用户收藏的菜谱视图（包含菜谱基础字段、收藏时间、计划日期）。
     *
     * 请求示例：GET /api/recipes/favorites/plan/view?page=1&pageSize=10
     * 业务说明：
     * - 需要登录
     * - 返回分页结构：list、total、page、pageSize
     */
    @GetMapping("/view")
    public Map<String, Object> getUserFavoriteRecipesView(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) return Map.of("success", false, "message", "未登录");
        
        return favoriteService.getUserFavoriteRecipesView(userId, page, pageSize);
    }
}