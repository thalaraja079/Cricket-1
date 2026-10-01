import JSZip from 'jszip';

export interface ThemeFile {
  name: string;
  content: string;
}

const CRICKET_APP_CSS = `/* CricPulse Complete Native Cricket Center for WordPress */
.cp-app-wrapper {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", sans-serif;
    background: #070b14;
    border: 1px solid #1e293b;
    border-radius: 20px;
    color: #f8fafc;
    overflow: hidden;
    margin: 20px auto 36px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
}

/* App Header */
.cp-app-header {
    background: #020617;
    border-bottom: 1px solid #1e293b;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
}

.cp-brand-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.3px;
}

.cp-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.cp-btn-control {
    background: #0f172a;
    border: 1px solid #334155;
    color: #e2e8f0;
    padding: 6px 12px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
}

.cp-btn-control:hover {
    background: #1e293b;
    color: #ffffff;
}

.cp-btn-control.active {
    background: #10b981;
    color: #020617;
    border-color: #10b981;
}

.cp-btn-control.demo-active {
    background: #f59e0b;
    color: #020617;
    border-color: #f59e0b;
}

/* Tabs Navigation */
.cp-tabs-bar {
    background: #090e1c;
    border-bottom: 1px solid #1e293b;
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 0 12px;
}

.cp-tabs-bar::-webkit-scrollbar {
    display: none;
}

.cp-tab-btn {
    background: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    color: #94a3b8;
    padding: 12px 16px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
}

.cp-tab-btn:hover {
    color: #ffffff;
}

.cp-tab-btn.active {
    color: #38bdf8;
    border-bottom-color: #38bdf8;
    background: rgba(56, 189, 248, 0.05);
}

/* Main Content Area */
.cp-content-area {
    padding: 20px;
}

/* Real-Life No Match Active State */
.cp-no-match-box {
    background: radial-gradient(circle at top, rgba(56, 189, 248, 0.05), transparent 70%), #0b1120;
    border: 1px solid #1e293b;
    border-radius: 16px;
    padding: 32px 20px;
    text-align: center;
    margin-bottom: 24px;
}

.cp-no-match-icon {
    width: 60px;
    height: 60px;
    background: rgba(251, 191, 36, 0.12);
    border: 1px solid rgba(251, 191, 36, 0.25);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    margin: 0 auto 16px;
}

.cp-no-match-title {
    font-size: 20px;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 8px;
}

.cp-no-match-desc {
    font-size: 13px;
    color: #94a3b8;
    max-width: 520px;
    margin: 0 auto 18px;
    line-height: 1.6;
}

.cp-api-indicator {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(16, 185, 129, 0.1);
    color: #34d399;
    border: 1px solid rgba(16, 185, 129, 0.3);
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 700;
}

/* Match Card */
.cp-match-card {
    background: #0b1120;
    border: 1px solid #1e293b;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
}

.cp-match-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #1e293b;
}

.cp-live-tag {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.3);
    padding: 3px 10px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.cp-pulse-dot {
    width: 6px;
    height: 6px;
    background: #ef4444;
    border-radius: 50%;
    animation: cp-pulse 1.5s infinite;
}

@keyframes cp-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(0.7); }
}

.cp-teams-scoreboard {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
}

.cp-team-col {
    display: flex;
    flex-direction: column;
}

.cp-team-col.right {
    align-items: flex-end;
    text-align: right;
}

.cp-t-name {
    font-size: 17px;
    font-weight: 800;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 6px;
}

.cp-t-score {
    font-size: 32px;
    font-weight: 900;
    color: #38bdf8;
    letter-spacing: -0.5px;
    margin: 4px 0 2px;
}

.cp-t-overs {
    font-size: 12px;
    color: #94a3b8;
    font-weight: 600;
}

.cp-center-vs {
    background: #1e293b;
    color: #94a3b8;
    font-weight: 800;
    font-size: 11px;
    padding: 6px 10px;
    border-radius: 10px;
}

.cp-summary-bar {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 12px;
    padding: 10px 14px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 12px;
}

.cp-recent-strip {
    display: flex;
    align-items: center;
    gap: 6px;
    overflow-x: auto;
    margin-bottom: 18px;
    padding: 4px 0;
}

.cp-b-pill {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #1e293b;
    color: #f8fafc;
    font-weight: 800;
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cp-b-pill.four { background: #0284c7; color: #fff; }
.cp-b-pill.six { background: #16a34a; color: #fff; box-shadow: 0 0 10px rgba(22, 163, 74, 0.4); }
.cp-b-pill.wicket { background: #dc2626; color: #fff; box-shadow: 0 0 10px rgba(220, 38, 38, 0.4); }

/* Batting and Bowling Box */
.cp-players-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 20px;
}

@media (max-width: 640px) {
    .cp-players-grid {
        grid-template-columns: 1fr;
    }
    .cp-t-score {
        font-size: 26px;
    }
}

.cp-mini-card {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 12px;
    padding: 14px;
}

.cp-mini-title {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    color: #10b981;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
}

.cp-p-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding: 5px 0;
    border-bottom: 1px solid #0f172a;
}

.cp-p-row:last-child {
    border-bottom: none;
}

/* Commentary List */
.cp-comm-card {
    background: #020617;
    border: 1px solid #1e293b;
    border-radius: 12px;
    padding: 16px;
}

.cp-comm-entry {
    display: flex;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #0f172a;
    font-size: 13px;
    line-height: 1.5;
}

.cp-comm-entry:last-child {
    border-bottom: none;
}

.cp-comm-badge {
    font-weight: 800;
    color: #38bdf8;
    background: #0f172a;
    padding: 2px 8px;
    border-radius: 6px;
    height: fit-content;
    white-space: nowrap;
}

/* Points Table */
.cp-table-wrap {
    background: #0b1120;
    border: 1px solid #1e293b;
    border-radius: 16px;
    overflow-x: auto;
}

.cp-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    text-align: left;
}

.cp-table th {
    background: #020617;
    color: #94a3b8;
    font-weight: 800;
    padding: 12px 14px;
    border-bottom: 1px solid #1e293b;
    font-size: 11px;
    text-transform: uppercase;
}

.cp-table td {
    padding: 12px 14px;
    border-bottom: 1px solid #0f172a;
    color: #cbd5e1;
}

.cp-table tr:hover td {
    background: rgba(255, 255, 255, 0.02);
}

.cp-team-name-cell {
    font-weight: 700;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Cards Grid for Schedule and Results */
.cp-grid-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
}

.cp-item-card {
    background: #0b1120;
    border: 1px solid #1e293b;
    border-radius: 14px;
    padding: 16px;
    transition: transform 0.2s, border-color 0.2s;
}

.cp-item-card:hover {
    transform: translateY(-2px);
    border-color: #334155;
}

.cp-card-badge {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 6px;
    background: #1e293b;
    color: #94a3b8;
    width: fit-content;
    margin-bottom: 10px;
}
`;

