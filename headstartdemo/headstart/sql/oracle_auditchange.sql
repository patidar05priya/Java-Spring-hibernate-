insert into  address_AUD(REV,REVTYPE,id,latitude,longitude,street,city,state,country,pincode,addressLine1,addressLine2,landmark) select 1,0,id,latitude,longitude,street,city,state,country,pincode,addressLine1,addressLine2,landmark from address;
alter table users_AUD modify (profile_image BLOB DEFAULT null);

