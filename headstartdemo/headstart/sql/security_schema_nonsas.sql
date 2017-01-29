drop table if exists userrole;
DROP TABLE IF EXISTS rolepermission;
DROP TABLE IF EXISTS password_feature_config;
DROP TABLE IF EXISTS password_expiry_details;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;

DROP PROCEDURE IF EXISTS PasswordDetailUpdate;

CREATE TABLE  `address` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `latitude` varchar(250) DEFAULT NULL,
  `longitude` varchar(250) DEFAULT NULL,
  `street` varchar(10) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `pincode` varchar(11) DEFAULT NULL,
  `addressLine1` varchar(100) NOT NULL,
  `addressLine2` varchar(100) DEFAULT NULL,
  `landmark` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=497 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sampleunique2`.`address`
--

/*!40000 ALTER TABLE `address` DISABLE KEYS */;
LOCK TABLES `address` WRITE;
INSERT INTO `address` VALUES  (103,NULL,NULL,NULL,'Nantes',NULL,'France',44000,'54, rue Royale',NULL,NULL),
 (112,NULL,NULL,NULL,'Las Vegas','NV','USA',83030,'8489 Strong St.',NULL,NULL),
 (114,NULL,NULL,NULL,'Melbourne','Victoria','Australia',3004,'636 St Kilda Road','Level 3',NULL),
 (119,NULL,NULL,NULL,'Nantes',NULL,'France',44000,'67, rue des Cinquante Otages',NULL,NULL),
 (121,NULL,NULL,NULL,'Stavern',NULL,'Norway',4110,'Erling Skakkes gate 78',NULL,NULL),
 (124,NULL,NULL,NULL,'San Rafael','CA','USA',97562,'5677 Strong St.',NULL,NULL),
 (125,NULL,NULL,NULL,'Warszawa',NULL,'Poland',1,'ul. Filtrowa 68',NULL,NULL),
 (128,NULL,NULL,NULL,'Frankfurt',NULL,'Germany',60528,'Lyonerstr. 34',NULL,NULL),
 (129,NULL,NULL,NULL,'San Francisco','CA','USA',94217,'5557 North Pendale Street',NULL,NULL),
 (131,NULL,NULL,NULL,'NYC','NY','USA',10022,'897 Long Airport Avenue',NULL,NULL),
 (141,NULL,NULL,NULL,'Madrid',NULL,'Spain',28034,'C/ Moralzarzal, 86',NULL,NULL),
 (144,NULL,NULL,NULL,'LuleÃ¥',NULL,'Sweden',0,'BerguvsvÃ¤gen  8',NULL,NULL),
 (145,NULL,NULL,NULL,'Kobenhavn',NULL,'Denmark',1734,'VinbÃ¦ltet 34',NULL,NULL),
 (146,NULL,NULL,NULL,'Lyon',NULL,'France',69004,'2, rue du Commerce',NULL,NULL),
 (148,NULL,NULL,NULL,'Singapore',NULL,'Singapore',79903,'Bronz Sok.','Bronz Apt. 3/6 Tesvikiye',NULL),
 (151,NULL,NULL,NULL,'NYC','NY','USA',10022,'4092 Furth Circle','Suite 400',NULL),
 (157,NULL,NULL,NULL,'Allentown','PA','USA',70267,'7586 Pompton St.',NULL,NULL),
 (161,NULL,NULL,NULL,'Burlingame','CA','USA',94217,'9408 Furth Circle',NULL,NULL),
 (166,NULL,NULL,NULL,'Singapore',NULL,'Singapore',69045,'106 Linden Road Sandown','2nd Floor',NULL),
 (167,NULL,NULL,NULL,'Bergen',NULL,'Norway  ',0,'Brehmen St. 121','PR 334 Sentrum',NULL),
 (168,NULL,NULL,NULL,'New Haven','CT','USA',97823,'149 Spinnaker Dr.','Suite 101',NULL),
 (169,NULL,NULL,NULL,'Lisboa',NULL,'Portugal',1756,'Estrada da saÃºde n. 58',NULL,NULL),
 (171,NULL,NULL,NULL,'Lille',NULL,'France',59000,'184, chaussÃ©e de Tournai',NULL,NULL),
 (172,NULL,NULL,NULL,'Paris',NULL,'France',75012,'265, boulevard Charonne',NULL,NULL),
 (173,NULL,NULL,NULL,'Cambridge','MA','USA',51247,'4658 Baden Av.',NULL,NULL),
 (175,NULL,NULL,NULL,'Bridgewater','CT','USA',97562,'25593 South Bay Ln.',NULL,NULL),
 (177,NULL,NULL,NULL,'Kita-ku','Osaka','Japan',530,'1-6-20 Dojima',NULL,NULL),
 (181,NULL,NULL,NULL,'NYC','NY','USA',10022,'2678 Kingston Rd.','Suite 101',NULL),
 (186,NULL,NULL,NULL,'Helsinki',NULL,'Finland',21240,'Keskuskatu 45',NULL,NULL),
 (187,NULL,NULL,NULL,'Manchester',NULL,'UK',0,'Fauntleroy Circus',NULL,NULL),
 (189,NULL,NULL,NULL,'Dublin',NULL,'Ireland',2,'25 Maiden Lane','Floor No. 4',NULL),
 (198,NULL,NULL,NULL,'Brickhaven','MA','USA',58339,'16780 Pompton St.',NULL,NULL),
 (201,NULL,NULL,NULL,'Liverpool',NULL,'UK',0,'12, Berkeley Gardens Blvd',NULL,NULL),
 (202,NULL,NULL,NULL,'Vancouver','BC','Canada',0,'1900 Oak St.',NULL,NULL),
 (204,NULL,NULL,NULL,'Brickhaven','MA','USA',58339,'7635 Spinnaker Dr.',NULL,NULL),
 (205,NULL,NULL,NULL,'Pasadena','CA','USA',90003,'78934 Hillside Dr.',NULL,NULL),
 (206,NULL,NULL,NULL,'Singapore',NULL,'Singapore',38988,'Suntec Tower Three','8 Temasek',NULL),
 (209,NULL,NULL,NULL,'Strasbourg',NULL,'France',67000,'24, place KlÃ©ber',NULL,NULL),
 (211,NULL,NULL,NULL,'Central Hong Kong',NULL,'Hong Kong',NULL,'Bank of China Tower','1 Garden Road',NULL),
 (216,NULL,NULL,NULL,'Barcelona',NULL,'Spain',8022,'Rambla de CataluÃ±a, 23',NULL,NULL),
 (219,NULL,NULL,NULL,'Glendale','CA','USA',92561,'4097 Douglas Av.',NULL,NULL),
 (223,NULL,NULL,NULL,'Cunewalde',NULL,'Germany',1307,'TaucherstraÃŸe 10',NULL,NULL),
 (227,NULL,NULL,NULL,'Ã…rhus',NULL,'Denmark',8200,'Smagsloget 45',NULL,NULL),
 (233,NULL,NULL,NULL,'MontrÃ©al','QuÃ©bec','Canada',0,'43 rue St. Laurent',NULL,NULL),
 (237,NULL,NULL,NULL,'Madrid',NULL,'Spain',28001,'Gran VÃ­a, 1',NULL,NULL),
 (239,NULL,NULL,NULL,'San Diego','CA','USA',91217,'361 Furth Circle',NULL,NULL),
 (240,NULL,NULL,NULL,'Cowes','Isle of Wight','UK',0,'Garden House','Crowther Way 23',NULL),
 (242,NULL,NULL,NULL,'Toulouse',NULL,'France',31000,'1 rue Alsace-Lorraine',NULL,NULL),
 (247,NULL,NULL,NULL,'Frankfurt',NULL,'Germany',60528,'Magazinweg 7',NULL,NULL),
 (249,NULL,NULL,NULL,'Torino',NULL,'Italy',10100,'Via Monte Bianco 34',NULL,NULL),
 (250,NULL,NULL,NULL,'Paris',NULL,'France',75508,'27 rue du Colonel Pierre Avia',NULL,NULL),
 (256,NULL,NULL,NULL,'Versailles',NULL,'France',78000,'67, avenue de lEurope',NULL,NULL),
 (259,NULL,NULL,NULL,'Bonn',NULL,'Germany',50739,'Mehrheimerstr. 369',NULL,NULL),
 (260,NULL,NULL,NULL,'Tsawassen','BC','Canada',0,'23 Tsawassen Blvd.',NULL,NULL),
 (273,NULL,NULL,NULL,'Mannheim',NULL,'Germany',80805,'Berliner Platz 43',NULL,NULL),
 (276,NULL,NULL,NULL,'North Sydney','NSW','Australia',2060,'201 Miller Street','Level 15',NULL),
 (278,NULL,NULL,NULL,'Bergamo',NULL,'Italy',24100,'Via Ludovico il Moro 22',NULL,NULL),
 (282,NULL,NULL,NULL,'Chatswood','NSW','Australia',2067,'Monitor Money Building','815 Pacific Hwy',NULL),
 (286,NULL,NULL,NULL,'Cambridge','MA','USA',51247,'39323 Spinnaker Dr.',NULL,NULL),
 (293,NULL,NULL,NULL,'Fribourg',NULL,'Switzerland',1700,'Rte des Arsenaux 41 ',NULL,NULL),
 (298,NULL,NULL,NULL,'GenÃ¨ve',NULL,'Switzerland',1203,'Grenzacherweg 237',NULL,NULL),
 (299,NULL,NULL,NULL,'Oslo',NULL,'Norway  ',0,'Drammensveien 126A','PB 211 Sentrum',NULL),
 (303,NULL,NULL,NULL,'Amsterdam',NULL,'Netherlands',1043,'Kingsfordweg 151',NULL,NULL),
 (307,NULL,NULL,NULL,'Berlin',NULL,'Germany',12209,'Obere Str. 57',NULL,NULL),
 (311,NULL,NULL,NULL,'Oulu',NULL,'Finland',90110,'Torikatu 38',NULL,NULL),
 (314,NULL,NULL,NULL,'Bruxelles',NULL,'Belgium',0,'Rue Joseph-Bens 532',NULL,NULL),
 (319,NULL,NULL,NULL,'White Plains','NY','USA',24067,'3758 North Pendale Street',NULL,NULL),
 (320,NULL,NULL,NULL,'New Bedford','MA','USA',50553,'4575 Hillside Dr.',NULL,NULL),
 (321,NULL,NULL,NULL,'San Francisco','CA','USA',94217,'7734 Strong St.',NULL,NULL),
 (323,NULL,NULL,NULL,'Auckland  ',NULL,'New Zealand',NULL,'162-164 Grafton Road','Level 2',NULL),
 (324,NULL,NULL,NULL,'London',NULL,'UK',0,'35 King George',NULL,NULL),
 (328,NULL,NULL,NULL,'Newark','NJ','USA',94019,'7476 Moss Rd.',NULL,NULL),
 (333,NULL,NULL,NULL,'South Brisbane','Queensland','Australia',4101,'31 Duncan St. West End',NULL,NULL),
 (334,NULL,NULL,NULL,'Espoo',NULL,'Finland',0,'Software Engineering Center','SEC Oy',NULL),
 (335,NULL,NULL,NULL,'Brandenburg',NULL,'Germany',14776,'Maubelstr. 90',NULL,NULL),
 (339,NULL,NULL,NULL,'Philadelphia','PA','USA',71270,'782 First Street',NULL,NULL),
 (344,NULL,NULL,NULL,'Madrid',NULL,'Spain',28023,'Merchants House','27-30 Merchants Quay',NULL),
 (347,NULL,NULL,NULL,'Los Angeles','CA','USA',91003,'6047 Douglas Av.',NULL,NULL),
 (348,NULL,NULL,NULL,'Cork','Co. Cork','Ireland',NULL,'8 Johnstown Road',NULL,NULL),
 (350,NULL,NULL,NULL,'Marseille',NULL,'France',13008,'12, rue des Bouchers',NULL,NULL),
 (353,NULL,NULL,NULL,'Reims',NULL,'France',51100,'59 rue de lAbbaye',NULL,NULL),
 (356,NULL,NULL,NULL,'Hatfield','Pretoria','South Africa',28,'1250 Pretorius Street',NULL,NULL),
 (357,NULL,NULL,NULL,'Auckland',NULL,'New Zealand',NULL,'199 Great North Road',NULL,NULL),
 (361,NULL,NULL,NULL,'Nuremberg',NULL,'Germany',44087,'Luisenstr. 48',NULL,NULL),
 (362,NULL,NULL,NULL,'Boston','MA','USA',51003,'8616 Spinnaker Dr.',NULL,NULL),
 (363,NULL,NULL,NULL,'Nashua','NH','USA',62005,'2304 Long Airport Avenue',NULL,NULL),
 (369,NULL,NULL,NULL,'Lisboa',NULL,'Portugal',1675,'Jardim das rosas n. 32',NULL,NULL),
 (376,NULL,NULL,NULL,'Bern',NULL,'Switzerland',3012,'Hauptstr. 29',NULL,NULL),
 (379,NULL,NULL,NULL,'Brickhaven','MA','USA',58339,'7825 Douglas Av.',NULL,NULL),
 (381,NULL,NULL,NULL,'Charleroi',NULL,'Belgium',0,'Boulevard Tirou, 255',NULL,NULL),
 (382,NULL,NULL,NULL,'Salzburg',NULL,'Austria',5020,'Geislweg 14',NULL,NULL),
 (385,NULL,NULL,NULL,'Makati City',NULL,'Philippines',1227,'15 McCallum Street','NatWest Center #13-03',NULL),
 (386,NULL,NULL,NULL,'Reggio Emilia',NULL,'Italy',42100,'Strada Provinciale 124',NULL,NULL),
 (398,NULL,NULL,NULL,'Minato-ku','Tokyo','Japan',106,'2-2-8 Roppongi',NULL,NULL),
 (406,NULL,NULL,NULL,'Paris',NULL,'France',75016,'25, rue Lauriston',NULL,NULL),
 (409,NULL,NULL,NULL,'Stuttgart',NULL,'Germany',70563,'Adenauerallee 900',NULL,NULL),
 (412,NULL,NULL,NULL,'Wellington',NULL,'New Zealand',NULL,'101 Lambton Quay','Level 11',NULL),
 (415,NULL,NULL,NULL,'Munich',NULL,'Germany',80686,'Hansastr. 15',NULL,NULL),
 (424,NULL,NULL,NULL,'NYC','NY','USA',10022,'5905 Pompton St.','Suite 750',NULL),
 (443,NULL,NULL,NULL,'Leipzig',NULL,'Germany',4179,'Heerstr. 22',NULL,NULL),
 (447,NULL,NULL,NULL,'Glendale','CT','USA',97561,'2440 Pompton St.',NULL,NULL),
 (448,NULL,NULL,NULL,'BrÃ¤cke',NULL,'Sweden',0,'Ã…kergatan 24',NULL,NULL),
 (450,NULL,NULL,NULL,'San Jose','CA','USA',94217,'3086 Ingle Ln.',NULL,NULL),
 (452,NULL,NULL,NULL,'Graz',NULL,'Austria',8010,'Kirchgasse 6',NULL,NULL),
 (455,NULL,NULL,NULL,'New Haven','CT','USA',97823,'567 North Pendale Street',NULL,NULL),
 (456,NULL,NULL,NULL,'NYC','NY','USA',10022,'5290 North Pendale Street','Suite 200',NULL),
 (458,NULL,NULL,NULL,'Madrid',NULL,'Spain',28023,'C/ Araquil, 67',NULL,NULL),
 (459,NULL,NULL,NULL,'Aachen',NULL,'Germany',52066,'Walserweg 21',NULL,NULL),
 (462,NULL,NULL,NULL,'New Bedford','MA','USA',50553,'1785 First Street',NULL,NULL),
 (465,NULL,NULL,NULL,'Madrid',NULL,'Spain',28023,'c/ Gobelas, 19-1 Urb. La Florida',NULL,NULL),
 (471,NULL,NULL,NULL,'Glen Waverly','Victoria','Australia',3150,'7 Allen Street',NULL,NULL),
 (473,NULL,NULL,NULL,'Milan',NULL,'Italy',NULL,'20093 Cologno Monzese','Alessandro Volta 16',NULL),
 (475,NULL,NULL,NULL,'Burbank','CA','USA',94019,'3675 Furth Circle',NULL,NULL),
 (477,NULL,NULL,NULL,'Mannheim',NULL,'Germany',68306,'Forsterstr. 57',NULL,NULL),
 (480,NULL,NULL,NULL,'Saint Petersburg',NULL,'Russia',196143,'2 Pobedy Square',NULL,NULL),
 (481,NULL,NULL,NULL,'Herzlia',NULL,'Israel',47625,'3 Hagalim Blv.',NULL,NULL),
 (484,NULL,NULL,NULL,'Sevilla',NULL,'Spain',41101,'C/ Romero, 33',NULL,NULL),
 (486,NULL,NULL,NULL,'Philadelphia','PA','USA',71270,'11328 Douglas Av.',NULL,NULL),
 (487,NULL,NULL,NULL,'Brisbane','CA','USA',94217,'2793 Furth Circle',NULL,NULL),
 (489,NULL,NULL,NULL,'London',NULL,'UK',0,'120 Hanover Sq.',NULL,NULL),
 (495,NULL,NULL,NULL,'Boston','MA','USA',51003,'6251 Ingle Ln.',NULL,NULL),
 (496,NULL,NULL,NULL,'Auckland  ',NULL,'New Zealand',NULL,'Arenales 1938 3A',NULL,NULL);
UNLOCK TABLES;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;

INSERT INTO `address` VALUES  (1,0,0,'Carine ','Nantes','','France',44000,'54, rue Royale','',''),
 (2,0,0,'Carine ','indore','m.p','india',452002,'11, street line','',''),
 (3,0,0,'Signal Gif','Las Vegas','NV','USA',71800,'8489 Strong St.','','');
 update `address` set `country` = UPPER(`country`);
--
-- Table structure for table users
--

CREATE TABLE  `users` (
  `userid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `activationkey` varchar(50) DEFAULT NULL,
  `profile_image` mediumblob,
  `registeredby` bit(1) DEFAULT NULL,
  `user_address` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `users_unique_1` (`username`,`email`),
  KEY `user_address` (`user_address`),
  CONSTRAINT `user_address` FOREIGN KEY (`user_address`) REFERENCES `address` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

