import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: 'AgriCarbon Enterprise Ltd.',
    phone: '+1 (555) 019-3921',
    role: 'Senior Agronomist'
  });

  const handleSave = () => {
    // Mock save
    setEditing(false);
  };

  return (
    <div className="animate-fade-in-up space-y-6 pb-20 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Identity & Access Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your operator credentials and system roles.</p>
      </div>

      <div className="glass-panel overflow-hidden border border-white/10">
        
        {/* Banner Area */}
        <div className="h-40 bg-gradient-to-r from-agri-surface to-black border-b border-white/10 relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          
          {/* Avatar overlap */}
          <div className="absolute -bottom-12 left-8 md:left-12 flex items-end gap-6">
            <div className="w-24 h-24 rounded-full bg-agri-emerald border-4 border-agri-panel flex items-center justify-center text-4xl text-white font-black shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              {formData.name.charAt(0).toUpperCase()}
            </div>
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-white drop-shadow-md">{formData.name}</h2>
              <p className="text-agri-emerald text-sm font-mono tracking-widest uppercase">{formData.role}</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12 pt-20">
          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <h3 className="text-lg font-bold text-white">Personal Information</h3>
            <button 
              onClick={() => editing ? handleSave() : setEditing(true)}
              className="btn-secondary text-sm py-1.5"
            >
              {editing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Operator Name</label>
              {editing ? (
                <input className="input-field py-2" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} />
              ) : (
                <p className="text-white font-medium">{formData.name}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Identifier Email</label>
              {editing ? (
                <input className="input-field py-2" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} />
              ) : (
                <p className="text-white font-medium">{formData.email}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Enterprise Assign</label>
              {editing ? (
                <input className="input-field py-2" value={formData.company} onChange={e=>setFormData({...formData, company: e.target.value})} />
              ) : (
                <p className="text-white font-medium">{formData.company}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Secure Comms (Phone)</label>
              {editing ? (
                <input className="input-field py-2" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} />
              ) : (
                <p className="text-white font-medium">{formData.phone}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
