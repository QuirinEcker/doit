<?php



class Task implements JsonSerializable
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

}