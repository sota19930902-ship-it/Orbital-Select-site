'use client';

import React from 'react';
import Link from 'next/link';
import { PARTNER_BRANDS_INFO } from '../data/mockData';
import { ShieldCheck } from 'lucide-react';

export const FeaturedBrandsSection: React.FC = () => {
  const featuredBrands = PARTNER_BRANDS_INFO.filter((b) => b.isFeaturedPartner);

  return (
    <section style={{ padding: '90px 0', backgroundColor: 'var(--bg-space)', color: '#FFFFFF' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '64px' }}>
          <span className="section-tag" style={{ color: 'var(--accent-gold)' }}>
            Curated Partners
          </span>
          <h2 className="section-title" style={{ color: '#FFFFFF' }}>
            Featured Brands <span style={{ fontSize: '1.2rem', opacity: 0.8 }}>(注目ブランド)</span>
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>
            独自の美学と妥協なきクラフトマンシップを持つ、厳選提携インテリアパートナー。
          </p>
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
