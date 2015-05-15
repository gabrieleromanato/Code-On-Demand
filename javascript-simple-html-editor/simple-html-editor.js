(function() {
	
	function Editor( element ) {
		this.el = document.getElementById( element );
		this.init();
	}
	
	Editor.prototype = {
		init: function() {
			this.buttons = [];
		},
		addButton: function( btn ) {
			var button = document.querySelector( btn );
			this.buttons.push( button );
		},
		_addEvent: function( element, evt, callback ) {
			element.addEventListener( evt, function( e ) {
				e.preventDefault();
				callback( element );
			}, false);
		},
		addAction: function( evtype, action ) {
			var self = this;
			for( var i = 0; i < self.buttons.length; ++i ) {
				var but = self.buttons[i];
				self._addEvent( but, evtype, action );
			}	
		}
	};
	
	document.addEventListener( "DOMContentLoaded", function() {
		var myEditor = new Editor( "editor" );
		myEditor.addButton( "#bold" );
		myEditor.addButton( "#italic" );
		myEditor.addButton( "#blockquote" );
		
		myEditor.addAction( "click", function( bt ) {
			var id = bt.getAttribute( "id" );
			var html = "";
			var textarea = document.querySelector( "#html" );
			var value = textarea.value;
			var startPos = textarea.selectionStart;
			var endPos = textarea.selectionEnd;
			var selectedText = value.substring( startPos, endPos );
			
			switch( id ) {
				case "bold":
					html = "<strong>" + selectedText + "</strong>";
					break;
				case "italic":
					html = "<em>" + selectedText + "</em>";
					break;
				case "blockquote":
				    html = "<blockquote>" + selectedText + "</blockquote>";
				    break;
				default:
					break;
			}
			
			textarea.value = value.replace( selectedText, html );
		});
		
	});
	
	
})();
