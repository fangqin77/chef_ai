package com.example.chef_ai_backend.mapper;

import com.example.chef_ai_backend.model.Recipe;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RecipeMapper {
    List<Recipe> selectHotRecipes(@Param("limit") int limit);
}