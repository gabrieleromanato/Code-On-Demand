<?php require_once( 'DB.php' ); ?>
<!DOCTYPE html>
<html>
<head>
  <title>jQuery and PHP AJAX pagination</title>
  <meta charset="utf-8" />
  <style type="text/css" media="screen">
@import url(http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,400,700,300);

body {
	margin: 2em auto;
	max-width: 40em;
	line-height: 1.5;
	font-family: Georgia, serif;
	color: #757575;
	background: #fff;
}

h1, h2, h3, h4, h5, h6 {
	font-family: 'Open Sans', sans-serif;
	color: #000;
	margin-bottom: 0;
}

#pagination {
	padding: 1em 0;
}

#pagination a {
	color: #333;
	text-decoration: none;
	margin-right: 0.5em;
	display: inline-block;
	width: 2em;
	height: 2em;
	line-height: 2;
	text-align: center;
	background: #ccc;
}

#pagination a.current {
	background: #333;
	color: #fff;
}
  </style>
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
  <script type="text/javascript">
(function( $ ) {
	$(function() {
		$( "a", "#pagination" ).on( "click", function( e ) {
			e.preventDefault();
			var $a = $( this );

			$a.addClass( "current" ).
			siblings().
			removeClass( "current" );

			var page = $a.data( "page" );
			$.get( "ajax.php", { s: page }, function( html ) {
				$( "#content" ).html( html );

			});
		});

	});

})( jQuery );
  </script>
</head>
<body>
	<div id="content">
		<?php
        $db = new DB( 'host', 'username', 'password', 'database' );
		$posts = $db->getResults( "SELECT * FROM posts WHERE post_type = 'post' AND post_status = 'publish' ORDER BY ID DESC LIMIT 3" );
		$allPosts = $db->getResults( "SELECT * FROM posts WHERE post_type = 'post' AND post_status = 'publish' ORDER BY ID" );
		
		$total = $db->numResults;
		$pages = $total / 3;


		$html = '';

		foreach( $posts as $post => $content ) {
			$postContent = $content['post_excerpt'];
			$postTitle = $content['post_title'];
			$date = strtotime( $content['post_date'] );
			$postDate = strftime( '%d-%m-%Y', $date );

			$html .= sprintf( '<h3>%s</h3><small>%s</small><p>%s</p>', $postTitle, $postDate, $postContent );
		}

		echo $html;
		?>
	</div>
	<div id="pagination">
		<?php
			for( $i = 0; $i < $pages; $i++ ) {
				$n = $i + 1;
				$current = ( $n == 1 ) ? ' class="current"' : '';
				echo '<a href="#" data-page="' . $n .'"'. $current . '>' . $n . '</a>';
			}
		?>
	</div>	
</body>
</html>