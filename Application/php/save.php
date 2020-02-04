<?php
include "./DataBase.php";

DataBase::getInstance()->save(json_decode($_POST["val"]));
echo "saved";