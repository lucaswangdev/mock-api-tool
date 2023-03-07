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

 Date: 07/03/2023 22:51:51
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
  `userId` bigint(20) NOT NULL COMMENT '创建用户 id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of api_list
-- ----------------------------
BEGIN;
INSERT INTO `api_list` VALUES (2, 'users/userId2', '{    \"name\": \"post222\"}', 1, '2022-09-30 20:55:04', '2023-03-07 21:57:22', 'xxx接口', 2);
INSERT INTO `api_list` VALUES (17, 'users/userId3', '{}', 2, '2023-03-05 13:51:40', '2023-03-05 13:56:32', 'yyy接口', 2);
INSERT INTO `api_list` VALUES (18, 'user/test4', '{    \"data\": [        {            \"name\": \"lucas1\"        },        {            \"name\": \"lucas2\"        },        {            \"name\": \"lucas3\"        },        {            \"name\": \"lucas4\"        }    ]}', 2, '2023-03-05 14:06:08', '2023-03-05 14:06:08', '添加一个分页接口', 2);
INSERT INTO `api_list` VALUES (19, 'users/userId5', '{    \"name\": \"lucas\"}', 2, '2023-03-07 22:38:24', '2023-03-07 22:38:24', '测试接口5', 2);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userName` varchar(256) DEFAULT NULL COMMENT '用户昵称',
  `userAccount` varchar(256) NOT NULL COMMENT '账号',
  `userAvatar` varchar(1024) DEFAULT NULL COMMENT '用户头像',
  `gender` tinyint(4) DEFAULT NULL COMMENT '性别',
  `userRole` varchar(256) NOT NULL DEFAULT 'user' COMMENT '用户角色：user/ admin',
  `userPassword` varchar(512) NOT NULL COMMENT '密码',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `isDelete` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uni_userAccount` (`userAccount`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COMMENT='用户';

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (2, 'adminNick', 'admin', NULL, NULL, 'user', '$2b$10$7lq6lzaIFTCWz9abcdGHZud72Xwjyf9k24AMQmVuQvBszXkultLFi', '2023-03-06 21:52:45', '2023-03-06 21:52:45', 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
