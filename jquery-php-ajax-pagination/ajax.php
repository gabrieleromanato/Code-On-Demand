<?php
require_once( 'DB.php' );
header( 'Content-Type: text/html' );



$start = 0;
$end = 3;
$value = 0;

if( isset( $_GET[ 's'] ) ) {

	$taintedStart = $_GET[ 's' ];

	if( strlen( $taintedStart ) <= 2 ) {

		$s = intval( $taintedStart );
	

		if( filter_var( $s, FILTER_VALIDATE_INT ) ) {

			if( $s > $start ) {
				$start = $s;
			}

		

		}


	}

}

$value = ( $start * $end ) - $end;


$db = new DB( 'host', 'username', 'password', 'database' );
		$posts = $db->getResults( "SELECT * FROM posts WHERE post_type = 'post' AND post_status = 'publish' ORDER BY ID DESC LIMIT $value,$end" );


		$html = '';

		foreach( $posts as $post => $content ) {
			$postContent = $content['post_excerpt'];
			$postTitle = $content['post_title'];
			$date = strtotime( $content['post_date'] );
			$postDate = strftime( '%d-%m-%Y', $date );

			$html .= sprintf( '<h3>%s</h3><small>%s</small><p>%s</p>', $postTitle, $postDate, $postContent );
		}

		echo $html;