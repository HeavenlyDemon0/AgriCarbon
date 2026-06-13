import { useEffect, useState } from 'react';
import { getImpactData, type ImpactData } from '../api/farms';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

export default function ImpactPage() {
  const [impact, setImpact] = useState<ImpactData[]>([]);
  useEffect(() => { getImpactData().then(setImpact); }, []);

  const chartColors = ['#10B981', '#06B6D4', '#F59E0B', '#6366F1'];

  return (
    <div className="animate-fade-in-up space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Advanced Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Operational efficiency vs baseline metrics.</p>
        </div>
        <select className="input-field w-auto py-2 pr-10 font-medium text-sm">
          <option>YTD 2026</option><option>FY 2025</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {impact.map(item => (
          <div key={item.metric} className="glass-panel p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] rounded-bl-full -mr-4 -mt-4 group-hover:scale-110 transition-transform"></div>
            <span className="text-3xl relative z-10 mb-3 inline-block">{item.icon}</span>
            <h3 className="font-bold text-gray-500 text-[10px] uppercase tracking-widest relative z-10">{item.metric}</h3>
            <div className="flex items-end gap-2 mt-2 relative z-10">
              <span className="text-2xl font-black text-white">{item.after}</span>
              <span className="text-sm text-gray-500 mb-1">{item.unit}</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-agri-emerald/10 text-agri-emerald font-bold text-xs rounded border border-agri-emerald/20 relative z-10">
              ↗ {item.improvement}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6">
        <h3 className="font-bold text-white text-lg mb-6">Baseline vs Current</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={impact.map(d => ({ name: d.metric.split(' ')[0], Baseline: d.before, Current: d.after }))} margin={{ left: -20 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} iconType="circle" />
              <Bar dataKey="Baseline" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Current" radius={[4, 4, 0, 0]}>
                {impact.map((_, i) => <Cell key={i} fill={chartColors[i % chartColors.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
