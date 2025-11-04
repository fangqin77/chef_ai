package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.RecipeMapper;
import com.example.chef_ai_backend.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminRecipeService {
    @Autowired
    private RecipeMapper recipeMapper;

    public Map<String, Object> list(String keyword, int page, int pageSize) {
        int offset = (Math.max(page, 1) - 1) * Math.max(pageSize, 1);
        java.util.List<java.util.Map<String, Object>> list = recipeMapper.adminListRecipesView(keyword, offset, pageSize);
        int total = recipeMapper.adminCountRecipes(keyword);
        Map<String, Object> data = new HashMap<>();
        data.put("list", list);
        data.put("total", total);
        data.put("page", page);
        data.put("pageSize", pageSize);
        return Map.of("success", true, "data", data);
    }

    public Map<String, Object> create(Recipe recipe) {
        recipeMapper.insertRecipe(recipe);
        return Map.of("success", true, "data", recipe);
    }

    // 新增：支持多分类
    public Map<String, Object> create(Recipe recipe, java.util.List<Integer> categoryIds) {
        recipeMapper.insertRecipe(recipe);
        if (categoryIds != null && !categoryIds.isEmpty()) {
            for (Integer cid : categoryIds) {
                if (cid != null) recipeMapper.insertRecipeCategoryRelation(recipe.getId(), cid);
            }
        }
        return Map.of("success", true, "data", recipe);
    }

    public Map<String, Object> listCategories() {
        return Map.of("success", true, "data", recipeMapper.selectAllCategories());
    }

    public Map<String, Object> update(Recipe recipe) {
        if (recipe.getId() == null) return Map.of("success", false, "message", "缺少ID");
        recipeMapper.updateRecipe(recipe);
        return Map.of("success", true);
    }

    // 新增：更新时重建多分类关系
    public Map<String, Object> updateWithCategories(Recipe recipe, java.util.List<Integer> categoryIds) {
        if (recipe.getId() == null) return Map.of("success", false, "message", "缺少ID");
        recipeMapper.updateRecipe(recipe);
        recipeMapper.deleteRecipeCategoryRelations(recipe.getId());
        if (categoryIds != null && !categoryIds.isEmpty()) {
            for (Integer cid : categoryIds) {
                if (cid != null) recipeMapper.insertRecipeCategoryRelation(recipe.getId(), cid);
            }
        }
        return Map.of("success", true);
    }

    public Map<String, Object> delete(Integer id) {
        recipeMapper.deleteRecipeCategoryRelations(id);
        recipeMapper.deleteRecipe(id);
        return Map.of("success", true);
    }
}
