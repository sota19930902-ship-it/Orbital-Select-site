'use client';

import React from 'react';
import { ARTICLES } from '../data/mockData';
import { Clock, ChevronRight, Layers, Camera } from 'lucide-react';

export const ArticlesSection: React.FC = () => {
  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-sub)', borderTop: '1px solid var(--border-light)' }} id="articles-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Camera size={14} color="var(--accent-gold)" /> Voyager Journal
          </span>
          <h2 className="section-title">記事 ＆ 比較特集</h2>

          <p className="section-subtitle">
            プロ視点で分析。後悔しない家具選びとブランドごとの品質・価格差を解剖。
          </p>
        </div>

        {/* 6 Articles Grid with Doorway Frame Arch Tops */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '36px',
        }}>
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="img-zoom-container"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-subtle)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
              }}
            >
              {/* Doorway-shaped Image Frame (2/3 Compact Size) */}
              <div
                className="doorway-frame"
                style={{
                  height: '135px',
                  width: 'calc(100% - 32px)',
                  margin: '16px 16px 0 16px',
                  overflow: 'hidden',
                  position: 'relative',
                  borderRadius: '120px 120px 0 0',
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>


              <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Category Badge & Read Time / Date Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{
                    backgroundColor: 'var(--bg-space)',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-xs)',
                    letterSpacing: '0.04em',
                  }}>
                    {article.category}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {article.readTime}
                    </span>
                    <span>{article.date}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-main)', lineHeight: '1.45', marginBottom: '8px', wordBreak: 'break-word' }}>
                  {article.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: '1.65', marginBottom: '16px', flex: 1, wordBreak: 'break-word' }}>
                  {article.summary}
                </p>

                {article.comparedBrands && (
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent-gold)',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginBottom: '16px',
                  }}>
                    <Layers size={13} /> 対比ブランド: {article.comparedBrands.join(' vs ')}
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--text-main)',
                  marginTop: 'auto',
                }}>
                  記事を詳しく読む <ChevronRight size={16} color="var(--accent-gold)" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
