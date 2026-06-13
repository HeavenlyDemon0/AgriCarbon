import { NavLink, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const navItems = [
  { to: '/home', icon: '🏠', labelKey: 'nav.home' },
  { to: '/farm', icon: '🌾', labelKey: 'nav.farm' },
  { to: '/plan', icon: '📋', labelKey: 'nav.plan' },
  { to: '/wallet', icon: '💰', labelKey: 'nav.wallet' },
  { to: '/more', icon: '⚙️', labelKey: 'nav.more' },
];

export default function BottomNav() {
  const { t } = useLang();
  const location = useLocation();

  // Hide on landing & auth pages
  if (['/', '/signin', '/login'].includes(location.pathname)) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-leaf-100 safe-area-bottom">
      <div className="max-w-lg mx-auto flex justify-around items-center py-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-[4rem] ${
                isActive
                  ? 'text-leaf-700 bg-leaf-50 scale-105'
                  : 'text-earth-500 hover:text-leaf-600 active:scale-95'
              }`
            }
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[0.65rem] font-semibold tracking-wide">{t(item.labelKey)}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
