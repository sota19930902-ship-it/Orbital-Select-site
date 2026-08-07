'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';

interface TasteSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const TasteSection: React.FC<TasteSectionProps> = ({
  products,
  onSelectProduct,
  onToggleWishlist,
  isInWishlist,
}) => {
  const [activeTaste, setActiveTaste] = useState<string>('nordic');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 40;

  const tasteCategories = [
    {
      id: 'nordic',
      title: '北欧・ナチュラル',
      brands: 'ACTUS + La Vita',
      desc: '明るいオーク無垢材とやわらかいファブリックの温もり',
      image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80',
      filterFn: (p: Product) => p.taste === 'nordic',
    },
    {
      id: 'minimal',
      title: 'ミニマル・モダン',
      brands: 'La Vita + FLYMEe',
      desc: '直線的で静寂な美しさ、洗練されたモダンデザイン',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      filterFn: (p: Product) => p.taste === 'minimal',
    },
    {
      id: 'hotel',
      title: 'ホテルライク',
      brands: 'MASTERWAL + La Vita',
      desc: 'モルタル調グレー天板や真鍮照明の高級ホテル空間',
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
      filterFn: (p: Product) => p.taste === 'hotel',
    },
    {
      id: 'vintage',
      title: 'ヴィンテージ・インダストリアル',
      brands: 'MASTERWAL + ACTUS',
      desc: '無骨な鍛鉄アイアン、深みのあるオイルレザー、ウォールナット無垢材',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
      filterFn: (p: Product) => p.taste === 'vintage',
    },
  ];

  const currentTasteObj = tasteCategories.find((t) => t.id === activeTaste) || tasteCategories[0];
  const tasteProducts = products.filter(currentTasteObj.filterFn);

  const totalPages = Math.ceil(tasteProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTasteProducts = tasteProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleTasteChange = (tasteId: string) => {
    setActiveTaste(tasteId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const elem = document.getElementById('taste-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="taste-section" style={{ padding: '80px 0', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Constellation Styles</span>
          <h2 className="section-title">スタイルガイド</h2>
          <p className="section-subtitle">
            お好みのインテリア世界観からぴったりなブランドペアリングを探す。全{products.length}件中、当スタイルの掲載アイテム: {tasteProducts.length}件{totalPages > 1 && ` (ページ ${currentPage} / ${totalPages})`}
          </p>
        </div>

        {/* 4 Large Taste Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '40px',
        }}>
          {tasteCategories.map((t) => {
            const isActive = t.id === activeTaste;
            return (
              <div
                key={t.id}
                onClick={() => handleTasteChange(t.id)}
                className="img-zoom-container"
                style={{
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '4/3',
                  cursor: 'pointer',
                  border: isActive ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                  boxShadow: isActive ? 'var(--shadow-hover)' : 'none',
                }}
              >
                <img
                  src={t.image}
                  alt={t.title}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80';
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: isActive ? 'brightness(0.9)' : 'brightness(0.75)',
                  }}
                />

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(11,16,32,0.85) 0%, transparent 65%)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: '#fff',
                }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent-gold-light)', fontWeight: '600' }}>
                    推奨: {t.brands}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#fff', marginTop: '2px' }}>
                    {t.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Display Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '28px',
        }}>
          {paginatedTasteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
