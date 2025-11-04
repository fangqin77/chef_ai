package com.example.chef_ai_backend.controller.admin;

import com.example.chef_ai_backend.model.Recipe;
import com.example.chef_ai_backend.service.AdminRecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin/recipes")
@CrossOrigin(origins = "*")
public class AdminRecipeController {
    @Autowired
    private AdminRecipeService adminRecipeService;

    @GetMapping
    public Map<String, Object> list(@RequestParam(required = false) String keyword,
                                    @RequestParam(defaultValue = "1") int page,
                                    @RequestParam(defaultValue = "10") int pageSize) {
        return adminRecipeService.list(keyword, page, pageSize);
    }

    @PostMapping
    public Map<String, Object> create(@RequestBody Map<String, Object> body) {
        Recipe recipe = new Recipe();
        recipe.setName((String) body.get("name"));
        recipe.setFeature((String) body.get("feature"));
        Object difficulty = body.get("ingredients");
        if (difficulty instanceof Number) recipe.setIngredients(((Number) difficulty).intValue());
        else if (difficulty instanceof String) {
            try { recipe.setIngredients(Integer.parseInt((String) difficulty)); } catch (Exception ignore) { recipe.setIngredients(null); }
        } else { recipe.setIngredients(null); }
        recipe.setCondiments((String) body.get("condiments"));
        recipe.setMethod((String) body.get("method"));
        java.util.List<Integer> categoryIds = (java.util.List<Integer>) body.get("categoryIds");
        return adminRecipeService.create(recipe, categoryIds);
    }

    @PutMapping("/{id}")
    public Map<String, Object> update(@PathVariable Integer id, @RequestBody Map<String, Object> body) {
        Recipe recipe = new Recipe();
        recipe.setId(id);
        recipe.setName((String) body.get("name"));
        recipe.setFeature((String) body.get("feature"));
        Object difficulty = body.get("ingredients");
        if (difficulty instanceof Number) recipe.setIngredients(((Number) difficulty).intValue());
        else if (difficulty instanceof String) {
            try { recipe.setIngredients(Integer.parseInt((String) difficulty)); } catch (Exception ignore) { recipe.setIngredients(null); }
        } else { recipe.setIngredients(null); }
        recipe.setCondiments((String) body.get("condiments"));
        recipe.setMethod((String) body.get("method"));
        java.util.List<Integer> categoryIds = (java.util.List<Integer>) body.get("categoryIds");
        return adminRecipeService.updateWithCategories(recipe, categoryIds);
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable Integer id) {
        return adminRecipeService.delete(id);
    }

    @GetMapping("/categories")
    public Map<String, Object> categories() {
        return adminRecipeService.listCategories();
    }
}
