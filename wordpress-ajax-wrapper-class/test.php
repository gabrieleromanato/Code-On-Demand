<?php
require_once( 'WP_Ajax_Wrapper.php' );

class My_Ajax {
	protected $_ajax;

	public function __construct() {
		$this->_ajax = new WP_Ajax_Wrapper( array( 'application/json', 'text/xml' ) );
		$this->actions();
		$this->_ajax->registerActions( $this );
	}

	public function actions() {
		$this->_ajax->addAction( 'test', 'all', 'foo' );
		$this->_ajax->addAction( 'bar', 'all', 'bar' );
	}

	public function foo() {
		$this->_ajax->setContentType( 'text/xml' );
		echo '<foo>ok</foo>';
		exit();
	}

	public function bar() {
		$this->_ajax->setContentType( 'application/json' );	
		echo json_encode( array( 'ok' => 'bar' ) );
		exit();
	}
}

$myA = new My_Ajax();