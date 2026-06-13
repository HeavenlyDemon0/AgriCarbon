import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { getImpactData, type ImpactData } from '../api/farms';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

export default function ImpactPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [impact, setImpact] = useState<ImpactData[]>([]);

  useEffect(() => { getImpactData().then(setImpact); }, []);

  const chartColors = ['#38bdf8', '#facc15', '#12cf5a', '#3ae87c'];

  return (
    <div className="page-enter pb-24">
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-earth-500 font-semibold text-sm hover:text-leaf-600 transition-colors py-2">
          ← {t('common.back')}
        </button>

        <h1 className="text-2xl font-black text-earth-800">📈 {t('dash.impact')}</h1>

        {/* Before vs After Cards */}
        <div className="space-y-3">
          {impact.map((item, i) => (
            <div key={item.metric} className="glass-card p-4 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-earth-800">{item.metric}</h3>
                  <span className="text-xs bg-leaf-50 text-leaf-600 font-bold px-2 py-0.5 rounded-full">{item.improvement}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 bg-danger-400/5 border border-danger-400/20 rounded-xl p-3 text-center">
                  <p className="text-xs font-bold text-danger-400 mb-0.5">{t('common.before')}</p>
                  <p className="text-2xl font-black text-earth-700">{item.before}</p>
                  <p className="text-xs text-earth-400">{item.unit}</p>
                </div>
                <div className="flex items-center text-2xl text-leaf-500">→</div>
                <div className="flex-1 bg-leaf-50 border border-leaf-200 rounded-xl p-3 text-center">
                  <p className="text-xs font-bold text-leaf-500 mb-0.5">{t('common.after')}</p>
                  <p className="text-2xl font-black text-leaf-700">{item.after}</p>
                  <p className="text-xs text-earth-400">{item.unit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Chart */}
        <div className="glass-card p-4">
          <p className="text-sm font-bold text-earth-600 mb-3">📊 Comparison Chart</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={impact.map(d => ({ name: d.metric.split(' ')[0], Before: d.before, After: d.after }))}
            >
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8f6430' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8f6430' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Before" fill="#f87171" radius={[4, 4, 0, 0]} />
              <Bar dataKey="After" radius={[4, 4, 0, 0]}>
                {impact.map((_, i) => (
                  <Cell key={i} fill={chartColors[i % chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
