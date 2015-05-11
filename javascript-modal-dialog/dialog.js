(function() {
	
	function ConfirmBox( element, params ) {
		this.element = element;
		this.params = params || {};
		this.params.ok = params.ok || function() {};
		this.params.cancel = params.cancel || function() {};
		
		this.init();
	}
	
	ConfirmBox.prototype = {
		init: function() {
			this.instance = null;
			this.create();
			this.layout();
			this.actions();
		},
		create: function() {
		  if( document.querySelector( "#confirm-wrapper" ) === null ) {
			var wrapper = document.createElement( "div" );
				wrapper.id = "confirm-wrapper";
			var html = "<div id='confirm-box'><h2 id='confirm-header'></h2>";
				html += "<div id='confirm-buttons'><button id='confirm-ok'>OK</button><button type='button' id='confirm-cancel'>Cancel</button></div>";
				html += "</div>";
				
				wrapper.innerHTML = html;
				document.body.appendChild( wrapper );
		  }
		  
		  this.instance = document.querySelector( "#confirm-wrapper" );
		},
		layout: function() {
			var wrapper = this.instance;
			var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			
			wrapper.style.height = winHeight + "px";	
		},
		show: function( element ) {
			element.style.display = "block";
			element.style.opacity = 1;
		},
		hide: function( element ) {
			element.style.opacity = 0;
			setTimeout(function() {
				element.style.display = "none";
			}, 1000);
		},
		actions: function() {
			var self = this;
			self.element.addEventListener( "click", function() {
				self.instance.querySelector( "#confirm-header" ).innerHTML = self.element.dataset.question;
				self.show( self.instance );
			}, false);
			
			self.instance.querySelector( "#confirm-ok" ).
			addEventListener( "click", function() {
				self.hide( self.instance );
				setTimeout(function() {
					self.params.ok();
				}, 1000);
			}, false);
			
			
			self.instance.querySelector( "#confirm-cancel" ).
			addEventListener( "click", function() {
				self.hide( self.instance );
				setTimeout(function() {
					self.params.cancel();
				}, 1000);
			}, false);
		}
	};

	window.ConfirmBox = ConfirmBox;
})();