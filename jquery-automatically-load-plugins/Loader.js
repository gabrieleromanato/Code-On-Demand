(function( $ ) {
	var Loader = (function() {
		
		
		var getPlugin = function( path, callback ) {
			$.getScript( path, callback );
		};
	
	    var loader = {};
	    
	    loader.addPlugin = function( name, path, options ) {
	    	options = options || {};
	    	loader[name] = {
	    		init: function( element ) {
	    		    getPlugin( path, function() {
	    				$( element )[name]( options );
	    			});
	    		}
	    	}
	    };
	    
	    return loader;
	
	})();
	
	$( document ).ready(function() {
		Loader.addPlugin( "flexslider", "plugins/flexslider/jquery.flexslider.js" );
		Loader.flexslider.init( "#slider" );
	});


})( jQuery );