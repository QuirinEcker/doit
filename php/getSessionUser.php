<?php
include "./UserRepository.php";

session_start();
if (!isset($_SESSION["id"])) {
    echo "noSession";
} else {
    $obj = UserRepository::getInstance()->getUser($_SESSION["id"]);
    unset($obj->password);
    echo json_encode($obj);
}