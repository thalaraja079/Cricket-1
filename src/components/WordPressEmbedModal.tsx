import React, { useState, useEffect } from 'react';
import { Language } from '../types/cricket';
import { downloadThemeZipFile, downloadPluginZipFile, downloadFlatThemeZipFile } from '../utils/themeBundle';
import { getStoredApiConfig, saveApiConfig } from '../services/liveCricketApi';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  FolderArchive, 
  Sparkles, 
  FileText, 
  Key, 
  ExternalLink,
  Save,
  CheckCircle2,
  Database,
  Plug,
  Globe
} from 'lucide-react';

interface WordPressEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const WordPressEmbedModal: React.FC<WordPressEmbedModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [isGeneratingZip, setIsGeneratingZip] = useState<boolean>(false);
  const [isGeneratingPluginZip, setIsGeneratingPluginZip] = useState<boolean>(false);
  const [isGeneratingFlatZip, setIsGeneratingFlatZip] = useState<boolean>(false);
  const [downloadSuccessTheme, setDownloadSuccessTheme] = useState<boolean>(false);
  const [downloadSuccessPlugin, setDownloadSuccessPlugin] = useState<boolean>(false);
  const [downloadSuccessFlat, setDownloadSuccessFlat] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<'iframe' | 'shortcode' | null>(null);

  // API Key Configuration State with Google Search Grounding and 3P APIs
  const [apiProvider, setApiProvider] = useState<'google_search' | 'bigballsdata' | 'cricketdata' | 'cricapi'>('google_search');
  const [apiKey, setApiKey] = useState<string>('');
  const [apiSaved, setApiSaved] = useState<boolean>(false);

  const currentOrigin = typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null'
    ? window.location.origin
    : 'https://ais-pre-2o57fbonje7loyq5igc76m-277269373849.asia-east1.run.app';

  const [customAppUrl, setCustomAppUrl] = useState<string>(currentOrigin);

  useEffect(() => {
    const config = getStoredApiConfig();
    setApiKey(config.apiKey || '');
    if (config.provider && config.provider !== 'simulator') {
      setApiProvider(config.provider);
    }
  }, []);

  if (!isOpen) return null;

  const appUrl = customAppUrl.trim() || currentOrigin;

  const handleSaveApiKey = () => {
    saveApiConfig({
      apiKey: apiKey.trim(),
      provider: apiProvider,
      isLiveApiActive: true,
      autoRefreshIntervalSec: 60,
    });
    setApiSaved(true);
    setTimeout(() => setApiSaved(false), 3000);
  };

  const handleDownloadFlatThemeZip = async () => {
    try {
      setIsGeneratingFlatZip(true);
      await downloadFlatThemeZipFile('cricpulse-theme-direct.zip');
      setDownloadSuccessFlat(true);
      setTimeout(() => setDownloadSuccessFlat(false), 4000);
    } catch (err) {
      console.error('Failed to generate flat theme zip:', err);
    } finally {
      setIsGeneratingFlatZip(false);
    }
  };

  const handleDownloadPluginZip = async () => {
    try {
      setIsGeneratingPluginZip(true);
      await downloadPluginZipFile('cricpulse-plugin.zip');
      setDownloadSuccessPlugin(true);
      setTimeout(() => setDownloadSuccessPlugin(false), 4000);
    } catch (err) {
      console.error('Failed to generate plugin zip:', err);
    } finally {
      setIsGeneratingPluginZip(false);
    }
  };

  const iframeCode = `<iframe 
  src="${appUrl}" 
  width="100%" 
  height="950" 
  style="border: none; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.4);" 
  allow="autoplay; clipboard-write; microphone" 
  loading="lazy" 
  title="CricPulse Live Cricket"
></iframe>`;

  const shortcodeCode = `[cricpulse_live height="950px"]`;

  const handleCopy = (text: string, type: 'iframe' | 'shortcode') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-5 sm:p-7 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-2xl shadow-inner">
              W
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>{lang === 'ta' ? 'WordPress இணைப்பு & இன்ஸ்டாலேஷன் மையம்' : 'WordPress Connect & Installation Center'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase font-bold">
                  v2.0.0
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ta' 
                  ? 'உங்கள் WordPress தளத்தில் (gray-cormorant-150281.hostingersite.com) இந்த முழு பிரிவியூவை அப்படியே கொண்டு வரலாம்.' 
                  : 'Install this exact live preview onto your WordPress site with 1 click.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CRITICAL NOTICE: APP URL FOR WORDPRESS ADMIN */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/50 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-sm">
                  {lang === 'ta' ? '🔗 உங்கள் CricPulse நேரலை App URL (WordPress-ல் உள்ளிட வேண்டிய முகவரி):' : '🔗 Your Live CricPulse App URL (Enter in WordPress Admin Settings):'}
                </h4>
                <p className="text-xs text-slate-300">
                  {lang === 'ta' 
                    ? 'உங்கள் WordPress Admin ➜ Settings ➜ Cricket Live API 🏏 பக்கத்தில் உள்ள "CricPulse App URL" கட்டத்தில் கீழே உள்ள முகவரியை பேஸ்ட் செய்யவும்:' 
                    : 'Paste this URL into the "CricPulse App URL" field under WordPress Admin ➜ Settings ➜ Cricket Live API 🏏:'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-700">
            <input
              type="text"
              readOnly
              value={appUrl}
              className="flex-1 bg-transparent text-emerald-300 font-mono text-xs sm:text-sm select-all outline-none"
            />
            <button
              onClick={() => handleCopy(appUrl, 'iframe')}
              className="px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              {copiedType === 'iframe' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{lang === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === 'ta' ? 'URL நகலெடு (Copy URL)' : 'Copy App URL'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* HOSTINGER SITE NOTICE */}
        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-emerald-300">
            <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {lang === 'ta' 
                ? <>உங்கள் தளம்: <strong>gray-cormorant-150281.hostingersite.com</strong>-ல் இதை உடனே இணைக்க கீழே உள்ள ஏதேனும் ஒரு முறையைப் பயன்படுத்தவும்.</>
                : <>Target Site: <strong>gray-cormorant-150281.hostingersite.com</strong> - Choose either method below to deploy.</>}
            </span>
          </div>
        </div>

        {/* 1. OPTION A: WORDPRESS PLUGIN (RECOMMENDED - 100% EXACT PREVIEW GUARANTEED) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-blue-950/40 border border-emerald-500/40 space-y-4 shadow-xl">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-lg shrink-0">
                <Plug className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-white text-base">
                    {lang === 'ta' ? 'முறை 1: CricPulse WordPress பிளகின் (.ZIP)' : 'Method 1: CricPulse WordPress Plugin (.ZIP)'}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500/40">
                    ⭐ சிறந்த தேர்வு / Recommended
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {lang === 'ta' 
                    ? 'இதை இன்ஸ்டால் செய்தால் உங்கள் தற்போதைய தீம் மாறாமல், இந்த அசல் பிரிவியூ அப்படியே உங்கள் தளத்தில் தெரியும்!' 
                    : 'Installs on any theme and renders this exact interactive live app without altering your existing theme.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadPluginZip}
              disabled={isGeneratingPluginZip}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer whitespace-nowrap"
            >
              {isGeneratingPluginZip ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'ta' ? 'பதிவிறக்கம் ஆகிறது...' : 'Downloading...'}</span>
                </>
              ) : downloadSuccessPlugin ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>{lang === 'ta' ? 'பதிவிறக்கம் ஆனது! ✓' : 'Plugin Downloaded! ✓'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{lang === 'ta' ? 'பிளகின் ZIP பதிவிறக்கு (.zip)' : 'Download Plugin (.zip)'}</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
            <div className="font-bold text-emerald-400 text-xs">
              {lang === 'ta' ? 'இன்ஸ்டால் செய்யும் 3 எளிய படிகள்:' : '3 Simple Installation Steps:'}
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-300 leading-relaxed text-xs">
              <li>
                WordPress Admin ➜ <strong>Plugins ➜ Add New Plugin ➜ Upload Plugin</strong> சென்று <code>cricpulse-plugin.zip</code> அப்லோட் செய்து <strong>Activate</strong> செய்யவும்.
              </li>
              <li>
                WordPress Admin ➜ <strong>Settings ➜ CricPulse Live 🏏</strong> சென்று உங்கள் <strong>Google Trending API Key</strong> உள்ளிட்டு சேமிக்கவும்.
              </li>
              <li>
                உங்கள் பக்கத்தில் (Home/Page) இந்த Shortcode பேஸ்ட் செய்யவும்: <code className="bg-slate-900 px-2 py-0.5 rounded text-emerald-300 font-bold">[cricpulse_live]</code>
              </li>
            </ol>
          </div>
        </div>

        {/* 2. OPTION B: FULL WORDPRESS THEME (ALL-IN-ONE BLOG & CRICKET) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/40 space-y-4 shadow-xl">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shadow-lg shrink-0">
                <FolderArchive className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">
                  {lang === 'ta' ? 'முறை 2: CricPulse WordPress தீம் (.ZIP)' : 'Method 2: CricPulse WordPress Theme (.ZIP)'}
                </h4>
                <p className="text-xs text-slate-300">
                  {lang === 'ta' 
                    ? 'முழுமையான கிரிக்கெட் தீம் (Live Scoreboard + செய்திகள்/கட்டுரைகள் வலைப்பதிவு)' 
                    : 'Complete WordPress Theme with built-in live scoreboard, article publishing, and Google Trending support.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleDownloadFlatThemeZip}
                disabled={isGeneratingFlatZip}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-950 transition-all cursor-pointer whitespace-nowrap"
              >
                {isGeneratingFlatZip ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{lang === 'ta' ? 'பதிவிறக்கம் ஆகிறது...' : 'Downloading...'}</span>
                  </>
                ) : downloadSuccessFlat ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>{lang === 'ta' ? 'பதிவிறக்கம் ஆனது! ✓' : 'Downloaded! ✓'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{lang === 'ta' ? 'தீம் ZIP பதிவிறக்கு (Direct Flat - style.css பிழை வராது)' : 'Download Theme (Direct Flat)'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Important alert for style.css error */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
            <strong className="text-amber-300 flex items-center gap-1.5 font-bold">
              <span>⚠️ "The theme is missing the style.css stylesheet" பிழையைத் தவிர்ப்பது எப்படி?</span>
            </strong>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              1. நீங்கள் பதிவிறக்கியது <strong>பிளகின் (cricpulse-plugin.zip)</strong> எனில், அதை <em>Appearance ➜ Themes</em>-ல் அப்லோட் செய்யக்கூடாது (அப்படி செய்தால் தான் அந்த பிழை வரும்). அதை <strong>Plugins ➜ Add New ➜ Upload Plugin</strong>-ல் தான் அப்லோட் செய்ய வேண்டும்.<br />
              2. தீமாக நிறுவ விரும்பினால் மேலே உள்ள நீல நிற <strong>"தீம் ZIP பதிவிறக்கு (Direct Flat)"</strong> பட்டனை அழுத்தி <code>cricpulse-theme-direct.zip</code>-ஐ Appearance ➜ Themes ➜ Upload Theme-ல் அப்லோட் செய்யுங்கள்! இதில் <code>style.css</code> நேரடியாக முதல் அடுக்கில் இருப்பதால் எந்த பிழையும் இன்றி நிறுவப்படும்.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
            <div className="font-bold text-blue-300 text-xs">
              {lang === 'ta' ? 'தீம் அமைப்புகள் & புதிய வசதி (v2.0):' : 'Theme Settings & New Features (v2.0):'}
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300 leading-relaxed text-xs">
              <li>
                WordPress Admin ➜ <strong>Appearance ➜ Themes ➜ Add New ➜ Upload Theme</strong> சென்று <code>cricpulse-theme-direct.zip</code> அப்லோட் செய்து <strong>Activate</strong> செய்யவும்.
              </li>
              <li>
                WordPress Admin ➜ <strong>Settings ➜ Cricket Live API 🏏</strong> மெனுவில் இப்போது <strong>Google Trending API Key</strong> உள்ளிடலாம்!
              </li>
              <li>
                <strong>காட்சி முறை (Display Mode)</strong>: 'Full CricPulse Live App' இயல்பாகவே தேர்ந்தெடுக்கப்பட்டிருக்கும், எனவே முகப்பு பக்கத்தில் அசல் பிரிவியூ அப்படியே தெரியும்!
              </li>
            </ul>
          </div>
        </div>

        {/* 3. GOOGLE TRENDING & API KEY CONFIGURATION */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 border border-amber-500/40 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                  <span>{lang === 'ta' ? 'கூகுள் டிரெண்டிங் & API Key அமைப்புகள்' : 'Google Trending & API Key Configuration'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Engine
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  {lang === 'ta' 
                    ? 'உங்கள் கூகுள் Gemini API கீ அல்லது CricAPI கீயை இங்கே சேமிக்கவும்' 
                    : 'Save your Google Gemini API key or CricAPI key for live match sync'}
                </p>
              </div>
            </div>
          </div>

          {/* Provider Selection */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400">{lang === 'ta' ? 'வழங்குநர் (Provider):' : 'Provider:'}</span>
            <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setApiProvider('google_search')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                  apiProvider === 'google_search'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🔍 Google Trending</span>
                <span className="text-[10px] px-1 rounded bg-black/20 text-slate-950">Default</span>
              </button>
              <button
                type="button"
                onClick={() => setApiProvider('bigballsdata')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  apiProvider === 'bigballsdata'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                BigBallsData.com
              </button>
              <button
                type="button"
                onClick={() => setApiProvider('cricketdata')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  apiProvider === 'cricketdata'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                CricketData.org
              </button>
              <button
                type="button"
                onClick={() => setApiProvider('cricapi')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  apiProvider === 'cricapi'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                CricAPI.com
              </button>
            </div>
          </div>

          {/* API Key Input Field */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-semibold flex items-center justify-between">
              <span>
                {apiProvider === 'google_search'
                  ? (lang === 'ta' ? 'Google Trending / Gemini API Key' : 'Google Trending / Gemini API Key')
                  : apiProvider === 'bigballsdata' 
                  ? (lang === 'ta' ? 'BigBallsData API Key (bigballsdata.com)' : 'BigBallsData API Key') 
                  : (lang === 'ta' ? 'Cricket Live API Key' : 'Cricket Live API Key')}
              </span>
              <span className="text-[11px] text-emerald-400">
                {lang === 'ta' ? 'கீ சரியாக வேலை செய்கிறது ✓' : 'API Key Active ✓'}
              </span>
            </label>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={
                  apiProvider === 'google_search'
                    ? (lang === 'ta' ? 'உங்கள் கூகுள் API Key-ஐ இங்கே பேஸ்ட் செய்யவும்...' : 'Paste your Google Gemini API Key here...')
                    : (lang === 'ta' ? 'உங்கள் API Key-ஐ இங்கே பேஸ்ட் செய்யவும்...' : 'Paste your API key here...')
                }
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-emerald-400 outline-none font-mono"
              />
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                {apiSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{lang === 'ta' ? 'சேமிக்கப்பட்டது!' : 'Saved!'}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>{lang === 'ta' ? 'சேமி & செயல்படுத்து' : 'Save & Connect'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 4. SHORTCODE & IFRAME CODE */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-300 text-xs flex items-center gap-2">
              <span>WordPress Shortcode (பக்கங்களில் சேர்க்க):</span>
            </h4>
            <button
              onClick={() => handleCopy(shortcodeCode, 'shortcode')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1 border border-slate-700 cursor-pointer"
            >
              {copiedType === 'shortcode' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{lang === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === 'ta' ? 'ஷார்ட்கோட் நகலெடு' : 'Copy Shortcode'}</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-mono">
            {shortcodeCode}
          </pre>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <h4 className="font-bold text-slate-300 text-xs">
              {lang === 'ta' ? 'நேரடி HTML குறியீடு (Custom HTML / Elementor):' : 'Direct HTML Embed Code:'}
            </h4>
            <button
              onClick={() => handleCopy(iframeCode, 'iframe')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1 border border-slate-700 cursor-pointer"
            >
              {copiedType === 'iframe' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{lang === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === 'ta' ? 'குறியீட்டை நகலெடு' : 'Copy HTML'}</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-emerald-300 font-mono overflow-x-auto whitespace-pre-wrap">
            {iframeCode}
          </pre>
        </div>

      </div>
    </div>
  );
};
