package com.example.chef_ai_backend.mapper;

import com.example.chef_ai_backend.model.RecipeType;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RecipeTypeMapper {
    List<RecipeType> selectAll();
}