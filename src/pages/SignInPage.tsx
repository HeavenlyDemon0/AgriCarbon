import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
  const { t } = useLang();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    try {
      await login(email, password);
      navigate('/home');
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #e0f2fe 50%, #fdf8f0 100%)' }}
    >
      <div className="w-full max-w-sm animate-bounce-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block text-5xl mb-3 animate-float">🌱</div>
          <h1 className="text-2xl font-black text-earth-800">{t('auth.welcome')}</h1>
          <p className="text-sm text-earth-400 mt-1">AgriCarbon</p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="glass-card p-8 shadow-xl">
          <h2 className="text-xl font-bold text-earth-800 mb-6 text-center">{t('auth.signIn')}</h2>

          {error && (
            <div className="bg-danger-400/10 text-danger-600 text-sm px-4 py-2 rounded-xl mb-4 font-medium text-center">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-earth-600 mb-1.5">{t('auth.email')}</label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="farmer@example.com"
                className="w-full px-4 py-3.5 rounded-xl border border-earth-200 bg-white/80 text-earth-800 text-base focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:border-transparent transition-all placeholder:text-earth-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-earth-600 mb-1.5">{t('auth.password')}</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-xl border border-earth-200 bg-white/80 text-earth-800 text-base focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:border-transparent transition-all placeholder:text-earth-300"
              />
            </div>
          </div>

          <div className="text-right mt-2">
            <a href="#" className="text-sm text-leaf-600 font-semibold hover:text-leaf-700 transition-colors">
              {t('auth.forgot')}
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-6 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-block animate-spin">⏳</span>
            ) : (
              <>{t('auth.signIn')} →</>
            )}
          </button>

          <p className="text-center text-sm text-earth-400 mt-4">
            {t('auth.noAccount')}{' '}
            <Link to="/signin" className="text-leaf-600 font-bold hover:text-leaf-700 transition-colors">
              {t('auth.signUp')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
