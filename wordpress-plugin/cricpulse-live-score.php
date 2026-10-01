<?php
/**
 * Plugin Name: CricPulse Live Cricket Scores & Points Table
 * Plugin URI: https://ais-pre-2o57fbonje7loyq5igc76m-277269373849.asia-east1.run.app
 * Description: Real-time ball-by-ball cricket live scores, upcoming matches schedule, and points tables in Tamil & English.
 * Version: 1.0.0
 * Author: CricPulse
 * Author URI: https://ais-pre-2o57fbonje7loyq5igc76m-277269373849.asia-east1.run.app
 * License: GPL2
 */

if (!defined('ABSPATH')) {
    exit;
}

function cricpulse_render_live_scores($atts) {
    $atts = shortcode_atts(array(
        'height' => '900px',
        'width'  => '100%',
    ), $atts, 'cricpulse_live');

    $app_url = 'https://ais-pre-2o57fbonje7loyq5igc76m-277269373849.asia-east1.run.app';

    $output = '<div class="cricpulse-cricket-embed" style="width: 100%; max-width: 100%; margin: 20px auto; overflow: hidden; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">';
    $output .= '<iframe src="' . esc_url($app_url) . '" ';
    $output .= 'style="width:' . esc_attr($atts['width']) . '; height:' . esc_attr($atts['height']) . '; border:none; display:block;" ';
    $output .= 'allow="autoplay" loading="lazy" title="Cricket Live Score">';
    $output .= '</iframe>';
    $output .= '</div>';

    return $output;
}
add_shortcode('cricpulse_live', 'cricpulse_render_live_scores');

// Register a Gutenberg / Classic editor block wrapper or widget if needed
