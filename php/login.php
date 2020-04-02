<?php
include "controller/UserRepository.php";

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

echo json_encode(UserRepository::getInstance()->login($username, $password));