-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: j6a405.p.ssafy.io    Database: otl_mysql
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category_t`
--

DROP TABLE IF EXISTS `category_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_t` (
  `category_code` varchar(45) NOT NULL,
  `category_name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`category_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_t`
--

LOCK TABLES `category_t` WRITE;
/*!40000 ALTER TABLE `category_t` DISABLE KEYS */;
INSERT INTO `category_t` VALUES ('bed','bed'),('chair','chair'),('character','character'),('closet','closet'),('etc','etc'),('floor','floor'),('table','table'),('wallpaper','wallpaper');
/*!40000 ALTER TABLE `category_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_t`
--

DROP TABLE IF EXISTS `items_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_t` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `token_id` int DEFAULT NULL,
  `Author_name` varchar(45) DEFAULT NULL,
  `item_title` varchar(100) DEFAULT NULL,
  `item_description` varchar(1000) DEFAULT NULL,
  `item_hash` varchar(256) DEFAULT NULL,
  `owner_address` varchar(256) DEFAULT NULL,
  `on_sale_yn` tinyint DEFAULT '0',
  `on_use_yn` tinyint DEFAULT '0',
  `category_code` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `x_index` double DEFAULT NULL,
  `y_index` double DEFAULT NULL,
  `z_index` double DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `category_fk_idx` (`category_code`),
  CONSTRAINT `category_fk` FOREIGN KEY (`category_code`) REFERENCES `category_t` (`category_code`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_t`
--

LOCK TABLES `items_t` WRITE;
/*!40000 ALTER TABLE `items_t` DISABLE KEYS */;
INSERT INTO `items_t` VALUES (1,1,'오박사','실패한 포켓볼','피카츄를 잡다 실패한 포켓볼이다.',NULL,'0x8CAD33EEA64A3eE9334463fcB4793307Cb5Ce510',0,1,'etc','2022-04-04 18:09:33',260,85,0),(2,2,'ssssoo','마시멜로 벽지','달달한 향이 날 것 같은 마시멜로 벽지입니다:)',NULL,'0x8CAD33EEA64A3eE9334463fcB4793307Cb5Ce510',1,0,'wallpaper','2022-04-04 18:11:08',NULL,NULL,NULL),(3,3,'피카츄','피카츄배구장','피카츄를 혹사 시킬수 있는 배구장이다.',NULL,'0x8CAD33EEA64A3eE9334463fcB4793307Cb5Ce510',0,1,'wallpaper','2022-04-04 18:11:40',270,75,0),(4,4,'ssso','러그','노랑보랑러그',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',0,0,'etc','2022-04-04 18:12:06',0,0,0),(5,5,'웅이','눈이 없는 웅이','앞은 보일까 걱정이다...',NULL,'0x8CAD33EEA64A3eE9334463fcB4793307Cb5Ce510',0,1,'character','2022-04-04 18:13:51',19,232,0),(6,6,'junga','purple bed','보라 침대\r\n\r\nFor example: \'image: Flaticon.com\'. This cover has been designed using resources from Flaticon.com',NULL,'0x86754bD43A125Fc5f015F2e92B2390583Fa14997',0,0,'bed','2022-04-04 18:14:01',0,0,0),(7,7,'ssso','보라노랑러그','영롱한 보라노랑러그',NULL,'0x58B148C1f5645757dda78cc6856F15C905eE5351',1,1,'etc','2022-04-04 18:15:01',130,234,0),(8,8,'junga','purple wallpaper','충주 활옥동굴을 벽지로 만들어 봤습니다',NULL,'0x86754bD43A125Fc5f015F2e92B2390583Fa14997',0,1,'wallpaper','2022-04-04 18:15:21',0,0,0),(9,9,'지우','피카츄를 잡는데 실패한 지우이다','피카츄를 괴롭히는 지우다. 솔직히 로켓단 보다 얘가 더 나쁜애다.',NULL,'0x8CAD33EEA64A3eE9334463fcB4793307Cb5Ce510',0,1,'character','2022-04-04 18:15:24',558,232,0),(10,10,'ssso','푹신침대','귀엽고 푹신한 침대입니다~',NULL,'0x8CAD33EEA64A3eE9334463fcB4793307Cb5Ce510',1,0,'bed','2022-04-04 18:15:46',NULL,NULL,NULL),(11,11,'오박사','명이나물','치코리타이다. 머리에 잎사귀는 고기에 싸먹으면 아주 맛이 좋다. 가끔 웅이가 뜯어 간다.',NULL,'0x8CAD33EEA64A3eE9334463fcB4793307Cb5Ce510',0,1,'character','2022-04-04 18:16:48',145,215,0),(12,12,'hyesung','Sorting Hat','영화 해리포터에 나온 기숙사 방 배정해주는 모자입니다~\r\n다들 이 모자 사셔서 어느 기숙사에 속하는지 시험해보세요~~',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',1,1,'character','2022-04-04 18:16:57',139,182,0),(13,14,'오박사','물대포','꼬부기다. 물대포를 자주 사용하지만 실제로는 그냥 거북이다.',NULL,'0x8CAD33EEA64A3eE9334463fcB4793307Cb5Ce510',0,0,'character','2022-04-04 18:17:35',0,0,0),(14,13,'junga','귀여운 stree cat','동네 길고양이 나비엄마입니다\r\n나이도 많은데 귀엽고 애교 많습니다~~^^',NULL,'0x86754bD43A125Fc5f015F2e92B2390583Fa14997',1,1,'bed','2022-04-04 18:17:36',105,202,0),(15,15,'junga','junga','junga입니다.. 설명이 필요가 있나~~',NULL,'0x86754bD43A125Fc5f015F2e92B2390583Fa14997',1,1,'character','2022-04-04 18:18:23',302,211,0),(16,16,'junga','공원 고양이','공원이 집인 귀여운 고양이입니다\r\n새끼같아 보이지만 다 컸습니다',NULL,'0x86754bD43A125Fc5f015F2e92B2390583Fa14997',0,1,'etc','2022-04-04 18:19:36',400,241,0),(17,17,'junga','cheese wallpaper','노란 개나리 벽지',NULL,'0x86754bD43A125Fc5f015F2e92B2390583Fa14997',0,0,'wallpaper','2022-04-04 18:20:48',NULL,NULL,NULL),(18,18,'junga','할아버지의 낡은 빨간 시계','성수 이곳저곳 돌아다니다 발견한 예쁜 소품 시계',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',0,1,'etc','2022-04-04 18:21:47',294,180,0),(19,19,'ssso','애착오리','귀여운 대두오리입니다~',NULL,'0x58B148C1f5645757dda78cc6856F15C905eE5351',1,1,'character','2022-04-04 18:22:55',60,208,0),(20,20,'junga','haeundae station wallpaper','해운대가 눈 앞에 있는 느낌~\r\n내 방을 해운대로 만들어보세요',NULL,'0x86754bD43A125Fc5f015F2e92B2390583Fa14997',0,0,'wallpaper','2022-04-04 18:23:07',NULL,NULL,NULL),(21,21,'junga','2022 겨울에 먹은 방어회','혜화 어딘가에서 먹은 방어회입니다\r\n제철이라 맛있었는데 다 먹고나니 일본산인걸 발견해서 쫌 찝찝했습니다...',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',0,0,'etc','2022-04-04 18:24:23',NULL,NULL,NULL),(22,22,'심슨','심슨 피카츄','도넛을 좋아하는 심슨이 합쳐진 피카츄이다.',NULL,'0x8CAD33EEA64A3eE9334463fcB4793307Cb5Ce510',0,1,'character','2022-04-04 18:24:31',375,59,0),(23,23,'junga','junga 방의 초록 벽지','작가 junga님의 실제 방에 있는 벽지를 그대로 옮겨 담았습니다',NULL,'0x86754bD43A125Fc5f015F2e92B2390583Fa14997',0,0,'wallpaper','2022-04-04 18:25:35',NULL,NULL,NULL),(24,24,'Dorororodong','Elmo on the board','Elmo is riding the board excitedly',NULL,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',0,0,'character','2022-04-04 22:20:34',0,0,0),(25,25,'Dorororodong','Call Elmo','Answer the phone~',NULL,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',1,1,'character','2022-04-04 22:21:46',16,161,0),(26,26,'Dorororodong','Elmo and tomato','Tomato is emergency food',NULL,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',1,1,'character','2022-04-04 22:23:27',149,158,0),(27,27,'Dorororodong','Look at me, Elmo','Don\'t look away',NULL,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',1,1,'character','2022-04-04 22:24:49',422,157,0),(28,28,'Dorororodong','Emart','work, despair, frustration\r\n',NULL,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',1,1,'character','2022-04-04 22:25:58',557,157,0),(29,29,'Dorororodong','humanoid Elmo','Shut up, Human',NULL,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',1,1,'character','2022-04-04 22:28:19',424,267,0),(30,30,'Dorororodong','Elmo\'s face','If you smile, you\'ll be blessed',NULL,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',1,1,'character','2022-04-04 22:29:39',149,267,0),(31,31,'Dorororodong','unemployed Elmo','I want to get a job...',NULL,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',1,1,'character','2022-04-04 22:30:52',553,267,0),(32,32,'Dorororodong','Elmo sitting down','I want to keep sitting down even if I\'m sitting down',NULL,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',1,1,'character','2022-04-04 22:32:32',18,264,0),(33,33,'Dorororodong','Elmo exhibition','title of Elmo exhibition',NULL,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',1,1,'bed','2022-04-04 22:34:24',237,-36,0),(34,34,'Dorororodong','Eniverse','Elmo, the center of the world\r\n',NULL,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',1,1,'character','2022-04-04 22:36:40',285,158,0),(35,35,'Dorororodong','Elyaho','Muyaho~!',NULL,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',1,1,'character','2022-04-04 22:38:13',298,263,0),(36,36,'Dorororodong','R.K.O','Don\'t touch',NULL,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',1,1,'character','2022-04-04 22:40:12',493,16,0),(37,37,'Dorororodong','Bodyguard','Be careful',NULL,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',1,1,'character','2022-04-04 22:41:32',79,15,0),(38,38,'hyesung','HarryPotter\'s Room','해리포터 컨셉을 방의 테마로 정해서 한번 그려봤어요~',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',0,1,'wallpaper','2022-04-05 09:26:48',0,0,0),(39,39,'hyesung','Hadwig','해리포터의 올빼미입니다~ 현재 있을 곳이 없어 책 위에 올라가있네요 다른 버전들도 출시 예정입니다',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',1,1,'character','2022-04-05 09:28:48',142,243,0),(40,40,'hyesung','HarryPotter\'s Broom','해리포터의 빗자루입니다. 님부스2000보다는 성능이 떨어지지만 집안에서 나는 것쯤은 일도 아닙니다! 이거타고 한강가면 인싸 등극',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',1,0,'bed','2022-04-05 09:38:09',0,0,0),(41,41,'hyesung','Broom','타고 다닐 수 있는 마법의 빗자루! 급한 일이 생겼을 때, 버스? 지하철? 택시? 으으으음~~!! 바로 이 마법의 빗자루를 타세요! 가지고만 있어도 GanZi 그 자체인 빗자루! 빗자루 위에 누워서 잠을 청해볼 수도 있답니다',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',0,1,'bed','2022-04-05 09:54:14',32,64,0),(42,42,'hyesung','HarryPotter Poster','해리포터를 수배하는 포스터입니다 집에 이런 포스터 하나 있으면 정말 분위기 확 바뀌고 포스터를 볼 때마다 내가 호그와트에 있는건가 하는 착각이 들게 한다구요~',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',1,1,'etc','2022-04-05 09:59:53',540,119,0),(43,43,'hyesung','Magic Jar','사람 하나 담글 것 같은 모양의 마법의 항아리입니다! 집에 무서운 사람이 왔다 싶으면 그냥 냅다 담그세요. 마법의 항아리가 그 사람의 침대가 될 수 있습니다.',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',0,1,'bed','2022-04-05 10:06:07',477,199,0),(44,44,'hyesung','Snitch','쿼디치 경기에서 해리포터가 항상 따라다니는 스니치입니다! 그림과 같이 집에 놓으면 얘가 알아서 뛰어다녀요 잡으러다니면서 운동도 하고 재미도 있고 일석이조',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',0,0,'etc','2022-04-05 10:10:35',0,0,0),(45,45,'sssso','보라보라벽지','보라색이 참 이쁘죠',NULL,'0x58B148C1f5645757dda78cc6856F15C905eE5351',0,1,'wallpaper','2022-04-05 10:14:39',232,263,0),(46,46,'t1t1t1','2022어우티','2022스프링 우승자의 품격이 보이는 멋진 포스터',NULL,'0x58B148C1f5645757dda78cc6856F15C905eE5351',0,1,'etc','2022-04-05 10:17:42',290,77,0),(47,47,'sssso','나잔다고양이','아버지처럼 푸근한 인상으로 자는 고양이',NULL,'0x58B148C1f5645757dda78cc6856F15C905eE5351',1,1,'etc','2022-04-05 10:36:50',200,219,0),(48,48,'ssso','벚꽃나무','저는...벚꽃나무 한그루를 집에다가 놓는게 꿈이었거든요?',NULL,'0x58B148C1f5645757dda78cc6856F15C905eE5351',1,1,'bed','2022-04-05 10:52:00',478,98,0),(49,49,'sssso','빵빵덕','빵빵덕 귀여워><',NULL,'0x58B148C1f5645757dda78cc6856F15C905eE5351',1,1,'character','2022-04-05 10:58:24',310,218,0),(50,50,'sssso','닭샐리','닭으로 변해버린 샐리 귀여워',NULL,'0x58B148C1f5645757dda78cc6856F15C905eE5351',0,1,'character','2022-04-05 11:00:23',399,225,0),(51,51,'sssso','미스터션샤인포스터','정말 감명깊게 본 인생 top3 드라마 중에 하나인 미스터션샤인...',NULL,'0x58B148C1f5645757dda78cc6856F15C905eE5351',0,1,'etc','2022-04-05 11:02:49',422,77,0),(52,52,'sssso','블루베리케이크','블루베리케이크이긴한데 파바꺼가 쫌 맛있음',NULL,'0x58B148C1f5645757dda78cc6856F15C905eE5351',0,1,'etc','2022-04-05 11:11:02',515,283,0),(53,53,'sssso','자허블','서타벅스 자허블 존맛인거 다들 아시죠?',NULL,'0x58B148C1f5645757dda78cc6856F15C905eE5351',0,1,'etc','2022-04-05 11:11:45',438,303,0),(54,54,'ssso','꽃밭의 꼬부기','귀여운건 늘 짜릿해...그 중에서 꼬부기는 더 귀엽고 더 짜릿해',NULL,'0x58B148C1f5645757dda78cc6856F15C905eE5351',1,1,'etc','2022-04-05 11:22:25',163,77,0),(55,55,'WowJohn','Grass Floor','잔디밭에 누워있는 건 상상만으로도 힐링이죠! 보기만해도 힐링되는 나만의 공간!',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',0,0,'floor','2022-04-05 11:37:48',0,0,0),(56,56,'Caff Olimpia','엘레강스한 탁자','빅토리아풍의 엘레강스함을 뽐내고 있는 탁자입니다! 누구든지 이 탁자를 보면 바로 구매하고 싶어지는 마력의 탁자',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',0,0,'table','2022-04-05 11:43:47',0,0,0),(57,57,'Cleniosilva Barron','엘레강스한 의자','탁자와 세트로 너무나 엘레강스함을 뽐내고 있습니다~ 앉기만 하면 피곤함이 다섯배가 되어서 저도 잘 안앉아요',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',0,0,'chair','2022-04-05 11:48:40',0,0,0),(58,58,'hyesung','온천','누구든지 쉴 수 있는 온천입니다!! 모두 오세요!!',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',1,0,'wallpaper','2022-04-05 13:33:40',0,0,0),(59,59,'hyesung','valentine','해피 발렌타인 데이를 맞아 한번 만들어봤습니다~!!\r\n모두들 달콤한 하루 되세요',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',1,0,'wallpaper','2022-04-05 13:41:23',0,0,0),(60,60,'hyesung','도넛 침대','맛있는 침대가 왔어요~~\r\n싱싱하고 맛있는 침대가 왔어요',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',1,0,'bed','2022-04-05 15:12:28',0,0,0),(61,61,'hyesung','식빵 옷/책장','맛있는 식빵 책장!\r\n책 읽으면서 혹은 옷을 갈아입으면서 \r\n조금씩 책장을 뜯어먹어보세요!\r\n마음의 양식과 실제 배부름까지 느낄 수 있답니다!',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',1,0,'closet','2022-04-05 15:15:47',0,0,0),(62,62,'hyesung','Big Bed','도넛 침대의 큰 버전입니다! 자다가 한입 베어먹으면 그렇게 행복할 수가 없죠~!!',NULL,'0x6238706B33bf99808599bA8CC6910eEb378ea013',0,0,'bed','2022-04-05 15:25:26',0,0,0),(63,63,'junga','도토리 100개 말풍선','그때 그 시절 싸이월드 말풍선 그대로^^\r\nS2추억..☆',NULL,'0x86754bD43A125Fc5f015F2e92B2390583Fa14997',0,1,'bed','2022-04-06 13:19:46',252,66,0),(64,64,'junga','예쁜 NEON 간판','홍대 산리오 팝업스토어 가서 찍은 사진!',NULL,'0x86754bD43A125Fc5f015F2e92B2390583Fa14997',0,1,'etc','2022-04-06 13:20:47',556,7,0),(65,65,'xordbs','스폰지밥','활짝 웃는 스폰지밥',NULL,'0x0E821CCccDcADeC9232aC9d6aD5ceAF4df68aA66',0,0,'character','2022-04-06 19:16:21',NULL,NULL,NULL),(66,66,'xordbs','다람이','스폰지밥의 친구 다림이',NULL,'0xCf03FFC390f787721f267a1354A2453643693514',1,1,'character','2022-04-06 20:01:04',424,202,0),(68,67,'casper','겸둥이 캐스퍼','제가 좋아하는 캐스퍼입니다',NULL,'0xd76f60e75d9b761b7f0986b36fC653DcCd01AF4b',0,1,'floor','2022-04-07 11:01:45',205,78,0);
/*!40000 ALTER TABLE `items_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_t`
--

DROP TABLE IF EXISTS `sales_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_t` (
  `sale_id` int NOT NULL AUTO_INCREMENT,
  `sale_contract_address` varchar(256) DEFAULT NULL,
  `sale_yn` tinyint DEFAULT '1',
  `token_id` int DEFAULT NULL,
  `seller_address` varchar(256) DEFAULT NULL,
  `buyer_address` varchar(256) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `completed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`sale_id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_t`
--

LOCK TABLES `sales_t` WRITE;
/*!40000 ALTER TABLE `sales_t` DISABLE KEYS */;
INSERT INTO `sales_t` VALUES (21,'0x1319c459Af8f1Af43897b6b086481Ff48cCcF1Ba',1,49,'0x58B148C1f5645757dda78cc6856F15C905eE5351',NULL,'2022-04-06 18:42:48','2022-04-30 18:42:09'),(22,'0xC88fccC4468CF5aF4338b777a3B862119E14a3De',1,19,'0x58B148C1f5645757dda78cc6856F15C905eE5351',NULL,'2022-04-06 18:44:09','2022-04-30 18:43:35'),(23,'0x9b46992F9CEF3772d7A038914381B928109879EA',1,47,'0x58B148C1f5645757dda78cc6856F15C905eE5351',NULL,'2022-04-06 18:44:59','2022-04-30 18:44:19'),(24,'0x1a21A107e320213b1A458bEAA990eA9cEd31A1b2',0,2,'0x58B148C1f5645757dda78cc6856F15C905eE5351','0xCf03FFC390f787721f267a1354A2453643693514','2022-04-06 18:45:49','2022-04-06 19:13:41'),(25,'0xf92ADfcF6F64f6ee3A753cfe8a9563dF612E8e38',0,10,'0x58B148C1f5645757dda78cc6856F15C905eE5351','0xCf03FFC390f787721f267a1354A2453643693514','2022-04-06 18:46:39','2022-04-06 20:00:03'),(26,'0xeEf259D91c7AA3607Bb049F03870997906630F6E',1,48,'0x58B148C1f5645757dda78cc6856F15C905eE5351',NULL,'2022-04-06 18:47:20','2022-04-30 18:46:48'),(27,'0xEE8003583aaD703b3E76Da4EcAad5d893cD85f0B',1,54,'0x58B148C1f5645757dda78cc6856F15C905eE5351',NULL,'2022-04-06 18:48:09','2022-04-30 18:47:32'),(28,'0x9307fcce5b5f8863ed102536F21dA6BdD21B2Eb8',1,7,'0x58B148C1f5645757dda78cc6856F15C905eE5351',NULL,'2022-04-06 18:49:09','2022-04-30 18:48:30'),(29,'0x11E2047eE04bA5cFe3e55Dd71Aa38D16FeA19b0B',1,37,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',NULL,'2022-04-06 18:53:52','2022-04-17 18:51:43'),(30,'0xB37E6a5b21a989556c8FC2f2c8f759c6D2A4aa9D',1,36,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',NULL,'2022-04-06 18:54:52','2022-04-17 18:54:01'),(31,'0x1f7191Fd9387b540c39A41C4E6d6cf48E3b4Cba0',1,33,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',NULL,'2022-04-06 18:55:50','2022-04-17 18:55:04'),(32,'0x0AAF3b58F8A75552AfCF03029E0F6B7Ef6Cd8798',1,34,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',NULL,'2022-04-06 18:57:16','2022-04-17 18:56:13'),(33,'0x132B62D2A0BE48b18B112520A5A6e29e321A5609',1,27,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',NULL,'2022-04-06 18:58:47','2022-04-17 18:57:31'),(34,'0x7bF68F7EE5fa2758C0c099b48d5d2ffC44b798b0',1,28,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',NULL,'2022-04-06 18:59:30','2022-04-17 18:58:55'),(35,'0x1DF80669ee21C1DA8B6ed5370A73FBd36262Efb1',1,25,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',NULL,'2022-04-06 19:00:33','2022-04-17 18:59:53'),(36,'0xcb6500fAEB644465752c60A4c837E956F26cBdd0',1,26,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',NULL,'2022-04-06 19:01:48','2022-04-17 19:00:50'),(37,'0x4d361D1c871439a3038313e4aE895c62A9292036',1,31,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',NULL,'2022-04-06 19:03:34','2022-04-17 19:02:28'),(38,'0x48D07572c4A7ECBeBfc1c4a72acf505aE521e798',1,29,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',NULL,'2022-04-06 19:04:29','2022-04-17 19:03:47'),(39,'0xB43436268303ec58422994aB2B9B36FD20B66cad',1,35,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',NULL,'2022-04-06 19:05:29','2022-04-17 19:04:46'),(40,'0x2A02969DC689D25422aEF9377ba1eD3F1873946a',1,30,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',NULL,'2022-04-06 19:06:50','2022-04-17 19:05:44'),(41,'0x3A210a5d61C7e6A7920144096d5AB1e2A0A08fFF',1,32,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f',NULL,'2022-04-06 19:07:51','2022-04-17 19:07:11'),(43,'0x9C97F3D4DAe9C1826541e9239B8a7EA4c5bcAE15',0,65,'0xCf03FFC390f787721f267a1354A2453643693514','0x0E821CCccDcADeC9232aC9d6aD5ceAF4df68aA66','2022-04-06 19:37:12','2022-04-06 19:41:02'),(44,'0x6C7515c9BB02b8aA3E221C04Dd5B2F6aC3E17596',1,66,'0xCf03FFC390f787721f267a1354A2453643693514',NULL,'2022-04-06 20:02:23','2022-04-09 20:01:42'),(45,'0x5e3a87e1e0e6069E63685266bbA7678C49b323e6',1,60,'0x6238706B33bf99808599bA8CC6910eEb378ea013',NULL,'2022-04-06 21:01:49','2022-04-30 21:00:38'),(46,'0x8554A025E58fC379008d65B20Ee81334Bbe9253a',1,59,'0x6238706B33bf99808599bA8CC6910eEb378ea013',NULL,'2022-04-06 21:03:16','2022-04-30 21:02:15'),(47,'0x72E4694401124be9D42F912BDd721Aa95eEC89ce',1,58,'0x6238706B33bf99808599bA8CC6910eEb378ea013',NULL,'2022-04-06 21:05:16','2022-04-30 21:03:58'),(48,'0x9f0484Fd65d0d309387D37211E44bbb38329B121',1,40,'0x6238706B33bf99808599bA8CC6910eEb378ea013',NULL,'2022-04-06 21:07:15','2022-04-30 21:05:42'),(49,'0x4D2ACcfBd2578324989dc65268d595b5529DCBb7',1,61,'0x6238706B33bf99808599bA8CC6910eEb378ea013',NULL,'2022-04-06 21:13:37','2022-04-30 21:12:32'),(50,'0x01D197D874254655c19abcf4A8651E22B1b2a0F6',1,12,'0x6238706B33bf99808599bA8CC6910eEb378ea013',NULL,'2022-04-06 21:16:36','2022-04-30 21:15:34'),(51,'0x5bFDafA25F7c37f68c678ef8B9190ACfc63bFEcD',1,39,'0x6238706B33bf99808599bA8CC6910eEb378ea013',NULL,'2022-04-06 21:19:58','2022-04-30 21:18:44'),(52,'0xc4DbF9F9273CC47837628A163CC8A8712C69928d',1,42,'0x6238706B33bf99808599bA8CC6910eEb378ea013',NULL,'2022-04-06 21:22:24','2022-04-30 21:21:16'),(53,'0x0e4A4b014D0C4DF9f4Bbd619Fc9022aAE483e22b',0,10,'0xCf03FFC390f787721f267a1354A2453643693514','0x8CAD33EEA64A3eE9334463fcB4793307Cb5Ce510','2022-04-06 22:06:20','2022-04-07 09:55:23'),(54,'0x9D6c3D230aC5f6ad5004285225db3a5f3Cd24dC6',0,2,'0xCf03FFC390f787721f267a1354A2453643693514','0x8CAD33EEA64A3eE9334463fcB4793307Cb5Ce510','2022-04-06 22:07:00','2022-04-06 22:46:32'),(56,'0xd7dF18F909eB0e606FF50450fBE5Df2Beda1aef4',1,2,'0x8CAD33EEA64A3eE9334463fcB4793307Cb5Ce510',NULL,'2022-04-07 09:41:53','2022-04-30 09:41:23'),(58,'0x00F129Be6204B6F36f714017801bf5593a908c01',1,10,'0x8CAD33EEA64A3eE9334463fcB4793307Cb5Ce510',NULL,'2022-04-07 10:20:36','2022-04-30 10:19:42'),(59,'0x4C0A4e91861c16A4c5984a8CeAB57cB0e164581d',0,21,'0x86754bD43A125Fc5f015F2e92B2390583Fa14997','0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f','2022-04-07 10:40:19','2022-04-07 10:55:59'),(60,'0x75ea33A904b2459461cA0742F5B760fc2969f4a2',1,13,'0x86754bD43A125Fc5f015F2e92B2390583Fa14997',NULL,'2022-04-07 10:42:19','2022-04-08 10:41:40'),(62,'0xbCF659375fc916f81724f39A471867a9B9346507',1,15,'0x86754bD43A125Fc5f015F2e92B2390583Fa14997',NULL,'2022-04-07 10:51:22','2022-04-30 10:50:38'),(64,'0xba267eb2E35c19FBc8c0Ac14Bb2462808eA72C8e',0,21,'0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f','0x6238706B33bf99808599bA8CC6910eEb378ea013','2022-04-07 10:57:00','2022-04-07 11:28:23');
/*!40000 ALTER TABLE `sales_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_t`
--

DROP TABLE IF EXISTS `user_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_t` (
  `user_address` varchar(256) NOT NULL,
  `user_nickname` varchar(45) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_bio` varchar(200) DEFAULT NULL,
  `user_link` varchar(200) DEFAULT NULL,
  `user_image_url` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_t`
--

LOCK TABLES `user_t` WRITE;
/*!40000 ALTER TABLE `user_t` DISABLE KEYS */;
INSERT INTO `user_t` VALUES ('0x0E821CCccDcADeC9232aC9d6aD5ceAF4df68aA66','user','xoem00@gmail.com','TTT','@xordbs','https://nft-service.s3.ap-northeast-2.amazonaws.com/profile/16492427116961191.png','2022-04-06 19:38:01'),('0x46CCa77125508995b14cD6355e994Ac2949E8B47','asdofnasd','dsajfonasdf@aosdfmn.asd','','',NULL,'2022-04-06 11:29:34'),('0x55D420221fB3E49c052A340D6466e2ACeb4578A6','sunny','116@gamil.com','ㄴr는 오늘도 눈물을 흘린⊂ト','','https://nft-service.s3.ap-northeast-2.amazonaws.com/profile/16491668948575007.webp','2022-04-05 22:46:32'),('0x58B148C1f5645757dda78cc6856F15C905eE5351','ssssssssso','sowonwow2@gmail.com','','','https://nft-service.s3.ap-northeast-2.amazonaws.com/profile/16490634307484608.PNG','2022-04-04 18:10:03'),('0x6238706B33bf99808599bA8CC6910eEb378ea013','hyesung','hanhs4544@gmail.com','모두들 놀러와용','','https://nft-service.s3.ap-northeast-2.amazonaws.com/profile/16491370864342207.png','2022-04-04 18:05:35'),('0x7945196dC2830126c007F5b8Cc00856Fa9D3732c',NULL,NULL,NULL,NULL,NULL,'2022-04-05 10:46:44'),('0x86754bD43A125Fc5f015F2e92B2390583Fa14997','junga','wjddk7507@naver.com','방가방가~~~!!!','','https://nft-service.s3.ap-northeast-2.amazonaws.com/profile/16490634731256721.png','2022-04-04 18:09:59'),('0x8CAD33EEA64A3eE9334463fcB4793307Cb5Ce510','xordbs','xoem00@gmail.com','T','https://github.com/xordbs','https://nft-service.s3.ap-northeast-2.amazonaws.com/profile/16490632659982127.jpg','2022-04-04 18:06:01'),('0xA42671A003d06F8b3DA84965FE22CD2ed810d9AA','hyessung','hanhs4544@gmail.com','모두들 놀러와용','','https://nft-service.s3.ap-northeast-2.amazonaws.com/profile/16491370150532004.png','2022-04-05 14:16:27'),('0xC99d3e2118CaE4605af2101B5AD0Df6149DDf24f','dorororodong','ehdwnsdl1210@gmail.com','Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@Elmo!@','https://github.com/Dorororodong','https://nft-service.s3.ap-northeast-2.amazonaws.com/profile/16490694477526222.jfif','2022-04-04 18:09:30'),('0xCf03FFC390f787721f267a1354A2453643693514','test','xoem00@nate.com','TT','','https://nft-service.s3.ap-northeast-2.amazonaws.com/profile/16492398228552667.jfif','2022-04-06 19:09:34'),('0xd76f60e75d9b761b7f0986b36fC653DcCd01AF4b','casper','wjddk7507@naver.com','OTL','','https://nft-service.s3.ap-northeast-2.amazonaws.com/profile/16491330955037263.png','2022-04-05 13:29:43');
/*!40000 ALTER TABLE `user_t` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 11:40:27
