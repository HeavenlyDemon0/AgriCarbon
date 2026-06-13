export default function FloatingLeaf({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-float ${className}`}>
      <div className="animate-spin-slow inline-block">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 8px 24px rgba(18, 207, 90, 0.3))' }}
        >
          <path
            d="M40 8C40 8 16 24 16 48C16 64 28 72 40 72C52 72 64 64 64 48C64 24 40 8 40 8Z"
            fill="url(#leafGrad)"
            stroke="#0a873a"
            strokeWidth="1.5"
          />
          <path
            d="M40 20V64M40 32L28 44M40 44L52 36"
            stroke="#0a873a"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="leafGrad" x1="16" y1="8" x2="64" y2="72" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7bf5a8" />
              <stop offset="0.5" stopColor="#3ae87c" />
              <stop offset="1" stopColor="#0a873a" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
