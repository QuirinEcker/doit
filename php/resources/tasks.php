<?php

require_once "../controller/TaskRepository.php";
require_once "../controller/RequestData.php";

$body = RequestData::getInstance()->getBody();

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
        echo json_encode(TaskRepository::getInstance()->getAll($_REQUEST["id"]));
        break;
    case 'POST':
        echo json_encode(TaskRepository::getInstance()->create($body));
        break;
    case 'DELETE':
        echo json_encode(TaskRepository::getInstance()->delete($body));
        break;
    default:
        echo "Request not supported";
}