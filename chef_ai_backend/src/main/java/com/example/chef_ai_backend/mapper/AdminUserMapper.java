package com.example.chef_ai_backend.mapper;

import com.example.chef_ai_backend.model.AdminUser;
import org.apache.ibatis.annotations.Param;

public interface AdminUserMapper {
    AdminUser selectByUsername(@Param("username") String username);
}
