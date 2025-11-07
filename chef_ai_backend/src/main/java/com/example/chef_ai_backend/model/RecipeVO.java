package com.example.chef_ai_backend.model;

import java.time.LocalDate;

public class RecipeVO {
    private Long favoriteId;
    private Long recipeId;
    private String recipeName;
    private String cover;
    private Integer cookTime;
    private LocalDate planCookDate;
    private String feature;

    public Long getFavoriteId() {
        return favoriteId;
    }

    public void setFavoriteId(Long favoriteId) {
        this.favoriteId = favoriteId;
    }

    public Long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public Integer getCookTime() {
        return cookTime;
    }

    public void setCookTime(Integer cookTime) {
        this.cookTime = cookTime;
    }

    public LocalDate getPlanCookDate() {
        return planCookDate;
    }

    public void setPlanCookDate(LocalDate planCookDate) {
        this.planCookDate = planCookDate;
    }

    public String getFeature() {
        return feature;
    }

    public void setFeature(String feature) {
        this.feature = feature;
    }
}