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

 Date: 04/11/2025 10:16:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for recipes
-- ----------------------------
DROP TABLE IF EXISTS `recipes`;
CREATE TABLE `recipes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` int NULL DEFAULT NULL COMMENT '菜谱类型号（对应实体类typeId）',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `method` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `condiments` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `ingredients` int NULL DEFAULT NULL COMMENT '难度等级（对应实体类ingredients，1-简单，2-中等，3-困难）',
  `feature` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_type_id`(`type_id` ASC) USING BTREE COMMENT '类型号索引，优化分类查询'
) ENGINE = InnoDB AUTO_INCREMENT = 1007 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '菜谱表（与Recipe实体类对齐）' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of recipes
-- ----------------------------
INSERT INTO `recipes` VALUES (952, NULL, '蛋花丝瓜汤', '1. 丝瓜去皮切片，鸡蛋打散备用。\n2. 锅中加水烧开，放入丝瓜片煮至变软。\n3. 慢慢倒入蛋液，用筷子轻轻搅拌形成蛋花。\n4. 加入适量盐调味，煮开即可。', '盐、鸡蛋、丝瓜', 1, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/YIMaTKRwySmHtgQh.jpg');
INSERT INTO `recipes` VALUES (953, NULL, '馄饨', '1. 准备馄饨皮和馅料（猪肉、虾仁等）。\n2. 将馅料包入馄饨皮中，捏紧封口。\n3. 锅中加水烧开，放入馄饨煮至浮起。\n4. 加入青菜一起煮熟，调味即可。', '猪肉、虾仁、馄饨皮、青菜', 2, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/rbRcTHcqqreUMkGm.jpg');
INSERT INTO `recipes` VALUES (954, NULL, '海蜇汤菜', '1. 海蜇用清水浸泡去咸味，切成丝。\n2. 胡萝卜、白菜切丝备用。\n3. 锅中加水烧开，放入所有材料煮熟。\n4. 加入盐、鸡精调味即可。', '海蜇、胡萝卜、白菜、盐、鸡精', 1, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/mTuRTrKVMSAjvUaG.jpg');
INSERT INTO `recipes` VALUES (955, NULL, '三色鲜贝', '1. 鲜贝洗净，胡萝卜、青豆、玉米粒焯水备用。\n2. 锅内放油，下葱姜爆香。\n3. 放入鲜贝翻炒至变色。\n4. 加入胡萝卜、青豆、玉米粒继续翻炒。\n5. 调味后用水淀粉勾芡即可。', '鲜贝、胡萝卜、青豆、玉米粒、盐、淀粉', 3, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/znKckzsILLYaiPrW.jpg');
INSERT INTO `recipes` VALUES (956, NULL, '夹馅黄瓜', '1. 黄瓜洗净，切成段，用小刀在侧面切开但不切断。\n2. 准备馅料（肉末、香菇丁等）调好味。\n3. 将馅料夹入黄瓜中。\n4. 上锅蒸10分钟即可。', '黄瓜、肉末、香菇、盐、生抽', 2, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/tPnetPHHZFrepSBn.jpg');
INSERT INTO `recipes` VALUES (957, NULL, '萝卜丝糕', '1. 白萝卜擦成丝，加盐腌制10分钟后挤干水分。\n2. 加入粘米粉、腊肠丁、虾皮拌匀。\n3. 模具刷油，倒入混合物压实。\n4. 上锅蒸30分钟至熟透即可。', '白萝卜、粘米粉、腊肠、虾皮、盐', 3, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/KnLHzAsWouaAkdzy.jpg');
INSERT INTO `recipes` VALUES (958, NULL, '鸽蛋龙须面', '1. 龙须面煮熟过凉水备用。\n2. 鸽蛋煮熟去壳。\n3. 准备高汤，加入盐、鸡精调味。\n4. 将面条放入碗中，放上鸽蛋，倒入热汤即可。', '龙须面、鸽蛋、高汤、盐、鸡精', 2, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/WtVDFlBnocGmIfMo.jpg');
INSERT INTO `recipes` VALUES (959, NULL, '熘黄瓜', '1. 黄瓜洗净切片。\n2. 锅内放油，下蒜片爆香。\n3. 放入黄瓜片快速翻炒。\n4. 加入盐、糖、生抽调味，炒匀即可。', '黄瓜、蒜、盐、糖、生抽', 1, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/leZgikLlXIYbxKAR.jpg');
INSERT INTO `recipes` VALUES (960, NULL, '熘莲鱼丁', '1. 鱼肉切丁，用盐、料酒腌制。\n2. 莲菜切丁焯水。\n3. 锅内放油，下鱼丁滑熟。\n4. 留底油爆香葱姜，加入莲菜、鱼丁。\n5. 调味后用水淀粉勾芡即可。', '鱼肉、莲菜、葱、姜、盐、料酒、淀粉', 3, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/OpgokEkGvajOMdrI.jpg');
INSERT INTO `recipes` VALUES (961, NULL, '香菇烧茭白', '1. 香菇泡发切片，茭白切片焯水。\n2. 锅内放油，下葱姜爆香。\n3. 放入香菇、茭白翻炒。\n4. 加入高汤、盐、生抽焖煮。\n5. 大火收汁即可。', '香菇、茭白、葱、姜、盐、生抽、高汤', 2, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/cOGQiZjKrlqUEBlh.jpg');
INSERT INTO `recipes` VALUES (962, NULL, '莼菜汤', '1. 莼菜用清水洗净。\n2. 鸡蛋打散备用。\n3. 锅中加水烧开，放入莼菜煮1分钟。\n4. 慢慢倒入蛋液形成蛋花。\n5. 加入盐、鸡精、香油调味即可。', '莼菜、鸡蛋、盐、鸡精、香油', 1, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/HiuuzMxghUnAwMtn.jpg');
INSERT INTO `recipes` VALUES (963, NULL, '炸鸭脯', '1. 鸭脯肉切片，用盐、料酒、生抽腌制。\n2. 调制面糊（面粉、淀粉、鸡蛋、水）。\n3. 鸭肉片裹上面糊。\n4. 油温五成热时下锅炸至金黄捞起。\n5. 复炸一次更酥脆。', '鸭脯肉、盐、料酒、生抽、面粉、淀粉、鸡蛋', 3, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/lYsolJWCyoHitUtY.jpg');
INSERT INTO `recipes` VALUES (964, NULL, '三丝炒豆芽', '1. 豆芽菜洗净，胡萝卜、青椒切丝。\n2. 锅内放油，下葱姜爆香。\n3. 放入三丝快速翻炒。\n4. 加入豆芽菜继续翻炒。\n5. 调味炒匀即可。', '豆芽菜、胡萝卜、青椒、葱、姜、盐、生抽', 1, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/pKcRVjXohDqlPLWO.jpg');
INSERT INTO `recipes` VALUES (966, NULL, '皮蛋瘦肉粥', '1. 大米洗净，加水煮成粥。\n2. 瘦肉切丝，用盐、生抽腌制。\n3. 皮蛋切小块。\n4. 粥快熟时加入肉丝、皮蛋。\n5. 继续煮10分钟，加盐调味，撒葱花即可。', '大米、瘦肉、皮蛋、盐、生抽、葱', 2, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/RQlDSYOQGumgBJva.jpg');
INSERT INTO `recipes` VALUES (967, NULL, '枣卷', '1. 红枣煮熟去核，压成泥。\n2. 面粉加酵母、水和成面团发酵。\n3. 发好的面团擀开，涂上枣泥。\n4. 卷起后切成段。\n5. 上锅蒸15分钟即可。', '红枣、面粉、酵母、水', 3, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/ycmWWLtAkpgWtzLg.jpg');
INSERT INTO `recipes` VALUES (968, NULL, '珍珠丸子', '1. 糯米提前泡发。\n2. 猪肉剁成馅，加入调料拌匀。\n3. 将肉馅团成丸子，在糯米中滚一圈。\n4. 上锅蒸20分钟即可。', '糯米、猪肉、盐、生抽、料酒', 3, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/lAQOeCiFQbHgAaoU.jpg');
INSERT INTO `recipes` VALUES (969, NULL, '香菇豆腐汤', '1. 香菇泡发切片，豆腐切块。\n2. 锅中加水，放入香菇煮10分钟。\n3. 加入豆腐继续煮5分钟。\n4. 加入盐、鸡精、香油调味即可。', '香菇、豆腐、盐、鸡精、香油', 1, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/bDkEhYVThTxhOSKE.jpg');
INSERT INTO `recipes` VALUES (970, NULL, '绿豆饭', '1. 绿豆提前浸泡2小时。\n2. 大米洗净，与绿豆混合。\n3. 加水按正常煮饭程序煮熟即可。', '绿豆、大米', 1, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/bTHjzkGYcGLyHZZD.jpg');
INSERT INTO `recipes` VALUES (971, NULL, '蒸茄条', '1. 茄子切条，上锅蒸10分钟至软。\n2. 蒜切末，调制蒜泥汁（蒜末、生抽、醋、香油）。\n3. 将蒜泥汁淋在茄条上即可。', '茄子、蒜、生抽、醋、香油', 1, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/BBwzRmGYPqDChuCm.jpg');
INSERT INTO `recipes` VALUES (972, NULL, '糖醋鱿鱼', '1. 鱿鱼处理干净，打花刀后切块。\n2. 锅内放油，下鱿鱼快速焯水。\n3. 调制糖醋汁（糖、醋、生抽、番茄酱）。\n4. 锅内留底油，下糖醋汁炒匀。\n5. 倒入鱿鱼快速翻炒均匀即可。', '鱿鱼、糖、醋、生抽、番茄酱', 3, 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663032165483/elWmPYABTdLgFNHf.jpg');
INSERT INTO `recipes` VALUES (991, NULL, '麻婆豆腐', '1.豆腐切2cm见方小块，焯水备用；2.猪肉末加料酒、盐腌制5分钟；3.热锅冷油，下肉末炒至变色，加郫县豆瓣酱、姜蒜末、花椒炒出红油；4.加适量水，放入豆腐块，加盐、生抽调味，小火焖煮3分钟；5.水淀粉勾芡，撒干辣椒碎、花椒粉、葱花出锅', '豆腐、猪肉末、郫县豆瓣酱、姜蒜末、花椒、干辣椒、盐、生抽、淀粉、葱花', 2, 'https://img95.699pic.com/photo/60004/9899.jpg_wh300.jpg!/fh/300/quality/90');
INSERT INTO `recipes` VALUES (992, NULL, '番茄炒蛋', '1.番茄顶部划十字，开水烫后去皮，切块；2.鸡蛋加少许盐打散，热锅冷油炒至凝固盛出；3.另起锅放少许油，下番茄块翻炒出汁，加盐、糖调味；4.倒入炒好的鸡蛋，翻炒均匀，撒葱花出锅', '番茄、鸡蛋、盐、糖、葱花', 2, 'https://img95.699pic.com/photo/60019/6971.jpg_wh300.jpg!/fh/300/quality/90');
INSERT INTO `recipes` VALUES (993, NULL, '清蒸鲈鱼', '1.鲈鱼处理干净，在鱼身两侧划2-3刀，用盐、料酒、姜丝腌制15分钟；2.盘中铺葱段、姜片，放上鲈鱼，蒸锅水开后放入，大火蒸8-10分钟；3.取出鲈鱼，倒掉盘中汤汁，捡去葱姜，淋蒸鱼豉油，铺葱丝、姜丝、红椒丝，浇热油激香', '鲈鱼、姜丝、葱丝、红椒丝、蒸鱼豉油、盐、料酒', 1, 'https://ts1.tc.mm.bing.net/th/id/R-C.18beff42f9f7c15c3379014f416e2f38?rik=MR%2bFhqG%2f1IZJsg&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd10110%2f135%2fw2048h1287%2f20200506%2f4522-iteyfwv5706405.jpg&ehk=dwPG2MItWusJ9tUvzQfMtD4IArqeL7otrR4KiNqK5dE%3d&risl=&pid=ImgRaw&r=0');
INSERT INTO `recipes` VALUES (994, NULL, '扬州炒饭', '1.米饭提前一晚煮好，打散备用；火腿、青豆、胡萝卜切丁；2.鸡蛋加少许盐打散，炒至凝固盛出；3.热锅冷油，下火腿丁、青豆、胡萝卜丁翻炒至断生；4.倒入米饭，翻炒均匀，加盐、生抽调味；5.倒入炒好的鸡蛋，翻炒均匀出锅', '米饭、火腿、青豆、胡萝卜、鸡蛋、盐、生抽', 2, 'https://globalimg.sucai999.com/preimg/E625C8/700/E625C8/98/64264818899fae8762e6778c1c8cfcd4.jpg');
INSERT INTO `recipes` VALUES (995, NULL, '西湖醋鱼', '1.草鱼处理干净，从背部剖开，在鱼身两侧划刀，用盐、料酒腌制10分钟；2.锅中水烧开，放入草鱼，大火煮3-4分钟至鱼肉发白，捞出装盘；3.另起锅，加少许水，放入姜末、糖、醋、生抽、淀粉，煮至汤汁浓稠，浇在鱼身上，撒葱花', '草鱼、姜末、糖、醋、生抽、淀粉、葱花、盐、料酒', 1, 'https://pic.quanjing.com/cc/mg/QJ9122589927.jpg@!350h');
INSERT INTO `recipes` VALUES (996, NULL, '酸辣汤', '1.豆腐、木耳、香菇切丝；鸡蛋打散；2.锅中加水烧开，放入豆腐丝、木耳丝、香菇丝，加盐、生抽、醋、胡椒粉调味；3.水淀粉勾芡，边倒边搅拌；4.缓缓倒入蛋液，搅拌成蛋花，撒葱花、香油出锅', '豆腐、木耳、香菇、鸡蛋、醋、胡椒粉、盐、生抽、淀粉、葱花、香油', 2, 'https://ts1.tc.mm.bing.net/th/id/R-C.c2fe5c3d17ba5c6407f43827756d4fa4?rik=Z1oyY3Rme91flw&riu=http%3a%2f%2fi2.chuimg.com%2fd2e58a6111764136b1d850b7804ebffe_1920w_1077h.jpg%3fimageView2%2f2%2fw%2f660%2finterlace%2f1%2fq%2f90&ehk=U5P5y0gbjTIOFgPbzKUcTGMm98WmL9ez%2bCqwDWwl8UQ%3d&risl=&pid=ImgRaw&r=0');
INSERT INTO `recipes` VALUES (997, NULL, '肉包', '1.面粉加酵母、温水揉成光滑面团，发酵至两倍大；2.猪肉馅加葱、姜、盐、酱油、香油，朝一个方向搅拌上劲；3.发酵好的面团排气，搓条下剂，擀成中间厚边缘薄的面皮；4.取面皮，放入肉馅，捏褶包成包子；5.包子醒发15分钟，冷水上锅，水开后蒸15分钟，焖3分钟出锅', '面粉、猪肉馅、葱、姜、盐、酱油、酵母、香油', 2, 'https://ts1.tc.mm.bing.net/th/id/R-C.b2f585173324e9445d5dab652004863d?rik=%2fs5HQVbKMnxZRQ&riu=http%3a%2f%2fmaterial.17hongtu.cn%2fstoreid_1092%2fpc%2fresource%2f20220420%2f202204201902113517240.JPG&ehk=lC6EVb8qwKF%2f8%2fAjN6pHhIll5XckkVetb6uGyBSkXCU%3d&risl=&pid=ImgRaw&r=0');
INSERT INTO `recipes` VALUES (998, NULL, '虾饺', '1.澄粉加少许玉米淀粉，用开水烫面，揉成光滑面团，搓条下剂，擀成薄圆皮；2.鲜虾去壳去虾线，剁成虾泥，加猪肉馅、笋丁、盐、香油搅拌上劲；3.取面皮，放入虾馅，捏成月牙形虾饺；4.蒸锅水开后放入虾饺，大火蒸5分钟出锅', '澄粉、鲜虾、猪肉馅、笋丁、盐、香油、玉米淀粉', 1, 'https://tgi1.jia.com/114/821/14821981.jpg');
INSERT INTO `recipes` VALUES (999, NULL, '宫保鸡丁', '1.鸡胸肉切丁，加料酒、盐、淀粉腌制15分钟；花生米炸熟备用；黄瓜切丁；2.热锅冷油，下鸡丁滑至变色盛出；3.锅中留少许油，下干辣椒、花椒、姜蒜末炒香；4.放入鸡丁、黄瓜丁，加盐、糖、醋、生抽调味，翻炒均匀；5.倒入花生米，翻炒几下出锅', '鸡胸肉、花生米、黄瓜、干辣椒、花椒、姜蒜末、盐、糖、醋、生抽、淀粉、料酒', 3, 'https://img95.699pic.com/photo/50236/9539.jpg_wh300.jpg');
INSERT INTO `recipes` VALUES (1000, NULL, '红烧排骨', '1.排骨冷水下锅，加料酒、姜片焯水，捞出沥干；2.热锅冷油，放冰糖炒至枣红色，放入排骨翻炒上色；3.加姜片、八角、酱油翻炒均匀，加足量热水没过排骨；4.大火烧开后转小火焖煮40分钟，加盐调味，大火收汁出锅', '排骨、冰糖、姜片、八角、酱油、盐、料酒', 1, 'https://ts3.tc.mm.bing.net/th/id/OIP-C.cEouZ3_mCDwmef_G4sxLQAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3');
INSERT INTO `recipes` VALUES (1001, NULL, '丝瓜毛豆', '1.丝瓜去皮切滚刀块；毛豆洗净备用；2.热锅冷油，下蒜末炒香，放入毛豆翻炒至变色；3.放入丝瓜块，加盐翻炒至丝瓜变软，撒葱花出锅', '丝瓜、毛豆、蒜末、盐、葱花', 2, 'https://pic1.zhimg.com/v2-ac396d050efab79fdda92caf6194525c_r.jpg');
INSERT INTO `recipes` VALUES (1002, NULL, '皮蛋豆腐', '1.嫩豆腐切厚片，摆入盘中；皮蛋切丁，摆放在豆腐上；2.调汁：生抽、醋、香油混合，浇在豆腐皮蛋上；3.撒香菜碎、蒜末即可', '嫩豆腐、皮蛋、香菜、生抽、醋、香油、蒜末', 3, 'https://ts1.tc.mm.bing.net/th/id/R-C.126c71d382fa1df60c68d1908a979a54?rik=aEYsdRq1HTUxHA&riu=http%3a%2f%2fi3.meishichina.com%2fattachment%2frecipe%2f2017%2f03%2f08%2f2017030814889771636208607065.jpg%40!p800&ehk=So%2fdtk%2bWWCzyLQ82IGutL35DbJxxSJrTES8MfDUpuxY%3d&risl=&pid=ImgRaw&r=0');
INSERT INTO `recipes` VALUES (1003, NULL, '葱油饼', '1.面粉加温水揉成光滑面团，醒发30分钟；2.面团搓条下剂，擀成薄圆饼，抹上葱油（葱花+盐+食用油）；3.从一边卷起成长条，再盘成圆饼，擀成薄饼；4.平底锅刷油，放入葱油饼，小火煎至两面金黄酥脆', '面粉、葱花、盐、食用油、温水', 1, 'https://imgs.699pic.com/images/600/700/253.jpg!list1x.v2');
INSERT INTO `recipes` VALUES (1004, NULL, '冬瓜丸子汤', '1.猪肉馅加姜末、盐、香油朝一个方向搅拌上劲；2.冬瓜去皮切片；3.锅中加水烧开，转小火，用手将肉馅挤成丸子，逐个放入锅中；4.丸子全部浮起后，放入冬瓜片，加盐调味，煮至冬瓜熟透，撒葱花出锅', '猪肉馅、冬瓜、姜末、盐、香油、葱花', 2, 'https://ts1.tc.mm.bing.net/th/id/OIP-C.geUaNFYDqmpONwkqF7RKLAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3');
INSERT INTO `recipes` VALUES (1005, NULL, '糯米糍', '1.糯米提前浸泡4小时，沥干后蒸熟，趁热加少许白糖拌匀，捣成糯米团；2.豆沙馅搓成小球；3.取糯米团按扁，包入豆沙馅，搓圆；4.放入椰蓉中滚一圈，均匀裹上椰蓉即可', '糯米、豆沙馅、椰蓉、白糖', 3, 'https://ts4.tc.mm.bing.net/th/id/OIP-C.j_yTdvtK_U86YbBy97wgyQHaF7?rs=1&pid=ImgDetMain&o=7&rm=3');

SET FOREIGN_KEY_CHECKS = 1;
