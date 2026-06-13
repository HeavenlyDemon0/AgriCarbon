import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUpPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError('All fields required'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    
    setLoading(true);
    const ok = await signup(name, email, password);
    setLoading(false);
    if (ok) {
      navigate('/home');
    } else {
      setError('Initialization failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-agri-bg font-sans relative overflow-hidden">
      {/* Deep Space Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1592982537447-6f23901b0f69?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-screen scale-110 blur-sm pointer-events-none"></div>
      <div className="absolute w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md glass-panel p-10 z-10 text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 animate-fade-in-up">
        
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-4xl text-cyan-400 font-black mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">A.</Link>
          <h2 className="text-2xl font-bold tracking-tight">Create Instance</h2>
          <p className="text-gray-400 text-sm mt-2">Initialize your precision farming profile.</p>
        </div>

        {error && <div className="p-3 bg-red-900/30 border border-red-500/30 text-red-400 rounded-lg text-sm mb-6 font-semibold text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Entity Name</label>
            <input type="text" value={name} onChange={e=>setName(e.target.value)} className="input-field py-3 text-sm bg-white/5 border-white/10 focus:bg-cyan-500/10 focus:border-cyan-400" placeholder="Operator Name" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Hash</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="input-field py-3 text-sm bg-white/5 border-white/10 focus:bg-cyan-500/10 focus:border-cyan-400" placeholder="operator@domain.com" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Security Key</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="input-field py-3 text-sm bg-white/5 border-white/10 focus:bg-cyan-500/10 focus:border-cyan-400" placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading} className="w-full py-3.5 mt-4 text-sm tracking-wide font-bold bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
            {loading ? 'Executing...' : 'Register Profile →'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-8">
          Existing instance found? <Link to="/signin" className="text-white hover:text-cyan-400 font-bold transition-colors">Access Console</Link>
        </p>
      </div>
    </div>
  );
}
