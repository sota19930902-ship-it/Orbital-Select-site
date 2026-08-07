'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { Pagination } from '@/components/Pagination';
import { PRODUCTS } from '@/data/mockData';
import { Product, ProductCategory } from '@/types';
import { ChevronRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CategoryDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const categoryId = resolvedParams.id as ProductCategory;

  const categoryTitles: Record<string, { title: string; en: string; desc: string }> = {
    sofa: { title: 'ソファ', en: 'Sofa Collection', desc: 'ローソファ、カウチ、オイルレザー、最高級無垢材フレームソファまで徹底比較。' },
    table: { title: 'ダイニングテーブル', en: 'Dining Table Collection', desc: 'ウォールナット無垢材天板、モルタル調天板、1cm単位サイズオーダーテーブル。' },
    chair: { title: 'チェア', en: 'Chair Collection', desc: 'ダイニングチェア、デスクチェア、ラウンジチェアの厳選ラインナップ。' },
    storage: { title: '収納家具', en: 'Storage Collection', desc: '生活感を美しく隠すサイドボード、シェルフ、キャビネット。' },
    lighting: { title: 'インテリア照明', en: 'Lighting Collection', desc: 'ルイスポールセンPH5等の北欧名作照明から多機能スポットライトまで。' },
    desk: { title: 'デスク', en: 'Desk Collection', desc: 'ワークスペースの質を高めるカスタマイズデスクとシンプルデスク。' },
    'tv-board': { title: 'TVボード', en: 'TV Board Collection', desc: 'ロータイプの美しいテレビ台とモルタル調AVボード。' },
    bed: { title: 'ベッド', en: 'Bed Frame Collection', desc: 'お部屋を広く見せるフロアローベッドと天然木ベッドフレーム。' },
  };

  const categoryList = [
    { id: 'sofa', name: 'ソファ' },
    { id: 'table', name: 'ダイニングテーブル' },
    { id: 'chair', name: 'チェア' },
    { id: 'lighting', name: '照明' },
    { id: 'storage', name: '収納' },
    { id: 'desk', name: 'デスク' },
    { id: 'tv-board', name: 'TVボード' },
    { id: 'bed', name: 'ベッド' },
  ];

  const info = categoryTitles[categoryId] || { title: categoryId, en: categoryId, desc: '厳選プロダクト一覧' };
  const products = PRODUCTS.filter((p) => p.category === categoryId);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 40;

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const elem = document.getElementById('category-products-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleWishlist = (p: Product) => {
    setWishlist((prev) => (prev.some((item) => item.id === p.id) ? prev.filter((item) => item.id !== p.id) : [...prev, p]));
  };

  const isInWishlist = (id: string) => wishlist.some((item) => item.id === id);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)', paddingTop: '108px' }}>

      <Header wishlistCount={wishlist.length} onOpenWishlist={() => {}} />

      <main style={{ flex: 1 }}>
        {/* Category Header Hero */}
        <section style={{ backgroundColor: 'var(--bg-space)', color: '#FFFFFF', padding: '72px 0 54px', textAlign: 'center' }}>
          <div className="container">
            <span className="section-tag" style={{ color: 'var(--accent-gold)' }}>{info.en}</span>
            <h1 className="section-title" style={{ color: '#FFFFFF', fontSize: '2.4rem', marginBottom: '12px' }}>{info.title}</h1>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '640px', margin: '0 auto 28px' }}>{info.desc}</p>

            {/* Category Navigation Pills */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
              {categoryList.map((cat) => {
                const isActive = cat.id === categoryId;
                return (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.id}`}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.82rem',
                      fontWeight: isActive ? '600' : '400',
                      backgroundColor: isActive ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.08)',
                      color: isActive ? 'var(--bg-space)' : '#FFFFFF',
                      border: isActive ? '1px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.15)',
                      textDecoration: 'none',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Product Grid - ONLY products matching this category */}
        <section id="category-products-section" style={{ padding: '64px 0' }}>
          <div className="container">
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '500', color: 'var(--text-main)' }}>
                {info.title}の製品一覧 ({products.length}件)
                {totalPages > 1 && ` - ページ ${currentPage} / ${totalPages}`}
              </h2>
            </div>

            {products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-sub)' }}>
                現在このカテゴリーの追加アイテムを準備中です。
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelectProduct={(p) => setSelectedProduct(p)}
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
      </main>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={selectedProduct ? isInWishlist(selectedProduct.id) : false}
      />

      <Footer />
    </div>
  );
}
