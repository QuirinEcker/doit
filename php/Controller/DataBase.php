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
        $currentUsers = $this->updateUsers($currentUsers, $object);

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
        $conn = new mysqli($this->address, $this->user, $this->pw, $this->db);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM USER u WHERE u.EMAIL = '$username' AND u.PASSWORD = '$password'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $row["PASSWORD"] = "-";
                return $row;
            }
        } else {
            return array("status" => "err");
        }
    }

    public function getUser($id) {
        $users = $this->getUsers();

        for ($i = 0; $i < count($users); $i++) {
            if ($users[$i]->id == $id) {
                return $users[$i];
            }
        }

        return "null";
    }

    public function getUserFrom($token) {
        if (session_id() === $token) {
            return $this->getUser($_SESSION["id"]);
        }
    }

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new DataBase("mysql", "doit_db", "app", "doit_db");
        }

        return self::$instance;
    }

    private function updateUsers($currentUsers, $object)
    {
        $found = false;
        for ($i = 0; $i < count($currentUsers); $i++) {
            if ($currentUsers[$i]->id === $object->id) {
                $found = true;
                $object->password = $currentUsers[$i]->password;
                unset($object->token);
                $currentUsers[$i] = $object;
            }
        }

        if ($found === false) {
            $currentUsers[] = $object;
        }

        return $currentUsers;
    }


}