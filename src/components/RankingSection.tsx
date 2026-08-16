'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Product } from '../types';
import { ChevronLeft, ChevronRight, Star, Trophy, Sparkles, ExternalLink } from 'lucide-react';

interface RankingSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

type SituationTabId = 'all' | 'compact' | 'work' | 'masterpiece' | 'lighting';

interface SituationTab {
  id: SituationTabId;
  label: string;
  desc: string;
}

const SITUATION_TABS: SituationTab[] = [
  { id: 'all', label: '👑 総合人気', desc: '全商品から厳選した注目・代表作 TOP 10' },
  { id: 'compact', label: '🛋️ 一人暮らし・省スペース', desc: 'コンパクト家具・スタッキングチェア・省スペース TOP 10' },
  { id: 'work', label: '💼 テレワーク・書斎', desc: 'デスク・ワークチェア・デスクランプ・機能美 TOP 10' },
  { id: 'masterpiece', label: '✨ 一生モノの名作', desc: '時代を超える北欧名作照明・無垢フラッグシップ TOP 10' },
  { id: 'lighting', label: '💡 空間を格上げする照明', desc: '光の彫刻・ペンダントライト・ポータブルランプ' },
];

export const RankingSection: React.FC<RankingSectionProps> = ({
  products,
  onSelectProduct,
  onToggleWishlist,
  isInWishlist,
}) => {
  const [activeTab, setActiveTab] = useState<SituationTabId>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter & sort up to 10 items per situation tab
  const situationProducts = useMemo(() => {
    if (activeTab === 'lighting') {
      return products.filter((p) => p.category === 'lighting').slice(0, 10);
    }

    if (activeTab === 'work') {
      return products
        .filter(
          (p) =>
            p.category === 'desk' ||
            (p.category === 'chair' && (p.name.includes('CHAIR') || p.tags.includes('チェア'))) ||
            p.room === 'study'
        )
        .slice(0, 10);
    }

    if (activeTab === 'compact') {
      return products
        .filter(
          (p) =>
            p.priceRangeId === 'under10' ||
            p.priceRangeId === '10to20' ||
            p.category === 'chair' ||
            (p.category === 'storage' && p.price < 100000) ||
            (p.category === 'sofa' && p.price < 250000) ||
            (p.category === 'desk' && p.price < 200000) ||
            (p.category === 'lighting' && p.name.includes('160'))
        )
        .slice(0, 10);
    }

    if (activeTab === 'masterpiece') {
      // Curate masterpiece flagships (PH 5, DANISH SOFA, WILDWOOD, Panthella, ALMA, YU UC2)
      return products
        .filter(
          (p) =>
            p.category === 'lighting' ||
            p.name.includes('DANISH') ||
            p.name.includes('WILDWOOD') ||
            p.name.includes('MORELESS') ||
            p.name.includes('YU UC') ||
            p.name.includes('ALMA') ||
            p.name.includes('RITZ') ||
            p.name.includes('SHADOW') ||
            p.price >= 250000
        )
        .slice(0, 10);
    }

    // Default 'all' - Balanced Flagship TOP 10
    const brandCounts: Record<string, number> = {};
    const selected: Product[] = [];
    const sorted = [...products].sort((a, b) => {
      const scoreA = a.rating * 100 + (a.reviewCount || 0) * 2;
      const scoreB = b.rating * 100 + (b.reviewCount || 0) * 2;
      return scoreB - scoreA;
    });

    for (const p of sorted) {
      const bId = p.partnerBrandId;
      const count = brandCounts[bId] || 0;
      if (count < 4 && selected.length < 10) {
        brandCounts[bId] = count + 1;
        selected.push(p);
      }
    }

    for (const p of sorted) {
      if (selected.length >= 10) break;
      if (!selected.some((s) => s.id === p.id)) {
        selected.push(p);
      }
    }

    return selected.slice(0, 10);
  }, [products, activeTab]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 280;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleTabChange = (tabId: SituationTabId) => {
    setActiveTab(tabId);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Helper to extract a 1-line curator comment
  const getCuratorComment = (p: Product) => {
    if (p.description && p.description.length > 0 && p.description !== '詳細は商品ページでご確認ください。') {
      const firstSentence = p.description.split(/[。\n]/)[0];
      if (firstSentence && firstSentence.length > 6) {
        return firstSentence.length > 34 ? firstSentence.slice(0, 34) + '...' : firstSentence;
      }
    }
    if (p.category === 'lighting') return '空間に彫刻のような陰影を描く北欧名作ランプ';
    if (p.category === 'sofa') return '上質無垢材とフェザーの極上クッション性';
    if (p.category === 'table') return '最高峰ウォールナット無垢材とアイアンの融合';
    if (p.category === 'desk') return '洗練された直線美と快適なワーキング機能';
    if (p.category === 'chair') return '体に寄り添う滑らかな無垢フレームの座り心地';
    return '提携公式ストア取扱の上質インテリア';
  };

  return (
    <section
      style={{
        padding: '56px 0 48px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-light)',
      }}
      id="ranking-section"
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
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
                marginBottom: '4px',
              }}
            >
              <Trophy size={14} />
              <span>Situation & Purpose Ranking</span>
            </div>
            <h2
              style={{
                fontSize: '1.6rem',
                fontWeight: '600',
                color: 'var(--text-main)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              シチュエーション・目的別ランキング TOP 10
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', margin: '4px 0 0' }}>
              目的や間取りに合わせて、満足度・注目の高い名作家具（1位〜10位）をスワイプでチェック
            </p>
          </div>

          {/* Desktop Arrow Scroll Controls */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => handleScroll('left')}
              aria-label="左へスクロール"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-sub)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
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
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="右へスクロール"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-sub)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
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
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 1. Situation Tabs Bar */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '8px',
            marginBottom: '22px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {SITUATION_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? '700' : '500',
                  backgroundColor: isActive ? 'var(--bg-space)' : 'var(--bg-sub)',
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-main)',
                  border: isActive ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 10px rgba(197, 164, 109, 0.25)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    e.currentTarget.style.color = 'var(--accent-gold)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.color = 'var(--text-main)';
                  }
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 2. Horizontal Snap Carousel Track (Height ~320px) */}
        <div
          ref={scrollContainerRef}
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '12px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {situationProducts.map((product, idx) => {
            const rank = idx + 1;
            const rankStr = `#${String(rank).padStart(2, '0')}`;
            const isWish = isInWishlist(product.id);
            const curatorComment = getCuratorComment(product);
            const img = product.images?.[0] || '/images/products/placeholder.jpg';

            // Top 3 gold/platinum/bronze gradient badges
            const badgeBg =
              rank === 1
                ? 'linear-gradient(135deg, #D4AF37 0%, #AA771C 100%)'
                : rank === 2
                ? 'linear-gradient(135deg, #94A3B8 0%, #475569 100%)'
                : rank === 3
                ? 'linear-gradient(135deg, #B45309 0%, #78350F 100%)'
                : 'rgba(15, 23, 42, 0.75)';

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                style={{
                  width: 'min(78vw, 260px)',
                  minWidth: '240px',
                  maxWidth: '260px',
                  flex: '0 0 auto',
                  scrollSnapAlign: 'start',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  boxShadow: 'var(--shadow-subtle)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
                }}
              >
                {/* Rank Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    zIndex: 2,
                    background: badgeBg,
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    letterSpacing: '0.04em',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {rankStr}
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
                    top: '10px',
                    right: '10px',
                    zIndex: 2,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Star
                    size={14}
                    color={isWish ? 'var(--accent-gold)' : '#94A3B8'}
                    fill={isWish ? 'var(--accent-gold)' : 'transparent'}
                  />
                </button>

                {/* Square Product Image (140px) */}
                <div
                  style={{
                    height: '140px',
                    backgroundColor: 'var(--bg-sub)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px',
                  }}
                >
                  <img
                    src={img}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%231a1a24"/><text x="50%" y="50%" font-family="sans-serif" font-size="16" fill="%23555566" text-anchor="middle" dominant-baseline="middle">NO IMAGE</text></svg>';
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: '12px 14px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  {/* Brand Tag */}
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: '700',
                      letterSpacing: '0.06em',
                      color: 'var(--accent-gold)',
                      textTransform: 'uppercase',
                      marginBottom: '3px',
                      display: 'block',
                    }}
                  >
                    {product.brand}
                  </span>

                  {/* Product Title (1 line clamped) */}
                  <h3
                    style={{
                      fontSize: '0.86rem',
                      fontWeight: '600',
                      color: 'var(--text-main)',
                      lineHeight: '1.3',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      margin: '0 0 6px 0',
                    }}
                    title={product.name}
                  >
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div
                    style={{
                      fontSize: '0.96rem',
                      fontWeight: '700',
                      color: 'var(--text-main)',
                      marginBottom: '6px',
                    }}
                  >
                    ¥{product.price.toLocaleString()}{' '}
                    <span style={{ fontSize: '0.7rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>
                      (税込)
                    </span>
                  </div>

                  {/* 1-Line Curator Comment */}
                  <p
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-sub)',
                      lineHeight: '1.4',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      margin: '0 0 8px 0',
                    }}
                    title={curatorComment}
                  >
                    {curatorComment}
                  </p>

                  {/* Bottom View Details Link */}
                  <div
                    style={{
                      marginTop: 'auto',
                      fontSize: '0.74rem',
                      fontWeight: '600',
                      color: 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>仕様・ギャラリーを見る</span>
                    <span style={{ fontSize: '0.8rem' }}>→</span>
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
