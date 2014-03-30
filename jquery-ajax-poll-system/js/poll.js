(function( $ ) {
	$.Poll = function( element ) {
		this.$element = $( element );
		this.init();	
	}
	
	$.Poll.prototype = {
	
	  init: function() {
		this.$forms = this.$element.find( ".poll-form" );
		
		this.display();
		this.vote();
	  },
	  
	  display: function() {
		  $.ajax({
			  	type: "POST",
				dataType: "json",
				url: "ajax.php",
				data: {
					action: "display",
				},
				success: function( data ) {
					var results = data.results;
					if( $.isArray( results ) ) {
						for( var i = 0; i < results.length; ++i ) {
							var result = results[i];
							var id = result.id;
							var vote = result.vote;
							
							$( id ).find( ".votes > strong" ).text( vote );
						}
					}
				}  
			  
		  });
	  },
	  
	  vote: function() {
		  var self = this;
		  self.$forms.on( "submit", function( e ) {
			 e.preventDefault();
			 var $form = $( this );
			 var vote = $( ".vote", $form ).val();
			 var postID = $form.parents( ".post" ).attr( "id" );
			 var id = postID.replace( "p-", "" );
			 var $votes = $form.next().find( "strong" );
			 
			 $.ajax({
				type: "POST",
				dataType: "json",
				url: "ajax.php",
				data: {
					action: "vote",
				 	vote: vote,
				 	id: id	
				},
				success: function( data ) {
					var currentVote = data.vote;
					if( typeof currentVote !== "undefined" ) {
						$votes.text( currentVote );
					}
				}
			 });
			  
			  
		  });
	  }
		
	};
	
	$(function() {
		var $poll = new $.Poll( "#content" );
		
	});
	
})( jQuery );