package com.example.chef_ai_backend.controller.app;

import com.example.chef_ai_backend.service.AppRecipeFavoriteService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/app/recipes")
@CrossOrigin(origins = "*")
public class AppRecipeFavoriteController {
    @Autowired
    private AppRecipeFavoriteService appRecipeFavoriteService;

    // 添加收藏（幂等）
    @PostMapping("/{id}/favorite")
    public Map<String, Object> favorite(@PathVariable("id") Integer recipeId, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        return appRecipeFavoriteService.favorite(userId, recipeId);
    }

    // 取消收藏（幂等）
    @DeleteMapping("/{id}/favorite")
    public Map<String, Object> unfavorite(@PathVariable("id") Integer recipeId, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        return appRecipeFavoriteService.unfavorite(userId, recipeId);
    }

    // 收藏列表：返回菜谱视图 + 收藏时间（favorite_time）
    @GetMapping("/favorites")
    public Map<String, Object> myFavorites(@RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "10") int pageSize,
                                           @RequestParam(defaultValue = "true") boolean view,
                                           HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        return appRecipeFavoriteService.listUserFavorites(userId, page, pageSize, view);
    }
}
