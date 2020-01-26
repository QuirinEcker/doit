<?php


class Tag implements JsonSerializable
{
    private $id;
    private $name;
    private $parentTaskListID;
    private $parentTaskID;

    function __construct($id, $name, $parentTaskListID, $parentTaskID)
    {
        $this->id = $id;
        $this->name = $name;
        $this->$parentTaskID = $parentTaskID;
        $this->$parentTaskListID = $parentTaskListID;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getParentTaskListID()
    {
        return $this->parentTaskListID;
    }

    public function getParentTaskID()
    {
        return $this->parentTaskID;
    }

    public function jsonSerialize()
    {
        $returnValue = get_object_vars($this);
        $returnValue["type"] = "Tag";
        return $returnValue;
    }
}