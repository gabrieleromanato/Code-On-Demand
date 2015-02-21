<?php
function my_ajax_vote() {
        $action_type = $_GET['type']; // Action type
        $post_id = $_GET['id']; // Post ID
        $allowed_types = array( 'bad', 'good' ); // Allowed actions
        
        // Validation
        if( in_array( $action_type, $allowed_types ) && is_numeric( $post_id ) ) {
            $id = (int) $post_id;
            $bad_vote_field = get_post_meta( $id, 'bad_vote', true ); // Negative vote's custom field
            $good_vote_field = get_post_meta( $id, 'good_vote', true ); // Positive vote's custom field
            switch( $action_type ) {
                case 'bad':
                    if( $bad_vote_field == '' ) {
                        update_post_meta( $id, 'bad_vote', '1' );
                    } else {
                         $bad_vote = (int) $bad_vote_field;
                         $bad_vote++;
                         update_post_meta( $id, 'bad_vote', $bad_vote );
                    }
                    break;
                case 'good':
                    if( $good_vote_field == '' ) {
                        update_post_meta( $id, 'good_vote', '1' );
                    } else {
                         $good_vote = (int) $good_vote_field;
                         $good_vote++;
                         update_post_meta( $id, 'good_vote', $good_vote );
                    }
                    break;
                 default:
                    break;
               }
               echo '1';
               exit();
        } else {
            exit();
        }
    }

    add_action( 'wp_ajax_my_vote', 'my_ajax_vote' );
    add_action( 'wp_ajax_nopriv_my_vote', 'my_ajax_vote' );
    
    
    
function my_enqueue_jquery_plugin() {
	if( is_single() ) {
		wp_register_script( 'rate-post', get_template_directory_uri() . '/js/jquery.rate-post.js', array( 'jquery' ), '1.0', true );
		wp_enqueue_script( 'rate-post' );
	}
}

add_action( 'wp_enqueue_scripts', 'my_enqueue_jquery_plugin' );