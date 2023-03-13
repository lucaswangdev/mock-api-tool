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

 Date: 13/03/2023 23:13:50
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
  `projectCode` varchar(256) NOT NULL DEFAULT 'code1' COMMENT '项目Code',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of api_list
-- ----------------------------
BEGIN;
INSERT INTO `api_list` VALUES (2, 'users/userId2', '{    \"name\": \"post222\"}', 2, '2022-09-30 20:55:04', '2023-03-10 09:12:50', 'xxx接口222', 2, 'code1');
INSERT INTO `api_list` VALUES (17, 'users/userId3', '{}', 2, '2023-03-05 13:51:40', '2023-03-05 13:56:32', 'yyy接口', 2, 'code1');
INSERT INTO `api_list` VALUES (19, 'users/userId5', '{    \"name\": \"lucas\"}', 2, '2023-03-07 22:38:24', '2023-03-07 22:38:24', '测试接口5', 2, 'code1');
INSERT INTO `api_list` VALUES (20, 'user/test2', '{    \"name\": 333}', 1, '2023-03-10 08:56:01', '2023-03-10 08:56:44', '测试接口222', 2, 'code2');
INSERT INTO `api_list` VALUES (21, 'user/test25', '{}', 0, '2023-03-10 09:13:05', '2023-03-10 09:13:05', '测试接口1', 2, 'code1');
COMMIT;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `projectName` varchar(256) DEFAULT NULL COMMENT '项目名称',
  `projectCode` varchar(256) NOT NULL COMMENT '项目Code',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `isDelete` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uni_projectCode` (`projectCode`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='用户';

-- ----------------------------
-- Records of project
-- ----------------------------
BEGIN;
INSERT INTO `project` VALUES (1, '测试1', 'code1', '2023-03-09 20:26:31', '2023-03-09 20:26:31', 0);
INSERT INTO `project` VALUES (3, '测试3', 'code3', '2023-03-10 23:52:37', '2023-03-10 23:52:37', 0);
COMMIT;

-- ----------------------------
-- Table structure for project_user
-- ----------------------------
DROP TABLE IF EXISTS `project_user`;
CREATE TABLE `project_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `projectCode` varchar(256) NOT NULL COMMENT '项目Code',
  `userId` bigint(20) NOT NULL COMMENT '创建用户 id',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `isDelete` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `projectCode` (`projectCode`,`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COMMENT='项目-用户';

-- ----------------------------
-- Records of project_user
-- ----------------------------
BEGIN;
INSERT INTO `project_user` VALUES (1, 'code1', 2, '2023-03-09 20:27:11', '2023-03-09 20:41:24', 0);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='用户';

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (2, 'adminNick', 'admin', NULL, NULL, 'user', '$2b$10$7lq6lzaIFTCWz9abcdGHZud72Xwjyf9k24AMQmVuQvBszXkultLFi', '2023-03-06 21:52:45', '2023-03-06 21:52:45', 0);
INSERT INTO `user` VALUES (3, 'lucasNick', 'lucas', NULL, NULL, 'user', '$2b$10$in.jSj8jhMx5.nrbLUitKuetOn.aEYhckbsGz6WlTkqExjWtO0nye', '2023-03-13 00:37:47', '2023-03-13 00:37:47', 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
