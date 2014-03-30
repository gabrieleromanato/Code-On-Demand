<?php
require_once( 'DB.php' ); 


class AJAXPoll {

	private $_db;
	
	public function __construct() {
		$this->_db = new DB( 'host', 'username', 'password', 'database' );	
	}
	
	private function _vote() {
		$vote = $_POST['vote'];
		$postID = $_POST['id'];
		
		$numVote = intval( $vote );
		$numID = intval( $postID );
		$output = '';
		$lenVote = strlen( $vote );
		$lenID = strlen( $postID );
		
	  if( ( $lenVote > 0 && $lenVote <= 11 ) && ( $lenID > 0 && $lenID <= 11 ) ) {
        	  
		
		if( filter_var( $numVote, FILTER_VALIDATE_INT ) && filter_var( $numID, FILTER_VALIDATE_INT ) ) {
			$query = "SELECT poll_vote FROM poll WHERE poll_post_id = $numID";
			$results = $this->_db->getResults( $query );
			$resVote = array();
			$jsonArr = array();
			
		  if( count( $results ) > 0 ) {
			
			foreach( $results as $result ) {
				$resVote['vote'] = $result['poll_vote'];
			}
			
			$updatedVote = $numVote + intval( $resVote['vote'] );
			$updateQuery = "UPDATE poll SET poll_vote = $updatedVote WHERE poll_post_id = $numID";
			$this->_db->rawQuery( $updateQuery );
			
			$jsonArr['vote'] = $updatedVote;
			$output = json_encode( $jsonArr );
			echo $output;
			
		  } else {
			  $insertQuery = "INSERT into poll (poll_post_id, poll_vote) VALUES ($numID, $numVote)";
			  $this->_db->rawQuery( $insertQuery );
			  
			  $jsonArr['vote'] = $numVote;
			  $output = json_encode( $jsonArr );
			  echo $output;
			  
		  }
			
			
			
		}
		
	  }
		
		
	}
	
	private function _display() {
		$results = $this->_db->getResults( "SELECT poll_post_id, poll_vote FROM poll" );
		$output = '';
		$jsonArr = array();
		
		if( count( $results ) > 0 ) {
			$jsonArr['results'] = array();
			foreach( $results as $result ) {
				$id = $result['poll_post_id'];
				$vote = $result['poll_vote'];
				$pid = '#p-' . $id;
				
				$jsonArr['results'][] = array( 'id' => $pid, 'vote' => $vote );	
			}
		} else {
			$jsonArr['results'] = 0;
		}
		
		$output = json_encode( $jsonArr );
		echo $output;
	}
	
	public function handleRequest() {
		$allowedActions = array( 'vote', 'display' );
		if( isset( $_POST['action'] ) ) {
			$action = $_POST['action'];
			$output = '';
			
			if( in_array( $action, $allowedActions ) ) {
				header( 'Content-Type: application/json' );
				
				switch( $action ) {
					case 'vote':
						$this->_vote();
						break;
					case 'display':
						$this->_display();
						break;
					default:
						break;
				}
				
					exit();
			}
			
		}
	}
}