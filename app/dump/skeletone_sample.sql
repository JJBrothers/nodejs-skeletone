CREATE DATABASE  IF NOT EXISTS `skeletone` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `skeletone`;
-- MySQL dump 10.13  Distrib 5.7.12, for osx10.9 (x86_64)
--
-- Host: 210.221.219.150    Database: skeletone
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.20-MariaDB-1~jessie

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
-- Table structure for table `sample`
--

DROP TABLE IF EXISTS `sample`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sample` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `col1` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col2` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col3` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col4` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col5` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sample`
--

LOCK TABLES `sample` WRITE;
/*!40000 ALTER TABLE `sample` DISABLE KEYS */;
INSERT INTO `sample` VALUES (1,'row1_col1','row1_col2','row1_col3','row1_col4','a'),(2,'row2_col1','row2_col2','row2_col3','row2_col4','a'),(3,'row3_col1','row3_col2','row3_col3','row3_col4','b'),(4,'row4_col1','row4_col2','row4_col3','row4_col4','b');
/*!40000 ALTER TABLE `sample` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sample_rel`
--

DROP TABLE IF EXISTS `sample_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sample_rel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sample_id` int(11) DEFAULT NULL,
  `col1` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col2` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col3` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col4` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col5` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sample_rel`
--

LOCK TABLES `sample_rel` WRITE;
/*!40000 ALTER TABLE `sample_rel` DISABLE KEYS */;
INSERT INTO `sample_rel` VALUES (1,1,'row1_col1','row1_col2','row1_col3','row1_row4','row1_row5'),(2,1,'row2_col1','row2_col2','row2_col3','row2_col4','row2_col5'),(3,1,'row3_col1','row3_col2','row3_col3','row3_col4','row3_col5'),(4,1,'row4_col1','row4_col2','row4_col3','row4_col4','row4_col5'),(5,2,'row5_col1','row5_col2','row5_col3','row5_col4','row5_col5'),(6,2,'row6_col1','row5_col2','row5_col3','row5_col4','row5_col5');
/*!40000 ALTER TABLE `sample_rel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'skeletone'
--

--
-- Dumping routines for database 'skeletone'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-05 17:00:07
