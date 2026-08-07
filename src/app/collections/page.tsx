'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ORBIT_COLLECTIONS } from '../../data/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CollectionsIndexPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <Header wishlistCount={0} onOpenWishlist={() => {}} />

      <main style={{ flex: 1 }}>
        <section style={{ backgroundColor: 'var(--bg-space)', color: '#FFFFFF', padding: '80px 0 60px', textAlign: 'center' }}>
          <div className="container">
            <span className="section-tag" style={{ color: 'var(--accent-gold)' }}>Lifestyle Curations</span>
            <h1 className="section-title" style={{ color: '#FFFFFF', fontSize: '2.5rem' }}>
              Orbit Collections <span style={{ fontSize: '1.2rem', opacity: 0.7 }}>(特集コレクション)</span>
            </h1>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '680px' }}>
              ブランドの枠を超え、ライフスタイルと空気感で組み合わせるマルチブランドコーディネート。
            </p>
          </div>
        </section>

        <section style={{ padding: '80px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
              {ORBIT_COLLECTIONS.map((col) => (
                <div
                  key={col.id}
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
                    {col.heroImage ? (
                      <img src={col.heroImage} alt={col.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : null}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,16,32,0.9) 0%, transparent 60%)' }} />
                    <div style={{ position: 'absolute', bottom: '16px', left: '20px', color: '#FFFFFF' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-en)' }}>{col.title}</span>
                      <h2 style={{ fontSize: '1.4rem', color: '#FFFFFF', fontWeight: '500' }}>{col.subtitle}</h2>
                    </div>
                  </div>

                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-sub)', lineHeight: '1.7', marginBottom: '20px' }}>
                      {col.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                      {col.tags.map((t, idx) => (
                        <span key={idx} style={{ fontSize: '0.72rem', backgroundColor: 'var(--bg-sub)', padding: '3px 8px', borderRadius: 'var(--radius-xs)', color: 'var(--text-sub)' }}>
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                      <Link
                        href={`/collections/${col.id}`}
                        className="btn-primary"
                        style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.85rem' }}
                      >
                        <span>コレクションを見る</span>
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
