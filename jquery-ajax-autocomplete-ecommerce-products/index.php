<?php
require_once( 'DB.php' );
$db = new DB( 'host', 'username', 'password', 'database' );
$productCodes = $db->getResults( "SELECT product_code FROM products" );

?>
<!DOCTYPE html>
<html>
<head>
  <title>jQuery: AJAX autocomplete for e-commerce products</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="css/style.css" type="text/css" media="screen" />
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
  <script type="text/javascript" src="js/autoproducts.js"></script>
</head>
<body>
<form action="" method="post" id="cart">
	<div>
		<input type="text" name="code" id="code" placeholder="Product Code" />
		<div id="name"></div>
		<div id="price"></div>
		<input type="submit" value="Add to cart" />
	</div>
	<h3>Available product codes</h3>
	<ul id="codes">
	<?php
		$html = '';
		foreach( $productCodes as $productCode ) {
			$code = $productCode['product_code'];
			$html .= sprintf( '<li>%s</li>', $code );
		}
		echo $html;
	?>
	</ul>
</form>

</body>
</html>