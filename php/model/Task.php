<?php

require_once "Model.php";
require_once "Tag.php";

class Task implements JsonSerializable, Model
{
    private $id;
    private $tags;
    private $name;
    private $dueDate;
    private $parentTaskListID;
    private $state;

    public function __construct($id = 0, $tags = null, $name = "", $dueDate = null, $parentTaskListID = 0, $state = 0)
    {
        $this->id = $id;
        $this->tags = $tags;
        $this->name = $name;
        $this->dueDate = $dueDate;
        $this->parentTaskListID = $parentTaskListID;
        $this->state = $state;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getTags()
    {
        return $this->tags;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getDueDate()
    {
        return $this->dueDate;
    }

    public function getParentTaskListID()
    {
        return $this->parentTaskListID;
    }

    public function getState()
    {
        return $this->state;
    }

    public function jsonSerialize()
    {
        $returnValue = get_object_vars($this);
        $returnValue["type"] = "Task";
        return $returnValue;
    }

    public function import($json)
    {
        $this->id = $json["id"];
        $this->name = $json["name"];
        $this->dueDate = DateTime::createFromFormat('Y-m-d H:i:s', $json["dueDate"]);
        $this->state = $json["state"];

        foreach ($json["tags"] as $key => $value) {
            $tag = new Tag();
            $tag->import($value);
            $this->tags[] = $tag;
        }
    }

    public function export()
    {
        return json_encode($this);
    }
}