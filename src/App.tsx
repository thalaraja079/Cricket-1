import React, { useState } from 'react';
import { Language } from './types/cricket';
import { Header } from './components/Header';
import { LiveMatchesTicker } from './components/LiveMatchesTicker';
import { FeaturedLiveMatch } from './components/FeaturedLiveMatch';
import { MatchCenter } from './components/MatchCenter';
import { UpcomingMatches } from './components/UpcomingMatches';
import { PointsTable } from './components/PointsTable';
import { RecentResults } from './components/RecentResults';
import { PlayerStats } from './components/PlayerStats';
import { WordPressEmbedModal } from './components/WordPressEmbedModal';
import { PushNotificationBanner } from './components/PushNotificationBanner';
import { LiveEventToast } from './components/LiveEventToast';
import { AiMatchAnalysisModal } from './components/AiMatchAnalysisModal';
import { useLiveScoreEngine } from './services/liveScoreEngine';
import { Footer } from './components/Footer';

export default function App() {
  const getInitialLang = (): Language => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang');
      if (langParam === 'ta' || langParam === 'en') return langParam;
    }
    return 'en';
  };

  const [lang, setLang] = useState<Language>(getInitialLang);
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming' | 'points' | 'results' | 'stats'>('live');
  const [isWordPressModalOpen, setIsWordPressModalOpen] = useState<boolean>(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState<boolean>(false);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ta' ? 'en' : 'ta'));
  };

  // Live real-time cricket simulation & state engine
  const {
    matches,
    activeMatch,
    activeMatchId,
    setActiveMatchId,
    isPlaying,
    setIsPlaying,
    advanceOneBall,
    soundEnabled,
    setSoundEnabled,
    speedMs,
    setSpeedMs,
    banner,
    dismissBanner,
  } = useLiveScoreEngine(lang);

  const togglePlay = () => setIsPlaying(prev => !prev);
  const toggleSound = () => setSoundEnabled(prev => !prev);
  const toggleSpeed = () => setSpeedMs(prev => (prev === 3500 ? 1500 : 3500));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenWordPress={() => setIsWordPressModalOpen(true)}
      />

      {/* Live Matches Ticker */}
      <LiveMatchesTicker
        matches={matches}
        activeMatchId={activeMatchId}
        onSelectMatch={setActiveMatchId}
        lang={lang}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Browser Push Notification Banner */}
        <PushNotificationBanner lang={lang} />

        {/* Live Celebration Banner (4s, 6s, Wickets) */}
        {banner && (
          <LiveEventToast banner={banner} lang={lang} onDismiss={dismissBanner} />
        )}

        {/* Default / Live Tab: ONLY THE LIVE MATCH SCORECARD & MATCH CENTER (No junk dumps below!) */}
        {(activeTab === 'live' || activeTab === 'all') && activeMatch && (
          <div className="space-y-6">
            <FeaturedLiveMatch
              match={activeMatch}
              lang={lang}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              speedMs={speedMs}
              onToggleSpeed={toggleSpeed}
              soundEnabled={soundEnabled}
              onToggleSound={toggleSound}
              onNextBall={advanceOneBall}
              onOpenAnalysis={() => setIsAnalysisModalOpen(true)}
            />

            <MatchCenter match={activeMatch} lang={lang} />
          </div>
        )}

        {/* Tab 2: Upcoming Matches */}
        {activeTab === 'upcoming' && (
          <UpcomingMatches lang={lang} />
        )}

        {/* Tab 3: Points Table */}
        {activeTab === 'points' && (
          <PointsTable lang={lang} />
        )}

        {/* Tab 4: Results */}
        {activeTab === 'results' && (
          <RecentResults lang={lang} />
        )}

        {/* Tab 5: Player Stats & Leaderboard */}
        {activeTab === 'stats' && (
          <PlayerStats lang={lang} />
        )}

      </main>

      {/* WordPress Embed Modal */}
      <WordPressEmbedModal
        isOpen={isWordPressModalOpen}
        onClose={() => setIsWordPressModalOpen(false)}
        lang={lang}
      />

      {/* AI Match Analysis Modal */}
      {activeMatch && (
        <AiMatchAnalysisModal
          isOpen={isAnalysisModalOpen}
          onClose={() => setIsAnalysisModalOpen(false)}
          match={activeMatch}
          lang={lang}
        />
      )}

      {/* Clean Footer */}
      <Footer lang={lang} onSelectTab={setActiveTab} />

    </div>
  );
}
