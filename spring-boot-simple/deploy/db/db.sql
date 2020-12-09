/*
SQLyog Ultimate v11.33 (64 bit)
MySQL - 8.0.12 : Database - framework_sample_starter
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`framework_sample_starter` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `framework_sample_starter`;

/*Table structure for table `audit_log` */

DROP TABLE IF EXISTS `audit_log`;

CREATE TABLE `audit_log` (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `create_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `request_ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `audit_log` */

insert  into `audit_log`(`id`,`create_by`,`create_date`,`description`,`request_ip`,`type`,`user_id`) values ('1111535008645910530','1',NULL,NULL,NULL,0,NULL);

/*Table structure for table `u_user` */

DROP TABLE IF EXISTS `u_user`;

CREATE TABLE `u_user` (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'ID',
  `account` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '账号',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '密码',
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '用户名称',
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '电话',
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '邮箱',
  `sex` int(3) DEFAULT '0' COMMENT '性别，1男，2女,0保密',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '头像',
  `user_type` int(5) DEFAULT '3' COMMENT '用户类型',
  `is_super_admin` int(3) DEFAULT '0' COMMENT '是否超级管理员,1是，0否',
  `is_del` int(3) DEFAULT '0' COMMENT '是否删除，1删除，0否',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户信息';

/*Data for the table `u_user` */

insert  into `u_user`(`id`,`account`,`password`,`user_name`,`phone`,`email`,`sex`,`avatar`,`user_type`,`is_super_admin`,`is_del`,`create_time`,`update_time`) values ('1129596735281053697','weng','123','翁',NULL,'111@163.com',0,NULL,3,0,0,'2019-05-18 11:57:03','2019-05-18 11:57:03');

/*Table structure for table `u_user_info` */

DROP TABLE IF EXISTS `u_user_info`;

CREATE TABLE `u_user_info` (
  `id` varchar(32) NOT NULL COMMENT 'id',
  `user_id` varchar(32) DEFAULT NULL COMMENT '用户ID',
  `name` varchar(32) DEFAULT NULL COMMENT '姓名',
  `name_en` varchar(64) DEFAULT NULL COMMENT '英文姓名',
  `name_pinyin` varchar(64) DEFAULT NULL COMMENT '姓名拼音',
  `name_before` varchar(32) DEFAULT NULL COMMENT '曾用名',
  `gender` char(1) DEFAULT NULL COMMENT '性别 GBT2261',
  `birthday` datetime DEFAULT NULL COMMENT '出生日期',
  `birth_area_id` varchar(32) DEFAULT NULL COMMENT '出生地编码',
  `birth_address` varchar(30) DEFAULT NULL COMMENT '出生地',
  `area_id` varchar(32) DEFAULT NULL COMMENT '家庭所属区域ID',
  `address_detail` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '家庭详细地址',
  `nation_code` varchar(32) DEFAULT NULL COMMENT '民族 GBT3304',
  `national_area` varchar(32) DEFAULT NULL COMMENT '国籍/地区',
  `id_card_type_code` varchar(32) DEFAULT NULL COMMENT '身份证件类型代码',
  `id_card_type` varchar(32) DEFAULT NULL COMMENT '身份证件类型',
  `id_card_num` varchar(128) DEFAULT NULL COMMENT '身份证件号',
  `id_card_valid_dt` datetime DEFAULT NULL COMMENT '身份证件有效期',
  `political_status_code` varchar(32) DEFAULT NULL COMMENT '政治面貌 GBT4762',
  `health_code` varchar(32) DEFAULT NULL COMMENT '健康状况 GBT4767',
  `blood_type_code` varchar(32) DEFAULT NULL COMMENT '血型 XX',
  `resident_adress` varchar(128) DEFAULT NULL COMMENT '户口所在地',
  `resident_nature_code` varchar(32) DEFAULT NULL COMMENT '户口性质代码 HKXZ',
  `resident_nature` varchar(32) DEFAULT NULL COMMENT '户口性质',
  `disabled_person_type_code` varchar(32) DEFAULT NULL COMMENT '残疾人类型代码\r\n CJRLX',
  `disabled_person_type` varchar(32) DEFAULT NULL COMMENT '残疾人类型',
  `is_del` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT '是否逻辑删除标识（0-未删除，1-已删除）',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `index_is_deleted` (`is_del`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='人员详细信息';

/*Data for the table `u_user_info` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
