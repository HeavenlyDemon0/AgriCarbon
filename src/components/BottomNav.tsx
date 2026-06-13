import { NavLink, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const navItems = [
  { to: '/home', icon: '◱', labelKey: 'nav.home' },
  { to: '/plan', icon: '✓', labelKey: 'nav.plan' },
  { to: '/wallet', icon: '◈', labelKey: 'nav.wallet' },
  { to: '/more', icon: '⚙', labelKey: 'nav.more' },
];

export default function BottomNav() {
  const { t } = useLang();
  const location = useLocation();

  if (['/', '/signin', '/signup'].includes(location.pathname)) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-agri-bg/80 backdrop-blur-xl border-t border-white/5 pb-2">
      <div className="flex justify-around items-center pt-2">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200 min-w-[4rem] text-sm ${
                isActive ? 'text-agri-emerald font-bold' : 'text-gray-600 hover:text-gray-400 font-medium'
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[0.6rem] tracking-wide">{t(item.labelKey)}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
