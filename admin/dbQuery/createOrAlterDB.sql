ALTER TABLE `tbl_user` 
CHANGE COLUMN `password` `password` VARCHAR(255) NOT NULL ;

ALTER TABLE `password_resets` 
ADD COLUMN `id` INT NOT NULL AUTO_INCREMENT FIRST,
ADD COLUMN `user_id` VARCHAR(50) NOT NULL AFTER `id`,
ADD COLUMN `mobile` INT(10) NULL AFTER `user_id`,
CHANGE COLUMN `email` `email` VARCHAR(191) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NULL ,
CHANGE COLUMN `created_at` `created_at` TIMESTAMP NOT NULL ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
ADD UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) ,
ADD PRIMARY KEY (`id`),
ADD UNIQUE INDEX `mobile_UNIQUE` (`mobile` ASC) ,
ADD UNIQUE INDEX `email_UNIQUE` (`email` ASC) ;
;

ALTER TABLE `tbl_city` 
ADD UNIQUE INDEX `city_UNIQUE` (`city` ASC) ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC) ;
;



ALTER TABLE `tbl_sub_category`
ADD COLUMN `category_id` INT NOT NULL AFTER `category`;


UPDATE tbl_sub_category  INNER JOIN  tbl_category
ON tbl_sub_category.category = tbl_category.category    
SET tbl_sub_category.category_id = tbl_category.id;


ALTER TABLE `tbl_sub_category`
DROP COLUMN `category`;


CREATE TABLE `tbl_user_type` (
  `id` INT NOT NULL,
  `user_type` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));
    
insert into tbl_user_type value (1,'admin');
insert into tbl_user_type value (2,'sub admin');
insert into tbl_user_type value (3,'adp');
insert into tbl_user_type value (4,'franchise');


ALTER TABLE `tbl_user`
ADD COLUMN `user_type_id` INT NOT NULL AFTER `user_type`;

update tbl_user set user_type_id = (select id
from tbl_user_type where tbl_user.user_type = tbl_user_type.user_type);

ALTER TABLE `tbl_user`
DROP COLUMN `user_type`;




ALTER TABLE `tbl_product`
ADD COLUMN `category_id` INT NOT NULL AFTER `category`,
ADD COLUMN `sub_category_id` INT NOT NULL AFTER `sub_category`;


update tbl_product set category_id = (select id
from tbl_category where tbl_product.category = tbl_category.category);


update tbl_product set sub_category_id = (select id from tbl_sub_category
where tbl_product.sub_category = tbl_sub_category.sub_category
and tbl_product.category_id = tbl_sub_category.category_id);


ALTER TABLE `tbl_product`
DROP COLUMN `sub_category`,
DROP COLUMN `category`;






