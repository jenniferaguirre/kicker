DROP DATABASE IF EXISTS activity_db;
CREATE DATABASE activity_db;
USE activity_db ;

create table activitydeck(
id int not null auto_increment,
categories varchar(100) ,
act_1 varchar (45) null ,
act_2 varchar (45) null,
act_3 varchar (45) null,
act_4 varchar (45) null,
act_5 varchar (45) null,
primary key (id)
);
