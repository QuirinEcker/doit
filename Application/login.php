<?php
$username = explode(";", $_POST["val"])[0];
$password = explode(";", $_POST["val"])[1];

echo "USERNAME: $username \n";
echo "PASSWORD: $password \n";

$myfile = fopen("./user.csv", "r") or die("Unable to open file!");
$fileContent = explode("\n", fread($myfile, filesize("./user.csv")));

for ($i = 0; $i < sizeof($fileContent); $i++) {
    echo explode(";", $fileContent[$i])[2] . "\n";
    if ($username === explode(";", $fileContent[$i])[2]) {
        if ($password === explode(";", $fileContent[$i])[3]) {
            echo "resolve";
        }
    }
}

fclose($myfile);