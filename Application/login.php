<?php
$username = explode(";", $_POST["val"])[0];
$password = explode(";", $_POST["val"])[1];

echo "USERNAME: $username \n";
echo "PASSWORD: $password \n";

$user = fopen("./user.csv", "r") or die("Unable to open file!");
$fileContent = explode("\n", fread($user, filesize("./user.csv")));

for ($i = 0; $i < sizeof($fileContent); $i++) {
    //echo explode(";", $fileContent[$i])[2] . "\n";
    if ($username === explode(";", $fileContent[$i])[2]) {
        if ($password === explode(";", $fileContent[$i])[3]) {
            echo "resolve:" . getTaskListsFor(explode(";", $fileContent[$i])[0]);
        }
    }
}

fclose($user);

function getTaskListsFor($id) {
    $taskLists = fopen("./taskList.csv", "r") or die("Unable to open file!");
    $taskListsContent = explode("\n", fread($taskLists, filesize("./taskList.csv")));
    $userTaskLists = "";

    for ($i = 0; $i < sizeof($taskListsContent); $i++) {
        if (explode(";", $taskListsContent[$i])[2] === $id) {
            $userTaskLists .= "\n". explode(";", $taskListsContent[$i])[0] . ";" . explode(";", $taskListsContent[$i])[1] . ";" . explode(";", $taskListsContent[$i])[2];
        }
    }

    fclose($taskLists);
    return $userTaskLists;
}