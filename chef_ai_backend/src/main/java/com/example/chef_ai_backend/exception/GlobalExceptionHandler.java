package com.example.chef_ai_backend.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * 全局异常处理器：统一处理所有 Controller 层的异常
 */
@RestControllerAdvice // 作用于所有 @RestController 注解的类
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // 处理自定义业务异常（如 RuntimeException）
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST) // 返回 400 状态码（而非 500）
    public Map<String, Object> handleRuntimeException(RuntimeException e) {
        log.error("业务异常：", e);
        Map<String, Object> result = new HashMap<>();
        result.put("success", false);
        result.put("code", 400); // 自定义业务错误码
        result.put("msg", e.getMessage()); // 返回具体错误信息（如"微信 code 已过期"）
        result.put("data", null);
        return result;
    }

    // 处理其他未捕获的异常（兜底）
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, Object> handleException(Exception e) {
        log.error("系统异常：", e);
        Map<String, Object> result = new HashMap<>();
        result.put("success", false);
        result.put("code", 500);
        result.put("msg", "服务器内部错误：" + e.getMessage()); // 返回部分信息，避免暴露敏感内容
        result.put("data", null);
        return result;
    }
}