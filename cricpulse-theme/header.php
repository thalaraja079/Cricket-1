<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
    <style>
        .cricpulse-site-header {
            background: #020617;
            border-bottom: 1px solid #1e293b;
            position: sticky;
            top: 0;
            z-index: 999;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }
        .cricpulse-site-header .header-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 64px;
            padding: 10px 16px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .cricpulse-brand-link {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
        }
        .cricpulse-brand-link .brand-icon {
            font-size: 24px;
        }
        .cricpulse-brand-link .brand-name {
            font-size: 20px;
            font-weight: 900;
            color: #ffffff;
            letter-spacing: -0.5px;
        }
        .cricpulse-brand-link .brand-tagline {
            font-size: 11px;
            font-weight: 800;
            background: rgba(16, 185, 129, 0.15);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.3);
            padding: 3px 8px;
            border-radius: 999px;
            letter-spacing: 0.5px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
        .brand-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #10b981;
            animation: cp-pulse 1.5s infinite;
        }
        @keyframes cp-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.3); }
        }
        .cricpulse-header-actions {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .cp-nav-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            color: #cbd5e1;
            background: #0f172a;
            border: 1px solid #1e293b;
            transition: all 0.2s ease;
        }
        .cp-nav-btn:hover {
            color: #ffffff;
            background: #1e293b;
            border-color: #38bdf8;
        }
        .cp-nav-btn.primary {
            background: rgba(16, 185, 129, 0.1);
            color: #34d399;
            border-color: rgba(16, 185, 129, 0.3);
        }
        .cp-nav-btn.primary:hover {
            background: rgba(16, 185, 129, 0.2);
            color: #10b981;
        }
    </style>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site cricpulse-wrapper">
    <!-- Clean, Sleek CricPulse Global Header with Beautiful About & Contact Navigation -->
    <header class="cricpulse-site-header">
        <div class="header-inner">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="cricpulse-brand-link">
                <span class="brand-icon">🏏</span>
                <span class="brand-name">CRICPULSE</span>
                <span class="brand-tagline"><span class="brand-dot"></span> LIVE</span>
            </a>

            <!-- Clean, Sleek Top Navigation -->
            <div class="cricpulse-header-actions">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="cp-nav-btn primary">
                    <span>🏠</span> <span>Home</span>
                </a>
                <a href="<?php echo esc_url(home_url('/about-us')); ?>" class="cp-nav-btn">
                    <span>ℹ️</span> <span>About Us</span>
                </a>
                <a href="<?php echo esc_url(home_url('/contact')); ?>" class="cp-nav-btn">
                    <span>✉️</span> <span>Contact</span>
                </a>
            </div>
        </div>
    </header>
