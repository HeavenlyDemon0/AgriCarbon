import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { practiceTypes, submitVerification } from '../api/verification';
import ConfettiEffect from '../components/ConfettiEffect';

export default function VerificationPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [voiceConfirmed, setVoiceConfirmed] = useState(false);
  const [practiceType, setPracticeType] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(f);
    }
  };

  const handleSubmit = async () => {
    if (!practiceType) return;
    setLoading(true);
    await submitVerification({ image: file, voiceConfirmed, practiceType });
    setLoading(false);
    setSuccess(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 100);
    setTimeout(() => navigate('/home'), 2500);
  };

  return (
    <div className="page-enter pb-24">
      <ConfettiEffect show={showConfetti} />
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-earth-500 font-semibold text-sm hover:text-leaf-600 transition-colors py-2">
          ← {t('common.back')}
        </button>

        <h1 className="text-2xl font-black text-earth-800">📸 {t('verify.title')}</h1>

        {success ? (
          <div className="glass-card bg-leaf-50 border-leaf-300 p-8 text-center animate-bounce-in">
            <span className="text-6xl mb-4 inline-block">🎉</span>
            <h2 className="text-xl font-bold text-leaf-700 mb-2">{t('verify.success')}</h2>
            <p className="text-sm text-earth-500">+3 Carbon Credits Awarded!</p>
            <p className="text-xs text-earth-400 mt-4">Returning to dashboard...</p>
          </div>
        ) : (
          <>
            {/* Image Upload */}
            <div
              onClick={() => fileRef.current?.click()}
              className="glass-card border-2 border-dashed border-leaf-300 p-8 text-center cursor-pointer hover:bg-leaf-50/50 transition-colors active:scale-[0.98]"
            >
              <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
              {preview ? (
                <img src={preview} alt="Preview" className="w-full max-h-48 object-cover rounded-xl mb-3" />
              ) : (
                <>
                  <span className="text-5xl mb-3 inline-block">📷</span>
                  <p className="text-lg font-bold text-earth-700">{t('verify.upload')}</p>
                  <p className="text-sm text-earth-400 mt-1">Tap to take photo or select</p>
                </>
              )}
            </div>

            {/* Voice Confirm */}
            <button
              onClick={() => setVoiceConfirmed(!voiceConfirmed)}
              className={`w-full glass-card p-4 flex items-center gap-4 transition-all ${
                voiceConfirmed ? 'bg-leaf-50 border-leaf-300' : ''
              } active:scale-[0.98]`}
            >
              <span className="text-3xl">{voiceConfirmed ? '✅' : '🎙️'}</span>
              <div className="text-left flex-1">
                <p className="font-bold text-earth-800">{t('verify.voice')}</p>
                <p className="text-xs text-earth-400">{voiceConfirmed ? 'Voice confirmed!' : 'Tap to confirm by voice'}</p>
              </div>
            </button>

            {/* Practice Type */}
            <div className="glass-card p-4">
              <p className="text-sm font-bold text-earth-600 mb-3">{t('verify.practice')}</p>
              <div className="grid grid-cols-2 gap-2">
                {practiceTypes.map(pt => (
                  <button
                    key={pt.value}
                    onClick={() => setPracticeType(pt.value)}
                    className={`p-3 rounded-xl text-sm font-medium text-left flex items-center gap-2 transition-all ${
                      practiceType === pt.value
                        ? 'bg-leaf-500 text-white shadow-md'
                        : 'bg-earth-50 text-earth-700 hover:bg-leaf-50'
                    } active:scale-95`}
                  >
                    <span className="text-lg">{pt.icon}</span>
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!practiceType || loading}
              className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <span className="animate-spin inline-block">⏳</span> : `${t('verify.submit')} →`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