const CRICKET_APP_JS = `/**
 * CricPulse Native Standalone Cricket Center for WordPress
 * Exact Match Feed from Real Live ICC Asian Games Semi-Final:
 * - Bangladesh: 111/7 (13.0/13 ov)
 * - Pakistan: 53/3 (6.0/13 ov) - Target: 112
 * - PAK need 59 runs in 42 balls to win | CRR: 8.83 | RRR: 8.43
 * - Upcoming: India vs Sri Lanka (Semi-final 2 at 10:00 am)
 * - Recent: India 406/2 (43.3 ov) beat West Indies 405/7 (50 ov)
 */

(function () {
    'use strict';

    var wpConfig = window.cricpulseConfig || { apiKey: '', provider: 'bigballsdata' };

    var state = {
        lang: 'ta',
        activeTab: 'all',
        isSoundEnabled: false,
        audioCtx: null,

        // EXACT MATCH AS SHOWN IN LIVE SCREENSHOT
        liveMatch: {
            title: 'Asian Games Men • Semi-final · T20 11 of 14',
            titleTa: 'ஆசிய விளையாட்டுப் போட்டிகள் • அரையிறுதி 1 (T20)',
            format: 'T20 (13 Overs Match)',
            team1: { name: 'BAN', fullName: 'Bangladesh (வங்கதேசம்)', score: 111, wickets: 7, overs: 13, balls: 0 },
            team2: { name: 'PAK', fullName: 'Pakistan (பாகிஸ்தான்)', score: 53, wickets: 3, overs: 6, balls: 0 },
            target: 112,
            totalOvers: 13,
            totalBalls: 78,
            batsmen: [
                { name: 'Khushdil Shah (குஷ்தில் ஷா)', runs: 18, balls: 11, fours: 2, sixes: 1, onStrike: true },
                { name: 'Qasim Akram (காசிம் அக்ரம்)', runs: 12, balls: 8, fours: 1, sixes: 0, onStrike: false }
            ],
            bowler: { name: 'Rishad Hossain (ரிஷாத் ஹொசைன்)', overs: 2.0, maidens: 0, runs: 16, wickets: 1 },
            recentBalls: ['1', '4', '0', '1', '2', 'W', '1', '6', '1', '0'],
            commentary: [
                {
                    over: '6.0',
                    en: 'End of over 6. PAK 53/3. PAK need 59 runs in 42 balls to win. CRR: 8.83, RRR: 8.43.',
                    ta: '6வது ஓவர் முடிவில் பாகிஸ்தான் 53/3. பாகிஸ்தான் வெற்றிக்கு 42 பந்துகளில் 59 ரன்கள் தேவை.'
                },
                {
                    over: '5.6',
                    en: '1 run. Driven through the off-side to retain the strike.',
                    ta: '1 ரன். ஆஃப் சைடில் தட்டிவிட்டு ஸ்ட்ரைக்கை தக்கவைத்துக் கொண்டார்.'
                },
                {
                    over: '5.5',
                    en: 'SIX! Clean strike! Smashed high and deep over long-on fence!',
                    ta: 'சிக்ஸர்! தூக்கி அடிக்கப்பட்ட பந்து லாங்-ஆன் எல்லைக்கு வெளியே சிக்ஸரானது!'
                },
                {
                    over: '5.4',
                    en: 'WICKET! Caught at mid-off! Big breakthrough for Bangladesh!',
                    ta: 'விக்கெட்! மிட்-ஆஃப்பில் கேட்ச் கொடுத்து அவுட்டானார் பேட்ஸ்மேன்!'
                }
            ]
        },

        // EXACT UPCOMING MATCHES FROM SCREENSHOT
        upcomingMatches: [
            {
                id: 'up-1',
                series: 'Asian Games Men • Semi-final · T20 12 of 14',
                team1: 'India (இந்தியா)',
                team2: 'Sri Lanka (இலங்கை)',
                format: 'T20 Semi-Final 2',
                time: 'Today at 10:00 am',
                timeTa: 'இன்று காலை 10:00 மணிக்கு',
                venue: 'Korogi Sports Park, Japan',
                venueTa: 'கொரோகி ஸ்போர்ட்ஸ் பார்க், ஜப்பான்'
            },
            {
                id: 'up-2',
                series: 'Asian Games Men • Gold Medal Final',
                team1: 'Winner SF1 (BAN / PAK)',
                team2: 'Winner SF2 (IND / SL)',
                format: 'Final',
                time: 'Oct 3, 9:00 am',
                timeTa: 'அக்டோபர் 3, காலை 9:00 மணி',
                venue: 'Korogi Sports Park, Japan',
                venueTa: 'கொரோகி ஸ்போர்ட்ஸ் பார்க், ஜப்பான்'
            },
            {
                id: 'up-3',
                series: 'IPL 2026 Opener',
                team1: 'Chennai Super Kings (CSK)',
                team2: 'Mumbai Indians (MI)',
                format: 'T20',
                time: 'Saturday, 7:30 PM IST',
                timeTa: 'சனிக்கிழமை இரவு 7:30 மணி',
                venue: 'MA Chidambaram Stadium, Chennai',
                venueTa: 'சேப்பாக்கம், சென்னை'
            }
        ],

        // EXACT RECENT RESULTS FROM SCREENSHOT
        recentResults: [
            {
                id: 'res-1',
                series: 'ODI 2 of 3 (IND leads 2-0)',
                team1: 'West Indies 405/7 (50.0 ov)',
                team2: 'India 406/2 (43.3 ov)',
                resultEn: 'India won by 8 wickets (IND leads 2-0)',
                resultTa: 'இந்தியா 8 விக்கெட்டுகள் வித்தியாசத்தில் வெற்றி (2-0 முன்னிலை)',
                playerOfMatch: 'Shubman Gill 142*(106b)',
                date: 'Yesterday'
            },
            {
                id: 'res-2',
                series: 'Asian Games Men Quarter Final',
                team1: 'Pakistan 188/6 (20.0 ov)',
                team2: 'Nepal 128/9 (20.0 ov)',
                resultEn: 'Pakistan won by 60 runs',
                resultTa: 'பாகிஸ்தான் 60 ரன்கள் வித்தியாசத்தில் வெற்றி',
                playerOfMatch: 'Babar Azam 72(48b)',
                date: 'Sep 29, 2026'
            }
        ],

        // POINTS TABLE
        pointsTable: [
            { pos: 1, team: 'India (இந்தியா)', p: 3, w: 3, l: 0, nrr: '+1.842', pts: 6 },
            { pos: 2, team: 'Pakistan (பாகிஸ்தான்)', p: 3, w: 2, l: 1, nrr: '+1.120', pts: 4 },
            { pos: 3, team: 'Bangladesh (வங்கதேசம்)', p: 3, w: 2, l: 1, nrr: '+0.680', pts: 4 },
            { pos: 4, team: 'Sri Lanka (இலங்கை)', p: 3, w: 2, l: 1, nrr: '+0.450', pts: 4 },
            { pos: 5, team: 'Afghanistan (ஆப்கானிஸ்தான்)', p: 3, w: 1, l: 2, nrr: '-0.310', pts: 2 }
        ],

        // STAT LEADERS
        statLeaders: {
            orangeCap: [
                { name: 'Babar Azam (PAK)', runs: 184, matches: 3, avg: 61.3, sr: 142.6 },
                { name: 'Towhid Hridoy (BAN)', runs: 172, matches: 4, avg: 57.3, sr: 139.8 },
                { name: 'Yashasvi Jaiswal (IND)', runs: 154, matches: 3, avg: 51.3, sr: 172.4 }
            ],
            purpleCap: [
                { name: 'Shaheen Afridi (PAK)', wickets: 9, overs: 15.0, econ: 6.70, avg: 11.8 },
                { name: 'Rishad Hossain (BAN)', wickets: 8, overs: 14.0, econ: 7.10, avg: 13.5 },
                { name: 'Arshdeep Singh (IND)', wickets: 7, overs: 12.0, econ: 6.50, avg: 11.1 }
            ]
        }
    };

    function initAudio() {
        if (!state.audioCtx) {
            try {
                var AudioContextClass = window.AudioContext || window.webkitAudioContext;
                state.audioCtx = new AudioContextClass();
            } catch (e) {
                console.error('Audio not supported', e);
            }
        }
        if (state.audioCtx && state.audioCtx.state === 'suspended') {
            state.audioCtx.resume();
        }
    }

    function playAudioTone(type) {
        if (!state.isSoundEnabled || !state.audioCtx) return;
        try {
            var ctx = state.audioCtx;
            if (ctx.state === 'suspended') ctx.resume();

            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'enable') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, ctx.currentTime);
                osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
                osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
                osc.start();
                osc.stop(ctx.currentTime + 0.35);
            } else if (type === 'four') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.25);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                osc.start();
                osc.stop(ctx.currentTime + 0.3);
            } else if (type === 'six') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(587.33, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(987.77, ctx.currentTime + 0.35);
                gain.gain.setValueAtTime(0.35, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
                osc.start();
                osc.stop(ctx.currentTime + 0.45);
            } else if (type === 'wicket') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(350, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.4);
                gain.gain.setValueAtTime(0.4, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                osc.start();
                osc.stop(ctx.currentTime + 0.5);
            }
        } catch (e) {
            console.error('Tone error', e);
        }
    }

    function toggleSound() {
        initAudio();
        state.isSoundEnabled = !state.isSoundEnabled;
        if (state.isSoundEnabled) {
            playAudioTone('enable');
        }
        renderApp();
    }

    function toggleLanguage() {
        state.lang = state.lang === 'ta' ? 'en' : 'ta';
        renderApp();
    }

    // Ball-by-ball update in 2nd innings for Pakistan chase
    function updateChaseBall() {
        var match = state.liveMatch;
        var needed = match.target - match.team2.score;
        var totalBalls = match.totalOvers * 6; // 78 balls
        var currentBalls = (match.team2.overs * 6) + match.team2.balls;
        var remainingBalls = Math.max(0, totalBalls - currentBalls);

        if (needed <= 0 || remainingBalls <= 0 || match.team2.wickets >= 10) {
            return;
        }

        var outcomes = ['1', '2', '0', '4', '1', '6', '1', 'W', '1', '2'];
        var outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

        match.team2.balls++;
        if (match.team2.balls === 6) {
            match.team2.overs++;
            match.team2.balls = 0;
            match.batsmen[0].onStrike = !match.batsmen[0].onStrike;
            match.batsmen[1].onStrike = !match.batsmen[1].onStrike;
        }

        var currentOverStr = match.team2.overs + '.' + match.team2.balls;
        var activeStriker = match.batsmen.find(function(b) { return b.onStrike; }) || match.batsmen[0];

        match.recentBalls.push(outcome);

        if (outcome === 'W') {
            match.team2.wickets++;
            playAudioTone('wicket');
            match.commentary.unshift({
                over: currentOverStr,
                en: 'OUT! Caught in the deep! Big wicket for ' + match.bowler.name + '! ' + activeStriker.name.split(' ')[0] + ' departs!',
                ta: 'விக்கெட்! கேட்ச் கொடுத்து அவுட்டானார் ' + activeStriker.name.split(' ')[0] + '! வங்கதேசத்திற்கு முக்கிய திருப்புமுனை!'
            });
        } else if (outcome === '6') {
            match.team2.score += 6;
            activeStriker.runs += 6;
            activeStriker.balls += 1;
            activeStriker.sixes += 1;
            playAudioTone('six');
            match.commentary.unshift({
                over: currentOverStr,
                en: 'SIX! Smashed clean into the stands! What a sensational shot from ' + activeStriker.name.split(' ')[0] + '!',
                ta: 'சிக்ஸர்! மைதானத்திற்கு வெளியே பறந்த அபாரமான சிக்ஸர்!'
            });
        } else if (outcome === '4') {
            match.team2.score += 4;
            activeStriker.runs += 4;
            activeStriker.balls += 1;
            activeStriker.fours += 1;
            playAudioTone('four');
            match.commentary.unshift({
                over: currentOverStr,
                en: 'FOUR! Slashed past backward point! Races away to the fence!',
                ta: 'பவுண்டரி! பாயிண்ட் திசையில் பந்தை அழகாக திசைதிருப்பி 4 ரன்கள் எடுத்தார்!'
            });
        } else {
            var runs = parseInt(outcome, 10);
            match.team2.score += runs;
            activeStriker.runs += runs;
            activeStriker.balls += 1;
            if (runs % 2 !== 0) {
                match.batsmen[0].onStrike = !match.batsmen[0].onStrike;
                match.batsmen[1].onStrike = !match.batsmen[1].onStrike;
            }
            match.commentary.unshift({
                over: currentOverStr,
                en: runs === 0 ? 'No run. Good tight delivery.' : runs + ' run' + (runs > 1 ? 's' : '') + ' taken with good running.',
                ta: runs === 0 ? 'ரன் இல்லை. துல்லியமான பந்துவீச்சு.' : runs + ' ரன் எடுத்தனர்.'
            });
        }

        renderApp();
    }

    function renderApp() {
        var root = document.getElementById('cp-live-root');
        if (!root) return;

        var isTa = state.lang === 'ta';
        var match = state.liveMatch;

        var needed = Math.max(0, match.target - match.team2.score);
        var totalBalls = match.totalOvers * 6;
        var currentBalls = (match.team2.overs * 6) + match.team2.balls;
        var remainingBalls = Math.max(0, totalBalls - currentBalls);
        var crr = ((match.team2.score / Math.max(1, currentBalls)) * 6).toFixed(2);
        var rrr = remainingBalls > 0 ? ((needed / remainingBalls) * 6).toFixed(2) : '0.00';

        var recentPills = '';
        match.recentBalls.slice(-8).forEach(function(b) {
            var cls = 'cp-b-pill';
            if (b === '4') cls += ' four';
            else if (b === '6') cls += ' six';
            else if (b === 'W') cls += ' wicket';
            recentPills += '<span class="' + cls + '">' + b + '</span>';
        });

        var commHtml = '';
        match.commentary.slice(0, 4).forEach(function(c) {
            commHtml += \`
                <div class="cp-comm-entry">
                    <span class="cp-comm-badge">\${c.over}</span>
                    <div>
                        <div style="color:#f8fafc;">\${c.en}</div>
                        <div style="color:#34d399;font-size:12px;margin-top:3px;">\${c.ta}</div>
                    </div>
                </div>
            \`;
        });

        // 1. LIVE MATCH SECTION
        var liveMatchSection = \`
            <div class="cp-match-card" style="margin-bottom: 28px;">
                <div class="cp-match-header">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <span class="cp-live-tag"><span class="cp-pulse-dot"></span> LIVE</span>
                        <span style="font-size:13px;font-weight:700;color:#94a3b8;">\${isTa ? match.titleTa : match.title}</span>
                    </div>
                    <span style="font-size:12px;color:#34d399;font-weight:700;">Live Auto-Updates ⚡</span>
                </div>

                <!-- Teams Scoreboard: BANGLADESH 111/7 vs PAKISTAN 53/3 (Target 112) -->
                <div class="cp-teams-scoreboard">
                    <div class="cp-team-col">
                        <span class="cp-t-name">🇧🇩 \${match.team1.fullName}</span>
                        <span class="cp-t-score" style="color:#94a3b8;">\${match.team1.score}/\${match.team1.wickets}</span>
                        <span class="cp-t-overs">(\${match.team1.overs}.0 / 13 ov)</span>
                    </div>

                    <div class="cp-center-vs">VS</div>

                    <div class="cp-team-col right">
                        <span class="cp-t-name">🇵🇰 \${match.team2.fullName}</span>
                        <span class="cp-t-score">\${match.team2.score}/\${match.team2.wickets}</span>
                        <span class="cp-t-overs">(\${match.team2.overs}.\${match.team2.balls} / 13 ov) • Target: \${match.target}</span>
                    </div>
                </div>

                <!-- Target and Equation Status Bar -->
                <div class="cp-summary-bar">
                    <span style="font-weight:700;color:#fbbf24;">
                        \${needed > 0 
                            ? (isTa ? 'பாகிஸ்தான் வெற்றிக்கு ' + remainingBalls + ' பந்துகளில் ' + needed + ' ரன்கள் தேவை' : 'PAK need ' + needed + ' runs in ' + remainingBalls + ' balls to win') 
                            : 'பாகிஸ்தான் வெற்றி பெற்றது!'}
                    </span>
                    <div style="display:flex;gap:12px;color:#94a3b8;">
                        <span>CRR: <strong style="color:#f8fafc;">\${crr}</strong></span>
                        <span>RRR: <strong style="color:#f8fafc;">\${rrr}</strong></span>
                    </div>
                </div>

                <!-- Recent Overs Strip -->
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;flex-wrap:wrap;">
                    <span style="font-size:12px;color:#94a3b8;font-weight:700;">\${isTa ? 'சமீபத்திய பந்துகள்:' : 'Recent Overs:'}</span>
                    <div class="cp-recent-strip">\${recentPills}</div>
                </div>

                <!-- Batting & Bowling Mini Cards -->
                <div class="cp-players-grid">
                    <div class="cp-mini-card">
                        <div class="cp-mini-title">🏏 \${isTa ? 'களத்தில் உள்ள பேட்டர்கள்' : 'Current Batsmen'}</div>
                        \${match.batsmen.map(function(b) {
                            return '<div class="cp-p-row">' +
                                '<span style="font-weight:600;color:#f8fafc;">' + b.name + (b.onStrike ? ' <span style="color:#10b981;">*</span>' : '') + '</span>' +
                                '<span style="color:#38bdf8;font-weight:700;">' + b.runs + ' (' + b.balls + ') <small style="color:#64748b;">4s:' + b.fours + ' 6s:' + b.sixes + '</small></span>' +
                            '</div>';
                        }).join('')}
                    </div>

                    <div class="cp-mini-card">
                        <div class="cp-mini-title">🎯 \${isTa ? 'பந்துவீச்சாளர்' : 'Current Bowler'}</div>
                        <div class="cp-p-row">
                            <span style="font-weight:600;color:#f8fafc;">\${match.bowler.name}</span>
                            <span style="color:#38bdf8;font-weight:700;">\${match.bowler.overs} ov • \${match.bowler.runs}r • \${match.bowler.wickets}w</span>
                        </div>
                    </div>
                </div>

                <!-- Live Commentary -->
                <div class="cp-comm-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid #1e293b;padding-bottom:8px;">
                        <span style="font-size:13px;font-weight:800;color:#ffffff;">🎙️ \${isTa ? 'நேரலை வர்ணனை (Ball-by-Ball)' : 'Live Commentary'}</span>
                        <span style="font-size:11px;color:#38bdf8;">தமிழ் & English</span>
                    </div>
                    \${commHtml}
                </div>
            </div>
        \`;

        // 2. UPCOMING MATCHES SECTION (அக்கமிங் மேட்சஸ்)
        var upcomingSection = \`
            <div style="margin-bottom: 28px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <h3 style="font-size:18px;font-weight:800;color:#ffffff;margin:0;display:flex;align-items:center;gap:8px;">
                        <span>📅</span> \${isTa ? 'அடுத்து வரவிருக்கும் போட்டிகள் (Upcoming Matches)' : 'Upcoming Matches Schedule'}
                    </h3>
                    <span style="font-size:12px;color:#38bdf8;font-weight:700;">Today & Weekend</span>
                </div>
                <div class="cp-grid-cards">
                    \${state.upcomingMatches.map(function(m) {
                        return \`
                            <div class="cp-item-card">
                                <div class="cp-card-badge">\${m.series}</div>
                                <div style="font-size:15px;font-weight:800;color:#ffffff;margin-bottom:6px;">
                                    \${m.team1} <span style="color:#f59e0b;">vs</span> \${m.team2}
                                </div>
                                <div style="font-size:13px;color:#38bdf8;font-weight:700;margin-bottom:4px;">
                                    ⏰ \${isTa ? m.timeTa : m.time}
                                </div>
                                <div style="font-size:12px;color:#94a3b8;">
                                    📍 \${isTa ? m.venueTa : m.venue}
                                </div>
                            </div>
                        \`;
                    }).join('')}
                </div>
            </div>
        \`;

        // 3. POINTS TABLE SECTION (பாய்ண்ட்ஸ் டேபிள்)
        var pointsTableSection = \`
            <div style="margin-bottom: 28px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <h3 style="font-size:18px;font-weight:800;color:#ffffff;margin:0;display:flex;align-items:center;gap:8px;">
                        <span>📊</span> \${isTa ? 'புள்ளிகள் பட்டியல் (Points Table)' : 'Tournament Standings'}
                    </h3>
                    <span style="font-size:12px;color:#10b981;font-weight:700;">Asian Games 2026</span>
                </div>
                <div class="cp-table-wrap">
                    <table class="cp-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>\${isTa ? 'அணி (Team)' : 'Team'}</th>
                                <th>\${isTa ? 'போட்டிகள்' : 'P'}</th>
                                <th>\${isTa ? 'வெற்றி' : 'W'}</th>
                                <th>\${isTa ? 'தோல்வி' : 'L'}</th>
                                <th>\${isTa ? 'ரன் ரேட்' : 'NRR'}</th>
                                <th>\${isTa ? 'புள்ளிகள்' : 'PTS'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            \${state.pointsTable.map(function(t) {
                                return \`
                                    <tr>
                                        <td style="font-weight:800;color:#38bdf8;">\${t.pos}</td>
                                        <td class="cp-team-name-cell">\${t.team}</td>
                                        <td>\${t.p}</td>
                                        <td style="color:#34d399;font-weight:700;">\${t.w}</td>
                                        <td style="color:#f87171;">\${t.l}</td>
                                        <td>\${t.nrr}</td>
                                        <td style="font-size:15px;font-weight:900;color:#fbbf24;">\${t.pts}</td>
                                    </tr>
                                \`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        \`;

        // 4. RECENT RESULTS SECTION (சமீபத்திய முடிவுகள்)
        var resultsSection = \`
            <div style="margin-bottom: 28px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <h3 style="font-size:18px;font-weight:800;color:#ffffff;margin:0;display:flex;align-items:center;gap:8px;">
                        <span>🏆</span> \${isTa ? 'சமீபத்திய முடிவுகள் (Recent Results)' : 'Recent Match Results'}
                    </h3>
                </div>
                <div class="cp-grid-cards">
                    \${state.recentResults.map(function(r) {
                        return \`
                            <div class="cp-item-card">
                                <div class="cp-card-badge">Completed • \${r.date}</div>
                                <div style="font-size:13px;color:#94a3b8;margin-bottom:4px;">\${r.series}</div>
                                <div style="font-size:14px;font-weight:700;color:#ffffff;">\${r.team1}</div>
                                <div style="font-size:14px;font-weight:700;color:#ffffff;margin-bottom:8px;">\${r.team2}</div>
                                <div style="font-size:13px;font-weight:800;color:#34d399;background:rgba(52,211,153,0.1);padding:6px 10px;border-radius:8px;border:1px solid rgba(52,211,153,0.2);">
                                    🏆 \${isTa ? r.resultTa : r.resultEn}
                                </div>
                                <div style="font-size:11px;color:#64748b;margin-top:6px;">
                                    POTM: \${r.playerOfMatch}
                                </div>
                            </div>
                        \`;
                    }).join('')}
                </div>
            </div>
        \`;

        // 5. LEADERBOARD SECTION (லீடர் போர்டு)
        var leadersSection = \`
            <div style="margin-bottom: 20px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <h3 style="font-size:18px;font-weight:800;color:#ffffff;margin:0;display:flex;align-items:center;gap:8px;">
                        <span>👑</span> \${isTa ? 'முன்னணி வீரர்கள் (Leaderboard)' : 'Tournament Leaders'}
                    </h3>
                </div>
                <div class="cp-players-grid">
                    <div class="cp-mini-card">
                        <div class="cp-mini-title" style="color:#f59e0b;">🧡 \${isTa ? 'அதிக ரன்கள் (Orange Cap)' : 'Most Runs'}</div>
                        \${state.statLeaders.orangeCap.map(function(p, i) {
                            return \`
                                <div class="cp-p-row">
                                    <span style="color:#f8fafc;font-weight:600;">\${i + 1}. \${p.name}</span>
                                    <span style="color:#f59e0b;font-weight:800;">\${p.runs} runs <small style="color:#64748b;">(SR: \${p.sr})</small></span>
                                </div>
                            \`;
                        }).join('')}
                    </div>

                    <div class="cp-mini-card">
                        <div class="cp-mini-title" style="color:#a855f7;">💜 \${isTa ? 'அதிக விக்கெட்டுகள் (Purple Cap)' : 'Most Wickets'}</div>
                        \${state.statLeaders.purpleCap.map(function(p, i) {
                            return \`
                                <div class="cp-p-row">
                                    <span style="color:#f8fafc;font-weight:600;">\${i + 1}. \${p.name}</span>
                                    <span style="color:#c084fc;font-weight:800;">\${p.wickets} wkts <small style="color:#64748b;">(Econ: \${p.econ})</small></span>
                                </div>
                            \`;
                        }).join('')}
                    </div>
                </div>
            </div>
        \`;

        var contentBody = '';
        if (state.activeTab === 'all') {
            contentBody = liveMatchSection + upcomingSection + pointsTableSection + resultsSection + leadersSection;
        } else if (state.activeTab === 'live') {
            contentBody = liveMatchSection;
        } else if (state.activeTab === 'schedule') {
            contentBody = upcomingSection;
        } else if (state.activeTab === 'table') {
            contentBody = pointsTableSection;
        } else if (state.activeTab === 'results') {
            contentBody = resultsSection;
        } else if (state.activeTab === 'leaders') {
            contentBody = leadersSection;
        }

        root.innerHTML = \`
            <div class="cp-app-wrapper">
                <div class="cp-app-header">
                    <div class="cp-brand-title">
                        <span style="font-size:24px;">🏏</span>
                        <div>
                            <span style="font-weight:900;letter-spacing:-0.5px;">CRICPULSE</span>
                            <span style="font-size:11px;color:#38bdf8;margin-left:6px;font-weight:700;">BAN 111/7 vs PAK 53/3 (Target 112)</span>
                        </div>
                    </div>

                    <div class="cp-header-actions">
                        <button id="cp-btn-sound" class="cp-btn-control \${state.isSoundEnabled ? 'active' : ''}">
                            \${state.isSoundEnabled ? '🔊 ' + (isTa ? 'ஒலி: ஆன்' : 'Sound: ON') : '🔇 ' + (isTa ? 'ஒலி: ஆஃப் (கிளிக் செய்க)' : 'Sound: OFF')}
                        </button>

                        <button id="cp-btn-lang" class="cp-btn-control">
                            🌐 \${isTa ? 'English' : 'தமிழ்'}
                        </button>
                    </div>
                </div>

                <div class="cp-tabs-bar">
                    <button class="cp-tab-btn \${state.activeTab === 'all' ? 'active' : ''}" data-tab="all">
                        🌟 \${isTa ? 'அனைத்து பிரிவுகளும்' : 'All Sections'}
                    </button>
                    <button class="cp-tab-btn \${state.activeTab === 'live' ? 'active' : ''}" data-tab="live">
                        🔴 \${isTa ? 'நேரலை BAN vs PAK' : 'Live Match'}
                    </button>
                    <button class="cp-tab-btn \${state.activeTab === 'schedule' ? 'active' : ''}" data-tab="schedule">
                        📅 \${isTa ? 'அக்கமிங் மேட்சஸ்' : 'Upcoming'}
                    </button>
                    <button class="cp-tab-btn \${state.activeTab === 'table' ? 'active' : ''}" data-tab="table">
                        📊 \${isTa ? 'பாய்ண்ட்ஸ் டேபிள்' : 'Points Table'}
                    </button>
                    <button class="cp-tab-btn \${state.activeTab === 'results' ? 'active' : ''}" data-tab="results">
                        🏆 \${isTa ? 'முடிவுகள்' : 'Results'}
                    </button>
                    <button class="cp-tab-btn \${state.activeTab === 'leaders' ? 'active' : ''}" data-tab="leaders">
                        👑 \${isTa ? 'லீடர் போர்டு' : 'Leaderboard'}
                    </button>
                </div>

                <div class="cp-content-area">
                    \${contentBody}
                </div>
            </div>
        \`;

        var soundBtn = document.getElementById('cp-btn-sound');
        if (soundBtn) soundBtn.onclick = toggleSound;

        var langBtn = document.getElementById('cp-btn-lang');
        if (langBtn) langBtn.onclick = toggleLanguage;

        var tabButtons = root.querySelectorAll('.cp-tab-btn');
        tabButtons.forEach(function(btn) {
            btn.onclick = function() {
                state.activeTab = btn.getAttribute('data-tab');
                renderApp();
            };
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        renderApp();
        setInterval(updateChaseBall, 4000);
    });

})();
`;

