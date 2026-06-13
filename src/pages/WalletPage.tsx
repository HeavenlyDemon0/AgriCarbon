import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { getWalletData, getTransactions, type WalletData, type Transaction } from '../api/wallet';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function WalletPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getWalletData().then(setWallet);
    getTransactions().then(setTransactions);
  }, []);

  const chartData = [
    { name: t('wallet.earned'), value: wallet?.earned ?? 0, color: '#12cf5a' },
    { name: t('wallet.pending'), value: wallet?.pending ?? 0, color: '#facc15' },
    { name: t('wallet.redeemed'), value: wallet?.redeemed ?? 0, color: '#38bdf8' },
  ];

  return (
    <div className="page-enter pb-24">
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-earth-500 font-semibold text-sm hover:text-leaf-600 transition-colors py-2">
          ← {t('common.back')}
        </button>

        <h1 className="text-2xl font-black text-earth-800">💰 {t('dash.wallet')}</h1>

        {/* Credit Summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: t('wallet.earned'), value: wallet?.earned ?? 0, icon: '✅', bg: 'bg-leaf-50 border-leaf-200', text: 'text-leaf-600' },
            { label: t('wallet.pending'), value: wallet?.pending ?? 0, icon: '⏳', bg: 'bg-sun-300/10 border-sun-300/30', text: 'text-sun-500' },
            { label: t('wallet.redeemed'), value: wallet?.redeemed ?? 0, icon: '🎁', bg: 'bg-sky-50 border-sky-200', text: 'text-sky-600' },
          ].map(item => (
            <div key={item.label} className={`glass-card ${item.bg} border p-4 text-center animate-bounce-in`}>
              <span className="text-2xl">{item.icon}</span>
              <p className={`text-3xl font-black ${item.text} mt-1`}>{item.value}</p>
              <p className="text-xs font-semibold text-earth-500 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Total Value */}
        <div className="glass-card bg-gradient-to-r from-leaf-50 to-sun-300/10 p-4 text-center border-leaf-200">
          <p className="text-sm text-earth-500">Total Value</p>
          <p className="text-3xl font-black text-earth-800">{wallet?.totalValue ?? '...'}</p>
        </div>

        {/* Chart */}
        <div className="glass-card p-4">
          <p className="text-sm font-bold text-earth-600 mb-3">📊 Credit Overview</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8f6430' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8f6430' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction Table */}
        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-earth-100">
            <p className="text-sm font-bold text-earth-600">📜 Transaction History</p>
          </div>
          <div className="divide-y divide-earth-50">
            {transactions.map((tx, i) => (
              <div key={tx.id} className="flex items-center gap-3 px-4 py-3 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                <span className="text-2xl">{tx.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-earth-800 truncate">{tx.description}</p>
                  <p className="text-xs text-earth-400">
                    {new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <span className={`text-sm font-bold ${tx.credits > 0 ? 'text-leaf-600' : 'text-danger-500'}`}>
                  {tx.credits > 0 ? '+' : ''}{tx.credits}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
