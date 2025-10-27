package com.example.chef_ai_backend.mapper;

import com.example.chef_ai_backend.model.Recipe;
import com.example.chef_ai_backend.model.RecipeType;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RecipeMapper {
    List<Recipe> selectHotRecipes(@Param("limit") int limit);
    
    // 获取非根节点分类（排除parentNode为0或null的节点）
    List<RecipeType> selectNonRootCategories();
    
    // 根据分类ID获取菜谱
    List<Recipe> selectByCategoryId(@Param("categoryId") Integer categoryId, @Param("limit") int limit);
    
    // 搜索菜谱（模糊匹配名称、原料、做法）
    List<Recipe> searchRecipes(@Param("keyword") String keyword);
}