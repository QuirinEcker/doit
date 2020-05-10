<?php


class SqlRunner
{
    private static $instance;

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new SqlRunner();
        }
    }

    public function run($sql, $sessionNeeded) {
        if ($this->sessionNotExpired() || $sessionNeeded) {
            $conn = ConnectionFactory::getInstance()->getConnection();
            $result = $conn->query($sql);
            $conn->close();
            return $result;
        } else return array(
            "status" => "err",
            "code" => "no_session"
        );
    }

    private function sessionNotExpired() {
        session_cache_expire(15);
        session_start();

        return isset($_SESSION["email"]);
    }


}