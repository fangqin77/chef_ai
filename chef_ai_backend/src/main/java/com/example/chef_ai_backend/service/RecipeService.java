package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.RecipeMapper;
import com.example.chef_ai_backend.mapper.RecipeFavoriteMapper;
import com.example.chef_ai_backend.model.Recipe;
import com.example.chef_ai_backend.model.RecipeType;
import com.example.chef_ai_backend.model.RecipeCategory;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecipeService {
    private final RecipeMapper recipeMapper;
    private final RecipeFavoriteMapper recipeFavoriteMapper;

    public RecipeService(RecipeMapper recipeMapper, RecipeFavoriteMapper recipeFavoriteMapper) {
        this.recipeMapper = recipeMapper;
        this.recipeFavoriteMapper = recipeFavoriteMapper;
    }

    // 获取非根节点分类（包含满汉全席和家庭实用菜谱大全）
    public List<RecipeType> getNonRootCategories() {
        return recipeMapper.selectNonRootCategories();
    }

    // 根据分类获取菜谱
    public List<Recipe> getRecipesByCategory(Integer categoryId, Integer limit) {
        // 如果limit为null，表示不设限制，返回所有匹配的菜谱
        if (categoryId == null) {
            if (limit == null) {
                return recipeMapper.selectAllRecipes();
            }
            return recipeMapper.selectHotRecipes(limit);
        }
        
        if (limit == null) {
            return recipeMapper.selectByCategoryId(categoryId, null);
        }
        return recipeMapper.selectByCategoryId(categoryId, limit);
    }

    // 根据新分类体系获取菜谱
    public List<Recipe> getRecipesByNewCategory(Integer categoryId, Integer limit) {
        // 如果limit为null，表示不设限制，返回所有匹配的菜谱
        if (categoryId == null) {
            if (limit == null) {
                return recipeMapper.selectAllRecipes();
            }
            return recipeMapper.selectHotRecipes(limit);
        }
        
        if (limit == null) {
            return recipeMapper.selectByNewCategoryId(categoryId, null);
        }
        return recipeMapper.selectByNewCategoryId(categoryId, limit);
    }

    // 搜索菜谱
    public List<Recipe> searchRecipes(String keyword) {
        return recipeMapper.searchRecipes(keyword);
    }
    
    // 根据ID获取菜谱详情
    public Recipe getRecipeById(Integer id) {
        return recipeMapper.selectById(id);
    }
    
    // 根据ID获取菜谱详情（带收藏状态）
    public Map<String, Object> getRecipeDetailById(Integer id, Long userId) {
        Recipe recipe = recipeMapper.selectById(id);
        if (recipe == null) {
            return null;
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("recipe", recipe);
        
        // 如果用户已登录，检查是否已收藏
        if (userId != null) {
            boolean isFavorited = recipeFavoriteMapper.selectFavorite(id, userId) != null;
            result.put("favorited", isFavorited);
        } else {
            result.put("favorited", false);
        }
        
        // 获取收藏次数
        int favoriteCount = recipeFavoriteMapper.countRecipeFavorites(id);
        result.put("favoriteCount", favoriteCount);
        
        return result;
    }
    
    // 获取所有分类
    public List<RecipeCategory> getAllCategories() {
        return recipeMapper.selectAllCategories();
    }
    
    // 随机获取菜谱
    public List<Recipe> getRandomRecipes(Integer limit) {
        if (limit == null) {
            limit = 3; // 默认返回3个
        }
        return recipeMapper.selectRandomRecipes(limit);
    }
    
    // 获取热门菜谱
    public List<Recipe> getHotRecipes(Integer limit) {
        if (limit == null) {
            limit = 10; // 默认返回10个
        }
        return recipeMapper.selectHotRecipes(limit);
    }
}