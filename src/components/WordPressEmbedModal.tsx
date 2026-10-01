import React, { useState, useEffect } from 'react';
import { Language } from '../types/cricket';
import { downloadThemeZipFile } from '../utils/themeBundle';
import { getStoredApiConfig, saveApiConfig } from '../services/liveCricketApi';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  FolderArchive, 
  Sparkles, 
  FileText, 
  Layers, 
  Key, 
  ExternalLink,
  Save,
  CheckCircle2,
  Database
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
  // Call ALL hooks unconditionally at top level to strictly follow Rules of Hooks
  const [isGeneratingZip, setIsGeneratingZip] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<'iframe' | 'shortcode' | null>(null);

  // API Key Configuration State with bigballsdata.com support
  const [apiProvider, setApiProvider] = useState<'bigballsdata' | 'cricketdata' | 'cricapi'>('bigballsdata');
  const [apiKey, setApiKey] = useState<string>('');
  const [apiSaved, setApiSaved] = useState<boolean>(false);

  useEffect(() => {
    const config = getStoredApiConfig();
    setApiKey(config.apiKey || '');
    if (config.provider && config.provider !== 'simulator') {
      setApiProvider(config.provider);
    }
  }, []);

  // Now condition can safely return null after all hooks have been invoked
  if (!isOpen) return null;

  const handleSaveApiKey = () => {
    saveApiConfig({
      apiKey: apiKey.trim(),
      provider: apiProvider,
      isLiveApiActive: apiKey.trim().length > 0,
    });
    setApiSaved(true);
    setTimeout(() => setApiSaved(false), 3000);
  };

  // Safe client-side ZIP download using JSZip binary Blob (Never downloads as HTML!)
  const handleDownloadThemeZip = async () => {
    try {
      setIsGeneratingZip(true);
      await downloadThemeZipFile('cricpulse-theme.zip');
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate theme zip:', err);
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-2o57fbonje7loyq5igc76m-277269373849.asia-east1.run.app';

  const iframeCode = `<iframe 
  src="${appUrl}" 
  width="100%" 
  height="950" 
  style="border: none; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" 
  allow="autoplay; notifications" 
  loading="lazy" 
  title="Cricket Live Score"
></iframe>`;

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
                <span>{lang === 'ta' ? 'WordPress தீம் (ZIP) & API அமைப்புகள்' : 'WordPress Theme (ZIP) & API Configuration'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase font-bold">
                  Theme + Blog
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ta' 
                  ? 'கட்டுரைகள் (Articles), பக்கங்கள் (Pages) மற்றும் BigBallsData நேரலை API' 
                  : 'Articles, Pages, and BigBallsData / Cricket Live API Integration'}
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

        {/* 1. PRIMARY: DIRECT THEME ZIP DOWNLOAD (GUARANTEED GENUINE BINARY ZIP) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/50 via-slate-900 to-emerald-950/40 border border-blue-500/40 space-y-4 shadow-xl">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shadow-lg shrink-0">
                <FolderArchive className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">
                  {lang === 'ta' ? 'CricPulse WordPress தீம் (.ZIP கோப்பு)' : 'CricPulse WordPress Theme (.ZIP Package)'}
                </h4>
                <p className="text-xs text-slate-300">
                  {lang === 'ta' 
                    ? '100% உண்மையான வேர்ட்பிரஸ் தீம் ஜிப் பைல் (cricpulse-theme.zip)' 
                    : 'Genuine binary .zip file ready for Appearance ➜ Themes ➜ Upload Theme'}
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadThemeZip}
              disabled={isGeneratingZip}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-950 transition-all cursor-pointer whitespace-nowrap"
            >
              {isGeneratingZip ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'ta' ? 'ஜிப் உருவாகிறது...' : 'Generating ZIP...'}</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>{lang === 'ta' ? 'பதிவிறக்கம் ஆனது! ✓' : 'Downloaded! ✓'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{lang === 'ta' ? 'தீம் ZIP பதிவிறக்கு (.zip)' : 'Download Theme (.zip)'}</span>
                </>
              )}
            </button>
          </div>

          {/* Installation in WordPress step-by-step */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
            <div className="font-bold text-blue-300 flex items-center gap-1.5 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'ta' ? 'WordPress-ல் இன்ஸ்டால் செய்யும் முறை:' : 'WordPress Installation Steps:'}</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300 leading-relaxed text-xs">
              <li>
                {lang === 'ta' ? (
                  <>மேலே உள்ள நீல நிற பட்டனை அழுத்தி <strong>cricpulse-theme.zip</strong>-ஐ டவுன்லோட் செய்யவும்.</>
                ) : (
                  <>Download <strong>cricpulse-theme.zip</strong> using the button above.</>
                )}
              </li>
              <li>
                {lang === 'ta' ? (
                  <>WordPress Admin ➜ <strong>Appearance (தோற்றம்) ➜ Themes (தீம்கள்) ➜ Add New Theme</strong> செல்லவும்.</>
                ) : (
                  <>Go to WordPress Admin ➜ <strong>Appearance ➜ Themes ➜ Add New Theme</strong>.</>
                )}
              </li>
              <li>
                {lang === 'ta' ? (
                  <>மேலே உள்ள <strong>"Upload Theme" (தீம் பதிவேற்று)</strong> பட்டனை அழுத்தி <code>cricpulse-theme.zip</code>-ஐ அப்லோட் செய்து <strong>"Install Now"</strong> கொடுக்கவும்.</>
                ) : (
                  <>Click <strong>Upload Theme</strong>, choose <code>cricpulse-theme.zip</code> and click <strong>Install Now</strong>.</>
                )}
              </li>
              <li>
                {lang === 'ta' ? (
                  <><strong>"Activate" (செயல்படுத்து)</strong> செய்யவும். உங்கள் தீம் உடனே இயங்கத் தொடங்கும்!</>
                ) : (
                  <>Click <strong>Activate</strong>. Your theme is now live!</>
                )}
              </li>
            </ol>
          </div>
        </div>

        {/* 2. BIGBALLSDATA.COM & CRICKET LIVE API SECTION */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 border border-amber-500/40 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                  <span>{lang === 'ta' ? 'BigBallsData.com & நேரலை API இணைப்பு' : 'BigBallsData.com & Cricket Live API Key'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Live Data
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  {lang === 'ta' 
                    ? 'BigBallsData (bigballsdata.com) அல்லது CricketData API கீயை இங்கே உள்ளிடவும்' 
                    : 'Enter your API key from BigBallsData (bigballsdata.com) or other providers'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://bigballsdata.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 flex items-center gap-1 font-semibold transition-colors"
              >
                <span>BigBallsData.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://cricketdata.org"
                target="_blank"
                rel="noreferrer"
                className="text-xs px-2 py-1 text-slate-400 hover:text-white"
              >
                CricketData.org
              </a>
            </div>
          </div>

          {/* Provider Selection */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">{lang === 'ta' ? 'வழங்குநர் (Provider):' : 'Provider:'}</span>
            <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs">
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
                {apiProvider === 'bigballsdata' 
                  ? (lang === 'ta' ? 'BigBallsData API Key (bigballsdata.com)' : 'BigBallsData API Key') 
                  : (lang === 'ta' ? 'Cricket API Key' : 'Cricket Live API Key')}
              </span>
              <span className="text-[11px] text-slate-400">
                {lang === 'ta' ? 'இலவச கணக்கு தொடங்கி கீ பெறலாம்' : 'Free tier available'}
              </span>
            </label>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={
                  apiProvider === 'bigballsdata'
                    ? (lang === 'ta' ? 'bigballsdata.com API Key-ஐ இங்கே பேஸ்ட் செய்யவும்...' : 'Paste your bigballsdata.com API Key here...')
                    : (lang === 'ta' ? 'உங்கள் API Key-ஐ இங்கே பேஸ்ட் செய்யவும்...' : 'Paste your API key here...')
                }
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-amber-400 outline-none"
              />
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                {apiSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-slate-950" />
                    <span>{lang === 'ta' ? 'சேமிக்கப்பட்டது!' : 'Saved!'}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>{lang === 'ta' ? 'சேமித்து செயல்படுத்து' : 'Save & Connect'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            💡 {lang === 'ta' ? (
              <>
                <strong>WordPress-லும் இணைக்கலாம்:</strong> இந்த தீமை உங்கள் WordPress-ல் நிறுவிய பின், 
                <strong>Settings (அமைப்புகள்) ➜ Cricket Live API</strong> மெனுவுக்குச் சென்று அங்கும் இந்த <strong>bigballsdata.com</strong> கீயை எளிதாக மாற்றிக் கொள்ளலாம்!
              </>
            ) : (
              <>
                <strong>WordPress Admin:</strong> You can also manage your <strong>bigballsdata.com</strong> key anytime inside WordPress Admin at <strong>Settings ➜ Cricket Live API</strong>!
              </>
            )}
          </div>
        </div>

        {/* 3. HOW TO ADD ARTICLES & PAGES */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-white text-sm">
              {lang === 'ta' ? 'இதில் கட்டுரைகள் (Articles) மற்றும் பக்கங்கள் (Pages) சேர்ப்பது எப்படி?' : 'How to Add Articles and Pages in this Theme'}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <strong className="text-emerald-300 block">
                {lang === 'ta' ? '1. கட்டுரைகள் / செய்திகள் சேர்க்க (Articles & News):' : '1. Write Articles & News:'}
              </strong>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {lang === 'ta' 
                  ? 'WordPress Admin ➜ Posts ➜ Add New சென்று நீங்கள் வழக்கம் போல தலைப்பு, படங்கள் மற்றும் செய்திகளை எழுதலாம். அவை முகப்பு பக்கத்தில் நேர்த்தியான கார்டுகளாகத் தானாகவே பட்டியலிடப்படும்!'
                  : 'Go to Posts ➜ Add New in WordPress to write your articles. They will automatically display as responsive cards on your homepage!'}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <strong className="text-cyan-300 block">
                {lang === 'ta' ? '2. தனி பக்கங்கள் சேர்க்க (Custom Pages):' : '2. Create Custom Pages:'}
              </strong>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {lang === 'ta' 
                  ? 'WordPress Admin ➜ Pages ➜ Add New சென்று "About Us", "Contact", "Schedule" என எத்தனை பக்கங்கள் வேண்டுமானாலும் உருவாக்கிக் கொள்ளலாம்.'
                  : 'Go to Pages ➜ Add New to create About Us, Contact, or any custom page. Standard page and full-width templates are built-in!'}
              </p>
            </div>
          </div>
        </div>

        {/* 4. DIRECT HTML EMBED */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-300 text-xs">
              {lang === 'ta' ? 'விருப்பம்: நேரடி HTML குறியீடு (Elementor / Gutenberg)' : 'Direct HTML Embed Option (Elementor / Gutenberg)'}
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
                  <span>{lang === 'ta' ? 'குறியீட்டை நகலெடு' : 'Copy Code'}</span>
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
