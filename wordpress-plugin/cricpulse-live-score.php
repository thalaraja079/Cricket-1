<?php
/**
 * Plugin Name: CricPulse Live Cricket Scores & Points Table
 * Plugin URI: https://ais-pre-lpqxoewxjngaqxidjp7znm-67909262050.asia-east1.run.app
 * Description: Real-time Google Trending cricket live scores, ball-by-ball commentary in Tamil & English, upcoming schedule, AI match analysis, and points table.
 * Version: 2.2.0
 * Author: CricPulse
 * Author URI: https://ais-pre-lpqxoewxjngaqxidjp7znm-67909262050.asia-east1.run.app
 * License: GPL2
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Assets Registration & Shortcode: [cricpulse_live]
function cricpulse_plugin_enqueue_scripts() {
    wp_register_style(
        'cricpulse-plugin-fonts',
        'https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Rajdhani:wght@600;700&display=swap',
        array(),
        null
    );

    wp_register_style(
        'cricpulse-plugin-style',
        plugin_dir_url(__FILE__) . 'assets/cricket-app.css',
        array('cricpulse-plugin-fonts'),
        '2.5.0'
    );

    wp_register_script(
        'cricpulse-plugin-script',
        plugin_dir_url(__FILE__) . 'assets/cricket-app.js',
        array(),
        '2.5.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'cricpulse_plugin_enqueue_scripts');

function cricpulse_render_live_scores($atts) {
    $atts = shortcode_atts(array(
        'lang' => get_option('cricpulse_default_lang', 'en'),
    ), $atts, 'cricpulse_live');

    wp_enqueue_style('cricpulse-plugin-style');
    wp_enqueue_script('cricpulse-plugin-script');

    $apiKey = get_option('cricpulse_api_key', '');
    if (empty($apiKey)) {
        $apiKey = get_option('cricpulse_google_api_key', '');
    }
    if (empty($apiKey)) {
        $apiKey = 'bbs_live_00000CQ95G7lQHMT0eUpq8vzEoTbx8FxnJAgRqOv7pAwysr7';
    }

    wp_localize_script('cricpulse-plugin-script', 'cricpulseConfig', array(
        'googleApiKey' => $apiKey,
        'apiKey'       => $apiKey,
        'provider'     => get_option('cricpulse_provider', 'bigballsdata'),
        'lang'         => !empty($atts['lang']) ? $atts['lang'] : 'en',
    ));

    return '<div class="cricpulse-container" style="max-width: 1280px; margin: 20px auto; padding: 0 15px;"><div id="cp-live-root"></div></div>';
}
add_shortcode('cricpulse_live', 'cricpulse_render_live_scores');

// 2. Admin Menu: Settings -> CricPulse Live
function cricpulse_plugin_admin_menu() {
    add_options_page(
        'CricPulse Live Settings',
        'CricPulse Live 🏏',
        'manage_options',
        'cricpulse-plugin-settings',
        'cricpulse_plugin_render_settings_page'
    );
}
add_action('admin_menu', 'cricpulse_plugin_admin_menu');

function cricpulse_plugin_register_settings() {
    register_setting('cricpulse_plugin_options', 'cricpulse_app_url');
    register_setting('cricpulse_plugin_options', 'cricpulse_google_api_key');
    register_setting('cricpulse_plugin_options', 'cricpulse_api_key');
    register_setting('cricpulse_plugin_options', 'cricpulse_provider');
    register_setting('cricpulse_plugin_options', 'cricpulse_default_lang');
    register_setting('cricpulse_plugin_options', 'cricpulse_embed_height');
}
add_action('admin_init', 'cricpulse_plugin_register_settings');

function cricpulse_plugin_render_settings_page() {
    $app_url = get_option('cricpulse_app_url', 'https://ais-pre-2o57fbonje7loyq5igc76m-277269373849.asia-east1.run.app');
    $google_key = get_option('cricpulse_google_api_key', '');
    $api_key = get_option('cricpulse_api_key', '');
    $provider = get_option('cricpulse_provider', 'bigballsdata');
    $default_lang = get_option('cricpulse_default_lang', 'en');
    $embed_height = get_option('cricpulse_embed_height', '950px');
    ?>
    <div class="wrap" style="max-width: 900px; background: #fff; padding: 25px 30px; border-radius: 12px; margin-top: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.06); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 32px;">🏏</span>
                <div>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #0f172a;">
                        CricPulse Live Cricket Settings (கிரிக்கெட் நேரலை அமைப்புகள்)
                    </h1>
                    <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">
                        கூகுள் தேடலில் அதிகம் தேடப்படும் நேரலை கிரிக்கெட் ஸ்கோர்களை உங்கள் இணையதளத்தில் காண்பியுங்கள்.
                    </p>
                </div>
            </div>
            <span style="background: #ecfdf5; color: #059669; border: 1px solid #10b981; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700;">
                v2.0.0 Active
            </span>
        </div>

        <form method="post" action="options.php" style="margin-top: 20px;">
            <?php settings_fields('cricpulse_plugin_options'); ?>

            <table class="form-table" role="presentation">
                <tr valign="top">
                    <th scope="row" style="width: 260px;">
                        <strong style="font-size: 14px; color: #0f172a;">CricPulse App URL</strong><br>
                        <small style="color: #64748b;">(நேரலை ஆப் முகவரி)</small>
                    </th>
                    <td>
                        <input type="url" name="cricpulse_app_url" value="<?php echo esc_attr($app_url); ?>" style="width: 100%; max-width: 550px; padding: 9px 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: monospace;" placeholder="https://ais-pre-..." />
                        <p class="description" style="color: #64748b; margin-top: 6px;">
                            நேரலை கிரிக்கெட் ஸ்கோர்களை வழங்கும் CricPulse சேவையக முகவரி.
                        </p>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row" style="width: 260px;">
                        <strong style="font-size: 14px; color: #0f172a;">Live Data Provider</strong><br>
                        <small style="color: #64748b;">(தரவு மூலத்தைத் தேர்ந்தெடுக்கவும்)</small>
                    </th>
                    <td>
                        <select name="cricpulse_provider" style="padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; width: 100%; max-width: 450px; font-weight: 600;">
                            <option value="google_trending" <?php selected($provider, 'google_trending'); ?>>🔍 Google Search Grounding (gemini-3.8-flash) - பரிந்துரைக்கப்படுகிறது</option>
                            <option value="bigballsdata" <?php selected($provider, 'bigballsdata'); ?>>BigBallsData.com (Bearer Token)</option>
                            <option value="cricketdata" <?php selected($provider, 'cricketdata'); ?>>CricketData.org / CricAPI.com</option>
                        </select>
                        <p class="description" style="color: #475569; margin-top: 6px;">
                            கூகுள் தேடலில் முதலிடம் பிடிக்கும் போட்டிகள் தானாகவே லைவ் ஸ்கோரில் காட்டப்படும்.
                        </p>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row">
                        <strong style="font-size: 14px; color: #0f172a;">BigBallsData Bearer Token</strong><br>
                        <small style="color: #64748b;">(250 Free Credits API Token)</small>
                    </th>
                    <td>
                        <input type="text" name="cricpulse_api_key" value="<?php echo esc_attr($api_key); ?>" style="width: 100%; max-width: 450px; padding: 9px 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: monospace;" placeholder="bbs_live_..." />
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row">
                        <strong style="font-size: 14px; color: #0f172a;">Google Trending / Gemini API Key</strong><br>
                        <small style="color: #64748b;">(கூகுள் API கீ உள்ளிடவும்)</small>
                    </th>
                    <td>
                        <input type="text" name="cricpulse_google_api_key" value="<?php echo esc_attr($google_key); ?>" style="width: 100%; max-width: 450px; padding: 9px 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: monospace;" placeholder="AIzaSy... அல்லது உங்கள் API Key" />
                        <p class="description" style="color: #64748b; margin-top: 6px;">
                            உங்கள் கூகுள் AI ஸ்டுடியோ அல்லது Gemini API Key-ஐ இங்கே உள்ளிடவும். (கீ இல்லாவிட்டாலும் பொதுவான கூகுள் லைவ் ஸ்ட்ரீம் தானாக இயங்கும்).
                        </p>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row">
                        <strong style="font-size: 14px; color: #0f172a;">Default Language (இயல்புநிலை மொழி)</strong>
                    </th>
                    <td>
                        <label style="margin-right: 20px; font-weight: bold;">
                            <input type="radio" name="cricpulse_default_lang" value="en" <?php checked($default_lang, 'en'); ?>> 🇬🇧 English (ஆங்கிலம் - Default)
                        </label>
                        <label>
                            <input type="radio" name="cricpulse_default_lang" value="ta" <?php checked($default_lang, 'ta'); ?>> 🇮🇳 தமிழ் (Tamil)
                        </label>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row">
                        <strong style="font-size: 14px; color: #0f172a;">Embed Frame Height</strong>
                    </th>
                    <td>
                        <input type="text" name="cricpulse_embed_height" value="<?php echo esc_attr($embed_height); ?>" style="width: 140px; padding: 8px 12px; border-radius: 8px; border: 1px solid #cbd5e1;" />
                        <span style="color: #64748b; font-size: 13px; margin-left: 8px;">(பரிந்துரை: 950px அல்லது 100vh)</span>
                    </td>
                </tr>
            </table>

            <?php submit_button('அமைப்புகளை சேமி (Save Settings)', 'primary', 'submit', true, array('style' => 'background: #059669; border-color: #047857; padding: 6px 20px; font-weight: 700; border-radius: 8px;')); ?>
        </form>

        <div style="margin-top: 30px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px;">
            <h3 style="margin-top: 0; font-size: 16px; color: #0f172a;">
                📋 இணையதளத்தில் சேர்ப்பது எப்படி? (How to Display)
            </h3>
            <p style="font-size: 14px; color: #475569; margin: 8px 0;">
                உங்கள் WordPress-ல் எந்தப் பக்கத்திலும் (Page / Post / Elementor / Gutenberg) இந்த Shortcode-ஐ பேஸ்ட் செய்தால் போதும்:
            </p>
            <div style="background: #0f172a; color: #38bdf8; font-family: monospace; font-size: 15px; padding: 12px 16px; border-radius: 8px; font-weight: bold; display: inline-block;">
                [cricpulse_live]
            </div>
            <p style="font-size: 13px; color: #64748b; margin-top: 8px;">
                குறிப்பிட்ட உயரத்திற்கு: <code>[cricpulse_live height="1000px"]</code>
            </p>
        </div>
    </div>
    <?php
}
