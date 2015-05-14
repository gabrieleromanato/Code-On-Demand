(function() {
	
	var Mapper = function( element, options ) {
		this.map = element;
		this.options = options;
		this.gmap = null;
		
		if( this.map && google ) {
			this.init();
		}
	};
	
	Mapper.prototype = {
		init: function() {
			this.gmap = new google.maps.Map( this.map, this.options );
		},
		getPlace: function( place ) {
			var self = this,
				geocoder,
				infoWindow,
				marker;
				
				if( !geocoder ) {
					geocoder = new google.maps.Geocoder();	
        		}
        		
        		var geocoderRequest = {
					address: place
        		};
        		
        		geocoder.geocode( geocoderRequest, function( results, status ) {
        
        
					if ( status == google.maps.GeocoderStatus.OK ) {

            
					self.gmap.setCenter( results[0].geometry.location );

        
					if ( !marker ) {
         
						marker = new google.maps.Marker({
							map: self.gmap
                 		});
               		}
        
        
			   		marker.setPosition( results[0].geometry.location );

       
			   		if ( !infoWindow ) {
       
			   			infoWindow = new google.maps.InfoWindow();
        			}

        
					var content = "<strong>" + results[0].formatted_address + "</strong><br />";
        

        
					infoWindow.setContent( content );

       
					infoWindow.open( self.gmap, marker );


        		}
        
        
        	});

		}	
	};
	
	window.Mapper = Mapper;
	
})();