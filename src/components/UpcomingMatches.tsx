import React, { useState, useEffect } from 'react';
import { UpcomingMatch, Language, TournamentType } from '../types/cricket';
import { t } from '../utils/translations';
import { mockUpcomingMatches } from '../data/mockCricketData';
import { Bell, Check, Calendar, Clock, MapPin, Swords, Filter } from 'lucide-react';

interface UpcomingMatchesProps {
  lang: Language;
}

export const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ lang }) => {
  const tr = t[lang];
  const [matches, setMatches] = useState<UpcomingMatch[]>(() => {
    // load saved reminders from localStorage if any
    try {
      const saved = localStorage.getItem('cricpulse_reminders');
      if (saved) {
        const reminderIds = JSON.parse(saved);
        return mockUpcomingMatches.map(m => ({
          ...m,
          isReminderSet: reminderIds.includes(m.id)
        }));
      }
    } catch {
      // ignore
    }
    return mockUpcomingMatches;
  });

  const [selectedFilter, setSelectedFilter] = useState<'All' | TournamentType>('All');
  const [secondsMap, setSecondsMap] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    mockUpcomingMatches.forEach(m => {
      map[m.id] = m.startsInSeconds;
    });
    return map;
  });

  // Countdown timer tick every second
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsMap(prev => {
        const next: Record<string, number> = {};
        Object.keys(prev).forEach(k => {
          next[k] = Math.max(0, prev[k] - 1);
        });
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleReminder = (id: string) => {
    setMatches(prev => {
      const updated = prev.map(m => {
        if (m.id === id) {
          return { ...m, isReminderSet: !m.isReminderSet };
        }
        return m;
      });
      try {
        const reminderIds = updated.filter(m => m.isReminderSet).map(m => m.id);
        localStorage.setItem('cricpulse_reminders', JSON.stringify(reminderIds));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const filteredMatches = selectedFilter === 'All' 
    ? matches 
    : matches.filter(m => m.tournament === selectedFilter);

  const formatCountdown = (totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Filter */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{tr.upcoming}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              {filteredMatches.length} Matches
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'ta' 
              ? 'அடுத்து வரும் சர்வதேச மற்றும் ஐபிஎல் போட்டிகளின் முழு அட்டவணை மற்றும் கவுண்டவுன்' 
              : 'Complete upcoming schedule, live countdowns, head-to-head records and key matchups'}
          </p>
        </div>

        {/* Tournament Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto text-xs">
          {(['All', 'IPL 2026', 'Champions Trophy'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {filter === 'All' ? tr.allMatches : filter === 'IPL 2026' ? tr.ipl : tr.champTrophy}
            </button>
          ))}
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMatches.map((m) => {
          const remainingSecs = secondsMap[m.id] ?? m.startsInSeconds;

          return (
            <div
              key={m.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 transition-all shadow-lg hover:shadow-xl flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Top: Tournament & Stage */}
              <div className="p-4 border-b border-slate-800/70 bg-slate-950/40 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-emerald-400 uppercase tracking-wide">
                    {m.tournament}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span>{m.matchNo}</span>
                </div>
                <span className="text-[11px] text-amber-300 font-medium px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/40">
                  {lang === 'ta' ? m.stageTa : m.stage}
                </span>
              </div>

              {/* Match Teams Face-Off */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  {/* Team 1 */}
                  <div className="flex flex-col items-center text-center space-y-1.5 flex-1">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md border border-slate-700/60"
                      style={{ backgroundColor: `${m.team1.color}25` }}
                    >
                      {m.team1.logo}
                    </div>
                    <span className="text-sm font-bold text-white tracking-tight">
                      {lang === 'ta' ? m.team1.nameTa : m.team1.name}
                    </span>
                    <span className="text-xs text-slate-400 font-mono font-semibold">
                      {m.team1.shortName}
                    </span>
                  </div>

                  {/* VS Emblem & Countdown */}
                  <div className="flex flex-col items-center justify-center shrink-0">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-slate-300 shadow">
                      VS
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">
                        {tr.startsIn}
                      </div>
                      <div className="font-sports font-bold text-xs text-amber-300 tabular-nums">
                        {formatCountdown(remainingSecs)}
                      </div>
                    </div>
                  </div>

                  {/* Team 2 */}
                  <div className="flex flex-col items-center text-center space-y-1.5 flex-1">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md border border-slate-700/60"
                      style={{ backgroundColor: `${m.team2.color}25` }}
                    >
                      {m.team2.logo}
                    </div>
                    <span className="text-sm font-bold text-white tracking-tight">
                      {lang === 'ta' ? m.team2.nameTa : m.team2.name}
                    </span>
                    <span className="text-xs text-slate-400 font-mono font-semibold">
                      {m.team2.shortName}
                    </span>
                  </div>
                </div>

                {/* Match Date, Time & Venue */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{lang === 'ta' ? m.dateStrTa : m.dateStr}</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-300 font-mono">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{m.timeStr}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 pt-1 border-t border-slate-800/60">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">{lang === 'ta' ? m.venueTa : m.venue}</span>
                  </div>
                </div>

                {/* Head to Head record */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{tr.headToHead}</span>
                    <span className="font-mono text-slate-300">
                      {m.team1.shortName} {m.headToHead.team1Wins} - {m.headToHead.team2Wins} {m.team2.shortName}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                    <div 
                      className="h-full bg-emerald-500" 
                      style={{ width: `${(m.headToHead.team1Wins / (m.headToHead.total || 1)) * 100}%` }}
                    />
                    <div 
                      className="h-full bg-cyan-500" 
                      style={{ width: `${(m.headToHead.team2Wins / (m.headToHead.total || 1)) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Key Battle snippet */}
                <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs">
                  <div className="flex items-center gap-1 font-semibold text-emerald-400 text-[11px] mb-0.5">
                    <Swords className="w-3 h-3" />
                    <span>{tr.keyBattle}: {m.keyBattle.player1} vs {m.keyBattle.player2}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {lang === 'ta' ? m.keyBattle.descriptionTa : m.keyBattle.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Set Reminder Alert */}
              <div className="p-3 bg-slate-950/80 border-t border-slate-800/80">
                <button
                  onClick={() => toggleReminder(m.id)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    m.isReminderSet
                      ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {m.isReminderSet ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{tr.reminderActive}</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3.5 h-3.5" />
                      <span>{tr.setReminder}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
