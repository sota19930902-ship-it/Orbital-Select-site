'use client';

import React from 'react';
import { Product } from '../types';
import { getAffiliateUrl } from '../config/affiliate';
import { Star, Heart, ExternalLink, MessageSquareQuote } from 'lucide-react';

interface RankingSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const RankingSection: React.FC<RankingSectionProps> = ({
  products,
  onSelectProduct,
  onToggleWishlist,
  isInWishlist,
}) => {
  const top10 = products.slice(0, 10);

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }} id="ranking-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Featured Orbit</span>
          <h2 className="section-title">人気家具ランキング TOP 10</h2>
          <p className="section-subtitle">
            提携ブランドの全商品カタログ（ACTUS、MASTERWAL等）から、
            <br />
            公式ストア購入者レビュー・満足度スコアを基に個々の商品を直接抽出した最高評価TOP 10。
          </p>


        </div>

        {/* TOP 10 Grid (2 Columns Layout) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
            gap: '28px',
          }}
        >
          {top10.map((product, idx) => {
            const rank = idx + 1;
            const isWish = isInWishlist(product.id);
            const badgeClass =
              rank === 1 ? 'rank-badge-1' : rank === 2 ? 'rank-badge-2' : rank === 3 ? 'rank-badge-3' : 'rank-badge-other';

            const affiliateUrl = getAffiliateUrl(product.partnerBrandId, undefined, product.name);

            return (
              <div
                key={product.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: 'var(--shadow-subtle)',
                  transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                  padding: '16px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
                }}
              >
                {/* Rank Badge */}
                <div className={`rank-badge ${badgeClass}`}>{rank}</div>

                {/* Product Image (Contain mode so full furniture is displayed) */}
                <div
                  className="img-zoom-container"
                  style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    backgroundColor: 'var(--bg-sub)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    marginBottom: '16px',
                  }}
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0] : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%231a1a24"/><text x="50%" y="50%" font-family="sans-serif" font-size="16" fill="%23555566" text-anchor="middle" dominant-baseline="middle">NO IMAGE</text></svg>'}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%231a1a24"/><text x="50%" y="50%" font-family="sans-serif" font-size="16" fill="%23555566" text-anchor="middle" dominant-baseline="middle">NO IMAGE</text></svg>';
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      zIndex: 5,
                    }}
                  >
                    <Heart size={16} color="var(--accent-gold)" fill={isWish ? 'var(--accent-gold)' : 'transparent'} />
                  </button>
                </div>

                {/* Product Info & Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                  {/* Brand & Rating */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        color: 'var(--accent-gold)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {product.brand}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ display: 'flex', color: 'var(--accent-gold)' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={13} fill={i < Math.floor(product.rating) ? 'var(--accent-gold)' : 'transparent'} />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>{product.rating}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>({product.reviewCount})</span>
                    </div>
                  </div>

                  {/* Title & Price */}
                  <h3
                    onClick={() => onSelectProduct(product)}
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: '600',
                      color: 'var(--text-main)',
                      lineHeight: '1.4',
                      marginBottom: '8px',
                      cursor: 'pointer',
                      wordBreak: 'break-word',
                    }}
                  >
                    {product.name}
                  </h3>

                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>
                    ¥{product.price.toLocaleString()}{' '}
                    <span style={{ fontSize: '0.78rem', fontWeight: '400', color: 'var(--text-sub)' }}>(税込目安)</span>
                  </div>

                  {/* Feature Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                    {product.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.75rem',
                          padding: '3px 9px',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: 'var(--bg-sub)',
                          color: 'var(--text-sub)',
                          border: '1px solid var(--border-light)',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Editorial Comment */}
                  <div
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--accent-gold-bg)',
                      borderLeft: '3px solid var(--accent-gold)',
                      fontSize: '0.84rem',
                      color: 'var(--text-main)',
                      lineHeight: '1.55',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}
                  >
                    <MessageSquareQuote size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ wordBreak: 'break-word' }}>
                      <strong>編集部コメント:</strong> {product.editorialComment}

                    </div>
                  </div>

                  {/* 2 CTA Buttons - Clean non-overflow layout */}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="btn-outline"
                      style={{ flex: 1, padding: '12px 10px', fontSize: '0.88rem', whiteSpace: 'nowrap' }}
                    >
                      詳細・仕様を見る
                    </button>

                    <a
                      href={affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{
                        flex: 1,
                        padding: '12px 10px',
                        fontSize: '0.88rem',
                        whiteSpace: 'nowrap',
                        backgroundColor: 'var(--accent-gold)',
                        color: 'var(--bg-space)',
                        fontWeight: '600',
                      }}
                    >
                      <span>{product.brand} 公式ストア</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
