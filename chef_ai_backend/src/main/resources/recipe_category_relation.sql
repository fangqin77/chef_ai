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

 Date: 01/11/2025 20:25:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for recipe_category_relation
-- ----------------------------
DROP TABLE IF EXISTS `recipe_category_relation`;
CREATE TABLE `recipe_category_relation`  (
  `relation_id` int NOT NULL AUTO_INCREMENT COMMENT '关联ID（主键）',
  `recipe_id` int NOT NULL COMMENT '菜谱ID（关联你的菜谱表主键，如recipes.recipe_id）',
  `category_id` int NOT NULL COMMENT '分类ID（关联recipe_categories.category_id）',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`relation_id`) USING BTREE,
  UNIQUE INDEX `uk_recipe_category`(`recipe_id` ASC, `category_id` ASC) USING BTREE COMMENT '避免同一菜谱重复关联同一分类',
  INDEX `idx_recipe_id`(`recipe_id` ASC) USING BTREE,
  INDEX `idx_category_id`(`category_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 87 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '菜谱与分类的关联表（实现一菜多分类）' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recipe_category_relation
-- ----------------------------
INSERT INTO `recipe_category_relation` VALUES (1, 952, 4, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (2, 952, 6, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (3, 953, 2, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (4, 953, 7, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (5, 953, 11, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (6, 954, 5, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (7, 954, 6, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (8, 955, 3, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (9, 955, 5, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (10, 955, 8, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (11, 956, 2, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (12, 956, 8, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (13, 957, 4, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (14, 957, 11, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (15, 957, 9, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (16, 958, 2, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (17, 958, 7, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (18, 958, 11, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (19, 959, 2, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (20, 959, 8, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (21, 960, 1, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (22, 960, 8, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (23, 961, 3, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (24, 961, 4, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (25, 961, 8, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (26, 962, 3, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (27, 962, 6, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (28, 963, 2, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (29, 963, 10, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (30, 964, 2, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (31, 964, 8, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (32, 966, 5, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (33, 966, 12, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (34, 967, 2, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (35, 967, 7, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (36, 967, 11, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (37, 968, 2, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (38, 968, 9, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (39, 968, 4, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (40, 969, 4, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (41, 969, 6, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (42, 970, 5, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (43, 970, 7, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (44, 971, 5, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (45, 971, 2, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (46, 971, 9, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (47, 972, 2, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (48, 972, 10, '2025-10-31 16:08:50');
INSERT INTO `recipe_category_relation` VALUES (49, 991, 1, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (50, 991, 8, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (51, 992, 2, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (52, 992, 8, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (53, 993, 5, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (54, 993, 9, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (55, 994, 4, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (56, 994, 7, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (57, 994, 8, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (58, 995, 3, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (59, 995, 8, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (60, 996, 1, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (61, 996, 6, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (62, 997, 2, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (63, 997, 7, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (64, 997, 11, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (65, 997, 9, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (66, 998, 5, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (67, 998, 11, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (68, 998, 9, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (69, 999, 1, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (70, 999, 8, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (71, 1000, 2, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (72, 1000, 14, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (73, 1001, 4, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (74, 1001, 8, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (75, 1002, 5, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (76, 1002, 13, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (77, 1003, 2, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (78, 1003, 7, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (79, 1003, 11, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (80, 1003, 10, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (81, 1004, 2, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (82, 1004, 6, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (83, 1004, 14, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (84, 1005, 4, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (85, 1005, 11, '2025-11-01 19:43:07');
INSERT INTO `recipe_category_relation` VALUES (86, 1005, 9, '2025-11-01 19:43:07');

SET FOREIGN_KEY_CHECKS = 1;
