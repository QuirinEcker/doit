<?php


class User implements JsonSerializable
{
    private $id;
    public $taskLists = array();
    private $username;
    private $email;
    private $password;

    public function __construct($id, $username, $email, $password)
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

    public function getJSON()
    {
        return array(
            'id' => $this->id,
            'username' => $this->username,
            'email' => $this->email,
            'taskLists' => $this->getTaskListsInJson()
        );
    }

    public function jsonSerialize()
    {
        $returnValue = get_object_vars($this);
        $returnValue["type"] = "User";
        return $returnValue;
    }


}