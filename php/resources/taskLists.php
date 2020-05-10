<?php
require_once "../controller/TaskListRepository.php";

switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        echo json_encode(TaskListRepository::getInstance()->getAll());
        break;
    case "POST":
        echo json_encode(TaskListRepository::getInstance()->create(json_decode($_REQUEST["data"])));
        break;
    default:
        echo "not implemented";
        break;
}