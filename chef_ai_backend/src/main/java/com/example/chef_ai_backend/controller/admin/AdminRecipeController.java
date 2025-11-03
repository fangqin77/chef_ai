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
    public Map<String, Object> create(@RequestBody Recipe recipe) {
        return adminRecipeService.create(recipe);
    }

    @PutMapping("/{id}")
    public Map<String, Object> update(@PathVariable Integer id, @RequestBody Recipe recipe) {
        recipe.setId(id);
        return adminRecipeService.update(recipe);
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
