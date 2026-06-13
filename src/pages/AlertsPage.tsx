import { useEffect, useState } from 'react';
import { getAlerts, type Alert } from '../api/weather';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  useEffect(() => { getAlerts().then(setAlerts); }, []);

  const severityMap: Record<string, { bg: string; text: string; border: string }> = {
    critical: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    high: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
    medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
    low: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  };

  return (
    <div className="animate-fade-in-up space-y-6 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-white">Risk & Environmental Alerts</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time hazard notifications and mitigation advisories.</p>
      </div>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase tracking-widest text-gray-500">
              <th className="px-6 py-4 font-semibold w-16">Env</th>
              <th className="px-6 py-4 font-semibold">Severity</th>
              <th className="px-6 py-4 font-semibold w-1/2">Advisory</th>
              <th className="px-6 py-4 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {alerts.map((alert) => {
              const map = severityMap[alert.severity] || severityMap.low;
              return (
                <tr key={alert.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-5 text-3xl">{alert.icon}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded border mb-2 ${map.bg} ${map.text} ${map.border}`}>{alert.severity}</span>
                    <p className="text-[10px] text-gray-600 font-mono">
                      {new Date(alert.timestamp).toLocaleDateString()} {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-white mb-1">{alert.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{alert.description}</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="btn-secondary py-1 text-xs">Acknowledge</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
