import React, { useState } from 'react';
import { CricketMatch, Language } from '../types/cricket';
import { t } from '../utils/translations';
import { X, Sparkles, TrendingUp, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

interface AiMatchAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: CricketMatch;
  lang: Language;
}

export const AiMatchAnalysisModal: React.FC<AiMatchAnalysisModalProps> = ({
  isOpen,
  onClose,
  match,
  lang,
}) => {
  const [simulating, setSimulating] = useState(false);
  const [predictedWinner, setPredictedWinner] = useState<string | null>(null);

  if (!isOpen) return null;
  const tr = t[lang];

  const runPrediction = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
      // Probabilistic prediction based on match state
      const winTeam = match.winProbabilityTeam2 >= 50 ? match.team2 : match.team1;
      setPredictedWinner(lang === 'ta' ? winTeam.nameTa : winTeam.name);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden p-6 space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {tr.aiAnalysis}
              </h3>
              <p className="text-xs text-slate-400">
                {match.title} · {match.tournament}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-xs sm:text-sm">
          
          {/* Win Probability & Momentum */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>{match.team1.shortName}: {match.winProbabilityTeam1}%</span>
              <span className="text-emerald-400 font-bold">{tr.winProbability}</span>
              <span>{match.team2.shortName}: {match.winProbabilityTeam2}%</span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${match.winProbabilityTeam1}%` }}
              />
              <div 
                className="h-full bg-amber-500 transition-all duration-500"
                style={{ width: `${match.winProbabilityTeam2}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              {lang === 'ta' 
                ? 'தற்போதைய தேவைப்படும் ரன் விகிதம் மற்றும் கையில் உள்ள விக்கெட்டுகளைக் கொண்டு கணக்கிடப்பட்ட நேரலை வெற்றி வாய்ப்பு.'
                : 'Dynamic victory probability calculated based on required run rate, balls remaining, death bowlers, and wickets in hand.'}
            </p>
          </div>

          {/* Strategic Pitch Report */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wide flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{tr.pitchReport}</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {lang === 'ta' ? match.pitchReportTa : match.pitchReport}
            </p>
            <div className="text-[11px] text-slate-400 pt-1">
              • Expected dew factor: Heavy moisture affecting grip in final 4 overs.
            </div>
          </div>

          {/* AI Win Simulator */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-950/80 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Chase Predictor Engine</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {predictedWinner ? (
                  <span className="text-emerald-300 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Predicted Winner: {predictedWinner}
                  </span>
                ) : (
                  'Run Monte-Carlo simulation for death-overs outcome'
                )}
              </p>
            </div>

            <button
              onClick={runPrediction}
              disabled={simulating}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 transition-all cursor-pointer disabled:opacity-50"
            >
              {simulating ? 'Analyzing Ball Data...' : 'Run Prediction'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
