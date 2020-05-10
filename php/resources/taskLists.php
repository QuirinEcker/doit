<?php
require_once "../controller/TaskListRepository.php";

switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        echo json_encode(TaskListRepository::getInstance()->getAll());
        break;
    case "POST":
        echo "creating User";
        break;
    default:
        echo "not implemented";
        break;
}