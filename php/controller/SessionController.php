<?php


class SessionController
{
    private static $instance;

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new SessionController();
        }

        return self::$instance;
    }

    public function start() {
        session_cache_expire(15);
        session_start();
    }

    public function sessionNotExpired() {
        return isset($_SESSION["email"]);
    }
}