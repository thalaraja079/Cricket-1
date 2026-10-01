/**
 * Live Cricket API Connector
 * Supports:
 * 1. Big Balls Sports Data (bigballsdata.com)
 * 2. CricketData.org
 * 3. CricAPI.com
 */

export interface CricketApiConfig {
  apiKey: string;
  provider: 'bigballsdata' | 'cricketdata' | 'cricapi' | 'simulator';
  isLiveApiActive: boolean;
}

const STORAGE_KEY = 'cricpulse_api_config';

export function getStoredApiConfig(): CricketApiConfig {
  if (typeof window === 'undefined') {
    return { apiKey: '', provider: 'bigballsdata', isLiveApiActive: false };
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return { apiKey: '', provider: 'bigballsdata', isLiveApiActive: false };
}

export function saveApiConfig(config: CricketApiConfig) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }
}

/**
 * Fetch matches from selected API provider
 */
export async function fetchLiveMatchesFromProvider(provider: 'bigballsdata' | 'cricketdata' | 'cricapi', apiKey: string) {
  if (!apiKey) return null;
  try {
    if (provider === 'bigballsdata') {
      // Big Balls Sports Data endpoint
      const response = await fetch(`https://api.bigballsdata.com/v1/cricket/matches?api_key=${encodeURIComponent(apiKey)}`);
      if (!response.ok) return null;
      return await response.json();
    } else if (provider === 'cricketdata') {
      const response = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${encodeURIComponent(apiKey)}&offset=0`);
      if (!response.ok) return null;
      return await response.json();
    } else {
      const response = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${encodeURIComponent(apiKey)}&offset=0`);
      if (!response.ok) return null;
      return await response.json();
    }
  } catch (err) {
    console.error(`Failed to fetch live matches from ${provider}:`, err);
    return null;
  }
}
