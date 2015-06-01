(function() {
	
	var DOM = {
		next: function( element ) {
			var el = null;
			if( element.nextElementSibling ) {
				el = element.nextElementSibling;
			}
			return el;
		}, 
		prev: function( element ) {
			var el = null;
			if( element.previousElementSibling ) {
				el = element.previousElementSibling;
			}
			return el;
		}
	};
	
	var Parallax = function( elements ) {
		this.sections = document.querySelectorAll( elements );
		if( this.sections.length > 0 ) {
			this.init();
		}	
	};

	Parallax.prototype = {
		init: function() {
			this.setSectionsIDs();
			this.setSectionsHeight();
			this.createNavigation();
			this.positionNavigation();
			this.useNavigation();
			this.mouseScroll();
		},
		mouseScroll: function() {
			var self = this;
			var wrapper = document;
			
			self.sections[0].classList.add( "active" );
			
			wrapper.addEventListener( "mousewheel", function( e ) {
				self._mouseHandler( e );
			});
			
			wrapper.addEventListener( "DOMMouseScroll", function( e ) {
				self._mouseHandler( e );
			});		
		},
		useNavigation: function() {
			var links = document.querySelectorAll( "#parallax-navigation a" );
			var self = this;
			for( var i = 0; i < links.length; ++i ) {
				var link = links[i];
				link.addEventListener( "click", function( e ) {
					e.preventDefault();
					var a = this;
					
					a.className = "parallax-navigation-current";
					
					for( var j = 0; j < links.length; ++j ) {
						var el = links[j];
						if( el !== a ) {
							el.className = "";
						}	
					}
					
					var section = document.querySelector( a.hash );
					section.classList.add( "active" );
					
					for( var k = 0; k < self.sections.length; ++k ) {
						var sec = self.sections[k];
						if( sec !== section ) {
							sec.classList.remove( "active" );
						}	
					}
					
					
					self._scrollToSection( section );
					
				}, false);
			}	
		},
		positionNavigation: function() {
			var nav = document.getElementById( "parallax-navigation" );
			var height = nav.offsetHeight;
			nav.style.marginTop = "-" + ( height / 2 ) + "px";	
		},
		createNavigation: function() {
			var nav = document.createElement( "div" );
			var html = "";
			
			nav.id = "parallax-navigation";
			document.body.appendChild( nav );
			
			for( var i = 0; i < this.sections.length; ++i ) {
				var sec = this.sections[i];
				var id = sec.id;
				html += "<a href='#" + id + "'>" + ( i + 1 ) + "</a>";
			}
			
			document.getElementById( "parallax-navigation" ).innerHTML = html;	
				
		},
		setSectionsHeight: function() {
			var height = window.innerHeight;
			for( var i = 0; i < this.sections.length; ++i ) {
				var sec = this.sections[i];
				sec.style.height = height + "px";
			}	
		},
		setSectionsIDs: function() {
			for( var i = 0; i < this.sections.length; ++i ) {
				var sec = this.sections[i];
				sec.setAttribute( "id", "section-" + ( i + 1 ) );
			}	
		},
		_scrollToSection: function( element ) {
			var site = document.querySelector( "#site" );
			site.style.transform = "translateY(-" + element.offsetTop + "px)";
		},
		_mouseHandler: function( e ) {
			
			e.preventDefault();
			
			var self = this;
			var delta = e.detail < 0 || e.wheelDelta > 0 ? 1 : -1;
			var active = document.querySelector( ".active" );
			var links = document.querySelectorAll( "#parallax-navigation a" );
			
			if ( delta < 0 ) {
				var next = DOM.next( active );
				if( next ) {
					var timer = setTimeout(function () {
						self._scrollToSection( next );
						
						next.classList.add( "active" );
						
						for( var i = 0; i < self.sections.length; ++i ) {
							var sec = self.sections[i];
							if( sec !== next ) {
								sec.classList.remove( "active" );
							}	
						}
						
						var a = document.querySelector( "a[href='#" + next.id + "']" );
						
						a.className = "parallax-navigation-current";
					
						for( var j = 0; j < links.length; ++j ) {
							var el = links[j];
							if( el !== a ) {
								el.className = "";
							}	
						}
						
						
						clearTimeout( timer );
						
					}, 500);
				}	
			} else {
				var prev = DOM.prev( active );
				if( prev ) {
					var timer = setTimeout(function () {
						self._scrollToSection( prev );
						
						prev.classList.add( "active" );
						
						for( var i = 0; i < self.sections.length; ++i ) {
							var sec = self.sections[i];
							if( sec !== prev ) {
								sec.classList.remove( "active" );
							}	
						}
						
						var a = document.querySelector( "a[href='#" + prev.id + "']" );
						
						a.className = "parallax-navigation-current";
					
						for( var j = 0; j < links.length; ++j ) {
							var el = links[j];
							if( el !== a ) {
								el.className = "";
							}	
						}
						
						
						clearTimeout( timer );
						
					}, 500);
				}	
	
			}
		}
	};
	
	document.addEventListener( "DOMContentLoaded", function() {
		var parallaxScroll = new Parallax( ".page-section" );
		
	});
	
	
})();