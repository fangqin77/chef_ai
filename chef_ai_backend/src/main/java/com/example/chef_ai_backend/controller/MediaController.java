package com.example.chef_ai_backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/media")
@CrossOrigin(origins = "*")
public class MediaController {

    @Value("${media.uploadDir:uploads}")
    private String uploadDir;

    @Value("${media.baseUrl:http://172.20.10.3:9000/media/}")
    private String baseUrl;

    @Value("${media.maxSizeMB.image:10}")
    private int maxImageMB;

    @Value("${media.maxSizeMB.video:100}")
    private int maxVideoMB;

    @Value("${media.allowedTypes:image/jpeg,image/png,image/gif,video/mp4,video/quicktime,video/x-msvideo}")
    private String allowedTypes;

    @PostMapping("/upload")
    public Map<String, Object> upload(@RequestParam("file") MultipartFile file,
                                      HttpServletRequest request) {
        if (file == null || file.isEmpty()) {
            return Map.of("success", false, "message", "文件为空");
        }
        // 校验 MIME 类型
        String contentType = file.getContentType();
        boolean allowed = false;
        if (contentType != null) {
            for (String t : allowedTypes.split(",")) {
                if (contentType.equalsIgnoreCase(t.trim())) { allowed = true; break; }
            }
        }
        if (!allowed) {
            return Map.of("success", false, "message", "不支持的文件类型: " + contentType);
        }

        // 业务限制：按类型分别校验大小
        boolean isVideo = contentType != null && contentType.toLowerCase().startsWith("video/");
        int limitMB = isVideo ? maxVideoMB : maxImageMB;
        long maxBytes = (long) limitMB * 1024 * 1024;
        if (file.getSize() > maxBytes) {
            return Map.of("success", false, "message", (isVideo ? "视频" : "图片") + "过大，最大允许 " + limitMB + "MB");
        }
        try {
            // 确保目录存在
            Path dirPath = Paths.get(uploadDir).toAbsolutePath();
            Files.createDirectories(dirPath);

            // 生成文件名（保留扩展名）
            String originalName = file.getOriginalFilename();
            String ext = "";
            if (originalName != null && originalName.contains(".")) {
                ext = originalName.substring(originalName.lastIndexOf('.'));
            }
            String filename = UUID.randomUUID().toString() + ext;
            Path target = dirPath.resolve(filename);

            // 保存文件
            file.transferTo(target.toFile());

            // 返回可访问 URL（通过 /media/** 静态资源映射）
            String url = baseUrl + filename;
            return Map.of("success", true, "url", url);
        } catch (IOException e) {
            return Map.of("success", false, "message", "上传失败: " + e.getMessage());
        }
    }
}