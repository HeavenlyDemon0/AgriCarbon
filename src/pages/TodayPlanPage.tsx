import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { getTodayRecommendation, type Recommendation } from '../api/recommendations';
import ConfettiEffect from '../components/ConfettiEffect';

export default function TodayPlanPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [rec, setRec] = useState<Recommendation | null>(null);
  const [done, setDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => { getTodayRecommendation().then(setRec); }, []);

  const handleMarkDone = () => {
    setDone(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setTimeout(() => navigate('/verification'), 1200);
    }, 100);
  };

  if (!rec) return <div className="flex items-center justify-center min-h-screen text-3xl animate-pulse-soft">🌱</div>;

  return (
    <div className="page-enter pb-24">
      <ConfettiEffect show={showConfetti} />
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-earth-500 font-semibold text-sm hover:text-leaf-600 transition-colors py-2">
          ← {t('common.back')}
        </button>

        {/* Title */}
        <div className="glass-card bg-gradient-to-br from-leaf-50 via-white to-sky-50 p-6">
          <p className="text-xs font-bold text-leaf-600 uppercase tracking-wider mb-2">📋 {t('dash.today')}</p>
          <h1 className="text-2xl font-black text-earth-800 mb-3">{rec.title}</h1>
          <p className="text-earth-600 leading-relaxed mb-4">{rec.description}</p>

          {/* Cost / Benefit / Risk */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex-1 min-w-[100px] bg-white/80 border border-earth-100 rounded-xl p-3 text-center">
              <span className="text-2xl">{rec.costIcon}</span>
              <p className="text-xs font-bold text-earth-400 mt-1">{t('plan.cost')}</p>
              <p className="text-sm font-bold text-earth-700">{rec.cost}</p>
            </div>
            <div className="flex-1 min-w-[100px] bg-leaf-50 border border-leaf-200 rounded-xl p-3 text-center">
              <span className="text-2xl">{rec.benefitIcon}</span>
              <p className="text-xs font-bold text-leaf-500 mt-1">{t('plan.benefit')}</p>
              <p className="text-sm font-bold text-leaf-700">{rec.benefit}</p>
            </div>
            <div className="flex-1 min-w-[100px] bg-white/80 border border-earth-100 rounded-xl p-3 text-center">
              <span className="text-2xl">{rec.riskIcon}</span>
              <p className="text-xs font-bold text-earth-400 mt-1">{t('plan.risk')}</p>
              <p className="text-sm font-bold text-earth-700">{rec.risk}</p>
            </div>
          </div>
        </div>

        {/* Why this matters */}
        <div className="glass-card p-5">
          <h3 className="font-bold text-earth-800 mb-2 flex items-center gap-2">
            💡 {t('plan.why')}
          </h3>
          <p className="text-sm text-earth-600 leading-relaxed">{rec.rationale}</p>
        </div>

        {/* Action Buttons */}
        {done ? (
          <div className="glass-card bg-leaf-50 border-leaf-300 p-6 text-center animate-bounce-in">
            <span className="text-5xl mb-2 inline-block">🎉</span>
            <p className="text-lg font-bold text-leaf-700">Great job! Redirecting to verify...</p>
          </div>
        ) : (
          <div className="flex gap-3">
            <button onClick={handleMarkDone} className="btn-primary flex-1 text-lg py-4">
              {t('plan.markDone')}
            </button>
            <button onClick={() => navigate('/home')} className="btn-secondary flex-1 text-lg py-4">
              {t('plan.notNow')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
