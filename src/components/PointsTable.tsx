import React, { useState } from 'react';
import { PointsTableTeam, Language } from '../types/cricket';
import { t } from '../utils/translations';
import { mockIplPointsTable, mockWorldCupPointsTable } from '../data/mockCricketData';
import { Trophy, TrendingUp, Info } from 'lucide-react';

interface PointsTableProps {
  lang: Language;
}

export const PointsTable: React.FC<PointsTableProps> = ({ lang }) => {
  const tr = t[lang];
  const [selectedTournament, setSelectedTournament] = useState<'ipl' | 'wc'>('ipl');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const currentTable: PointsTableTeam[] = selectedTournament === 'ipl' 
    ? mockIplPointsTable 
    : mockWorldCupPointsTable;

  return (
    <div className="space-y-6">
      
      {/* Header and Tournament Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span>{tr.pointsTable}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'ta' 
              ? 'நடப்பு தொடரின் அணிகளின் நிலை, நெட் ரன் ரேட் மற்றும் ப்ளே-ஆஃப் தகுதி நிலவரம்' 
              : 'Current tournament standings, Net Run Rate (NRR), and playoff qualification race'}
          </p>
        </div>

        {/* Tournament Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setSelectedTournament('ipl')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              selectedTournament === 'ipl'
                ? 'bg-slate-800 text-amber-400 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tr.ipl}
          </button>
          <button
            onClick={() => setSelectedTournament('wc')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              selectedTournament === 'wc'
                ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tr.t20Wc}
          </button>
        </div>
      </div>

      {/* Playoff Qualifier Legend */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-emerald-500/80 border border-emerald-400" />
          <span className="text-slate-300 font-medium">{tr.qualifierZone}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span><strong className="text-emerald-400">W</strong>: Won</span>
          <span><strong className="text-rose-400">L</strong>: Lost</span>
          <span><strong className="text-slate-400">NR</strong>: No Result</span>
        </div>
      </div>

      {/* Standings Data Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-950/90 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-4 w-12 text-center">#</th>
              <th className="py-3 px-4 min-w-[160px]">Team</th>
              <th className="py-3 px-3 text-right">{tr.matchesPlayed}</th>
              <th className="py-3 px-3 text-right">{tr.won}</th>
              <th className="py-3 px-3 text-right">{tr.lost}</th>
              <th className="py-3 px-3 text-right">{tr.tied}</th>
              <th className="py-3 px-4 text-right">{tr.nrr}</th>
              <th className="py-3 px-4 text-right"><strong className="text-white">{tr.points}</strong></th>
              <th className="py-3 px-4 text-center min-w-[120px]">{tr.recentForm}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {currentTable.map((team) => {
              const isPlayoffZone = team.position <= 4;
              const isSelected = selectedTeam === team.teamId;

              return (
                <tr
                  key={team.teamId}
                  onClick={() => setSelectedTeam(isSelected ? null : team.teamId)}
                  className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                    isSelected ? 'bg-slate-800/60' : ''
                  }`}
                >
                  {/* Position with Playoff indicator stripe */}
                  <td className="py-3.5 px-4 text-center font-bold text-slate-400 relative">
                    {isPlayoffZone && (
                      <span className="absolute left-0 inset-y-1.5 w-1 bg-emerald-500 rounded-r" />
                    )}
                    <span className={isPlayoffZone ? 'text-emerald-400 font-sports text-base' : 'text-slate-400 font-sports text-base'}>
                      {team.position}
                    </span>
                  </td>

                  {/* Team Logo & Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-base shadow border border-slate-700/60"
                        style={{ backgroundColor: `${team.color}25` }}
                      >
                        {team.logo}
                      </div>
                      <div>
                        <div className="font-bold text-white tracking-tight">
                          {lang === 'ta' ? team.teamNameTa : team.teamName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {team.shortName}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Stats columns */}
                  <td className="py-3.5 px-3 text-right font-mono tabular-nums text-slate-300">
                    {team.played}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono tabular-nums text-emerald-400 font-semibold">
                    {team.won}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono tabular-nums text-rose-400">
                    {team.lost}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono tabular-nums text-slate-400">
                    {team.tied}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-medium text-slate-200">
                    {team.netRunRate > 0 ? `+${team.netRunRate.toFixed(3)}` : team.netRunRate.toFixed(3)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-sports font-black text-base text-amber-400 tabular-nums">
                    {team.points}
                  </td>

                  {/* Form guide badges */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {team.recentForm.map((result, idx) => {
                        let formStyle = 'bg-slate-800 text-slate-400 border-slate-700';
                        if (result === 'W') {
                          formStyle = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold';
                        } else if (result === 'L') {
                          formStyle = 'bg-rose-500/20 text-rose-400 border-rose-500/40 font-bold';
                        }

                        return (
                          <span
                            key={idx}
                            title={result === 'W' ? 'Won' : result === 'L' ? 'Lost' : 'No Result'}
                            className={`w-5 h-5 rounded-md border text-[10px] flex items-center justify-center font-mono ${formStyle}`}
                          >
                            {result}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
