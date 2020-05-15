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
            "SELECT * FROM USER WHERE EMAIL = '$username' AND PASSWORD = '$password' AND DELETED = 0"
        );

        if ($result->num_rows == 1) {
            if ($row = $result->fetch_assoc()) {
                $_SESSION["email"] = $row["EMAIL"];
            }
        }

        return $result->num_rows == 1 ? array("status" => "ok") : array("status" => "err");
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

    public function create($user)
    {
        $userWithSameEmail = SqlRunner::getInstance()->run(
            "SELECT EMAIL FROM USER WHERE EMAIL = '$user->email'"
        );

        if ($userWithSameEmail->num_rows !== 1) {
            SqlRunner::getInstance()->run(
                "INSERT INTO USER (USERNAME, EMAIL, PASSWORD)
                VALUES ('$user->username', '$user->email', '$user->password')"
            );

            return array(
                "status" => "ok",
                "code" => "user_created"
            );
        } else return array(
            "status" => "err",
            "code" => "user_already_exists"
        );
    }

    public function update($user) {
        SessionController::getInstance()->start();
        if (SessionController::getInstance()->sessionNotExpired()) {
            $email = $_SESSION["email"];

            if ($user->change === "password") {
                $passwordResponse = SqlRunner::getInstance()->run(
                    "SELECT PASSWORD FROM USER WHERE EMAIL = '$email'"
                );

                $password = $passwordResponse->fetch_assoc()["PASSWORD"];

                if ($password === $user->passwordOld) {
                    SqlRunner::getInstance()->run(
                        "UPDATE USER SET PASSWORD = '$user->passwordNew' WHERE EMAIL='$email'"
                    );
                } else {
                    return array(
                        "status" => "err",
                        "code" => "wrong_password"
                    );
                }
            } else {
                SqlRunner::getInstance()->run(
                    "UPDATE USER SET USERNAME = '$user->username' WHERE EMAIL='$email'"
                );
            }

            return array(
                "status" => "ok",
                "code" => "user_updated"
            );
        } else return array(
            "status" => "err",
            "code" => "no_session"
        );
    }
}