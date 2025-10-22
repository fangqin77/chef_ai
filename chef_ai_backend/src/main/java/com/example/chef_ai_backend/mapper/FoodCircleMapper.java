package com.example.chef_ai_backend.mapper;

import com.example.chef_ai_backend.model.FoodCircle;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FoodCircleMapper {
    List<FoodCircle> selectLatest(@Param("limit") int limit);
}