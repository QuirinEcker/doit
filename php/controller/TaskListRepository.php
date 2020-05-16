<?php

require_once __DIR__ . "/ConnectionFactory.php";
require_once __DIR__ . "/SessionController.php";
require_once __DIR__ . "/SqlRunner.php";
require_once __DIR__ . "/../model/TaskList.php";

class TaskListRepository
{
    static private $instance;

    public function getAll()
    {
        SessionController::getInstance()->start();
        if (SessionController::getInstance()->sessionNotExpired()) {
            $email = $_SESSION["email"];
            $taskLists = array();

            $result = SqlRunner::getInstance()->run(
                "SELECT * FROM TASK_LIST WHERE USER_ID = '$email' AND DELETED = 0"
            );

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $taskLists[] = new TaskList($row["ID"], $row["NAME"]);
                }
            } else return array(
                "status" => "ok",
                "code" => "no_task_lists"
            );

            return array(
                "status" => "ok",
                "code" => "task_lists_got",
                "data" => $taskLists
            );
        } else return array(
            "status" => "err",
            "code" => "no_session"
        );
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
        SessionController::getInstance()->start();

        if (SessionController::getInstance()->sessionNotExpired()) {
            $email = $_SESSION["email"];
            SqlRunner::getInstance()->run(
                "INSERT INTO doit_db.TASK_LIST(NAME, USER_ID) VALUES ('$taskList->name', '$email')"
            );

            $id = SqlRunner::getInstance()->run(
                "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'doit_db' AND TABLE_NAME = 'TASK_LIST'"
            )->fetch_assoc()["AUTO_INCREMENT"] - 1;

            return array(
                "status" => "ok",
                "code" => "task_lists_created",
                "id" => $id
            );
        } else return array(
            "status" => "err",
            "code" => "no_session"
        );
    }

    public function delete($id)
    {
        SessionController::getInstance()->start();

        if (SessionController::getInstance()->sessionNotExpired()) {
            $email = $_SESSION['email'];

            echo $email;
            echo $id;

            SqlRunner::getInstance()->run(
                "UPDATE TASK_LIST SET DELETED = 1 WHERE ID = '$id' AND USER_ID = '$email'"
            );

            return array(
                "status" => "ok",
                "code" => "task_list_deleted"
            );
        } else return array(
            "status" => "err",
            "code" => "no_session"
        );
    }

    public function update($body)
    {
        SessionController::getInstance()->start();

        if (SessionController::getInstance()->sessionNotExpired()) {
            $email = $_SESSION['email'];

            SqlRunner::getInstance()->run(
                "UPDATE TASK_LIST SET NAME = '$body->name' WHERE ID = '$body->id' AND USER_ID = '$email'"
            );

            return array(
                "status" => "ok",
                "code" => "task_list_updated"
            );
        } else return array(
            "status" => "err",

        );
    }
}