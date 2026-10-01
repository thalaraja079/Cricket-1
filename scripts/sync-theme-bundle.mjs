import fs from 'fs';

const cssContent = fs.readFileSync('./cricpulse-theme/assets/cricket-app.css', 'utf8');
const jsContent = fs.readFileSync('./cricpulse-theme/assets/cricket-app.js', 'utf8');

const themeBundlePath = './src/utils/themeBundle.ts';
let bundleCode = fs.readFileSync(themeBundlePath, 'utf8');

// Replace CRICKET_APP_CSS
const cssStart = bundleCode.indexOf('const CRICKET_APP_CSS = `');
const cssEnd = bundleCode.indexOf('`;\n\nconst CRICKET_APP_JS = `');

if (cssStart !== -1 && cssEnd !== -1) {
  bundleCode = bundleCode.slice(0, cssStart + 'const CRICKET_APP_CSS = `'.length) +
    cssContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${') +
    bundleCode.slice(cssEnd);
}

// Replace CRICKET_APP_JS
const jsStart = bundleCode.indexOf('const CRICKET_APP_JS = `');
const jsEnd = bundleCode.indexOf('`;\n\nexport const WORDPRESS_THEME_FILES: ThemeFile[] = [');

if (jsStart !== -1 && jsEnd !== -1) {
  bundleCode = bundleCode.slice(0, jsStart + 'const CRICKET_APP_JS = `'.length) +
    jsContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${') +
    bundleCode.slice(jsEnd);
}

fs.writeFileSync(themeBundlePath, bundleCode);
console.log('Successfully synced themeBundle.ts with disk assets!');
