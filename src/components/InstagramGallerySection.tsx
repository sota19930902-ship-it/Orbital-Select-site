'use client';

import React from 'react';
import { INSTAGRAM_POSTS } from '../data/mockData';
import { Camera, Heart } from 'lucide-react';

export const InstagramGallerySection: React.FC = () => {
  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-sub)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Orbit Inspirations</span>
          <h2 className="section-title">Instagram・実例インテリアギャラリー</h2>
          <p className="section-subtitle">
            実際の部屋で使われているブランド家具のリアルなコーディネート集。
          </p>
        </div>

        {/* Instagram Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="img-zoom-container"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <div style={{ aspectRatio: '1/1', position: 'relative', overflow: 'hidden' }}>

                <img
                  src={post.image}
                  alt={post.caption}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80';
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(11,16,32,0.75)',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <Camera size={13} /> Instagram
                </div>
              </div>

              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{post.author}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-gold)' }}>
                    <Heart size={13} fill="var(--accent-gold)" /> {post.likes}
                  </span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: '1.5', marginBottom: '12px' }}>
                  {post.caption}
                </p>

                {/* Tagged brands */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {post.taggedBrands.map((brand, bIdx) => (
                    <span key={bIdx} style={{
                      fontSize: '0.72rem',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--accent-gold-bg)',
                      color: 'var(--accent-gold)',
                      fontWeight: '600',
                    }}>
                      #{brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
