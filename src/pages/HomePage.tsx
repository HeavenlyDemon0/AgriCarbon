import { useEffect, useState } from 'react';
import { getWalletData, type WalletData } from '../api/wallet';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function HomePage() {
  const [wallet, setWallet] = useState<WalletData | null>(null);

  useEffect(() => {
    getWalletData().then(setWallet);
  }, []);

  const chartData = [
    { name: 'Jan', val: 32 }, { name: 'Feb', val: 40 }, { name: 'Mar', val: 28 },
    { name: 'Apr', val: 55 }, { name: 'May', val: 45 }, { name: 'Jun', val: 68 },
    { name: 'Jul', val: 89 }, { name: 'Aug', val: 104 }
  ];

  return (
    <div className="animate-fade-in-up space-y-6 pb-20">
      
      {/* Top Banner / Pulse */}
      <div className="flex flex-col lg:flex-row gap-6">
         <div className="flex-1 glass-panel p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-agri-emerald/20 blur-[100px] pointer-events-none"></div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Live Telemetry</p>
              <h1 className="text-3xl font-bold text-white">System Nominal</h1>
            </div>
            <div className="mt-8 flex gap-8">
               <div>
                  <p className="text-gray-400 text-sm">Satellites Connected</p>
                  <p className="text-2xl font-black text-white">12</p>
               </div>
               <div>
                  <p className="text-gray-400 text-sm">Data Latency</p>
                  <p className="text-2xl font-black text-white">24ms</p>
               </div>
            </div>
         </div>

         {/* Mini Weather Radar Mock */}
         <div className="w-full lg:w-96 glass-panel p-0 relative overflow-hidden h-48 lg:h-auto border-white/5">
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity grayscale"></div>
            {/* Radar scan line */}
            <div className="absolute inset-0 border-t-2 border-agri-emerald/50 animate-[spin_4s_linear_infinite] origin-bottom shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
            <div className="absolute bottom-4 left-4 z-10 p-3 bg-black/60 backdrop-blur rounded-lg border border-white/10">
               <p className="text-xs font-bold text-white uppercase tracking-widest">Precipitation Radar</p>
               <p className="text-sm text-agri-emerald font-mono">0.02% Chance (Clear)</p>
            </div>
         </div>
      </div>

      {/* Main Grid Floor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Big Chart */}
        <div className="lg:col-span-2 glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="font-bold text-white text-lg">Carbon Sequestration Curve</h3>
               <p className="text-xs text-gray-400">Total volume accumulated (tons)</p>
            </div>
            <div className="p-1 bg-white/5 rounded flex gap-1 border border-white/10">
              <button className="px-3 py-1 text-xs font-bold bg-white/10 text-white rounded">1Y</button>
              <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-white rounded">5Y</button>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                <Area type="monotone" dataKey="val" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Wallets & Activity */}
        <div className="space-y-6">
           <div className="glass-panel p-6 border-agri-emerald/20 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Exchange Wallet</p>
             <h2 className="text-4xl font-black text-white">{wallet?.totalValue ?? '...'}</h2>
             <div className="mt-4 flex gap-2">
                <div className="flex-1 bg-white/5 border border-white/10 rounded p-3">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest">Earned</p>
                   <p className="text-sm font-bold text-agri-emerald">{wallet?.earned}</p>
                </div>
                <div className="flex-1 bg-white/5 border border-white/10 rounded p-3">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest">Pending</p>
                   <p className="text-sm font-bold text-yellow-500">{wallet?.pending}</p>
                </div>
             </div>
           </div>

           <div className="glass-panel p-0 overflow-hidden border border-white/10">
              <div className="p-4 border-b border-white/5 bg-white/5">
                <h3 className="font-bold text-white text-sm">Activity Feed</h3>
              </div>
              <div className="divide-y divide-white/5">
                 {[
                   { t: 'Analysis Complete', d: 'AI finished field scans.', s: '2m ago' },
                   { t: 'Credits Issued', d: '+12 added to wallet.', s: '1h ago', glow: true },
                   { t: 'Hardware Sync', d: 'Tractor telemetry active.', s: '4h ago' }
                 ].map((act, i) => (
                   <div key={i} className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer">
                      <div>
                        <p className={`text-sm font-bold ${act.glow ? 'text-agri-emerald': 'text-white'}`}>{act.t}</p>
                        <p className="text-xs text-gray-500">{act.d}</p>
                      </div>
                      <span className="text-[10px] font-mono text-gray-600">{act.s}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
