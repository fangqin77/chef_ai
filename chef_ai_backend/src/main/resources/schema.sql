-- schema.sql - MySQL 8.0.28
-- 建库并使用
CREATE DATABASE IF NOT EXISTS `login_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;
USE `login_db`;

-- 统一 SQL 模式（可根据需要调整）
SET NAMES utf8mb4;

-- 1) 用户表
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID，主键自增',
  `username` VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名，唯一',
  `avatar` VARCHAR(255) DEFAULT 'default_avatar.jpg' COMMENT '用户头像路径',
  `signature` VARCHAR(200) DEFAULT '分享生活中的美好味道' COMMENT '个性签名',
  `follow_count` INT NOT NULL DEFAULT 0 COMMENT '关注数',
  `fan_count` INT NOT NULL DEFAULT 0 COMMENT '粉丝数',
  `like_count` INT NOT NULL DEFAULT 0 COMMENT '获赞数',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户信息表';

-- 2) 菜谱表
CREATE TABLE IF NOT EXISTS `recipe` (
  `recipe_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '菜谱ID，主键自增',
  `user_id` INT NOT NULL COMMENT '创建用户ID，外键关联user.user_id',
  `name` VARCHAR(100) NOT NULL COMMENT '菜谱名称',
  `cover_img` VARCHAR(255) NOT NULL COMMENT '菜谱封面图路径',
  `cuisine_type` VARCHAR(20) NOT NULL COMMENT '菜系类型（中式、西式、日式、韩式等）',
  `difficulty` VARCHAR(10) NOT NULL COMMENT '难度（简单、中等、复杂）',
  `cook_time` INT NOT NULL COMMENT '烹饪时间（分钟）',
  `ingredients` JSON NULL COMMENT '食材列表（JSON）',
  `steps` JSON NULL COMMENT '步骤说明（JSON）',
  `view_count` INT NOT NULL DEFAULT 0 COMMENT '浏览量',
  `like_count` INT NOT NULL DEFAULT 0 COMMENT '点赞数',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  CONSTRAINT `fk_recipe_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜谱信息表';

CREATE INDEX `idx_recipe_user` ON `recipe`(`user_id`);
CREATE INDEX `idx_recipe_cuisine` ON `recipe`(`cuisine_type`);
CREATE INDEX `idx_recipe_name` ON `recipe`(`name`);

-- 3) 美食圈动态表
CREATE TABLE IF NOT EXISTS `food_circle` (
  `dynamic_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '动态ID，主键自增',
  `user_id` INT NOT NULL COMMENT '发布用户ID，外键关联user.user_id',
  `content` TEXT NOT NULL COMMENT '动态文字内容',
  `img_list` VARCHAR(1000) DEFAULT '' COMMENT '图片路径列表（逗号分隔或JSON）',
  `like_count` INT NOT NULL DEFAULT 0 COMMENT '点赞数',
  `comment_count` INT NOT NULL DEFAULT 0 COMMENT '评论数',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  CONSTRAINT `fk_circle_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='美食圈动态表';

CREATE INDEX `idx_circle_user` ON `food_circle`(`user_id`);
CREATE INDEX `idx_circle_ctime` ON `food_circle`(`create_time`);

-- 4) 收藏表
CREATE TABLE IF NOT EXISTS `collection` (
  `col_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '收藏ID，主键自增',
  `user_id` INT NOT NULL COMMENT '用户ID，外键关联user.user_id',
  `recipe_id` INT NOT NULL COMMENT '菜谱ID，外键关联recipe.recipe_id',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '收藏时间',
  UNIQUE KEY `idx_user_recipe` (`user_id`, `recipe_id`) COMMENT '用户-菜谱唯一索引，避免重复收藏',
  CONSTRAINT `fk_collection_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_collection_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`recipe_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜谱收藏表';

CREATE INDEX `idx_collection_ctime` ON `collection`(`create_time`);

-- 5) 关注表
CREATE TABLE IF NOT EXISTS `follow` (
  `follow_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '关注ID，主键自增',
  `follower_id` INT NOT NULL COMMENT '关注者ID（自己），外键关联user.user_id',
  `followed_id` INT NOT NULL COMMENT '被关注者ID（他人），外键关联user.user_id',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '关注时间',
  UNIQUE KEY `idx_follower_followed` (`follower_id`, `followed_id`) COMMENT '关注关系唯一索引，避免重复关注',
  CONSTRAINT `fk_follow_follower` FOREIGN KEY (`follower_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_follow_followed` FOREIGN KEY (`followed_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户关注关系表';

CREATE INDEX `idx_follow_follower` ON `follow`(`follower_id`);
CREATE INDEX `idx_follow_followed` ON `follow`(`followed_id`);

-- 6) 评论表
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '评论ID，主键自增',
  `dynamic_id` INT NOT NULL COMMENT '动态ID，外键关联food_circle.dynamic_id',
  `user_id` INT NOT NULL COMMENT '评论用户ID，外键关联user.user_id',
  `content` VARCHAR(500) NOT NULL COMMENT '评论内容',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
  CONSTRAINT `fk_comment_circle` FOREIGN KEY (`dynamic_id`) REFERENCES `food_circle`(`dynamic_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='美食圈动态评论表';

CREATE INDEX `idx_comment_dynamic` ON `comment`(`dynamic_id`);
CREATE INDEX `idx_comment_user` ON `comment`(`user_id`);

-- 7) 浏览历史表
CREATE TABLE IF NOT EXISTS `browse_history` (
  `history_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '历史ID，主键自增',
  `user_id` INT NOT NULL COMMENT '用户ID，外键关联user.user_id',
  `recipe_id` INT NOT NULL COMMENT '菜谱ID，外键关联recipe.recipe_id',
  `browse_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '浏览时间',
  CONSTRAINT `fk_history_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_history_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`recipe_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜谱浏览历史表';

CREATE INDEX `idx_history_user` ON `browse_history`(`user_id`);
CREATE INDEX `idx_history_recipe` ON `browse_history`(`recipe_id`);
CREATE INDEX `idx_history_time` ON `browse_history`(`browse_time`);

-- 8) 购物清单表
CREATE TABLE IF NOT EXISTS `shopping_list` (
  `list_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '清单ID，主键自增',
  `user_id` INT NOT NULL COMMENT '用户ID，外键关联user.user_id',
  `item_name` VARCHAR(100) NOT NULL COMMENT '食材名称',
  `quantity` VARCHAR(50) NOT NULL COMMENT '数量',
  `is_checked` TINYINT NOT NULL DEFAULT 0 COMMENT '是否已购买（0：未购买，1：已购买）',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  CONSTRAINT `fk_slist_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='购物清单表';

CREATE INDEX `idx_slist_user` ON `shopping_list`(`user_id`);
CREATE INDEX `idx_slist_checked` ON `shopping_list`(`is_checked`);