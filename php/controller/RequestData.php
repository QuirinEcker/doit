<?php

class RequestData
{
    private static $instance;

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new RequestData();
        }

        return self::$instance;
    }

    public function getBody() {
        $requestStream = fopen("php://input", "r");
        $body = fread($requestStream, 1024);
        fclose($requestStream);
        return json_decode($body);
    }

}