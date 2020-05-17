<?php

require_once "../controller/TaskRepository.php";
require_once "../controller/RequestData.php";

$body = RequestData::getInstance()->getBody();

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
        echo "getting Tasks";
        break;
    default:
        echo "Request not supported";
}