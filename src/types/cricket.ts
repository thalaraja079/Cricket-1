export type Language = 'ta' | 'en';

export type MatchStatus = 'LIVE' | 'UPCOMING' | 'COMPLETED';
export type MatchFormat = 'T20' | 'ODI' | 'TEST';
export type TournamentType = 'IPL 2026' | 'ICC T20 World Cup' | 'Champions Trophy' | 'Bilateral Series';

export interface BallEvent {
  id: string;
  over: number;
  ball: number;
  runs: number;
  isFour?: boolean;
  isSix?: boolean;
  isWicket?: boolean;
  wicketType?: 'bowled' | 'caught' | 'lbw' | 'run out' | 'stumped';
  dismissedPlayer?: string;
  isExtra?: boolean;
  extraType?: 'wide' | 'no-ball' | 'bye' | 'leg-bye';
  batsmanName: string;
  bowlerName: string;
  commentaryEn: string;
  commentaryTa: string;
  speedKmph?: number;
  shotZone?: 'cover' | 'mid-wicket' | 'straight' | 'point' | 'fine-leg' | 'third-man' | 'long-on' | 'long-off';
  timestamp: string;
}

export interface BatsmanStats {
  id: string;
  name: string;
  nameTa: string;
  role: 'Batter' | 'Wicketkeeper' | 'All-rounder' | 'Bowler';
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isStriker: boolean;
  isOut: boolean;
  dismissalInfo?: string;
  dismissalInfoTa?: string;
}

export interface BowlerStats {
  id: string;
  name: string;
  nameTa: string;
  role: 'Fast Bowler' | 'Spin Bowler' | 'Medium Pacer';
  overs: number;
  ballsCurrentOver: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  isCurrentBowler: boolean;
}

export interface TeamInfo {
  id: string;
  name: string;
  nameTa: string;
  shortName: string;
  color: string;
  secondaryColor: string;
  logo: string;
}

export interface InningsData {
  teamId: string;
  teamName: string;
  teamShort: string;
  totalRuns: number;
  wickets: number;
  overs: number; // e.g., 18.3
  balls: number; // total balls bowled
  batsmen: BatsmanStats[];
  bowlers: BowlerStats[];
  extras: {
    wides: number;
    noBalls: number;
    byes: number;
    legByes: number;
    total: number;
  };
  fallOfWickets: {
    wicketNo: number;
    score: number;
    over: number;
    batsmanName: string;
  }[];
  overHistory: {
    overNumber: number;
    runsConceded: number;
    wicketsLost: number;
    balls: { run: number; isWicket: boolean; isFour: boolean; isSix: boolean; extra?: string }[];
  }[];
}

export interface CricketMatch {
  id: string;
  title: string;
  titleTa: string;
  tournament: TournamentType;
  matchNumber: string;
  status: MatchStatus;
  format: MatchFormat;
  venue: string;
  venueTa: string;
  city: string;
  cityTa: string;
  pitchReport: string;
  pitchReportTa: string;
  weather: {
    tempC: number;
    condition: string;
    conditionTa: string;
    rainChance: number;
  };
  team1: TeamInfo;
  team2: TeamInfo;
  innings1: InningsData;
  innings2?: InningsData;
  currentInningsNumber: 1 | 2;
  battingTeamId: string;
  bowlingTeamId: string;
  target?: number;
  ballsRemaining?: number;
  runsNeeded?: number;
  currentRunRate: number;
  requiredRunRate?: number;
  winProbabilityTeam1: number; // e.g. 64%
  winProbabilityTeam2: number; // e.g. 36%
  recentBalls: BallEvent[];
  tossResult: string;
  tossResultTa: string;
  statusText: string;
  statusTextTa: string;
  playerOfTheMatch?: {
    name: string;
    nameTa: string;
    team: string;
    stat: string;
  };
  matchDate?: string; // YYYY-MM-DD format for date filtering
  matchDateFormatted?: string;
  matchDateFormattedTa?: string;
}

export interface UpcomingMatch {
  id: string;
  tournament: TournamentType;
  matchNo: string;
  dateStr: string;
  dateStrTa: string;
  timeStr: string;
  startsInSeconds: number;
  venue: string;
  venueTa: string;
  city: string;
  team1: TeamInfo;
  team2: TeamInfo;
  stage: string;
  stageTa: string;
  headToHead: {
    team1Wins: number;
    team2Wins: number;
    noResult: number;
    total: number;
  };
  keyBattle: {
    player1: string;
    player2: string;
    description: string;
    descriptionTa: string;
  };
  isReminderSet?: boolean;
}

export interface PointsTableTeam {
  position: number;
  teamId: string;
  teamName: string;
  teamNameTa: string;
  shortName: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  netRunRate: number;
  points: number;
  recentForm: ('W' | 'L' | 'NR')[];
  color: string;
  logo: string;
}

export interface PlayerLeaderboard {
  orangeCap: {
    rank: number;
    player: string;
    playerTa: string;
    team: string;
    teamColor: string;
    runs: number;
    innings: number;
    strikeRate: number;
    fours: number;
    sixes: number;
  }[];
  purpleCap: {
    rank: number;
    player: string;
    playerTa: string;
    team: string;
    teamColor: string;
    wickets: number;
    overs: number;
    economy: number;
    bestFigures: string;
  }[];
}
