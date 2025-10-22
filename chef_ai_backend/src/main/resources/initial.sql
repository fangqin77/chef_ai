-- initial.sql - 示例初始化数据（可按需调整/扩展）
USE `login_db`;

-- 用户
INSERT INTO `user` (`username`, `avatar`, `signature`, `follow_count`, `fan_count`, `like_count`)
VALUES
  ('foodie_001', '/static/avatar/u1.jpg', '热爱分享家常菜', 5, 12, 36),
  ('chef_mary', '/static/avatar/u2.jpg', '烘焙爱好者', 8, 20, 58),
  ('spicy_king', '/static/avatar/u3.jpg', '无辣不欢', 2, 7, 15);

-- 菜谱（ingredients/steps 用 JSON）
INSERT INTO `recipe`
(`user_id`,`name`,`cover_img`,`cuisine_type`,`difficulty`,`cook_time`,`ingredients`,`steps`,`view_count`,`like_count`)
VALUES
  (1,'番茄炒蛋','/static/recipe/r1.jpg','中式','简单',10,
   JSON_ARRAY('番茄 2 个','鸡蛋 3 个','盐 2g','糖 2g'),
   JSON_ARRAY('鸡蛋打散滑炒盛出','番茄下锅翻炒','加入调味','回锅蛋翻匀出锅'),
   128,23),
  (2,'奶油曲奇','/static/recipe/r2.jpg','西式','中等',40,
   JSON_ARRAY('低筋面粉 200g','黄油 120g','糖粉 70g','鸡蛋 1 个'),
   JSON_ARRAY('黄油打发','加入糖粉蛋液拌匀','筛入面粉成团','挤花烤制'),
   96,34);

-- 美食圈动态
INSERT INTO `food_circle` (`user_id`,`content`,`img_list`,`like_count`,`comment_count`)
VALUES
  (1,'今天的番茄炒蛋超下饭！','/upload/feed/f1.jpg',5,2),
  (2,'刚出炉的曲奇，香！','/upload/feed/f2.jpg',8,1);

-- 收藏
INSERT INTO `collection` (`user_id`,`recipe_id`) VALUES
  (1,2),
  (2,1);

-- 关注关系
INSERT INTO `follow` (`follower_id`,`followed_id`) VALUES
  (1,2),
  (2,1),
  (3,1);

-- 评论
INSERT INTO `comment` (`dynamic_id`,`user_id`,`content`)
VALUES
  (1,2,'看起来好好吃！'),
  (1,3,'学到了~'),
  (2,1,'求配方细节！');

-- 浏览历史
INSERT INTO `browse_history` (`user_id`,`recipe_id`) VALUES
  (1,2),
  (2,1),
  (3,1);

-- 购物清单
INSERT INTO `shopping_list` (`user_id`,`item_name`,`quantity`,`is_checked`)
VALUES
  (1,'番茄','2 个',0),
  (1,'鸡蛋','6 个',1),
  (2,'低筋面粉','1 袋',0);