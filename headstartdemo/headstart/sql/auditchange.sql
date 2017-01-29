insert into  address_AUD(REV,REVTYPE,id,latitude,longitude,street,city,state,country,pincode,addressLine1,addressLine2,landmark) select 1,0,id,latitude,longitude,street,city,state,country,pincode,addressLine1,addressLine2,landmark from address;
ALTER TABLE users_AUD CHANGE COLUMN `profile_image` `profile_image` MEDIUMBLOB NULL DEFAULT NULL;

insert into  customer_AUD(REV,REVTYPE,customerNumber,name,lastName,firstName,phone,creditLimit,prioritystatus,salesman,customer_address) select 1,0,customerNumber,name,lastName,firstName,phone,creditLimit,prioritystatus,salesman,customer_address  from customer;

update customer set creator=1,last_modifier=1,createdTime=now(),modifiedTime=now();

insert into  employee_AUD(REV,REVTYPE,employeeNumber,lastName,firstName,extension,email,officeid,reportsTo,jobTitle) select 1,0,employeeNumber,lastName,firstName,extension,email,officeid,reportsTo,jobTitle  from employee;

update employee set creator=1,last_modifier=1,createdTime=now(),modifiedTime=now();

insert into  office_AUD(REV,REVTYPE,officeCode,city_name,phone,addressLine1,addressLine2,state,country,postalCode,territory) select 1,0,officeCode,city_name,phone,addressLine1,addressLine2,state,country,postalCode,territory from office;

update office set creator=1,last_modifier=1,createdTime=now(),modifiedTime=now();

insert into  orderdetail_AUD(REV,REVTYPE,id,orderNumber,productCode,quantityOrdered,priceEach,orderLineNumber) select 1,0,id,orderNumber,productCode,quantityOrdered,priceEach,orderLineNumber  from orderdetail;

update orderdetail set creator=1,last_modifier=1,createdTime=now(),modifiedTime=now();

insert into  orders_AUD(REV,REVTYPE,orderNumber,order_date,requiredDate,shippedDate,order_status,customerid,totalCost) select 1,0,orderNumber,order_date,requiredDate,shippedDate,order_status,customerid,totalCost  from orders;

update orders set creator=1,last_modifier=1,createdTime=now(),modifiedTime=now();

insert into  payment_AUD(REV,REVTYPE,customerid,checkNumber,payment_date,amount,id) select 1,0,customerid,checkNumber,payment_date,amount,id  from payment;

update payment set creator=1,last_modifier=1,createdTime=now(),modifiedTime=now();

insert into  product_AUD(REV,REVTYPE,productCode,productName,productVendor,quantityInStock,buyPrice,sellPrice,productline) select 1,0,productCode,productName,productVendor,quantityInStock,buyPrice,sellPrice,productline  from product;

update product set creator=1,last_modifier=1,createdTime=now(),modifiedTime=now();


update users set createdTime=now(),modifiedTime=now();

