<article class="post">
        <!-- post content -->
        <div class="rating">
	        <?php $good = ( get_post_meta( get_the_ID(), 'good_vote', true ) !== '' ) ? get_post_meta( get_the_ID(), 'good_vote', true ) : '0';
	              $bad = ( get_post_meta( get_the_ID(), 'bad_vote', true ) !== '' ) ? get_post_meta( get_the_ID(), 'bad_vote', true ) : '0';
	         ?>
             <p>How do you rate this post?</p>
             <div class="rating-buttons">
                 <a class="good-btn" href="#" data-postid="<?php the_ID(); ?>" data-type="good">Good 
	                 <span class="rate-count"><?php echo $good; ?></span></a>
                  <a class="bad-btn" href="#" data-postid="<?php the_ID(); ?>" data-type="bad">Bad 
	                  <span class="rate-count"><?php echo $bad; ?></span></a>
             </div>
        </div>
    </article>
