CREATE TABLE IF NOT EXISTS `recipes` (
                                         `菜谱ID` INT PRIMARY KEY AUTO_INCREMENT,
                                         `菜谱类型号` INT,
                                         `菜谱名称` VARCHAR(255),
                                         `做法` TEXT,
                                         `调料` TEXT,
                                         `原料` TEXT,
                                         `特性` VARCHAR(255),
                                         `图片URL` VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS `recipe_types` (
                                              `节点ID` INT PRIMARY KEY,
                                              `ftype` VARCHAR(255),
                                              `类型名称` VARCHAR(255),
                                              `父节点` INT NULL,
                                              `顺序` INT
);

-- 先插入缺失的父节点占位数据（避免外键失败）
INSERT IGNORE INTO `recipe_types` (`节点ID`, `ftype`, `类型名称`, `父节点`, `顺序`) VALUES
                                                                                        (42, NULL, '根节点42', NULL, NULL),
                                                                                        (44, NULL, '根节点44', NULL, NULL),
                                                                                        (45, NULL, '根节点45', NULL, NULL),
                                                                                        (46, NULL, '根节点46', NULL, NULL),
                                                                                        (47, NULL, '根节点47', NULL, NULL),
                                                                                        (48, NULL, '根节点48', NULL, NULL),
                                                                                        (49, NULL, '根节点49', NULL, NULL),
                                                                                        (51, NULL, '根节点51', NULL, NULL),
                                                                                        (52, NULL, '根节点52', NULL, NULL),
                                                                                        (427, NULL, '满汉全席', NULL, NULL),
                                                                                        (435, NULL, '家庭实用菜谱大全', NULL, NULL);

-- 外键最后再加，避免初始化时的约束错误
ALTER TABLE `recipe_types`
    ADD CONSTRAINT `fk_parent_node`
        FOREIGN KEY (`父节点`) REFERENCES `recipe_types`(`节点ID`)
            ON DELETE SET NULL ON UPDATE CASCADE;
