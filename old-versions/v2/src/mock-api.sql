/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : localhost:3306
 Source Schema         : mock-api

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 30/09/2022 23:29:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for api_list
-- ----------------------------
DROP TABLE IF EXISTS `api_list`;
CREATE TABLE `api_list` (
  `id` bigint(15) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `api_path` varchar(1000) NOT NULL COMMENT '接口地址',
  `api_content` varchar(10000) NOT NULL COMMENT '接口内容',
  `delay` int(11) NOT NULL DEFAULT '0' COMMENT '延时返回时间',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of api_list
-- ----------------------------
BEGIN;
INSERT INTO `api_list` VALUES (1, 'users/userId', '{\"name\":\"get\"}', 0, '2022-09-30 20:53:42', '2022-09-30 20:56:47');
INSERT INTO `api_list` VALUES (2, 'users/userId2', '{\"name\":\"post\"}', 3, '2022-09-30 20:55:04', '2022-09-30 23:19:38');
INSERT INTO `api_list` VALUES (5, 'users/userId3', '{\"name\":\"put\"}', 0, '2022-09-30 20:58:36', '2022-09-30 20:58:36');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
