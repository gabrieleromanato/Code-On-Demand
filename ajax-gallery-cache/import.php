<?php
require_once( 'DB.php' );
$db = new DB( 'host', 'username', 'password', 'database' );

$handle = opendir( 'images' );
$images = array();

while( ( $file = readdir( $handle ) ) !== false ) {
	if( $file != '.' && $file != '..' ) {
		if( preg_match( '/(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/', $file ) ) {
			$fileParts = explode( '.', $file );
			$title = ucwords( str_replace( array( '_', '-' ), ' ', $fileParts[0] ) );
			$info = getimagesize( 'images/' . $file );
			$width = $info[0];
			$height = $info[1];
			
			$images[] = array(
				'filename' => $file,
				'title' => $title,
				'width' => $width,
				'height' => $height
			);
			
		}
	}

}

closedir( $handle );

foreach( $images as $image ) {
	$values = array( $image['filename'], $image['title'], $image['width'], $image['height'] );
	$db->insertInto( 'images', $values );
}