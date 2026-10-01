<?php
/**
 * Single Article / Post Template
 * Allows users to read complete blog posts, news, and match analyses with comments.
 */

get_header();
?>

<div class="cricpulse-container">
    <main class="single-post-container">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                
                <header class="entry-header">
                    <span class="article-category">
                        <?php
                        $categories = get_the_category();
                        if (!empty($categories)) {
                            echo esc_html($categories[0]->name);
                        }
                        ?>
                    </span>

                    <h1 class="single-post-title"><?php the_title(); ?></h1>

                    <div class="single-post-meta">
                        <span><?php _e('By', 'cricpulse-theme'); ?> <strong><?php the_author(); ?></strong></span> &bull;
                        <span><?php echo get_the_date(); ?></span> &bull;
                        <span><?php comments_number('0 Comments', '1 Comment', '% Comments'); ?></span>
                    </div>
                </header>

                <?php if (has_post_thumbnail()) : ?>
                    <div class="single-post-featured-image">
                        <?php the_post_thumbnail('large', array('style' => 'width: 100%; border-radius: 16px; display: block;')); ?>
                    </div>
                <?php endif; ?>

                <div class="entry-content">
                    <?php the_content(); ?>
                </div>

                <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #1e293b;">
                    <?php the_tags('<div style="font-size: 13px; color: #94a3b8;">Tags: ', ', ', '</div>'); ?>
                </footer>

                <?php
                // Comments template
                if (comments_open() || get_comments_number()) :
                    comments_template();
                endif;
                ?>

            </article>
        <?php endwhile; ?>
    </main>
</div>

<?php
get_footer();
