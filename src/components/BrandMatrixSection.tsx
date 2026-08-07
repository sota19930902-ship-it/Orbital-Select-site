'use client';

import React, { useState } from 'react';
import { PARTNER_BRANDS_INFO } from '../data/mockData';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface BrandMatrixSectionProps {
  onSelectBrandFilter: (brandId: string) => void;
}

export const BrandMatrixSection: React.FC<BrandMatrixSectionProps> = ({ onSelectBrandFilter }) => {
  const [activeBrandId, setActiveBrandId] = useState<string>('flymee');

  const selectedBrand = PARTNER_BRANDS_INFO.find((b) => b.id === activeBrandId) || PARTNER_BRANDS_INFO[0];

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-light)' }} id="brand-matrix-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Constellations</span>
          <h2 className="section-title">ブランドガイド ＆ 比較マトリックス</h2>
          <p className="section-subtitle">
            FLYMEe・KANADEMONO・CRASH GATE・Re:CENO・LOWYAの格付け・価格帯・テイストの違いを一目で比較。
          </p>
        </div>

        {/* 1. Brand Positioning Table: Ensure text wraps naturally without truncation */}
        <div style={{
          overflowX: 'auto',
          marginBottom: '56px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-subtle)',
        }}>
          <table style={{
            width: '100%',
            minWidth: '640px',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
            textAlign: 'left',
          }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-space)', color: '#FFFFFF' }}>
                <th style={{ padding: '16px 20px', fontWeight: '500', whiteSpace: 'nowrap' }}>ブランド名</th>
                <th style={{ padding: '16px 20px', fontWeight: '500', whiteSpace: 'nowrap' }}>役割</th>
                <th style={{ padding: '16px 20px', fontWeight: '500', whiteSpace: 'nowrap' }}>テイスト</th>
                <th style={{ padding: '16px 20px', fontWeight: '500', whiteSpace: 'nowrap' }}>価格帯</th>
                <th style={{ padding: '16px 20px', fontWeight: '500', textAlign: 'right', whiteSpace: 'nowrap' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {PARTNER_BRANDS_INFO.map((b, idx) => (
                <tr
                  key={b.id}
                  style={{
                    backgroundColor: idx % 2 === 0 ? '#FFFFFF' : 'var(--bg-sub)',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  <td style={{ padding: '16px 20px', fontWeight: '700', color: 'var(--accent-gold)', whiteSpace: 'nowrap' }}>
                    {b.name}
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-main)', fontWeight: '500' }}>
                    {b.role}
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-sub)' }}>
                    {b.taste}
                  </td>
                  <td style={{ padding: '16px 20px', fontWeight: '600', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>
                    {b.priceRangeText}
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <button
                      onClick={() => setActiveBrandId(b.id)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: activeBrandId === b.id ? 'var(--accent-gold)' : 'var(--bg-sub)',
                        color: activeBrandId === b.id ? 'var(--bg-space)' : 'var(--text-main)',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      詳細比較を見る
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2. Interactive Brand Detail Box */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '36px',
          backgroundColor: 'var(--bg-sub)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          padding: '36px',
          boxShadow: 'var(--shadow-subtle)',
        }}>
          {/* Left Brand Selector Menu */}
          <div>
            <h3 style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              ブランド切り替え
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {PARTNER_BRANDS_INFO.map((b) => {
                const isActive = b.id === activeBrandId;
                return (
                  <button
                    key={b.id}
                    onClick={() => setActiveBrandId(b.id)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                      border: isActive ? '1px solid var(--accent-gold)' : '1px solid transparent',
                      color: isActive ? 'var(--text-main)' : 'var(--text-sub)',
                      textAlign: 'left',
                      fontWeight: isActive ? '700' : '400',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: isActive ? 'var(--shadow-subtle)' : 'none',
                    }}
                  >
                    <span>{b.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.priceRangeText}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Brand Detailed Analysis */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="section-tag" style={{ justifyContent: 'flex-start' }}>{selectedBrand.role}</span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: '500', color: 'var(--text-main)' }}>
                  {selectedBrand.name}
                </h3>
              </div>
              <a
                href={selectedBrand.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.85rem' }}
              >
                公式サイトを見る <ExternalLink size={14} />
              </a>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-sub)', lineHeight: '1.8', marginBottom: '24px', wordBreak: 'break-word' }}>
              {selectedBrand.description}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '24px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-subtle)',
            }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-gold)', marginBottom: '8px' }}>
                  🎯 向いている人（ターゲット層）
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.5', wordBreak: 'break-word' }}>
                  {selectedBrand.targetUsers}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-gold)', marginBottom: '8px' }}>
                  ⚡ 他ブランドとの差別化ポイント
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.5', wordBreak: 'break-word' }}>
                  {selectedBrand.diffPoint}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {selectedBrand.features.map((feat, idx) => (
                <span key={idx} style={{
                  fontSize: '0.78rem',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--accent-gold-bg)',
                  color: 'var(--accent-gold)',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <CheckCircle2 size={13} color="var(--accent-gold)" /> {feat}
                </span>
              ))}
            </div>

            <button
              onClick={() => onSelectBrandFilter(selectedBrand.id)}
              className="btn-outline"
              style={{ width: '100%', padding: '12px' }}
            >
              {selectedBrand.name} の商品をカタログで絞り込む
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
