package com.example.chef_ai_backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class DailyRecipe {
    private Long id;
    private Integer recipeId;
    private Long userId;
    private LocalDateTime createdAt;
    private LocalDate date;

    // Constructors
    public DailyRecipe() {}

    public DailyRecipe(Integer recipeId, Long userId, LocalDate date) {
        this.recipeId = recipeId;
        this.userId = userId;
        this.date = date;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}