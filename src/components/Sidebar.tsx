import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNav } from '../context/NavContext';

const menuItems = [
  { labelKey: 'nav.home', icon: '◱', to: '/home' },
  { labelKey: 'nav.plan', icon: '✓', to: '/plan' },
  { labelKey: 'nav.wallet', icon: '◈', to: '/wallet' },
  { labelKey: 'nav.farm', icon: '▤', to: '/farm' },
  { labelKey: 'dash.report', icon: '↻', to: '/reports' },
  { labelKey: 'nav.more', icon: '⚙', to: '/more' },
];

export default function Sidebar() {
  const { t } = useLang();
  const { logout } = useAuth();
  const { isCollapsed, toggleSidebar } = useNav();
  const navigate = useNavigate();
  const location = useLocation();

  if (['/', '/signin', '/signup'].includes(location.pathname)) return null;

  return (
    <aside 
      className={`hidden md:flex flex-col h-screen fixed left-0 top-0 glass-sidebar z-50 pt-6 pb-6 px-3 transition-all duration-300 ${isCollapsed ? 'w-[80px]' : 'w-[280px]'}`}
    >
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-2'} mb-10 text-white relative`}>
        <span className="text-3xl text-agri-emerald font-black" style={{ textShadow: '0 0 15px rgba(16,185,129,0.5)' }}>A.</span>
        {!isCollapsed && <span className="text-xl font-bold tracking-tight animate-fade-in whitespace-nowrap overflow-hidden">AgriCarbon</span>}
        
        {/* Toggle Arrow */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-10 bg-agri-surface border border-white/5 flex items-center justify-center text-gray-400 hover:text-white rounded-r-md cursor-pointer z-50"
        >
          {isCollapsed ? '›' : '‹'}
        </button>
      </div>

      <nav className="flex-1 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-3 rounded-xl transition-all duration-200 text-sm font-medium overflow-hidden whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-agri-emerald/20 to-transparent text-agri-emerald border-l-2 border-agri-emerald shadow-[inset_0_1px_rgba(255,255,255,0.05)]'
                  : 'hover:bg-white/5 text-gray-400 hover:text-white'
              }`
            }
            title={isCollapsed ? t(item.labelKey) : undefined}
          >
            <span className="text-xl w-6 text-center shrink-0">{item.icon}</span>
            {!isCollapsed && <span className="animate-fade-in">{t(item.labelKey)}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-2">
        <button
          onClick={() => { logout(); navigate('/'); }}
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} w-full py-3 rounded-xl hover:bg-red-500/10 transition-colors text-sm font-medium text-red-400/80 hover:text-red-400 overflow-hidden whitespace-nowrap`}
          title={isCollapsed ? "Logout" : undefined}
        >
          <span className="text-xl w-6 text-center shrink-0">⏏</span>
          {!isCollapsed && <span className="animate-fade-in">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
