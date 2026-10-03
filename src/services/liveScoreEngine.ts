import { useState, useEffect, useCallback, useRef } from 'react';
import { CricketMatch, BallEvent, BatsmanStats, MatchStatus, Language } from '../types/cricket';
import { initialLiveMatches } from '../data/mockCricketData';
import { cricketAudio } from './soundEffects';
import { notificationService } from './notificationService';
import { fetchRealLiveMatches } from './liveCricketApi';

interface LiveEventBanner {
  id: string;
  type: 'FOUR' | 'SIX' | 'WICKET' | 'RUN';
  runs: number;
  titleEn: string;
  titleTa: string;
  detailEn: string;
  detailTa: string;
}

const TAMIL_CRICKET_QUOTES = {
  four: [
    'அபாரமான கவர் டிரைவ்! பந்து பவுண்டரி எல்லைக் கோட்டை முத்தமிட்டது!',
    'நேர்த்தியான பேக்ஃபூட் பன்ச் - பவுண்டரி!',
    'மிட்-விக்கெட் திசையில் மின்னல் வேக பவுண்டரி!',
    'காலி இடத்தில் பந்தை அழகாக தள்ளிவிட்டு நான்கு ரன்கள்!',
  ],
  six: [
    'வானளாவிய சிக்ஸர்! பந்து மைதானத்தின் கூரை மேல் பறந்தது! 🔥',
    'அசுர பலத்துடன் அடித்த அசுர சிக்ஸர்! ரசிகர்களின் உற்சாக ஆரவாரம்!',
    'ஹெலிகாப்டர் ஷாட்! பந்து நேராக ஸ்டாண்டில் விழுந்தது!',
    'முழங்கால் போட்டு அடித்த அபாரமான சிக்ஸர்!',
  ],
  wicket: [
    'விக்கெட்! அசுரத்தனமான யார்க்கர் ஸ்டம்பை பதம் பார்த்தது! ஆட்டமிழந்தார்!',
    'பெரிய ஷாட்டுக்கு முயன்று கேட்ச் கொடுத்து வெளியேறினார்!',
    'அற்புதமான டைவிங் கேட்ச்! முக்கிய விக்கெட் வீழ்ந்தது!',
    'எல்.பி.டபிள்யூ முறையீடு - நடுவர் விரலை உயர்த்தினார்! விக்கெட்!',
  ],
  dot: [
    'சிறப்பான பந்துவீச்சு! பேட்டரால் ரன் எடுக்க முடியவில்லை. டாட் பால்.',
    'துல்லியமான லைன் மற்றும் லெங்த். நேர்த்தியான தடுப்பாட்டம்.',
  ],
  single: [
    'பந்தை நிதானமாக தட்டிவிட்டு ஒரு ரன் ஓடினர்.',
    'விரைவாக ஓடி ஒரு ரன் சேர்த்தனர்.',
  ],
  two: [
    'நல்ல ஓட்டம்! விக்கெட்டுகளுக்கு இடையே விரைவாக ஓடி 2 ரன்கள்.',
  ]
};

const ENGLISH_CRICKET_QUOTES = {
  four: [
    'Pierces the gap with pinpoint perfection! Races to the fence for FOUR!',
    'Crunched off the back foot! That ball was traveling like a tracer bullet!',
    'Sublime timing through extra cover, effortless boundary!',
    'Edged and flies past slip to the third-man boundary!',
  ],
  six: [
    'INTO THE NIGHT SKY! That has gone miles into the top tier! Colossal SIX! 🚀',
    'Stand and deliver! Clean strike right out of the middle of the willow!',
    'Helicopter whirl from MS Dhoni! The Chepauk crowd erupts into madness!',
    'Picked up off his pads and deposited 95 meters back into the stands!',
  ],
  wicket: [
    'BOWLED HIM! A 148km/h toe-crushing yorker flattens the off-stump! Pure magic!',
    'GONE! Slices it high in the air and safely taken at long-off! Huge wicket!',
    'Massive appeal for LBW and the umpire slowly raises his finger! OUT!',
    'Edged and taken behind! Feather nick through to the keeper!',
  ],
  dot: [
    'Good length ball angling in, defended solidly back down the pitch. Dot ball.',
    'Beaten by raw pace and seam movement outside the off-stump.',
  ],
  single: [
    'Dabs it gently towards mid-on and jogs through for a sharp single.',
    'Turned off the hips into the leg-side for one run.',
  ],
  two: [
    'Punched through the deep cover region, they push hard and come back for two.',
  ]
};

