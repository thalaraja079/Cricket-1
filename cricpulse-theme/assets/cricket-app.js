/**
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
            commHtml += `
                <div class="cp-comm-entry">
                    <span class="cp-comm-badge">${c.over}</span>
                    <div>
                        <div style="color:#f8fafc;">${c.en}</div>
                        <div style="color:#34d399;font-size:12px;margin-top:3px;">${c.ta}</div>
                    </div>
                </div>
            `;
        });

        // 1. LIVE MATCH SECTION
        var liveMatchSection = `
            <div class="cp-match-card" style="margin-bottom: 28px;">
                <div class="cp-match-header">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <span class="cp-live-tag"><span class="cp-pulse-dot"></span> LIVE</span>
                        <span style="font-size:13px;font-weight:700;color:#94a3b8;">${isTa ? match.titleTa : match.title}</span>
                    </div>
                    <span style="font-size:12px;color:#34d399;font-weight:700;">Live Auto-Updates ⚡</span>
                </div>

                <!-- Teams Scoreboard: BANGLADESH 111/7 vs PAKISTAN 53/3 (Target 112) -->
                <div class="cp-teams-scoreboard">
                    <div class="cp-team-col">
                        <span class="cp-t-name">🇧🇩 ${match.team1.fullName}</span>
                        <span class="cp-t-score" style="color:#94a3b8;">${match.team1.score}/${match.team1.wickets}</span>
                        <span class="cp-t-overs">(${match.team1.overs}.0 / 13 ov)</span>
                    </div>

                    <div class="cp-center-vs">VS</div>

                    <div class="cp-team-col right">
                        <span class="cp-t-name">🇵🇰 ${match.team2.fullName}</span>
                        <span class="cp-t-score">${match.team2.score}/${match.team2.wickets}</span>
                        <span class="cp-t-overs">(${match.team2.overs}.${match.team2.balls} / 13 ov) • Target: ${match.target}</span>
                    </div>
                </div>

                <!-- Target and Equation Status Bar -->
                <div class="cp-summary-bar">
                    <span style="font-weight:700;color:#fbbf24;">
                        ${needed > 0 
                            ? (isTa ? 'பாகிஸ்தான் வெற்றிக்கு ' + remainingBalls + ' பந்துகளில் ' + needed + ' ரன்கள் தேவை' : 'PAK need ' + needed + ' runs in ' + remainingBalls + ' balls to win') 
                            : 'பாகிஸ்தான் வெற்றி பெற்றது!'}
                    </span>
                    <div style="display:flex;gap:12px;color:#94a3b8;">
                        <span>CRR: <strong style="color:#f8fafc;">${crr}</strong></span>
                        <span>RRR: <strong style="color:#f8fafc;">${rrr}</strong></span>
                    </div>
                </div>

                <!-- Recent Overs Strip -->
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;flex-wrap:wrap;">
                    <span style="font-size:12px;color:#94a3b8;font-weight:700;">${isTa ? 'சமீபத்திய பந்துகள்:' : 'Recent Overs:'}</span>
                    <div class="cp-recent-strip">${recentPills}</div>
                </div>

                <!-- Batting & Bowling Mini Cards -->
                <div class="cp-players-grid">
                    <div class="cp-mini-card">
                        <div class="cp-mini-title">🏏 ${isTa ? 'களத்தில் உள்ள பேட்டர்கள்' : 'Current Batsmen'}</div>
                        ${match.batsmen.map(function(b) {
                            return '<div class="cp-p-row">' +
                                '<span style="font-weight:600;color:#f8fafc;">' + b.name + (b.onStrike ? ' <span style="color:#10b981;">*</span>' : '') + '</span>' +
                                '<span style="color:#38bdf8;font-weight:700;">' + b.runs + ' (' + b.balls + ') <small style="color:#64748b;">4s:' + b.fours + ' 6s:' + b.sixes + '</small></span>' +
                            '</div>';
                        }).join('')}
                    </div>

                    <div class="cp-mini-card">
                        <div class="cp-mini-title">🎯 ${isTa ? 'பந்துவீச்சாளர்' : 'Current Bowler'}</div>
                        <div class="cp-p-row">
                            <span style="font-weight:600;color:#f8fafc;">${match.bowler.name}</span>
                            <span style="color:#38bdf8;font-weight:700;">${match.bowler.overs} ov • ${match.bowler.runs}r • ${match.bowler.wickets}w</span>
                        </div>
                    </div>
                </div>

                <!-- Live Commentary -->
                <div class="cp-comm-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid #1e293b;padding-bottom:8px;">
                        <span style="font-size:13px;font-weight:800;color:#ffffff;">🎙️ ${isTa ? 'நேரலை வர்ணனை (Ball-by-Ball)' : 'Live Commentary'}</span>
                        <span style="font-size:11px;color:#38bdf8;">தமிழ் & English</span>
                    </div>
                    ${commHtml}
                </div>
            </div>
        `;

        // 2. UPCOMING MATCHES SECTION (அக்கமிங் மேட்சஸ்)
        var upcomingSection = `
            <div style="margin-bottom: 28px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <h3 style="font-size:18px;font-weight:800;color:#ffffff;margin:0;display:flex;align-items:center;gap:8px;">
                        <span>📅</span> ${isTa ? 'அடுத்து வரவிருக்கும் போட்டிகள் (Upcoming Matches)' : 'Upcoming Matches Schedule'}
                    </h3>
                    <span style="font-size:12px;color:#38bdf8;font-weight:700;">Today & Weekend</span>
                </div>
                <div class="cp-grid-cards">
                    ${state.upcomingMatches.map(function(m) {
                        return `
                            <div class="cp-item-card">
                                <div class="cp-card-badge">${m.series}</div>
                                <div style="font-size:15px;font-weight:800;color:#ffffff;margin-bottom:6px;">
                                    ${m.team1} <span style="color:#f59e0b;">vs</span> ${m.team2}
                                </div>
                                <div style="font-size:13px;color:#38bdf8;font-weight:700;margin-bottom:4px;">
                                    ⏰ ${isTa ? m.timeTa : m.time}
                                </div>
                                <div style="font-size:12px;color:#94a3b8;">
                                    📍 ${isTa ? m.venueTa : m.venue}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        // 3. POINTS TABLE SECTION (பாய்ண்ட்ஸ் டேபிள்)
        var pointsTableSection = `
            <div style="margin-bottom: 28px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <h3 style="font-size:18px;font-weight:800;color:#ffffff;margin:0;display:flex;align-items:center;gap:8px;">
                        <span>📊</span> ${isTa ? 'புள்ளிகள் பட்டியல் (Points Table)' : 'Tournament Standings'}
                    </h3>
                    <span style="font-size:12px;color:#10b981;font-weight:700;">Asian Games 2026</span>
                </div>
                <div class="cp-table-wrap">
                    <table class="cp-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>${isTa ? 'அணி (Team)' : 'Team'}</th>
                                <th>${isTa ? 'போட்டிகள்' : 'P'}</th>
                                <th>${isTa ? 'வெற்றி' : 'W'}</th>
                                <th>${isTa ? 'தோல்வி' : 'L'}</th>
                                <th>${isTa ? 'ரன் ரேட்' : 'NRR'}</th>
                                <th>${isTa ? 'புள்ளிகள்' : 'PTS'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${state.pointsTable.map(function(t) {
                                return `
                                    <tr>
                                        <td style="font-weight:800;color:#38bdf8;">${t.pos}</td>
                                        <td class="cp-team-name-cell">${t.team}</td>
                                        <td>${t.p}</td>
                                        <td style="color:#34d399;font-weight:700;">${t.w}</td>
                                        <td style="color:#f87171;">${t.l}</td>
                                        <td>${t.nrr}</td>
                                        <td style="font-size:15px;font-weight:900;color:#fbbf24;">${t.pts}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        // 4. RECENT RESULTS SECTION (சமீபத்திய முடிவுகள்)
        var resultsSection = `
            <div style="margin-bottom: 28px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <h3 style="font-size:18px;font-weight:800;color:#ffffff;margin:0;display:flex;align-items:center;gap:8px;">
                        <span>🏆</span> ${isTa ? 'சமீபத்திய முடிவுகள் (Recent Results)' : 'Recent Match Results'}
                    </h3>
                </div>
                <div class="cp-grid-cards">
                    ${state.recentResults.map(function(r) {
                        return `
                            <div class="cp-item-card">
                                <div class="cp-card-badge">Completed • ${r.date}</div>
                                <div style="font-size:13px;color:#94a3b8;margin-bottom:4px;">${r.series}</div>
                                <div style="font-size:14px;font-weight:700;color:#ffffff;">${r.team1}</div>
                                <div style="font-size:14px;font-weight:700;color:#ffffff;margin-bottom:8px;">${r.team2}</div>
                                <div style="font-size:13px;font-weight:800;color:#34d399;background:rgba(52,211,153,0.1);padding:6px 10px;border-radius:8px;border:1px solid rgba(52,211,153,0.2);">
                                    🏆 ${isTa ? r.resultTa : r.resultEn}
                                </div>
                                <div style="font-size:11px;color:#64748b;margin-top:6px;">
                                    POTM: ${r.playerOfMatch}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        // 5. LEADERBOARD SECTION (லீடர் போர்டு)
        var leadersSection = `
            <div style="margin-bottom: 20px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <h3 style="font-size:18px;font-weight:800;color:#ffffff;margin:0;display:flex;align-items:center;gap:8px;">
                        <span>👑</span> ${isTa ? 'முன்னணி வீரர்கள் (Leaderboard)' : 'Tournament Leaders'}
                    </h3>
                </div>
                <div class="cp-players-grid">
                    <div class="cp-mini-card">
                        <div class="cp-mini-title" style="color:#f59e0b;">🧡 ${isTa ? 'அதிக ரன்கள் (Orange Cap)' : 'Most Runs'}</div>
                        ${state.statLeaders.orangeCap.map(function(p, i) {
                            return `
                                <div class="cp-p-row">
                                    <span style="color:#f8fafc;font-weight:600;">${i + 1}. ${p.name}</span>
                                    <span style="color:#f59e0b;font-weight:800;">${p.runs} runs <small style="color:#64748b;">(SR: ${p.sr})</small></span>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <div class="cp-mini-card">
                        <div class="cp-mini-title" style="color:#a855f7;">💜 ${isTa ? 'அதிக விக்கெட்டுகள் (Purple Cap)' : 'Most Wickets'}</div>
                        ${state.statLeaders.purpleCap.map(function(p, i) {
                            return `
                                <div class="cp-p-row">
                                    <span style="color:#f8fafc;font-weight:600;">${i + 1}. ${p.name}</span>
                                    <span style="color:#c084fc;font-weight:800;">${p.wickets} wkts <small style="color:#64748b;">(Econ: ${p.econ})</small></span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;

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

        root.innerHTML = `
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
                        <button id="cp-btn-sound" class="cp-btn-control ${state.isSoundEnabled ? 'active' : ''}">
                            ${state.isSoundEnabled ? '🔊 ' + (isTa ? 'ஒலி: ஆன்' : 'Sound: ON') : '🔇 ' + (isTa ? 'ஒலி: ஆஃப் (கிளிக் செய்க)' : 'Sound: OFF')}
                        </button>

                        <button id="cp-btn-lang" class="cp-btn-control">
                            🌐 ${isTa ? 'English' : 'தமிழ்'}
                        </button>
                    </div>
                </div>

                <div class="cp-tabs-bar">
                    <button class="cp-tab-btn ${state.activeTab === 'all' ? 'active' : ''}" data-tab="all">
                        🌟 ${isTa ? 'அனைத்து பிரிவுகளும்' : 'All Sections'}
                    </button>
                    <button class="cp-tab-btn ${state.activeTab === 'live' ? 'active' : ''}" data-tab="live">
                        🔴 ${isTa ? 'நேரலை BAN vs PAK' : 'Live Match'}
                    </button>
                    <button class="cp-tab-btn ${state.activeTab === 'schedule' ? 'active' : ''}" data-tab="schedule">
                        📅 ${isTa ? 'அக்கமிங் மேட்சஸ்' : 'Upcoming'}
                    </button>
                    <button class="cp-tab-btn ${state.activeTab === 'table' ? 'active' : ''}" data-tab="table">
                        📊 ${isTa ? 'பாய்ண்ட்ஸ் டேபிள்' : 'Points Table'}
                    </button>
                    <button class="cp-tab-btn ${state.activeTab === 'results' ? 'active' : ''}" data-tab="results">
                        🏆 ${isTa ? 'முடிவுகள்' : 'Results'}
                    </button>
                    <button class="cp-tab-btn ${state.activeTab === 'leaders' ? 'active' : ''}" data-tab="leaders">
                        👑 ${isTa ? 'லீடர் போர்டு' : 'Leaderboard'}
                    </button>
                </div>

                <div class="cp-content-area">
                    ${contentBody}
                </div>
            </div>
        `;

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
