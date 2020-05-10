<?php

require_once __DIR__ . "/ConnectionFactory.php";
require_once __DIR__ . "/../model/TaskList.php";

class TaskListRepository
{
    static private $instance;

    public function getAll() {
        session_cache_expire(15);
        session_start();
        if (isset($_SESSION["email"])) {
            $email = $_SESSION["email"];
            $conn = ConnectionFactory::getInstance()->getConnection();
            $arr = array();

            $sql = "SELECT * FROM TASK_LIST WHERE USER_ID = '$email'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $arr[] = new TaskList($row["ID"], $row["NAME"]);
                }
            } else {
                $conn->close();
                return array(
                    "status" => "ok",
                    "code" => "no_task_lists"
                );
            }

            $conn->close();
            return array(
                "status" => "ok",
                "code" => "task_lists_got",
                "data" => $arr
            );
        } else {
            return array(
                "status" => "err"
            );
        }
    }

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new TaskListRepository();
        }

        return self::$instance;
    }

    public function create($taskList)
    {
        session_cache_expire(15);
        session_start();

        if (isset($_SESSION["email"])) {
            $email = $_SESSION["email"];
            $conn = ConnectionFactory::getInstance()->getConnection();

            $sql = "INSERT INTO doit_db.TASK_LIST(NAME, USER_ID) VALUES ('$taskList->name', '$email')";
            $conn->query($sql);

            $conn->close();
            return array(
                "status" => "ok",
                "code" => "task_lists_created"
            );
        } else {
            return array(
                "status" => "err",
                "code" => "no_session"
            );
        }
    }
}