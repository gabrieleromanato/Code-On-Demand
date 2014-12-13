(function( $ ) {
	
	$.fn.timeline = function( options ) {
		options = $.extend({
			url: "lib/ajax.php",
			query: "jquery",
			limit: 5,
			interval: 3000,
		}, options);	
		
		
		
		function Tweet( str, time, username ) {
			this.str = str;
			this.time = time;
			this.username = username;
			this.html = "";
		}
		
		Tweet.prototype = {
			format: function( tweetStr ) {
				var replaced = tweetStr.replace( /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi, '<a href="$1">$1</a>' ).
				replace( /(^|\s)#(\w+)/g, '$1<a href="https://twitter.com/search?q=%23$2&src=hash">#$2</a>' ).
				replace( /(^|\s)@(\w+)/g, '$1<a href="https://twitter.com/$2">@$2</a>' );
				return replaced;	
			},
			relativeTime: function( value ) {
				var values = value.split( " " );
				value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
				
				var parsedDate = Date.parse( value );
				var relativeTo = ( arguments.length > 1 ) ? arguments[1] : new Date();
				var delta = parseInt( ( relativeTo.getTime() - parsedDate ) / 1000 );
				delta = delta + ( relativeTo.getTimezoneOffset() * 60 );
				
				if ( delta < 60 ) {
					return "less than a minute ago";
					
				} else if ( delta < 120 ) {
					return "about a minute ago";
					
				} else if ( delta < ( 60 * 60 ) ) {
					return ( parseInt(delta / 60)).toString() + " minutes ago";
					
				} else if ( delta < ( 120 * 60 ) ) {
					return "about an hour ago";
					
				} else if ( delta < ( 24 * 60 * 60 ) ) {
					return "about " + ( parseInt( delta / 3600 ) ).toString() + " hours ago";
					
				} else if ( delta < ( 48 * 60 * 60 ) ) {
					return "1 day ago";
					
				} else {
					return ( parseInt( delta / 86400 ) ).toString() + " days ago";
					
				}
	
			},
			toString: function() {
				var htmlStr = "<div class='tweet'>";
					htmlStr += "<div class='tweet-head'>";
					htmlStr += "<strong>@" + this.username + "</strong>";
					htmlStr += "<span class='timestamp'>" + this.relativeTime( this.time ) + "</span>";
					htmlStr += "</div>";
					htmlStr += "<div class='tweet-body'>" + this.format( this.str ) + "</div>";
					htmlStr += "</div>";
					
					this.html = htmlStr;
					
					return this.html;	
			}
		};
		
		
		function Timeline( element ) {
			this.element = element;
			this.timer = null;
			
			this.init();
		}
		
		Timeline.prototype = {
			init: function() {
				this.getTweets();
				this.schedule();	
			},
			schedule: function() {
				var self = this;
				self.timer = setTimeout(function() {
					
					self.getTweets();
					
					setTimeout(function() {
						
						self.schedule();
						
					}, options.interval);
					
										
				}, options.interval);	
			},
			getTweets: function() {
				var data = {
					q: options.query,
					count: options.limit
				},
				self = this,
				html = "";
				
			  				
				$.getJSON( options.url, data, function( json ) {
					html += "<ul class='timeline-wrapper'>";
					var statuses = json.statuses;
					if( statuses ) {
						for( var i = 0; i < statuses.length; ++i ) {
							var status = statuses[i],
								time = status.created_at,
								text = status.text,
								user = status.user.screen_name,
								tweet = new Tweet( text, time, user );
								
								html += "<li>" + tweet.toString() + "</li>";
								
						}
					}
					html += "</ul>";
					if( sessionStorage.getItem( "twitter-timeline" ) === null ) {
						sessionStorage.setItem( "twitter-timeline", html );
						self.element.html( html );	
					} else {
						var cachedTimeline = sessionStorage.getItem( "twitter-timeline" );
						if( html !== cachedTimeline ) {
							var updatedHTML = html.replace( "timeline-wrapper", "timeline-wrapper updated" );
							sessionStorage.setItem( "twitter-timeline", html );
							self.element.html( updatedHTML );
						} else {
							self.element.html( sessionStorage.getItem( "twitter-timeline" ) );	
						}
					}
						
				});
				
		  }	
		};
		
		return this.each(function() {
			var $element = $( this );
			if( !$element.data( "timeline" ) ) {
				var tweets = new Timeline( $element );
				$element.data( "timeline", tweets );
			}
			
		});
	};
	
})( jQuery );