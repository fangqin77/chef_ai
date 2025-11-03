package com.example.chef_ai_backend.model;

public class Recipe {
    private Integer id;
    private Integer typeId;
    private String name;
    private String method;
    private String condiments;
    private String ingredients;
    private String feature;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getTypeId() { return typeId; }
    public void setTypeId(Integer typeId) { this.typeId = typeId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public String getCondiments() { return condiments; }
    public void setCondiments(String condiments) { this.condiments = condiments; }

    public String getIngredients() { return ingredients; }
    public void setIngredients(String ingredients) { this.ingredients = ingredients; }

    public String getFeature() { return feature; }
    public void setFeature(String feature) { this.feature = feature; }
}