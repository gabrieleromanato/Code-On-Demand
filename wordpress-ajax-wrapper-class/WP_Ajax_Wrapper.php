<?php
class WP_Ajax_Wrapper {

	protected $_actions = array();
	protected $_types;

	public function __construct( $contentTypes ) {
		$this->_types = $contentTypes;
	}

	public function addAction( $name, $visibility, $method ) {
		$this->_actions[] = array(
			'name' => $name,
			'visibility' => $visibility,
			'method' => $method
		);
	}

	public function registerActions( $reference ) {
		$actions = $this->_actions;
		if( count( $actions ) == 0 ) {
			return;
		}
		foreach( $actions as $action ) {
			$visibility = $action['visibility'];
			if( $visibility == 'all' ) {
				add_action( 'wp_ajax_' . $action['name'], array( $reference, $action['method'] ) );
				add_action( 'wp_ajax_nopriv_' . $action['name'], array( $reference, $action['method'] ) );
			} else if( $visibility == 'public' ) {
				add_action( 'wp_ajax_nopriv_' . $action['name'], array( $reference, $action['method'] ) );	
			} else {
				add_action( 'wp_ajax_' . $action['name'], array( $reference, $action['method'] ) );	
			}
		}
	}

	public function setContentType( $type = 'application/json' ) {
		$allowed = $this->_types;
		if( !in_array( $type, $allowed ) ) {
			return;
		}
		header( 'Content-Type: ' . $type );
	}


}