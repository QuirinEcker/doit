<?php

require_once "Model.php";

class User implements JsonSerializable, Model
{
    private $id;
    public $taskLists = array();
    private $username;
    private $email;
    private $password;

    public function __construct($id = 0, $username = "", $email = "", $password = "")
    {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getTaskLists()
    {
        return $this->taskLists;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function convertIntoObjectIntoArray()
    {
        return (array) $this->taskLists;
    }

    public function jsonSerialize()
    {
        $returnValue = get_object_vars($this);
        $returnValue["type"] = "User";
        return $returnValue;
    }


    public function import($json)
    {
        $this->id = $json["id"];
        $this->username = $json["username"];
        $this->email = $json["email"];
        $this->password = $json["password"];

        if ($json["taskLists"] != null) {
            foreach ($json["taskLists"] as $key => $value) {
                $taskList = new TaskList();
                $taskList->import($value);
                $this->taskLists[$taskList->getId()] = $taskList;
            }
        }
    }

    public function export()
    {
        return json_encode($this);
    }
}