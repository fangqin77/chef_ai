-- 审核/处置操作日志表
DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE `audit_logs` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `target_type` VARCHAR(16) NOT NULL, -- post|comment
  `target_id` BIGINT NOT NULL,
  `action` VARCHAR(32) NOT NULL,      -- approve|reject|shadow|delete|pin|unpin
  `reason` VARCHAR(255) NULL,
  `operator_id` INT UNSIGNED NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_target` (`target_type`,`target_id`),
  KEY `idx_operator` (`operator_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='审核操作日志';
