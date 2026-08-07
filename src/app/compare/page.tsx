'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { PARTNER_BRANDS_INFO, BRAND_COMPARISONS } from '../../data/mockData';
import { Scale, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { getAffiliateUrl } from '../../config/affiliate';

export default function ComparePage() {
  const [selectedCompId, setSelectedCompId] = useState<string>('masterwal-vs-air-rhizome');

  const comparison = BRAND_COMPARISONS.find((c) => c.id === selectedCompId) || BRAND_COMPARISONS[0];
  const brand1 = PARTNER_BRANDS_INFO.find((b) => b.id === comparison.brand1Id) || PARTNER_BRANDS_INFO[0];
  const brand2 = PARTNER_BRANDS_INFO.find((b) => b.id === comparison.brand2Id) || PARTNER_BRANDS_INFO[1];

  const brand1AffiliateUrl = getAffiliateUrl(brand1.id, brand1.officialUrl);
  const brand2AffiliateUrl = getAffiliateUrl(brand2.id, brand2.officialUrl);

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

            {/* Comparison Switcher Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '36px', flexWrap: 'wrap' }}>
              {BRAND_COMPARISONS.map((comp) => {
                const isActive = comp.id === selectedCompId;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedCompId(comp.id)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: isActive ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)',
                      color: isActive ? 'var(--bg-space)' : '#FFFFFF',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? '600' : '400',
                      border: '1px solid var(--accent-gold)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {comp.title}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Comparison Section */}
        <section style={{ padding: '80px 0' }}>
          <div className="container">
            {/* Header Comparison Versus Banner */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '500', marginBottom: '12px' }}>
                {brand1.name} <span style={{ color: 'var(--accent-gold)', fontWeight: '300' }}>VS</span> {brand2.name}
              </h2>
              <p style={{ color: 'var(--text-sub)', fontSize: '0.94rem', maxWidth: '720px', margin: '0 auto', lineHeight: '1.75' }}>
                {comparison.summary}
              </p>
            </div>

            {/* 2-Column Brand Comparison Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '64px' }}>
              {/* Brand 1 Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--accent-gold)',
                  padding: '36px',
                  boxShadow: 'var(--shadow-subtle)',
                }}
              >
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: '600', marginBottom: '4px' }}>
                  {brand1.role}
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '16px', fontFamily: 'var(--font-en)' }}>
                  {brand1.name}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', lineHeight: '1.75', marginBottom: '24px' }}>
                  {brand1.description}
                </p>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>価格帯</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-gold)' }}>{brand1.priceRangeText}</div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>こんな方におすすめ:</div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-sub)', backgroundColor: 'var(--bg-sub)', padding: '12px', borderRadius: 'var(--radius-xs)' }}>
                    {comparison.recommendedForBrand1}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link href={`/brands/${brand1.id}`} className="btn-outline" style={{ textAlign: 'center', padding: '12px' }}>
                    {brand1.name} ブランド詳細を見る
                  </Link>
                  <a
                    href={brand1AffiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ textAlign: 'center', padding: '12px', backgroundColor: 'var(--accent-gold)', color: 'var(--bg-space)', gap: '6px' }}
                  >
                    <span>{brand1.name} 公式ストアを見る</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Brand 2 Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  padding: '36px',
                  boxShadow: 'var(--shadow-subtle)',
                }}
              >
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: '600', marginBottom: '4px' }}>
                  {brand2.role}
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '16px', fontFamily: 'var(--font-en)' }}>
                  {brand2.name}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', lineHeight: '1.75', marginBottom: '24px' }}>
                  {brand2.description}
                </p>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>価格帯</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-gold)' }}>{brand2.priceRangeText}</div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>こんな方におすすめ:</div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-sub)', backgroundColor: 'var(--bg-sub)', padding: '12px', borderRadius: 'var(--radius-xs)' }}>
                    {comparison.recommendedForBrand2}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link href={`/brands/${brand2.id}`} className="btn-outline" style={{ textAlign: 'center', padding: '12px' }}>
                    {brand2.name} ブランド詳細を見る
                  </Link>
                  <a
                    href={brand2AffiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ textAlign: 'center', padding: '12px', backgroundColor: 'var(--btn-black)', color: '#FFFFFF', gap: '6px' }}
                  >
                    <span>{brand2.name} 公式ストアを見る</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Detailed Point-by-Point Spec Matrix */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '40px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '500', marginBottom: '24px', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '8px' }}>
                項目別スペック比較表 (Spec Matrix)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ backgroundColor: 'var(--bg-sub)', padding: '20px', borderRadius: 'var(--radius-xs)' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--accent-gold)', marginBottom: '8px' }}>理念・デザインアプローチの違</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
                    {comparison.designPhilosophyDiff}
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--bg-sub)', padding: '20px', borderRadius: 'var(--radius-xs)' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--accent-gold)', marginBottom: '8px' }}>価格帯・ターゲット層の違い</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
                    {comparison.priceSegmentDiff}
                  </p>
                </div>

                <div style={{ backgroundColor: 'var(--bg-sub)', padding: '20px', borderRadius: 'var(--radius-xs)' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--accent-gold)', marginBottom: '8px' }}>素材選定・クラフトマンシップの違</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
                    {comparison.materialCraftDiff}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
