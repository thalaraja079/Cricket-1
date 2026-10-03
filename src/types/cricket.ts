export type Language = 'en' | 'ta';

export interface Team {
  id: string;
  name: string;
  nameTa?: string;
  shortName: string;
  color?: string;
  secondaryColor?: string;
  logo: string;
}

export interface Batsman {
  id: string;
  name: string;
  nameTa?: string;
  role: string;
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

export interface Bowler {
  id: string;
  name: string;
  nameTa?: string;
  role: string;
  overs: number;
  ballsCurrentOver: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  isCurrentBowler?: boolean;
}

export interface FallOfWicket {
  wicketNo: number;
  score: number;
  batsmanName: string;
  over: number;
}

export interface Innings {
  teamId: string;
  teamName: string;
  teamShort: string;
  totalRuns: number;
  wickets: number;
  overs: number;
  balls: number;
  batsmen: Batsman[];
  bowlers: Bowler[];
  extras: {
    total: number;
    byes: number;
    legByes: number;
    wides: number;
    noBalls: number;
  };
  fallOfWickets: FallOfWicket[];
}

export type BatsmanStats = Batsman;
export type BowlerStats = Bowler;
export type MatchStatus = 'LIVE' | 'UPCOMING' | 'COMPLETED';

export interface BallEvent {
  id: string;
  ball: number;
  over: number;
  runs: number;
  isFour: boolean;
  isSix: boolean;
  isWicket: boolean;
  wicketType?: 'bowled' | 'caught' | 'lbw' | 'run out' | 'stumped' | string;
  batsmanName: string;
  bowlerName: string;
  commentaryEn: string;
  commentaryTa: string;
  speedKmph?: number;
  timestamp: string;
}

export interface CricketMatch {
  id: string;
  title: string;
  titleTa?: string;
  tournament: string;
  matchNumber: string;
  status: 'LIVE' | 'UPCOMING' | 'COMPLETED';
  format: string;
  venue: string;
  venueTa?: string;
  city: string;
  cityTa?: string;
  pitchReport?: string;
  pitchReportTa?: string;
  weather?: {
    tempC: number;
    condition: string;
    conditionTa: string;
    rainChance: number;
    humidity: number;
    windKph: number;
  };
  team1: Team;
  team2: Team;
  innings1: Innings;
  innings2: Innings;
  target?: number;
  targetRuns?: number;
  requiredRunRate?: number;
  currentRunRate?: number;
  recentBalls: BallEvent[];
  isGoogleTrending?: boolean;
  trendingReason?: string;
  trendingReasonTa?: string;
  tossResult?: string;
  tossResultTa?: string;
  statusText?: string;
  statusTextTa?: string;
  winProbabilityTeam1?: number;
  winProbabilityTeam2?: number;
  aiAnalysisEn?: string;
  aiAnalysisTa?: string;
  currentInningsNumber?: number;
}

export interface PointsTableTeam {
  position: number;
  teamId: string;
  name: string;
  nameTa?: string;
  teamName: string;
  teamNameTa?: string;
  shortName: string;
  logo: string;
  color: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  netRunRate: number;
  points: number;
  recentForm: ('W' | 'L' | 'T' | 'NR')[];
}

export interface BatterLeader {
  rank: number;
  name: string;
  nameTa?: string;
  player: string;
  playerTa?: string;
  team: string;
  teamShort: string;
  teamColor: string;
  runs: number;
  matches: number;
  avg: number;
  strikeRate: number;
  highscore: string;
  fours: number;
  sixes: number;
}

export interface BowlerLeader {
  rank: number;
  name: string;
  nameTa?: string;
  player: string;
  playerTa?: string;
  team: string;
  teamShort: string;
  teamColor: string;
  wickets: number;
  matches: number;
  economy: number;
  avg: number;
  bestBowling: string;
  bestFigures: string;
}

export interface PlayerLeaderboard {
  orangeCap: BatterLeader[];
  purpleCap: BowlerLeader[];
}

export interface UpcomingMatch {
  id: string;
  tournament: string;
  tournamentTa?: string;
  matchNumber: string;
  matchNumberTa?: string;
  team1: Team;
  team2: Team;
  date: string;
  dateTa?: string;
  time: string;
  timeTa: string;
  venue: string;
  venueTa: string;
  format: string;
  countdownHours: number;
}

export interface RecentResult {
  id: string;
  tournament: string;
  tournamentTa?: string;
  matchNumber: string;
  matchNumberTa?: string;
  team1: Team;
  team2: Team;
  score1: string;
  score2: string;
  winnerTeamId: string;
  winMarginEn: string;
  winMarginTa: string;
  playerOfMatchEn: string;
  playerOfMatchTa: string;
  date: string;
  dateTa: string;
}