--
-- Table structure for table roles
--


CREATE TABLE roles (
  roleid int unsigned NOT NULL auto_increment,
  rolename varchar(50) NOT NULL,
  description varchar(200) NOT NULL,
  PRIMARY KEY  (roleid),
  UNIQUE KEY roles_unique_1 (rolename)
);

--
-- Table structure for table permissions
--

CREATE TABLE permissions (
  permissionid int unsigned NOT NULL auto_increment,
  permissionname varchar(50) NOT NULL,
  description varchar(200) NOT NULL,
  PRIMARY KEY  (permissionid)
);

--
-- Table structure for table userroles
--

CREATE TABLE userrole (
  userid int unsigned NOT NULL,
  roleid int unsigned NOT NULL,
  PRIMARY KEY  (userid, roleid),
  CONSTRAINT userrole_ibfk_1 FOREIGN KEY (userid) REFERENCES users (userid),
  CONSTRAINT userrole_ibfk_2 FOREIGN KEY (roleid) REFERENCES roles (roleid)
);

--
-- Table structure for table userroles
--

CREATE TABLE rolepermission (
  roleid int unsigned NOT NULL auto_increment,
  permissionid int unsigned NOT NULL,
  PRIMARY KEY  (roleid,permissionid),
  CONSTRAINT rolepermission_ibfk_1 FOREIGN KEY (roleid) REFERENCES roles (roleid),
  CONSTRAINT rolepermission_ibfk_2 FOREIGN KEY (permissionid) REFERENCES permissions (permissionid)
);

