<?php


class TaskList implements JsonSerializable
{
    private $id;
    private $name;
    private $tags = array();
    private $tasks = array();

    public function __construct($id, $name)
    {
        $this->id = $id;
        $this->name = $name;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getTags()
    {
        return $this->tags;
    }

    public function getTasks()
    {
        return $this->tasks;
    }

    public function jsonSerialize()
    {
        $returnValue = get_object_vars($this);
        $returnValue["type"] = "TaskList";
        return $returnValue;
    }


}