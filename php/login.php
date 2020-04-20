<?php
include "controller/UserRepository.php";

$username = $_REQUEST["email"];
$password = $_REQUEST["password"];

echo json_encode(UserRepository::getInstance()->login($username, $password));