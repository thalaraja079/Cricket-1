import React from 'react';
import { Language } from '../types/cricket';
import { Sparkles, Flame, ShieldAlert, X } from 'lucide-react';

interface LiveEventBanner {
  id: string;
  type: 'FOUR' | 'SIX' | 'WICKET' | 'RUN';
  runs: number;
  titleEn: string;
  titleTa: string;
  detailEn: string;
  detailTa: string;
}

interface LiveEventToastProps {
  banner: LiveEventBanner | null;
  lang: Language;
  onDismiss: () => void;
}

export const LiveEventToast: React.FC<LiveEventToastProps> = ({ banner, lang, onDismiss }) => {
  if (!banner) return null;

  const isSix = banner.type === 'SIX';
  const isFour = banner.type === 'FOUR';
  const isWicket = banner.type === 'WICKET';

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-full animate-in slide-in-from-top-4 duration-300">
      <div 
        className={`rounded-2xl p-4 shadow-2xl border backdrop-blur-md flex items-start gap-3 relative overflow-hidden ${
          isWicket
            ? 'bg-red-950/95 border-red-500 text-white shadow-red-950/60'
            : isSix
            ? 'bg-amber-950/95 border-amber-400 text-white shadow-amber-950/60'
            : 'bg-blue-950/95 border-blue-400 text-white shadow-blue-950/60'
        }`}
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="p-2 rounded-xl bg-white/10 shrink-0 text-xl">
          {isSix ? '🚀' : isFour ? '🏏' : '⚡'}
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider font-sports">
              {lang === 'ta' ? banner.titleTa : banner.titleEn}
            </span>
            <button
              onClick={onDismiss}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs font-medium leading-snug">
            {lang === 'ta' ? banner.detailTa : banner.detailEn}
          </p>
        </div>
      </div>
    </div>
  );
};
