<?php

class DB {
	private $_connection;
	public $numResults;

	public function __construct( $host, $username, $password, $database ) {
		$this->_connection = new mysqli( $host, $username, $password, $database );
		$this->_connection->set_charset( 'utf8' );
	}

	public function getResults( $query ) {
		$results = array();

		if ( $result = $this->_connection->query( $query ) ) {
		
			$this->numResults = $this->_connection->affected_rows;
			
			while ( $row = $result->fetch_assoc() ) {
				$results[] = $row;
			}

			$result->free();
		}

		

		return $results;
	}


	public function __destruct() {
		$this->_connection->close();
	}
}