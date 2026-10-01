<?php
/**
 * Category & Tag Archive Template
 */

get_header();
?>

<div class="cricpulse-container">
    <div style="margin: 40px 0 20px;">
        <h1 style="font-size: 28px; font-weight: 800; color: #fff; margin: 0 0 8px;">
            <?php the_archive_title(); ?>
        </h1>
        <div style="color: #94a3b8; font-size: 14px;">
            <?php the_archive_description(); ?>
        </div>
    </div>

    <?php if (have_posts()) : ?>
        <div class="article-grid">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('article-card'); ?>>
                    <?php if (has_post_thumbnail()) : ?>
                        <a href="<?php the_permalink(); ?>">
                            <?php the_post_thumbnail('medium_large', array('class' => 'article-thumbnail')); ?>
                        </a>
                    <?php endif; ?>

                    <div class="article-content">
                        <h3 class="article-title">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h3>
                        <div class="article-excerpt">
                            <?php echo wp_trim_words(get_the_excerpt(), 18, '...'); ?>
                        </div>
                        <div class="article-meta">
                            <span><?php echo get_the_date(); ?></span>
                            <span><?php the_author(); ?></span>
                        </div>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>

        <div style="margin: 40px 0; text-align: center;">
            <?php the_posts_pagination(); ?>
        </div>
    <?php endif; ?>
</div>

<?php
get_footer();
