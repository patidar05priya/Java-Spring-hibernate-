
--
-- Table structure for table domain
--

CREATE TABLE domain (
  domainid number(10) NOT NULL,
  domainname varchar2(50) NOT NULL ,
  remarks varchar2(200) default NULL,
  PRIMARY KEY  (domainid),
  CONSTRAINT domain_unique_1 UNIQUE (domainname)
);

INSERT INTO domain VALUES (1,'default','Default Domain');



CREATE TABLE  address (
  id number(10) NOT NULL,
  latitude varchar2(45) DEFAULT NULL,
  longitude varchar2(45) DEFAULT NULL,
  street varchar2(10) DEFAULT NULL,
  city varchar2(45) DEFAULT NULL,
  state varchar2(45) DEFAULT NULL,
  country varchar2(45) DEFAULT NULL,
  pincode varchar2(11) DEFAULT NULL,
  addressLine1 varchar2(100) NOT NULL,
  addressLine2 varchar2(100) DEFAULT NULL,
  landmark varchar2(250) DEFAULT NULL,
  PRIMARY KEY (id)
) ;

--
-- Dumping data for table sampleunique2.address
--


INSERT INTO address VALUES  (103,NULL,NULL,NULL,'Nantes',NULL,'France',44000,'54, rue Royale',NULL,NULL);
INSERT INTO address VALUES  (112,NULL,NULL,NULL,'Las Vegas','NV','USA',83030,'8489 Strong St.',NULL,NULL);
INSERT INTO address VALUES  (114,NULL,NULL,NULL,'Melbourne','Victoria','Australia',3004,'636 St Kilda Road','Level 3',NULL);
INSERT INTO address VALUES(119,NULL,NULL,NULL,'Nantes',NULL,'France',44000,'67, rue des Cinquante Otages',NULL,NULL);
INSERT INTO address VALUES(121,NULL,NULL,NULL,'Stavern',NULL,'Norway',4110,'Erling Skakkes gate 78',NULL,NULL);
INSERT INTO address VALUES(124,NULL,NULL,NULL,'San Rafael','CA','USA',97562,'5677 Strong St.',NULL,NULL);
INSERT INTO address VALUES(125,NULL,NULL,NULL,'Warszawa',NULL,'Poland',1,'ul. Filtrowa 68',NULL,NULL);
INSERT INTO address VALUES(128,NULL,NULL,NULL,'Frankfurt',NULL,'Germany',60528,'Lyonerstr. 34',NULL,NULL);
INSERT INTO address VALUES(129,NULL,NULL,NULL,'San Francisco','CA','USA',94217,'5557 North Pendale Street',NULL,NULL);
INSERT INTO address VALUES(131,NULL,NULL,NULL,'NYC','NY','USA',10022,'897 Long Airport Avenue',NULL,NULL);
INSERT INTO address VALUES(141,NULL,NULL,NULL,'Madrid',NULL,'Spain',28034,'C/ Moralzarzal, 86',NULL,NULL);
INSERT INTO address VALUES(144,NULL,NULL,NULL,'LuleÃ¥',NULL,'Sweden',0,'BerguvsvÃ¤gen  8',NULL,NULL);
INSERT INTO address VALUES(145,NULL,NULL,NULL,'Kobenhavn',NULL,'Denmark',1734,'VinbÃ¦ltet 34',NULL,NULL);
INSERT INTO address VALUES(146,NULL,NULL,NULL,'Lyon',NULL,'France',69004,'2, rue du Commerce',NULL,NULL);
INSERT INTO address VALUES(148,NULL,NULL,NULL,'Singapore',NULL,'Singapore',79903,'Bronz Sok.','Bronz Apt. 3/6 Tesvikiye',NULL);
INSERT INTO address VALUES(151,NULL,NULL,NULL,'NYC','NY','USA',10022,'4092 Furth Circle','Suite 400',NULL);
INSERT INTO address VALUES(157,NULL,NULL,NULL,'Allentown','PA','USA',70267,'7586 Pompton St.',NULL,NULL);
INSERT INTO address VALUES(161,NULL,NULL,NULL,'Burlingame','CA','USA',94217,'9408 Furth Circle',NULL,NULL);
INSERT INTO address VALUES(166,NULL,NULL,NULL,'Singapore',NULL,'Singapore',69045,'106 Linden Road Sandown','2nd Floor',NULL);
INSERT INTO address VALUES(167,NULL,NULL,NULL,'Bergen',NULL,'Norway  ',0,'Brehmen St. 121','PR 334 Sentrum',NULL);
INSERT INTO address VALUES(168,NULL,NULL,NULL,'New Haven','CT','USA',97823,'149 Spinnaker Dr.','Suite 101',NULL);
INSERT INTO address VALUES(169,NULL,NULL,NULL,'Lisboa',NULL,'Portugal',1756,'Estrada da saÃºde n. 58',NULL,NULL);
INSERT INTO address VALUES(171,NULL,NULL,NULL,'Lille',NULL,'France',59000,'184, chaussÃ©e de Tournai',NULL,NULL);
INSERT INTO address VALUES(172,NULL,NULL,NULL,'Paris',NULL,'France',75012,'265, boulevard Charonne',NULL,NULL);
INSERT INTO address VALUES(173,NULL,NULL,NULL,'Cambridge','MA','USA',51247,'4658 Baden Av.',NULL,NULL);
INSERT INTO address VALUES(175,NULL,NULL,NULL,'Bridgewater','CT','USA',97562,'25593 South Bay Ln.',NULL,NULL);
INSERT INTO address VALUES(177,NULL,NULL,NULL,'Kita-ku','Osaka','Japan',530,'1-6-20 Dojima',NULL,NULL);
INSERT INTO address VALUES(181,NULL,NULL,NULL,'NYC','NY','USA',10022,'2678 Kingston Rd.','Suite 101',NULL);
INSERT INTO address VALUES(186,NULL,NULL,NULL,'Helsinki',NULL,'Finland',21240,'Keskuskatu 45',NULL,NULL);
INSERT INTO address VALUES(187,NULL,NULL,NULL,'Manchester',NULL,'UK',0,'Fauntleroy Circus',NULL,NULL);
INSERT INTO address VALUES(189,NULL,NULL,NULL,'Dublin',NULL,'Ireland',2,'25 Maiden Lane','Floor No. 4',NULL);
INSERT INTO address VALUES(198,NULL,NULL,NULL,'Brickhaven','MA','USA',58339,'16780 Pompton St.',NULL,NULL);
INSERT INTO address VALUES(201,NULL,NULL,NULL,'Liverpool',NULL,'UK',0,'12, Berkeley Gardens Blvd',NULL,NULL);
INSERT INTO address VALUES(202,NULL,NULL,NULL,'Vancouver','BC','Canada',0,'1900 Oak St.',NULL,NULL);
INSERT INTO address VALUES(204,NULL,NULL,NULL,'Brickhaven','MA','USA',58339,'7635 Spinnaker Dr.',NULL,NULL);
INSERT INTO address VALUES(205,NULL,NULL,NULL,'Pasadena','CA','USA',90003,'78934 Hillside Dr.',NULL,NULL);
INSERT INTO address VALUES(206,NULL,NULL,NULL,'Singapore',NULL,'Singapore',38988,'Suntec Tower Three','8 Temasek',NULL);
INSERT INTO address VALUES(209,NULL,NULL,NULL,'Strasbourg',NULL,'France',67000,'24, place KlÃ©ber',NULL,NULL);
INSERT INTO address VALUES(211,NULL,NULL,NULL,'Central Hong Kong',NULL,'Hong Kong',NULL,'Bank of China Tower','1 Garden Road',NULL);
INSERT INTO address VALUES(216,NULL,NULL,NULL,'Barcelona',NULL,'Spain',8022,'Rambla de CataluÃ±a, 23',NULL,NULL);
INSERT INTO address VALUES(219,NULL,NULL,NULL,'Glendale','CA','USA',92561,'4097 Douglas Av.',NULL,NULL);
INSERT INTO address VALUES(223,NULL,NULL,NULL,'Cunewalde',NULL,'Germany',1307,'TaucherstraÃŸe 10',NULL,NULL);
INSERT INTO address VALUES(227,NULL,NULL,NULL,'Ã…rhus',NULL,'Denmark',8200,'Smagsloget 45',NULL,NULL);
INSERT INTO address VALUES(233,NULL,NULL,NULL,'MontrÃ©al','QuÃ©bec','Canada',0,'43 rue St. Laurent',NULL,NULL);
INSERT INTO address VALUES(237,NULL,NULL,NULL,'Madrid',NULL,'Spain',28001,'Gran VÃ­a, 1',NULL,NULL);
INSERT INTO address VALUES(239,NULL,NULL,NULL,'San Diego','CA','USA',91217,'361 Furth Circle',NULL,NULL);
INSERT INTO address VALUES(240,NULL,NULL,NULL,'Cowes','Isle of Wight','UK',0,'Garden House','Crowther Way 23',NULL);
INSERT INTO address VALUES(242,NULL,NULL,NULL,'Toulouse',NULL,'France',31000,'1 rue Alsace-Lorraine',NULL,NULL);
INSERT INTO address VALUES(247,NULL,NULL,NULL,'Frankfurt',NULL,'Germany',60528,'Magazinweg 7',NULL,NULL);
INSERT INTO address VALUES(249,NULL,NULL,NULL,'Torino',NULL,'Italy',10100,'Via Monte Bianco 34',NULL,NULL);
INSERT INTO address VALUES(250,NULL,NULL,NULL,'Paris',NULL,'France',75508,'27 rue du Colonel Pierre Avia',NULL,NULL);
INSERT INTO address VALUES(256,NULL,NULL,NULL,'Versailles',NULL,'France',78000,'67, avenue de l\Europe',NULL,NULL);
INSERT INTO address VALUES(259,NULL,NULL,NULL,'KÃ¶ln',NULL,'Germany',50739,'Mehrheimerstr. 369',NULL,NULL);
INSERT INTO address VALUES(260,NULL,NULL,NULL,'Tsawassen','BC','Canada',0,'23 Tsawassen Blvd.',NULL,NULL);
INSERT INTO address VALUES(273,NULL,NULL,NULL,'MÃ¼nchen',NULL,'Germany',80805,'Berliner Platz 43',NULL,NULL);
INSERT INTO address VALUES(276,NULL,NULL,NULL,'North Sydney','NSW','Australia',2060,'201 Miller Street','Level 15',NULL);
INSERT INTO address VALUES(278,NULL,NULL,NULL,'Bergamo',NULL,'Italy',24100,'Via Ludovico il Moro 22',NULL,NULL);
INSERT INTO address VALUES(282,NULL,NULL,NULL,'Chatswood','NSW','Australia',2067,'Monitor Money Building','815 Pacific Hwy',NULL);
INSERT INTO address VALUES(286,NULL,NULL,NULL,'Cambridge','MA','USA',51247,'39323 Spinnaker Dr.',NULL,NULL);
INSERT INTO address VALUES(293,NULL,NULL,NULL,'Fribourg',NULL,'Switzerland',1700,'Rte des Arsenaux 41 ',NULL,NULL);
INSERT INTO address VALUES(298,NULL,NULL,NULL,'GenÃ¨ve',NULL,'Switzerland',1203,'Grenzacherweg 237',NULL,NULL);
INSERT INTO address VALUES(299,NULL,NULL,NULL,'Oslo',NULL,'Norway  ',0,'Drammensveien 126A','PB 211 Sentrum',NULL);
INSERT INTO address VALUES(303,NULL,NULL,NULL,'Amsterdam',NULL,'Netherlands',1043,'Kingsfordweg 151',NULL,NULL);
INSERT INTO address VALUES(307,NULL,NULL,NULL,'Berlin',NULL,'Germany',12209,'Obere Str. 57',NULL,NULL);
INSERT INTO address VALUES(311,NULL,NULL,NULL,'Oulu',NULL,'Finland',90110,'Torikatu 38',NULL,NULL);
INSERT INTO address VALUES(314,NULL,NULL,NULL,'Bruxelles',NULL,'Belgium',0,'Rue Joseph-Bens 532',NULL,NULL);
INSERT INTO address VALUES(319,NULL,NULL,NULL,'White Plains','NY','USA',24067,'3758 North Pendale Street',NULL,NULL);
INSERT INTO address VALUES(320,NULL,NULL,NULL,'New Bedford','MA','USA',50553,'4575 Hillside Dr.',NULL,NULL);
INSERT INTO address VALUES(321,NULL,NULL,NULL,'San Francisco','CA','USA',94217,'7734 Strong St.',NULL,NULL);
INSERT INTO address VALUES(323,NULL,NULL,NULL,'Auckland  ',NULL,'New Zealand',NULL,'162-164 Grafton Road','Level 2',NULL);
INSERT INTO address VALUES(324,NULL,NULL,NULL,'London',NULL,'UK',0,'35 King George',NULL,NULL);
INSERT INTO address VALUES(328,NULL,NULL,NULL,'Newark','NJ','USA',94019,'7476 Moss Rd.',NULL,NULL);
INSERT INTO address VALUES(333,NULL,NULL,NULL,'South Brisbane','Queensland','Australia',4101,'31 Duncan St. West End',NULL,NULL);
INSERT INTO address VALUES(334,NULL,NULL,NULL,'Espoo',NULL,'Finland',0,'Software Engineering Center','SEC Oy',NULL);
INSERT INTO address VALUES(335,NULL,NULL,NULL,'Brandenburg',NULL,'Germany',14776,'Maubelstr. 90',NULL,NULL);
INSERT INTO address VALUES(339,NULL,NULL,NULL,'Philadelphia','PA','USA',71270,'782 First Street',NULL,NULL);
INSERT INTO address VALUES(344,NULL,NULL,NULL,'Madrid',NULL,'Spain',28023,'Merchants House','27-30 Merchants Quay',NULL);
INSERT INTO address VALUES(347,NULL,NULL,NULL,'Los Angeles','CA','USA',91003,'6047 Douglas Av.',NULL,NULL);
INSERT INTO address VALUES(348,NULL,NULL,NULL,'Cork','Co. Cork','Ireland',NULL,'8 Johnstown Road',NULL,NULL);
INSERT INTO address VALUES(350,NULL,NULL,NULL,'Marseille',NULL,'France',13008,'12, rue des Bouchers',NULL,NULL);
INSERT INTO address VALUES(353,NULL,NULL,NULL,'Reims',NULL,'France',51100,'59 rue de lAbbaye',NULL,NULL);
INSERT INTO address VALUES(356,NULL,NULL,NULL,'Hatfield','Pretoria','South Africa',28,'1250 Pretorius Street',NULL,NULL);
INSERT INTO address VALUES(357,NULL,NULL,NULL,'Auckland',NULL,'New Zealand',NULL,'199 Great North Road',NULL,NULL);
INSERT INTO address VALUES(361,NULL,NULL,NULL,'MÃ¼nster',NULL,'Germany',44087,'Luisenstr. 48',NULL,NULL);
INSERT INTO address VALUES(362,NULL,NULL,NULL,'Boston','MA','USA',51003,'8616 Spinnaker Dr.',NULL,NULL);
INSERT INTO address VALUES(363,NULL,NULL,NULL,'Nashua','NH','USA',62005,'2304 Long Airport Avenue',NULL,NULL);
INSERT INTO address VALUES(369,NULL,NULL,NULL,'Lisboa',NULL,'Portugal',1675,'Jardim das rosas n. 32',NULL,NULL);
INSERT INTO address VALUES(376,NULL,NULL,NULL,'Bern',NULL,'Switzerland',3012,'Hauptstr. 29',NULL,NULL);
INSERT INTO address VALUES(379,NULL,NULL,NULL,'Brickhaven','MA','USA',58339,'7825 Douglas Av.',NULL,NULL);
INSERT INTO address VALUES(381,NULL,NULL,NULL,'Charleroi',NULL,'Belgium',0,'Boulevard Tirou, 255',NULL,NULL);
INSERT INTO address VALUES(382,NULL,NULL,NULL,'Salzburg',NULL,'Austria',5020,'Geislweg 14',NULL,NULL);
INSERT INTO address VALUES(385,NULL,NULL,NULL,'Makati City',NULL,'Philippines',1227,'15 McCallum Street','NatWest Center #13-03',NULL);
INSERT INTO address VALUES(386,NULL,NULL,NULL,'Reggio Emilia',NULL,'Italy',42100,'Strada Provinciale 124',NULL,NULL);
INSERT INTO address VALUES(398,NULL,NULL,NULL,'Minato-ku','Tokyo','Japan',106,'2-2-8 Roppongi',NULL,NULL);
INSERT INTO address VALUES(406,NULL,NULL,NULL,'Paris',NULL,'France',75016,'25, rue Lauriston',NULL,NULL);
INSERT INTO address VALUES(409,NULL,NULL,NULL,'Stuttgart',NULL,'Germany',70563,'Adenauerallee 900',NULL,NULL);
INSERT INTO address VALUES(412,NULL,NULL,NULL,'Wellington',NULL,'New Zealand',NULL,'101 Lambton Quay','Level 11',NULL);
INSERT INTO address VALUES(415,NULL,NULL,NULL,'Munich',NULL,'Germany',80686,'Hansastr. 15',NULL,NULL);
INSERT INTO address VALUES(424,NULL,NULL,NULL,'NYC','NY','USA',10022,'5905 Pompton St.','Suite 750',NULL);
INSERT INTO address VALUES(443,NULL,NULL,NULL,'Leipzig',NULL,'Germany',4179,'Heerstr. 22',NULL,NULL);
INSERT INTO address VALUES(447,NULL,NULL,NULL,'Glendale','CT','USA',97561,'2440 Pompton St.',NULL,NULL);
INSERT INTO address VALUES(448,NULL,NULL,NULL,'BrÃ¤cke',NULL,'Sweden',0,'Ã…kergatan 24',NULL,NULL);
INSERT INTO address VALUES(450,NULL,NULL,NULL,'San Jose','CA','USA',94217,'3086 Ingle Ln.',NULL,NULL);
INSERT INTO address VALUES(452,NULL,NULL,NULL,'Graz',NULL,'Austria',8010,'Kirchgasse 6',NULL,NULL);
INSERT INTO address VALUES(455,NULL,NULL,NULL,'New Haven','CT','USA',97823,'567 North Pendale Street',NULL,NULL);
INSERT INTO address VALUES(456,NULL,NULL,NULL,'NYC','NY','USA',10022,'5290 North Pendale Street','Suite 200',NULL);
INSERT INTO address VALUES(458,NULL,NULL,NULL,'Madrid',NULL,'Spain',28023,'C/ Araquil, 67',NULL,NULL);
INSERT INTO address VALUES(459,NULL,NULL,NULL,'Aachen',NULL,'Germany',52066,'Walserweg 21',NULL,NULL);
INSERT INTO address VALUES(462,NULL,NULL,NULL,'New Bedford','MA','USA',50553,'1785 First Street',NULL,NULL);
INSERT INTO address VALUES(465,NULL,NULL,NULL,'Madrid',NULL,'Spain',28023,'c/ Gobelas, 19-1 Urb. La Florida',NULL,NULL);
INSERT INTO address VALUES(471,NULL,NULL,NULL,'Glen Waverly','Victoria','Australia',3150,'7 Allen Street',NULL,NULL);
INSERT INTO address VALUES(473,NULL,NULL,NULL,'Milan',NULL,'Italy',NULL,'20093 Cologno Monzese','Alessandro Volta 16',NULL);
INSERT INTO address VALUES(475,NULL,NULL,NULL,'Burbank','CA','USA',94019,'3675 Furth Circle',NULL,NULL);
INSERT INTO address VALUES(477,NULL,NULL,NULL,'Mannheim',NULL,'Germany',68306,'Forsterstr. 57',NULL,NULL);
INSERT INTO address VALUES(480,NULL,NULL,NULL,'Saint Petersburg',NULL,'Russia',196143,'2 Pobedy Square',NULL,NULL);
INSERT INTO address VALUES(481,NULL,NULL,NULL,'Herzlia',NULL,'Israel',47625,'3 Hagalim Blv.',NULL,NULL);
INSERT INTO address VALUES(484,NULL,NULL,NULL,'Sevilla',NULL,'Spain',41101,'C/ Romero, 33',NULL,NULL);
INSERT INTO address VALUES(486,NULL,NULL,NULL,'Philadelphia','PA','USA',71270,'11328 Douglas Av.',NULL,NULL);
INSERT INTO address VALUES(487,NULL,NULL,NULL,'Brisbane','CA','USA',94217,'2793 Furth Circle',NULL,NULL);
INSERT INTO address VALUES(489,NULL,NULL,NULL,'London',NULL,'UK',0,'120 Hanover Sq.',NULL,NULL);
INSERT INTO address VALUES(495,NULL,NULL,NULL,'Boston','MA','USA',51003,'6251 Ingle Ln.',NULL,NULL);
INSERT INTO address VALUES(496,NULL,NULL,NULL,'Auckland  ',NULL,'New Zealand',NULL,'Arenales 1938 3A',NULL,NULL);


