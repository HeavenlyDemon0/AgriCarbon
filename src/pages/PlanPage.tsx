import { useEffect, useState } from 'react';
import { getWeeklyPlan, getSeasonalPlan, type Recommendation } from '../api/recommendations';
import { useNavigate } from 'react-router-dom';

export default function PlanPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'week' | 'season'>('week');
  const [weekly, setWeekly] = useState<Recommendation[]>([]);
  const [seasonal, setSeasonal] = useState<Recommendation[]>([]);

  useEffect(() => {
    getWeeklyPlan().then(setWeekly);
    getSeasonalPlan().then(setSeasonal);
  }, []);

  const items = tab === 'week' ? weekly : seasonal;

  return (
    <div className="animate-fade-in-up space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Strategic Action Plan</h1>
          <p className="text-sm text-gray-500 mt-1">AI-derived tasks to optimize carbon yield and operations.</p>
        </div>
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
          <button onClick={() => setTab('week')} className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${tab === 'week' ? 'bg-white/10 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}>Weekly</button>
          <button onClick={() => setTab('season')} className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${tab === 'season' ? 'bg-white/10 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}>Seasonal</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div key={item.id} className="glass-panel flex flex-col hover:-translate-y-1 transition-transform animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl">{item.benefitIcon}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border ${
                  item.priority === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                  item.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                  'bg-agri-emerald/10 text-agri-emerald border-agri-emerald/20'
                }`}>{item.priority}</span>
              </div>
              <h3 className="font-bold text-white text-lg leading-snug">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">{item.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="bg-white/5 border border-white/10 text-gray-400 rounded px-2.5 py-1 text-xs font-medium">Cost: {item.cost}</span>
                <span className="bg-agri-emerald/10 border border-agri-emerald/20 text-agri-emerald rounded px-2.5 py-1 text-xs font-bold">+ {item.benefit}</span>
              </div>
            </div>
            <div className="border-t border-white/5 p-4 bg-white/[0.02]">
              <button onClick={() => navigate('/plan/today')} className="btn-primary w-full shadow-none text-sm py-2.5">Execute →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
