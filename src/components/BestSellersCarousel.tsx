'use client';

import React, { useRef } from 'react';
import { Product } from '../types';
import { ChevronLeft, ChevronRight, Star, ExternalLink, Sparkles } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface BestSellersCarouselProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const BestSellersCarousel: React.FC<BestSellersCarouselProps> = ({
  products,
  onSelectProduct,
  onToggleWishlist,
  isInWishlist,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Pick top 8 diverse flagship items
  const bestSellers = React.useMemo(() => {
    // Curate iconic items across brands
    const items: Product[] = [];
    const brandsCount: Record<string, number> = {};

    // First, prioritize top rated and specific flagships
    const sorted = [...products].sort((a, b) => {
      // Prioritize products with valid images and rich descriptions
      const scoreA = (a.rating * 100) + (a.reviewCount * 2);
      const scoreB = (b.rating * 100) + (b.reviewCount * 2);
      return scoreB - scoreA;
    });

    for (const p of sorted) {
      const b = p.partnerBrandId;
      if ((brandsCount[b] || 0) < 3 && items.length < 8) {
        items.push(p);
        brandsCount[b] = (brandsCount[b] || 0) + 1;
      }
    }

    // Fill up to 8 if needed
    for (const p of sorted) {
      if (items.length >= 8) break;
      if (!items.some((i) => i.id === p.id)) {
        items.push(p);
      }
    }

    return items.slice(0, 8);
  }, [products]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      style={{
        padding: '72px 0',
        backgroundColor: 'var(--bg-main)',
        borderBottom: '1px solid var(--border-light)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Header with Navigation Chevrons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '36px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                fontWeight: '700',
                color: 'var(--accent-gold)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              <Sparkles size={14} />
              <span>Flagship Selection</span>
            </div>
            <h2
              style={{
                fontSize: '1.8rem',
                fontWeight: '600',
                color: 'var(--text-main)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Best Sellers ＆ ピックアップ
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', margin: '6px 0 0' }}>
              マスターピース照明から極上無垢家具まで、注目度・満足度の高い代表作8選
            </p>
          </div>

          {/* Carousel Arrows */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => handleScroll('left')}
              aria-label="前へスクロール"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-subtle)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
                e.currentTarget.style.color = 'var(--accent-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.color = 'inherit';
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="次へスクロール"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-subtle)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
                e.currentTarget.style.color = 'var(--accent-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.color = 'inherit';
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '16px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {bestSellers.map((product, idx) => {
            const affiliateUrl = product.shopLinks[0]?.url || product.affiliateUrl || '#';
            const img = product.images?.[0] || '/images/products/placeholder.jpg';
            const isWish = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                style={{
                  minWidth: '280px',
                  maxWidth: '300px',
                  flex: '0 0 auto',
                  scrollSnapAlign: 'start',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: 'var(--shadow-subtle)',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                }}
              >
                {/* Ranking Gold Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    zIndex: 2,
                    backgroundColor: idx === 0 ? '#C5A46D' : idx === 1 ? '#94A3B8' : idx === 2 ? '#B45309' : 'rgba(11, 16, 32, 0.85)',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    letterSpacing: '0.04em',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  }}
                >
                  BEST #{idx + 1}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product);
                  }}
                  aria-label="お気に入りに追加"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 2,
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Star
                    size={16}
                    color={isWish ? 'var(--accent-gold)' : '#94A3B8'}
                    fill={isWish ? 'var(--accent-gold)' : 'transparent'}
                  />
                </button>

                {/* Product Image Area */}
                <div
                  onClick={() => onSelectProduct(product)}
                  style={{
                    height: '210px',
                    backgroundColor: 'var(--bg-sub)',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <SmartImage
                    srcCandidate={product.images && product.images.length > 0 ? product.images : img}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '16px',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: '18px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  {/* Brand & Category */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        color: 'var(--accent-gold)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {product.brand}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.74rem', color: 'var(--text-sub)' }}>
                      <Star size={12} fill="var(--accent-gold)" color="var(--accent-gold)" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3
                    onClick={() => onSelectProduct(product)}
                    style={{
                      fontSize: '0.92rem',
                      fontWeight: '600',
                      color: 'var(--text-main)',
                      lineHeight: '1.4',
                      height: '2.8em',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      margin: '0 0 10px 0',
                      cursor: 'pointer',
                    }}
                  >
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div style={{ marginTop: 'auto', marginBottom: '14px' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)' }}>
                      ¥{product.price.toLocaleString()}
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 'normal', marginLeft: '4px' }}>
                        (税込)
                      </span>
                    </div>
                  </div>

                  {/* 2-Button Action Bar (詳細・仕様を見る + 公式ストア) */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      onClick={() => onSelectProduct(product)}
                      style={{
                        padding: '8px 10px',
                        fontSize: '0.76rem',
                        fontWeight: '600',
                        backgroundColor: 'var(--bg-sub)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textAlign: 'center',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-gold)';
                        e.currentTarget.style.color = 'var(--accent-gold)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-light)';
                        e.currentTarget.style.color = 'var(--text-main)';
                      }}
                    >
                      詳細・仕様
                    </button>

                    <a
                      href={affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        padding: '8px 10px',
                        fontSize: '0.76rem',
                        fontWeight: '600',
                        backgroundColor: 'var(--accent-gold)',
                        color: '#0B1020',
                        borderRadius: 'var(--radius-xs)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.9';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <span>公式ストア</span>
                      <ExternalLink size={12} />
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
