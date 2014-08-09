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
//$isianKalimat ="Karakteristik konsumen sesungguhnya terdiri dari beberapa macam yang dapat disebut juga sebagai aspek demografi dari konsumen yang terdiri dari usia, pendapatan, pendidikan, pekerjaan, besar keluarga, tempat tinggal, tahap dalam daur hidup, jenis kelamin, warna kulit dan sebagainya (Kotler 1999: 242), namun untuk membatasi permasalahan dalam penelitian ini dan berdasarkan pertimbangan relevansi terhadap objek penelitian maka penelitian ini dibatasi pada karakteristik konsumen yang berhubungan dengan jenis kelamin, usia, pendapatan, pekerjaan, dan pendidikan.";
if (isset($isianKalimat)) {
	//echo $isianKalimat;
    if (strlen($isianKalimat) > 200) {
        $isianKalimat = substr($isianKalimat, 0, 149);
    }
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
