<?php

require_once "../controller/UserRepository.php";
require_once "../controller/RequestData.php";

$body = RequestData::getInstance()->getBody();

switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        echo json_encode(UserRepository::getInstance()->getUser());
        break;
    case "POST":
        echo json_encode(UserRepository::getInstance()->create($body));
        break;
    case "DELETE":
        echo json_encode(UserRepository::getInstance()->delete());
        break;
    case "PUT":
        echo json_encode(UserRepository::getInstance()->update($body));
        break;
    default:
        echo "Request no supported";
        break;
}