export function useLiveScoreEngine(lang: Language = 'en') {
  const [matches, setMatches] = useState<CricketMatch[]>(initialLiveMatches);
  const [activeMatchId, setActiveMatchId] = useState<string>(initialLiveMatches[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(3500); // 3500ms standard, 1500ms fast
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [banner, setBanner] = useState<LiveEventBanner | null>(null);
  const [realLiveMode, setRealLiveMode] = useState<boolean>(true);

  const activeMatch = matches.find(m => m.id === activeMatchId) || matches[0];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync audio preferences
  useEffect(() => {
    cricketAudio.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    cricketAudio.setVoiceEnabled(voiceEnabled);
  }, [voiceEnabled]);

  // Real API is authoritative. Never generate fake balls while live data mode is active.
  useEffect(() => {
    let cancelled = false;
    const refresh = async () => {
      const live = await fetchRealLiveMatches();
      if (cancelled || live === null) return;
      setRealLiveMode(true);
      setMatches(live);
      setActiveMatchId(current => live.some(m => m.id === current) ? current : (live[0]?.id || current));
    };
    refresh();
    const timer = setInterval(refresh, 15000);
    return () => { cancelled = true; clearInterval(timer); };
  }, []);

  const advanceOneBall = useCallback(() => {
    if (realLiveMode) return;
    setMatches(prevMatches => {
      return prevMatches.map(m => {
        if (m.id !== activeMatchId || m.status !== 'LIVE' || !m.innings2) {
          return m;
        }

        const inn2 = { ...m.innings2 };
        const inn1 = m.innings1;
        const currentBalls = inn2.balls + 1;
        const currentOver = Math.floor(currentBalls / 6);
        const ballInOver = currentBalls % 6 === 0 ? 6 : currentBalls % 6;
        const overDisplay = Number(`${currentOver}.${ballInOver === 6 ? 0 : ballInOver}`);

        // Outcomes generator with death-overs bias
        const rand = Math.random();
        let runs = 0;
        let isFour = false;
        let isSix = false;
        let isWicket = false;
        let eventType: 'FOUR' | 'SIX' | 'WICKET' | 'RUN' = 'RUN';

        if (rand < 0.22) {
          runs = 0; // Dot
        } else if (rand < 0.52) {
          runs = 1; // Single
        } else if (rand < 0.65) {
          runs = 2; // Two
        } else if (rand < 0.78) {
          runs = 4; // Four
          isFour = true;
          eventType = 'FOUR';
        } else if (rand < 0.90) {
          runs = 6; // Six
          isSix = true;
          eventType = 'SIX';
        } else {
          runs = 0; // Wicket
          isWicket = true;
          eventType = 'WICKET';
        }

        // Active striker
        const batsmen = inn2.batsmen.map(b => ({ ...b }));
        const strikerIdx = batsmen.findIndex(b => b.isStriker && !b.isOut);
        const nonStrikerIdx = batsmen.findIndex(b => !b.isStriker && !b.isOut);

        const currentStriker = strikerIdx !== -1 ? batsmen[strikerIdx] : batsmen[0];
        const currentNonStriker = nonStrikerIdx !== -1 ? batsmen[nonStrikerIdx] : batsmen[1];

        // Active bowler
        const bowlers = inn2.bowlers.map(bw => ({ ...bw }));
        let bowlerIdx = bowlers.findIndex(bw => bw.isCurrentBowler);
        if (bowlerIdx === -1) bowlerIdx = 0;
        const currentBowler = bowlers[bowlerIdx];

        // Sounds and celebrations
        if (isSix) {
          cricketAudio.playSixCelebration();
        } else if (isFour) {
          cricketAudio.playBoundaryFour();
        } else if (isWicket) {
          cricketAudio.playWicketSound();
        } else {
          cricketAudio.playBatHit();
        }

        // Pick commentary
        let commentaryTa = '';
        let commentaryEn = '';
        const quoteRand = Math.floor(Math.random() * 2);

        if (isSix) {
          commentaryTa = `${currentStriker.nameTa} - ${TAMIL_CRICKET_QUOTES.six[quoteRand]}`;
          commentaryEn = `${currentStriker.name} - ${ENGLISH_CRICKET_QUOTES.six[quoteRand]}`;
        } else if (isFour) {
          commentaryTa = `${currentStriker.nameTa} - ${TAMIL_CRICKET_QUOTES.four[quoteRand]}`;
          commentaryEn = `${currentStriker.name} - ${ENGLISH_CRICKET_QUOTES.four[quoteRand]}`;
        } else if (isWicket) {
          commentaryTa = `${currentBowler.nameTa} - ${TAMIL_CRICKET_QUOTES.wicket[quoteRand]} (${currentStriker.nameTa} வெளியேறினார்)`;
          commentaryEn = `${currentBowler.name} strikes! ${ENGLISH_CRICKET_QUOTES.wicket[quoteRand]} (${currentStriker.name} departs)`;
        } else if (runs === 0) {
          commentaryTa = `${TAMIL_CRICKET_QUOTES.dot[quoteRand]}`;
          commentaryEn = `${ENGLISH_CRICKET_QUOTES.dot[quoteRand]}`;
        } else if (runs === 1) {
          commentaryTa = `${currentStriker.nameTa} ${TAMIL_CRICKET_QUOTES.single[quoteRand]}`;
          commentaryEn = `${currentStriker.name} ${ENGLISH_CRICKET_QUOTES.single[quoteRand]}`;
        } else {
          commentaryTa = `${currentStriker.nameTa} ${TAMIL_CRICKET_QUOTES.two[0]}`;
          commentaryEn = `${currentStriker.name} ${ENGLISH_CRICKET_QUOTES.two[0]}`;
        }

        // Voice readout if enabled
        if (isFour || isSix || isWicket) {
          cricketAudio.speakCommentary(lang === 'ta' ? commentaryTa : commentaryEn, lang);
        }

        // Banner trigger
        if (isFour || isSix || isWicket) {
          setBanner({
            id: `ev-${Date.now()}`,
            type: eventType,
            runs,
            titleEn: isSix ? 'MAXIMUM SIX!' : isFour ? 'BOUNDARY FOUR!' : 'WICKET FALLS!',
            titleTa: isSix ? 'வானளாவிய சிக்ஸர்!' : isFour ? 'அபார பவுண்டரி!' : 'விக்கெட் வீழ்ந்தது!',
            detailEn: commentaryEn,
            detailTa: commentaryTa,
          });

          // auto dismiss banner after 2.8s
          setTimeout(() => {
            setBanner(prev => (prev?.runs === runs ? null : prev));
          }, 2800);
        }

        // Update batsman
        if (!isWicket) {
          currentStriker.runs += runs;
          currentStriker.balls += 1;
          if (isFour) currentStriker.fours += 1;
          if (isSix) currentStriker.sixes += 1;
          currentStriker.strikeRate = Number(((currentStriker.runs / currentStriker.balls) * 100).toFixed(1));
        } else {
          currentStriker.balls += 1;
          currentStriker.isOut = true;
          currentStriker.dismissalInfo = `b ${currentBowler.name}`;
          currentStriker.dismissalInfoTa = `பௌல்டு ${currentBowler.nameTa}`;

          // Bring next batsman from squad if available
          const nextBatter: BatsmanStats = {
            id: `sub-${Date.now()}`,
            name: 'Tilak Varma',
            nameTa: 'திலக் வர்மா',
            role: 'All-rounder',
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            strikeRate: 0.0,
            isStriker: true,
            isOut: false,
          };
          batsmen.push(nextBatter);
        }

        // Update bowler
        currentBowler.ballsCurrentOver += 1;
        currentBowler.runs += runs;
        if (isWicket) currentBowler.wickets += 1;
        const totalBowlerBalls = Math.floor(currentBowler.overs) * 6 + currentBowler.ballsCurrentOver;
        currentBowler.economy = Number(((currentBowler.runs / (totalBowlerBalls / 6))).toFixed(2));

        // Strike rotation on odd runs
        if (runs % 2 === 1 && !isWicket) {
          currentStriker.isStriker = false;
          currentNonStriker.isStriker = true;
        }

        // End of over: switch bowler & strike
        if (ballInOver === 6) {
          currentBowler.overs = Math.floor(currentBowler.overs) + 1;
          currentBowler.ballsCurrentOver = 0;
          currentBowler.isCurrentBowler = false;

          // rotate bowler
          const nextBowlerIdx = (bowlerIdx + 1) % bowlers.length;
          bowlers[nextBowlerIdx].isCurrentBowler = true;

          // Strike switches at end of over
          if (!isWicket) {
            currentStriker.isStriker = !currentStriker.isStriker;
            currentNonStriker.isStriker = !currentNonStriker.isStriker;
          }
        }

        // New total score
        const newTotalRuns = inn2.totalRuns + runs;
        const newWickets = inn2.wickets + (isWicket ? 1 : 0);
        const newOvers = overDisplay;
        const target = m.target || 188;
        const runsNeeded = Math.max(0, target - newTotalRuns);
        const ballsRemaining = Math.max(0, 120 - currentBalls);
        const crr = Number(((newTotalRuns / (currentBalls / 6))).toFixed(2));
        const rrr = ballsRemaining > 0 ? Number(((runsNeeded / (ballsRemaining / 6))).toFixed(2)) : 0;

        // Dynamic win probability momentum calculation
        let winProbTeam2 = Math.min(98, Math.max(5, Math.round(50 + (target - newTotalRuns < ballsRemaining * 1.5 ? 20 : -15) - (newWickets * 7) + (runsNeeded <= 12 ? 35 : 0))));
        if (newTotalRuns >= target) winProbTeam2 = 100;
        if (newWickets >= 10 || (ballsRemaining === 0 && newTotalRuns < target)) winProbTeam2 = 0;
        const winProbTeam1 = 100 - winProbTeam2;

        // Ball Event Object
        const newBallEvent: BallEvent = {
          id: `ball-${Date.now()}`,
          over: Math.floor(currentBalls / 6),
          ball: ballInOver,
          runs,
          isFour,
          isSix,
          isWicket,
          wicketType: isWicket ? 'bowled' : undefined,
          batsmanName: currentStriker.name,
          bowlerName: currentBowler.name,
          commentaryEn,
          commentaryTa,
          speedKmph: Math.floor(134 + Math.random() * 15),
          timestamp: 'Just now',
        };

        const updatedRecentBalls = [newBallEvent, ...m.recentBalls.slice(0, 14)];

        // Check Match Finish Condition
        let matchStatus: MatchStatus = m.status;
        let statusText = `${m.team2.shortName} need ${runsNeeded} runs in ${ballsRemaining} balls`;
        let statusTextTa = `${m.team2.nameTa} வெற்றிக்கு ${ballsRemaining} பந்துகளில் ${runsNeeded} ரன்கள் தேவை`;

        const isNewlyCompleted = (newTotalRuns >= target || newWickets >= 10 || ballsRemaining === 0) && m.status === 'LIVE';

        if (newTotalRuns >= target) {
          matchStatus = 'COMPLETED';
          statusText = `${m.team2.name} won by ${10 - newWickets} wickets!`;
          statusTextTa = `${m.team2.nameTa} ${10 - newWickets} விக்கெட்டுகள் வித்தியாசத்தில் வெற்றி பெற்றது! 🏆`;
        } else if (newWickets >= 10 || ballsRemaining === 0) {
          matchStatus = 'COMPLETED';
          statusText = `${m.team1.name} won by ${runsNeeded - 1} runs!`;
          statusTextTa = `${m.team1.nameTa} ${runsNeeded - 1} ரன்கள் வித்தியாசத்தில் வெற்றி பெற்றது! 🏆`;
        }

        // Fire browser push notifications for wickets and match finalization (even when tab is inactive)
        if (isWicket) {
          notificationService.notifyWicket(m, newBallEvent, lang);
        }
        if (isNewlyCompleted) {
          notificationService.notifyMatchResult({ ...m, statusText, statusTextTa }, lang);
        }

        inn2.totalRuns = newTotalRuns;
        inn2.wickets = newWickets;
        inn2.overs = newOvers;
        inn2.balls = currentBalls;
        inn2.batsmen = batsmen;
        inn2.bowlers = bowlers;

        return {
          ...m,
          status: matchStatus,
          statusText,
          statusTextTa,
          currentRunRate: crr,
          requiredRunRate: rrr,
          runsNeeded,
          ballsRemaining,
          winProbabilityTeam1: winProbTeam1,
          winProbabilityTeam2: winProbTeam2,
          recentBalls: updatedRecentBalls,
          innings2: inn2,
        };
      });
    });
  }, [activeMatchId, lang, realLiveMode]);

  // Real-time ticking interval with unthrottled Web Worker (prevents tab freezing when inactive)
  useEffect(() => {
    if (realLiveMode || !isPlaying || activeMatch.status !== 'LIVE') {
      return;
    }

    let worker: Worker | null = null;
    let fallbackInterval: NodeJS.Timeout | null = null;

    try {
      // Create inline Web Worker from Blob
      const workerBlob = new Blob([`
        let timer = null;
        self.onmessage = function(e) {
          if (e.data.action === 'start') {
            if (timer) clearInterval(timer);
            timer = setInterval(function() {
              self.postMessage('tick');
            }, e.data.interval);
          } else if (e.data.action === 'stop') {
            if (timer) clearInterval(timer);
            timer = null;
          }
        };
      `], { type: 'application/javascript' });

      const workerUrl = URL.createObjectURL(workerBlob);
      worker = new Worker(workerUrl);

      worker.onmessage = () => {
        advanceOneBall();
      };

      worker.postMessage({ action: 'start', interval: speedMs });
    } catch {
      // Fallback to standard setInterval if Web Worker is not permitted
      fallbackInterval = setInterval(() => {
        advanceOneBall();
      }, speedMs);
    }

    return () => {
      if (worker) {
        worker.postMessage({ action: 'stop' });
        worker.terminate();
      }
      if (fallbackInterval) {
        clearInterval(fallbackInterval);
      }
    };
  }, [realLiveMode, isPlaying, speedMs, advanceOneBall, activeMatch.status]);

  return {
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
    dismissBanner: () => setBanner(null),
  };
}
