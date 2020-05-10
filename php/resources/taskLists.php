<?php
require_once "../controller/UserRepository.php";

switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        echo "gettingTaskLists";
        break;
    case "POST":
        echo "creating User";
        break;
    default:
        echo "not implemented";
        break;
}