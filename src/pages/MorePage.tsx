import { useState } from 'react';

export default function MorePage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    '2fa': true,
    'alerts': true,
    'dark': true,
    'logs': false
  });

  const handleToggle = (key: string) => setToggles(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="animate-fade-in-up space-y-8 pb-20 max-w-5xl">
      
      <div>
        <h1 className="text-3xl font-bold text-white">System Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Configure global platform behavior and security logic.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Security Box */}
        <div className="glass-panel overflow-hidden border border-white/10">
           <div className="bg-white/5 p-5 border-b border-white/5 flex items-center gap-3">
              <span className="text-xl">🔒</span>
              <h3 className="font-bold text-white text-sm">Security & Access</h3>
           </div>
           <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-white mb-1">Two-Factor Auth (2FA)</p>
                  <p className="text-xs text-gray-500">Require an authenticator app to login.</p>
                </div>
                <button 
                  onClick={() => handleToggle('2fa')}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${toggles['2fa'] ? 'bg-agri-emerald' : 'bg-gray-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute transition-transform ${toggles['2fa'] ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-white mb-1">Save Audit Logs</p>
                  <p className="text-xs text-gray-500">Record every click and action.</p>
                </div>
                <button 
                  onClick={() => handleToggle('logs')}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${toggles['logs'] ? 'bg-agri-emerald' : 'bg-gray-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute transition-transform ${toggles['logs'] ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>
           </div>
        </div>

        {/* Global Box */}
        <div className="glass-panel overflow-hidden border border-white/10">
           <div className="bg-white/5 p-5 border-b border-white/5 flex items-center gap-3">
              <span className="text-xl">⚙</span>
              <h3 className="font-bold text-white text-sm">Global Behavior</h3>
           </div>
           <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-white mb-1">Push Notifications</p>
                  <p className="text-xs text-gray-500">Critical weather alerts sent immediately.</p>
                </div>
                <button 
                  onClick={() => handleToggle('alerts')}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${toggles['alerts'] ? 'bg-agri-emerald' : 'bg-gray-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute transition-transform ${toggles['alerts'] ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>
              <div className="flex justify-between items-center opacity-50 cursor-not-allowed">
                <div>
                  <p className="text-sm font-bold text-white mb-1">Dark Mode</p>
                  <p className="text-xs text-gray-500">Locked to Dark Mode securely in V3.</p>
                </div>
                <button disabled className={`w-12 h-6 rounded-full relative flex items-center bg-agri-emerald`}>
                  <div className={`w-4 h-4 rounded-full bg-white absolute translate-x-7`}></div>
                </button>
              </div>
           </div>
        </div>

      </div>

      <div className="mt-8 flex justify-end">
         <button className="btn-primary">Deploy Settings Updates</button>
      </div>

    </div>
  );
}