INSERT INTO address VALUES  (1,0,0,'Carine ','Nantes','','France',44000,'54, rue Royale','','');
INSERT INTO address VALUES  (2,0,0,'Carine ','indore','m.p','india',452002,'11, street line','','');
INSERT INTO address VALUES  (3,0,0,'Signal Gif','Las Vegas','NV','USA',71800,'8489 Strong St.','','');
 update address set country = UPPER(country);

--
--
-- Table structure for table users
--

CREATE TABLE  users (
  userid number(10) NOT NULL ,
  domainid number(10)  DEFAULT '1' NOT NULL ,
  username varchar2(50) NOT NULL ,
  password varchar2(50) NOT NULL,
  enabled number(1) DEFAULT NULL,
  firstname varchar2(50) DEFAULT NULL,
  lastname varchar2(50) DEFAULT NULL,
  telephone varchar2(20) DEFAULT NULL,	
  email varchar2(50) NOT NULL ,
  activationkey varchar2(50) DEFAULT NULL,
  profile_image BLOB,
  registeredby number(1) DEFAULT NULL,
  user_address number(10) DEFAULT NULL,
  PRIMARY KEY (userid),
  CONSTRAINT users_address_fk_id FOREIGN KEY (user_address) REFERENCES address (id),
  CONSTRAINT users_ibfk_1 FOREIGN KEY (domainid) REFERENCES domain (domainid) ON DELETE CASCADE,
  CONSTRAINT users_unique_1 UNIQUE (domainid,username,email)
); 


