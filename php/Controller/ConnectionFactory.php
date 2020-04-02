<?php


class ConnectionFactory
{
    public static $instance;
    private $host;
    private $user;
    private $password;
    private $database;

    function __construct($host, $user, $password, $database)
    {
        $this->host = $host;
        $this->user = $user;
        $this->password = $password;
        $this->database = $database;
    }

    static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new ConnectionFactory(
                "mysql",
                "doit_db",
                "app",
                "doit_db"
            );
        }

        return self::$instance;
    }

    function getConnection() {
        $conn = new mysqli(
            $this->host,
            $this->user,
            $this->password,
            $this->database
        );

        if ($conn->connect_error)
            die("Connection failed: " . $conn->connect_error);

        return $conn;
    }
}