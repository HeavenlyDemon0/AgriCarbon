import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodayRecommendation, type Recommendation } from '../api/recommendations';

export default function TodayPlanPage() {
  const navigate = useNavigate();
  const [rec, setRec] = useState<Recommendation | null>(null);

  useEffect(() => { getTodayRecommendation().then(setRec); }, []);

  if (!rec) return <div className="h-64 flex items-center justify-center text-gray-500">Loading execution environment...</div>;

  return (
    <div className="animate-fade-in-up pb-20 max-w-5xl mx-auto">
      <button onClick={() => navigate(-1)} className="text-sm font-semibold text-gray-500 hover:text-white transition-colors mb-6 flex items-center gap-2">← Back to Pipeline</button>

      <div className="glass-panel overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-agri-surface to-black p-8 md:p-12 relative border-b border-white/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-agri-emerald rounded-full opacity-5 blur-[100px]"></div>
          <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">Task Execution</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">{rec.title}</h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">{rec.description}</p>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5">
          <div className="p-8 border-b md:border-b-0 md:border-r border-white/5">
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block mb-2">OpEx / Capital</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{rec.costIcon}</span>
              <span className="text-2xl font-bold text-white">{rec.cost}</span>
            </div>
          </div>
          <div className="p-8 border-b md:border-b-0 md:border-r border-white/5 bg-agri-emerald/5">
            <span className="text-agri-emerald text-[10px] font-bold uppercase tracking-widest block mb-2">Yield Target</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{rec.benefitIcon}</span>
              <span className="text-2xl font-bold text-agri-emerald">{rec.benefit}</span>
            </div>
          </div>
          <div className="p-8">
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block mb-2">Risk Assessment</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{rec.riskIcon}</span>
              <span className="text-2xl font-bold text-white">{rec.risk}</span>
            </div>
          </div>
        </div>

        {/* Rationale */}
        <div className="p-8 md:p-12 bg-white/[0.01]">
          <h3 className="font-bold text-white text-xl mb-4">Strategic Rationale</h3>
          <p className="text-gray-400 leading-relaxed max-w-4xl text-lg">{rec.rationale}</p>
          <div className="mt-10 flex gap-4">
            <button onClick={() => navigate('/verification')} className="btn-primary text-base py-3.5 px-8">Complete & Verify →</button>
            <button onClick={() => navigate('/plan')} className="btn-secondary text-base py-3.5 px-8">Pause</button>
          </div>
        </div>
      </div>
    </div>
  );
}
