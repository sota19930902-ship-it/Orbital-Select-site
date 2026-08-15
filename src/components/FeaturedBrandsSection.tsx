'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PARTNER_BRANDS_INFO } from '../data/mockData';
import { ShieldCheck, Info } from 'lucide-react';

export const FeaturedBrandsSection: React.FC = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const featuredBrands = PARTNER_BRANDS_INFO.filter((b) => b.isFeaturedPartner);

  return (
    <section style={{ padding: '90px 0', backgroundColor: 'var(--bg-space)', color: '#FFFFFF' }} id="brands-section">
      <div className="container">
        {/* Section Header with Responsive Inline PR Disclosure on the right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <div>
            <span className="section-tag" style={{ color: 'var(--accent-gold)' }}>
              Curated Partners
            </span>
            <h2 className="section-title" style={{ color: '#FFFFFF', margin: '4px 0 0', textAlign: 'left' }}>
              全5大提携パートナーブランド <span style={{ fontSize: '1.15rem', opacity: 0.85, fontWeight: 'normal' }}>(公式カタログ連動)</span>
            </h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)', margin: '8px 0 0', textAlign: 'left' }}>
              独自の美学と妥協なきクラフトマンシップを持つ、厳選提携インテリアパートナー。
            </p>
          </div>

          {/* Inline PR / Affiliate Disclosure Widget with Tooltip */}
          <div style={{ position: 'relative', marginTop: 'auto', paddingBottom: '4px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(197, 164, 109, 0.3)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.74rem',
                color: 'rgba(255, 255, 255, 0.75)',
              }}
            >
              <span
                style={{
                  fontSize: '0.64rem',
                  fontWeight: '800',
                  color: 'var(--accent-gold)',
                  backgroundColor: 'rgba(197, 164, 109, 0.15)',
                  border: '1px solid rgba(197, 164, 109, 0.45)',
                  padding: '1px 5px',
                  borderRadius: '3px',
                  letterSpacing: '0.04em',
                }}
              >
                PR
              </span>
              <span>提携公式ストアの広告リンクを含みます</span>

              {/* Tooltip trigger icon */}
              <div
                style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
                onMouseEnter={() => setIsTooltipOpen(true)}
                onMouseLeave={() => setIsTooltipOpen(false)}
                onClick={() => setIsTooltipOpen(!isTooltipOpen)}
              >
                <button
                  type="button"
                  aria-label="広告開示の詳細を表示"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-gold)',
                    cursor: 'pointer',
                  }}
                >
                  <Info size={14} />
                </button>

                {/* Tooltip Popover */}
                {isTooltipOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 'calc(100% + 8px)',
                      right: '-8px',
                      width: '260px',
                      backgroundColor: '#0F172A',
                      border: '1px solid var(--accent-gold)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      fontSize: '0.74rem',
                      color: '#F1F5F9',
                      lineHeight: '1.6',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                      zIndex: 100,
                      pointerEvents: 'none',
                    }}
                  >
                    適格販売により紹介料を獲得する場合があります。最新の価格・在庫は各公式ストアにてご確認ください。
                    {/* Tooltip Bottom Arrow */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: '12px',
                        width: 0,
                        height: 0,
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderTop: '5px solid var(--accent-gold)',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
          }}
        >
          {featuredBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.id}`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(197, 164, 109, 0.25)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                backdropFilter: 'blur(10px)',
                textDecoration: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(197, 164, 109, 0.25)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Card Content Body */}
              <div
                style={{
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                {/* Brand Name Header */}
                <div style={{ marginBottom: '16px' }}>
                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      letterSpacing: '0.03em',
                      lineHeight: '1.2',
                      marginBottom: '4px',
                    }}
                  >
                    {brand.name}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold-light)' }}>
                    {brand.jpName}
                  </div>
                </div>

                {/* Main Category Gold Pill Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.74rem',
                      color: 'var(--accent-gold)',
                      backgroundColor: 'var(--accent-gold-bg)',
                      border: '1px solid var(--accent-gold-border)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      whiteSpace: 'nowrap',
                      width: 'fit-content',
                    }}
                  >
                    <ShieldCheck size={12} style={{ flexShrink: 0 }} />
                    <span>{brand.role}</span>
                  </div>

                  {brand.productCount && brand.productCount > 0 ? (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        color: '#FFFFFF',
                        backgroundColor: 'rgba(255, 255, 255, 0.12)',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: '600',
                      }}
                    >
                      {brand.productCount} 点掲載中
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--accent-gold)',
                        backgroundColor: 'rgba(212, 175, 55, 0.15)',
                        border: '1px solid var(--accent-gold)',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: '600',
                      }}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>


                {/* Description */}
                <p
                  style={{
                    fontSize: '0.86rem',
                    color: 'rgba(255, 255, 255, 0.75)',
                    lineHeight: '1.75',
                    margin: 0,
                  }}
                >
                  {brand.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
