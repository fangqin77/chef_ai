package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.RecipeFavoriteMapper;
import com.example.chef_ai_backend.mapper.RecipeMapper;
import com.example.chef_ai_backend.mapper.DailyRecipeMapper;
import com.example.chef_ai_backend.model.Recipe;
import com.example.chef_ai_backend.model.RecipeFavorite;
import com.example.chef_ai_backend.model.RecipeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 菜谱收藏与每日计划服务：负责收藏、取消收藏、计划日期设置/取消、每日计划查询等业务逻辑。
 * - 依赖 Mapper 执行数据库读写
 * - 提供分页与统计接口
 */
@Service
public class RecipeFavoriteService {
    
    @Autowired
    private RecipeFavoriteMapper recipeFavoriteMapper;
    
    @Autowired
    private RecipeMapper recipeMapper;
    
    @Autowired
    private DailyRecipeMapper dailyRecipeMapper;
    
    @Autowired
    private DailyRecipeService dailyRecipeService;

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
    
    /**
     * 添加菜谱到每日菜谱（支持指定日期）
     * @param recipeId 菜谱ID
     * @param userId 用户ID
     * @param date 目标日期（前端选择的日期）
     * @return 操作结果
     */
    public Map<String, Object> addToDailyRecipes(Integer recipeId, Long userId, LocalDate date) {
        // 若前端未传日期，默认使用当前日期
        LocalDate targetDate = date != null ? date : LocalDate.now();
        return dailyRecipeService.addToDailyRecipes(recipeId, userId, targetDate);
    }

    /**
     * 添加菜谱到每日菜谱
     * @param recipeId 菜谱ID
     * @param userId 用户ID
     * @return 操作结果
     */
    public Map<String, Object> addToDailyRecipes(Integer recipeId, Long userId) {
        // 调用带日期参数的方法，传入null让其使用默认日期
        return addToDailyRecipes(recipeId, userId, null);
    }
    
    // 收藏菜谱（带计划日期）
    public void collect(Long userId, Integer recipeId, LocalDate planCookDate) {
        RecipeFavorite existing = recipeFavoriteMapper.selectByUserAndRecipe(userId, recipeId);
        if (existing != null) {
            // 已收藏则更新计划日期为最新值（幂等处理），不抛错
            recipeFavoriteMapper.updatePlanDate(userId, recipeId, planCookDate);
        } else {
            // 未收藏则插入收藏并保存计划日期
            recipeFavoriteMapper.insert(userId, recipeId, planCookDate);
        }
        // 同步写入每日菜谱表（仅当选择了计划日期）
        if (planCookDate != null) {
            dailyRecipeService.addToDailyRecipes(recipeId, userId, planCookDate);
        }
    }

    // 修改计划日期
    public void updatePlan(Long userId, Integer recipeId, LocalDate newDate) {
        recipeFavoriteMapper.updatePlanDate(userId, recipeId, newDate);
        // 同步每日菜谱表
        if (newDate != null) {
            dailyRecipeService.addToDailyRecipes(recipeId, userId, newDate);
        }
    }

    // 取消计划
    public void cancelPlan(Long userId, Integer recipeId) {
        // 先查询当前收藏记录，拿到原计划日期
        RecipeFavorite existing = recipeFavoriteMapper.selectByUserAndRecipe(userId, recipeId);
        // 清空计划日期
        recipeFavoriteMapper.clearPlanDate(userId, recipeId);
        // 同步移除每日菜谱表中的记录（需要日期）
        if (existing != null && existing.getPlanCookDate() != null) {
            dailyRecipeService.removeFromDailyRecipes(recipeId, userId, existing.getPlanCookDate());
        }
    }

    // 每日菜谱查询
    public List<RecipeVO> getDailyFavorites(Long userId, LocalDate date) {
        List<RecipeFavorite> favorites = recipeFavoriteMapper.selectDailyFavorites(userId, date);
        
        // 转换为RecipeVO对象
        return favorites.stream().map(favorite -> {
            Recipe recipe = recipeMapper.selectById(favorite.getRecipeId());
            RecipeVO vo = new RecipeVO();
            vo.setFavoriteId(favorite.getId());
            vo.setRecipeId(favorite.getRecipeId().longValue());
            if (recipe != null) {
                vo.setRecipeName(recipe.getName());
                vo.setFeature(recipe.getFeature());
            }
            vo.setPlanCookDate(favorite.getPlanCookDate());
            return vo;
        }).collect(Collectors.toList());
    }
    
    // 获取用户收藏的菜谱视图（菜谱字段 + 收藏时间 + 计划日期）
    public Map<String, Object> getUserFavoriteRecipesView(Long userId, int page, int pageSize) {
        Map<String, Object> result = new HashMap<>();
        
        int offset = (page - 1) * pageSize;
        List<Map<String, Object>> favorites = recipeFavoriteMapper.selectUserFavoriteRecipesView(userId, offset, pageSize);
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
}