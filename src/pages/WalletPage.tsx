import { useEffect, useState } from 'react';
import { getWalletData, getTransactions, type WalletData, type Transaction } from '../api/wallet';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function WalletPage() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getWalletData().then(setWallet);
    getTransactions().then(setTransactions);
  }, []);

  const chartData = [
    { name: 'Earned', value: wallet?.earned ?? 0, color: '#10B981' },
    { name: 'Pending', value: wallet?.pending ?? 0, color: '#F59E0B' },
    { name: 'Redeemed', value: wallet?.redeemed ?? 0, color: '#06B6D4' },
  ];

  return (
    <div className="animate-fade-in-up space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Carbon Wallet</h1>
          <p className="text-sm text-gray-500 mt-1">Manage, trade, and track your carbon credit ledger.</p>
        </div>
        <button className="btn-primary">Connect Exchange</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Col: Balance & Chart */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 border-agri-emerald/20 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Estimated Value</p>
            <h2 className="text-4xl font-black text-white mb-6">{wallet?.totalValue ?? '...'}</h2>
            <div className="space-y-3 border-t border-white/5 pt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Available</span>
                <span className="font-bold text-agri-emerald">{wallet?.earned ?? 0} Credits</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Locked</span>
                <span className="font-bold text-yellow-500">{wallet?.pending ?? 0} Credits</span>
              </div>
            </div>
          </div>
          <div className="glass-panel p-6">
            <p className="text-sm font-bold text-white mb-4">Distribution</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ left: -20 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Col: Ledger */}
        <div className="lg:col-span-3 glass-panel overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h3 className="font-bold text-white text-lg">Transaction Ledger</h3>
            <div className="flex gap-2">
              <input type="text" placeholder="Search..." className="input-field py-1.5 min-w-[200px] text-sm" />
              <button className="btn-secondary py-1.5 text-sm">Filter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase tracking-widest text-gray-500">
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Description</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-400 font-mono">
                      {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-sm text-white font-medium">
                      <span className="mr-2">{tx.icon}</span>{tx.description}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                        tx.type === 'earned' ? 'bg-agri-emerald/20 text-agri-emerald border border-agri-emerald/30' :
                        tx.type === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                        'bg-white/5 text-gray-400 border border-white/10'
                      }`}>{tx.type}</span>
                    </td>
                    <td className={`px-6 py-4 text-sm font-bold text-right ${tx.credits > 0 ? 'text-agri-emerald' : 'text-white'}`}>
                      {tx.credits > 0 ? '+' : ''}{tx.credits}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {transactions.length === 0 && <div className="p-12 text-center text-gray-600">No transactions recorded.</div>}
        </div>
      </div>
    </div>
  );
}
