'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  onScrollToRanking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToRanking }) => {
  return (
    <section
      style={{
        position: 'relative',
        padding: '88px 0 76px',
        backgroundColor: 'var(--bg-space)',
        backgroundImage:
          'radial-gradient(circle at 50% 30%, rgba(22, 33, 62, 0.75) 0%, rgba(11, 16, 32, 0.98) 100%)',
        color: '#FFFFFF',
        borderBottom: '1px solid rgba(197, 164, 109, 0.2)',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 1. Orbit Background Lines & Star Dots */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '760px',
          height: '760px',
          borderRadius: '50%',
          border: '1px stroke rgba(197, 164, 109, 0.09)',
          boxShadow: '0 0 100px rgba(197, 164, 109, 0.05)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(45deg)',
          width: '1000px',
          height: '420px',
          borderRadius: '50%',
          border: '1px stroke rgba(197, 164, 109, 0.06)',
          pointerEvents: 'none',
        }}
      />

      {/* 2. Main Artificial Satellite (人工衛星 - 右側に寄せて配置) */}
      <div
        style={{
          position: 'absolute',
          top: '-2%',
          right: '-8%',
          width: '640px',
          height: '460px',
          pointerEvents: 'none',
          opacity: 0.85,
          filter: 'drop-shadow(0 0 35px rgba(197, 164, 109, 0.55))',
          animation: 'floatSatellite 10s ease-in-out infinite alternate',
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 240 180" width="100%" height="100%" fill="none">
          <defs>
            <linearGradient id="panelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Satellite Group rotated for space dynamic orientation */}
          <g transform="rotate(-18 120 90)">
            {/* Trajectory Orbit Arc */}
            <path
              d="M 10 130 Q 120 40 230 110"
              stroke="var(--accent-gold)"
              strokeWidth="0.8"
              strokeDasharray="4 4"
              opacity="0.3"
            />

            {/* Left Solar Array Panel */}
            <rect
              x="15"
              y="75"
              width="55"
              height="24"
              rx="3"
              fill="url(#panelGrad)"
              stroke="var(--accent-gold)"
              strokeWidth="1.5"
            />
            {/* Solar Cells Grid */}
            <line x1="33" y1="75" x2="33" y2="99" stroke="var(--accent-gold)" strokeWidth="0.8" opacity="0.6" />
            <line x1="51" y1="75" x2="51" y2="99" stroke="var(--accent-gold)" strokeWidth="0.8" opacity="0.6" />
            <line x1="15" y1="87" x2="70" y2="87" stroke="var(--accent-gold)" strokeWidth="0.8" opacity="0.6" />

            {/* Left Arm Connector */}
            <rect x="70" y="85" width="12" height="4" fill="var(--accent-gold)" />

            {/* Main Satellite Cube Bus Body */}
            <rect
              x="82"
              y="68"
              width="36"
              height="38"
              rx="4"
              fill="url(#bodyGrad)"
              stroke="var(--accent-gold)"
              strokeWidth="1.8"
              filter="url(#goldGlow)"
            />
            {/* High-tech Sensor / Lens */}
            <circle cx="100" cy="87" r="8" fill="#020617" stroke="var(--accent-gold)" strokeWidth="1.2" />
            <circle cx="100" cy="87" r="3" fill="var(--accent-gold)" />
            {/* Gold Corner Foil Accents */}
            <rect x="84" y="70" width="4" height="4" fill="var(--accent-gold)" />
            <rect x="112" y="70" width="4" height="4" fill="var(--accent-gold)" />
            <rect x="84" y="100" width="4" height="4" fill="var(--accent-gold)" />
            <rect x="112" y="100" width="4" height="4" fill="var(--accent-gold)" />

            {/* Parabolic Antenna Dish */}
            <path
              d="M 90 68 Q 100 54 110 68"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="1.8"
            />
            <line x1="100" y1="60" x2="100" y2="48" stroke="var(--accent-gold)" strokeWidth="1.5" />
            <circle cx="100" cy="46" r="2.5" fill="var(--accent-gold)" />

            {/* Transmitting Signal Radio Waves */}
            <path
              d="M 92 40 Q 100 34 108 40"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="1.2"
              opacity="0.85"
            />
            <path
              d="M 86 34 Q 100 26 114 34"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="1"
              opacity="0.5"
            />
            <path
              d="M 80 28 Q 100 18 120 28"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="0.8"
              opacity="0.25"
            />

            {/* Right Arm Connector */}
            <rect x="118" y="85" width="12" height="4" fill="var(--accent-gold)" />

            {/* Right Solar Array Panel */}
            <rect
              x="130"
              y="75"
              width="55"
              height="24"
              rx="3"
              fill="url(#panelGrad)"
              stroke="var(--accent-gold)"
              strokeWidth="1.5"
            />
            {/* Solar Cells Grid */}
            <line x1="148" y1="75" x2="148" y2="99" stroke="var(--accent-gold)" strokeWidth="0.8" opacity="0.6" />
            <line x1="166" y1="75" x2="166" y2="99" stroke="var(--accent-gold)" strokeWidth="0.8" opacity="0.6" />
            <line x1="130" y1="87" x2="185" y2="87" stroke="var(--accent-gold)" strokeWidth="0.8" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* Hero Content */}
      <div className="container" style={{ maxWidth: '880px', position: 'relative', zIndex: 3 }}>
        <span className="section-tag" style={{ color: 'var(--accent-gold)', marginBottom: '16px' }}>
          CURATED FURNITURE DISCOVERY
        </span>

        {/* Brand Concept English Motto */}
        <div
          style={{
            fontFamily: 'var(--font-en)',
            fontSize: '0.95rem',
            fontWeight: '300',
            letterSpacing: '0.22em',
            color: 'var(--accent-gold-light)',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          Every home has its own orbit.
        </div>

        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: '300',
            lineHeight: '1.4',
            color: '#FFFFFF',
            marginBottom: '24px',
            letterSpacing: '0.04em',
          }}
        >
          理想の家具が<br className="mobile-only" />
          <span style={{ color: 'var(--accent-gold)', fontWeight: '400' }}>価格とテイスト</span>
          から見つかる。
        </h1>


        {/* User Specified 3-Line Subcopy */}
        <p
          style={{
            fontSize: '1.02rem',
            color: '#CCCCCC',
            lineHeight: '1.9',
            marginBottom: '36px',
            fontWeight: '300',
          }}
        >
          MASTERWAL・La Vita・FLYMEeなどの

          <br />
          人気高級・デザイン家具ブランドを徹底比較。
          <br />
          あなたにとって一生モノの最適な一台選びをサポートします。
        </p>

        {/* CTA Button */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button
            onClick={onScrollToRanking}
            className="btn-primary"
            style={{
              padding: '16px 40px',
              fontSize: '0.92rem',
              backgroundColor: 'var(--accent-gold)',
              color: 'var(--bg-space)',
              fontWeight: '600',
            }}
          >
            Explore Orbits / 人気ランキングを見る <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
