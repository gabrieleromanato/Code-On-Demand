(function() {
	var Divider = function( element, options ) {
		this.image = element;
		this.parts = options.parts;
		this.speed = options.speed;
		this.offset = options.offset;
		
		this.width = 0;
		this.height = 0;
		
		if( this.image ) {
			this.init();
		}	
	};
	
	Divider.prototype = {
		init: function() {
			this.load();
			
		},
		load: function() {
			var self = this;
			self.image.addEventListener( "load", function() {
				if( self.image.complete ) {
					self.width = self.image.offsetWidth;
					self.height = self.image.offsetHeight;
					
					self.create( self.width, self.height );
				}
			}, false);	
		},
		create: function( width, height ) {	
			var self = this;
			var imgWidth = ( width / 2 ) - self.offset;
			var imgHeight = height / 2;
			var src = self.image.getAttribute( "src" );
			for( var i = 0; i < self.parts; ++i ) {
				var part = document.createElement( "div" );
				part.className = "image";
				part.style.width = imgWidth + "px";
				part.style.height = imgHeight + "px";
				part.style.backgroundImage = "url(" + src + ")";
				
				document.querySelector( "#images" ).appendChild( part );	
			}
		}
	};
	
	document.addEventListener( "DOMContentLoaded", function() {
		var img = document.querySelector( "#image img" );
		var div = new Divider( img, { parts: 4, speed: 500, offset: 10 } );
	});
	
})();