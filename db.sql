-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: May 18, 2020 at 07:19 PM
-- Server version: 5.6.40
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doit_db`
--
CREATE DATABASE IF NOT EXISTS `doit_db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `doit_db`;

-- --------------------------------------------------------

--
-- Table structure for table `TAG`
--

CREATE TABLE `TAG` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(15) DEFAULT NULL,
  `TASK_LIST_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `TASK`
--

CREATE TABLE `TASK` (
  `ID` int(11) NOT NULL,
  `DUE_DATE` datetime DEFAULT NULL,
  `NAME` varchar(15) DEFAULT NULL,
  `DESCRIPTION` varchar(200) DEFAULT NULL,
  `IS_DONE` tinyint(1) DEFAULT NULL,
  `TASK_LIST_ID` int(11) DEFAULT NULL,
  `DELETED` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `TASK_LIST`
--

CREATE TABLE `TASK_LIST` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(15) DEFAULT NULL,
  `USER_ID` varchar(45) DEFAULT NULL,
  `DELETED` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `TASK_TASK_LIST_ASSIGNMENT`
--

CREATE TABLE `TASK_TASK_LIST_ASSIGNMENT` (
  `TASK_LIST_ID` int(11) NOT NULL DEFAULT '0',
  `TASK_ID` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `USER`
--

CREATE TABLE `USER` (
  `USERNAME` varchar(15) DEFAULT NULL,
  `EMAIL` varchar(45) NOT NULL DEFAULT '',
  `PASSWORD` varchar(45) DEFAULT NULL,
  `DELETED` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `TAG`
--
ALTER TABLE `TAG`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_TAG_TASK_LIST` (`TASK_LIST_ID`);

--
-- Indexes for table `TASK`
--
ALTER TABLE `TASK`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_TASK_TASK_LIST` (`TASK_LIST_ID`);

--
-- Indexes for table `TASK_LIST`
--
ALTER TABLE `TASK_LIST`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_TASK_LIST_USER` (`USER_ID`);

--
-- Indexes for table `TASK_TASK_LIST_ASSIGNMENT`
--
ALTER TABLE `TASK_TASK_LIST_ASSIGNMENT`
  ADD PRIMARY KEY (`TASK_ID`,`TASK_LIST_ID`),
  ADD KEY `FK_TASK_TASK_LIST_ASSIGNMENT_TASK_LIST` (`TASK_LIST_ID`);

--
-- Indexes for table `USER`
--
ALTER TABLE `USER`
  ADD PRIMARY KEY (`EMAIL`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `TAG`
--
ALTER TABLE `TAG`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `TASK`
--
ALTER TABLE `TASK`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `TASK_LIST`
--
ALTER TABLE `TASK_LIST`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `TAG`
--
ALTER TABLE `TAG`
  ADD CONSTRAINT `FK_TAG_TASK_LIST` FOREIGN KEY (`TASK_LIST_ID`) REFERENCES `TASK_LIST` (`ID`);

--
-- Constraints for table `TASK`
--
ALTER TABLE `TASK`
  ADD CONSTRAINT `FK_TASK_TASK_LIST` FOREIGN KEY (`TASK_LIST_ID`) REFERENCES `TASK_LIST` (`ID`);

--
-- Constraints for table `TASK_LIST`
--
ALTER TABLE `TASK_LIST`
  ADD CONSTRAINT `FK_TASK_LIST_USER` FOREIGN KEY (`USER_ID`) REFERENCES `USER` (`EMAIL`);

--
-- Constraints for table `TASK_TASK_LIST_ASSIGNMENT`
--
ALTER TABLE `TASK_TASK_LIST_ASSIGNMENT`
  ADD CONSTRAINT `FK_TASK_TASK_LIST_ASSIGNMENT_TASK` FOREIGN KEY (`TASK_ID`) REFERENCES `TASK` (`ID`),
  ADD CONSTRAINT `FK_TASK_TASK_LIST_ASSIGNMENT_TASK_LIST` FOREIGN KEY (`TASK_LIST_ID`) REFERENCES `TASK_LIST` (`ID`);
--
-- Database: `IMAGE_UPLOAD`
--
CREATE DATABASE IF NOT EXISTS `IMAGE_UPLOAD` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `IMAGE_UPLOAD`;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) DEFAULT NULL,
  `path` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `path`) VALUES
(0, 'uploads/Screen Shot 2020-04-20 at 16.53.16.png'),
(0, 'uploads/Screen Shot 2020-04-27 at 19.28.02.png');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
