<?php
$myfile = fopen("./task.csv", "r") or die("Unable to open file!");

echo fread($myfile,filesize("./task.csv"));

fclose($myfile);