'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';
import { PARTNER_BRANDS_INFO, PRODUCTS, VOYAGER_JOURNAL_ARTICLES } from '@/data/mockData';
import { getAffiliateUrl } from '@/config/affiliate';
import { ExternalLink, CheckCircle2, ArrowRight, ShieldCheck, Heart, Sparkles, BookOpen, Layers } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BrandDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const brandId = resolvedParams.id;

  const brand = PARTNER_BRANDS_INFO.find((b) => b.id === brandId);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 40;

  if (!brand) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
        <Header wishlistCount={0} onOpenWishlist={() => {}} />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center' }}>
          <div>
            <Sparkles size={48} style={{ marginBottom: '16px', opacity: 0.4 }} />
            <h1 style={{ marginBottom: '8px' }}>ブランドが見つかりません</h1>
            <p style={{ color: 'var(--text-sub)', marginBottom: '24px' }}>このブランドはスプレッドシートにまだ登録されていません。</p>
            <Link href="/brands" className="btn-primary">ブランド一覧へ戻る</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const brandProducts = PRODUCTS.filter((p) => p.partnerBrandId === brand.id);
  const relatedArticles = VOYAGER_JOURNAL_ARTICLES.filter((a) =>
    a.comparedBrands?.includes(brand.name) || a.tags.includes(brand.name)
  );

  const totalPages = Math.ceil(brandProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = brandProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);



  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const catalogElem = document.getElementById('brand-catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleWishlist = (product: any) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  };

  const isInWishlist = (id: string) => wishlist.some((p) => p.id === id);

  const affiliateUrl = getAffiliateUrl(brand.id, brand.officialUrl);

  const categoryNames: Record<string, string> = {
    sofa: 'ソファ (Sofa)',
    table: 'ダイニングテーブル (Dining Table)',
    chair: 'チェア (Chair)',
    storage: '収納家具 (Storage)',
    lighting: 'インテリア照明 (Lighting)',
    desk: 'デスク (Desk)',
    'tv-board': 'TVボード (TV Board)',
    bed: 'ベッド (Bed)',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <Header wishlistCount={wishlist.length} onOpenWishlist={() => {}} />

      <main style={{ flex: 1 }}>
        {/* Brand Hero Banner */}
        <section
          style={{
            position: 'relative',
            height: '420px',
            backgroundColor: 'var(--bg-space)',
            color: '#FFFFFF',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {brand.heroImage ? (
            <img
              src={brand.heroImage}
              alt={brand.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.35,
              }}
            />
          ) : null}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(11,16,32,0.95) 30%, transparent 100%)',
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ maxWidth: '720px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--accent-gold-bg)',
                  border: '1px solid var(--accent-gold)',
                  color: 'var(--accent-gold)',
                  padding: '4px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  marginBottom: '16px',
                }}
              >
                <ShieldCheck size={14} />
                <span>ORBITAL SELECT 認定パートナー</span>
              </div>

              <h1
                style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  lineHeight: '1.15',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-en)',
                }}
              >
                {brand.name}
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--accent-gold-light)', marginBottom: '16px' }}>
                {brand.jpName} ── {brand.role}
              </p>

              <p style={{ fontSize: '0.94rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.8', marginBottom: '28px' }}>
                {brand.description}
              </p>

              {/* Official Store Affiliate Button */}
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  padding: '14px 32px',
                  fontSize: '0.9rem',
                  backgroundColor: 'var(--accent-gold)',
                  color: 'var(--bg-space)',
                  fontWeight: '600',
                  gap: '8px',
                }}
              >
                <span>{brand.name} 公式ストアを見る</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* 1. Brand Introduction & Philosophy */}
        <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '56px',
                alignItems: 'center',
              }}
            >
              <div>
                <span className="section-tag" style={{ textAlign: 'left', justifyContent: 'flex-start' }}>
                  Brand Philosophy
                </span>
                <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '20px' }}>
                  ブランドの理念と美学
                </h2>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-sub)',
                    lineHeight: '1.95',
                    marginBottom: '28px',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {brand.philosophy}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {brand.features.map((feat, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: 'var(--bg-sub)',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.88rem',
                        fontWeight: '500',
                      }}
                    >
                      <CheckCircle2 size={18} color="var(--accent-gold)" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Difference Point Box */}
              <div
                style={{
                  padding: '40px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-space)',
                  color: '#FFFFFF',
                  border: '1px solid var(--accent-gold-border)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--accent-gold)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  Key Differentiation
                </div>
                <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', fontWeight: '500', marginBottom: '16px' }}>
                  なぜ{brand.name}が選ばれるのか
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.8', marginBottom: '28px' }}>
                  {brand.diffPoint}
                </p>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold-light)', marginBottom: '6px' }}>
                    推奨価格帯 / ASP提携状況
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFFFFF' }}>
                    {brand.priceRangeText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Recommended Users Profile */}
        <section style={{ padding: '64px 0', backgroundColor: 'var(--bg-sub)', borderTop: '1px solid var(--border-light)' }}>
          <div className="container">
            <div className="section-header" style={{ marginBottom: '32px' }}>
              <span className="section-tag">Target Profile</span>
              <h2 className="section-title">こんな方におすすめ</h2>
            </div>

            <div
              style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '32px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--accent-gold-border)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: '1.8', fontWeight: '500' }}>
                「{brand.targetUsers}」
              </p>
            </div>
          </div>
        </section>

        {/* 3. Product Categories Covered */}
        <section style={{ padding: '64px 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            <div className="section-header" style={{ marginBottom: '36px' }}>
              <span className="section-tag">Categories Covered</span>
              <h2 className="section-title">{brand.name} の展開カテゴリー</h2>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              {brand.categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/categories/${cat}`}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-sub)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.88rem',
                    color: 'var(--text-main)',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <Layers size={14} color="var(--accent-gold)" />
                  <span>{categoryNames[cat] || cat}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Product Catalog Grid inside ORBITAL SELECT */}
        <section id="brand-catalog" style={{ padding: '80px 0', backgroundColor: 'var(--bg-sub)' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-tag">ORBITAL SELECT CATALOG</span>
              <h2 className="section-title">{brand.name} 取り扱い全プロダクト一覧</h2>
              <p className="section-subtitle">
                ORBITAL SELECT内で直接探求できる{brand.name}の洗練された全{brandProducts.length}アイテム。
                {totalPages > 1 && ` (ページ ${currentPage} / ${totalPages})`}
              </p>
            </div>

            {brandProducts.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-sub)' }}>
                現在掲載されているアイテムを準備中です。
              </p>
            ) : (
              <>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '28px',
                  }}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onToggleWishlist={handleToggleWishlist}
                      isInWishlist={isInWishlist(product.id)}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </section>



        {/* 5. Related Voyager Journal Articles */}
        {relatedArticles.length > 0 && (
          <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
            <div className="container">
              <div className="section-header">
                <span className="section-tag">Voyager Journal</span>
                <h2 className="section-title">{brand.name} に関する特集記事</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' }}>
                {relatedArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/journal/${article.id}`}
                    style={{
                      backgroundColor: 'var(--bg-sub)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: '1px solid var(--border-light)',
                      textDecoration: 'none',
                    }}
                  >
                    <div style={{ height: '180px', position: 'relative' }}>
                      <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '20px' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: '600' }}>
                        {article.category}
                      </span>
                      <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginTop: '4px', marginBottom: '8px', lineHeight: '1.4' }}>
                        {article.title}
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>{article.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. Reusable Affiliate CTA Banner */}
        <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-space)', color: '#FFFFFF', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '2.2rem', color: '#FFFFFF', fontWeight: '400', marginBottom: '16px' }}>
              {brand.name} 公式ストアでラインナップを探す
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.94rem', marginBottom: '32px', lineHeight: '1.8' }}>
              最新の在庫状況・限定キャンペーン・正確な配送料は公式オンラインストアにてご覧いただけます。
            </p>
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                padding: '16px 40px',
                fontSize: '1rem',
                backgroundColor: 'var(--accent-gold)',
                color: 'var(--bg-space)',
                fontWeight: '600',
                gap: '10px',
              }}
            >
              <span>{brand.name} 公式オンラインストアへ進む</span>
              <ExternalLink size={18} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
