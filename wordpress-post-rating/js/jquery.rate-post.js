(function( $ ) {
        $.fn.ratePost = function( options ) {
            options = $.extend({
                 action: "my_vote",
                 count: ".rate-count"
            }, options);
            
            return this.each(function() {
                var $element = $( this ),
                    url = "http://" + location.host + "/wp-admin/admin-ajax.php",
                    postID = $element.data( "postid" ),
                    type = $element.data( "type" ),
                    data = {
                       action: options.action,
                       id: postID,
                       type: type
                     },
                     $count = $( options.count, $element );
                     
                     $element.on( "click", function( e ) {
                         e.preventDefault();
                         $.when( $.get( url, data ) ).done(function( output ) {
						 	if( output == "1" ) {
                            	var count = parseInt( $count.text(), 10 );
                            	var n = count++;
                            	$count.text( n.toString() );  
						 	}
						 });
                      });
               });
        };
        
        $(function() {
	$( "a", ".rating-buttons" ).ratePost();	
	
});
        
})( jQuery );
