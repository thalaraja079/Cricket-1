import React from 'react';
import { CricketMatch, Language } from '../types/cricket';
import { t } from '../utils/translations';

interface LiveMatchesTickerProps {
  matches: CricketMatch[];
  activeMatchId: string;
  onSelectMatch: (id: string) => void;
  lang: Language;
}

export const LiveMatchesTicker: React.FC<LiveMatchesTickerProps> = ({
  matches,
  activeMatchId,
  onSelectMatch,
  lang,
}) => {
  const tr = t[lang];

  return (
    <div className="bg-slate-900/80 border-b border-slate-800/80 py-2.5 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 min-w-max">
        <div className="flex items-center gap-1.5 pr-2 border-r border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-live" />
          <span>{tr.live}</span>
        </div>

        {matches.map((m) => {
          const isSelected = m.id === activeMatchId;
          const inn1 = m.innings1;
          const inn2 = m.innings2;

          return (
            <button
              key={m.id}
              onClick={() => onSelectMatch(m.id)}
              className={`flex items-center gap-3 px-3 py-1.5 rounded-lg border transition-all text-left cursor-pointer ${
                isSelected
                  ? 'bg-slate-800/90 border-emerald-500/60 shadow-md shadow-emerald-950/30'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {/* Tournament tag */}
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-medium">
                  {m.tournament}
                </span>
                <span className="text-[11px] text-slate-300 font-semibold">
                  {m.matchNumber}
                </span>
              </div>

              {/* Team 1 Score */}
              <div className="flex items-center gap-1.5 border-l border-slate-800 pl-2">
                <span className="text-xs font-bold text-white">
                  {m.team1.shortName}
                </span>
                <span className="text-xs text-slate-300 font-mono tabular-nums">
                  {inn1.totalRuns}/{inn1.wickets}
                  <span className="text-[10px] text-slate-400 ml-0.5">({inn1.overs})</span>
                </span>
              </div>

              <span className="text-xs text-slate-600 font-medium">vs</span>

              {/* Team 2 Score */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-emerald-400">
                  {m.team2.shortName}
                </span>
                <span className="text-xs text-emerald-300 font-bold font-mono tabular-nums">
                  {inn2 ? `${inn2.totalRuns}/${inn2.wickets}` : 'Yet to bat'}
                  {inn2 && (
                    <span className="text-[10px] text-emerald-400/80 ml-0.5">({inn2.overs})</span>
                  )}
                </span>
              </div>

              {/* Quick condition badge */}
              <div className="text-[11px] text-amber-300/90 font-medium pl-1 hidden sm:block">
                {lang === 'ta' ? m.statusTextTa : m.statusText}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