--
--
-- Table structure for table INSERT INTO user_config VALUES  (0,'English',1)

--

CREATE TABLE  user_config (
  id number(10) NOT NULL,
  user_language varchar2(10) DEFAULT NULL,
  currency_format varchar2(30) DEFAULT NULL,
  date_format varchar2(30) DEFAULT NULL,
  time_zone varchar2(30) DEFAULT NULL,
  user_id number(10) DEFAULT NULL,
  CONSTRAINT user_config_enum_user_language CHECK (user_language IN ('en','sp','fr')),
  CONSTRAINT user_config_e_currency_format CHECK (currency_format IN ('indian','europian')),
  CONSTRAINT user_config_enum_date_format CHECK (date_format IN ('mmddyy_slash','mmddyyyy_slash','yymmdd_slash','yyyymmdd_dash','ddMMyy_dash','ddMMyyyy_dash')),
  CONSTRAINT user_config_enum_time_zone CHECK (time_zone IN ('IST','EST')),
  CONSTRAINT user_config_pk PRIMARY KEY (id),
  CONSTRAINT user_coig_fk_uuuser FOREIGN KEY (user_id) REFERENCES users (userid)
);
-- Table structure for table roles
--

CREATE TABLE roles (
  roleid number(10) NOT NULL,
  domainid number(10) default 1 NOT NULL,
  rolename varchar2(50) NOT NULL,
  description varchar2(200) NOT NULL,
  PRIMARY KEY  (roleid),
  CONSTRAINT roles_unique_1 UNIQUE (domainid, rolename),
  CONSTRAINT roles_ibfk_1 FOREIGN KEY (domainid) REFERENCES domain (domainid) ON DELETE CASCADE
  
);

