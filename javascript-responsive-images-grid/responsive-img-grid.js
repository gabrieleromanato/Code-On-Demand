(function() {
	var Grid = function( element ) {
		this.grid = document.querySelector( element );
		if( this.grid ) {
			this.init();
		}	
	};
	
	Grid.prototype = {
		init: function() {
			this.images = this.grid.querySelectorAll( ".image" );
			this.setImages();
		},
		setImages: function() {
			var self = this;
			for( var i = 0; i < self.images.length; ++i ) {
				var image = self.images[i],
					totalWidth = self.grid.offsetWidth,
					img = image.querySelector( "img" ),
					width = parseInt( img.getAttribute( "width" ), 10 ),
					perc = ( width / totalWidth ) * 100;
					
					image.style.width = perc.toFixed( 2 ) + "%";
			}
		}
	};
	
	window.Grid = Grid;
	
})();