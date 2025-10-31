package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.RecipeMapper;
import com.example.chef_ai_backend.model.Recipe;
import com.example.chef_ai_backend.model.RecipeType;
import com.example.chef_ai_backend.model.RecipeCategory;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RecipeService {
    private final RecipeMapper recipeMapper;

    public RecipeService(RecipeMapper recipeMapper) {
        this.recipeMapper = recipeMapper;
    }

    // 获取非根节点分类（包含满汉全席和家庭实用菜谱大全）
    public List<RecipeType> getNonRootCategories() {
        return recipeMapper.selectNonRootCategories();
    }

    // 根据分类获取菜谱
    public List<Recipe> getRecipesByCategory(Integer categoryId, int limit) {
        if (categoryId == null) {
            return recipeMapper.selectHotRecipes(limit);
        }
        return recipeMapper.selectByCategoryId(categoryId, limit);
    }

    // 搜索菜谱
    public List<Recipe> searchRecipes(String keyword) {
        return recipeMapper.searchRecipes(keyword);
    }
    
    // 根据ID获取菜谱详情
    public Recipe getRecipeById(Integer id) {
        return recipeMapper.selectById(id);
    }
    
    // 获取所有分类
    public List<RecipeCategory> getAllCategories() {
        return recipeMapper.selectAllCategories();
    }
}