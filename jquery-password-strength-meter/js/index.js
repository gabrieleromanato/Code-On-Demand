(function( $ ) {

	var PwdMeter = function( element, params ) {

		params = params || {};

		var defaults = {
			minimumChars: 6,
			strengthScaleFactor: 0.7
		};

		this.$element = $( element );
		this.$progress = $( "#password-meter-progress" );
		this.settings = $.extend( defaults, params );

		if( this.$element.length ) {
			this.init();
		}
	};

	PwdMeter.prototype = {
		init: function() {
			var self = this;
			self.$element.complexify( self.settings, function( valid, complexity ) {
				self.progress( complexity, self.$progress );
			});
		},
		progress: function( n, el ) {
			var self = this;
			var amount = parseInt( n, 10 );
			var perc = amount + "%";
			if( amount <= 40 ) {
				el.removeClass().addClass( "low" );
			} else if( amount > 40 && amount <= 60 ) {
				el.removeClass().addClass( "medium" );
			} else if( amount > 60 && amount <= 100 ) {
				el.removeClass().addClass( "high" );
			}
		   	if( amount <= 100 ) {
				el.css( "width", perc );
			}
		}
	};

	$(function() {
		var $meter = new PwdMeter( "#pwd" );
	});

})( jQuery );