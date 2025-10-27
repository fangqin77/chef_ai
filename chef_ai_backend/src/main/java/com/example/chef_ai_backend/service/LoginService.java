package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.UserMapper;
import com.example.chef_ai_backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class LoginService {

    @Value("${wechat.appid}")
    private String appid;

    @Value("${wechat.secret}")
    private String secret;

    @Autowired
    private UserMapper userMapper;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * 微信登录处理
     * @param code 临时登录凭证
     * @return 登录结果，包含token和用户信息
     */
    public Map<String, Object> loginWithWechat(String code) {
        // 1. 调用微信接口换取openid和session_key
        String url = String.format(
            "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code",
            appid, secret, code);

        try {
            // 发送请求到微信服务器
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            
            if (response == null) {
                throw new RuntimeException("微信服务器响应为空");
            }
            
            // 检查是否有错误码
            if (response.containsKey("errcode") && !response.get("errcode").equals(0)) {
                throw new RuntimeException("微信登录失败: " + response.get("errmsg"));
            }
            
            // 获取openid
            String openid = (String) response.get("openid");
            String sessionKey = (String) response.get("session_key");
            
            // 2. 根据openid查找或创建用户
            User user = getUserByOpenid(openid);
            
            // 3. 生成自定义登录态token
            String token = generateToken(openid);
            
            // 4. 返回结果
            Map<String, Object> result = new HashMap<>();
            result.put("token", token);
            result.put("userInfo", user);
            
            return result;
            
        } catch (HttpClientErrorException e) {
            throw new RuntimeException("请求微信服务器失败: " + e.getMessage());
        }
    }
    
    /**
     * 根据openid获取用户信息，如果不存在则创建新用户
     * @param openid 微信用户的唯一标识
     * @return 用户信息
     */
    private User getUserByOpenid(String openid) {
        // 从数据库查询用户
        User existingUser = userMapper.selectByOpenid(openid);
        if (existingUser != null) {
            // 更新最后登录时间
            existingUser.setUpdateTime(LocalDateTime.now());
            userMapper.updateById(existingUser);
            return existingUser;
        }
        
        // 不存在则创建新用户
        User newUser = new User();
        newUser.setOpenid(openid);
        newUser.setUsername("微信用户");
        newUser.setAvatar("");
        newUser.setSignature("");
        newUser.setFollowCount(0);
        newUser.setFanCount(0);
        newUser.setLikeCount(0);
        newUser.setCreateTime(LocalDateTime.now());
        newUser.setUpdateTime(LocalDateTime.now());
        
        userMapper.insert(newUser);
        return newUser;
    }
    
    /**
     * 生成自定义登录态token（简化实现）
     * @param openid 用户的openid
     * @return token
     */
    private String generateToken(String openid) {
        // 实际项目中应该使用JWT或其他更安全的方式生成token
        return Base64.getEncoder().encodeToString((openid + System.currentTimeMillis()).getBytes());
    }
}