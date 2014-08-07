<?php

set_error_handler('error_handler', E_ALL);
function error_handler($errno, $errstr, $errfile, $errline)
{
    if (ob_get_length()) {
        ob_clean();
    }
    $error_message = 'ERRNO: ' . $errno . chr(10) .
                     'TEXT: ' . $errstr . chr(10) .
                     'LOCATION: ' . $errfile .
                     ', line ' . $errline;
    echo $error_message;
    exit;

}
