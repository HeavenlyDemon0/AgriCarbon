import { Link } from 'react-router-dom';

export default function LandingPage() {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-agri-bg text-white font-sans overflow-x-hidden selection:bg-agri-emerald selection:text-white">
      {/* Background Animated Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-agri-emerald/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Navbar */}
      <nav className="relative z-50 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-black text-agri-emerald" style={{textShadow: '0 0 20px rgba(16,185,129,0.5)'}}>A.</span>
          <span className="text-xl font-bold tracking-tight">AgriCarbon</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/signin" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">Sign In</Link>
          <Link to="/signup" className="text-sm font-bold bg-white text-black px-6 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Start Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center border border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
          {/* Internal Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-agri-emerald to-transparent opacity-50"></div>
          
          <div className="inline-block px-4 py-1.5 rounded-full border border-agri-emerald/20 bg-agri-emerald/5 text-agri-emerald text-xs font-bold mb-8 uppercase tracking-widest animate-fade-in-up">
            AI-Driven Precision Agriculture
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-8 animate-fade-in-up" style={{animationDelay: '100ms'}}>
            Turn soil data into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-emerald to-cyan-400">Yield & Capital.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '200ms'}}>
            The only platform bridging the gap between field sensors, machine learning agronomy, and global carbon exchanges.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{animationDelay: '300ms'}}>
            <Link to="/signup" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)]">
              Initialize Dashboard
            </Link>
            <button onClick={scrollToFeatures} className="text-lg px-8 py-4 font-semibold text-gray-300 hover:text-white transition-all w-full sm:w-auto bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 flex items-center justify-center gap-2">
              Explore Platform <span>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── BENTO GRID FEATURES ── */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Enterprise Grade Capabilities</h2>
            <p className="text-gray-400">Everything needed to monitor, execute, and monetize.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Box 1 (Large) */}
            <div className="md:col-span-2 glass-panel p-8 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-agri-emerald/5 to-transparent z-0 transition-opacity opacity-0 group-hover:opacity-100"></div>
               <div className="relative z-10">
                 <div className="w-12 h-12 bg-agri-emerald/20 border border-agri-emerald/30 rounded-lg flex items-center justify-center text-agri-emerald mb-6 text-xl">📡</div>
                 <h3 className="text-2xl font-bold mb-2">Live Satellite Sync</h3>
                 <p className="text-gray-400 max-w-sm">Direct NDVI and hardware sensor integrations piping real-time data seamlessly into your operational hub.</p>
               </div>
               {/* Decorative Abstract Map lines */}
               <div className="absolute right-0 bottom-0 w-64 h-64 border-t border-l border-white/5 rounded-tl-[100%] opacity-20"></div>
               <div className="absolute right-0 bottom-0 w-48 h-48 border-t border-l border-white/10 rounded-tl-[100%] opacity-30"></div>
            </div>

            {/* Box 2 (Tall) */}
            <div className="md:row-span-2 glass-panel p-8 relative overflow-hidden group flex flex-col items-center justify-center text-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wMyIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMEwwIDYwIi8+PC9nPjwvc3ZnPg==')] opacity-50 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-6">📈</div>
                <h3 className="text-2xl font-bold mb-2">Carbon Ledger</h3>
                <p className="text-gray-400">Blockchain-verified ledger tracking absolute compliance for exchange trading.</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="glass-panel p-8 relative overflow-hidden group">
               <div className="relative z-10">
                 <h3 className="text-xl font-bold mb-2 text-agri-emerald">Hardware Agnostic</h3>
                 <p className="text-gray-400 text-sm">Connects to John Deere, Trimble, and ClimateFieldView simultaneously.</p>
               </div>
            </div>

            {/* Box 4 */}
            <div className="glass-panel p-8 relative overflow-hidden group bg-gradient-to-t from-black/50 to-transparent">
               <div className="relative z-10">
                 <h3 className="text-xl font-bold mb-2">AI Execution Planner</h3>
                 <p className="text-gray-400 text-sm">LLM models built on highly trained agricultural yield datasets to optimize decisions daily.</p>
               </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5 relative z-10 bg-black/20">
        &copy; 2026 AgriCarbon Inc. All Rights Reserved. Not a real product. V3 Showcase.
      </footer>
    </div>
  );
}
