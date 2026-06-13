import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('All fields required'); return; }
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      navigate('/home');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-agri-bg font-sans relative overflow-hidden">
      {/* Deep Space Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-screen scale-110 blur-sm pointer-events-none"></div>
      <div className="absolute w-[600px] h-[600px] bg-agri-emerald/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md glass-panel p-10 z-10 text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 animate-fade-in-up">
        
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-4xl text-agri-emerald font-black mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">A.</Link>
          <h2 className="text-2xl font-bold tracking-tight">Access Control</h2>
          <p className="text-gray-400 text-sm mt-2">Initialize your agricultural dashboard.</p>
        </div>

        {error && <div className="p-3 bg-red-900/30 border border-red-500/30 text-red-400 rounded-lg text-sm mb-6 font-semibold text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Hash</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="input-field py-3 text-sm bg-white/5 border-white/10 focus:bg-agri-emerald/10" placeholder="enter identity email" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Security Key</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="input-field py-3 text-sm bg-white/5 border-white/10 focus:bg-agri-emerald/10" placeholder="••••••••" />
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
              <input type="checkbox" className="rounded bg-black/20 border-white/20 text-agri-emerald focus:ring-agri-emerald" />
              Keep session active
            </label>
            <a href="#" className="text-xs text-agri-emerald hover:text-white transition-colors">Reset Key</a>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 mt-4 text-sm tracking-wide">
            {loading ? 'Authenticating...' : 'Sign In →'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-8">
          No profile found? <Link to="/signup" className="text-white hover:text-agri-emerald font-bold transition-colors">Initialize a new instance</Link>
        </p>
      </div>
    </div>
  );
}
