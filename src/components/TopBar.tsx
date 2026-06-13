import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import type { Language } from '../i18n/translations';

export default function TopBar() {
  const { lang, setLang, languageNames } = useLang();
  const { user } = useAuth();
  const location = useLocation();

  if (['/', '/signin', '/signup'].includes(location.pathname)) return null;

  const languages: Language[] = ['en', 'te', 'ta'];

  return (
    <header className="sticky top-0 z-40 glass-header hidden md:flex h-20 w-full items-center justify-between px-8 text-sm">
      <div className="text-gray-400 font-medium flex items-center gap-2">
        <span className="text-agri-emerald font-bold">●</span> {location.pathname.replace('/', '') || 'Dashboard'}
      </div>

      <div className="flex items-center gap-6">
        {/* Language Selection */}
        <div className="flex gap-1 p-1 bg-black/40 rounded-lg border border-white/5">
          {languages.map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 rounded-md transition-all text-xs font-bold uppercase tracking-widest ${
                lang === l ? 'bg-zinc-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {languageNames[l]}
            </button>
          ))}
        </div>

        {/* User Badge linked to Profile */}
        <Link to="/profile" className="flex items-center gap-3 pl-6 border-l border-white/10 hover:opacity-80 transition-opacity">
          <div className="flex flex-col items-end">
            <span className="font-bold text-white text-sm">{user?.name ?? 'Sen. Developer'}</span>
            <span className="text-xs text-agri-emerald font-mono uppercase tracking-widest leading-none">Pro Plan</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-agri-emerald to-teal-800 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            {user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
        </Link>
      </div>
    </header>
  );
}
