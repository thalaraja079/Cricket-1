import React from 'react';
import { Volume2, VolumeX, Play, Pause, FastForward, Globe, Radio } from 'lucide-react';
import { Language } from '../types/cricket';
import { t } from '../utils/translations';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  activeTab: 'live' | 'upcoming' | 'points' | 'results' | 'stats';
  setActiveTab: (tab: 'live' | 'upcoming' | 'points' | 'results' | 'stats') => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  speedMs: number;
  onToggleSpeed: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  onNextBall: () => void;
  onOpenWordPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  activeTab,
  setActiveTab,
  isPlaying,
  onTogglePlay,
  speedMs,
  onToggleSpeed,
  soundEnabled,
  onToggleSound,
  voiceEnabled,
  onToggleVoice,
  onNextBall,
  onOpenWordPress,
}) => {
  const tr = t[lang];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar: Brand, Navigation, and Controls */}
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Single text element wordmark with sports accent */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('live')}
              className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold text-base">
                🏏
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white font-sports">
                  {lang === 'ta' ? 'கிரிக் பல்ஸ்' : 'CricPulse'}
                  <span className="text-emerald-400 ml-1">LIVE</span>
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'live'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-live" />
              <span>{tr.liveScores}</span>
            </button>

            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {tr.upcoming}
            </button>

            <button
              onClick={() => setActiveTab('points')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'points'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {tr.pointsTable}
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'results'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {tr.completed}
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'stats'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {tr.stats}
            </button>
          </nav>

          {/* Zone 3: Live Simulation & Language Switcher Controls */}
          <div className="flex items-center gap-2">
            
            {/* Live Ticker Quick Controller */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
              <button
                onClick={onTogglePlay}
                title={isPlaying ? tr.pause : tr.resume}
                className={`p-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                  isPlaying ? 'text-amber-400 hover:bg-slate-800' : 'text-emerald-400 hover:bg-slate-800'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={onToggleSpeed}
                title={speedMs === 1500 ? tr.speedFast : tr.speedLive}
                className="px-2 py-1 rounded text-xs font-mono text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <FastForward className="w-3 h-3 text-cyan-400" />
                <span>{speedMs === 1500 ? '1.5s' : '3.5s'}</span>
              </button>

              <button
                onClick={onNextBall}
                className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors whitespace-nowrap cursor-pointer active:scale-95"
                title={tr.nextBall}
              >
                {tr.nextBall}
              </button>

              <button
                onClick={onToggleSound}
                title={soundEnabled ? tr.soundOn : tr.soundOff}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  soundEnabled ? 'text-emerald-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-800'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={onToggleVoice}
                title={tr.voiceCommentary}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  voiceEnabled ? 'text-indigo-400 bg-indigo-950/60' : 'text-slate-500 hover:bg-slate-800'
                }`}
              >
                <Radio className="w-4 h-4" />
              </button>
            </div>

            {/* WordPress Embed Button */}
            <button
              onClick={onOpenWordPress}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold transition-colors cursor-pointer"
              title="WordPress-ல் சேர்க்க / Embed in WordPress"
            >
              <span className="font-extrabold text-blue-400">W</span>
              <span className="hidden sm:inline">{lang === 'ta' ? 'WordPress-ல் சேர்க்க' : 'WordPress'}</span>
            </button>

            {/* Tamil / English Language Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-colors cursor-pointer"
              title="Change Language / மொழியை மாற்ற"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'English' : 'தமிழ்'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-between py-2 border-t border-slate-900 gap-1 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-2.5 py-1 rounded font-medium whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'live' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-live" />
            {tr.liveScores}
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${
              activeTab === 'upcoming' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            {tr.upcoming}
          </button>
          <button
            onClick={() => setActiveTab('points')}
            className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${
              activeTab === 'points' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            {tr.pointsTable}
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${
              activeTab === 'results' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            {tr.completed}
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${
              activeTab === 'stats' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            {tr.stats}
          </button>
        </div>
      </div>
    </header>
  );
};
