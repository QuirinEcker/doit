<?php
include "controller/DataBase.php";

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

echo DataBase::getInstance()->login($username, $password);