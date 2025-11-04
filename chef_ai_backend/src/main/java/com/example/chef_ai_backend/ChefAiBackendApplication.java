package com.example.chef_ai_backend;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.chef_ai_backend.mapper")
public class ChefAiBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChefAiBackendApplication.class, args);
    }

}