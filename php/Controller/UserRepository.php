<?php

require_once "ConnectionFactory.php";

class UserRepository
{
    static private $instance;

    public function login($username, $password) {
        $conn = ConnectionFactory::getInstance()->getConnection();

        $sql = "SELECT * FROM USER u WHERE u.EMAIL = '$username' AND u.PASSWORD = '$password'";
        $result = $conn->query($sql);
        session_cache_expire(15);

        if ($result->num_rows == 1) {
            if ($row = $result->fetch_assoc()) {
                session_start();
                $_SESSION["email"] = $row["EMAIL"];
            }
        }

        return $result->num_rows == 1 ? array("status" => "acc") : array("status" => "ref");
    }

    public function getUser() {
        // TODO: Get User (UserId ist in the $_Session)
    }

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new UserRepository("mysql", "doit_db", "app", "doit_db");
        }

        return self::$instance;
    }
}