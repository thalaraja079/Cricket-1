import React from 'react';
import { Language } from '../types/cricket';

interface FooterProps {
  lang: Language;
  onSelectTab: (tab: 'live' | 'upcoming' | 'points' | 'results' | 'stats') => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onSelectTab }) => {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950 py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
            🏏
          </div>
          <span className="font-bold text-slate-300 font-sports text-sm">
            {lang === 'ta' ? 'கிரிக் பல்ஸ் நேரலை' : 'CricPulse Live'}
          </span>
          <span className="text-slate-600">·</span>
          <span>
            {lang === 'ta' 
              ? 'உடனுக்குடன் பந்துக்கு பந்து நேரலை & கிரிக்கெட் அட்டவணை' 
              : 'Instant Ball-by-Ball Cricket Scores & Schedule'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-400 font-medium">
          <button 
            onClick={() => onSelectTab('live')} 
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            {lang === 'ta' ? 'நேரலை' : 'Live Scores'}
          </button>
          <button 
            onClick={() => onSelectTab('upcoming')} 
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            {lang === 'ta' ? 'அட்டவணை' : 'Upcoming'}
          </button>
          <button 
            onClick={() => onSelectTab('points')} 
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            {lang === 'ta' ? 'புள்ளிகள் பட்டியல்' : 'Points Table'}
          </button>
          <button 
            onClick={() => onSelectTab('stats')} 
            className="hover:text-emerald-400 transition-colors cursor-pointer"
          >
            {lang === 'ta' ? 'டாப் வீரர்கள்' : 'Leaderboard'}
          </button>
        </div>

      </div>
    </footer>
  );
};
