import { CricketMatch, Innings, Team, BallEvent } from '../types/cricket';

export interface CricketApiConfig { apiKey: string; provider: 'bigballsdata' | 'cricketdata' | 'cricapi' | 'simulator'; isLiveApiActive: boolean; }
const STORAGE_KEY = 'cricpulse_api_config';
export function getStoredApiConfig(): CricketApiConfig {
  if (typeof window === 'undefined') return { apiKey: '', provider: 'bigballsdata', isLiveApiActive: true };
  try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) return JSON.parse(saved); } catch {}
  return { apiKey: '', provider: 'bigballsdata', isLiveApiActive: true };
}
export function saveApiConfig(config: CricketApiConfig) { if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(config)); }
type LiveEnvelope = { match: any; state: any };
const n = (v: any, fallback = 0) => Number.isFinite(Number(v)) ? Number(v) : fallback;
const s = (v: any, fallback = '') => v == null ? fallback : String(v);
function teamFrom(raw: any, fallbackId: string): Team { const name=s(raw?.name||raw?.teamName,fallbackId.toUpperCase()); const shortName=s(raw?.shortName||raw?.abbreviation||raw?.code,name.slice(0,3).toUpperCase()); return {id:s(raw?.id,fallbackId),name,nameTa:name,shortName,logo:'🏏',color:'#334155'}; }
function emptyInnings(team: Team): Innings { return {teamId:team.id,teamName:team.name,teamShort:team.shortName,totalRuns:0,wickets:0,overs:0,balls:0,batsmen:[],bowlers:[],extras:{total:0,byes:0,legByes:0,wides:0,noBalls:0},fallOfWickets:[]}; }
function stateInnings(raw:any, team:Team):Innings { const inn=emptyInnings(team); const source=raw||{}; inn.totalRuns=n(source.runsScored??source.runs??source.score); inn.wickets=n(source.wicketsFallen??source.wickets??source.wicketsLost); inn.overs=n(source.oversBowled??source.overs??source.over); inn.balls=Math.max(0,Math.round(Math.floor(inn.overs)*6+((inn.overs%1)*10))); return inn; }
function mapLiveEnvelope(env:LiveEnvelope):CricketMatch {
  const raw=env.match||{}, state=env.state||{}; const home=teamFrom(raw.home||raw.homeTeam||raw.teams?.[0],'team1'); const away=teamFrom(raw.away||raw.awayTeam||raw.teams?.[1],'team2');
  const score=raw.score||{}; const first=emptyInnings(home), second=emptyInnings(away); first.totalRuns=n(score.home??raw.homeScore??raw.linescore?.home?.runs); second.totalRuns=n(score.away??raw.awayScore??raw.linescore?.away?.runs);
  const stateInningsRaw=Array.isArray(state.innings)?state.innings:[]; if(stateInningsRaw[0]) Object.assign(first,stateInnings(stateInningsRaw[0],home)); if(stateInningsRaw[1]) Object.assign(second,stateInnings(stateInningsRaw[1],away));
  const inningsNumber=n(state.innings??state.currentInnings??state.inningsNumber,second.totalRuns>0?2:1); const battingTeamId=s(state.battingTeamId||state.batting_team_id,inningsNumber===1?home.id:away.id); const batting=battingTeamId===home.id?first:second;
  if(state.runsScored!=null) batting.totalRuns=n(state.runsScored,batting.totalRuns); if(state.wicketsFallen!=null) batting.wickets=n(state.wicketsFallen,batting.wickets); if(state.oversBowled!=null) batting.overs=n(state.oversBowled,batting.overs); batting.balls=Math.max(0,Math.round(Math.floor(batting.overs)*6+(batting.overs%1)*10));
  const target=n(state.target??state.dlsTarget,0)||undefined, rrr=n(state.requiredRunRate,0)||undefined; const crr=batting.overs>0?Number((batting.totalRuns/batting.overs).toFixed(2)):0; const title=s(raw.name||raw.title,home.name+' vs '+away.name);
  return {id:s(raw.id,home.id+'-'+away.id),title,titleTa:title,tournament:s(raw.competition?.name||raw.league?.name||raw.series?.name,'Cricket'),matchNumber:s(raw.matchNumber||raw.round,''),status:'LIVE',format:s(raw.format||raw.matchType,'Cricket'),venue:s(raw.venue?.name||raw.venue,''),venueTa:s(raw.venue?.name||raw.venue,''),city:s(raw.venue?.city||raw.city,''),cityTa:s(raw.venue?.city||raw.city,''),weather:{tempC:0,condition:'Live data',conditionTa:'நேரலை தரவு',rainChance:0,humidity:0,windKph:0},team1:home,team2:away,innings1:first,innings2:second,target,targetRuns:target,requiredRunRate:rrr,currentRunRate:crr,recentBalls:[],currentInningsNumber:inningsNumber,statusText:target&&batting.totalRuns<target?batting.teamShort+' need '+Math.max(0,target-batting.totalRuns)+' runs':'LIVE',statusTextTa:target&&batting.totalRuns<target?batting.teamName+' வெற்றிக்கு '+Math.max(0,target-batting.totalRuns)+' ரன்கள் தேவை':'நேரலை',winProbabilityTeam1:50,winProbabilityTeam2:50};
}
export async function fetchRealLiveMatches():Promise<CricketMatch[]|null>{ try { const response=await fetch('/api/cricket/live',{cache:'no-store'}); if(!response.ok)return null; const payload=await response.json(); if(!payload?.success||!Array.isArray(payload.matches))return []; return payload.matches.map(mapLiveEnvelope); } catch(error){ console.error('Failed to fetch real live cricket matches:',error); return null; } }
export { mapLiveEnvelope };
