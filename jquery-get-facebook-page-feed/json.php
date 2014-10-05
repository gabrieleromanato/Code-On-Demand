<?php
header( 'Content-Type: application/json' );
$page_id = $_GET['id'];
$fb_url = 'https://www.facebook.com/feeds/page.php?id=';

if( filter_var( intval( $page_id ), FILTER_VALIDATE_INT ) ) {
	$json_url = $fb_url . $page_id . '&format=json';
	
	$curl = curl_init();
	
	$header[0] = 'Accept: text/xml,application/xml,application/xhtml+xml,';
	$header[0] .= 'text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5';
	$header[] = 'Cache-Control: max-age=0';
	$header[] = 'Connection: keep-alive';
	$header[] = 'Keep-Alive: 300';
	$header[] = 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7';
	$header[] = 'Accept-Language: en-us,en;q=0.5';
	$header[] = 'Pragma: ';
	
	
	curl_setopt( $curl, CURLOPT_URL, $json_url );
	curl_setopt( $curl, CURLOPT_USERAGENT, 'Mozilla' );
	curl_setopt( $curl, CURLOPT_HTTPHEADER, $header );
	curl_setopt( $curl, CURLOPT_REFERER, '' );
	curl_setopt( $curl, CURLOPT_ENCODING, 'gzip,deflate' );
	curl_setopt( $curl, CURLOPT_AUTOREFERER, true );
	curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true );
	curl_setopt( $curl, CURLOPT_SSL_VERIFYPEER, false );
    curl_setopt( $curl, CURLOPT_SSL_VERIFYHOST, false );
	curl_setopt( $curl, CURLOPT_TIMEOUT, 10 );
	
	$json = curl_exec($curl);
	curl_close($curl); 
	
	echo $json;
	    
    exit();
	
	
} else {
	$output = array();
	$output['error'] = 'Invalid page ID';
	echo json_encode( $output );
	exit();
}