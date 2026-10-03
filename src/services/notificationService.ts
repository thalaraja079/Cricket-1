import { CricketMatch, BallEvent, Language } from '../types/cricket';

export type NotificationPermissionState = 'default' | 'granted' | 'denied' | 'unsupported';

class NotificationService {
  private originalTitle: string = typeof document !== 'undefined' ? document.title : 'CricPulse Live';
  private titleFlashInterval: NodeJS.Timeout | null = null;
  private isEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cricpulse_push_enabled');
      this.isEnabled = saved !== null ? saved === 'true' : true;

      // Handle visibility changes
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          this.stopTitleFlash();
        }
      });
    }
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  public getPermission(): NotificationPermissionState {
    if (!this.isSupported()) return 'unsupported';
    return Notification.permission as NotificationPermissionState;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('cricpulse_push_enabled', String(enabled));
    }
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  public async requestPermission(): Promise<NotificationPermissionState> {
    if (!this.isSupported()) return 'unsupported';
    try {
      const res = await Notification.requestPermission();
      return res as NotificationPermissionState;
    } catch {
      return 'denied';
    }
  }

  /**
   * Alert user when a wicket falls, with sound and background tab title flash
   */
  public notifyWicket(match: CricketMatch, ball: BallEvent, lang: Language) {
    if (!this.isEnabled) return;

    const inn = match.innings2 || match.innings1;
    const title = lang === 'ta' 
      ? `🚨 விக்கெட் வீழ்ந்தது! ${match.team2.shortName} ${inn.totalRuns}/${inn.wickets}` 
      : `🚨 WICKET FALLS! ${match.team2.shortName} ${inn.totalRuns}/${inn.wickets}`;

    const body = lang === 'ta'
      ? `${ball.bowlerName} பந்துவீச்சில் விக்கெட்! ${ball.batsmanName} ஆட்டமிழந்தார். (${match.team2.shortName} vs ${match.team1.shortName})`
      : `${ball.bowlerName} strikes! ${ball.batsmanName} departs. (${match.team2.shortName} vs ${match.team1.shortName})`;

    this.sendNotification(title, body, 'wicket-alert');

    // If tab is inactive, flash browser tab title so user sees it instantly
    if (typeof document !== 'undefined' && document.hidden) {
      this.flashTitle(`🚨 WICKET! ${match.team2.shortName} ${inn.totalRuns}/${inn.wickets}`);
    }
  }

  /**
   * Alert user when a match result is finalized
   */
  public notifyMatchResult(match: CricketMatch, lang: Language) {
    if (!this.isEnabled) return;

    const title = lang === 'ta'
      ? `🏆 போட்டி முடிவுற்றது! (${match.team1.shortName} vs ${match.team2.shortName})`
      : `🏆 MATCH FINALIZED! (${match.team1.shortName} vs ${match.team2.shortName})`;

    const body = (lang === 'ta' ? match.statusTextTa : match.statusText) || 'Match completed';

    this.sendNotification(title, body, 'result-alert');

    if (typeof document !== 'undefined' && document.hidden) {
      this.flashTitle(`🏆 RESULT: ${match.statusText || 'Match completed'}`);
    }
  }

  /**
   * Test notification trigger
   */
  public notifyTest(lang: Language) {
    const title = lang === 'ta' 
      ? '🔔 கிரிக் பல்ஸ் அறிவிப்புகள் தயார்!' 
      : '🔔 CricPulse Push Alerts Active!';
    const body = lang === 'ta'
      ? 'விக்கெட் விழும்போதும், போட்டி முடிவடையும்போதும் உடனடி நோட்டிபிகேஷன் வரும்.'
      : 'You will receive instant alerts whenever a wicket falls or a match finishes, even in background tabs!';
    this.sendNotification(title, body, 'test-alert');
  }

  private sendNotification(title: string, body: string, tag: string) {
    if (!this.isSupported() || Notification.permission !== 'granted') {
      return;
    }

    try {
      const options: NotificationOptions = {
        body,
        icon: 'https://cdn-icons-png.flaticon.com/512/889/889606.png', // cricket icon
        badge: 'https://cdn-icons-png.flaticon.com/512/889/889606.png',
        tag,
        silent: false,
      };

      const notification = new Notification(title, options);

      notification.onclick = () => {
        if (typeof window !== 'undefined') {
          window.focus();
        }
        notification.close();
      };
    } catch {
      // Fallback for environments where Notification constructor fails
    }
  }

  private flashTitle(alertText: string) {
    this.stopTitleFlash();
    let toggle = false;
    this.originalTitle = document.title;

    this.titleFlashInterval = setInterval(() => {
      document.title = toggle ? alertText : this.originalTitle;
      toggle = !toggle;
    }, 1000);
  }

  private stopTitleFlash() {
    if (this.titleFlashInterval) {
      clearInterval(this.titleFlashInterval);
      this.titleFlashInterval = null;
    }
    if (typeof document !== 'undefined') {
      document.title = 'CricPulse Live - கிரிக்கெட் நேரலை & அட்டவணை';
    }
  }
}

export const notificationService = new NotificationService();
