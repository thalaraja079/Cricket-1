import React, { useState, useMemo } from 'react';
import { Language, TournamentType, CricketMatch } from '../types/cricket';
import { t } from '../utils/translations';
import { mockCompletedMatches } from '../data/mockCricketData';
import { 
  Award, 
  CheckCircle2, 
  MapPin, 
  Search, 
  Filter, 
  Calendar, 
  X, 
  RotateCcw,
  ArrowUpDown
} from 'lucide-react';

interface RecentResultsProps {
  lang: Language;
}

export const RecentResults: React.FC<RecentResultsProps> = ({ lang }) => {
  const tr = t[lang];

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTournament, setSelectedTournament] = useState<'All' | TournamentType>('All');
  const [selectedTeam, setSelectedTeam] = useState<string>('All');
  const [dateRangeFilter, setDateRangeFilter] = useState<'all' | '7days' | '30days' | 'custom'>('all');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Extract all unique teams from mockCompletedMatches for team dropdown
  const availableTeams = useMemo(() => {
    const map = new Map<string, { id: string; name: string; nameTa: string; shortName: string }>();
    mockCompletedMatches.forEach(m => {
      if (!map.has(m.team1.shortName)) {
        map.set(m.team1.shortName, { id: m.team1.id, name: m.team1.name, nameTa: m.team1.nameTa, shortName: m.team1.shortName });
      }
      if (!map.has(m.team2.shortName)) {
        map.set(m.team2.shortName, { id: m.team2.id, name: m.team2.name, nameTa: m.team2.nameTa, shortName: m.team2.shortName });
      }
    });
    return Array.from(map.values());
  }, []);

  // Filter logic
  const filteredMatches = useMemo(() => {
    return mockCompletedMatches.filter((m) => {
      // 1. Text search query (matches title, titleTa, team names, venue, player of match)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = m.title.toLowerCase();
        const matchTitleTa = m.titleTa.toLowerCase();
        const team1Name = m.team1.name.toLowerCase();
        const team1NameTa = m.team1.nameTa.toLowerCase();
        const team1Short = m.team1.shortName.toLowerCase();
        const team2Name = m.team2.name.toLowerCase();
        const team2NameTa = m.team2.nameTa.toLowerCase();
        const team2Short = m.team2.shortName.toLowerCase();
        const venue = m.venue.toLowerCase();
        const venueTa = m.venueTa.toLowerCase();
        const pomName = m.playerOfTheMatch ? m.playerOfTheMatch.name.toLowerCase() : '';
        const pomNameTa = m.playerOfTheMatch ? m.playerOfTheMatch.nameTa.toLowerCase() : '';

        const matchesQuery = 
          matchTitle.includes(query) ||
          matchTitleTa.includes(query) ||
          team1Name.includes(query) ||
          team1NameTa.includes(query) ||
          team1Short.includes(query) ||
          team2Name.includes(query) ||
          team2NameTa.includes(query) ||
          team2Short.includes(query) ||
          venue.includes(query) ||
          venueTa.includes(query) ||
          pomName.includes(query) ||
          pomNameTa.includes(query);

        if (!matchesQuery) return false;
      }

      // 2. Tournament filter
      if (selectedTournament !== 'All' && m.tournament !== selectedTournament) {
        return false;
      }

      // 3. Team filter
      if (selectedTeam !== 'All') {
        if (m.team1.shortName !== selectedTeam && m.team2.shortName !== selectedTeam) {
          return false;
        }
      }

      // 4. Date range filter
      if (m.matchDate) {
        const matchTime = new Date(m.matchDate).getTime();
        // Today anchor based on current 2026 calendar time
        const now = new Date('2026-09-30T19:00:00').getTime();

        if (dateRangeFilter === '7days') {
          const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
          if (matchTime < sevenDaysAgo) return false;
        } else if (dateRangeFilter === '30days') {
          const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
          if (matchTime < thirtyDaysAgo) return false;
        } else if (dateRangeFilter === 'custom') {
          if (customStartDate && matchTime < new Date(customStartDate).getTime()) {
            return false;
          }
          if (customEndDate && matchTime > new Date(customEndDate).getTime() + 86400000) {
            return false;
          }
        }
      }

      return true;
    }).sort((a, b) => {
      const dateA = a.matchDate ? new Date(a.matchDate).getTime() : 0;
      const dateB = b.matchDate ? new Date(b.matchDate).getTime() : 0;
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [searchQuery, selectedTournament, selectedTeam, dateRangeFilter, customStartDate, customEndDate, sortOrder]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedTournament !== 'All' || selectedTeam !== 'All' || dateRangeFilter !== 'all' || customStartDate !== '' || customEndDate !== '';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedTournament('All');
    setSelectedTeam('All');
    setDateRangeFilter('all');
    setCustomStartDate('');
    setCustomEndDate('');
    setSortOrder('newest');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span>{tr.completed}</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {filteredMatches.length} {lang === 'ta' ? 'போட்டிகள்' : 'Matches'}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'ta' 
              ? 'முடிவடைந்த போட்டிகளை அணி, தொடர் அல்லது தேதி வாரியாக தேடிப் பாருங்கள்' 
              : 'Search and filter past match scores, summaries and player of the match awards'}
          </p>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetAllFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'வடிகட்டிகளை மீட்டமை' : 'Reset Filters'}</span>
          </button>
        )}
      </div>

      {/* Filter and Search Controls Arena */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-5 space-y-4 shadow-xl">
        
        {/* Row 1: Search Bar & Sort Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input Box */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'ta' 
                  ? 'அணி பெயர், அரங்கம், ஆட்டநாயகன் மூலம் தேடுங்கள் (எ.கா: CSK, India, கோலி)...' 
                  : 'Search by team name, venue, or player (e.g., India, CSK, Bumrah, Kohli)...'
              }
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100 text-xs sm:text-sm placeholder:text-slate-500 transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Order Selector */}
          <div className="md:col-span-4 flex items-center gap-2">
            <button
              onClick={() => setSortOrder(prev => (prev === 'newest' ? 'oldest' : 'newest'))}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {sortOrder === 'newest'
                  ? (lang === 'ta' ? 'புதியது முதலில்' : 'Newest First')
                  : (lang === 'ta' ? 'பழையது முதலில்' : 'Oldest First')}
              </span>
            </button>
          </div>

        </div>

        {/* Row 2: Tournament Filter, Team Selector, and Date Range Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
          
          {/* Tournament Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {lang === 'ta' ? 'தொடர் (Tournament)' : 'Tournament'}
            </label>
            <select
              value={selectedTournament}
              onChange={(e) => setSelectedTournament(e.target.value as 'All' | TournamentType)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-slate-200 outline-none cursor-pointer"
            >
              <option value="All">{lang === 'ta' ? 'அனைத்து தொடர்களும்' : 'All Tournaments'}</option>
              <option value="IPL 2026">IPL 2026</option>
              <option value="ICC T20 World Cup">ICC T20 World Cup</option>
              <option value="Champions Trophy">Champions Trophy</option>
              <option value="Bilateral Series">Bilateral Series</option>
            </select>
          </div>

          {/* Team Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {lang === 'ta' ? 'அணி (Team)' : 'Team'}
            </label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-slate-200 outline-none cursor-pointer"
            >
              <option value="All">{lang === 'ta' ? 'அனைத்து அணிகளும்' : 'All Teams'}</option>
              {availableTeams.map((team) => (
                <option key={team.shortName} value={team.shortName}>
                  {team.shortName} - {lang === 'ta' ? team.nameTa : team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Selector */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {lang === 'ta' ? 'கால அளவு (Date Range)' : 'Date Range'}
            </label>
            <select
              value={dateRangeFilter}
              onChange={(e) => setDateRangeFilter(e.target.value as 'all' | '7days' | '30days' | 'custom')}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-slate-200 outline-none cursor-pointer"
            >
              <option value="all">{lang === 'ta' ? 'எல்லாக் காலமும் (All Time)' : 'All Time'}</option>
              <option value="7days">{lang === 'ta' ? 'கடந்த 7 நாட்கள்' : 'Last 7 Days'}</option>
              <option value="30days">{lang === 'ta' ? 'கடந்த 30 நாட்கள்' : 'Last 30 Days'}</option>
              <option value="custom">{lang === 'ta' ? 'தேதியை தேர்வு செய்க' : 'Custom Date Range'}</option>
            </select>
          </div>

        </div>

        {/* Optional Custom Date Inputs when 'custom' is selected */}
        {dateRangeFilter === 'custom' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 animate-in fade-in">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">
                {lang === 'ta' ? 'தொடக்கத் தேதி (From)' : 'Start Date'}
              </label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">
                {lang === 'ta' ? 'முடிவுத் தேதி (To)' : 'End Date'}
              </label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none"
              />
            </div>
          </div>
        )}

      </div>

      {/* Matches Results Grid or Empty State */}
      {filteredMatches.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-10 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-2xl">
            🏏
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              {lang === 'ta' ? 'பொருத்தமான போட்டிகள் எதுவும் கிடைக்கவில்லை' : 'No Matches Found'}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {lang === 'ta'
                ? 'உங்கள் தேடல் அல்லது வடிகட்டிக்கு பொருத்தமான எந்தவொரு முடிவுற்ற போட்டியும் இல்லை. தேடல் சொற்களை மாற்றி முயற்சிக்கவும்.'
                : 'There are no completed matches matching your filter or search query. Try resetting your search filters.'}
            </p>
          </div>
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            {lang === 'ta' ? 'வடிகட்டிகளை அகற்றி அனைத்தையும் காட்டு' : 'Clear All Filters & Show All'}
          </button>
        </div>
      ) : (
        /* Populated Matches Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredMatches.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all p-5 space-y-4 shadow-lg group hover:shadow-xl"
            >
              {/* Context bar: Tournament, Match No, Date, Venue */}
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-emerald-400 uppercase tracking-wide">
                    {m.tournament}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span>{m.matchNumber}</span>
                </div>

                {m.matchDateFormatted && (
                  <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{lang === 'ta' ? m.matchDateFormattedTa : m.matchDateFormatted}</span>
                  </div>
                )}
              </div>

              {/* Teams and Scores */}
              <div className="space-y-3">
                {/* Team 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{m.team1.logo}</span>
                    <div>
                      <div className="font-bold text-white text-base tracking-tight">
                        {lang === 'ta' ? m.team1.nameTa : m.team1.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {m.team1.shortName}
                      </div>
                    </div>
                  </div>
                  <div className="font-sports font-bold text-lg text-white tabular-nums">
                    {m.innings1.totalRuns}/{m.innings1.wickets}
                    <span className="text-xs text-slate-400 font-sans ml-1">({m.innings1.overs} ov)</span>
                  </div>
                </div>

                {/* Team 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{m.team2.logo}</span>
                    <div>
                      <div className="font-bold text-white text-base tracking-tight">
                        {lang === 'ta' ? m.team2.nameTa : m.team2.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {m.team2.shortName}
                      </div>
                    </div>
                  </div>
                  <div className="font-sports font-bold text-lg text-white tabular-nums">
                    {m.innings2?.totalRuns}/{m.innings2?.wickets}
                    <span className="text-xs text-slate-400 font-sans ml-1">({m.innings2?.overs} ov)</span>
                  </div>
                </div>
              </div>

              {/* Victory Result Banner */}
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 font-bold text-sm text-center">
                {lang === 'ta' ? m.statusTextTa : m.statusText}
              </div>

              {/* Venue and Player of the Match */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate max-w-[180px]">{lang === 'ta' ? m.venueTa : m.venue}</span>
                </div>

                {m.playerOfTheMatch && (
                  <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px]">
                    <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-slate-400">{tr.playerOfTheMatch}:</span>
                    <strong className="text-white">
                      {lang === 'ta' ? m.playerOfTheMatch.nameTa : m.playerOfTheMatch.name}
                    </strong>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
