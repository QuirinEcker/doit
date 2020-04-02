<?php
include "./UserRepository.php";
var_dump(json_decode($_POST["val"]));
UserRepository::getInstance()->save(json_decode($_POST["val"]));
echo "saved";