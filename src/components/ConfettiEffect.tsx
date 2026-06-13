import { useEffect, useState } from 'react';

const CONFETTI_COLORS = ['#12cf5a', '#facc15', '#38bdf8', '#f87171', '#c084fc', '#fb923c'];

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

export default function ConfettiEffect({ show }: { show: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!show) { setParticles([]); return; }
    const ps: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 1.5,
      size: 6 + Math.random() * 8,
    }));
    setParticles(ps);
    const timer = setTimeout(() => setParticles([]), 3000);
    return () => clearTimeout(timer);
  }, [show]);

  if (!particles.length) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: '-2%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `confetti-fall ${2 + Math.random()}s linear ${p.delay}s both`,
          }}
        />
      ))}
    </div>
  );
}