--
-- Table structure for table permissions
--

CREATE TABLE permissions (
  permissionid number(10) NOT NULL,
  permissionname varchar2(50) NOT NULL,
  description varchar2(200) NOT NULL,
  PRIMARY KEY  (permissionid)
);


--
-- Table structure for table userroles
--

CREATE TABLE userrole (
  userid number(10) NOT NULL,
  roleid number(10) NOT NULL,
  PRIMARY KEY  (userid, roleid),
  CONSTRAINT userrole_ibfk_1 FOREIGN KEY (userid) REFERENCES users (userid) ON DELETE CASCADE ,
  CONSTRAINT userrole_ibfk_2 FOREIGN KEY (roleid) REFERENCES roles (roleid) ON DELETE CASCADE 
);

--
-- Table structure for table userroles
--

CREATE TABLE rolepermission (
  roleid number(10) NOT NULL,
  permissionid number(10) NOT NULL,
  PRIMARY KEY  (roleid,permissionid),
  CONSTRAINT rolepermission_ibfk_1 FOREIGN KEY (roleid) REFERENCES roles (roleid) ON DELETE CASCADE ,
  CONSTRAINT rolepermission_ibfk_2 FOREIGN KEY (permissionid) REFERENCES permissions (permissionid)
);

--
-- Table structure for table password_expiry_details
--

