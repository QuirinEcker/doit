<?php
include "./DataBase.php";
include "./php_classes/TaskList.php";

$random_id = rand(0, TaskList::getIdMax());
$x = DataBase::getInstance()->getUser($random_id);

while ($x !== "null") {
    $random_id = rand(0, TaskList::getIdMax());
    $x = DataBase::getInstance()->getUser($random_id);
}

TaskList::idUp();
echo $random_id;
