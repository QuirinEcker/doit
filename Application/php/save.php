<?php
include "./DataBase.php";
var_dump(json_decode($_POST["val"]));
DataBase::getInstance()->save(json_decode($_POST["val"]));
echo "saved";