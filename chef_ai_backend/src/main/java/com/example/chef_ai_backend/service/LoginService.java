package com.example.chef_ai_backend.service;

import com.example.chef_ai_backend.mapper.UserMapper;
import com.example.chef_ai_backend.model.User;
import com.example.chef_ai_backend.util.TokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class LoginService {
    // 1. 初始化日志对象
    private static final Logger log = LoggerFactory.getLogger(LoginService.class);

    @Value("${wechat.appid}")
    private String appid;

    @Value("${wechat.secret}")
    private String secret;

    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private TokenUtil tokenUtil;
    
    @Autowired
    private RestTemplate restTemplate;

    /**
     * 微信登录处理
     * @param code 临时登录凭证
     * @return 登录结果，包含token和用户信息
     */
    public Map<String, Object> loginWithWechat(String code) {
        // 2. 每步关键操作都加日志，定位异常位置
        log.info("开始微信登录，接收的 code：{}", code);
        try {
            // 1. 调用微信接口换取openid和session_key
            log.info("调用微信 jscode2session 接口，appid：{}", appid);
            String url = String.format(
                "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code",
                appid, secret, code);

            // 发送请求到微信服务器
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            log.info("微信接口返回结果：{}", response); // 关键：打印微信返回的所有数据
            
            if (response == null) {
                log.error("微信服务器响应为空");
                throw new RuntimeException("微信服务器响应为空");
            }
            
            // 检查是否有错误码
            if (response.containsKey("errcode") && !response.get("errcode").equals(0)) {
                String errMsg = response.get("errmsg") == null ? "微信接口调用失败" : (String) response.get("errmsg");
                log.error("微信登录失败：{}，errcode：{}", errMsg, response.get("errcode"));
                throw new RuntimeException("微信登录失败: " + errMsg);
            }
            
            // 获取openid
            String openid = (String) response.get("openid");
            String sessionKey = (String) response.get("session_key");
            
            if (openid == null || openid.isEmpty()) {
                log.error("微信接口未返回 openid，响应：{}", response);
                throw new RuntimeException("未获取到微信用户标识");
            }
            log.info("获取到微信 openid：{}", openid);

            // 2. 根据openid查找或创建用户
            log.info("根据 openid 查询用户：{}", openid);
            User user = getUserByOpenid(openid);
            
            // 3. 生成自定义登录态token并存储到Redis
            log.info("为用户生成 Token，userId：{}", user.getId());
            String token = tokenUtil.generateToken(user.getId());
            log.info("生成 Token 成功：{}", token);
            
            // 4. 返回结果
            Map<String, Object> result = new HashMap<>();
            result.put("token", token);
            result.put("userInfo", user);
            log.info("微信登录成功，返回结果：{}", result);
            
            return result;
            
        } catch (Exception e) {
            // 3. 捕获所有异常，打印详细堆栈信息（关键：定位根本原因）
            log.error("微信登录过程发生异常", e); // 注意：这里要传 e，才能打印堆栈
            throw new RuntimeException("登录失败：" + e.getMessage()); // 抛出自定义异常，让全局异常处理器捕获
        }
    }
    
    /**
     * 根据openid获取用户信息，如果不存在则创建新用户
     * @param openid 微信用户的唯一标识
     * @return 用户信息
     */
    private User getUserByOpenid(String openid) {
        try {
            // 从数据库查询用户
            log.info("开始查询用户，openid：{}", openid);
            User existingUser = userMapper.selectByOpenid(openid);
            if (existingUser != null) {
                log.info("用户已存在，更新最后登录时间，userId：{}", existingUser.getId());
                // 更新最后登录时间
                existingUser.setUpdatedAt(LocalDateTime.now());
                userMapper.updateById(existingUser);
                return existingUser;
            }
            
            // 不存在则创建新用户
            log.info("用户不存在，创建新用户，openid：{}", openid);
            User newUser = new User();
            newUser.setOpenid(openid);
            newUser.setNickname("微信用户"); // 修改为nickname
            newUser.setAvatarUrl(""); // 修改为avatarUrl
            newUser.setCreatedAt(LocalDateTime.now());
            newUser.setUpdatedAt(LocalDateTime.now());
            
            userMapper.insert(newUser);
            log.info("新用户创建成功，userId：{}", newUser.getId());
            return newUser;
        } catch (Exception e) {
            log.error("查询或创建用户时发生异常，openid：{}", openid, e);
            throw new RuntimeException("用户处理失败：" + e.getMessage());
        }
    }
}