<?php


$sendData = json_decode($_POST["message"]);


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require '../vendor/autoload.php';

try {
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->SMTPAuth = true;
    $mail->Username = 'insert username';
    $mail->Password = 'inser password';
    $mail->setFrom('qe.phpsender@gmail.com', 'Quirin Ecker');
    $mail->addReplyTo('qe.phpsender@gmail.com', 'Quirin Ecker');
    $mail->addAddress($sendData->email, $sendData->name);
    $mail->Subject = 'PHPMailer GMail SMTP test';
    $mail->msgHTML($sendData->message);
    $mail->AltBody = 'This is a plain-text message body';
} catch (\PHPMailer\PHPMailer\Exception $e) {
    die("error");
}


if (!$mail->send()) {
    echo "{status: 'err'}";
} else {
    echo "{status: 'succ'}";
}

function save_mail($mail)
{
    $path = '{imap.gmail.com:993/imap/ssl}[Gmail]/Sent Mail';
    $imapStream = imap_open($path, $mail->Username, $mail->Password);
    $result = imap_append($imapStream, $path, $mail->getSentMIMEMessage());
    imap_close($imapStream);

    return $result;
}
