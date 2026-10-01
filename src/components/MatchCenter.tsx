import React, { useState } from 'react';
import { CricketMatch, Language } from '../types/cricket';
import { t } from '../utils/translations';
import { MessageSquare, Table, BarChart3, Users, CloudRain, ShieldCheck } from 'lucide-react';

interface MatchCenterProps {
  match: CricketMatch;
  lang: Language;
}

export const MatchCenter: React.FC<MatchCenterProps> = ({ match, lang }) => {
  const [activeTab, setActiveTab] = useState<'commentary' | 'scorecard' | 'charts' | 'lineups' | 'pitch'>('commentary');
  const [selectedInnings, setSelectedInnings] = useState<1 | 2>(match.currentInningsNumber || 2);
  const tr = t[lang];

  const currentInningsData = selectedInnings === 1 ? match.innings1 : (match.innings2 || match.innings1);

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden mt-6">
      
      {/* Sub Tabs Navigation */}
      <div className="border-b border-slate-800 bg-slate-950/60 px-4 sm:px-6 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar">
          <button
            onClick={() => setActiveTab('commentary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'commentary'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{tr.commentary}</span>
          </button>

          <button
            onClick={() => setActiveTab('scorecard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'scorecard'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>{tr.scorecard}</span>
          </button>

          <button
            onClick={() => setActiveTab('charts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'charts'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{tr.analytics}</span>
          </button>

          <button
            onClick={() => setActiveTab('lineups')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'lineups'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{tr.playingXI}</span>
          </button>

          <button
            onClick={() => setActiveTab('pitch')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'pitch'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>{tr.pitchReport}</span>
          </button>
        </div>

        {/* Innings Selector when viewing Scorecard or Analytics */}
        {(activeTab === 'scorecard' || activeTab === 'charts') && (
          <div className="flex items-center gap-1 py-2">
            <button
              onClick={() => setSelectedInnings(1)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                selectedInnings === 1
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              1st Inn ({match.team1.shortName})
            </button>
            <button
              onClick={() => setSelectedInnings(2)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                selectedInnings === 2
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              2nd Inn ({match.team2.shortName})
            </button>
          </div>
        )}
      </div>

      {/* Tab 1: Live Ball-by-Ball Commentary */}
      {activeTab === 'commentary' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span className="font-semibold uppercase tracking-wider">{tr.commentary}</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-live" />
              {tr.instantUpdatesBadge}
            </span>
          </div>

          <div className="space-y-3">
            {match.recentBalls.map((b) => {
              const isHighlight = b.isFour || b.isSix || b.isWicket;
              return (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    b.isWicket
                      ? 'bg-red-950/20 border-red-800/60'
                      : b.isSix
                      ? 'bg-amber-950/20 border-amber-800/60'
                      : b.isFour
                      ? 'bg-blue-950/20 border-blue-800/60'
                      : 'bg-slate-950/50 border-slate-800/70 hover:bg-slate-950/80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Over Ball Badge */}
                    <div className="flex flex-col items-center">
                      <span className="px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-sports font-bold text-white tabular-nums">
                        {b.over}.{b.ball}
                      </span>
                      {b.speedKmph && (
                        <span className="text-[10px] text-slate-500 font-mono mt-1">
                          {b.speedKmph}k
                        </span>
                      )}
                    </div>

                    {/* Commentary Prose */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="text-xs font-semibold text-slate-300">
                          <strong className="text-white">{b.bowlerName}</strong> to <strong className="text-white">{b.batsmanName}</strong>
                        </div>
                        {isHighlight && (
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            b.isWicket
                              ? 'bg-red-600 text-white'
                              : b.isSix
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-blue-600 text-white'
                          }`}>
                            {b.isWicket ? tr.wicketOut : b.isSix ? tr.maximumSix : tr.boundaryFour}
                          </span>
                        )}
                      </div>

                      {/* Primary Language Text */}
                      <p className="text-sm font-medium text-slate-100 leading-relaxed">
                        {lang === 'ta' ? b.commentaryTa : b.commentaryEn}
                      </p>

                      {/* Secondary translation preview */}
                      <p className="text-xs text-slate-400 italic">
                        {lang === 'ta' ? b.commentaryEn : b.commentaryTa}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Full Scorecard */}
      {activeTab === 'scorecard' && (
        <div className="p-4 sm:p-6 space-y-6">
          
          {/* Batting Scorecard Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>{currentInningsData.teamName} - {tr.batting}</span>
                <span className="text-xs text-emerald-400 font-sports tabular-nums">
                  ({currentInningsData.totalRuns}/{currentInningsData.wickets} in {currentInningsData.overs} ov)
                </span>
              </h3>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4">{tr.batting}</th>
                    <th className="py-2.5 px-4">Dismissal</th>
                    <th className="py-2.5 px-4 text-right">{tr.runs}</th>
                    <th className="py-2.5 px-4 text-right">{tr.balls}</th>
                    <th className="py-2.5 px-4 text-right">4s</th>
                    <th className="py-2.5 px-4 text-right">6s</th>
                    <th className="py-2.5 px-4 text-right">{tr.strikeRate}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-950/30">
                  {currentInningsData.batsmen.map((bat) => (
                    <tr key={bat.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-white">
                        {lang === 'ta' ? bat.nameTa : bat.name}
                        {bat.isStriker && <span className="ml-1 text-emerald-400">*</span>}
                      </td>
                      <td className="py-2.5 px-4 text-slate-400 text-[11px]">
                        {bat.isOut ? (lang === 'ta' ? bat.dismissalInfoTa : bat.dismissalInfo) : (
                          <span className="text-emerald-400 font-medium">Batting</span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-right font-bold text-white font-mono tabular-nums">{bat.runs}</td>
                      <td className="py-2.5 px-4 text-right text-slate-400 font-mono tabular-nums">{bat.balls}</td>
                      <td className="py-2.5 px-4 text-right text-slate-300 font-mono tabular-nums">{bat.fours}</td>
                      <td className="py-2.5 px-4 text-right text-slate-300 font-mono tabular-nums">{bat.sixes}</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-emerald-400 font-mono tabular-nums">{bat.strikeRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Extras line */}
            <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-lg mt-2 flex items-center justify-between text-xs text-slate-400">
              <span>{tr.extras}: <strong className="text-white">{currentInningsData.extras.total}</strong> (b {currentInningsData.extras.byes}, lb {currentInningsData.extras.legByes}, w {currentInningsData.extras.wides}, nb {currentInningsData.extras.noBalls})</span>
              <span>Total: <strong className="text-white font-sports text-sm">{currentInningsData.totalRuns}/{currentInningsData.wickets}</strong> ({currentInningsData.overs} Overs, CRR: {(currentInningsData.totalRuns / (currentInningsData.balls / 6 || 1)).toFixed(2)})</span>
            </div>
          </div>

          {/* Bowling Scorecard Table */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              {tr.bowling}
            </h3>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4">{tr.bowling}</th>
                    <th className="py-2.5 px-4 text-right">{tr.overs}</th>
                    <th className="py-2.5 px-4 text-right">{tr.maidens}</th>
                    <th className="py-2.5 px-4 text-right">{tr.runs}</th>
                    <th className="py-2.5 px-4 text-right">{tr.wickets}</th>
                    <th className="py-2.5 px-4 text-right">{tr.econ}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-950/30">
                  {currentInningsData.bowlers.map((bw) => (
                    <tr key={bw.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-white">
                        {lang === 'ta' ? bw.nameTa : bw.name}
                        {bw.isCurrentBowler && <span className="ml-1 text-cyan-400">*</span>}
                      </td>
                      <td className="py-2.5 px-4 text-right text-slate-300 font-mono tabular-nums">{bw.overs}</td>
                      <td className="py-2.5 px-4 text-right text-slate-400 font-mono tabular-nums">{bw.maidens}</td>
                      <td className="py-2.5 px-4 text-right text-slate-200 font-mono tabular-nums">{bw.runs}</td>
                      <td className="py-2.5 px-4 text-right font-bold text-amber-400 font-mono tabular-nums">{bw.wickets}</td>
                      <td className="py-2.5 px-4 text-right text-slate-300 font-mono tabular-nums">{bw.economy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fall of Wickets */}
          {currentInningsData.fallOfWickets.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                {tr.fallOfWickets}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {currentInningsData.fallOfWickets.map((fow) => (
                  <div key={fow.wicketNo} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                    <div className="font-bold text-amber-400 font-mono">
                      {fow.score}/{fow.wicketNo}
                    </div>
                    <div className="text-[11px] text-slate-300 truncate mt-0.5">
                      {fow.batsmanName}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Over {fow.over}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Tab 3: Analytics & Worm / Manhattan Charts */}
      {activeTab === 'charts' && (
        <div className="p-4 sm:p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {tr.overByOverChart}
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {currentInningsData.teamName} Innings Progression
              </span>
            </div>

            {/* Manhattan Bar Simulation */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
                <span>Manhattan: Runs scored per over</span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> 1-9 Runs
                  <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block" /> 10-15 Runs
                  <span className="w-2.5 h-2.5 rounded bg-rose-500 inline-block" /> 16+ Runs
                </span>
              </div>

              {/* Bar graph */}
              <div className="h-44 flex items-end gap-1.5 pt-4 pb-2 border-b border-slate-800">
                {Array.from({ length: 20 }, (_, idx) => {
                  const overNum = idx + 1;
                  // Sample realistic run per over progression
                  const runs = [9, 12, 7, 14, 8, 15, 6, 11, 8, 9, 16, 7, 10, 13, 11, 18, 14, 16, 12, 14][idx] || 8;
                  const isCurrent = overNum === Math.ceil(currentInningsData.overs);
                  const isCompleted = overNum <= Math.ceil(currentInningsData.overs);

                  let barColor = 'bg-emerald-500/80';
                  if (runs >= 16) barColor = 'bg-rose-500/90';
                  else if (runs >= 10) barColor = 'bg-amber-500/90';

                  const heightPercent = Math.min(100, (runs / 22) * 100);

                  return (
                    <div key={overNum} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] font-mono px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-20 border border-slate-700">
                        Ov {overNum}: {runs} runs
                      </div>

                      <div className="w-full bg-slate-800/40 rounded-t h-36 flex items-end">
                        <div
                          className={`w-full rounded-t transition-all ${
                            isCompleted ? barColor : 'bg-slate-800'
                          } ${isCurrent ? 'ring-2 ring-emerald-400' : ''}`}
                          style={{ height: `${isCompleted ? heightPercent : 0}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{overNum}</span>
                    </div>
                  );
                })}
              </div>

              {/* Worm Run Rate Comparison Chart */}
              <div className="pt-4">
                <div className="text-xs text-slate-400 font-medium mb-3">
                  Worm Chart: Cumulative Score Comparison
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-400">Powerplay (1-6)</div>
                    <div className="font-sports text-base font-bold text-white mt-1">65/0 (CRR: 10.83)</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-400">Middle Overs (7-15)</div>
                    <div className="font-sports text-base font-bold text-white mt-1">82/3 (CRR: 9.11)</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-400">Death Overs (16-20)</div>
                    <div className="font-sports text-base font-bold text-emerald-400 mt-1">18/1 (CRR: 12.00)</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="text-slate-400">{tr.projectedScore}</div>
                    <div className="font-sports text-base font-bold text-amber-400 mt-1">192 (at current rate)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Playing XI Squads */}
      {activeTab === 'lineups' && (
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Team 1 Playing XI */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <span className="text-lg">{match.team1.logo}</span>
                <h4 className="font-bold text-white text-sm">
                  {lang === 'ta' ? match.team1.nameTa : match.team1.name} Playing XI
                </h4>
              </div>
              <ul className="space-y-2 text-xs">
                {match.innings1.batsmen.map((p, idx) => (
                  <li key={p.id} className="flex items-center justify-between p-2 rounded bg-slate-900/50">
                    <span className="font-medium text-slate-200">
                      {idx + 1}. {lang === 'ta' ? p.nameTa : p.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{p.role}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Team 2 Playing XI */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <span className="text-lg">{match.team2.logo}</span>
                <h4 className="font-bold text-white text-sm">
                  {lang === 'ta' ? match.team2.nameTa : match.team2.name} Playing XI
                </h4>
              </div>
              <ul className="space-y-2 text-xs">
                {match.innings2?.batsmen.map((p, idx) => (
                  <li key={p.id} className="flex items-center justify-between p-2 rounded bg-slate-900/50">
                    <span className="font-medium text-slate-200">
                      {idx + 1}. {lang === 'ta' ? p.nameTa : p.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{p.role}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* Tab 5: Pitch & Venue Report */}
      {activeTab === 'pitch' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Pitch condition card */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                {tr.pitchReport}
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed">
                {lang === 'ta' ? match.pitchReportTa : match.pitchReport}
              </p>
              <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Chepauk Pitch curators report high moisture & dew factor in 2nd innings.</span>
              </div>
            </div>

            {/* Weather & Venue Stats */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                {tr.venue} & {tr.weather}
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2 rounded bg-slate-900">
                  <span className="text-slate-400">Temperature</span>
                  <div className="font-bold text-white font-mono text-sm mt-0.5">{match.weather.tempC}°C</div>
                </div>
                <div className="p-2 rounded bg-slate-900">
                  <span className="text-slate-400">Rain Chance</span>
                  <div className="font-bold text-emerald-400 font-mono text-sm mt-0.5">{match.weather.rainChance}%</div>
                </div>
                <div className="p-2 rounded bg-slate-900">
                  <span className="text-slate-400">Avg 1st Inn Score</span>
                  <div className="font-bold text-white font-mono text-sm mt-0.5">178 Runs</div>
                </div>
                <div className="p-2 rounded bg-slate-900">
                  <span className="text-slate-400">Chasing Win Rate</span>
                  <div className="font-bold text-cyan-400 font-mono text-sm mt-0.5">58% Wins</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
