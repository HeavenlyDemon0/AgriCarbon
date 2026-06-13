import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { getWeeklyPlan, getSeasonalPlan, type Recommendation } from '../api/recommendations';

function DetailModal({ rec, onClose }: { rec: Recommendation; onClose: () => void }) {
  const { t } = useLang();
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-earth-400 hover:text-earth-600">✕</button>
        <h2 className="text-xl font-bold text-earth-800 mb-2">{rec.title}</h2>
        <p className="text-sm text-earth-600 leading-relaxed mb-4">{rec.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-earth-50 px-3 py-1.5 rounded-xl text-sm font-medium">{rec.costIcon} {t('plan.cost')}: {rec.cost}</span>
          <span className="bg-leaf-50 text-leaf-700 px-3 py-1.5 rounded-xl text-sm font-medium">{rec.benefitIcon} {t('plan.benefit')}: {rec.benefit}</span>
          <span className="bg-earth-50 px-3 py-1.5 rounded-xl text-sm font-medium">{rec.riskIcon} {t('plan.risk')}: {rec.risk}</span>
        </div>

        <div className="bg-leaf-50 rounded-xl p-4 mb-4 border border-leaf-200">
          <h3 className="font-bold text-earth-800 mb-1 text-sm">💡 {t('plan.why')}</h3>
          <p className="text-sm text-earth-600 leading-relaxed">{rec.rationale}</p>
        </div>

        <button onClick={onClose} className="btn-primary w-full">{t('common.close')}</button>
      </div>
    </div>
  );
}

export default function PlanPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const initTab = (location.state as { tab?: string })?.tab === 'season' ? 'season' : 'week';
  const [tab, setTab] = useState<'week' | 'season'>(initTab as 'week' | 'season');
  const [weekly, setWeekly] = useState<Recommendation[]>([]);
  const [seasonal, setSeasonal] = useState<Recommendation[]>([]);
  const [selected, setSelected] = useState<Recommendation | null>(null);

  useEffect(() => {
    getWeeklyPlan().then(setWeekly);
    getSeasonalPlan().then(setSeasonal);
  }, []);

  const items = tab === 'week' ? weekly : seasonal;

  return (
    <div className="page-enter pb-24">
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-earth-500 font-semibold text-sm hover:text-leaf-600 transition-colors py-2">
          ← {t('common.back')}
        </button>

        {/* Tabs */}
        <div className="flex bg-earth-50 rounded-xl p-1">
          {(['week', 'season'] as const).map(tb => (
            <button
              key={tb}
              onClick={() => setTab(tb)}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${
                tab === tb ? 'bg-white text-leaf-700 shadow-sm' : 'text-earth-400'
              }`}
            >
              {tb === 'week' ? `📅 ${t('dash.thisWeek')}` : `🌤️ ${t('dash.thisSeason')}`}
            </button>
          ))}
        </div>

        {/* Action List */}
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={item.id} className="glass-card p-4 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{item.benefitIcon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-earth-800">{item.title}</h3>
                  <p className="text-xs text-earth-400 mt-0.5 line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-xs bg-earth-50 px-2 py-1 rounded-lg">{item.costIcon} {item.cost}</span>
                    <span className="text-xs bg-leaf-50 text-leaf-700 px-2 py-1 rounded-lg">{item.benefitIcon} {item.benefit}</span>
                    <span className="text-xs bg-earth-50 px-2 py-1 rounded-lg">{item.riskIcon} {item.risk}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelected(item)}
                className="mt-3 w-full btn-secondary text-sm py-2.5"
              >
                {t('plan.viewDetails')}
              </button>
            </div>
          ))}
        </div>
      </div>
      {selected && <DetailModal rec={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
