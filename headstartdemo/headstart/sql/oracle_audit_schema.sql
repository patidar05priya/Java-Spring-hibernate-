
CREATE TABLE  REVINFO (
  REV number(11) NOT NULL ,
  REVTSTMP number(20) DEFAULT NULL,
  PRIMARY KEY (REV)
);

CREATE TABLE domain_AUD (
  domainid number(10) NOT NULL,
  domainname varchar2(50) NOT NULL,
  remarks varchar2(200) default NULL,
 REV number(11) NOT NULL,
 REVTYPE number(4) DEFAULT NULL,
  PRIMARY KEY (domainid,REV),
  CONSTRAINT FK154C77D9DF74E055 FOREIGN KEY (REV) REFERENCES REVINFO (REV)
);  
  CREATE TABLE  users_AUD (
  userid number(20) NOT NULL,
  domainid number(10) default 1 NOT NULL ,
  REV number(11) NOT NULL,
  REVTYPE number(4) DEFAULT NULL,
  username varchar2(50) DEFAULT NULL,
  password varchar2(50) DEFAULT NULL,
  enabled number(1) DEFAULT NULL,
  city varchar2(50) DEFAULT NULL,
  country varchar2(50) DEFAULT NULL,
  firstname varchar2(50) DEFAULT NULL,
  lastname varchar2(50) DEFAULT NULL,
  state varchar2(50) DEFAULT NULL,
  telephone varchar2(20) DEFAULT NULL,
  email varchar2(50) DEFAULT NULL,
  zip number(20) DEFAULT NULL,
  PRIMARY KEY (userid,REV),
  CONSTRAINT FK154C77D9DF74E059 FOREIGN KEY (REV) REFERENCES REVINFO (REV)
) ;
--

INSERT INTO REVINFO VALUES (0,1360597550539);

INSERT INTO domain_AUD VALUES (1,'DEFAULT','Default Domain',0,0);




INSERT INTO users_AUD VALUES  (1,1,0,0,'admin','admin','1',NULL,NULL,NULL,NULL,NULL,NULL,'admin@changeit.com',NULL);
 INSERT INTO users_AUD VALUES (2,1,0,0,'guest','guest','1',NULL,NULL,NULL,NULL,NULL,NULL,'guest@changeit.com',NULL);
 INSERT INTO users_AUD VALUES (3,1,0,0,'provisioner','provisioner','1',NULL,NULL,NULL,NULL,NULL,NULL,'provisioner@changeit.com',NULL);
 INSERT INTO users_AUD VALUES (4,1,0,0,'reviewer','reviewer','1',NULL,NULL,NULL,NULL,NULL,NULL,'reviewer@changeit.com',NULL);

ALTER TABLE users_AUD ADD (profile_image BLOB);