CREATE TABLE `tbl_franchise_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `franchise_id`int NOT NULL,
  `product` varchar(30) NOT NULL,
  `product_code` varchar(30) NOT NULL,
  `category_id` int NOT NULL,
  `sub_category_id` int NOT NULL,
  `price` int NOT NULL,
  `discount` int NOT NULL,
  `after_discount` int NOT NULL,
  `retail_profit` int NOT NULL,
  `actual_price` int NOT NULL,
  `gst_rate` text NOT NULL,
  `bv` int NOT NULL,
  `franchise_commission` int NOT NULL,
  `free_code` varchar(30) NOT NULL,
  `free_code_to` varchar(20) NOT NULL,
  `free_code_from` varchar(20) NOT NULL,
  `vdb_credit` int NOT NULL,
  `vdb_debit` int NOT NULL,
  `training` bool NOT NULL,
  `referral` bool NOT NULL,
  `product_url` text NOT NULL,
  `product_desc` text NOT NULL,
  `product_img` text NOT NULL,
  `quantity` int NOT NULL,
  `city_id` int NOT NULL,
  `readmore_url` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=324 DEFAULT CHARSET=latin1;


-- 
-- 
-- 
-- 
-- 
-- 


CREATE TABLE `tbl_product_unit` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `unit` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `unit_UNIQUE` (`unit` ASC) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) );


ALTER TABLE `tbl_product` 
ADD COLUMN `unit` INT NOT NULL AFTER `quantity`;


INSERT INTO `tbl_product_unit` (`id`, `unit`) VALUES ('1', 'Kg');
INSERT INTO `tbl_product_unit` (`id`, `unit`) VALUES ('2', 'gm');
INSERT INTO `tbl_product_unit` (`id`, `unit`) VALUES ('3', 'L');
INSERT INTO `tbl_product_unit` (`id`, `unit`) VALUES ('4', 'ml');
INSERT INTO `tbl_product_unit` (`id`, `unit`) VALUES ('5', 'pc');


ALTER TABLE `tbl_product` 
ADD COLUMN `currency` VARCHAR(45) NULL DEFAULT 'Rs' AFTER `unit`;


ALTER TABLE `tbl_product` 
ADD COLUMN `imageUrl` VARCHAR(1000) NULL AFTER `readmore_url`;


ALTER TABLE `tbl_product` 
ADD COLUMN `vcb` INT NULL DEFAULT 0 AFTER `bv`,
ADD COLUMN `vdb` INT NULL DEFAULT 0 AFTER `vcb`;



ALTER TABLE `password_resets` 
CHANGE COLUMN `created_at` `created_at` TIMESTAMP NOT NULL DEFAULT NOW() ;


ALTER TABLE `password_resets` 
CHANGE COLUMN `mobile` `mobile` VARCHAR(10) NULL DEFAULT NULL ;


ALTER TABLE `password_resets` 
ADD COLUMN `updated_at` TIMESTAMP NULL DEFAULT NOW() AFTER `created_at`;

ALTER TABLE `tbl_product` 
ADD COLUMN `active` INT NOT NULL DEFAULT 1 AFTER `imageUrl`;


ALTER TABLE `tbl_product` 
ADD COLUMN `short_desc` VARCHAR(255) NULL AFTER `active`,
ADD COLUMN `desc` VARCHAR(1000) NULL AFTER `short_desc`,
CHANGE COLUMN `vcb` `vdbc` INT NULL DEFAULT '0' ,
CHANGE COLUMN `vdb` `vdbd` INT NULL DEFAULT '0' ;


ALTER TABLE `tbl_product` 
CHANGE COLUMN `readmore_url` `readmore_url` VARCHAR(64) NULL ;


ALTER TABLE `tbl_product` 
CHANGE COLUMN `free_code` `free_code` VARCHAR(30) NULL ,
CHANGE COLUMN `free_code_to` `free_code_to` VARCHAR(20) NULL ,
CHANGE COLUMN `free_code_from` `free_code_from` VARCHAR(20) NULL ;


ALTER TABLE `tbl_product` 
ADD COLUMN `vdba` INT NULL DEFAULT 0 AFTER `vdbd`,
CHANGE COLUMN `id` `id` INT NOT NULL ,
CHANGE COLUMN `vdbc` `vdbc` INT NULL ;


ALTER TABLE `tbl_product` 
CHANGE COLUMN `id` `id` INT NOT NULL AUTO_INCREMENT ;


ALTER TABLE `tbl_product` 
CHANGE COLUMN `imageUrl` `imageUrl` MEDIUMTEXT NULL DEFAULT NULL ;


ALTER TABLE `tbl_product` 
ADD COLUMN `gst` VARCHAR(45) NOT NULL DEFAULT 0 AFTER `actual_price`;

ALTER TABLE `tbl_product` 
ADD COLUMN `commision` INT NOT NULL DEFAULT 0 AFTER `vdbd`;


DROP TABLE `tbl_franchise_product`;

ALTER TABLE `password_resets` 
DROP COLUMN `updated_at`;


CREATE TABLE `tbl_franchise` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adp_id` varchar(45) NOT NULL,
  `franchise_name` varchar(45) NOT NULL,
  `franchise_address` varchar(255) NOT NULL,
  `franchise_number` varchar(10) NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `adp_id_UNIQUE` (`adp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

CREATE TABLE `tbl_product_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `product_type_UNIQUE` (`product_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

CREATE TABLE `tbl_product_franchise` (
  `id` int NOT NULL AUTO_INCREMENT,
  `franchise_id` int NOT NULL,
  `product` varchar(30) NOT NULL,
  `product_code` varchar(30) NOT NULL,
  `product_type` int NOT NULL,
  `category_id` int NOT NULL,
  `sub_category_id` int NOT NULL,
  `price` int NOT NULL,
  `discount` int NOT NULL,
  `after_discount` int NOT NULL,
  `retail_profit` int NOT NULL,
  `actual_price` int NOT NULL,
  `gst` varchar(45) NOT NULL DEFAULT '0',
  `bv` int NOT NULL,
  `vdbc` int DEFAULT NULL,
  `vdbd` int DEFAULT '0',
  `commision` int NOT NULL DEFAULT '0',
  `vdba` int DEFAULT '0',
  `free_code` varchar(30) DEFAULT NULL,
  `free_code_to` varchar(20) DEFAULT NULL,
  `free_code_from` varchar(20) DEFAULT NULL,
  `quantity` int NOT NULL,
  `unit` int NOT NULL,
  `currency` varchar(45) DEFAULT 'Rs',
  `city` text NOT NULL,
  `readmore_url` varchar(64) DEFAULT NULL,
  `imageUrl` mediumtext,
  `maxPurchase` int NOT NULL DEFAULT '10',
  `active` int NOT NULL DEFAULT '1',
  `short_desc` varchar(255) DEFAULT NULL,
  `desc` varchar(1000) DEFAULT NULL,
  `is_sample` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=452 DEFAULT CHARSET=latin1;




ALTER TABLE `tbl_product` 
ADD COLUMN `product_type` INT NOT NULL DEFAULT 1 AFTER `desc`;



ALTER TABLE `tbl_adp` 
DROP COLUMN `id`,
CHANGE COLUMN `adp_id` `adp_id` INT NOT NULL AUTO_INCREMENT FIRST,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`adp_id`);
;


ALTER TABLE `tbl_order` 
CHANGE COLUMN `cid` `cid` INT NOT NULL DEFAULT 0 ;


ALTER TABLE `tbl_product` 
ADD COLUMN `unit_quantity` INT NULL DEFAULT 0 AFTER `quantity`;


ALTER TABLE `tbl_franchise` 
ADD COLUMN `is_sample` INT NOT NULL DEFAULT 0 AFTER `active`;








ALTER TABLE `tbl_product` 
ADD COLUMN `maxPurchase`  INT NULL DEFAULT 0 ;






-- 
ALTER TABLE `tbl_adp` 
CHANGE COLUMN `password` `password` VARCHAR(255) NOT NULL ;


ALTER TABLE `tbl_wallet` 
CHANGE COLUMN `balance` `balance` INT NOT NULL DEFAULT 0 ;


ALTER TABLE `tbl_wallet_history` 
CHANGE COLUMN `task_date` `task_date` TIMESTAMP NOT NULL DEFAULT NOW() ;


ALTER TABLE `tbl_adp` 
CHANGE COLUMN `adp_id` `adp_id` VARCHAR(30) NOT NULL ;



--------

CREATE TABLE `tbl_smart_mart_discount_balance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adp_id` varchar(10) NOT NULL,
  `balance` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB ;


CREATE TABLE `tbl_smart_mart_discount_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adp_id` varchar(10) NOT NULL,
  `msg` longtext NOT NULL,
  `credit` int NOT NULL,
  `debit` int NOT NULL,
  `task_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB ;


ALTER TABLE `tbl_co_sponsor_royality` 
CHANGE COLUMN `date` `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ;


ALTER TABLE `tbl_order` 
CHANGE COLUMN `order_date` `order_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ;


--------

ALTER TABLE `tbl_adp_statement` 
CHANGE COLUMN `tds_cut` `tds_cut` DECIMAL NOT NULL ,
CHANGE COLUMN `final_paid` `final_paid` DECIMAL NOT NULL ;


ALTER TABLE `tbl_adp_statement` 
CHANGE COLUMN `cycle_date` `cycle_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ;


ALTER TABLE `tbl_adp_statement` 
CHANGE COLUMN `tds_cut` `tds_cut` DECIMAL(10,2) NOT NULL ,
CHANGE COLUMN `final_paid` `final_paid` DECIMAL(10,2) NOT NULL ;


ALTER TABLE `tbl_franchise` 
ADD COLUMN `franchise_city` INT NOT NULL AFTER `adp_id`;



-----------------------------------------------


CREATE TABLE `tbl_product_quantity` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` VARCHAR(45) NULL,
  `quantity` VARCHAR(45) NULL,
  `unit` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));




