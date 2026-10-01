import React, { useState, useEffect } from 'react';
import { Language } from '../types/cricket';
import { notificationService, NotificationPermissionState } from '../services/notificationService';
import { Bell, BellRing, Check, X, ShieldAlert, Sparkles, Send } from 'lucide-react';

interface PushNotificationBannerProps {
  lang: Language;
}

export const PushNotificationBanner: React.FC<PushNotificationBannerProps> = ({ lang }) => {
  const [permission, setPermission] = useState<NotificationPermissionState>('default');
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [testSent, setTestSent] = useState<boolean>(false);

  useEffect(() => {
    setPermission(notificationService.getPermission());
    setIsEnabled(notificationService.getIsEnabled());
  }, []);

  const handleRequestPermission = async () => {
    const res = await notificationService.requestPermission();
    setPermission(res);
    if (res === 'granted') {
      notificationService.setEnabled(true);
      setIsEnabled(true);
      notificationService.notifyTest(lang);
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    }
  };

  const handleToggle = () => {
    const next = !isEnabled;
    notificationService.setEnabled(next);
    setIsEnabled(next);
  };

  const handleSendTest = () => {
    notificationService.notifyTest(lang);
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  // If dismissed or unsupported, don't show prompt banner
  if (isDismissed || permission === 'unsupported') {
    return null;
  }

  // If permission is already granted, show a compact control chip
  if (permission === 'granted') {
    return (
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-2 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-live" />
          <span className="text-slate-300 font-medium flex items-center gap-1.5">
            <BellRing className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {lang === 'ta' 
                ? 'உடனடி விக்கெட் & மேட்ச் முடிவுகள் நோட்டிபிகேஷன் இயங்குகிறது' 
                : 'Background push alerts active for wickets & final match results'}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSendTest}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Send className="w-3 h-3 text-cyan-400" />
            <span>{testSent ? (lang === 'ta' ? 'அனுப்பப்பட்டது ✓' : 'Sent ✓') : (lang === 'ta' ? 'டெஸ்ட் நோட்டிபிகேஷன்' : 'Test Alert')}</span>
          </button>

          <button
            onClick={handleToggle}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              isEnabled 
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40' 
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            {isEnabled ? (lang === 'ta' ? 'அலர்ட் ஆன்' : 'Alerts On') : (lang === 'ta' ? 'அலர்ட் ஆஃப்' : 'Alerts Off')}
          </button>
        </div>
      </div>
    );
  }

  // If permission is default, invite user to enable
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 p-4 sm:p-5 shadow-xl">
      <div className="flex items-start sm:items-center justify-between flex-wrap gap-4">
        
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg">
            <Bell className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>{lang === 'ta' ? 'விக்கெட் & மேட்ச் நேரலை நோட்டிபிகேஷன்' : 'Browser Push Alerts (Wickets & Match Results)'}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase">
                {lang === 'ta' ? 'பரிந்துரை' : 'New'}
              </span>
            </h4>
            <p className="text-xs text-slate-300 leading-snug">
              {lang === 'ta' 
                ? 'நீங்கள் வேறு டேப்களில் இருந்தாலும் அல்லது பிரவுசரை மினிமைஸ் செய்திருந்தாலும், விக்கெட் விழும்போதும் மேட்ச் முடியும்போதும் உடனுக்குடன் நோட்டிபிகேஷன் பெறலாம்.'
                : 'Get instant alerts the moment a wicket falls or a match finishes, even when you switch tabs or minimize the browser.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRequestPermission}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <BellRing className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'அறிவிப்புகளை இயக்கு (Enable)' : 'Enable Push Alerts'}</span>
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
