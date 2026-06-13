import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { getAlerts, type Alert } from '../api/weather';

const severityColors: Record<string, string> = {
  critical: 'bg-danger-500/10 border-danger-400 text-danger-600',
  high: 'bg-danger-400/10 border-danger-400/50 text-danger-500',
  medium: 'bg-sun-300/20 border-sun-400/40 text-earth-700',
  low: 'bg-sky-50 border-sky-200 text-sky-700',
};

export default function AlertsPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { getAlerts().then(setAlerts); }, []);

  return (
    <div className="page-enter pb-24">
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-earth-500 font-semibold text-sm hover:text-leaf-600 transition-colors py-2">
          ← {t('common.back')}
        </button>

        <h1 className="text-2xl font-black text-earth-800">⚠️ {t('dash.weather')}</h1>

        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <div
              key={alert.id}
              className={`glass-card border-l-4 ${severityColors[alert.severity]} p-4 animate-slide-up cursor-pointer active:scale-[0.98] transition-transform`}
              style={{ animationDelay: `${i * 80}ms` }}
              onClick={() => setExpanded(expanded === alert.id ? null : alert.id)}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{alert.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[0.6rem] font-bold uppercase px-2 py-0.5 rounded-full ${severityColors[alert.severity]}`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs text-earth-400">
                      {new Date(alert.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <h3 className="font-bold text-earth-800">{alert.title}</h3>
                  {expanded === alert.id && (
                    <p className="text-sm text-earth-600 leading-relaxed mt-2 animate-fade-in">{alert.description}</p>
                  )}
                </div>
                <span className={`text-earth-300 transition-transform duration-200 ${expanded === alert.id ? 'rotate-90' : ''}`}>›</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