CREATE TABLE password_expiry_details (
  username varchar2(30) default '' NOT NULL ,
  domainname varchar2(30) default 'DEFAULT' NOT NULL ,
  failed_attempts number(4)  default '0' NOT NULL,
  locked number(4) default '0' NOT NULL ,
  last_updated_dt timestamp DEFAULT SYSTIMESTAMP NOT NULL,
  history varchar2(320) default NULL,
  first_time_login number(4) default '0' NOT NULL ,
  CONSTRAINT password_expiry_details_pk PRIMARY KEY  (username, domainname)
);


--
-- Table structure for table password_feature_config
--

CREATE TABLE password_feature_config (
  username varchar2(30) default '' NOT NULL ,
  domainname varchar2(30) default 'DEFAULT' NOT NULL ,
  expiration_interval number(11) default '-1' NOT NULL ,
  first_time_change number(4) default '1' NOT NULL ,
  PRIMARY KEY  (username, domainname)
);


--
-- Definition of table activity_stream
--
CREATE TABLE activity_stream (
id number(20) NOT NULL ,
activitydate timestamp DEFAULT NULL,
entityId varchar2(255) DEFAULT NULL,
message varchar2(255) NOT NULL,
userid number(11) DEFAULT NULL,
activitytype varchar2(255) DEFAULT NULL,
 domainid number(10)  NOT NULL,
PRIMARY KEY (id)
);





