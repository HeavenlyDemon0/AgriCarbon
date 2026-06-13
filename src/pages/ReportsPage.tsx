import { useEffect, useState } from 'react';
import { getReports, shareReport, type Report } from '../api/reports';

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [sharing, setSharing] = useState<Record<string, string>>({});

  useEffect(() => { getReports().then(setReports); }, []);

  const handleShare = async (reportId: string, target: 'bank' | 'expert') => {
    setSharing(prev => ({ ...prev, [reportId + target]: 'loading' }));
    await shareReport(reportId, target);
    setSharing(prev => ({ ...prev, [reportId + target]: 'sent' }));
    setTimeout(() => setSharing(prev => { const n = { ...prev }; delete n[reportId + target]; return n; }), 2500);
  };

  return (
    <div className="animate-fade-in-up space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Compliance & Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Export verifiable ledgers and soil health PDFs.</p>
        </div>
        <button className="btn-primary">Generate New Report</button>
      </div>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase tracking-widest text-gray-500">
              <th className="px-6 py-4 font-semibold">Document</th>
              <th className="px-6 py-4 font-semibold">Generated</th>
              <th className="px-6 py-4 font-semibold">Size</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-white/[0.03] transition-colors group">
                <td className="px-6 py-5 text-sm text-white font-medium flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xl">{report.icon}</div>
                  {report.title}
                </td>
                <td className="px-6 py-5 text-sm text-gray-500 font-mono">
                  {new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-6 py-5 text-sm text-gray-500">{report.size}</td>
                <td className="px-6 py-5 text-sm text-right space-x-2">
                  <button
                    onClick={() => handleShare(report.id, 'bank')}
                    disabled={!!sharing[report.id + 'bank']}
                    className={`btn-secondary py-1.5 px-3 text-xs ${sharing[report.id + 'bank'] === 'sent' ? 'border-agri-emerald/30 text-agri-emerald bg-agri-emerald/10' : ''}`}
                  >
                    {sharing[report.id + 'bank'] === 'loading' ? 'Sending...' : sharing[report.id + 'bank'] === 'sent' ? '✓ Sent' : 'Send to Bank'}
                  </button>
                  <button className="btn-secondary py-1.5 px-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity">⬇ Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
