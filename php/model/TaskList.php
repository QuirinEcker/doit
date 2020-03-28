<?php


class TaskList implements JsonSerializable, Model
{
    private $id;
    private $name;
    private $tags = array();
    private $tasks = array();
    private static $idMax = 10;

    public function __construct($id = 0, $name = "")
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

    public static function idUp()
    {
        self::$idMax++;
    }

    public static function getIdMax() {
        return self::$idMax;
    }

    public function import($json)
    {
        $this->id = $json["id"];
        $this->name = $json["name"];
    }

    public function export()
    {
        // TODO: Implement export() method.
    }
}