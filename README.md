# CricPulse 🏏 - Real-Time Cricket Scores, Google Trending & WordPress Center

A production-grade Cricket Live Scoreboard application built for high-traffic sports websites, featuring live ball-by-ball commentary, real-time Google Trending match groundings, BigBallsData API integration, and full WordPress integration (Theme & Plugin).

---

## 🌟 Key Features

1. **100% English Default** (Instant toggle for Tamil `[🇬🇧 EN | 🇮🇳 தமிழ்]`).
2. **Google Trending Live #1 Match Badge** with active search hashtags.
3. **Official BigBallsData Cricket API Support** with built-in token fallback.
4. **WordPress Direct Integration**:
   - `cricpulse-theme-direct.zip`: Standalone full-width theme with blog posts integration below live match cards.
   - `cricpulse-plugin.zip`: Easy shortcode `[cricpulse_live]` for any page builder (Elementor, Gutenberg, Divi).
5. **No Fake Simulation Loops**: Real live scoring without resetting to 85.
6. **Live Match Center**: Batsmen strike rates, bowler economy, fall of wickets, team radar comparison, pitch/weather info, and AI Match Analysis.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build production bundle
npm run build
```

---

## 📦 WordPress Installation (Hostinger / cPanel / VPS)

### Option 1: Standalone Theme (`public/cricpulse-theme-direct.zip`)
1. Go to your WordPress Admin -> **Appearance** -> **Themes** -> **Add New** -> **Upload Theme**.
2. Choose `cricpulse-theme-direct.zip` and click **Install Now** -> **Activate**.
3. Go to **Settings** -> **Cricket Live API** to configure token or view connection status.

### Option 2: Shortcode Plugin (`public/cricpulse-plugin.zip`)
1. Go to your WordPress Admin -> **Plugins** -> **Add New** -> **Upload Plugin**.
2. Choose `cricpulse-plugin.zip` and click **Install Now** -> **Activate**.
3. Add `[cricpulse_live]` to any post, page, or homepage.

---

## 🔄 Rebuilding WordPress ZIPs

If you make modifications to PHP or assets:
```bash
node scripts/sync-theme-bundle.mjs
node scripts/build-zips.mjs
```
Generated ZIP packages will be in the `public/` directory ready for download.

---

## ☁️ Importing into a New Google AI Studio Project

1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In Google AI Studio, click **Import from GitHub** and select your repository.
3. Everything will boot up automatically in seconds!
