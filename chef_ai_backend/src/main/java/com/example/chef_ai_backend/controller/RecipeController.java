package com.example.chef_ai_backend.controller;

import com.example.chef_ai_backend.model.Recipe;
import com.example.chef_ai_backend.model.RecipeType;
import com.example.chef_ai_backend.service.RecipeService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")  // 允许所有来源跨域（开发环境临时使用）
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    // 获取非根节点分类
    @GetMapping("/categories")
    public List<RecipeType> getCategories() {
        return recipeService.getNonRootCategories();
    }

    // 根据分类获取菜谱
    @GetMapping
    public List<Recipe> getRecipes(
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(defaultValue = "20") int limit) {
        return recipeService.getRecipesByCategory(categoryId, limit);
    }

    // 搜索菜谱
    @GetMapping("/search")
    public List<Recipe> searchRecipes(@RequestParam String keyword) {
        return recipeService.searchRecipes(keyword);
    }
    
    // 根据ID获取菜谱详情
    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable Integer id) {
        return recipeService.getRecipeById(id);
    }
}