--
-- Table structure for table audit
--

CREATE TABLE  audits (
  AUDIT_ID number(20) NOT NULL,
   domainid number(10) default 1,
  AUDIT_ACTION 	CLOB,
  AUDIT_ACTION_NAME varchar2(100) DEFAULT NULL,
  AUDIT_ACTION_TYPE varchar2(100) DEFAULT NULL,
  AUDIT_DATE timestamp DEFAULT NULL,
  AUDIT_HOST CLOB,
  PAGE CLOB,
  AUDIT_PARAMETERS CLOB,
  remote_host CLOB,
  sessionid CLOB,
  SUCCESS varchar2(1) DEFAULT NULL,
  userAgent CLOB,
  USER_FULLNAME CLOB,
  USER_ID number(10) DEFAULT NULL,
  exceptionDetails CLOB,
  PRIMARY KEY (AUDIT_ID),
  CONSTRAINT FK58D9BDB55246F77 FOREIGN KEY (USER_ID) REFERENCES users (userid),
  CONSTRAINT users_ibfk_11 FOREIGN KEY (domainid) REFERENCES domain (domainid)
) ;

--
-- Table structure for table social_credential
--
CREATE TABLE  social_credentials (
  id number(10)  NOT NULL,
  domainid number(10) default 1 NOT NULL ,
  userid number(10) NOT NULL,
  facebook_token varchar2(300) DEFAULT NULL,
  twitter_token varchar2(250) DEFAULT NULL,
  gmail_token varchar2(250) DEFAULT NULL,
  facebook_userid varchar2(250) DEFAULT NULL,
  google_userid varchar2(30) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_user_id FOREIGN KEY (userid) REFERENCES users (userid),
  CONSTRAINT users_ibfk_15 FOREIGN KEY (domainid) REFERENCES domain (domainid) 
) ;
INSERT INTO users VALUES  (1,1,'admin','d033e22ae348aeb5660fc2140aec35850c4da997',1,'App','Admin','9827427013','admin@changeit.com',NULL,NULL,1,NULL);
 INSERT INTO users VALUES (2,1,'guest','d033e22ae348aeb5660fc2140aec35850c4da997',1,'App','Guest','9827427016','guest@changeit.com',NULL,NULL,1,NULL);
 INSERT INTO users VALUES (3,1,'provisioner','d033e22ae348aeb5660fc2140aec35850c4da997',1,'App','Provisioner','9827427045','provisioner@changeit.com',NULL,NULL,1,NULL);
 INSERT INTO users VALUES (4,1,'reviewer','d033e22ae348aeb5660fc2140aec35850c4da997',1,'App','Reviewer','9827423413','reviewer@changeit.com',NULL,NULL,1,NULL);

