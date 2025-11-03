/*
 Navicat Premium Dump SQL

 Source Server         : chef_ai
 Source Server Type    : MySQL
 Source Server Version : 80028 (8.0.28)
 Source Host           : localhost:3306
 Source Schema         : chef_ai

 Target Server Type    : MySQL
 Target Server Version : 80028 (8.0.28)
 File Encoding         : 65001

 Date: 03/11/2025 16:35:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '帖子ID',
  `user_id` int UNSIGNED NOT NULL COMMENT '作者用户ID，关联 userss.id',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '正文内容（文本）',
  `media_json` json NULL COMMENT '媒体JSON数组：[{url,type}]',
  `visibility` tinyint NOT NULL DEFAULT 1 COMMENT '可见性：1公开 0私密',
  `status` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'normal' COMMENT 'normal|deleted|shadow|blocked',
  `audit_status` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending' COMMENT 'pending|approved|rejected',
  `like_count` int NOT NULL DEFAULT 0 COMMENT '点赞数',
  `comment_count` int NOT NULL DEFAULT 0 COMMENT '评论数',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_posts_user_time`(`user_id` ASC, `created_at` ASC) USING BTREE,
  INDEX `idx_posts_audit`(`audit_status` ASC) USING BTREE,
  INDEX `idx_posts_status`(`status` ASC) USING BTREE,
  CONSTRAINT `fk_posts_user` FOREIGN KEY (`user_id`) REFERENCES `userss` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '美食圈帖子' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of posts
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
