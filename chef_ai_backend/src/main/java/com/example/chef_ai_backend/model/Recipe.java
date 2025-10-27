package com.example.chef_ai_backend.model;

public class Recipe {
    private Integer recipeId;
    private Integer cuisineType;
    private String name;
    private String steps;
    private String ingredients;
    private String coverImg;
    private String difficulty;
    private Integer cookTime;

    public Integer getRecipeId() { return recipeId; }
    public void setRecipeId(Integer recipeId) { this.recipeId = recipeId; }

    public Integer getCuisineType() { return cuisineType; }
    public void setCuisineType(Integer cuisineType) { this.cuisineType = cuisineType; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSteps() { return steps; }
    public void setSteps(String steps) { this.steps = steps; }

    public String getIngredients() { return ingredients; }
    public void setIngredients(String ingredients) { this.ingredients = ingredients; }

    public String getCoverImg() { return coverImg; }
    public void setCoverImg(String coverImg) { this.coverImg = coverImg; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public Integer getCookTime() { return cookTime; }
    public void setCookTime(Integer cookTime) { this.cookTime = cookTime; }
}