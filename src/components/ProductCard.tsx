'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '../types';
import { getAffiliateUrl } from '../config/affiliate';
import { Star, ExternalLink, Scale, ChevronRight, Images } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  onToggleCompare?: (product: Product) => void;
  isInCompare?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onToggleWishlist,
  isInWishlist,
  onToggleCompare,
  isInCompare = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const affiliateUrl = product.shopLinks[0]?.url || product.affiliateUrl || getAffiliateUrl(product.partnerBrandId, undefined, product.name);

  const images = product.images && product.images.length > 0 ? product.images : [];
  const primaryImage = images[0] || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%231a1a24"/><text x="50%" y="50%" font-family="sans-serif" font-size="16" fill="%23555566" text-anchor="middle" dominant-baseline="middle">NO IMAGE</text></svg>';
  const displayImage = isHovered && images.length > 1 ? images[1] : primaryImage;

  const categoryLabels: Record<string, string> = {
    sofa: 'ソファ',
    table: 'テーブル',
    chair: 'チェア',
    storage: '収納',
    lighting: '照明',
    desk: 'デスク',
    'tv-board': 'TVボード',
    bed: 'ベッド',
  };

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-subtle)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), boxShadow 0.3s ease',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
      }}
    >
      {/* Top Image Area */}
      <div
        className="img-zoom-container"
        style={{
          position: 'relative',
          aspectRatio: '4/3',
          backgroundColor: 'var(--bg-sub)',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={handleCardClick}
      >
        <Link href={`/product/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <SmartImage
            srcCandidate={images.length > 0 ? images : displayImage}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              transition: 'opacity 0.25s ease',
            }}
          />
        </Link>

        {/* Multi-image photo count badge */}
        {images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              backgroundColor: 'rgba(11, 16, 32, 0.78)',
              color: '#FFFFFF',
              backdropFilter: 'blur(4px)',
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.68rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              zIndex: 5,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              pointerEvents: 'none',
            }}
          >
            <Images size={12} color="var(--accent-gold)" />
            <span>{images.length} 枚</span>
          </div>
        )}

        {/* Micro Satellite Orbit Effect */}
        <div
          className="orbital-satellite-ring"
          style={{
            position: 'absolute',
            top: '12px',
            right: '90px',
            width: '28px',
            height: '28px',
            pointerEvents: 'none',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="12" stroke="var(--accent-gold)" strokeWidth="0.8" fill="none" strokeDasharray="3 2" opacity="0.6" />
            <circle cx="26" cy="11" r="2" fill="var(--accent-gold)" />
          </svg>
        </div>

        {/* Brand Tag & Category Badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', zIndex: 5 }}>
          <span
            style={{
              backgroundColor: 'rgba(11, 16, 32, 0.88)',
              color: '#FFFFFF',
              fontSize: '0.72rem',
              fontWeight: '600',
              padding: '3px 10px',
              borderRadius: 'var(--radius-xs)',
            }}
          >
            {product.brand}
          </span>
          <span
            style={{
              backgroundColor: 'rgba(197, 164, 109, 0.9)',
              color: '#FFFFFF',
              fontSize: '0.7rem',
              fontWeight: '600',
              padding: '3px 8px',
              borderRadius: 'var(--radius-xs)',
            }}
          >
            {categoryLabels[product.category] || product.category}
          </span>
        </div>

        {/* Action Buttons Top Right: Favorite & Compare */}
        <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px', zIndex: 5 }}>
          {/* Compare Button */}
          {onToggleCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(product);
              }}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: isInCompare ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.92)',
                color: isInCompare ? '#FFFFFF' : 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              }}
              title={isInCompare ? '比較リストから削除' : '比較リストに追加'}
            >
              <Scale size={15} color={isInCompare ? '#FFFFFF' : 'var(--text-main)'} />
            </button>
          )}

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
            title={isInWishlist ? 'In Orbit から外す' : 'In Orbit に保存'}
          >
            <Star size={15} color="var(--accent-gold)" fill={isInWishlist ? 'var(--accent-gold)' : 'transparent'} />
          </button>
        </div>
      </div>

      {/* Card Content Area */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Rating (Synced with Official Brand Store Reviews) */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}
          title={`公式ストア評価: ★${product.rating} / 5.0 (${product.reviewCount}件の購入者レビュー連動)`}
        >
          <div style={{ display: 'flex', color: 'var(--accent-gold)' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill={i < Math.floor(product.rating) ? 'var(--accent-gold)' : 'transparent'} />
            ))}
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)' }}>{product.rating}</span>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>({product.reviewCount}件公式レビュー)</span>
        </div>

        {/* Product Title Link */}
        <h3
          style={{
            fontSize: '1.02rem',
            fontWeight: '500',
            color: 'var(--text-main)',
            lineHeight: '1.45',
            marginBottom: '6px',
            wordBreak: 'break-word',
          }}
        >
          <Link href={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {product.name}
          </Link>
        </h3>

        <div style={{ fontSize: '1.18rem', fontWeight: '700', color: 'var(--accent-gold)', marginBottom: '10px' }}>
          ¥{product.price.toLocaleString()} <span style={{ fontSize: '0.75rem', fontWeight: '400', color: 'var(--text-sub)' }}>(税込目安)</span>
        </div>

        {/* Feature Tags (Filtered to exclude NaN, undefined, and empty values) */}
        {product.tags && product.tags.filter((t) => t && !/^(nan|null|undefined|不明|未記載|記載なし|-|–)$/i.test(t)).length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
            {product.tags
              .filter((t) => t && !/^(nan|null|undefined|不明|未記載|記載なし|-|–)$/i.test(t))
              .slice(0, 3)
              .map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.72rem',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--bg-sub)',
                    color: 'var(--text-sub)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  #{tag}
                </span>
              ))}
          </div>
        )}

        {/* Real Product Description (Spreadsheet description column) */}
        <p
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-sub)',
            lineHeight: '1.6',
            marginBottom: '16px',
            wordBreak: 'break-word',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.6em',
          }}
        >
          {product.description || '詳細は商品ページでご確認ください。'}
        </p>

        {/* CTA Buttons Row */}
        <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '8px' }}>
          <Link
            href={`/product/${product.id}`}
            className="btn-outline"
            style={{ padding: '9px 6px', fontSize: '0.78rem', whiteSpace: 'nowrap', textAlign: 'center' }}
          >
            詳細を見る
          </Link>

          {/* Official Store Direct Affiliate CTA */}
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '9px 6px', fontSize: '0.78rem', gap: '4px', whiteSpace: 'nowrap' }}
            title={`${product.brand} 公式ストアで見る`}
          >
            公式ストア <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
