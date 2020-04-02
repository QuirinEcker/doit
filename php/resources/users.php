<?php

switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        echo "getting User";
        break;
    case "POST":
        echo "creating User";
        break;
    default:
        echo "not implemented";
        break;
}