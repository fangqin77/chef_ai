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

 Date: 01/11/2025 20:26:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for userss
-- ----------------------------
DROP TABLE IF EXISTS `userss`;
CREATE TABLE `userss`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID（主键）',
  `openid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '微信openid（唯一标识）',
  `session_key` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '微信会话密钥',
  `token` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '系统登录令牌',
  `token_expire_at` datetime NULL DEFAULT NULL COMMENT '令牌过期时间',
  `unionid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '微信unionid（多账号关联）',
  `nickname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户头像URL',
  `gender` tinyint NULL DEFAULT NULL COMMENT '性别（1-男，2-女，0-未知）',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号',
  `province` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '省份',
  `city` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '城市',
  `country` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '国家',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态（1-正常，0-禁用）',
  `last_login_at` datetime NULL DEFAULT NULL COMMENT '最后登录时间',
  `login_count` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '登录次数',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of userss
-- ----------------------------
INSERT INTO `userss` VALUES (1, 'oJ16z7ccJ0iXAVs3t9z_8RA2MYGs', NULL, NULL, NULL, NULL, '微信用户', '', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, '2025-10-31 21:36:45', '2025-11-01 20:23:32');

SET FOREIGN_KEY_CHECKS = 1;
