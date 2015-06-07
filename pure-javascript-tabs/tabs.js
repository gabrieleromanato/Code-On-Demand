(function() {
	
	var Tabs = function( elements ) {
		this.tabs = document.querySelectorAll( elements );
		this.links = document.querySelectorAll( "#tabs-nav a" );
		
		if( this.tabs.length > 0 && this.links.length > 0 ) {
			this.init();
		}
	};
	
	Tabs.prototype = {
		init: function() {
			var self = this;
			for( var i = 0; i < self.links.length; ++i ) {
				var link = self.links[i];
				link.addEventListener( "click", function( e ) {
					e.preventDefault();
					var a = this;
					var currentTab = document.querySelector( a.hash );
					
					self.hideExcept( currentTab );
					self.show( currentTab );
					self.handleClass( a );
					a.className = "current-tab";
					
				}, false);
			}		

				
		},
		handleClass: function( element ) {
			var self = this;
			for( var i = 0; i < self.links.length; ++i ) {
				var link = self.links[i];
				if( link !== element ) {
					link.className = "";
				}	
			}		
		},
		hideExcept: function( element ) {
			var self = this;
			for( var i = 0; i < self.tabs.length; ++i ) {
				var tab = self.tabs[i];
				if( tab !== element ) {
					self.hide( tab );
				}	
			}
		},
		hide: function( element ) {
			element.style.opacity = 0;
			setTimeout(function() {
				element.style.display = "none";
			}, 500);
		},
		show: function( element ) {
			setTimeout(function() {
				element.style.display = "block";
				element.style.opacity = 1;
			}, 500);
		}
	};
	
	document.addEventListener( "DOMContentLoaded", function() {
		var tabsInst = new Tabs( "#tabs-content .tab" );
		
	});
	
})();