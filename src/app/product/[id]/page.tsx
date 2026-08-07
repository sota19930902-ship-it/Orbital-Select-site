'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { ProductCard } from '../../../components/ProductCard';
import { PRODUCTS, VOYAGER_JOURNAL_ARTICLES, PARTNER_BRANDS_INFO } from '../../../data/mockData';
import { getAffiliateUrl } from '../../../config/affiliate';
import { Star, ExternalLink, ShieldCheck, CheckCircle2, ArrowRight, Layers, Heart, Scale } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const brandInfo = PARTNER_BRANDS_INFO.find((b) => b.id === product.partnerBrandId);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [wishlist, setWishlist] = useState<any[]>([]);

  const affiliateUrl = getAffiliateUrl(product.partnerBrandId, undefined, product.name);



  // Similar Products
  const similarProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.partnerBrandId === product.partnerBrandId)
  ).slice(0, 4);

  // Related Articles
  const relatedArticles = VOYAGER_JOURNAL_ARTICLES.filter(
    (a) => a.comparedBrands?.includes(product.brand) || a.tags.some((t) => product.tags.includes(t))
  );

  const handleToggleWishlist = (p: any) => {
    setWishlist((prev) => (prev.some((item) => item.id === p.id) ? prev.filter((item) => item.id !== p.id) : [...prev, p]));
  };

  const isInWishlist = (id: string) => wishlist.some((item) => item.id === id);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <Header wishlistCount={wishlist.length} onOpenWishlist={() => {}} />

      <main style={{ flex: 1, padding: '40px 0 80px' }}>
        <div className="container">
          {/* Breadcrumb Navigation */}
          <div style={{ fontSize: '0.82rem', color: 'var(--text-sub)', marginBottom: '28px', display: 'flex', gap: '8px' }}>
            <Link href="/" style={{ color: 'var(--text-sub)' }}>TOP</Link>
            <span>/</span>
            <Link href="/categories" style={{ color: 'var(--text-sub)' }}>{product.category}</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>{product.name}</span>
          </div>

          {/* Top Main Product Grid (Gallery + Details) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: '48px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              padding: '36px',
              boxShadow: 'var(--shadow-subtle)',
              marginBottom: '64px',
            }}
          >
            {/* Gallery Column */}
            <div>
              <div
                style={{
                  aspectRatio: '4/3',
                  backgroundColor: 'var(--bg-sub)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '16px',
                  border: '1px solid var(--border-light)',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={product.images && product.images.length > 0 ? (product.images[activeImageIdx] || product.images[0]) : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%231a1a24"/><text x="50%" y="50%" font-family="sans-serif" font-size="16" fill="%23555566" text-anchor="middle" dominant-baseline="middle">NO IMAGE</text></svg>'}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: 'var(--radius-xs)',
                        border: activeImageIdx === idx ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                        overflow: 'hidden',
                        backgroundColor: 'var(--bg-sub)',
                        padding: '4px',
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Link
                  href={`/brands/${product.partnerBrandId}`}
                  style={{
                    backgroundColor: 'var(--bg-space)',
                    color: '#FFFFFF',
                    fontSize: '0.76rem',
                    fontWeight: '600',
                    padding: '3px 12px',
                    borderRadius: 'var(--radius-xs)',
                    textDecoration: 'none',
                  }}
                >
                  {product.brand}
                </Link>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: '600' }}>
                  カテゴリー: {product.category.toUpperCase()}
                </span>
              </div>

              <h1 style={{ fontSize: '1.8rem', fontWeight: '500', color: 'var(--text-main)', lineHeight: '1.35', marginBottom: '8px' }}>
                {product.name}
              </h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', marginBottom: '16px' }}>
                {product.subtitle}
              </p>

              {/* Price & Rating */}
              <div style={{ padding: '16px 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', marginBottom: '20px' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--accent-gold)' }}>
                  ¥{product.price.toLocaleString()}{' '}
                  <span style={{ fontSize: '0.85rem', fontWeight: '400', color: 'var(--text-sub)' }}>(税込目安)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <div style={{ display: 'flex', color: 'var(--accent-gold)' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'var(--accent-gold)' : 'transparent'} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{product.rating} / 5.0</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({product.reviewCount}件の公式ストア購入者評価)</span>
                </div>
              </div>

              {/* Quick Specs Overview */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px', fontSize: '0.85rem' }}>
                <div style={{ backgroundColor: 'var(--bg-sub)', padding: '10px 14px', borderRadius: 'var(--radius-xs)' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem' }}>サイズ (Size)</span>
                  <strong style={{ color: 'var(--text-main)' }}>{product.dimensions}</strong>
                </div>
                <div style={{ backgroundColor: 'var(--bg-sub)', padding: '10px 14px', borderRadius: 'var(--radius-xs)' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem' }}>カラー (Color)</span>
                  <strong style={{ color: 'var(--text-main)' }}>{product.color}</strong>
                </div>
                <div style={{ backgroundColor: 'var(--bg-sub)', padding: '10px 14px', borderRadius: 'var(--radius-xs)', gridColumn: 'span 2' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem' }}>主要素材 (Material)</span>
                  <strong style={{ color: 'var(--text-main)' }}>{product.materials.join(' / ')}</strong>
                </div>
              </div>

              {/* Editorial Comment */}
              <div style={{ padding: '16px', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--accent-gold-bg)', border: '1px solid var(--accent-gold-border)', marginBottom: '24px' }}>
                <div style={{ fontSize: '0.76rem', color: 'var(--accent-gold)', fontWeight: '600', marginBottom: '4px', letterSpacing: '0.08em' }}>
                  ORBITAL SELECT EDITORIAL NOTE
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: '1.75' }}>
                  {product.editorialComment}
                </p>
              </div>

              {/* Main Affiliate CTA Buttons */}
              <div style={{ marginTop: 'auto', display: 'flex', gap: '14px' }}>
                <button
                  onClick={() => handleToggleWishlist(product)}
                  className="btn-outline"
                  style={{ padding: '14px 20px', gap: '6px' }}
                >
                  <Star size={16} color="var(--accent-gold)" fill={isInWishlist(product.id) ? 'var(--accent-gold)' : 'transparent'} />
                  <span>お気に入り</span>
                </button>

                {/* Reusable Affiliate CTA Button */}
                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ flex: 1, padding: '14px 24px', fontSize: '0.92rem', gap: '8px', backgroundColor: 'var(--accent-gold)', color: 'var(--bg-space)', fontWeight: '600' }}
                >
                  <span>{product.brand} 公式ストアで在庫を見る</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Full Specifications Section */}
          <section style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid var(--accent-gold)' }}>
              詳細仕様・スペック (Specifications)
            </h2>
            <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', width: '200px', backgroundColor: 'var(--bg-sub)', color: 'var(--text-sub)' }}>製品名</th>
                    <td style={{ padding: '12px' }}>{product.name}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', backgroundColor: 'var(--bg-sub)', color: 'var(--text-sub)' }}>ブランド</th>
                    <td style={{ padding: '12px' }}>{product.brand}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', backgroundColor: 'var(--bg-sub)', color: 'var(--text-sub)' }}>寸法 (サイズ)</th>
                    <td style={{ padding: '12px' }}>{product.dimensions}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', backgroundColor: 'var(--bg-sub)', color: 'var(--text-sub)' }}>素材</th>
                    <td style={{ padding: '12px' }}>{product.materials.join('、')}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', backgroundColor: 'var(--bg-sub)', color: 'var(--text-sub)' }}>カラー展開</th>
                    <td style={{ padding: '12px' }}>{product.color}</td>
                  </tr>
                  <tr>
                    <th style={{ padding: '12px', textAlign: 'left', backgroundColor: 'var(--bg-sub)', color: 'var(--text-sub)' }}>ターゲットユーザー</th>
                    <td style={{ padding: '12px' }}>{product.targetUser}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>



          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section>
              <div className="section-header">
                <span className="section-tag">Related Articles</span>
                <h2 className="section-title">このアイテムが登場する特集記事</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {relatedArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/journal/${article.id}`}
                    style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-light)', textDecoration: 'none' }}
                  >
                    <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: '600' }}>{article.category}</span>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginTop: '4px', marginBottom: '8px' }}>{article.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>{article.summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
