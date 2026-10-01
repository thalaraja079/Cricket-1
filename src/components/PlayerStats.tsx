import React from 'react';
import { Language } from '../types/cricket';
import { t } from '../utils/translations';
import { mockPlayerLeaderboard } from '../data/mockCricketData';
import { Flame, Target, Award } from 'lucide-react';

interface PlayerStatsProps {
  lang: Language;
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ lang }) => {
  const tr = t[lang];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="pb-2 border-b border-slate-800">
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-400" />
          <span>{tr.stats}</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {lang === 'ta' 
            ? 'தொடரின் அதிக ரன்கள் அடித்த பேட்டர்கள் (ஆரஞ்சு கேப்) மற்றும் அதிக விக்கெட்டுகள் வீழ்த்திய பந்துவீச்சாளர்கள் (பர்ப்பிள் கேப்)' 
            : 'Tournament top run-getters (Orange Cap) and leading wicket-takers (Purple Cap)'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Orange Cap Leaderboard */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                🧢
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {tr.orangeCap}
                </h3>
                <span className="text-[11px] text-amber-400 font-medium">Leading Run Scorers</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 text-[11px] uppercase border-b border-slate-800/80">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Player</th>
                  <th className="py-2.5 px-3">Team</th>
                  <th className="py-2.5 px-3 text-right">Runs</th>
                  <th className="py-2.5 px-3 text-right">SR</th>
                  <th className="py-2.5 px-3 text-right">4s/6s</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                {mockPlayerLeaderboard.orangeCap.map((p) => (
                  <tr key={p.rank} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3">
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        p.rank === 1 ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400'
                      }`}>
                        {p.rank}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-sans font-semibold text-white">
                      {lang === 'ta' ? p.playerTa : p.player}
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-bold" style={{ color: p.teamColor }}>
                      {p.team}
                    </td>
                    <td className="py-3 px-3 text-right font-sports font-black text-sm text-amber-300 tabular-nums">
                      {p.runs}
                    </td>
                    <td className="py-3 px-3 text-right text-emerald-400 tabular-nums">
                      {p.strikeRate}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-400 tabular-nums">
                      {p.fours}/{p.sixes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Purple Cap Leaderboard */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                🟣
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {tr.purpleCap}
                </h3>
                <span className="text-[11px] text-purple-400 font-medium">Leading Wicket Takers</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 text-[11px] uppercase border-b border-slate-800/80">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Player</th>
                  <th className="py-2.5 px-3">Team</th>
                  <th className="py-2.5 px-3 text-right">Wickets</th>
                  <th className="py-2.5 px-3 text-right">Econ</th>
                  <th className="py-2.5 px-3 text-right">Best</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                {mockPlayerLeaderboard.purpleCap.map((p) => (
                  <tr key={p.rank} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3">
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                        p.rank === 1 ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400'
                      }`}>
                        {p.rank}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-sans font-semibold text-white">
                      {lang === 'ta' ? p.playerTa : p.player}
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-bold" style={{ color: p.teamColor }}>
                      {p.team}
                    </td>
                    <td className="py-3 px-3 text-right font-sports font-black text-sm text-purple-300 tabular-nums">
                      {p.wickets}
                    </td>
                    <td className="py-3 px-3 text-right text-emerald-400 tabular-nums">
                      {p.economy}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-400 tabular-nums">
                      {p.bestFigures}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
