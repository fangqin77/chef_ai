package com.example.chef_ai_backend.controller;

import com.example.chef_ai_backend.service.AdminFavoriteService;
import com.example.chef_ai_backend.util.TokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class ApiFavoriteController {

    @Autowired
    private AdminFavoriteService favoriteService; // 复用已有服务逻辑

    @Autowired
    private TokenUtil tokenUtil;

    private Long requireUserId(HttpServletRequest request){
        String token = request.getHeader("Token");
        Long userId = tokenUtil.validateToken(token);
        if (userId == null) throw new RuntimeException("未登录或Token无效");
        return userId;
    }

    // 收藏菜谱（小程序）
    @PostMapping("/recipes/{id}/favorite")
    public Map<String,Object> favorite(@PathVariable("id") Integer recipeId, HttpServletRequest request){
        Long userId = requireUserId(request);
        return favoriteService.favorite(userId, recipeId);
    }

    // 取消收藏（小程序）
    @DeleteMapping("/recipes/{id}/favorite")
    public Map<String,Object> unfavorite(@PathVariable("id") Integer recipeId, HttpServletRequest request){
        Long userId = requireUserId(request);
        return favoriteService.unfavorite(userId, recipeId);
    }

    // 我的收藏列表（带收藏时间）
    @GetMapping("/recipes/favorites")
    public Map<String,Object> listFavorites(@RequestParam(defaultValue = "1") int page,
                                            @RequestParam(defaultValue = "10") int pageSize,
                                            HttpServletRequest request){
        Long userId = requireUserId(request);
        return favoriteService.list(userId, page, pageSize);
    }

    // 可选：检查某菜谱是否已收藏（便于小程序页面显示状态）
    @GetMapping("/recipes/{id}/favorite")
    public Map<String,Object> isFavorite(@PathVariable("id") Integer recipeId, HttpServletRequest request){
        Long userId = requireUserId(request);
        Map<String,Object> listResp = favoriteService.list(userId, 1, 1_000_000);
        Map<String,Object> data = (Map<String,Object>) listResp.get("data");
        List<Map<String,Object>> list = data == null ? null : (List<Map<String,Object>>) data.get("list");
        boolean favored = false;
        if (list != null){
            for (Map<String,Object> row: list){
                Object rid = row.get("id");
                if (rid != null && String.valueOf(rid).equals(String.valueOf(recipeId))){
                    favored = true; break;
                }
            }
        }
        return Map.of("success", true, "data", Map.of("favorite", favored));
    }
}
