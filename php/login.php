<?php
include "controller/DataBase.php";

$username = explode(";", $_POST["val"])[0];
$password = explode(";", $_POST["val"])[1];

echo json_encode(DataBase::getInstance()->login($username, $password));