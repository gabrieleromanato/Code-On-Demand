(function( $ ) {
	$.fn.gallery = function( options ) {
		options = $.extend({
			ajaxURL: "ajax.php",
			items: 12,
			width: "200",
			height: "150"
		}, options);
		
		var _cacheItems = function( obj ) {
		  if( typeof obj === "object" && sessionStorage.getItem( "items" ) === null ) {
			var json = JSON.stringify( obj.images );
			sessionStorage.setItem( "items", obj.total );
			sessionStorage.setItem( "images", json );
		  }
		};
		
		var _getItems = function() {
		  if( sessionStorage.getItem( "items" ) === null ) {
			$.getJSON( options.ajaxURL, function( json ) {
				_cacheItems( json );
			});
		  }
		};
		
		var _paginate = function( element ) {
			var items = sessionStorage.getItem( "items" );
			if( items !== null ) {
				var pages = Math.floor( items / options.items );
				var $pagination = $( "<div id='pagination'/>" );
				var offset = 0;
				var html = "";
				var start = 0;
				
				
				for( var i = 0; i < pages; ++i ) {
					var n = i + 1;
					offset += ( options.items - 1 );
					if( i > 0 ) {
						start += ( options.items - 1 );
					}
					var current = ( n == 1 ) ? " class='current' " : "";
					html += "<a href='#'" + current + "data-start='" + start + "' data-end='" + offset + "'>" + n + "</a>";
				}
				
				$pagination.html( html ).appendTo( element.parent() );
			}
		};
		
		var _displayImages = function( element, start, end ) {
			var images = sessionStorage.getItem( "images" );
			if( images !== null ) {
				var imgs = JSON.parse( images );
				var s = ( start != 0 ) ? start - 1 : start;
				var e = end;
				var slices = imgs.slice( s, e );
				var html = "";
				
				for( var i = 0; i < slices.length; ++i ) {
					var img = slices[i];
					var url = img.url;
					
					html += "<li><img src='" + url + "' width='" + options.width + "' height='" + options.height + "' /></li>";
				}
				
				element.html( html );
				
			}
		};
		
		return this.each(function() {
			var $element = $( this );
			$.when( _getItems() ).done(function() {
				_paginate( $element );
				_displayImages( $element, 0, options.items );
				
				$( "a", "#pagination" ).on( "click", function( e ) {
					e.preventDefault();
					var start = $( this ).data( "start" );
					var end = $( this ).data( "end" );
					_displayImages( $element, start, end );
					$( this ).addClass( "current" ).siblings().removeClass( "current" );
				});
				
			});
		});
		
	};
	
	$(function() {
		$( "#gallery" ).gallery();
	});

})( jQuery );