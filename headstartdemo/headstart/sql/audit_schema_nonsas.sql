

CREATE TABLE  `REVINFO` (
  `REV` int(11) NOT NULL AUTO_INCREMENT,
  `REVTSTMP` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`REV`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;


  CREATE TABLE  `users_AUD` (
  `userid` bigint(20) NOT NULL,
  `REV` int(11) NOT NULL,
  `REVTYPE` tinyint(4) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,  
  `password` varchar(50) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
 `email` varchar(50) DEFAULT NULL,
  `zip` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`userid`,`REV`),
  KEY `FK154C77D9DF74E053` (`REV`),
  CONSTRAINT `FK154C77D9DF74E053` FOREIGN KEY (`REV`) REFERENCES `REVINFO` (`REV`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


LOCK TABLES REVINFO WRITE;
INSERT INTO `REVINFO` VALUES (1,1360597550539);
UNLOCK TABLES;




LOCK TABLES `users_AUD` WRITE;
INSERT INTO `users_AUD` VALUES  (1,1,0,'admin','admin','1',NULL,NULL,NULL,NULL,NULL,NULL,'admin@changeit.com',NULL),
 (2,1,0,'guest','guest','1',NULL,NULL,NULL,NULL,NULL,NULL,'guest@changeit.com',NULL),
 (3,1,0,'provisioner','provisioner','1',NULL,NULL,NULL,NULL,NULL,NULL,'provisioner@changeit.com',NULL),
 (4,1,0,'reviewer','reviewer','1',NULL,NULL,NULL,NULL,NULL,NULL,'reviewer@changeit.com',NULL);
UNLOCK TABLES;

ALTER TABLE `users_AUD` ADD COLUMN `profile_image` MEDIUMBLOB after zip;
