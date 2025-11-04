package com.example.chef_ai_backend.mapper;

import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FavoriteMapper {
    int insertFavorite(@Param("adminUserId") Long adminUserId, @Param("recipeId") Integer recipeId);
    int deleteFavorite(@Param("adminUserId") Long adminUserId, @Param("recipeId") Integer recipeId);
    List<Map<String,Object>> listFavorites(@Param("adminUserId") Long adminUserId,
                                           @Param("offset") int offset,
                                           @Param("limit") int limit);
    int countFavorites(@Param("adminUserId") Long adminUserId);
}