<?php
require_once( 'Twitter.php' );

class TwitterPost {
	
	private $_connection;
	
	
	
	public function __construct() {
		$settings = array(
			'oauth_token' => 'your token here',
			'oauth_token_secret' => 'your token here',
			'consumer_key' => 'your key here',
			'consumer_secret' => 'your key here',
			'output_format' => 'json'
		);
		$this->_connection = new Twitter( $settings );
        
    }
    
    public function setHeader() {
	    header( 'Content-Type: application/json' );
    }
    
    public function send() {
    	$this->setHeader();
		
		
		
	    $tweet = $_POST['tweet'];
	    $status = '';
	    if( strlen( $tweet ) > 140 ) {
			$status = substr( $status, 0, 140 );    
	    } else {
		    $status = $tweet;
	    }
	    $params = array(
			'status' => $status	
		);
	    $resp = $this->_connection->post( 'statuses/update', $params );
	    echo $resp;
    }
	
		
}