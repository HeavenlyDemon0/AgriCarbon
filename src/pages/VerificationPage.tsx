import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { practiceTypes, submitVerification } from '../api/verification';

export default function VerificationPage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [practiceType, setPracticeType] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); const r = new FileReader(); r.onload = () => setPreview(r.result as string); r.readAsDataURL(f); }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith('image/')) { setFile(f); const r = new FileReader(); r.onload = () => setPreview(r.result as string); r.readAsDataURL(f); }
  };

  const handleSubmit = async () => {
    if (!practiceType || !file) return;
    setLoading(true);
    await submitVerification({ image: file, voiceConfirmed: true, practiceType });
    setLoading(false);
    setSuccess(true);
    setTimeout(() => navigate('/home'), 3000);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in-up">
        <div className="w-20 h-20 bg-agri-emerald/20 text-agri-emerald rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)] border border-agri-emerald/30">✓</div>
        <h2 className="text-3xl font-bold text-white mb-2">Verification Submitted</h2>
        <p className="text-gray-500">Your evidence is under AI review. Credits will be deposited soon.</p>
        <p className="text-xs text-gray-600 mt-8 font-mono">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up space-y-6 pb-20 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Submit Practice Evidence</h1>
        <p className="text-sm text-gray-500 mt-1">Upload geospatial or photographic evidence for AI verification.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Zone */}
        <div className="space-y-4">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">1. Evidence Media</label>
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              preview ? 'border-agri-emerald/50 bg-agri-emerald/5' : 'border-white/10 hover:border-agri-emerald/30 hover:bg-white/[0.02]'
            }`}
          >
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Evidence" className="w-full max-h-64 object-cover rounded-xl border border-white/10" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                  <span className="text-white font-bold bg-black/60 px-4 py-2 rounded-lg border border-white/20">Replace</span>
                </div>
              </div>
            ) : (
              <div className="py-12">
                <span className="text-4xl text-gray-600 mb-4 inline-block">↑</span>
                <p className="font-bold text-white text-lg">Click or drag and drop</p>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF (max 10MB)</p>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">2. Practice Category</label>
            <select className="input-field py-3 font-medium cursor-pointer" value={practiceType} onChange={e => setPracticeType(e.target.value)}>
              <option value="" disabled>Select applied practice...</option>
              {practiceTypes.map(pt => <option key={pt.value} value={pt.value}>{pt.label}</option>)}
            </select>
          </div>

          <div className="glass-panel p-4 border border-cyan-500/20 bg-cyan-500/5">
            <div className="flex gap-3">
              <span className="text-xl">ℹ️</span>
              <div>
                <p className="text-sm font-bold text-cyan-400">AI Metadata Verification</p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">AgriCarbon's AI will parse EXIF data, GPS coordinates, and apply machine vision to validate practice integrity.</p>
              </div>
            </div>
          </div>

          <button onClick={handleSubmit} disabled={!practiceType || !file || loading} className="btn-primary w-full py-4 text-base disabled:opacity-30 disabled:cursor-not-allowed">
            {loading ? 'Processing...' : 'Submit Evidence →'}
          </button>
        </div>
      </div>
    </div>
  );
}
