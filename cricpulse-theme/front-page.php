<?php
/**
 * CricPulse Dedicated Front Page Template
 * - Displays the Cricket Live Scoreboard & Spotlight exactly as styled.
 * - Displays Published WordPress Articles below if the user has written any posts!
 */

get_header();
?>

<?php
$display_mode = get_option('cricpulse_display_mode', 'native');
$app_url = get_option('cricpulse_app_url', 'https://ais-pre-2o57fbonje7loyq5igc76m-277269373849.asia-east1.run.app');
?>

<!-- Section 1: Live Cricket Matches App (Exact Match to Demo & Screenshot) -->
<section class="cricket-live-ticker-wrap" style="padding: 24px 0 30px;">
    <div class="cricpulse-container">
        <?php if ($display_mode === 'full_app') : ?>
            <div style="width: 100%; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 35px rgba(0,0,0,0.5); background: #020617;">
                <iframe src="<?php echo esc_url($app_url); ?>" style="width: 100%; height: 950px; border: none; display: block;" allow="autoplay; clipboard-write; microphone" loading="lazy" title="CricPulse Live Cricket"></iframe>
            </div>
        <?php else : ?>
            <div id="cp-live-root"></div>
        <?php endif; ?>
    </div>
</section>

<!-- Section 2: WordPress Articles & News Posts (Appears dynamically when user publishes posts) -->
<?php
$articles_query = new WP_Query(array(
    'posts_per_page'      => 6,
    'post_status'         => 'publish',
    'ignore_sticky_posts' => 1,
));

if ($articles_query->have_posts()) :
?>
<section class="cricpulse-articles-section" style="padding: 20px 0 50px;">
    <div class="cricpulse-container">
        
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; border-bottom: 1px solid #1e293b; padding-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 24px;">📰</span>
                <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin: 0;">
                    <?php _e('Latest Cricket Articles & News', 'cricpulse-theme'); ?>
                </h2>
            </div>
            <span style="font-size: 13px; color: #34d399; font-weight: 700;">
                <?php _e('புதிய செய்திகள் & கட்டுரைகள்', 'cricpulse-theme'); ?>
            </span>
        </div>

        <div class="article-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
            <?php while ($articles_query->have_posts()) : $articles_query->the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('article-card'); ?> style="background: #0f172a; border: 1px solid #1e293b; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, border-color 0.2s;">
                    <?php if (has_post_thumbnail()) : ?>
                        <a href="<?php the_permalink(); ?>" style="overflow: hidden; max-height: 180px; display: block;">
                            <?php the_post_thumbnail('medium_large', array('style' => 'width: 100%; height: 180px; object-fit: cover; transition: transform 0.3s;')); ?>
                        </a>
                    <?php endif; ?>

                    <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <?php
                            $categories = get_the_category();
                            if (!empty($categories)) :
                            ?>
                                <span style="display: inline-block; font-size: 11px; font-weight: 800; text-transform: uppercase; color: #38bdf8; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.2); padding: 2px 8px; border-radius: 6px; margin-bottom: 10px;">
                                    <?php echo esc_html($categories[0]->name); ?>
                                </span>
                            <?php endif; ?>

                            <h3 style="font-size: 17px; font-weight: 800; color: #f8fafc; margin: 0 0 10px; line-height: 1.4;">
                                <a href="<?php the_permalink(); ?>" style="color: #f8fafc; text-decoration: none;">
                                    <?php the_title(); ?>
                                </a>
                            </h3>

                            <div style="color: #94a3b8; font-size: 13px; line-height: 1.6; margin-bottom: 14px;">
                                <?php echo wp_trim_words(get_the_excerpt(), 18, '...'); ?>
                            </div>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; padding-top: 12px; margin-top: auto;">
                            <span>📅 <?php echo get_the_date(); ?></span>
                            <span>✍️ <?php the_author(); ?></span>
                        </div>
                    </div>
                </article>
            <?php endwhile; wp_reset_postdata(); ?>
        </div>

    </div>
</section>
<?php endif; ?>

<?php
get_footer();
