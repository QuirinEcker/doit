<?php
include "controller/UserRepository.php";
require_once "controller/RequestData.php";

$body = RequestData::getInstance()->getBody();

echo json_encode(UserRepository::getInstance()->login($body->email, $body->password));