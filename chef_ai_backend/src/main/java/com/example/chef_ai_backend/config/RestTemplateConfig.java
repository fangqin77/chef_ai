package com.example.chef_ai_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        
        // 1. 获取默认的 JSON 转换器（MappingJackson2HttpMessageConverter）
        MappingJackson2HttpMessageConverter jacksonConverter = new MappingJackson2HttpMessageConverter();
        
        // 2. 给 JSON 转换器添加支持的媒体类型：新增 text/plain
        List<MediaType> supportedMediaTypes = new ArrayList<>();
        supportedMediaTypes.add(MediaType.APPLICATION_JSON);
        supportedMediaTypes.add(MediaType.TEXT_PLAIN); // 关键：添加 text/plain 类型
        jacksonConverter.setSupportedMediaTypes(supportedMediaTypes);
        
        // 3. 替换 RestTemplate 默认的转换器（或添加到转换器列表首位）
        restTemplate.getMessageConverters().removeIf(converter -> 
            converter instanceof MappingJackson2HttpMessageConverter
        );
        restTemplate.getMessageConverters().add(jacksonConverter);
        
        return restTemplate;
    }
}