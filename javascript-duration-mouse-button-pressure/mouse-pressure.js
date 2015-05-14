(function() {
	
	var MousePressure = function( element ) {
		this.target = document.querySelector( element );
		if( this.target ) {
			this.init();
		}
	};
	
	MousePressure.prototype = {
		init: function() {
			this.timer = null;
			this.count = 0;
			
			this.watch();
		},
		watch: function() {
			var self = this;
			self.target.addEventListener( "mousedown", function() {
				self.timer = setInterval(function() {
					self.count++;
				}, 1000);
			}, false);
			self.target.addEventListener( "mouseup", function() {
				clearInterval( self.timer );
				var seconds = ( self.count == 1 ) ? "second" : "seconds";
				alert( "You have pressed the mouse button for " + self.count + " " + seconds );
				self.count = 0;
			}, false);
		}
	};
	
	window.MousePressure = MousePressure;
	
})();