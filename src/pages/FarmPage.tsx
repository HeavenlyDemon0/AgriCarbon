import { useEffect, useState } from 'react';
import { getFarmData, type Farm } from '../api/farms';

export default function FarmPage() {
  const [farm, setFarm] = useState<Farm | null>(null);
  useEffect(() => { getFarmData().then(setFarm); }, []);

  if (!farm) return null;

  return (
    <div className="animate-fade-in-up space-y-6 pb-20">
      <div className="glass-panel overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-agri-surface to-black relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1592982537447-6f23901b0f69?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity grayscale"></div>
          <div className="absolute bottom-6 left-8 flex items-center gap-4">
            <div className="w-20 h-20 bg-agri-surface border border-white/10 rounded-xl shadow-lg flex items-center justify-center text-4xl">{farm.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-white">{farm.name}</h1>
              <p className="text-gray-400 flex items-center gap-2 mt-1">📍 {farm.location}</p>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Area</p>
            <p className="text-xl font-bold text-white">{farm.area}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Active Crop</p>
            <p className="text-xl font-bold text-white">{farm.crop}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Biome / Soil</p>
            <p className="text-xl font-bold text-white">{farm.soilType}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Current Cycle</p>
            <p className="text-xl font-bold text-white">{farm.season}</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white pt-4">Hardware Integrations</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Soil Sensor Array', 'Drone Aerial Setup', 'Geo-Fencing AP'].map(s => (
          <div key={s} className="glass-panel p-6 flex flex-col items-center text-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-2xl mb-4 border border-dashed border-white/10 text-gray-600">+</div>
            <p className="font-bold text-white">{s}</p>
            <p className="text-sm text-gray-500 mt-1">Not connected</p>
          </div>
        ))}
      </div>
    </div>
  );
}