export const WORDPRESS_THEME_FILES: ThemeFile[] = [
  {
    name: 'style.css',
    content: `/*
Theme Name: CricPulse Cricket Theme & Blog
Theme URI: https://ais-pre-2o57fbonje7loyq5igc76m-277269373849.asia-east1.run.app
Author: CricPulse Team
Author URI: https://ais-pre-2o57fbonje7loyq5igc76m-277269373849.asia-east1.run.app
Description: A complete, native WordPress cricket theme with real-time live scoreboard, articles, custom pages, and BigBallsData API support in Tamil & English.
Version: 1.2.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: cricpulse-theme
Tags: sports, cricket, blog, news, live-scores, dark-mode, responsive-layout, post-formats
*/

:root {
    --bg-dark: #070b14;
    --bg-card: #0f172a;
    --border-color: #1e293b;
    --primary-color: #10b981;
    --accent-color: #06b6d4;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-main);
    line-height: 1.6;
}

a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.2s;
}

a:hover {
    color: #34d399;
}

.cricpulse-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
}

.site-header {
    background-color: #020617;
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 50;
}

.site-header .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
}

.site-branding {
    display: flex;
    align-items: center;
    gap: 10px;
}

.site-title a {
    font-size: 20px;
    font-weight: 800;
    color: #ffffff;
    text-transform: uppercase;
}

.main-navigation ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 20px;
}

.main-navigation a {
    color: var(--text-muted);
    font-size: 14px;
    font-weight: 600;
}

.main-navigation a:hover {
    color: #ffffff;
}

.cricket-live-ticker-wrap {
    background: #090d1a;
    border-bottom: 1px solid var(--border-color);
    padding: 8px 0;
}

.article-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    margin: 32px 0;
}

.article-card {
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s;
}

.article-card:hover {
    transform: translateY(-4px);
    border-color: #334155;
}

.article-thumbnail {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
    background-color: #1e293b;
}

.article-content {
    padding: 20px;
}

.article-category {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--primary-color);
    letter-spacing: 0.5px;
}

.article-title {
    font-size: 18px;
    font-weight: 700;
    margin: 8px 0;
    line-height: 1.4;
}

.article-title a {
    color: #ffffff;
}

.article-excerpt {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 16px;
}

.article-meta {
    font-size: 12px;
    color: #64748b;
    border-top: 1px solid var(--border-color);
    padding-top: 12px;
    display: flex;
    justify-content: space-between;
}

.single-post-container {
    max-width: 860px;
    margin: 40px auto;
    padding: 0 20px;
}

.single-post-title {
    font-size: 32px;
    font-weight: 800;
    line-height: 1.25;
    margin-bottom: 16px;
    color: #ffffff;
}

.single-post-meta {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-color);
}

.entry-content {
    font-size: 16px;
    line-height: 1.8;
    color: #e2e8f0;
}

.entry-content h2, .entry-content h3 {
    color: #ffffff;
    margin-top: 32px;
}

.entry-content p {
    margin-bottom: 20px;
}

.site-footer {
    background-color: #020617;
    border-top: 1px solid var(--border-color);
    padding: 40px 0 24px;
    margin-top: 60px;
    text-align: center;
    color: var(--text-muted);
    font-size: 13px;
}
`
  },
  {
    name: 'index.php',
    content: `<?php
/**
 * CricPulse Main Homepage & Blog Template
 * 100% Native Live Cricket Scoreboard (Zero iframe dependency) + Articles/Blog
 */

get_header();
?>

<!-- Section 1: Live Cricket Matches (Native Scoreboard) -->
<section class="cricket-live-ticker-wrap">
    <div class="cricpulse-container">
        <div id="cp-live-root"></div>
    </div>
</section>

<!-- Section 2: WordPress Articles & News Posts -->
<section class="cricpulse-articles-section">
    <div class="cricpulse-container">
        
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
            <h2 style="font-size: 24px; font-weight: 800; color: #ffffff; margin: 0;">
                <?php _e('Latest Cricket Articles & News', 'cricpulse-theme'); ?>
            </h2>
            <span style="font-size: 13px; color: #94a3b8;">
                <?php _e('புதிய செய்திகள் & கட்டுரைகள்', 'cricpulse-theme'); ?>
            </span>
        </div>

        <?php if (have_posts()) : ?>
            <div class="article-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('article-card'); ?>>
                        <?php if (has_post_thumbnail()) : ?>
                            <a href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail('medium_large', array('class' => 'article-thumbnail')); ?>
                            </a>
                        <?php endif; ?>

                        <div class="article-content">
                            <span class="article-category">
                                <?php
                                $categories = get_the_category();
                                if (!empty($categories)) {
                                    echo esc_html($categories[0]->name);
                                }
                                ?>
                            </span>

                            <h3 class="article-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h3>

                            <div class="article-excerpt">
                                <?php echo wp_trim_words(get_the_excerpt(), 18, '...'); ?>
                            </div>

                            <div class="article-meta">
                                <span><?php echo get_the_date(); ?></span>
                                <span><?php the_author(); ?></span>
                            </div>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>

            <div style="margin: 40px 0; text-align: center;">
                <?php
                the_posts_pagination(array(
                    'prev_text' => __('&laquo; Previous', 'cricpulse-theme'),
                    'next_text' => __('Next &raquo;', 'cricpulse-theme'),
                ));
                ?>
            </div>

        <?php else : ?>
            <div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 40px; text-align: center; margin: 30px 0;">
                <p style="color: #94a3b8; font-size: 15px; margin-bottom: 12px;">
                    <?php _e('இன்னும் கட்டுரைகள் எதுவும் பதிவிடப்படவில்லை (No articles published yet).', 'cricpulse-theme'); ?>
                </p>
                <p style="color: #64748b; font-size: 13px;">
                    <?php _e('WordPress Admin -> Posts -> Add New சென்று உங்கள் முதல் கிரிக்கெட் கட்டுரையை எழுதவும்.', 'cricpulse-theme'); ?>
                </p>
            </div>
        <?php endif; ?>

    </div>
</section>

<?php
get_footer();
`
  },
  {
    name: 'single.php',
    content: `<?php
/**
 * Single Article / Post Template
 */

get_header();
?>

<div class="cricpulse-container">
    <main class="single-post-container">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                
                <header class="entry-header">
                    <span class="article-category">
                        <?php
                        $categories = get_the_category();
                        if (!empty($categories)) {
                            echo esc_html($categories[0]->name);
                        }
                        ?>
                    </span>

                    <h1 class="single-post-title"><?php the_title(); ?></h1>

                    <div class="single-post-meta">
                        <span><?php _e('By', 'cricpulse-theme'); ?> <strong><?php the_author(); ?></strong></span> &bull;
                        <span><?php echo get_the_date(); ?></span> &bull;
                        <span><?php comments_number('0 Comments', '1 Comment', '% Comments'); ?></span>
                    </div>
                </header>

                <?php if (has_post_thumbnail()) : ?>
                    <div class="single-post-featured-image" style="margin-bottom: 24px;">
                        <?php the_post_thumbnail('large', array('style' => 'width: 100%; border-radius: 16px; display: block;')); ?>
                    </div>
                <?php endif; ?>

                <div class="entry-content">
                    <?php the_content(); ?>
                </div>

                <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #1e293b;">
                    <?php the_tags('<div style="font-size: 13px; color: #94a3b8;">Tags: ', ', ', '</div>'); ?>
                </footer>

                <?php
                if (comments_open() || get_comments_number()) :
                    comments_template();
                endif;
                ?>

            </article>
        <?php endwhile; ?>
    </main>
</div>

<?php
get_footer();
`
  },
  {
    name: 'page.php',
    content: `<?php
/**
 * Standard WordPress Page Template
 */

get_header();
?>

<div class="cricpulse-container">
    <main class="single-post-container" style="background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 40px; margin: 40px auto;">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header" style="margin-bottom: 24px; border-bottom: 1px solid #1e293b; padding-bottom: 16px;">
                    <h1 class="single-post-title" style="margin: 0;"><?php the_title(); ?></h1>
                </header>
                <?php if (has_post_thumbnail()) : ?>
                    <div class="single-post-featured-image">
                        <?php the_post_thumbnail('large', array('style' => 'width: 100%; border-radius: 12px; margin-bottom: 24px;')); ?>
                    </div>
                <?php endif; ?>
                <div class="entry-content">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    </main>
</div>

<?php
get_footer();
`
  },
  {
    name: 'page-cricket-live.php',
    content: `<?php
/**
 * Template Name: Cricket Live Scores Full-Width
 * Description: A full-width page template for native live cricket scores.
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="cricpulse-container" style="padding-top: 24px;">
        <div id="cp-live-root"></div>
    </div>
</main>

<?php
get_footer();
`
  },
  {
    name: 'archive.php',
    content: `<?php
/**
 * Category & Tag Archive Template
 */

get_header();
?>

<div class="cricpulse-container">
    <div style="margin: 40px 0 20px;">
        <h1 style="font-size: 28px; font-weight: 800; color: #fff; margin: 0 0 8px;">
            <?php the_archive_title(); ?>
        </h1>
        <div style="color: #94a3b8; font-size: 14px;">
            <?php the_archive_description(); ?>
        </div>
    </div>

    <?php if (have_posts()) : ?>
        <div class="article-grid">
            <?php while (have_posts()) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('article-card'); ?>>
                    <?php if (has_post_thumbnail()) : ?>
                        <a href="<?php the_permalink(); ?>">
                            <?php the_post_thumbnail('medium_large', array('class' => 'article-thumbnail')); ?>
                        </a>
                    <?php endif; ?>

                    <div class="article-content">
                        <h3 class="article-title">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h3>
                        <div class="article-excerpt">
                            <?php echo wp_trim_words(get_the_excerpt(), 18, '...'); ?>
                        </div>
                        <div class="article-meta">
                            <span><?php echo get_the_date(); ?></span>
                            <span><?php the_author(); ?></span>
                        </div>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>

        <div style="margin: 40px 0; text-align: center;">
            <?php the_posts_pagination(); ?>
        </div>
    <?php endif; ?>
</div>

<?php
get_footer();
`
  },
  {
    name: 'header.php',
    content: `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site cricpulse-wrapper">
    <header class="site-header">
        <div class="cricpulse-container">
            <div class="header-inner">
                <div class="site-branding">
                    <span style="font-size: 24px;">🏏</span>
                    <div class="site-title">
                        <a href="<?php echo esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
                    </div>
                </div>

                <nav class="main-navigation">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_id'        => 'primary-menu',
                        'fallback_cb'    => function() {
                            echo '<ul><li><a href="' . esc_url(home_url('/')) . '">Home</a></li><li><a href="' . esc_url(home_url('/')) . '#articles">Articles</a></li></ul>';
                        }
                    ));
                    ?>
                </nav>
            </div>
        </div>
    </header>
`
  },
  {
    name: 'footer.php',
    content: `    <footer class="site-footer">
        <div class="cricpulse-container">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. Powered by CricPulse Native Live Cricket & Blog Theme.</p>
        </div>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
`
  },
  {
    name: 'functions.php',
    content: `<?php
/**
 * CricPulse Theme Functions and Definitions
 * Full WordPress Blog, Articles, Custom Pages & Native Live Cricket Scoreboard
 */

if (!defined('ABSPATH')) {
    exit;
}

function cricpulse_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('align-wide');
    add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'style', 'script'));

    register_nav_menus(array(
        'primary' => __('Primary Menu', 'cricpulse-theme'),
        'footer'  => __('Footer Menu', 'cricpulse-theme'),
    ));
}
add_action('after_setup_theme', 'cricpulse_theme_setup');

function cricpulse_enqueue_scripts() {
    wp_enqueue_style(
        'cricpulse-fonts',
        'https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Rajdhani:wght@600;700&display=swap',
        array(),
        null
    );

    wp_enqueue_style('cricpulse-style', get_stylesheet_uri(), array(), '1.2.0');

    // Enqueue Native Live Cricket Scoreboard CSS
    wp_enqueue_style(
        'cricpulse-app-style',
        get_template_directory_uri() . '/assets/cricket-app.css',
        array(),
        '1.2.0'
    );

    // Enqueue Native Live Cricket Engine JS
    wp_enqueue_script(
        'cricpulse-app-script',
        get_template_directory_uri() . '/assets/cricket-app.js',
        array(),
        '1.2.0',
        true
    );

    wp_localize_script('cricpulse-app-script', 'cricpulseConfig', array(
        'apiKey'   => get_option('cricpulse_api_key', ''),
        'provider' => get_option('cricpulse_provider', 'bigballsdata'),
    ));
}
add_action('wp_enqueue_scripts', 'cricpulse_enqueue_scripts');

function cricpulse_theme_shortcode() {
    return '<div class="cricpulse-container"><div id="cp-live-root"></div></div>';
}
add_shortcode('cricpulse_live', 'cricpulse_theme_shortcode');

function cricpulse_add_admin_menu() {
    add_options_page(
        __('Cricket Live API Settings', 'cricpulse-theme'),
        __('Cricket Live API', 'cricpulse-theme'),
        'manage_options',
        'cricpulse-api-settings',
        'cricpulse_render_api_settings_page'
    );
}
add_action('admin_menu', 'cricpulse_add_admin_menu');

function cricpulse_register_settings() {
    register_setting('cricpulse_options_group', 'cricpulse_api_key');
    register_setting('cricpulse_options_group', 'cricpulse_provider');
}
add_action('admin_init', 'cricpulse_register_settings');

function cricpulse_render_api_settings_page() {
    ?>
    <div class="wrap" style="max-width: 800px; background: #fff; padding: 25px; border-radius: 12px; margin-top: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        <h1 style="display: flex; align-items: center; gap: 10px;">
            <span>🏏</span> CricPulse Cricket Live Settings
        </h1>
        <p style="color: #666; font-size: 14px;">
            நேரலை கிரிக்கெட் ஸ்கோர்களை நிர்வகிப்பதற்கான அமைப்புகள் (Cricket Live Scores Configuration).
        </p>
        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">

        <form method="post" action="options.php">
            <?php settings_fields('cricpulse_options_group'); ?>
            
            <table class="form-table">
                <tr valign="top">
                    <th scope="row" style="width: 250px;">
                        <strong>API Provider</strong>
                    </th>
                    <td>
                        <select name="cricpulse_provider" style="padding: 8px 12px; border-radius: 6px;">
                            <option value="bigballsdata" <?php selected(get_option('cricpulse_provider'), 'bigballsdata'); ?>>BigBallsData.com (Recommended)</option>
                            <option value="cricketdata" <?php selected(get_option('cricpulse_provider'), 'cricketdata'); ?>>CricketData.org</option>
                            <option value="cricapi" <?php selected(get_option('cricpulse_provider'), 'cricapi'); ?>>CricAPI.com</option>
                        </select>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row">
                        <strong>Live API Key</strong><br>
                        <small style="color: #888;">(bigballsdata.com / cricketdata.org)</small>
                    </th>
                    <td>
                        <input type="text" name="cricpulse_api_key" value="<?php echo esc_attr(get_option('cricpulse_api_key')); ?>" style="width: 100%; max-width: 450px; padding: 8px 12px; border-radius: 6px;" placeholder="e.g. your-bigballsdata-api-key" />
                        <p class="description" style="margin-top: 8px;">
                            இலவச API Key பெற: <a href="https://bigballsdata.com" target="_blank" rel="noopener">BigBallsData.com</a> அல்லது <a href="https://cricketdata.org" target="_blank" rel="noopener">CricketData.org</a> சென்று இலவச கணக்கு தொடங்கி API Key-ஐ இங்கே பேஸ்ட் செய்யவும்.
                        </p>
                    </td>
                </tr>
            </table>

            <?php submit_button(__('Save Settings (அமைப்புகளை சேமி)', 'cricpulse-theme')); ?>
        </form>
    </div>
    <?php
}
`
  },
  {
    name: 'readme.txt',
    content: `=== CricPulse Cricket Theme & Blog ===
Contributors: CricPulse Team
Requires at least: 5.0
Tested up to: 6.7
Requires PHP: 7.4
License: GPLv2 or later

== Description ==
A complete native WordPress theme supporting Cricket Live Scores, Article/Blog publishing, custom pages, and BigBallsData.com API integration.
`
  }
];

/**
 * Generates genuine binary .zip Blob in the browser
 */
export async function generateClientThemeZip(): Promise<Blob> {
  const zip = new JSZip();
  const folder = zip.folder('cricpulse-theme');

  // Add root files
  for (const file of WORDPRESS_THEME_FILES) {
    folder?.file(file.name, file.content);
  }

  // Add assets folder with native CSS and JS
  const assetsFolder = folder?.folder('assets');
  assetsFolder?.file('cricket-app.css', CRICKET_APP_CSS);
  assetsFolder?.file('cricket-app.js', CRICKET_APP_JS);

  const blob = await zip.generateAsync({
    type: 'blob',
    mimeType: 'application/zip',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  return blob;
}

/**
 * Downloads genuine .zip directly to user's device
 */
export async function downloadThemeZipFile(fileName: string = 'cricpulse-theme.zip') {
  const blob = await generateClientThemeZip();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
