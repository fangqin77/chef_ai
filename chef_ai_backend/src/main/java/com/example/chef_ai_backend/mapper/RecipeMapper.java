package com.example.chef_ai_backend.mapper;

import com.example.chef_ai_backend.model.Recipe;
import com.example.chef_ai_backend.model.RecipeType;
import com.example.chef_ai_backend.model.RecipeCategory;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RecipeMapper {
    List<Recipe> selectHotRecipes(@Param("limit") Integer limit);
    
    // 获取非根节点分类（排除parentNode为0或null的节点）
    List<RecipeType> selectNonRootCategories();
    
    // 根据分类ID获取菜谱
    List<Recipe> selectByCategoryId(@Param("categoryId") Integer categoryId, @Param("limit") Integer limit);
    
    // 根据新分类ID获取菜谱
    List<Recipe> selectByNewCategoryId(@Param("categoryId") Integer categoryId, @Param("limit") Integer limit);
    
    // 搜索菜谱（模糊匹配名称、原料、做法）
    List<Recipe> searchRecipes(@Param("keyword") String keyword);
    
    // 根据ID获取菜谱详情
    Recipe selectById(@Param("id") Integer id);
    
    // 获取所有分类
    List<RecipeCategory> selectAllCategories();
    
    // 获取所有菜谱（无限制）
    List<Recipe> selectAllRecipes();
    
    // 随机获取菜谱
    List<Recipe> selectRandomRecipes(@Param("limit") Integer limit);

    // ===== 管理端分页查询 =====
    List<Recipe> adminListRecipes(@Param("keyword") String keyword,
                                  @Param("offset") int offset,
                                  @Param("limit") int limit);
    int adminCountRecipes(@Param("keyword") String keyword);

    // ===== 基本 CRUD =====
    int insertRecipe(Recipe recipe);
    int updateRecipe(Recipe recipe);
    int deleteRecipe(@Param("id") Integer id);
}