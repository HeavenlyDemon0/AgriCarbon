import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import FloatingLeaf from '../components/FloatingLeaf';

function DemoModal({ onClose }: { onClose: () => void }) {
  const { t } = useLang();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto p-6 animate-bounce-in"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-earth-400 hover:text-earth-600 transition-colors">✕</button>
        <h2 className="text-xl font-bold text-earth-800 mb-1">🌾 Demo: Green Valley Farm</h2>
        <p className="text-sm text-earth-400 mb-4">See how AgriCarbon works for a sample farm</p>

        {/* Demo Farm */}
        <div className="glass-card p-4 mb-3">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🌾</span>
            <div>
              <p className="font-bold text-earth-800">Green Valley Farm</p>
              <p className="text-xs text-earth-400">Warangal, Telangana · 5 Acres · Rice</p>
            </div>
          </div>
        </div>

        {/* Demo Recommendation */}
        <div className="bg-gradient-to-br from-leaf-50 to-sky-50 rounded-xl p-4 mb-3 border border-leaf-200">
          <p className="text-xs font-bold text-leaf-600 mb-1">📋 {t('dash.today')}</p>
          <p className="font-bold text-earth-800 mb-2">Apply Organic Mulching</p>
          <div className="flex gap-3 text-sm">
            <span className="bg-white/80 px-2 py-1 rounded-lg">💰 ₹200</span>
            <span className="bg-white/80 px-2 py-1 rounded-lg">🌱 +3 Credits</span>
            <span className="bg-white/80 px-2 py-1 rounded-lg">✅ Low Risk</span>
          </div>
        </div>

        {/* Demo Wallet */}
        <div className="bg-gradient-to-br from-sun-300/20 to-sun-400/10 rounded-xl p-4 mb-3 border border-sun-300/30">
          <p className="text-xs font-bold text-earth-600 mb-1">💰 Carbon Wallet</p>
          <div className="flex justify-between text-sm">
            <span><strong className="text-2xl text-leaf-600">45</strong> Earned</span>
            <span><strong className="text-2xl text-sun-500">12</strong> Pending</span>
            <span><strong className="text-2xl text-sky-500">8</strong> Redeemed</span>
          </div>
        </div>

        {/* Demo Impact */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: 'Water Saved', value: '35%', icon: '💧', color: 'bg-sky-50 text-sky-700' },
            { label: 'Cost Saved', value: '₹3,500', icon: '💰', color: 'bg-sun-300/20 text-earth-700' },
            { label: 'Soil Score', value: '72/100', icon: '🌍', color: 'bg-leaf-50 text-leaf-700' },
            { label: 'CO₂ Captured', value: '2.4t', icon: '🌱', color: 'bg-leaf-100 text-leaf-800' },
          ].map(item => (
            <div key={item.label} className={`${item.color} rounded-xl p-3 text-center`}>
              <span className="text-xl">{item.icon}</span>
              <p className="font-bold text-lg">{item.value}</p>
              <p className="text-xs">{item.label}</p>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="btn-primary w-full">{t('landing.getStarted')} →</button>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-6 py-16 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(170deg, #1a4731 0%, #2d5a3f 20%, #3e6b4e 40%, #5a7d5f 60%, #8b9e6b 80%, #c4b68a 100%)',
        }}
      >
        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />

        {/* Floating Leaf */}
        <div className="mb-6">
          <FloatingLeaf />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white max-w-2xl leading-tight mb-4 animate-slide-up drop-shadow-lg">
          {t('landing.headline')}
        </h1>

        <p className="text-base sm:text-lg text-leaf-100 max-w-md mb-8 animate-slide-up delay-200 leading-relaxed">
          {t('landing.subtext')}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 animate-slide-up delay-300">
          <button
            onClick={() => navigate('/signin')}
            className="btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl"
          >
            🚀 {t('landing.getStarted')}
          </button>
          <button
            onClick={() => setShowDemo(true)}
            className="bg-white/15 hover:bg-white/25 text-white font-bold px-8 py-4 rounded-2xl text-lg backdrop-blur-sm border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            👁️ {t('landing.seeDemo')}
          </button>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L48 55C96 50 192 40 288 42C384 44 480 58 576 65C672 72 768 72 864 65C960 58 1056 44 1152 40C1248 36 1344 42 1392 45L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="#f0fdf4"/>
          </svg>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-12 max-w-4xl mx-auto w-full">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { key: '1', icon: '💎', gradient: 'from-leaf-50 to-leaf-100', border: 'border-leaf-200' },
            { key: '2', icon: '🧠', gradient: 'from-sky-50 to-sky-100', border: 'border-sky-200' },
            { key: '3', icon: '⛅', gradient: 'from-sun-300/10 to-sun-400/10', border: 'border-sun-300/30' },
          ].map((card, i) => (
            <div
              key={card.key}
              className={`glass-card bg-gradient-to-br ${card.gradient} border ${card.border} p-6 text-center animate-slide-up`}
              style={{ animationDelay: `${(i + 1) * 150}ms` }}
            >
              <span className="text-4xl mb-3 inline-block">{card.icon}</span>
              <h3 className="text-lg font-bold text-earth-800 mb-1">{t(`landing.benefit${card.key}.title`)}</h3>
              <p className="text-sm text-earth-500 leading-relaxed">{t(`landing.benefit${card.key}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-earth-400 border-t border-earth-100">
        <p>🌱 AgriCarbon · Empowering Farmers, Healing the Planet</p>
      </footer>

      {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}
    </div>
  );
}
