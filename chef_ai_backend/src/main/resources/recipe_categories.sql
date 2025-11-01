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

 Date: 01/11/2025 20:25:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for recipe_categories
-- ----------------------------
DROP TABLE IF EXISTS `recipe_categories`;
CREATE TABLE `recipe_categories`  (
  `category_id` int NOT NULL AUTO_INCREMENT COMMENT '分类ID（主键，自增）',
  `category_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '分类名称（如“川菜”“汤类”）',
  `category_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '分类维度（地方菜系/菜品形态）',
  `category_desc` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '分类说明',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`) USING BTREE,
  UNIQUE INDEX `uk_category_name`(`category_name` ASC) USING BTREE COMMENT '分类名称唯一，避免重复'
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '菜谱分类表（支持地方菜系、菜品形态双维度）' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recipe_categories
-- ----------------------------
INSERT INTO `recipe_categories` VALUES (1, '川菜', '地方菜系', '麻辣/香辣口味，擅长鱼香、麻辣技法，如熘菜、火锅类', '2025-10-31 16:08:32', '2025-10-31 16:08:32');
INSERT INTO `recipe_categories` VALUES (2, '鲁菜', '地方菜系', '咸鲜口味，擅长酱烧、蒸制、熘炸，北方菜系代表', '2025-10-31 16:08:32', '2025-10-31 16:08:32');
INSERT INTO `recipe_categories` VALUES (3, '苏菜', '地方菜系', '清淡鲜醇，擅长河鲜、炖煨、糕点，江南菜系代表', '2025-10-31 16:08:32', '2025-10-31 16:08:32');
INSERT INTO `recipe_categories` VALUES (4, '粤菜', '地方菜系', '鲜香清淡，擅长蒸、灼、粥品，海鲜类菜品突出', '2025-10-31 16:08:32', '2025-10-31 16:08:32');
INSERT INTO `recipe_categories` VALUES (5, '浙菜', '地方菜系', '清鲜爽脆，擅长河鲜、炖菜，如莼菜、鲜贝类特色菜品', '2025-10-31 16:08:32', '2025-10-31 16:08:32');
INSERT INTO `recipe_categories` VALUES (6, '汤类', '菜品形态', '所有汤羹类菜品，含清汤、浓汤、炖品等', '2025-10-31 16:08:32', '2025-10-31 16:08:32');
INSERT INTO `recipe_categories` VALUES (7, '主食类', '菜品形态', '提供主要能量的菜品，如米饭、面条、馄饨等', '2025-10-31 16:08:32', '2025-10-31 16:08:32');
INSERT INTO `recipe_categories` VALUES (8, '炒菜类', '菜品形态', '通过明火快炒制作的菜品，口感脆嫩', '2025-10-31 16:08:32', '2025-10-31 16:08:32');
INSERT INTO `recipe_categories` VALUES (9, '蒸菜类', '菜品形态', '通过蒸汽加热制作的菜品，保留营养，口感软嫩', '2025-10-31 16:08:32', '2025-10-31 16:08:32');
INSERT INTO `recipe_categories` VALUES (10, '油炸类', '菜品形态', '通过高温油炸制作的菜品，外皮酥脆（含挂糊炸）', '2025-10-31 16:08:32', '2025-10-31 16:08:32');
INSERT INTO `recipe_categories` VALUES (11, '点心类', '菜品形态', '小吃、糕点类菜品，可作为主食补充或茶点', '2025-10-31 16:08:32', '2025-10-31 16:08:32');
INSERT INTO `recipe_categories` VALUES (12, '粥品', '菜品形态', '米类（或杂粮）熬煮的糊状菜品，口感绵密', '2025-10-31 16:08:32', '2025-10-31 16:08:32');
INSERT INTO `recipe_categories` VALUES (13, '凉菜类', '菜品形态', '无需高温加热，通过凉拌、腌制制作，口感清爽（如皮蛋豆腐、凉拌黄瓜）', '2025-11-01 19:41:54', '2025-11-01 19:41:54');
INSERT INTO `recipe_categories` VALUES (14, '炖菜类', '菜品形态', '通过小火慢炖制作，汤汁浓郁，食材软烂（如红烧排骨、冬瓜丸子汤）', '2025-11-01 19:41:54', '2025-11-01 19:41:54');

SET FOREIGN_KEY_CHECKS = 1;
