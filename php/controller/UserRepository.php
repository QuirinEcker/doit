<?php

require_once __DIR__ . "/ConnectionFactory.php";
require_once __DIR__ . "/../model/User.php";

class UserRepository
{
    static private $instance;

    public function login($username, $password) {
        $conn = ConnectionFactory::getInstance()->getConnection();

        $sql = "SELECT * FROM USER WHERE EMAIL = '$username' AND PASSWORD = '$password'";
        $result = $conn->query($sql);
        session_cache_expire(15);

        if ($result->num_rows == 1) {
            if ($row = $result->fetch_assoc()) {
                session_start();
                $_SESSION["email"] = $row["EMAIL"];
            }
        }

        $conn->close();
        return $result->num_rows == 1 ? array("status" => "acc") : array("status" => "ref");
    }

    public function getUser() {
        session_cache_expire(15);
        session_start();
        if (isset($_SESSION["email"])) {
            $email = $_SESSION["email"];
            $conn = ConnectionFactory::getInstance()->getConnection();
            $sql = "SELECT * FROM USER u WHERE u.EMAIL = '$email'";
            $result = $conn->query($sql);

            if ($row = $result->fetch_assoc()) {
                $userObject = new User($row["ID"], $row["USERNAME"], $row["EMAIL"]);
                return $userObject->export();
            } else {
                return array(
                    "status" => "err",
                    "reason" => "user not found"
                );
            }
        } else {
            return array(
                "status" => "err",
                "reason" => "session expired"
            );
        }

    }

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new UserRepository();
        }

        return self::$instance;
    }
}