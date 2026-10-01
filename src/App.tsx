import React, { useState } from 'react';
import { Language } from './types/cricket';
import { useLiveScoreEngine } from './services/liveScoreEngine';
import { Header } from './components/Header';
import { LiveMatchesTicker } from './components/LiveMatchesTicker';
import { FeaturedLiveMatch } from './components/FeaturedLiveMatch';
import { MatchCenter } from './components/MatchCenter';
import { UpcomingMatches } from './components/UpcomingMatches';
import { PointsTable } from './components/PointsTable';
import { RecentResults } from './components/RecentResults';
import { PlayerStats } from './components/PlayerStats';
import { LiveEventToast } from './components/LiveEventToast';
import { AiMatchAnalysisModal } from './components/AiMatchAnalysisModal';
import { WordPressEmbedModal } from './components/WordPressEmbedModal';
import { PushNotificationBanner } from './components/PushNotificationBanner';
import { Footer } from './components/Footer';

export default function App() {
  // Default to Tamil ('ta') as requested by user, with 1-click toggle to English ('en')
  const [lang, setLang] = useState<Language>('ta');
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'points' | 'results' | 'stats'>('live');
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState<boolean>(false);
  const [isWordPressModalOpen, setIsWordPressModalOpen] = useState<boolean>(false);

  const {
    matches,
    activeMatch,
    activeMatchId,
    setActiveMatchId,
    isPlaying,
    setIsPlaying,
    speedMs,
    setSpeedMs,
    soundEnabled,
    setSoundEnabled,
    voiceEnabled,
    setVoiceEnabled,
    advanceOneBall,
    banner,
    dismissBanner,
  } = useLiveScoreEngine(lang);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ta' ? 'en' : 'ta'));
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const toggleSpeed = () => {
    setSpeedMs(prev => (prev === 3500 ? 1500 : 3500));
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const toggleVoice = () => {
    setVoiceEnabled(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        speedMs={speedMs}
        onToggleSpeed={toggleSpeed}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        voiceEnabled={voiceEnabled}
        onToggleVoice={toggleVoice}
        onNextBall={advanceOneBall}
        onOpenWordPress={() => setIsWordPressModalOpen(true)}
      />

      {/* Live Matches Switcher Ticker */}
      <LiveMatchesTicker
        matches={matches}
        activeMatchId={activeMatchId}
        onSelectMatch={setActiveMatchId}
        lang={lang}
      />

      {/* Floating Boundary & Wicket Event Toast Banner */}
      <LiveEventToast
        banner={banner}
        lang={lang}
        onDismiss={dismissBanner}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Browser Push Notification Permission & Status Bar */}
        <PushNotificationBanner lang={lang} />

        {/* Tab 1: Live Scores & Match Center */}
        {activeTab === 'live' && (
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

            <MatchCenter
              match={activeMatch}
              lang={lang}
            />
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

      {/* AI Match Insights Modal */}
      <AiMatchAnalysisModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        match={activeMatch}
        lang={lang}
      />

      {/* WordPress Embed Modal */}
      <WordPressEmbedModal
        isOpen={isWordPressModalOpen}
        onClose={() => setIsWordPressModalOpen(false)}
        lang={lang}
      />

      {/* Footer */}
      <Footer
        lang={lang}
        onSelectTab={setActiveTab}
      />

    </div>
  );
}
