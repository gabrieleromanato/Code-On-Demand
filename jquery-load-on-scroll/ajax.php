<?php
$data = array( '<p>Curabitur blandit tempus porttitor.</p>', 
			   '<p>Cras mattis consectetur purus sit amet fermentum.</p>',
			   '<p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet</p>',
			   '<p>Lorem ipsum dolor sit amet et ideo autem aquis.</p>',
			   '<p>Donec id elit non mi porta gravida at eget metus.</p>', 
			   '<p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>',
			   '<p>Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam.</p>',
			   '<p>Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>'
			 );
$tainted_index = $_GET['index'];
$clean = 0;

$raw_index = intval( $tainted_index );

if( filter_var( $raw_index, FILTER_VALIDATE_INT ) ) {
	header( 'Content-Type: text/html' );
	$len = count( $data );
    $clean = $raw_index - 1;

    if( $raw_index <= $len ) {
    	echo '<h3>' . $raw_index . '</h3>' . $data[$clean];
    } else {
    	echo '';
    }

}