ALTER TABLE `tbl_product_quantity` 
ADD COLUMN `unit_quantity` INT NULL DEFAULT '0' AFTER `quantity`,
ADD COLUMN `price` INT NOT NULL AFTER `unit`,
ADD COLUMN `discount` INT NOT NULL AFTER `price`,
ADD COLUMN `after_discount` INT NOT NULL AFTER `discount`,
ADD COLUMN `retail_profit` INT NOT NULL AFTER `after_discount`,
ADD COLUMN `actual_price` INT NOT NULL AFTER `retail_profit`,
ADD COLUMN `gst` VARCHAR(45) NOT NULL DEFAULT '0' AFTER `actual_price`,
ADD COLUMN `bv` INT NOT NULL AFTER `gst`,
ADD COLUMN `vdbc` INT NULL DEFAULT NULL AFTER `bv`,
ADD COLUMN `vdbd` INT NULL DEFAULT '0' AFTER `vdbc`,
ADD COLUMN `commision` INT NOT NULL DEFAULT '0' AFTER `vdbd`,
ADD COLUMN `vdba` INT NULL DEFAULT '0' AFTER `commision`,
ADD COLUMN `free_code` VARCHAR(30) NULL DEFAULT NULL AFTER `vdba`,
ADD COLUMN `free_code_to` VARCHAR(20) NULL DEFAULT NULL AFTER `free_code`,
ADD COLUMN `free_code_from` VARCHAR(20) NULL DEFAULT NULL AFTER `free_code_to`,
ADD COLUMN `currency` VARCHAR(45) NULL DEFAULT 'Rs' AFTER `free_code_from`;



