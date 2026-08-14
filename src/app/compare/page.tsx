'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { PARTNER_BRANDS_INFO } from '../../data/mockData';
import { Scale, ExternalLink } from 'lucide-react';
import { getAffiliateUrl } from '../../config/affiliate';

export default function ComparePage() {
  const brands = PARTNER_BRANDS_INFO;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <Header wishlistCount={0} onOpenWishlist={() => {}} />

      <main style={{ flex: 1 }}>
        {/* Hero Header */}
        <section style={{ backgroundColor: 'var(--bg-space)', color: '#FFFFFF', padding: '80px 0 60px', textAlign: 'center' }}>
          <div className="container">
            <span className="section-tag" style={{ color: 'var(--accent-gold)' }}>Brand vs Brand</span>
            <h1 className="section-title" style={{ color: '#FFFFFF', fontSize: '2.5rem' }}>
              ブランド徹底比較 <span style={{ fontSize: '1.2rem', opacity: 0.7 }}>(Brand Comparison)</span>
            </h1>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '680px' }}>
              理念・価格帯・マテリアル・おすすめユーザーを横並びで科学的に比較検証。
            </p>
          </div>
        </section>

        {/* Brand Cards */}
        <section style={{ padding: '80px 0' }}>
          <div className="container">
            {brands.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--text-sub)' }}>
                <Scale size={48} style={{ marginBottom: '16px', opacity: 0.4 }} />
                <p>ブランドデータがまだ同期されていません。<br />
                  <code>pnpm run sync</code> を実行してください。</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' }}>
                {brands.map((brand) => {
                  const affiliateUrl = getAffiliateUrl(brand.id, brand.officialUrl);
                  return (
                    <div
                      key={brand.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)',
                        padding: '32px',
                        boxShadow: 'var(--shadow-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                      }}
                    >
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: '600' }}>
                        {brand.role}
                      </div>
                      <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--text-main)', fontFamily: 'var(--font-en)' }}>
                        {brand.name}
                      </h2>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', lineHeight: '1.75' }}>
                        {brand.description}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                        <Link href={`/brands/${brand.id}`} className="btn-outline" style={{ textAlign: 'center', padding: '12px' }}>
                          {brand.name} ブランド詳細を見る
                        </Link>
                        <a
                          href={affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                          style={{ textAlign: 'center', padding: '12px', backgroundColor: 'var(--accent-gold)', color: 'var(--bg-space)', gap: '6px' }}
                        >
                          <span>{brand.name} 公式ストアを見る</span>
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
