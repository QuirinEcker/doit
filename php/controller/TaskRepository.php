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

    public function getAll($id)
    {
        SessionController::getInstance()->start();

        if (SessionController::getInstance()->sessionNotExpired()) {
            $email = $_SESSION["email"];
            $tasks = array();

            $resultTaskList = SqlRunner::getInstance()->run(
                "SELECT USER_ID FROM TASK_LIST WHERE ID = '$id'"
            );


            if ($resultTaskList->fetch_assoc()["USER_ID"] === $email) {
                $resultTasks = SqlRunner::getInstance()->run(
                    "SELECT * FROM TASK WHERE TASK_LIST_ID = '$id'"
                );

                while ($row = $resultTasks->fetch_assoc()) {
                    $tasks[] = new Task($row["ID"], "", $row["NAME"], $row["DUE_DATE"], "", $row["IS_DONE"]);
                }

                return array(
                    "status" => "ok",
                    "code" => "tasks_got",
                    "data" => $tasks
                );
            } else return array(
                "status" => "err",
                "code" => "access_denied"
            );
        } else return array(
            "status" => "err",
            "code" => "no_error"
        );
    }
}