--
-- Table structure for table password_expiry_details
--

CREATE TABLE password_expiry_details (
  username varchar(30) NOT NULL default '',
  failed_attempts tinyint(4) NOT NULL default '0',
  locked tinyint(4) NOT NULL default '0',
  last_updated_dt timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  history varchar(320) default NULL,
  first_time_login tinyint(4) NOT NULL default '0',
  PRIMARY KEY  (username)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table password_feature_config
--

CREATE TABLE password_feature_config (
  username varchar(30) NOT NULL default '',
  expiration_interval int(11) NOT NULL default '-1',
  first_time_change tinyint(4) NOT NULL default '1',
  PRIMARY KEY  (username)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Definition of table `activity_stream`
--
CREATE TABLE activity_stream (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`date` datetime DEFAULT NULL,
`entityId` varchar(255) DEFAULT NULL,
`message` varchar(255) NOT NULL,
`userid` int(11) unsigned DEFAULT NULL,
`type` varchar(255) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;





--
-- Table structure for table audit
--

CREATE TABLE  audit (
  AUDIT_ID bigint(20) NOT NULL AUTO_INCREMENT,
  `ACTION` longtext,
  `AUDIT_ACTION_NAME` varchar(100) DEFAULT NULL,
  `AUDIT_ACTION_TYPE` varchar(100) DEFAULT NULL,
  `AUDIT_DATE` datetime DEFAULT NULL,
  `host` longtext,
  `PAGE` longtext,
  `PARAMETERS` longtext,
  `remote_host` longtext,
  `sessionid` longtext,
  `SUCCESS` char(1) DEFAULT NULL,
  `userAgent` longtext,
  `USER_FULLNAME` longtext,
  `USER_ID` int(10) unsigned DEFAULT NULL,
  `exceptionDetails` longtext,
  PRIMARY KEY (`AUDIT_ID`),
  KEY `FK58D9BDB55246F77` (`USER_ID`),
  CONSTRAINT `FK58D9BDB55246F77` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`userid`)
);





/*!40000 ALTER TABLE `users` DISABLE KEYS */;
LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES  (1,'admin','d033e22ae348aeb5660fc2140aec35850c4da997',0x01,'App','Admin','9827427013','admin@changeit.com',NULL,NULL,0x01,NULL),
 (2,'guest','d033e22ae348aeb5660fc2140aec35850c4da997',0x01,'App','Guest','9827427016','guest@changeit.com',NULL,NULL,0x01,NULL),
 (3,'provisioner','d033e22ae348aeb5660fc2140aec35850c4da997',0x01,'App','Provisioner','9827427045','provisioner@changeit.com',NULL,NULL,0x01,NULL),
 (4,'reviewer','d033e22ae348aeb5660fc2140aec35850c4da997',0x01,'App','reviewer','9827423413','reviewer@changeit.com',NULL,NULL,0x01,NULL);
UNLOCK TABLES;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;


--
-- Table structure for table social_credential
--
CREATE TABLE  social_credentials (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  userid int(10) unsigned NOT NULL,
  facebook_token varchar(300) DEFAULT NULL,
  twitter_token varchar(250) DEFAULT NULL,
  gmail_token varchar(250) DEFAULT NULL,
  facebook_userid varchar(250) DEFAULT NULL,
  google_userid varchar(30) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY fk_user_id (userid),
  CONSTRAINT fk_user_id FOREIGN KEY (userid) REFERENCES users (userid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table password_expiry_details
--

LOCK TABLES password_expiry_details WRITE;
INSERT INTO password_expiry_details VALUES ('guest',0,0,'2014-06-11 18:30:00','test&123,test!123,test#123',1);
INSERT INTO password_expiry_details VALUES ('provisioner',0,0,'2014-06-11 18:30:00','test&123,test!123,test#123',1);
INSERT INTO password_expiry_details VALUES ('reviewer',0,0,'2014-06-11 18:30:00','test&123,test!123,test#123',1);
UNLOCK TABLES;

--
-- Dumping data for table password_feature_config
--
--
-- Dumping data for table roles
--
LOCK TABLES roles WRITE;
INSERT INTO roles VALUES (1,'admin','admin role');
INSERT INTO roles VALUES (2,'guest','guest role');
INSERT INTO roles VALUES (3,'provisioner','provisioner role');
INSERT INTO roles VALUES (4,'reviewer','reviewer role');
UNLOCK TABLES;

--
-- Dumping data for table userroles
--
LOCK TABLES userrole WRITE;
INSERT INTO userrole VALUES (1,1);
INSERT INTO userrole VALUES (2,2);
INSERT INTO userrole VALUES (3,3);
INSERT INTO userrole VALUES (4,4);
UNLOCK TABLES;

--
-- Dumping data for table permissions
--
LOCK TABLES permissions WRITE;
INSERT INTO permissions VALUES (1,'worklist','worklist permission');
INSERT INTO permissions VALUES (2,'usermgmt','user management permission');
INSERT INTO permissions VALUES (3,'reporting','reporting permission');
INSERT INTO permissions(permissionname,description) VALUES ('monitoring','monitoring user');
UNLOCK TABLES;


--
-- Dumping data for table rolepermissions
--
LOCK TABLES rolepermission WRITE;
INSERT INTO rolepermission VALUES (1,1);
INSERT INTO rolepermission VALUES (1,2);
INSERT INTO rolepermission VALUES (1,3);
INSERT INTO rolepermission VALUES (3,2);
INSERT INTO rolepermission VALUES (4,2);
INSERT INTO rolepermission(roleid,permissionid) VALUES (1,(SELECT permissionid from permissions where permissionname='monitoring'));
UNLOCK TABLES;

--
-- Dumping data for user_config
--

CREATE TABLE  user_config (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  user_language enum('en','sp','fr') DEFAULT NULL,
  currency_format enum('indian','europian') DEFAULT NULL,
  date_format enum('mmddyy_slash','mmddyyyy_slash','yymmdd_slash','yyyymmdd_dash','ddMMyy_dash','ddMMyyyy_dash') DEFAULT NULL,
  time_zone enum('IST','EST') DEFAULT NULL,
  user_id int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (id),
  KEY user_coig_fk_uuuser (user_id),
  CONSTRAINT `user_coig_fk_uuuser` FOREIGN KEY (user_id) REFERENCES users (userid)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for email notifications
--

CREATE TABLE  `email_notifications` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `createdDate` datetime DEFAULT NULL,
  `createdTime` datetime DEFAULT NULL,
  `sentBy` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `send_to` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKF13C31855690D7E4` (`send_to`),
  CONSTRAINT `FKF13C31855690D7E4` FOREIGN KEY (`send_to`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into email_notifications values (1,"admin@changeit.com",now(),now(),"application","admin Registration",1);
insert into email_notifications values (2,"admin@changeit.com",now(),now(),"application","guest Registration",2);
insert into email_notifications values (3,"admin@changeit.com",now(),now(),"application","provisioner Registration",3);
insert into email_notifications values (4,"admin@changeit.com",now(),now(),"application","reviewer Registration",4);

insert into activity_stream  values(1,now(),1,"admin created user guest",2,"user");
insert into activity_stream  values(2,now(),1,"admin created user provisioner",3,"user");
insert into activity_stream  values(3,now(),1,"admin created user reviewer",4,"user");

UPDATE `users` SET `user_address`='1' WHERE `userid`='1';
UPDATE `users` SET `user_address`='2' WHERE `userid`='2';
UPDATE `users` SET `user_address`='3' WHERE `userid`='3';
UPDATE `users` SET `user_address`='1' WHERE `userid`='4';

INSERT INTO user_config VALUES  (1,'en','indian','mmddyyyy_slash','IST',1);
INSERT INTO user_config VALUES  (2,'en','indian','mmddyyyy_slash','IST',2);
INSERT INTO user_config VALUES  (3,'en','indian','mmddyyyy_slash','IST',3);
INSERT INTO user_config VALUES  (4,'en','indian','mmddyyyy_slash','IST',4);
CREATE TABLE  `file_uploads` (`id` int(10) unsigned NOT NULL AUTO_INCREMENT,`filename` VARCHAR(250),`file` VARCHAR(250),PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;
CREATE TABLE `customer_attach` (`id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,`filename` VARCHAR(250) ,`attach_id` INTEGER UNSIGNED NOT NULL,`customer_id` INTEGER UNSIGNED NOT NULL,PRIMARY KEY (`id`))ENGINE = InnoDB;
alter table customer_attach ADD  FOREIGN KEY (attach_id) REFERENCES file_uploads  (id);
alter table customer_attach ADD  FOREIGN KEY (customer_id) REFERENCES customer  (customerNumber);
alter table customer DROP COLUMN file_attachment;

alter table office DROP COLUMN allow_add_multiple_employee;
CREATE TABLE  `comment` ( `id` bigint(20) NOT NULL AUTO_INCREMENT,`comment` varchar(255) DEFAULT NULL,`creationtime` datetime DEFAULT NULL,`modifiedtime` datetime DEFAULT NULL,`createdby` int(10) unsigned DEFAULT NULL,PRIMARY KEY (`id`),`modifiedby` int(10) unsigned DEFAULT NULL,KEY `FK38A5EE5FEC3A9881` (`createdby`),KEY `FK38A5EE5FEC3A9885` (`modifiedby`),CONSTRAINT `FK38A5EE5FEC3A9881` FOREIGN KEY (`createdby`) REFERENCES `users` (`userid`),CONSTRAINT `new_fk_createdby3` FOREIGN KEY (`modifiedby`) REFERENCES `users` (`userid`));
alter table customer DROP COLUMN `lname_comment` ;
alter table comment   ADD COLUMN `customer_id` INT UNSIGNED  ;
alter table comment  ADD  FOREIGN KEY ( customer_id) REFERENCES customer (customerNumber);
alter table office DROP COLUMN `fname_comment` ;
alter table comment   ADD COLUMN `office_id` INT  ;
alter table comment  ADD  FOREIGN KEY ( office_id) REFERENCES office (officeCode);
alter table customer ADD  FOREIGN KEY (customer_address) REFERENCES address (id)   ON DELETE CASCADE ON UPDATE CASCADE;


INSERT INTO permissions VALUES (300,'Userread','users permission');
INSERT INTO roles VALUES (101, 'applicationManager','application Manager role');
INSERT INTO roles VALUES (102, 'applicationReviewer','application Reviewer role');
INSERT INTO roles VALUES (103, 'applicationProvisioner','application Provisioner role');
INSERT INTO roles VALUES (104,'applicationViewer','application Viewer role');
INSERT INTO rolepermission VALUES (103, 300);
INSERT INTO rolepermission VALUES (101, 300);
INSERT INTO rolepermission VALUES (102, 300);
INSERT INTO rolepermission VALUES (104, 300);
INSERT INTO rolepermission VALUES (2,300);
INSERT INTO userrole VALUES (1, 101);
INSERT INTO userrole VALUES (2, 104);
INSERT INTO userrole VALUES (3, 103);
INSERT INTO userrole VALUES (4, 102);
INSERT INTO permissions VALUES (101,'Customercreate','Customer create permission');
INSERT INTO permissions VALUES (102, 'Customerread','Customer read permission');
INSERT INTO permissions VALUES (103,'Customerupdate','Customer update permission');
INSERT INTO permissions VALUES (104, 'Customerdelete','Customer delete permission');
INSERT INTO rolepermission VALUES (101, 101);
INSERT INTO rolepermission VALUES (101, 102);
INSERT INTO rolepermission VALUES (101, 103);
INSERT INTO rolepermission VALUES (101, 104);
INSERT INTO rolepermission VALUES (102, 102);
INSERT INTO rolepermission VALUES (102, 103);
INSERT INTO rolepermission VALUES (103, 101);
INSERT INTO rolepermission VALUES (103, 102);
INSERT INTO rolepermission VALUES (104, 102);
INSERT INTO rolepermission VALUES (2, 102);

INSERT INTO permissions VALUES (110,'Officecreate','Office create permission');
INSERT INTO permissions VALUES (111, 'Officeread','Office read permission');
INSERT INTO permissions VALUES (112,'Officeupdate','Office update permission');
INSERT INTO permissions VALUES (113, 'Officedelete','Office delete permission');
INSERT INTO rolepermission VALUES (101, 110);
INSERT INTO rolepermission VALUES (101, 111);
INSERT INTO rolepermission VALUES (101, 112);
INSERT INTO rolepermission VALUES (101, 113);
INSERT INTO rolepermission VALUES (102, 111);
INSERT INTO rolepermission VALUES (102, 112);
INSERT INTO rolepermission VALUES (103, 110);
INSERT INTO rolepermission VALUES (103, 111);
INSERT INTO rolepermission VALUES (104, 111);
INSERT INTO rolepermission VALUES (2, 111);

INSERT INTO permissions VALUES (119,'Orderdetailcreate','Orderdetail create permission');
INSERT INTO permissions VALUES (120, 'Orderdetailread','Orderdetail read permission');
INSERT INTO permissions VALUES (121,'Orderdetailupdate','Orderdetail update permission');
INSERT INTO permissions VALUES (122, 'Orderdetaildelete','Orderdetail delete permission');
INSERT INTO rolepermission VALUES (101, 119);
INSERT INTO rolepermission VALUES (101, 120);
INSERT INTO rolepermission VALUES (101, 121);
INSERT INTO rolepermission VALUES (101, 122);
INSERT INTO rolepermission VALUES (102, 120);
INSERT INTO rolepermission VALUES (102, 121);
INSERT INTO rolepermission VALUES (103, 119);
INSERT INTO rolepermission VALUES (103, 120);
INSERT INTO rolepermission VALUES (104, 120);
INSERT INTO rolepermission VALUES (2, 120);

INSERT INTO permissions VALUES (128,'Employeecreate','Employee create permission');
INSERT INTO permissions VALUES (129, 'Employeeread','Employee read permission');
INSERT INTO permissions VALUES (130,'Employeeupdate','Employee update permission');
INSERT INTO permissions VALUES (131, 'Employeedelete','Employee delete permission');
INSERT INTO rolepermission VALUES (101, 128);
INSERT INTO rolepermission VALUES (101, 129);
INSERT INTO rolepermission VALUES (101, 130);
INSERT INTO rolepermission VALUES (101, 131);
INSERT INTO rolepermission VALUES (102, 129);
INSERT INTO rolepermission VALUES (102, 130);
INSERT INTO rolepermission VALUES (103, 128);
INSERT INTO rolepermission VALUES (103, 129);
INSERT INTO rolepermission VALUES (104, 129);
INSERT INTO rolepermission VALUES (2, 129);

INSERT INTO permissions VALUES (137,'Orderscreate','Orders create permission');
INSERT INTO permissions VALUES (138, 'Ordersread','Orders read permission');
INSERT INTO permissions VALUES (139,'Ordersupdate','Orders update permission');
INSERT INTO permissions VALUES (140, 'Ordersdelete','Orders delete permission');
INSERT INTO rolepermission VALUES (101, 137);
INSERT INTO rolepermission VALUES (101, 138);
INSERT INTO rolepermission VALUES (101, 139);
INSERT INTO rolepermission VALUES (101, 140);
INSERT INTO rolepermission VALUES (102, 138);
INSERT INTO rolepermission VALUES (102, 139);
INSERT INTO rolepermission VALUES (103, 137);
INSERT INTO rolepermission VALUES (103, 138);
INSERT INTO rolepermission VALUES (104, 138);
INSERT INTO rolepermission VALUES (2, 138);

INSERT INTO permissions VALUES (146,'Productcreate','Product create permission');
INSERT INTO permissions VALUES (147, 'Productread','Product read permission');
INSERT INTO permissions VALUES (148,'Productupdate','Product update permission');
INSERT INTO permissions VALUES (149, 'Productdelete','Product delete permission');
INSERT INTO rolepermission VALUES (101, 146);
INSERT INTO rolepermission VALUES (101, 147);
INSERT INTO rolepermission VALUES (101, 148);
INSERT INTO rolepermission VALUES (101, 149);
INSERT INTO rolepermission VALUES (102, 147);
INSERT INTO rolepermission VALUES (102, 148);
INSERT INTO rolepermission VALUES (103, 146);
INSERT INTO rolepermission VALUES (103, 147);
INSERT INTO rolepermission VALUES (104, 147);
INSERT INTO rolepermission VALUES (2, 147);

INSERT INTO permissions VALUES (155,'Paymentcreate','Payment create permission');
INSERT INTO permissions VALUES (156, 'Paymentread','Payment read permission');
INSERT INTO permissions VALUES (157,'Paymentupdate','Payment update permission');
INSERT INTO permissions VALUES (158, 'Paymentdelete','Payment delete permission');
INSERT INTO rolepermission VALUES (101, 155);
INSERT INTO rolepermission VALUES (101, 156);
INSERT INTO rolepermission VALUES (101, 157);
INSERT INTO rolepermission VALUES (101, 158);
INSERT INTO rolepermission VALUES (102, 156);
INSERT INTO rolepermission VALUES (102, 157);
INSERT INTO rolepermission VALUES (103, 155);
INSERT INTO rolepermission VALUES (103, 156);
INSERT INTO rolepermission VALUES (104, 156);
INSERT INTO rolepermission VALUES (2, 156);

INSERT INTO permissions VALUES (164, 'canViewcustomerprioritystatus','customerprioritystatus  permission');
INSERT INTO rolepermission VALUES (102, 164);
INSERT INTO rolepermission VALUES (104, 164);
INSERT INTO rolepermission VALUES (2, 164);
INSERT INTO rolepermission VALUES (103, 164);
INSERT INTO rolepermission VALUES (101, 164);
INSERT INTO permissions VALUES (165, 'canViewemployeeofficeid','employeeofficeid  permission');
INSERT INTO rolepermission VALUES (102, 165);
INSERT INTO rolepermission VALUES (104, 165);
INSERT INTO rolepermission VALUES (2, 165);
INSERT INTO rolepermission VALUES (103, 165);
INSERT INTO rolepermission VALUES (101, 165);
INSERT INTO permissions VALUES (166, 'canViewordersorder_status','ordersorder_status  permission');
INSERT INTO rolepermission VALUES (102, 166);
INSERT INTO rolepermission VALUES (104, 166);
INSERT INTO rolepermission VALUES (2, 166);
INSERT INTO rolepermission VALUES (103, 166);
INSERT INTO rolepermission VALUES (101, 166);
INSERT INTO permissions VALUES (167, 'canVieworderstotalCost','orderstotalCost  permission');
INSERT INTO rolepermission VALUES (102, 167);
INSERT INTO rolepermission VALUES (104, 167);
INSERT INTO rolepermission VALUES (2, 167);
INSERT INTO rolepermission VALUES (103, 167);
INSERT INTO rolepermission VALUES (101, 167);
INSERT INTO permissions VALUES (168, 'canViewpaymentamount','paymentamount  permission');
INSERT INTO rolepermission VALUES (102, 168);
INSERT INTO rolepermission VALUES (104, 168);
INSERT INTO rolepermission VALUES (2, 168);
INSERT INTO rolepermission VALUES (103, 168);
INSERT INTO rolepermission VALUES (101, 168);
INSERT INTO permissions VALUES (169, 'canViewproductproductline','productproductline  permission');
INSERT INTO rolepermission VALUES (102, 169);
INSERT INTO rolepermission VALUES (104, 169);
INSERT INTO rolepermission VALUES (2, 169);
INSERT INTO rolepermission VALUES (103, 169);
INSERT INTO rolepermission VALUES (101, 169);
INSERT INTO permissions VALUES (170, 'canViewUserMap','can View UserMap permission');
INSERT INTO rolepermission VALUES (103, 170);
INSERT INTO rolepermission VALUES (101, 170);INSERT INTO permissions VALUES (171, 'canViewRecentActivity','canViewRecentActivity');

INSERT INTO rolepermission VALUES (103, 171);
INSERT INTO rolepermission VALUES (101, 171);
