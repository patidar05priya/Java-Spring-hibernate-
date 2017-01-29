

CREATE TABLE  REVINFO (
  REV number(11) NOT NULL,
  REVTSTMP number(20) DEFAULT NULL,
 CONSTRAINT REVINFO_pk PRIMARY KEY (REV)
);


  CREATE TABLE  users_AUD (
  userid number(20) NOT NULL,
  REV number(11) NOT NULL,
  REVTYPE number(4) DEFAULT NULL,
  username varchar2(50) DEFAULT NULL,  
  password varchar2(50) DEFAULT NULL,
  enabled number(1) DEFAULT NULL,
  firstname varchar2(50) DEFAULT NULL,
  lastname varchar2(50) DEFAULT NULL,
  city varchar2(50) DEFAULT NULL,
  country varchar2(50) DEFAULT NULL,
  state varchar2(50) DEFAULT NULL,
  telephone varchar2(20) DEFAULT NULL,
  email varchar2(50) DEFAULT NULL,
  zip number(20) DEFAULT NULL,
  CONSTRAINT users_AUD_pk PRIMARY KEY (userid,REV),
  CONSTRAINT FK154C77D9DF74E053 FOREIGN KEY (REV) REFERENCES REVINFO (REV)
);



INSERT INTO REVINFO VALUES (0,1360597550539);




INSERT INTO users_AUD VALUES  (1,0,0,'admin','admin','1',NULL,NULL,NULL,NULL,NULL,NULL,'admin@changeit.com',NULL);
 INSERT INTO users_AUD VALUES (2,0,0,'guest','guest','1',NULL,NULL,NULL,NULL,NULL,NULL,'guest@changeit.com',NULL);
 INSERT INTO users_AUD VALUES (3,0,0,'provisioner','provisioner','1',NULL,NULL,NULL,NULL,NULL,NULL,'provisioner@changeit.com',NULL);
 INSERT INTO users_AUD VALUES (4,0,0,'reviewer','reviewer','1',NULL,NULL,NULL,NULL,NULL,NULL,'reviewer@changeit.com',NULL);


ALTER TABLE users_AUD ADD (profile_image BLOB);
