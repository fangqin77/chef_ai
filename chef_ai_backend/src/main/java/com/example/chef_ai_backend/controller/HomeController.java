package com.example.chef_ai_backend.controller;

import com.example.chef_ai_backend.service.HomeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {

    private final HomeService homeService;

    public HomeController(HomeService homeService) {
        this.homeService = homeService;
    }

    @GetMapping("/api/home")
    public Map<String, Object> home(@RequestParam(defaultValue = "6") int recipeLimit,
                                     @RequestParam(defaultValue = "6") int dynamicLimit,
                                     @RequestParam(defaultValue = "6") int authorLimit) {
        return homeService.home(recipeLimit, dynamicLimit, authorLimit);
    }
}