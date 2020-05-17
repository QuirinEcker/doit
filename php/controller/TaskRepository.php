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

            if ($this->accessToTaskList($id, $email)) {
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
            "code" => "no_session"
        );
    }

    public function create($body)
    {
        SessionController::getInstance()->start();

        if (SessionController::getInstance()->sessionNotExpired()) {
            $email = $_SESSION["email"];

            if ($this->accessToTaskList($body->taskListId, $email)) {
                SqlRunner::getInstance()->run(
                    "INSERT INTO doit_db.TASK (DUE_DATE, NAME, DESCRIPTION, IS_DONE, TASK_LIST_ID) 
                        VALUES ('$body->dueDate', '$body->name', '$body->description', '$body->state', '$body->taskListId')"
                );

                $id = SqlRunner::getInstance()->run(
                    "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'doit_db' AND TABLE_NAME = 'TASK_LIST'"
                )->fetch_assoc()["AUTO_INCREMENT"] - 1;

                return array(
                    "status" => "ok",
                    "code" => "task_created",
                    "data" => $id
                );

            } else return array(
                "status" => "err",
                "code" => "access_denied"
            );
        } else return array(
            "status" => "err",
            "code" => "no_session"
        );
    }

    public function accessToTaskList($taskListId, $email) {
        $resultTaskList = SqlRunner::getInstance()->run(
            "SELECT USER_ID FROM TASK_LIST WHERE ID = '$taskListId'"
        );

        return $resultTaskList->fetch_assoc()["USER_ID"] === $email;
    }
}