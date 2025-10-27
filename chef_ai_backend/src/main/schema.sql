CREATE TABLE IF NOT EXISTS `recipes` (
    `菜谱ID` INT PRIMARY KEY,
    `菜谱类型号` INT,
    `菜谱名称` VARCHAR(255),
    `做法` TEXT,
    `调料` TEXT,
    `原料` TEXT,
    `特性` VARCHAR(255),
    `图片URL` VARCHAR(500),
    `cookTime` INT
);

CREATE TABLE IF NOT EXISTS `recipe_types` (
    `节点ID` INT PRIMARY KEY,
    `ftype` VARCHAR(255),
    `类型名称` VARCHAR(255),
    `父节点` INT,
    `顺序` INT,
    FOREIGN KEY (`父节点`) REFERENCES `recipe_types`(`节点ID`)
);