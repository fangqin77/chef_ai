package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.FoodCircleMapper;
import com.example.chef_ai_backend.mapper.RecipeMapper;
import com.example.chef_ai_backend.mapper.UserMapper;
import com.example.chef_ai_backend.model.FoodCircle;
import com.example.chef_ai_backend.model.Recipe;
import com.example.chef_ai_backend.model.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HomeService {

    private final RecipeMapper recipeMapper;
    private final FoodCircleMapper foodCircleMapper;
    private final UserMapper userMapper;

    public HomeService(RecipeMapper recipeMapper,
                       FoodCircleMapper foodCircleMapper,
                       UserMapper userMapper) {
        this.recipeMapper = recipeMapper;
        this.foodCircleMapper = foodCircleMapper;
        this.userMapper = userMapper;
    }

    public Map<String, Object> home(int recipeLimit, int dynamicLimit, int authorLimit) {
        List<Recipe> recipes = recipeMapper.selectHotRecipes(recipeLimit);
        List<FoodCircle> dynamics = foodCircleMapper.selectLatest(dynamicLimit);
        List<User> authors = userMapper.selectRecommended(authorLimit);

        Map<String, Object> map = new HashMap<>();
        map.put("recipes", recipes);
        map.put("dynamics", dynamics);
        map.put("authors", authors);
        return map;
    }
}