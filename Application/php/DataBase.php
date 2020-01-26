<?php


class DataBase
{
    static private $instance;
    private $address;
    private $user;
    private $pw;
    private $db;

    function __construct($address, $user, $pw, $db)
    {
        $this->address = $address;
        $this->user = $user;
        $this->pw = $pw;
        $this->db = $db;
    }

    public function save($object) {
        $currentUsers = $this->getUsers();
        $currentUsers[] = $object;

        $file = fopen($this->address, "w") or die("Unable to open file");

        fwrite($file, json_encode($currentUsers));
        fclose($file);

    }

    public function getUsers() {
        $file = fopen($this->address, "r") or die("Unable to open file");
        $users = json_decode(fread($file,filesize($this->address)));
        fclose($file);

        return $users;
    }

    public function login($username, $password) {
        $users = $this->getUsers();

        for ($i = 0; $i < count($users); $i++) {
            if ($users[$i]->username == $username) {
                if ($users[$i]->password == $password) {
                    return $users[$i];
                }
            }
        }

        return array("status" => "err");
    }

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new DataBase("../db/db.txt", "", "", "");
        }

        return self::$instance;
    }


}