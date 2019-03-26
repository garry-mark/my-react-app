-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	5.7.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `blog`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `blog` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `blog`;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `id` mediumint(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增文章ID',
  `title` char(20) NOT NULL DEFAULT '' COMMENT '标题',
  `banner` varchar(256) DEFAULT '' COMMENT '横幅',
  `content` text COMMENT '内容',
  `like` smallint(4) DEFAULT '0' COMMENT '赞',
  `page_view` smallint(6) DEFAULT '0' COMMENT '浏览量',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `origin_type` tinyint(1) NOT NULL COMMENT '来源类型：外链0、原创1',
  `origin_url` varchar(256) DEFAULT NULL COMMENT '来源url',
  `origin_name` char(20) DEFAULT NULL COMMENT '来源名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'Hello World','https://farm4.staticflickr.com/3931/15532327436_74c32632ac_k.jpg','# Hello World!',10,19,'2019-03-25 09:11:18','2019-03-25 09:11:18',1,NULL,NULL),(2,'Hello Garry','','# Hello Garry',0,0,'2019-03-18 11:22:26','2019-03-18 11:22:26',0,NULL,NULL),(3,'Hello Vicky','','# Hello Vicky',0,0,'2019-03-18 11:22:57','2019-03-18 11:22:57',0,NULL,NULL),(4,'title','banner','',0,0,'2019-03-21 11:41:59',NULL,1,'',''),(5,'title','banner','',0,0,'2019-03-21 11:44:25',NULL,1,'',''),(6,'title','banner','',0,0,'2019-03-22 02:19:54',NULL,1,'',''),(7,'title','banner',NULL,0,0,'2019-03-22 02:27:42',NULL,1,NULL,NULL),(8,'title','banner',NULL,0,0,'2019-03-22 06:55:00',NULL,1,NULL,NULL),(9,'title','banner',NULL,0,0,'2019-03-22 06:55:29',NULL,1,NULL,NULL),(38,'A','banner',NULL,0,0,'2019-03-23 13:16:44','2019-03-23 13:16:44',1,NULL,NULL);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增类型ID',
  `name` char(16) NOT NULL DEFAULT '' COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Javascript'),(2,'CSS'),(3,'HTML'),(4,'Node'),(5,'React'),(6,'Vue'),(7,'Angular'),(8,'设计模式'),(9,'数据结构'),(10,'算法'),(12,'Webpack');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_article_category`
--

DROP TABLE IF EXISTS `map_article_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `map_article_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增关联表ID',
  `aid` mediumint(11) unsigned NOT NULL COMMENT '文章ID',
  `cid` tinyint(11) unsigned DEFAULT NULL COMMENT '类型ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_article_category`
--

LOCK TABLES `map_article_category` WRITE;
/*!40000 ALTER TABLE `map_article_category` DISABLE KEYS */;
INSERT INTO `map_article_category` VALUES (1,1,1),(2,38,2),(3,10,2);
/*!40000 ALTER TABLE `map_article_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增用户ID',
  `username` char(16) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` char(32) NOT NULL DEFAULT '' COMMENT '密码',
  `tel_num` char(11) DEFAULT NULL COMMENT '电话号码',
  `email` char(64) DEFAULT NULL COMMENT '电子邮箱',
  `role` tinyint(1) DEFAULT '0' COMMENT '角色：访客0、博主1',
  `avatar` varchar(256) DEFAULT NULL COMMENT '头像',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (0,'garry','123456','15521097744','763224334@qq.com',1,NULL,'2019-03-02 05:09:45','2019-03-02 05:09:45'),(1,'tony','111111','18826130439','1111@qq.com',0,NULL,'2019-03-14 06:39:50','2019-03-14 06:39:50'),(8,'jjjj','123456','15121097744','abc@12.com',0,'http://www.abc.com','2019-03-25 06:26:21','2019-03-25 06:26:21');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-25 13:50:38
