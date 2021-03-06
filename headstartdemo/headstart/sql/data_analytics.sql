-- MySQL dump 10.10
--
-- Host: localhost    Database: data_analytics
-- ------------------------------------------------------
-- Server version	5.0.15-nt

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
CREATE TABLE `statistics` (
  `TABLE_SCHEMA` varchar(64) NOT NULL default '',
  `TABLE_NAME` varchar(64) NOT NULL default '',
  `COLUMN_NAME` varchar(64) NOT NULL default '',
  `IS_NULLABLE` varchar(3) default NULL,
  `DATA_TYPE` varchar(64) default NULL,
  `DISTINCT_COUNT` mediumint(9) default NULL,
  `AVERAGE_SIZE` decimal(10,3) default NULL,
  `DENSITY_INDEX` decimal(10,3) default NULL,
  `NULL_DENSITY_INDEX` decimal(10,3) default NULL,
  `DISTINCT_WEEKS`  mediumint(9) default NULL,
  `DISTINCT_MONTHS`  mediumint(9) default NULL,
  `DISTINCT_YEARS`  mediumint(9) default NULL,
  PRIMARY KEY  (`TABLE_SCHEMA`,`TABLE_NAME`,`COLUMN_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `statistics`
--


/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
LOCK TABLES `statistics` WRITE;
UNLOCK TABLES;
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

DELIMITER $$

DROP PROCEDURE IF EXISTS `scan` $$
CREATE PROCEDURE `scan`(IN V_SCHEMA_TO_SCAN VARCHAR(64))
BEGIN
  DECLARE V_TABLE_SCHEMA VARCHAR(64);
  DECLARE V_TABLE_NAME VARCHAR(64);
  DECLARE V_COLUMN_NAME VARCHAR(64);
  DECLARE V_IS_NULLABLE VARCHAR(3);
  DECLARE V_DISTINCT_COUNT MEDIUMINT;
  DECLARE V_AVG_LENGTH DECIMAL(10,3);
  DECLARE V_DENSITY_INDEX DECIMAL(10,3);
  DECLARE V_NULL_DENSITY_INDEX DECIMAL(10,3);
  DECLARE V_DISTINCT_WEEKS MEDIUMINT;
  DECLARE V_DISTINCT_MONTHS MEDIUMINT;
  DECLARE V_DISTINCT_YEARS MEDIUMINT;
  DECLARE V_DATA_TYPE VARCHAR(64);
  DECLARE done INT DEFAULT 0;

  DECLARE schema_tab_col_cursor CURSOR FOR SELECT table_schema, table_name, column_name, is_nullable, data_type FROM INFORMATION_SCHEMA.COLUMNS
  WHERE table_schema = V_SCHEMA_TO_SCAN;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN schema_tab_col_cursor;
  read_loop: LOOP

    FETCH schema_tab_col_cursor INTO V_TABLE_SCHEMA, V_TABLE_NAME, V_COLUMN_NAME, V_IS_NULLABLE, V_DATA_TYPE;

    IF done THEN
      LEAVE read_loop;
    END IF;


    SET @calulatedCount = '';

    SET @distinctDynaSQL = CONCAT('select count( distinct `', V_COLUMN_NAME,'`) INTO @calulatedCount from ',V_TABLE_SCHEMA,'.',V_TABLE_NAME);
    PREPARE stmt FROM @distinctDynaSQL;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    SET V_DISTINCT_COUNT = @calulatedCount;

    SET @avgLength = '';
    SET @avgLengthDynaSQL = CONCAT('select sum( BIT_LENGTH(`', V_COLUMN_NAME,'`))/(count(`', V_COLUMN_NAME,'`)*8)  INTO @avgLength from ',V_TABLE_SCHEMA,'.',V_TABLE_NAME);
    PREPARE stmt1 FROM @avgLengthDynaSQL;
    EXECUTE stmt1;
    DEALLOCATE PREPARE stmt1;
    SET V_AVG_LENGTH = @avgLength;

    SET @densityIndex = '';
    SET @densityIndexDynaSQL = CONCAT('select (count(distinct `', V_COLUMN_NAME,'`)/count(*))*100 INTO @densityIndex from ',V_TABLE_SCHEMA,'.',V_TABLE_NAME);
    PREPARE stmt2 FROM @densityIndexDynaSQL;
    EXECUTE stmt2;
    DEALLOCATE PREPARE stmt2;
    SET V_DENSITY_INDEX = @densityIndex;

    SET @nullDensityIndex = '';
    SET @nullDensityIndexDynaSQL = CONCAT('select (100 - (count(`', V_COLUMN_NAME,'`)*100/count(*))) INTO @nullDensityIndex from ',V_TABLE_SCHEMA,'.',V_TABLE_NAME);
    PREPARE stmt3 FROM @nullDensityIndexDynaSQL;
    EXECUTE stmt3;
    DEALLOCATE PREPARE stmt3;
    SET V_NULL_DENSITY_INDEX = @nullDensityIndex;
    

    IF ((V_DATA_TYPE = 'datetime') | (V_DATA_TYPE = 'timestamp')) 
    THEN
		SET @weekDensityIndex = '';
    	SET @weekDensityIndexDynaSQL = CONCAT('select count(distinct WEEK(`', V_COLUMN_NAME,'`)*100000 + YEAR(`', V_COLUMN_NAME,'`)) INTO @weekDensityIndex from ',V_TABLE_SCHEMA,'.',V_TABLE_NAME);
	    PREPARE stmt4 FROM @weekDensityIndexDynaSQL;
	    EXECUTE stmt4;
	    DEALLOCATE PREPARE stmt4;
	    SET V_DISTINCT_WEEKS = @weekDensityIndex;
	
	    SET @monthDensityIndex = '';
	    SET @monthDensityIndexDynaSQL = CONCAT('select count(distinct MONTH(`', V_COLUMN_NAME,'`)*100000 + YEAR(`', V_COLUMN_NAME,'`)) INTO @monthDensityIndex from ',V_TABLE_SCHEMA,'.',V_TABLE_NAME);
	    PREPARE stmt5 FROM @monthDensityIndexDynaSQL;
	    EXECUTE stmt5;
	    DEALLOCATE PREPARE stmt5;
	    SET V_DISTINCT_MONTHS = @monthDensityIndex;
	
	    SET @yearDensityIndex = '';
	    SET @yearDensityIndexDynaSQL = CONCAT('select count(distinct YEAR(`', V_COLUMN_NAME,'`)) INTO @yearDensityIndex from ',V_TABLE_SCHEMA,'.',V_TABLE_NAME);
	    PREPARE stmt6 FROM @yearDensityIndexDynaSQL;
	    EXECUTE stmt6;
	    DEALLOCATE PREPARE stmt6;
	    SET V_DISTINCT_YEARS = @yearDensityIndex;
	ELSE
		SET V_DISTINCT_WEEKS = 0;
		SET V_DISTINCT_MONTHS = 0;
		SET V_DISTINCT_YEARS = 0;
	END IF;
	
    INSERT INTO DATA_ANALYTICS.STATISTICS (TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME, IS_NULLABLE, DISTINCT_COUNT, DATA_TYPE, AVERAGE_SIZE, DENSITY_INDEX, NULL_DENSITY_INDEX, DISTINCT_WEEKS, DISTINCT_YEARS, DISTINCT_MONTHS)
    VALUES (V_TABLE_SCHEMA, V_TABLE_NAME, V_COLUMN_NAME, V_IS_NULLABLE, V_DISTINCT_COUNT, V_DATA_TYPE, COALESCE(V_AVG_LENGTH, 0.000), COALESCE(V_DENSITY_INDEX, 0.000), V_NULL_DENSITY_INDEX, V_DISTINCT_WEEKS, V_DISTINCT_YEARS, V_DISTINCT_MONTHS)
    ON DUPLICATE KEY UPDATE
    TABLE_SCHEMA = V_TABLE_SCHEMA,
    TABLE_NAME = V_TABLE_NAME,
    COLUMN_NAME = V_COLUMN_NAME,
    IS_NULLABLE = V_IS_NULLABLE,
    DISTINCT_COUNT = V_DISTINCT_COUNT,
    DATA_TYPE = V_DATA_TYPE,
    AVERAGE_SIZE = COALESCE(V_AVG_LENGTH, 0.000),
    DENSITY_INDEX = COALESCE(V_DENSITY_INDEX, 0.000),
    NULL_DENSITY_INDEX =V_NULL_DENSITY_INDEX,
    DISTINCT_WEEKS =V_DISTINCT_WEEKS,
    DISTINCT_MONTHS =V_DISTINCT_MONTHS,
    DISTINCT_YEARS =V_DISTINCT_YEARS;


  END LOOP;
  CLOSE schema_tab_col_cursor;

END $$

DELIMITER ;