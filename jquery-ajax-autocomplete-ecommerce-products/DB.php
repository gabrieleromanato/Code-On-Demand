<?php

class DB {
	private $_connection;
	public $numResults;

	public function __construct( $host, $username, $password, $database ) {
		$this->_connection = new mysqli( $host, $username, $password, $database );
		$this->_connection->set_charset( 'utf8' );
	}
	
	public function insertInto( $tableName, $values ) {
		$query = "INSERT INTO $tableName VALUES(";
		$queryValues = array();
		foreach( $values as $value ) {
			$val = $this->_connection->real_escape_string( $value );
			$pad = '';
			if( !filter_var( intval( $val ), FILTER_VALIDATE_INT ) ) {
				$pad = "'";
			}
			
			$queryValues[] = $pad. $val . $pad;
		}
		
		$query .= implode( ',', $queryValues ) . ");";
		
		$this->_connection->query( $query );
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