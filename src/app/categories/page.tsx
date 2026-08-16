'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ArrowRight } from 'lucide-react';
import { CATEGORY_DEFINITIONS, calculateCategoryCounts } from '@/utils/categoryCounts';
import { PRODUCTS } from '@/data/mockData';

export default function CategoriesIndexPage() {
  const categoryCounts = useMemo(() => calculateCategoryCounts(PRODUCTS), []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)', paddingTop: '108px' }}>

      <Header wishlistCount={0} onOpenWishlist={() => {}} />

      <main style={{ flex: 1 }}>
        <section style={{ backgroundColor: 'var(--bg-space)', color: '#FFFFFF', padding: '80px 0 60px', textAlign: 'center' }}>
          <div className="container">
            <span className="section-tag" style={{ color: 'var(--accent-gold)' }}>Orbits by Function</span>
            <h1 className="section-title" style={{ color: '#FFFFFF', fontSize: '2.5rem' }}>
              カテゴリー一覧 <span style={{ fontSize: '1.2rem', opacity: 0.7 }}>(Categories)</span>
            </h1>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>
              暮らしの機能と目的から探す、厳選ブランド家具コレクション。
            </p>
          </div>
        </section>

        <section style={{ padding: '80px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
              {CATEGORY_DEFINITIONS.map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                return (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.id}`}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      overflow: 'hidden',
                      textDecoration: 'none',
                      boxShadow: 'var(--shadow-subtle)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div className="img-zoom-container" style={{ height: '180px', position: 'relative' }}>
                      <img src={cat.image} alt={cat.nameEn} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                      <div style={{ position: 'absolute', bottom: '16px', left: '16px', color: '#FFFFFF' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-en)' }}>{cat.nameEn}</span>
                        <h2 style={{ fontSize: '1.3rem', color: '#FFFFFF', fontWeight: '500' }}>{cat.nameJp}</h2>
                      </div>
                    </div>
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', marginBottom: '16px' }}>{cat.desc}</p>
                      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: '600' }}>{count}アイテム掲載</span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                          一覧を見る <ArrowRight size={14} color="var(--accent-gold)" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
