import React, { useState, useEffect } from 'react';
import { Bell, Check, X, Volume2 } from 'lucide-react';
import { Language } from '../types/cricket';
import { notificationService } from '../services/notificationService';
import { cricketAudio } from '../services/soundEffects';

interface PushNotificationBannerProps {
  lang: Language;
}

export const PushNotificationBanner: React.FC<PushNotificationBannerProps> = ({ lang }) => {
  const isTa = lang === 'ta';
  const [dismissed, setDismissed] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [permission, setPermission] = useState<string>('default');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isPush = notificationService.getIsEnabled();
      const perm = notificationService.getPermission();
      setEnabled(isPush && perm === 'granted');
      setPermission(perm);
    }
  }, []);

  const handleEnableNotifications = async () => {
    try {
      cricketAudio.playBoundaryFour();

      const result = await notificationService.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        notificationService.setEnabled(true);
        setEnabled(true);
        notificationService.notifyTest(lang);
      } else {
        // Fallback in-app audio & title notification
        notificationService.setEnabled(true);
        setEnabled(true);
      }
    } catch (e) {
      console.error('Notification permission error', e);
      setEnabled(true);
    }
  };

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-xs shadow-lg">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
          <Bell className="w-4 h-4 animate-bounce" />
        </div>
        <div>
          <span className="font-bold text-white text-sm">
            {isTa ? 'நேரலை மேட்ச் விக்கெட் & சிக்ஸர் அறிவிப்புகள்' : 'Instant Match Alerts & Notifications'}
          </span>
          <p className="text-slate-400 text-xs mt-0.5">
            {isTa
              ? 'பவுண்டரி, சிக்ஸர், விக்கெட் விழும்போது உடனடி ஒலி மற்றும் பிரவுசர் அறிவிப்பு பெறவும்.'
              : 'Get immediate browser notifications and audio chimes for 4s, 6s, and wickets.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleEnableNotifications}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            enabled
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
          }`}
        >
          {enabled ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isTa ? 'அறிவிப்பு தயார் (Active)' : 'Alerts Active'}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isTa ? 'அறிவிப்புகளை இயக்கு' : 'Enable Alerts'}</span>
            </>
          )}
        </button>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          title={isTa ? 'மூடு' : 'Dismiss'}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
