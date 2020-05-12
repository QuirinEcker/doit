<?php

require_once __DIR__ . "/SessionController.php";

class SqlRunner
{
    private static $instance;

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new SqlRunner();
        }

        return self::$instance;
    }

    public function run($sql) {
        $conn = ConnectionFactory::getInstance()->getConnection();
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }
}