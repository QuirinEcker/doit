<?php

require_once "../controller/UserRepository.php";

switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        echo json_encode(UserRepository::getInstance()->getUser());
        break;
    case "POST":
        echo json_encode(UserRepository::getInstance()->create(json_decode($_REQUEST["data"])));
        break;
    case "DELETE":
        echo json_encode(UserRepository::getInstance()->delete());
        break;
    default:
        echo "Request no supported";
        break;
}