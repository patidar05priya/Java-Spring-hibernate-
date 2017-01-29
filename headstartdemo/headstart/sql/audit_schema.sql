
CREATE TABLE  `REVINFO` (
  `REV` int(11) NOT NULL AUTO_INCREMENT,
  `REVTSTMP` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`REV`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE domain_AUD (
  domainid int unsigned NOT NULL auto_increment,
  domainname varchar(50) NOT NULL,
  remarks varchar(200) default NULL,
 `REV` int(11) NOT NULL,
 `REVTYPE` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`domainid`,`REV`),
  KEY `FK154C77D9DF74E055` (`REV`),
  CONSTRAINT `FK154C77D9DF74E055` FOREIGN KEY (`REV`) REFERENCES `REVINFO` (`REV`)
);  
  CREATE TABLE  `users_AUD` (
  `userid` bigint(20) NOT NULL,
  `domainid` int unsigned NOT NULL default 1,
  `REV` int(11) NOT NULL,
  `REVTYPE` tinyint(4) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `zip` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`userid`,`REV`),
  KEY `FK154C77D9DF74E053` (`REV`),
  CONSTRAINT `FK154C77D9DF74E059` FOREIGN KEY (`REV`) REFERENCES `REVINFO` (`REV`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--

LOCK TABLES REVINFO WRITE;
INSERT INTO `REVINFO` VALUES (1,1360597550539);
UNLOCK TABLES;

LOCK TABLES domain_AUD WRITE;
INSERT INTO domain_AUD VALUES (1,'DEFAULT','Default Domain',1,0);

UNLOCK TABLES;



LOCK TABLES `users_AUD` WRITE;
INSERT INTO `users_AUD` VALUES  (1,1,1,0,'admin','admin','1',NULL,NULL,NULL,NULL,NULL,NULL,'admin@changeit.com',NULL),
 (2,1,1,0,'guest','guest','1',NULL,NULL,NULL,NULL,NULL,NULL,'guest@changeit.com',NULL),
 (3,1,1,0,'provisioner','provisioner','1',NULL,NULL,NULL,NULL,NULL,NULL,'provisioner@changeit.com',NULL),
 (4,1,1,0,'reviewer','reviewer','1',NULL,NULL,NULL,NULL,NULL,NULL,'reviewer@changeit.com',NULL);
UNLOCK TABLES;

  ALTER TABLE `users_AUD` ADD COLUMN `profile_image` MEDIUMBLOB after zip;
