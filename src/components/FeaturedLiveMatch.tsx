import React from 'react';
import { CricketMatch, Language } from '../types/cricket';
import { t } from '../utils/translations';
import { Play, Pause, FastForward, Volume2, VolumeX, Sparkles, MapPin, CloudSun, ShieldAlert } from 'lucide-react';

interface FeaturedLiveMatchProps {
  match: CricketMatch;
  lang: Language;
  isPlaying: boolean;
  onTogglePlay: () => void;
  speedMs: number;
  onToggleSpeed: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onNextBall: () => void;
  onOpenAnalysis: () => void;
}

export const FeaturedLiveMatch: React.FC<FeaturedLiveMatchProps> = ({
  match,
  lang,
  isPlaying,
  onTogglePlay,
  speedMs,
  onToggleSpeed,
  soundEnabled,
  onToggleSound,
  onNextBall,
  onOpenAnalysis,
}) => {
  const tr = t[lang];
  const inn1 = match.innings1;
  const inn2 = match.innings2;

  // Active batsmen
  const activeBatsmen = inn2?.batsmen.filter(b => !b.isOut).slice(0, 2) || [];
  const striker = activeBatsmen.find(b => b.isStriker) || activeBatsmen[0];
  const nonStriker = activeBatsmen.find(b => !b.isStriker) || activeBatsmen[1];

  // Active bowler
  const currentBowler = inn2?.bowlers.find(bw => bw.isCurrentBowler) || inn2?.bowlers[0];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-2xl">
      
      {/* Decorative stadium turf lighting effect */}
      <div 
        className="absolute top-0 inset-x-0 h-44 opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.45) 0%, rgba(14, 165, 233, 0.15) 50%, transparent 80%)'
        }}
      />

      {/* Top Match Context Bar */}
      <div className="relative z-10 px-5 py-3.5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-slate-950/40">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-emerald-400 uppercase tracking-wide">
            {match.tournament}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{match.matchNumber}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            {lang === 'ta' ? match.venueTa : match.venue}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Pitch & Weather mini snippet */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>{match.weather.tempC}°C {lang === 'ta' ? match.weather.conditionTa : match.weather.condition}</span>
            </span>
          </div>

          <button
            onClick={onOpenAnalysis}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{tr.aiAnalysis}</span>
          </button>
        </div>
      </div>

      {/* Main Scoreboard Arena */}
      <div className="relative z-10 p-5 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left: Batting Team & Big Score */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Team Badges & Current Score */}
            <div className="flex items-start sm:items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg border border-slate-700"
                    style={{ backgroundColor: `${match.team2.color}25` }}
                  >
                    {match.team2.logo}
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                      <span>{lang === 'ta' ? match.team2.nameTa : match.team2.name}</span>
                      <span className="px-2 py-0.5 text-xs font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                        {tr.batting}
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {lang === 'ta' ? match.tossResultTa : match.tossResult}
                    </p>
                  </div>
                </div>
              </div>

              {/* Big Live Digital Score Display */}
              <div className="text-right">
                <div className="font-sports text-4xl sm:text-5xl lg:text-6xl font-black text-white tabular-nums tracking-tight">
                  {inn2 ? inn2.totalRuns : 0}
                  <span className="text-slate-400 text-3xl sm:text-4xl">/{inn2 ? inn2.wickets : 0}</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-mono tabular-nums mt-0.5 flex items-center justify-end gap-2">
                  <span>{tr.overs}: <strong className="text-white">{inn2?.overs}</strong>/20</span>
                  <span className="text-slate-600">|</span>
                  <span>{tr.crr}: <strong className="text-emerald-400">{match.currentRunRate}</strong></span>
                  {match.requiredRunRate ? (
                    <>
                      <span className="text-slate-600">|</span>
                      <span>{tr.rrr}: <strong className="text-amber-400">{match.requiredRunRate}</strong></span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Chasing Target / Situation Highlight Box */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-live" />
                <span className="text-sm sm:text-base font-bold text-emerald-300">
                  {lang === 'ta' ? match.statusTextTa : match.statusText}
                </span>
              </div>
              {match.target && (
                <div className="text-xs text-slate-400 font-mono">
                  {tr.target}: <strong className="text-white">{match.target}</strong>
                </div>
              )}
            </div>

            {/* Win Probability Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: match.team1.color }} />
                  {match.team1.shortName} {match.winProbabilityTeam1}%
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-400">
                  {tr.winProbability}
                </span>
                <span className="flex items-center gap-1.5">
                  {match.team2.shortName} {match.winProbabilityTeam2}%
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: match.team2.color }} />
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5">
                <div 
                  className="h-full rounded-l-full transition-all duration-700 ease-out"
                  style={{ 
                    width: `${match.winProbabilityTeam1}%`,
                    backgroundColor: match.team1.color || '#3b82f6'
                  }}
                />
                <div 
                  className="h-full rounded-r-full transition-all duration-700 ease-out"
                  style={{ 
                    width: `${match.winProbabilityTeam2}%`,
                    backgroundColor: match.team2.color || '#eab308'
                  }}
                />
              </div>
            </div>

            {/* Recent Balls Timeline */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider">{tr.recentBalls}</span>
                <span className="text-[11px] text-slate-500">Live Over</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {match.recentBalls.slice(0, 8).map((ball, i) => {
                  let badgeStyle = 'bg-slate-800/90 text-slate-300 border-slate-700';
                  let content = `${ball.runs}`;

                  if (ball.isSix) {
                    badgeStyle = 'bg-gradient-to-br from-amber-500 to-rose-600 text-white font-extrabold shadow-lg shadow-amber-500/30 scale-105 border-amber-400';
                    content = '6';
                  } else if (ball.isFour) {
                    badgeStyle = 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-500/20 border-blue-400';
                    content = '4';
                  } else if (ball.isWicket) {
                    badgeStyle = 'bg-red-600 text-white font-extrabold shadow-lg shadow-red-600/40 animate-pulse border-red-400';
                    content = 'W';
                  } else if (ball.runs === 0) {
                    badgeStyle = 'bg-slate-900 text-slate-500 border-slate-800';
                    content = '•';
                  }

                  return (
                    <div
                      key={ball.id || i}
                      title={`${ball.batsmanName} vs ${ball.bowlerName}: ${ball.runs} runs`}
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center text-xs font-sports tabular-nums shrink-0 transition-transform ${badgeStyle}`}
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right: Active Batsmen & Bowler Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 1st Innings Snapshot Card */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">{match.team1.logo}</span>
                <span className="font-semibold text-slate-300">
                  {lang === 'ta' ? match.team1.nameTa : match.team1.name} (1st Innings)
                </span>
              </div>
              <div className="font-sports text-sm font-bold text-slate-200 tabular-nums">
                {inn1.totalRuns}/{inn1.wickets} <span className="text-slate-400 font-sans text-xs">({inn1.overs} ov)</span>
              </div>
            </div>

            {/* Active Batsmen Card */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>{tr.batting}</span>
                <div className="grid grid-cols-4 gap-4 text-right font-mono text-[11px] text-slate-400">
                  <span>{tr.runs}</span>
                  <span>{tr.balls}</span>
                  <span>4s/6s</span>
                  <span>{tr.strikeRate}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                {activeBatsmen.map((bat) => (
                  <div 
                    key={bat.id} 
                    className={`flex items-center justify-between text-sm p-2 rounded-lg transition-colors ${
                      bat.isStriker ? 'bg-emerald-950/30 border border-emerald-500/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {bat.isStriker && (
                        <span className="text-emerald-400 text-xs font-bold" title="On strike">🏏*</span>
                      )}
                      <div>
                        <div className="font-semibold text-white">
                          {lang === 'ta' ? bat.nameTa : bat.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {bat.role}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-right font-mono tabular-nums text-xs">
                      <span className="font-bold text-white">{bat.runs}</span>
                      <span className="text-slate-400">{bat.balls}</span>
                      <span className="text-slate-300">{bat.fours}/{bat.sixes}</span>
                      <span className="text-emerald-400 font-semibold">{bat.strikeRate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Bowler Card */}
            {currentBowler && (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                  <span>{tr.bowling}</span>
                  <div className="grid grid-cols-4 gap-4 text-right font-mono text-[11px] text-slate-400">
                    <span>{tr.overs}</span>
                    <span>{tr.maidens}</span>
                    <span>{tr.runs}/{tr.wickets}</span>
                    <span>{tr.econ}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-slate-900/60">
                  <div>
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <span>{lang === 'ta' ? currentBowler.nameTa : currentBowler.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        Bowler
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {currentBowler.role}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-right font-mono tabular-nums text-xs">
                    <span className="text-slate-200">{currentBowler.overs}</span>
                    <span className="text-slate-400">{currentBowler.maidens}</span>
                    <span className="font-bold text-amber-300">{currentBowler.runs}/{currentBowler.wickets}</span>
                    <span className="text-slate-300">{currentBowler.economy}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Instant Interaction Actions Toolbar */}
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950/90 border border-slate-800/80">
              <div className="flex items-center gap-2">
                <button
                  onClick={onTogglePlay}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isPlaying 
                      ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30' 
                      : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? tr.pause : tr.resume}</span>
                </button>

                <button
                  onClick={onToggleSpeed}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Simulation Speed"
                >
                  <FastForward className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{speedMs === 1500 ? tr.speedFast : tr.speedLive}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onNextBall}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition-all cursor-pointer active:scale-95"
                >
                  {tr.nextBall} →
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
