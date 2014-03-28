(function( $ ) {
	$.AutoProducts = function( element ) {
		this.$element = $( element );
		this.init();
	}
	
	$.AutoProducts.prototype = {
		init: function() {
			this.$code = this.$element.find( "#code" );
			this.$name = this.$element.find( "#name" );
			this.$price = this.$element.find( "#price" );
			this.$codeList = this.$element.find( "#codes" );
			this.codes = [];
			
			this.getCodes();
			this.handleInput();
		},
		_getData: function( value ) {
			var self = this;
			$.getJSON( "ajax.php", { code: value }, function( data ) {
				var name = data.name;
				var price = data.price;
				if( typeof name !== "undefined" && typeof price !== "undefined" ) {	
					self.$name.html( "<strong>" + name + "</strong>" );
					self.$price.html( "&euro; " + price );
				}
				
			});
		},
		getCodes: function() {
			var self = this;
			self.$codeList.find( "li" ).each(function() {
				var code = $.trim( $( this ).text() );
				self.codes.push( code );
			});
		},
		handleInput: function() {
			var self = this;
			self.$code.on( "keyup paste", function() {
				var value = $.trim( $( this ).val() );
				if( $.inArray( value, self.codes ) != -1 ) {
					self._getData( value );
				}
			});
		}
	};
	
	$(function() {
		var $auto = new $.AutoProducts( "#cart" );
	
	});

})( jQuery );