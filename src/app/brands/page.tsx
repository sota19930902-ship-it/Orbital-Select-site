'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { PARTNER_BRANDS_INFO } from '../../data/mockData';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BrandsPage() {
  const [wishlistCount] = useState(0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <Header wishlistCount={wishlistCount} onOpenWishlist={() => {}} />

      <main style={{ flex: 1 }}>
        {/* Page Hero */}
        <section
          style={{
            backgroundColor: 'var(--bg-space)',
            color: '#FFFFFF',
            padding: '80px 0 60px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div className="container">
            <span className="section-tag" style={{ color: 'var(--accent-gold)' }}>
              Constellations
            </span>
            <h1 className="section-title" style={{ color: '#FFFFFF', fontSize: '2.5rem' }}>
              提携ブランド一覧 <span style={{ fontSize: '1.2rem', opacity: 0.7 }}>(Brands)</span>
            </h1>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '700px' }}>
              Orbital Selectが厳選した、妥協のない美学とクラフトマンシップを持つトップ家具＆照明ブランド。
            </p>
          </div>
        </section>

        {/* Brand Grid */}
        <section style={{ padding: '80px 0' }}>
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '32px',
              }}
            >
              {PARTNER_BRANDS_INFO.map((brand) => (
                <div
                  key={brand.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-subtle)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div className="img-zoom-container" style={{ height: '220px', position: 'relative' }}>
                    {brand.heroImage ? (
                      <img
                        src={brand.heroImage}
                        alt={brand.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : null}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '20px',
                        color: '#FFFFFF',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.72rem',
                          color: 'var(--accent-gold)',
                          backgroundColor: 'rgba(11,16,32,0.8)',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-xs)',
                          fontFamily: 'var(--font-en)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {brand.role}
                      </span>
                      <h2 style={{ fontSize: '1.4rem', color: '#FFFFFF', fontWeight: '600', marginTop: '4px' }}>
                        {brand.name}
                      </h2>
                    </div>
                  </div>

                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--text-sub)',
                        lineHeight: '1.7',
                        marginBottom: '20px',
                      }}
                    >
                      {brand.description}
                    </p>

                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '8px' }}>
                        ブランドの特徴:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {brand.features.slice(0, 3).map((feat, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                            <CheckCircle2 size={13} color="var(--accent-gold)" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: '600' }}>
                        価格帯: {brand.priceRangeText}
                      </div>

                      <Link
                        href={`/brands/${brand.id}`}
                        className="btn-primary"
                        style={{ padding: '10px 20px', fontSize: '0.82rem', gap: '6px' }}
                      >
                        <span>ブランド詳細</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
