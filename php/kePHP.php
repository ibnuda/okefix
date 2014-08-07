<?php
require_once './config.php';
require_once './error_handler.php';
require_once './kePHP.class.php';

/*
header('Content-Type: text/xml');
header('Expires: Wed, 23 Dec 1980 00:30:00 GMT');
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Cache-Control: no-cache, must-revalidate');
header('Pragma: no-cache');
 */

$isianKalimat = $_GET['yangDicari'];

if (isset($isianKalimat)) {
	//echo $isianKalimat;
    $kephp = new KePHP();
    $hasilKalimat = $kephp->cekKeDB($isianKalimat);
	$dom = new DOMDocument();
	$response = $dom->createElement('response');
	$dom->appendChild($response);
	$responseText = $dom->createTextNode($hasilKalimat);
	$response->appendChild($responseText);
	$xmlString = $dom->saveXML();
	//return $xmlString;
	//echo $xmlString;
    echo $hasilKalimat;
    //echo $isianKalimat;
} else {
    echo "koneksi error";
}
//$kekphp->cekKeDB($isianKalimat);
?>
