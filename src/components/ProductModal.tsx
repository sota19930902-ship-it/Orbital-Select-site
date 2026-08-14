'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS, ARTICLES } from '../data/mockData';
import { getAffiliateUrl } from '../config/affiliate';
import { X, Star, Heart, ExternalLink, Check, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onToggleWishlist,
  isInWishlist,
}) => {
  const [selectedImgIdx, setSelectedImgIdx] = useState<number>(0);

  // Reset selected image index when product changes
  useEffect(() => {
    setSelectedImgIdx(0);
  }, [product?.id]);

  // Keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!product || !product.images || product.images.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        setSelectedImgIdx((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedImgIdx((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product]);

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [];
  const currentImage = images[selectedImgIdx] || images[0] || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%231a1a24"/><text x="50%" y="50%" font-family="sans-serif" font-size="16" fill="%23555566" text-anchor="middle" dominant-baseline="middle">NO IMAGE</text></svg>';

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImgIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImgIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const similarProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.priceRangeId === product.priceRangeId)
  ).slice(0, 3);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(11, 16, 32, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        className="fade-in"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '960px',
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          padding: '36px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="モーダルを閉じる"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-sub)',
            color: 'var(--text-sub)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '1px solid var(--border-light)',
            zIndex: 10,
            transition: 'all 0.2s ease',
          }}
        >
          <X size={20} />
        </button>

        {/* 1. UPPER SECTION */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          marginBottom: '40px',
        }}>
          {/* Upper Left: Images Gallery */}
          <div>
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              aspectRatio: '4/3',
              marginBottom: '12px',
              backgroundColor: 'var(--bg-sub)',
              border: '1px solid var(--border-light)',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
            }}>
              <img
                src={currentImage}
                alt={`${product.name} - 画像 ${selectedImgIdx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  transition: 'opacity 0.2s ease',
                }}
              />

              {/* Navigation Arrows for Multiple Images */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    aria-label="前の画像"
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(11, 16, 32, 0.7)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(4px)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(11, 16, 32, 0.9)';
                      e.currentTarget.style.borderColor = 'var(--accent-gold)';
                      e.currentTarget.style.color = 'var(--accent-gold)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(11, 16, 32, 0.7)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={handleNextImage}
                    aria-label="次の画像"
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(11, 16, 32, 0.7)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(4px)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(11, 16, 32, 0.9)';
                      e.currentTarget.style.borderColor = 'var(--accent-gold)';
                      e.currentTarget.style.color = 'var(--accent-gold)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(11, 16, 32, 0.7)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Image Counter Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(11, 16, 32, 0.75)',
                      color: '#F8FAFC',
                      backdropFilter: 'blur(6px)',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      letterSpacing: '0.04em',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    {selectedImgIdx + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  overflowX: 'auto',
                  padding: '4px 2px 6px 2px',
                  scrollbarWidth: 'thin',
                }}
              >
                {images.map((img, idx) => {
                  const isActive = idx === selectedImgIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIdx(idx)}
                      aria-label={`画像 ${idx + 1} を選択`}
                      style={{
                        width: '64px',
                        height: '64px',
                        flexShrink: 0,
                        borderRadius: 'var(--radius-xs)',
                        overflow: 'hidden',
                        border: isActive ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                        boxShadow: isActive ? '0 0 10px rgba(212, 175, 55, 0.45)' : 'none',
                        opacity: isActive ? 1 : 0.65,
                        transform: isActive ? 'scale(1.04)' : 'scale(1)',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        padding: '4px',
                        backgroundColor: 'var(--bg-sub)',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.opacity = '0.9';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.opacity = '0.65';
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upper Right: Basic Info & CTA Button #1 (Top) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="section-tag" style={{ margin: 0, justifyContent: 'flex-start' }}>{product.brand}</span>
              <button
                onClick={() => onToggleWishlist(product)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-sub)',
                  border: '1px solid var(--border-light)',
                  color: isInWishlist ? 'var(--accent-gold)' : 'var(--text-main)',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                }}
              >
                <Heart size={16} color="var(--accent-gold)" fill={isInWishlist ? 'var(--accent-gold)' : 'transparent'} />
                {isInWishlist ? 'In Orbit 保存中' : 'In Orbit 保存'}
              </button>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: '500', color: 'var(--text-main)', lineHeight: '1.35', marginBottom: '8px', wordBreak: 'break-word' }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', color: 'var(--accent-gold)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill={i < Math.floor(product.rating) ? 'var(--accent-gold)' : 'transparent'} />
                ))}
              </div>
              <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{product.rating}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>({product.reviewCount}件の公式ストア購入者レビュー)</span>
            </div>

            <div style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--accent-gold)', marginBottom: '20px' }}>
              ¥{product.price.toLocaleString()} <span style={{ fontSize: '0.8rem', fontWeight: '400', color: 'var(--text-sub)' }}>(税込目安)</span>
            </div>

            {/* CTA Button #1 (Top) */}
            {product.shopLinks.length > 0 && (
              <a
                href={product.shopLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '14px', width: '100%', marginTop: 'auto' }}
              >
                販売サイトを見る（{product.shopLinks[0].label}） <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* 2. MIDDLE SECTION */}
        <div style={{
          paddingTop: '32px',
          borderTop: '1px solid var(--border-light)',
          marginBottom: '40px',
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-main)', marginBottom: '16px' }}>
            商品説明 ＆ 詳細スペック
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-sub)', lineHeight: '1.8', marginBottom: '24px', wordBreak: 'break-word' }}>
            {product.description}
          </p>

          {/* Specs Table & Tags */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              marginBottom: '28px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--bg-space)',
                color: '#FFFFFF',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.82rem',
                fontWeight: '600',
                letterSpacing: '0.04em',
              }}
            >
              <span>スペック・仕様（Specifications）</span>
              <span style={{ color: 'var(--accent-gold)', fontSize: '0.74rem' }}>提携正規パートナー情報</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1px',
                backgroundColor: 'var(--border-light)',
              }}
            >
              {/* 1. カラー / バリエーション */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                  カラー / バリエーション
                </span>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: '500' }}>
                  {product.colors && !['不明', '未記載', '記載なし', '-'].includes(product.colors)
                    ? product.colors
                    : (product.color && !['不明', '未記載', '記載なし', '-'].includes(product.color) ? product.color : '–')}
                </div>
              </div>

              {/* 2. サイズ / 寸法 */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                  サイズ / 寸法
                </span>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: '500' }}>
                  {product.size && product.size !== '-' && product.size !== '–'
                    ? product.size
                    : (product.dimensions && product.dimensions !== '-' && product.dimensions !== '–' ? product.dimensions : '–')}
                </div>
              </div>

              {/* 3. 材質 / 素材 */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                  材質 / 素材
                </span>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: '500' }}>
                  {product.materialText && product.materialText !== '-' && product.materialText !== '–'
                    ? product.materialText
                    : (product.materials && product.materials.length > 0 && product.materials[0] !== '-' ? product.materials.join(' / ') : '–')}
                </div>
              </div>

              {/* 4. ブランド / パートナー */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                  ブランド / 取扱パートナー
                </span>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: '500' }}>
                  {product.brand}
                </div>
              </div>
            </div>
          </div>

          {/* Merits & Demerits */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px' }}>
            <div style={{ backgroundColor: '#F0F9F4', border: '1px solid #C6F6D5', padding: '18px', borderRadius: 'var(--radius-xs)' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#22543D', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={16} color="#22543D" /> メリット（おすすめポイント）
              </h4>
              <ul style={{ paddingLeft: '16px', fontSize: '0.82rem', color: '#276749', lineHeight: '1.7', wordBreak: 'break-word' }}>
                {product.pros.map((p, pIdx) => <li key={pIdx}>{p}</li>)}
              </ul>
            </div>

            <div style={{ backgroundColor: '#FFF5F5', border: '1px solid #FED7D7', padding: '18px', borderRadius: 'var(--radius-xs)' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#9B2C2C', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={16} color="#9B2C2C" /> デメリット（購入前の注意点）
              </h4>
              <ul style={{ paddingLeft: '16px', fontSize: '0.82rem', color: '#9B2C2C', lineHeight: '1.7', wordBreak: 'break-word' }}>
                {product.cons.map((c, cIdx) => <li key={cIdx}>{c}</li>)}
              </ul>
            </div>
          </div>

          {/* Target User */}
          <div style={{
            padding: '16px 20px',
            backgroundColor: 'var(--accent-gold-bg)',
            borderLeft: '4px solid var(--accent-gold)',
            borderRadius: 'var(--radius-xs)',
            marginBottom: '28px',
          }}>
            <strong style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', display: 'block', marginBottom: '4px' }}>
              🎯 こんな方におすすめ
            </strong>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6', wordBreak: 'break-word' }}>
              {product.targetUser}
            </div>
          </div>

          {/* CTA Button #2 (Middle) */}
          {product.shopLinks.length > 0 && (
            <div style={{ textAlign: 'center' }}>
              <a
                href={getAffiliateUrl(product.partnerBrandId, undefined, product.name)}

                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '14px 48px' }}
              >
                販売サイトで在庫状況を見る（{product.shopLinks[0].label}） <ExternalLink size={16} />
              </a>
            </div>
          )}

          {/* CTA Button #3 (Bottom) */}
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--bg-sub)',
            borderRadius: 'var(--radius-sm)',
            textAlign: 'center',
            marginTop: '32px',
            borderTop: '1px solid var(--border-light)',
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-main)', marginBottom: '8px' }}>
              【正規取扱店】各販売サイトで公式最新価格を調べる
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '16px' }}>
              楽天市場・Amazon・ブランド公式サイトでのポイント還元率や在庫を今すぐチェックできます。
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {product.shopLinks.map((shop, sIdx) => (
                <a
                  key={sIdx}
                  href={shop.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: '12px 24px', fontSize: '0.85rem' }}
                >
                  {shop.label} で見る <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
