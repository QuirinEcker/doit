<?php
include "controller/DataBase.php";

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

echo json_encode(DataBase::getInstance()->login($username, $password));