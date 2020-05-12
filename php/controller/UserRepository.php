<?php

require_once __DIR__ . "/ConnectionFactory.php";
require_once __DIR__ . "/SessionController.php";
require_once __DIR__ . "/SqlRunner.php";
require_once __DIR__ . "/../model/User.php";

class UserRepository
{
    static private $instance;

    public function login($username, $password) {
        SessionController::getInstance()->start();

        $result = SqlRunner::getInstance()->run(
            "SELECT * FROM USER WHERE EMAIL = '$username' AND PASSWORD = '$password'"
        );

        if ($result->num_rows == 1) {
            if ($row = $result->fetch_assoc()) {
                $_SESSION["email"] = $row["EMAIL"];
            }
        }

        return $result->num_rows == 1 ? array("status" => "acc") : array("status" => "ref");
    }

    public function getUser() {
        SessionController::getInstance()->start();

        if (SessionController::getInstance()->sessionNotExpired()) {
            $email = $_SESSION["email"];
            $result = SqlRunner::getInstance()->run(
                "SELECT * FROM USER u WHERE u.EMAIL = '$email'"
            );

            if ($row = $result->fetch_assoc()) {
                $userObject = new User($row["ID"], $row["USERNAME"], $row["EMAIL"]);
                return array(
                    "status" => "ok",
                    "code" => "user_got" ,
                    "data" => $userObject
                );
            } else {
                return array(
                    "status" => "err",
                    "code" => "user_not_found"
                );
            }
        } else return array(
            "status" => "err",
            "code" => "no_session"
        );
    }

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new UserRepository();
        }

        return self::$instance;
    }

    public function delete()
    {
        SessionController::getInstance()->start();

        if (SessionController::getInstance()->sessionNotExpired()) {
            $email = $_SESSION["email"];
            SqlRunner::getInstance()->run(
                "UPDATE USER SET DELETED = true WHERE EMAIL = '$email'"
            );

            return array(
                "status" => "ok",
                "code" => "user_deleted"
            );
        } else return array(
            "status" => "err",
            "code" => "no_session"
        );
    }
}