ALTER TABLE `tbl_product` 
DROP COLUMN `maxPurchase`,
DROP COLUMN `currency`,
DROP COLUMN `unit`,
DROP COLUMN `unit_quantity`,
DROP COLUMN `quantity`,
DROP COLUMN `free_code_from`,
DROP COLUMN `free_code_to`,
DROP COLUMN `free_code`,
DROP COLUMN `vdba`,
DROP COLUMN `commision`,
DROP COLUMN `vdbd`,
DROP COLUMN `vdbc`,
DROP COLUMN `bv`,
DROP COLUMN `gst`,
DROP COLUMN `actual_price`,
DROP COLUMN `retail_profit`,
DROP COLUMN `after_discount`,
DROP COLUMN `discount`,
DROP COLUMN `price`;


ALTER TABLE `tbl_product_quantity` 
ADD COLUMN `max_purchase` VARCHAR(45) NULL AFTER `currency`;


CREATE TABLE `tbl_product_franchise_quantity` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` VARCHAR(45) NULL,
  `quantity` VARCHAR(45) NULL,
  `unit` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

ALTER TABLE `tbl_product_franchise_quantity` 
ADD COLUMN `unit_quantity` INT NULL DEFAULT '0' AFTER `quantity`,
ADD COLUMN `price` INT NOT NULL AFTER `unit`,
ADD COLUMN `discount` INT NOT NULL AFTER `price`,
ADD COLUMN `after_discount` INT NOT NULL AFTER `discount`,
ADD COLUMN `retail_profit` INT NOT NULL AFTER `after_discount`,
ADD COLUMN `actual_price` INT NOT NULL AFTER `retail_profit`,
ADD COLUMN `gst` VARCHAR(45) NOT NULL DEFAULT '0' AFTER `actual_price`,
ADD COLUMN `bv` INT NOT NULL AFTER `gst`,
ADD COLUMN `vdbc` INT NULL DEFAULT NULL AFTER `bv`,
ADD COLUMN `vdbd` INT NULL DEFAULT '0' AFTER `vdbc`,
ADD COLUMN `commision` INT NOT NULL DEFAULT '0' AFTER `vdbd`,
ADD COLUMN `vdba` INT NULL DEFAULT '0' AFTER `commision`,
ADD COLUMN `free_code` VARCHAR(30) NULL DEFAULT NULL AFTER `vdba`,
ADD COLUMN `free_code_to` VARCHAR(20) NULL DEFAULT NULL AFTER `free_code`,
ADD COLUMN `free_code_from` VARCHAR(20) NULL DEFAULT NULL AFTER `free_code_to`,
ADD COLUMN `currency` VARCHAR(45) NULL DEFAULT 'Rs' AFTER `free_code_from`,
ADD COLUMN `max_purchase` VARCHAR(45) NULL AFTER `currency`;

ALTER TABLE `tbl_product_franchise` 
DROP COLUMN `maxPurchase`,
DROP COLUMN `currency`,
DROP COLUMN `unit`,
DROP COLUMN `quantity`,
DROP COLUMN `free_code_from`,
DROP COLUMN `free_code_to`,
DROP COLUMN `free_code`,
DROP COLUMN `vdba`,
DROP COLUMN `commision`,
DROP COLUMN `vdbd`,
DROP COLUMN `vdbc`,
DROP COLUMN `bv`,
DROP COLUMN `gst`,
DROP COLUMN `actual_price`,
DROP COLUMN `retail_profit`,
DROP COLUMN `after_discount`,
DROP COLUMN `discount`,
DROP COLUMN `price`;


----------------------------------------------------------------------


ALTER TABLE `impact`.`tbl_adp` 
CHANGE COLUMN `adp_id` `adp_id` INT NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `adp_id_UNIQUE` (`adp_id` ASC) VISIBLE;
;

