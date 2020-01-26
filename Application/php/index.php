<?php
include "./php_classes/Tag.php";
include "./php_classes/Task.php";
include "./php_classes/User.php";
include "./php_classes/TaskList.php";

$obj = new User(0, "user", "user@gmail.com", "pw0");
$obj->taskLists[] = new TaskList(0, "taskList0");
$obj->taskLists[] = new TaskList(1, "taskList1");


echo json_encode($obj);