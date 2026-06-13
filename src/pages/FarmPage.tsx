import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFarmData, type Farm } from '../api/farms';

export default function FarmPage() {
  const navigate = useNavigate();
  const [farm, setFarm] = useState<Farm | null>(null);

  useEffect(() => { getFarmData().then(setFarm); }, []);

  if (!farm) return <div className="flex items-center justify-center min-h-screen text-3xl animate-pulse-soft">🌾</div>;

  const details = [
    { label: 'Location', value: farm.location, icon: '📍' },
    { label: 'Area', value: farm.area, icon: '📐' },
    { label: 'Active Crop', value: farm.crop, icon: '🌾' },
    { label: 'Soil Type', value: farm.soilType, icon: '🌍' },
    { label: 'Season', value: farm.season, icon: '🌤️' },
  ];

  return (
    <div className="page-enter pb-24">
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Farm Header */}
        <div className="glass-card bg-gradient-to-br from-leaf-50 via-white to-earth-50 p-6 text-center animate-bounce-in">
          <span className="text-6xl mb-3 inline-block">{farm.icon}</span>
          <h1 className="text-2xl font-black text-earth-800">{farm.name}</h1>
          <p className="text-sm text-earth-400">{farm.location}</p>
        </div>

        {/* Farm Details */}
        <div className="space-y-2">
          {details.map((d, i) => (
            <div key={d.label} className="glass-card p-4 flex items-center gap-4 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              <span className="text-2xl">{d.icon}</span>
              <div className="flex-1">
                <p className="text-xs font-bold text-earth-400 uppercase tracking-wider">{d.label}</p>
                <p className="text-base font-bold text-earth-800">{d.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => navigate('/impact')} className="btn-primary py-4 text-base">📈 View Impact</button>
          <button onClick={() => navigate('/verification')} className="btn-secondary py-4 text-base">📸 Verify Practice</button>
        </div>
      </div>
    </div>
  );
}
