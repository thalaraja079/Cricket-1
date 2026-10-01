<?php
/**
 * CricPulse Theme Functions and Definitions
 * Full WordPress Blog, Articles, Custom Pages & Native Live Cricket Scoreboard
 * Integrates with BigBallsData.com / CricketData.org via Server-Side Proxy
 */

if (!defined('ABSPATH')) {
    exit;
}

function cricpulse_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('align-wide');
    add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'style', 'script'));

    register_nav_menus(array(
        'primary' => __('Primary Menu', 'cricpulse-theme'),
        'footer'  => __('Footer Menu', 'cricpulse-theme'),
    ));
}
add_action('after_setup_theme', 'cricpulse_theme_setup');

function cricpulse_enqueue_scripts() {
    wp_enqueue_style(
        'cricpulse-fonts',
        'https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Rajdhani:wght@600;700&display=swap',
        array(),
        null
    );

    wp_enqueue_style('cricpulse-style', get_stylesheet_uri(), array(), '1.3.0');

    // Enqueue Native Live Cricket Scoreboard CSS
    wp_enqueue_style(
        'cricpulse-app-style',
        get_template_directory_uri() . '/assets/cricket-app.css',
        array(),
        '1.3.0'
    );

    // Enqueue Native Live Cricket Engine JS
    wp_enqueue_script(
        'cricpulse-app-script',
        get_template_directory_uri() . '/assets/cricket-app.js',
        array(),
        '1.3.0',
        true
    );

    // Pass configuration & REST endpoint to client JS
    wp_localize_script('cricpulse-app-script', 'cricpulseConfig', array(
        'apiKey'       => get_option('cricpulse_api_key', ''),
        'provider'     => get_option('cricpulse_provider', 'bigballsdata'),
        'restEndpoint' => esc_url_raw(rest_url('cricpulse/v1/live')),
        'nonce'        => wp_create_nonce('wp_rest'),
    ));
}
add_action('wp_enqueue_scripts', 'cricpulse_enqueue_scripts');

/**
 * Register WordPress REST API route to query BigBallsData.com without CORS issues
 * GET /wp-json/cricpulse/v1/live
 */
add_action('rest_api_init', function () {
    register_rest_route('cricpulse/v1', '/live', array(
        'methods'             => 'GET',
        'callback'            => 'cricpulse_rest_get_live_matches',
        'permission_callback' => '__return_true',
    ));
});

function cricpulse_rest_get_live_matches() {
    $api_key = get_option('cricpulse_api_key', '');
    $provider = get_option('cricpulse_provider', 'bigballsdata');

    if (empty($api_key)) {
        return new WP_REST_Response(array(
            'status'  => 'mock',
            'message' => 'No API key configured in WordPress settings.',
            'matches' => array(),
        ), 200);
    }

    // Check transient cache to preserve the 250 requests daily quota!
    $cache_key = 'cricpulse_live_cache';
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return new WP_REST_Response($cached, 200);
    }

    // Call BigBallsData.com server-side using Bearer Token
    if ($provider === 'bigballsdata') {
        $url = 'https://api.bigballsdata.com/v1/cricket/matches';
        $response = wp_remote_get($url, array(
            'headers' => array(
                'Authorization' => 'Bearer ' . trim($api_key),
                'Accept'        => 'application/json',
            ),
            'timeout' => 15,
        ));
    } else {
        $url = 'https://api.cricapi.com/v1/currentMatches?apikey=' . urlencode(trim($api_key)) . '&offset=0';
        $response = wp_remote_get($url, array('timeout' => 15));
    }

    if (is_wp_error($response)) {
        return new WP_REST_Response(array(
            'status'  => 'error',
            'message' => $response->get_error_message(),
        ), 500);
    }

    $status_code = wp_remote_retrieve_response_code($response);
    $body = wp_remote_retrieve_body($response);
    $data = json_decode($body, true);

    $result = array(
        'status'      => ($status_code >= 200 && $status_code < 300) ? 'success' : 'api_error',
        'http_code'   => $status_code,
        'provider'    => $provider,
        'data'        => $data,
        'queried_at'  => gmdate('Y-m-d H:i:s') . ' UTC',
    );

    // Cache for 60 seconds (allows 24 hrs of smooth updates within 250 daily limit)
    if ($status_code === 200) {
        set_transient($cache_key, $result, 60);
    }

    return new WP_REST_Response($result, 200);
}

/**
 * Shortcode to render live cricket score anywhere
 * Usage: [cricpulse_live]
 */
function cricpulse_theme_shortcode() {
    return '<div class="cricpulse-container"><div id="cp-live-root"></div></div>';
}
add_shortcode('cricpulse_live', 'cricpulse_theme_shortcode');

/**
 * Register WordPress Admin Settings Page: Settings -> Cricket Live API
 */
function cricpulse_add_admin_menu() {
    add_options_page(
        __('Cricket Live API Settings', 'cricpulse-theme'),
        __('Cricket Live API', 'cricpulse-theme'),
        'manage_options',
        'cricpulse-api-settings',
        'cricpulse_render_api_settings_page'
    );
}
add_action('admin_menu', 'cricpulse_add_admin_menu');

function cricpulse_register_settings() {
    register_setting('cricpulse_options_group', 'cricpulse_api_key');
    register_setting('cricpulse_options_group', 'cricpulse_provider');
}
add_action('admin_init', 'cricpulse_register_settings');

