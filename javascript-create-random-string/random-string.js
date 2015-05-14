(function() {
	
	var RandomString = function( length ) {
		this.length = length;
		this.str = "";
		this.create();
	};
	
	RandomString.prototype = {
		create: function() {
			this.str = this._rand( this.length );	
		},
		_rand: function( len ) {
			var str = "";
			for ( ; str.length < this.length; str += Math.random().toString( 36 ).substr( 2 ) );
			return str.substr( 0, this.length );
		},
		toString: function() {
			return this.str;
		}
	};
	
	window.RandomString = RandomString;
	
})();