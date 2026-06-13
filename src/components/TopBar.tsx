import { useNavigate, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import type { Language } from '../i18n/translations';

export default function TopBar() {
  const { t, lang, setLang, languageNames } = useLang();
  const { userName, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (['/', '/signin', '/login'].includes(location.pathname)) return null;

  const languages: Language[] = ['en', 'te', 'ta'];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-leaf-100">
      <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
        {/* Profile & Greeting */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-leaf-400 to-leaf-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {userName[0]}
          </div>
          <div>
            <p className="text-sm font-bold text-earth-800">{t('dash.greeting')}, {userName}!</p>
            <p className="text-xs text-earth-400">🌾 Green Valley Farm</p>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="flex bg-leaf-50 rounded-full p-0.5">
            {languages.map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                  lang === l
                    ? 'bg-leaf-600 text-white shadow-sm'
                    : 'text-earth-500 hover:text-leaf-700'
                }`}
              >
                {languageNames[l]}
              </button>
            ))}
          </div>

          {/* Voice Button */}
          <button
            className="btn-icon bg-sky-50 text-sky-600 hover:bg-sky-100 active:scale-95"
            title="Voice Command"
          >
            🎙️
          </button>

          {/* Logout */}
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="btn-icon bg-danger-400/10 text-danger-500 hover:bg-danger-400/20 active:scale-95 text-sm"
            title="Logout"
          >
            🚪
          </button>
        </div>
      </div>
    </header>
  );
}
