<?php
/**
 * Standard WordPress Page Template
 * Used when you create pages in WordPress Admin -> Pages -> Add New.
 */

get_header();
?>

<div class="cricpulse-container">
    <main class="single-post-container" style="background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 40px; margin: 40px auto;">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                
                <header class="entry-header" style="margin-bottom: 24px; border-bottom: 1px solid #1e293b; padding-bottom: 16px;">
                    <h1 class="single-post-title" style="margin: 0;"><?php the_title(); ?></h1>
                </header>

                <?php if (has_post_thumbnail()) : ?>
                    <div class="single-post-featured-image">
                        <?php the_post_thumbnail('large', array('style' => 'width: 100%; border-radius: 12px; margin-bottom: 24px;')); ?>
                    </div>
                <?php endif; ?>

                <div class="entry-content">
                    <?php the_content(); ?>
                </div>

            </article>
        <?php endwhile; ?>
    </main>
</div>

<?php
get_footer();
