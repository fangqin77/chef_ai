package com.example.chef_ai_backend.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.example.chef_ai_backend.mapper")
public class MyBatisConfig {
}