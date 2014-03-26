<?php
require_once( 'DB.php' );
header( 'Content-Type: application/json' );

$db = new DB( 'host', 'username', 'password', 'database' );
$images = $db->getResults( "SELECT * FROM images" );
$total = $db->numResults;
$url = 'images/';
$results = array();
$results['total'] = $total;
$results['images'] = array();

foreach( $images as $image => $row ) {
	$image_url = $url . $row['filename'];
	$caption = $row['title'];
	$width = $row['width'];
	$height = $row['height'];
	
	
	
	$results['images'][] = array(
		'url' => $image_url,
		'caption'=> $caption,
		'width'=> $width,
		'height'=> $height
	);
}

$json = json_encode( $results );
echo $json;
exit();

