(function() {
	
	var LavaLamp = function( element ) {
		this.menu = document.querySelector( element );
		if( this.menu ) {
			this.init();
		}	
	};
	
	LavaLamp.prototype = {
		init: function() {
			this.create();
			this.move();	
		},
		create: function() {
			var self = this,
				current = self.menu.querySelector( ".current-menu-item" ),
				currentWidth = current.offsetWidth,
				rect = current.getBoundingClientRect();
				currentTop = current.offsetHeight,
				currentLeft = rect.left,
				lava = document.createElement( "div" );
				
				lava.id = "lava";
				lava.style.width = currentWidth + "px";
				lava.style.top = currentTop + "px";
				lava.style.left = currentLeft + "px";
				
				self.menu.appendChild( lava );
		},
		move: function() {
			var self = this,
				items = self.menu.querySelectorAll( "li" ),
				i,
				len = items.length,
				lava = document.querySelector( "#lava" );
			
				for( i = 0; i < len; ++i ) {
					var item = items[i];
					item.addEventListener( "mouseover", function() {
						var width = this.offsetWidth,
							rect = this.getBoundingClientRect(),
							top = this.offsetHeight,
							left = rect.left;
							
							lava.style.width = width + "px";
							lava.style.top = top + "px";
							lava.style.left = left + "px";
								
					}, false);
				}
		}
	};
	
	window.LavaLamp = LavaLamp;
	
})();