function cricpulse_render_api_settings_page() {
    $api_key = get_option('cricpulse_api_key', '');
    $provider = get_option('cricpulse_provider', 'bigballsdata');
    $test_result = null;

    if (isset($_POST['cricpulse_test_connection'])) {
        check_admin_referer('cricpulse_test_nonce');
        if (!empty($api_key)) {
            $url = 'https://api.bigballsdata.com/v1/cricket/matches';
            $res = wp_remote_get($url, array(
                'headers' => array(
                    'Authorization' => 'Bearer ' . trim($api_key),
                    'Accept'        => 'application/json',
                ),
                'timeout' => 15,
            ));
            if (is_wp_error($res)) {
                $test_result = array('success' => false, 'msg' => $res->get_error_message());
            } else {
                $code = wp_remote_retrieve_response_code($res);
                $body = wp_remote_retrieve_body($res);
                $test_result = array(
                    'success' => ($code === 200),
                    'code'    => $code,
                    'body'    => substr($body, 0, 300) . '...'
                );
            }
        }
    }
    ?>
    <div class="wrap" style="max-width: 800px; background: #fff; padding: 25px; border-radius: 12px; margin-top: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        <h1 style="display: flex; align-items: center; gap: 10px;">
            <span>🏏</span> CricPulse Cricket Live Settings
        </h1>
        <p style="color: #666; font-size: 14px;">
            நேரலை கிரிக்கெட் ஸ்கோர்களை நிர்வகிப்பதற்கான அமைப்புகள் (Cricket Live Scores Configuration).
        </p>
        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">

        <?php if ($test_result) : ?>
            <div style="padding: 14px; border-radius: 8px; margin-bottom: 20px; <?php echo $test_result['success'] ? 'background:#ecfdf5; border:1px solid #10b981; color:#065f46;' : 'background:#fef2f2; border:1px solid #ef4444; color:#991b1b;'; ?>">
                <strong><?php echo $test_result['success'] ? '✅ BigBallsData API உடன் வெற்றிகரமாக இணைக்கப்பட்டது! (HTTP 200 OK)' : '❌ இணைப்பு பிழை (HTTP ' . esc_html($test_result['code']) . ')'; ?></strong>
                <p style="margin: 6px 0 0; font-size: 12px;">
                    <?php echo $test_result['success'] ? 'BigBallsData டேஷ்போர்டில் 1 ரிக்வெஸ்ட் பதிவாகி இருக்கும்! ' . esc_html($test_result['body']) : esc_html($test_result['msg']); ?>
                </p>
            </div>
        <?php endif; ?>

        <form method="post" action="options.php">
            <?php settings_fields('cricpulse_options_group'); ?>
            
            <table class="form-table">
                <tr valign="top">
                    <th scope="row" style="width: 250px;">
                        <strong>API Provider</strong>
                    </th>
                    <td>
                        <select name="cricpulse_provider" style="padding: 8px 12px; border-radius: 6px;">
                            <option value="bigballsdata" <?php selected($provider, 'bigballsdata'); ?>>BigBallsData.com (Bearer Token)</option>
                            <option value="cricketdata" <?php selected($provider, 'cricketdata'); ?>>CricketData.org</option>
                            <option value="cricapi" <?php selected($provider, 'cricapi'); ?>>CricAPI.com</option>
                        </select>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row">
                        <strong>Live API Key</strong><br>
                        <small style="color: #888;">(bigballsdata.com Dashboard Key)</small>
                    </th>
                    <td>
                        <input type="text" name="cricpulse_api_key" value="<?php echo esc_attr($api_key); ?>" style="width: 100%; max-width: 450px; padding: 8px 12px; border-radius: 6px;" placeholder="e.g. your-bigballsdata-api-key" />
                        <p class="description" style="margin-top: 8px;">
                            <a href="https://bigballsdata.com/dashboard/keys" target="_blank" rel="noopener">BigBallsData.com/dashboard/keys</a> சென்று உங்கள் API Key-ஐ காப்பி செய்து இங்கே பேஸ்ட் செய்யவும்.
                        </p>
                    </td>
                </tr>
            </table>

            <?php submit_button(__('Save Settings (அமைப்புகளை சேமி)', 'cricpulse-theme')); ?>
        </form>

        <?php if (!empty($api_key)) : ?>
            <hr style="margin: 24px 0; border: 0; border-top: 1px solid #eee;">
            <form method="post" action="">
                <?php wp_nonce_field('cricpulse_test_nonce'); ?>
                <input type="hidden" name="cricpulse_test_connection" value="1">
                <button type="submit" class="button button-secondary" style="display: flex; align-items: center; gap: 6px;">
                    📡 BigBallsData API-ஐ இப்போது சோதிக்க (Test API Connection)
                </button>
                <small style="color: #888; display: block; margin-top: 6px;">
                    இதை கிளிக் செய்தால் உடனே BigBallsData சர்வருக்கு ஒரு நேரடி சோதனை அழைப்பு செல்லும்; உங்கள் BigBallsData டேஷ்போர்டில் 1 ரிக்வெஸ்ட் பதிவாகும்!
                </small>
            </form>
        <?php endif; ?>
    </div>
    <?php
}
