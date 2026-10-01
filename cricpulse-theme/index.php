<?php
/**
 * CricPulse Main Homepage & Blog Template
 * Displays live scores on top + your WordPress articles/posts below!
 */

get_header();
?>

<!-- Section 1: Live Cricket Matches (Native Scoreboard - Zero iframe dependency!) -->
<section class="cricket-live-ticker-wrap">
    <div class="cricpulse-container">
        <div id="cp-live-root"></div>
    </div>
</section>

<!-- Section 2: WordPress Articles & News Posts -->
<section class="cricpulse-articles-section">
    <div class="cricpulse-container">
        
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
            <h2 style="font-size: 24px; font-weight: 800; color: #ffffff; margin: 0;">
                <?php _e('Latest Cricket Articles & News', 'cricpulse-theme'); ?>
            </h2>
            <span style="font-size: 13px; color: #94a3b8;">
                <?php _e('புதிய செய்திகள் & கட்டுரைகள்', 'cricpulse-theme'); ?>
            </span>
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
                            <span class="article-category">
                                <?php
                                $categories = get_the_category();
                                if (!empty($categories)) {
                                    echo esc_html($categories[0]->name);
                                }
                                ?>
                            </span>

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
                <?php
                the_posts_pagination(array(
                    'prev_text' => __('&laquo; Previous', 'cricpulse-theme'),
                    'next_text' => __('Next &raquo;', 'cricpulse-theme'),
                ));
                ?>
            </div>

        <?php else : ?>
            <div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 40px; text-align: center; margin: 30px 0;">
                <p style="color: #94a3b8; font-size: 15px; margin-bottom: 12px;">
                    <?php _e('இன்னும் கட்டுரைகள் எதுவும் பதிவிடப்படவில்லை (No articles published yet).', 'cricpulse-theme'); ?>
                </p>
                <p style="color: #64748b; font-size: 13px;">
                    <?php _e('WordPress Admin -> Posts -> Add New சென்று உங்கள் முதல் கிரிக்கெட் கட்டுரையை எழுதவும்.', 'cricpulse-theme'); ?>
                </p>
            </div>
        <?php endif; ?>

    </div>
</section>

<?php
get_footer();
