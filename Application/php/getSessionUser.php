<?php
include "./DataBase.php";

session_start();
echo var_dump($_SESSION);

if (session_id() == '') {
    echo "noSession";
} else {
    $obj = DataBase::getInstance()->getUser($_SESSION["id"]);
    unset($obj->password);
    echo json_encode($obj);
}