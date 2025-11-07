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

 Date: 05/11/2025 14:38:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for recipe_favorites
-- ----------------------------
DROP TABLE IF EXISTS `recipe_favorites`;
CREATE TABLE `recipe_favorites`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `user_id` bigint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `plan_cook_date` date COMMENT '计划制作日期（精确到天）',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uniq_user_recipe`(`user_id` ASC, `recipe_id` ASC) USING BTREE,
  INDEX `idx_user_time`(`user_id` ASC, `created_at` ASC) USING BTREE,
  INDEX `idx_recipe`(`recipe_id` ASC) USING BTREE,
  INDEX `idx_user_plan_date`(`user_id` ASC, `plan_cook_date` ASC) USING BTREE,
  CONSTRAINT `fk_recipe_fav_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recipe_favorites
-- ----------------------------
INSERT INTO `recipe_favorites` VALUES (1, 1007, 1, '2025-11-04 10:53:22', NULL);
INSERT INTO `recipe_favorites` VALUES (17, 1009, 1, '2025-11-04 11:41:41', NULL);
INSERT INTO `recipe_favorites` VALUES (18, 1014, 1, '2025-11-04 11:52:07', NULL);
INSERT INTO `recipe_favorites` VALUES (20, 1017, 1, '2025-11-04 11:57:45', NULL);
INSERT INTO `recipe_favorites` VALUES (21, 1016, 1, '2025-11-04 12:05:32', NULL);
INSERT INTO `recipe_favorites` VALUES (22, 1019, 1, '2025-11-04 14:12:42', NULL);
INSERT INTO `recipe_favorites` VALUES (23, 1022, 1, '2025-11-04 14:30:28', NULL);
INSERT INTO `recipe_favorites` VALUES (24, 1020, 1, '2025-11-04 14:31:20', NULL);
INSERT INTO `recipe_favorites` VALUES (25, 1032, 1, '2025-11-04 15:16:25', NULL);
INSERT INTO `recipe_favorites` VALUES (26, 1033, 1, '2025-11-04 15:20:18', NULL);
INSERT INTO `recipe_favorites` VALUES (27, 1028, 1, '2025-11-04 15:20:31', NULL);
INSERT INTO `recipe_favorites` VALUES (28, 1024, 1, '2025-11-04 15:26:29', NULL);
INSERT INTO `recipe_favorites` VALUES (29, 1026, 1, '2025-11-04 15:33:30', NULL);
INSERT INTO `recipe_favorites` VALUES (30, 1031, 1, '2025-11-04 15:33:43', NULL);
INSERT INTO `recipe_favorites` VALUES (31, 1027, 1, '2025-11-04 15:35:11', NULL);
INSERT INTO `recipe_favorites` VALUES (32, 1023, 1, '2025-11-04 15:40:37', NULL);
INSERT INTO `recipe_favorites` VALUES (33, 1030, 1, '2025-11-04 15:47:55', NULL);

SET FOREIGN_KEY_CHECKS = 1;