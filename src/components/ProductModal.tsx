'use client';

import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS, ARTICLES } from '../data/mockData';
import { getAffiliateUrl } from '../config/affiliate';
import { X, Star, Heart, ExternalLink, Check, AlertCircle } from 'lucide-react';


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

  if (!product) return null;

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
            zIndex: 10,
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
          {/* Upper Left: Images (Contain mode so full furniture is displayed without clipping) */}
          <div>
            <div style={{
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              aspectRatio: '4/3',
              marginBottom: '12px',
              backgroundColor: 'var(--bg-sub)',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img
                src={product.images && product.images.length > 0 ? (product.images[selectedImgIdx] || product.images[0]) : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%231a1a24"/><text x="50%" y="50%" font-family="sans-serif" font-size="16" fill="%23555566" text-anchor="middle" dominant-baseline="middle">NO IMAGE</text></svg>'}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
            </div>

            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-xs)',
                      overflow: 'hidden',
                      border: idx === selectedImgIdx ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                      padding: '4px',
                      backgroundColor: 'var(--bg-sub)',
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </button>
                ))}
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

          {/* Specs Table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px 24px',
            backgroundColor: 'var(--bg-sub)',
            padding: '20px',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.85rem',
            marginBottom: '28px',
          }}>
            <div><strong style={{ color: 'var(--text-main)' }}>サイズ:</strong> {product.dimensions}</div>
            <div><strong style={{ color: 'var(--text-main)' }}>カラー:</strong> {product.color}</div>
            <div><strong style={{ color: 'var(--text-main)' }}>素材:</strong> {product.materials.join(' / ')}</div>
            <div><strong style={{ color: 'var(--text-main)' }}>ブランド:</strong> {product.brand}</div>
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
