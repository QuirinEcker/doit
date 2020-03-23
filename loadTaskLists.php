<?php

$myfile = fopen("taskList.csv", "r") or die("Unable to open file!");

echo fread($myfile,filesize("taskList.csv"));

fclose($myfile);