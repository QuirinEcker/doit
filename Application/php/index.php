<?php
include "./php_classes/Tag.php";
include "./php_classes/Task.php";
include "./php_classes/User.php";
include "./php_classes/TaskList.php";
include "./DataBase.php";

$obj = new User(0, "user", "user@gmail.com", "pw0");
$obj->taskLists[] = new TaskList(0, "taskList0");
$obj->taskLists[] = new TaskList(1, "taskList1");
$db = new DataBase("../db/db.txt", "", "", "");
$db->save($obj);