--
-- Dumping data for table password_expiry_details
--

INSERT INTO password_expiry_details VALUES ('guest','default',0,0, TIMESTAMP '2014-06-11 18:30:00','test',1);
INSERT INTO password_expiry_details VALUES ('provisioner','default',0,0, TIMESTAMP '2014-06-11 18:30:00','test',1);
INSERT INTO password_expiry_details VALUES ('reviewer','default',0,0, TIMESTAMP '2014-06-11 18:30:00','test',1);

--
-- Dumping data for table password_feature_config
--


--
-- Dumping data for table roles
--
INSERT INTO roles VALUES (1,1,'admin','admin role');
INSERT INTO roles VALUES (2,1,'guest','guest role');
INSERT INTO roles VALUES (3,1,'provisioner','provisioner role');
INSERT INTO roles VALUES (4,1,'reviewer','reviewer role');




--
-- Dumping data for table userroles
--
INSERT INTO userrole VALUES (1,1);
INSERT INTO userrole VALUES (2,2);
INSERT INTO userrole VALUES (3,3);
INSERT INTO userrole VALUES (4,4);



--
-- Dumping data for table permissions
--
INSERT INTO permissions VALUES (1,'worklist','worklist permission');
INSERT INTO permissions VALUES (2,'usermgmt','user management permission');
INSERT INTO permissions VALUES (3,'reporting','reporting permission');
INSERT INTO permissions VALUES (4,'monitoring','monitoring user');






