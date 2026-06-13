import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { getWeather, type WeatherData } from '../api/weather';
import { getTodayRecommendation, type Recommendation } from '../api/recommendations';
import { getWalletData, type WalletData } from '../api/wallet';
import { getImpactData, type ImpactData } from '../api/farms';
import ConfettiEffect from '../components/ConfettiEffect';

export default function HomePage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [todayRec, setTodayRec] = useState<Recommendation | null>(null);
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [impact, setImpact] = useState<ImpactData[]>([]);
  const [activeTab, setActiveTab] = useState<'week' | 'season'>('week');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    getWeather().then(setWeather);
    getTodayRecommendation().then(setTodayRec);
    getWalletData().then(setWallet);
    getImpactData().then(setImpact);
  }, []);

  return (
    <div className="page-enter pb-24">
      <ConfettiEffect show={showConfetti} />
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">

        {/* ── Weather Alert Widget ── */}
        <button
          onClick={() => navigate('/alerts')}
          className="w-full glass-card bg-gradient-to-r from-sky-50 to-sky-100 border-sky-200 p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <span className="text-4xl">{weather?.icon ?? '☀️'}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-sky-600 uppercase tracking-wider">{t('dash.weather')}</p>
            <p className="text-earth-800 font-bold text-lg">{weather?.temp ?? '--'}°C · {weather?.condition ?? '...'}</p>
            <p className="text-sm text-earth-500 truncate">{weather?.description ?? 'Loading...'}</p>
          </div>
          <span className="text-2xl text-earth-300">›</span>
        </button>

        {/* ── Today's Recommendation Card ── */}
        {todayRec && (
          <button
            onClick={() => navigate('/plan/today')}
            className="w-full glass-card bg-gradient-to-br from-leaf-50 via-white to-sky-50 border-leaf-200 p-5 text-left active:scale-[0.98] transition-transform"
          >
            <p className="text-xs font-bold text-leaf-600 uppercase tracking-wider mb-2">📋 {t('dash.today')}</p>
            <h3 className="text-xl font-black text-earth-800 mb-2">{todayRec.title}</h3>
            <p className="text-sm text-earth-500 mb-3 leading-relaxed">{todayRec.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/80 border border-earth-100 px-3 py-1.5 rounded-xl text-sm font-medium">{todayRec.costIcon} {todayRec.cost}</span>
              <span className="bg-leaf-50 border border-leaf-200 px-3 py-1.5 rounded-xl text-sm font-medium text-leaf-700">{todayRec.benefitIcon} {todayRec.benefit}</span>
              <span className="bg-white/80 border border-earth-100 px-3 py-1.5 rounded-xl text-sm font-medium">{todayRec.riskIcon} {todayRec.risk}</span>
            </div>
          </button>
        )}

        {/* ── Week / Season Tabs ── */}
        <div className="glass-card p-4">
          <div className="flex bg-earth-50 rounded-xl p-1 mb-3">
            {(['week', 'season'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-white text-leaf-700 shadow-sm'
                    : 'text-earth-400 hover:text-earth-600'
                }`}
              >
                {tab === 'week' ? `📅 ${t('dash.thisWeek')}` : `🌤️ ${t('dash.thisSeason')}`}
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate('/plan', { state: { tab: activeTab } })}
            className="w-full btn-secondary text-sm py-3"
          >
            {t('plan.viewDetails')} →
          </button>
        </div>

        {/* ── Carbon Wallet Widget ── */}
        <button
          onClick={() => { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 100); navigate('/wallet'); }}
          className="w-full glass-card bg-gradient-to-br from-sun-300/15 to-leaf-50 border-sun-300/30 p-5 text-left active:scale-[0.98] transition-transform"
        >
          <p className="text-xs font-bold text-earth-600 uppercase tracking-wider mb-3">💰 {t('dash.wallet')}</p>
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-3xl font-black text-leaf-600">{wallet?.earned ?? '--'}</p>
              <p className="text-xs text-earth-400">{t('dash.credits')}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-earth-700">{wallet?.totalValue ?? '--'}</p>
              <p className="text-xs text-earth-400">Total Value</p>
            </div>
          </div>
          <div className="flex gap-4 text-xs text-earth-500">
            <span className="bg-leaf-50 px-2 py-1 rounded-lg">✅ {wallet?.earned ?? 0} Earned</span>
            <span className="bg-sun-300/20 px-2 py-1 rounded-lg">⏳ {wallet?.pending ?? 0} Pending</span>
            <span className="bg-sky-50 px-2 py-1 rounded-lg">🎁 {wallet?.redeemed ?? 0} Used</span>
          </div>
        </button>

        {/* ── Photo Verification Widget ── */}
        <button
          onClick={() => navigate('/verification')}
          className="w-full glass-card bg-gradient-to-r from-leaf-50 to-leaf-100 border-leaf-200 p-5 flex items-center gap-4 active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 rounded-2xl bg-leaf-500 flex items-center justify-center text-2xl text-white shadow-lg shadow-leaf-300">
            📸
          </div>
          <div className="text-left flex-1">
            <p className="font-bold text-earth-800 text-lg">{t('dash.uploadPhoto')}</p>
            <p className="text-sm text-earth-400">{t('dash.photoVerify')}</p>
          </div>
          <span className="text-2xl text-earth-300">›</span>
        </button>

        {/* ── Report Widget ── */}
        <button
          onClick={() => navigate('/reports')}
          className="w-full glass-card p-4 flex items-center gap-4 active:scale-[0.98] transition-transform"
        >
          <span className="text-3xl">📊</span>
          <div className="text-left flex-1">
            <p className="font-bold text-earth-800">{t('dash.report')}</p>
            <p className="text-xs text-earth-400">View & share your farm reports</p>
          </div>
          <span className="text-2xl text-earth-300">›</span>
        </button>

        {/* ── Impact Summary Card ── */}
        <button
          onClick={() => navigate('/impact')}
          className="w-full glass-card p-5 text-left active:scale-[0.98] transition-transform"
        >
          <p className="text-xs font-bold text-earth-600 uppercase tracking-wider mb-3">📈 {t('dash.impact')}</p>
          <div className="grid grid-cols-2 gap-2">
            {impact.slice(0, 4).map(item => (
              <div key={item.metric} className="bg-gradient-to-br from-leaf-50/50 to-white rounded-xl p-3 text-center border border-leaf-100">
                <span className="text-xl">{item.icon}</span>
                <p className="text-xs text-earth-400 mt-0.5">{item.metric}</p>
                <p className="text-sm font-bold text-leaf-700">{item.improvement}</p>
              </div>
            ))}
          </div>
        </button>

        {/* ── Quick Nav Buttons ── */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: t('dash.thisWeek'), icon: '📅', to: '/plan' },
            { label: t('dash.thisSeason'), icon: '🌤️', to: '/plan' },
            { label: t('dash.wallet'), icon: '💰', to: '/wallet' },
            { label: t('dash.photoVerify'), icon: '📸', to: '/verification' },
            { label: t('dash.report'), icon: '📊', to: '/reports' },
            { label: t('nav.more'), icon: '⚙️', to: '/more' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className="glass-card p-3 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-semibold text-earth-600 text-center leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
