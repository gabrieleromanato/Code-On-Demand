(function( $ ) {
	$.fn.facebook = function( options ) {
		options = $.extend({
			url: "json.php",
			pageID: "315199031854016",
			limit: 5,
			loader: "#loader"
		}, options);
		
		var _parseData = function( json ) {
			var html = "";
			if( json && json.entries.length > 0 ) {
				var entries = json.entries;
				
				for( var i = 0; i < entries.length; ++i ) {
					var entry = entries[i];
					var n = i + 1;
					if( n <= options.limit ) {
						html += "<div class='facebook-status'>";
						html += entry.content;
						html += "</div>";
					}
				}
			}
			
			return html;	
		};
		
		var _getData = function( element ) {
			$.getJSON( options.url, { id: options.pageID }, function( data ) {
				$( options.loader, element ).hide();
				var contents = _parseData( data );
				element.html( contents );
			});
		};
		
		return this.each(function() {
			var $element = $( this );
			_getData( $element );
		});
	};
	
})( jQuery );