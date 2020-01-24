<?php


class Tag
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


}