--
-- Dumping data for table rolepermissions
--

INSERT INTO rolepermission VALUES (1,1);
INSERT INTO rolepermission VALUES (1,2);
INSERT INTO rolepermission VALUES (1,3);
INSERT INTO rolepermission VALUES (3,2);
INSERT INTO rolepermission VALUES (4,2);
INSERT INTO rolepermission VALUES (1,(SELECT permissionid from permissions where permissionname='monitoring'));

--
-- Dumping data for email notifications
--

CREATE TABLE  email_notifications (
  id number(20) NOT NULL ,
  email varchar2(100) NOT NULL,
  createdDate timestamp DEFAULT NULL,
  createdTime timestamp DEFAULT NULL,
  sentBy varchar2(255) DEFAULT NULL,
  subject varchar2(255) DEFAULT NULL,
  send_to number(10) DEFAULT NULL,
  domainid number(10)  DEFAULT '1' NOT NULL ,
  PRIMARY KEY (id),
  CONSTRAINT FKF13C31855690D7E4 FOREIGN KEY (send_to) REFERENCES users (userid),
  CONSTRAINT email_ibfk_1 FOREIGN KEY (domainid) REFERENCES domain (domainid) ON DELETE CASCADE
) ;

insert into email_notifications values (1,'admin@changeit.com',SYSTIMESTAMP,SYSTIMESTAMP,'application','admin Registration',1,1);
insert into email_notifications values (2,'admin@changeit.com',SYSTIMESTAMP,SYSTIMESTAMP,'application','guest Registration',2,1);
insert into email_notifications values (3,'admin@changeit.com',SYSTIMESTAMP,SYSTIMESTAMP,'application','provisioner Registration',3,1);
insert into email_notifications values (4,'admin@changeit.com',SYSTIMESTAMP,SYSTIMESTAMP,'application','reviewer Registration',4,1);


insert into activity_stream  values(1,SYSTIMESTAMP,1,'admin created user guest',2,'user',1);
insert into activity_stream  values(2,SYSTIMESTAMP,1,'admin created user provisioner',3,'user',1);
insert into activity_stream  values(3,SYSTIMESTAMP,1,'admin created user reviewer',4,'user',1);

UPDATE users SET user_address='1' WHERE userid='1';
UPDATE users SET user_address='2' WHERE userid='2';
UPDATE users SET user_address='3' WHERE userid='3';
UPDATE users SET user_address='1' WHERE userid='4';

INSERT INTO user_config VALUES  (1,'en','indian','mmddyyyy_slash','IST',1);
INSERT INTO user_config VALUES  (2,'en','indian','mmddyyyy_slash','IST',2);
INSERT INTO user_config VALUES  (3,'en','indian','mmddyyyy_slash','IST',3);
INSERT INTO user_config VALUES  (4,'en','indian','mmddyyyy_slash','IST',4);

CREATE SEQUENCE USERS_ID_SEQ START WITH 5 INCREMENT BY 1 MAXVALUE 999999999999999999999999999 MINVALUE 1 CACHE 20;
CREATE SEQUENCE USERCONFIG_ID_SEQ START WITH 5 INCREMENT BY 1 MAXVALUE 999999999999999999999999999 MINVALUE 1 CACHE 20;
CREATE SEQUENCE ROLES_ID_SEQ START WITH 105 INCREMENT BY 1 MAXVALUE 999999999999999999999999999 MINVALUE 1 CACHE 20;
CREATE SEQUENCE DOMAIN_ID_SEQ START WITH 2 INCREMENT BY 1 MAXVALUE 999999999999999999999999999 MINVALUE 1 CACHE 20;
CREATE SEQUENCE ACTIVITY_STR_ID_SEQ START WITH 4 INCREMENT BY 1 MAXVALUE 999999999999999999999999999 MINVALUE 1 CACHE 20;
CREATE SEQUENCE ADDRESS_ID_SEQ START WITH 501 INCREMENT BY 1 MAXVALUE 999999999999999999999999999 MINVALUE 1 CACHE 20;
CREATE SEQUENCE EMAIL_NOTI_ID_SEQ START WITH 5 INCREMENT BY 1 MAXVALUE 999999999999999999999999999 MINVALUE 1 CACHE 20;
CREATE SEQUENCE PERMISSIONS_ID_SEQ START WITH 301 INCREMENT BY 1 MAXVALUE 999999999999999999999999999 MINVALUE 1 CACHE 20;

