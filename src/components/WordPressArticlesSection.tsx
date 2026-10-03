import React from 'react';
import { Newspaper, ExternalLink, Calendar } from 'lucide-react';
import { Language } from '../types/cricket';

interface WordPressArticlesSectionProps {
  lang: Language;
}

export const WordPressArticlesSection: React.FC<WordPressArticlesSectionProps> = ({ lang }) => {
  const isTa = lang === 'ta';

  const articles = [
    {
      id: 1,
      title: 'Asian Games 2026: India crushes Sri Lanka by 124 runs to storm into Gold Medal Final',
      titleTa: 'ஆசிய விளையாட்டு 2026: இலங்கையை 124 ரன்களில் சுருட்டி தங்கப் பதக்க இறுதிப் போட்டிக்கு முன்னேறியது இந்தியா!',
      excerpt: 'Clinical bowling performance led by Indian spinners bowled out Sri Lanka for 45 after India posted 169/7.',
      excerptTa: 'இந்தியா 169 ரன்கள் குவித்த பின்னர், அபார பந்துவீச்சால் இலங்கையை வெறும் 45 ரன்களில் சுருட்டி இந்தியா அபார வெற்றி பெற்றது.',
      date: 'Oct 1, 2026',
      dateTa: 'அக் 1, 2026',
      readTime: '3 min read',
    },
    {
      id: 2,
      title: 'High-Voltage Clash: India vs Pakistan Gold Medal Final Scheduled for Saturday 9:00 AM',
      titleTa: 'அனல் பறக்கும் மோதல்: இந்தியா vs பாகிஸ்தான் தங்கப் பதக்க இறுதிப் போட்டி சனிக்கிழமை காலை 9:00 மணிக்கு தொடக்கம்!',
      excerpt: 'Both Asian powerhouses comfortably won their semi-finals to set up a blockbuster final at Korogi Sports Park.',
      excerptTa: 'இரு பெரும் அணிகளும் அரையிறுதியில் அபார வெற்றி பெற்று கொரோகி மைதானத்தில் தங்கத்திற்காக மோதவுள்ளன.',
      date: 'Oct 1, 2026',
      dateTa: 'அக் 1, 2026',
      readTime: '4 min read',
    },
    {
      id: 3,
      title: 'India vs West Indies 3rd ODI: India Eye 3-0 Series Sweep at New Chandigarh Today',
      titleTa: 'இந்தியா vs வெஸ்ட் இண்டீஸ் 3வது ஒருநாள் போட்டி: இன்று சண்டிகரில் தொடரை 3-0 என வெல்ல இந்தியா முனைப்பு!',
      excerpt: 'After consecutive high-scoring victories in Guwahati, Team India aims for a series whitewash against the Windies.',
      excerptTa: 'குவஹாத்தியில் நடந்த இரண்டு போட்டிகளிலும் வென்ற இந்திய அணி, இன்று சண்டிகரில் வெஸ்ட் இண்டீஸை ஒயிட்வாஷ் செய்ய தீவிர பயிற்சி.',
      date: 'Today, Oct 3, 2026',
      dateTa: 'இன்று, அக் 3, 2026',
      readTime: '3 min read',
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>📰</span>
            <span>{isTa ? 'சமீபத்திய கிரிக்கெட் செய்திகள் & கட்டுரைகள்' : 'Latest Cricket Articles & News'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isTa ? 'ஆசிய விளையாட்டுப் போட்டிகள் & ஐபிஎல் சிறப்பு செய்திகள்' : 'Asian Games & IPL Tournament Coverage'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((a) => (
          <article
            key={a.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-3 transition-colors"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {isTa ? a.dateTa : a.date}
                </span>
                <span>{a.readTime}</span>
              </div>

              <h3 className="text-sm font-bold text-white hover:text-emerald-400 transition-colors leading-snug">
                {isTa ? a.titleTa : a.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {isTa ? a.excerptTa : a.excerpt}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>{isTa ? 'முழு செய்தி வாசிக்க' : 'Read Full Story'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
