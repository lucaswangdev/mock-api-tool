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

 Date: 05/03/2023 14:14:05
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
  `api_description` varchar(1023) DEFAULT '' COMMENT '接口说明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of api_list
-- ----------------------------
BEGIN;
INSERT INTO `api_list` VALUES (2, 'users/userId2', '{    \"name\": \"post222\"}', 2, '2022-09-30 20:55:04', '2023-03-05 13:55:23', 'xxx接口');
INSERT INTO `api_list` VALUES (17, 'users/userId3', '{}', 2, '2023-03-05 13:51:40', '2023-03-05 13:56:32', 'yyy接口');
INSERT INTO `api_list` VALUES (18, 'user/test4', '{    \"data\": [        {            \"name\": \"lucas1\"        },        {            \"name\": \"lucas2\"        },        {            \"name\": \"lucas3\"        },        {            \"name\": \"lucas4\"        }    ]}', 2, '2023-03-05 14:06:08', '2023-03-05 14:06:08', '添加一个分页接口');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
