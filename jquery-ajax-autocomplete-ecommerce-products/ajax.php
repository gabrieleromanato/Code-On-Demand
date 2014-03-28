<?php
require_once( 'DB.php' );
$db = new DB( 'host', 'username', 'password', 'database' );

if( isset( $_GET['code'] ) ) {
$taintedCode = $_GET['code'];

header( 'Content-Type: application/json' );

if( preg_match( '/^\d{4}$/', $taintedCode ) && strlen( $taintedCode ) == 4 ) {
	$rawIntCode = intval( $taintedCode );
	$strCode = '';
	if( filter_var( $rawIntCode, FILTER_VALIDATE_INT ) ) {
		$strCode = $rawIntCode;
		$query = "SELECT product_name, product_price FROM products WHERE product_code = '$strCode'";
		$results = $db->getResults( $query );
		$output = array();
		
		foreach( $results as $result ) {
			$output['name'] = $result['product_name'];
			$output['price'] = $result['product_price'];
		}
		
		echo json_encode( $output );
	}
}

}