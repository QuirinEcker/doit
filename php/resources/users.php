<?php

require_once "../Controller/UserRepository.php";

switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        echo json_encode(UserRepository::getInstance()->getUser());
        break;
    case "POST":
        echo "creating User";
        break;
    default:
        echo "not implemented";
        break;
}