(function() {
	
	var FormSerializer = function( element ) {
		this.form = element;
		this.queryString = "";
	};
	
	FormSerializer.prototype = {
		
		serialize: function() {
			var elems = this.form.elements,
				serialized = [], 
				i, 
				len = elems.length, 
				str = "";
				
				for( i = 0; i < len; ++i ) {
  
					var element = elems[i],
						type = element.type,
						name = element.name,
						value = element.value;
    
					switch( type ) {
    
						case "text":
						case "radio":
						case "checkbox":
						case "textarea":
						case "select-one":
      
						str = name + "=" + encodeURIComponent( value );
      
						serialized.push( str );
      
							break;
      
						default:
      
      
							break;
        
    				}    
  
  				}
  				
  				this.queryString = serialized.join( "&" );

			
		},
		toString: function() {
			this.serialize();
			return this.queryString;
		}
	};
	
	window.FormSerializer = FormSerializer;
	
})();