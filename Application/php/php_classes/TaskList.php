<?php


class TaskList
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

}