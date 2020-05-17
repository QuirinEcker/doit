<?php

require_once __DIR__ . "/ConnectionFactory.php";
require_once __DIR__ . "/SessionController.php";
require_once __DIR__ . "/SqlRunner.php";
require_once __DIR__ . "/../model/Task.php";

class TaskRepository
{
    static private $instance;

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new TaskRepository();
        }

        return self::$instance;
    }
}