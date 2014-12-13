<?php
require_once( 'Twitter.php' );

class TwitterGet {
	
	private $_connection;
	
	
	
	public function __construct() {
		$settings = array(
			'oauth_token' => '',
			'oauth_token_secret' => '',
			'consumer_key' => '',
			'consumer_secret' => '',
			'output_format' => 'json'
		);
		$this->_connection = new Twitter( $settings );
        
    }
    
    public function setHeader() {
	    header( 'Content-Type: application/json' );
    }
    
    public function fetch() {
    	$this->setHeader();
		
		
		
	    $q = $_GET['q'];
	    $count = $_GET['count'];
	    $query = '';
	    $total = 0;
	    if( strlen( $q ) > 500 ) {
			$query = substr( $q, 0, 500 );    
	    } else {
		    $query = $q;
	    }
	    
	    if( filter_var( intval( $count ), FILTER_VALIDATE_INT ) ) {
		    if( $count > 100 ) {
			    $total = 15;
		    } else {
			    $total = $count;
		    }
	    } else {
		    $total = 15;
	    }
	    
	    $params = array(
			'q' => urlencode( $query ),
			'count' => $total	
		);
	    $resp = $this->_connection->get( 'search/tweets', $params );
	    echo $resp;
    }
	
		
}