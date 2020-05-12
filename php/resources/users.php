<?php

require_once "../controller/UserRepository.php";

switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        echo json_encode(UserRepository::getInstance()->getUser());
        break;
    case "POST":
        echo "creating User";
        break;
    case "DELETE":
        echo "deleting User";
        break;
    default:
        echo "not implemented";
        break;
}