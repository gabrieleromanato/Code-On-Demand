(function() {
	var Slideshow = function( element ) {
		this.el = document.querySelector( element );
		if( this.el ) {
			this.init();
		}
	};
	
	Slideshow.prototype = {
		init: function() {
			this.wrapper = this.el.querySelector( "#slideshow-wrapper" );
			this.slides = this.wrapper.querySelectorAll( "img" );
			this.previous = this.el.querySelector( "#slideshow-previous" );
			this.next = this.el.querySelector( "#slideshow-next" );
			this.thumbs = this.el.querySelectorAll( "#slideshow-thumbs a" );
			
			this.currentSlide = 0;
			
			this.setup();
			this.actions();
			this.thumbNavigation();
		},
		setup: function() {
			var self = this,
				links = self.thumbs,
				slides = self.slides,
				len = links.length,
				slideLen = slides.length,
				i,
				j,
				slideArr = [];
			
			for( i = 0; i < len; ++i ) {
				var link = links[i];
				link.setAttribute( "data-slide", i );
			}
			
			for( j = 0; j < slideLen; ++j ) {
				var slide = slides[j];
				var n = j + 1;
				if( n > 1 ) {
					slideArr.push( slide );
				} else {
					slide.setAttribute( "data-offset", 0 );
				}
				
			}
			
			for( var k = 0; k < slideArr.length; ++k ) {
				var h = k + 1;
				var s = slideArr[k];
				self._getSlideWidth( s, h );
			}	
		},
		actions: function() {
			var self = this;
			self.previous.addEventListener( "click", function( e ) {
				e.preventDefault();
				self.previousSlide();
			}, false);
			self.next.addEventListener( "click", function( e ) {
				e.preventDefault();
				self.nextSlide();
			}, false);	
		},
		nextSlide: function() {
			var self = this;
			self.currentSlide++;
			if( self.currentSlide == self.slides.length ) {
				self.currentSlide = self.slides.length - 1;
			}
			self._slideTo( self.currentSlide );
		},
		previousSlide: function() {
			var self = this;
			self.currentSlide--;
			if( self.currentSlide == 0 ) {
				self.currentSlide = 0;
			}
			self._slideTo( self.currentSlide );	
		},
		thumbNavigation: function() {
			var self = this,
				links = self.thumbs,
				len = links.length,
				i;
			for( i = 0; i < len; ++i ) {
				var link = links[i];
				link.addEventListener( "click", function( e ) {
					e.preventDefault();
					var slide = parseInt( this.getAttribute( "data-slide" ), 10 );
					self.currentSlide = slide;
					self._slideTo( self.currentSlide );
					
				}, false);
			}	
		},
		_slideTo: function( slide ) {
			var self = this;
			var left = self.slides[slide].getAttribute( "data-offset" );
			self.wrapper.style.transform = "translateX(-" + left + "px)";
		},
		_getSlideWidth: function( slide, n ) {
			slide.addEventListener( "load", function() {
				if( this.complete ) {
					this.setAttribute( "data-offset", this.offsetWidth * n );
				}	
			});
		}
	};
	
	
	window.Slideshow = Slideshow;
	
})();