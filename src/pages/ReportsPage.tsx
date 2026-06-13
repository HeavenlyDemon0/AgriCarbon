import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { getReports, shareReport, type Report } from '../api/reports';

export default function ReportsPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [shared, setShared] = useState<Record<string, string>>({});

  useEffect(() => { getReports().then(setReports); }, []);

  const handleShare = async (reportId: string, target: 'bank' | 'expert') => {
    await shareReport(reportId, target);
    setShared(prev => ({ ...prev, [reportId + target]: 'sent' }));
    setTimeout(() => setShared(prev => { const n = { ...prev }; delete n[reportId + target]; return n; }), 2000);
  };

  return (
    <div className="page-enter pb-24">
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-earth-500 font-semibold text-sm hover:text-leaf-600 transition-colors py-2">
          ← {t('common.back')}
        </button>

        <h1 className="text-2xl font-black text-earth-800">📊 Reports</h1>

        <div className="space-y-3">
          {reports.map((report, i) => (
            <div key={report.id} className="glass-card p-4 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{report.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-earth-800">{report.title}</h3>
                  <p className="text-xs text-earth-400">
                    {new Date(report.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {report.size}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleShare(report.id, 'bank')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                    shared[report.id + 'bank']
                      ? 'bg-leaf-500 text-white'
                      : 'bg-earth-50 text-earth-700 hover:bg-earth-100'
                  }`}
                >
                  {shared[report.id + 'bank'] ? '✅ Sent!' : '🏦 Share · Bank'}
                </button>
                <button
                  onClick={() => handleShare(report.id, 'expert')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                    shared[report.id + 'expert']
                      ? 'bg-leaf-500 text-white'
                      : 'bg-earth-50 text-earth-700 hover:bg-earth-100'
                  }`}
                >
                  {shared[report.id + 'expert'] ? '✅ Sent!' : '👨‍🔬 Share · Expert'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
