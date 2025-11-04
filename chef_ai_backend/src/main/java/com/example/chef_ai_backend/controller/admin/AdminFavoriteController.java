package com.example.chef_ai_backend.controller.admin;

import com.example.chef_ai_backend.service.AdminFavoriteService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin/recipes")
@CrossOrigin(origins = "*")
public class AdminFavoriteController {

    @Autowired
    private AdminFavoriteService adminFavoriteService;

    @PostMapping("/{id}/favorite")
    public Map<String,Object> favorite(@PathVariable("id") Integer recipeId, HttpServletRequest request){
        Long adminUserId = (Long) request.getAttribute("adminUserId");
        return adminFavoriteService.favorite(adminUserId, recipeId);
    }

    @DeleteMapping("/{id}/favorite")
    public Map<String,Object> unfavorite(@PathVariable("id") Integer recipeId, HttpServletRequest request){
        Long adminUserId = (Long) request.getAttribute("adminUserId");
        return adminFavoriteService.unfavorite(adminUserId, recipeId);
    }

    @GetMapping("/favorites")
    public Map<String,Object> listFavorites(@RequestParam(defaultValue = "1") int page,
                                            @RequestParam(defaultValue = "10") int pageSize,
                                            HttpServletRequest request){
        Long adminUserId = (Long) request.getAttribute("adminUserId");
        return adminFavoriteService.list(adminUserId, page, pageSize);
    }
}
