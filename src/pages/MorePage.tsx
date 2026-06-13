import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const menuItems = [
  { label: '🏪 Marketplace', desc: 'Buy & sell farming supplies', to: '/more', icon: '🏪' },
  { label: '🏛️ Government Schemes', desc: 'Subsidies & programs for you', to: '/more', icon: '🏛️' },
  { label: '👥 Community View', desc: 'Connect with nearby farmers', to: '/more', icon: '👥' },
  { label: '📜 Wallet History', desc: 'Full transaction records', to: '/wallet', icon: '📜' },
  { label: '📊 Advanced Analytics', desc: 'Deep farm performance data', to: '/impact', icon: '📊' },
  { label: '⚙️ Technical Info', desc: 'App settings & support', to: '/more', icon: '⚙️' },
];

export default function MorePage() {
  const { t } = useLang();
  const navigate = useNavigate();

  return (
    <div className="page-enter pb-24">
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-earth-500 font-semibold text-sm hover:text-leaf-600 transition-colors py-2">
          ← {t('common.back')}
        </button>

        <h1 className="text-2xl font-black text-earth-800">⚙️ {t('nav.more')}</h1>

        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className="w-full glass-card p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-3xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-earth-800">{item.label.substring(3)}</p>
                <p className="text-xs text-earth-400">{item.desc}</p>
              </div>
              <span className="text-xl text-earth-300">›</span>
            </button>
          ))}
        </div>

        {/* App Info */}
        <div className="text-center py-6">
          <span className="text-3xl mb-2 inline-block">🌱</span>
          <p className="text-sm font-bold text-earth-600">AgriCarbon</p>
          <p className="text-xs text-earth-400">Version 1.0.0 · Made for Farmers</p>
        </div>
      </div>
    </div>
  );
}
