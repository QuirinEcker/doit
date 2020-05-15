<?php
require_once "../controller/TaskListRepository.php";
require_once "../controller/RequestData.php";

$body = RequestData::getInstance()->getBody();

switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        echo json_encode(TaskListRepository::getInstance()->getAll());
        break;
    case "POST":
        echo json_encode(TaskListRepository::getInstance()->create($body));
        break;
    default:
        echo "not implemented";
        break;
}