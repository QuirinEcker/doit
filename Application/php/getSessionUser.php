<?php
include "./DataBase.php";

session_start();
if (!isset($_SESSION["id"])) {
    echo "noSession";
} else {
    $obj = DataBase::getInstance()->getUser($_SESSION["id"]);
    unset($obj->password);
    echo json_encode($obj);
}