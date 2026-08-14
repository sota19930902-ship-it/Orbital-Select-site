'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';

interface PriceTierSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const PriceTierSection: React.FC<PriceTierSectionProps> = ({
  products,
  onSelectProduct,
  onToggleWishlist,
  isInWishlist,
}) => {
  const [activeTier, setActiveTier] = useState<string>('under10');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 40;

  const tiers = [
    { id: 'under10', label: '10万円以下', brandFocus: 'Air Rhizome中心（手頃で高コスパ）', filterFn: (p: Product) => p.price <= 100000 },
    { id: '10to20', label: '10〜20万円', brandFocus: 'FLYMEe / La Vita中心（デザイン照明・家具）', filterFn: (p: Product) => p.price > 100000 && p.price <= 200000 },
    { id: '20to40', label: '20〜40万円', brandFocus: 'ACTUS / FLYMEe中心（上質モダン）', filterFn: (p: Product) => p.price > 200000 && p.price <= 400000 },
    { id: 'over40', label: '40万円以上', brandFocus: 'MASTERWAL / FLYMEe中心（最高峰ラグジュアリー）', filterFn: (p: Product) => p.price > 400000 },
  ];

  const currentTierObj = tiers.find((t) => t.id === activeTier) || tiers[0];
  const tierProducts = products.filter(currentTierObj.filterFn);

  const totalPages = Math.ceil(tierProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTierProducts = tierProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleTierChange = (tierId: string) => {
    setActiveTier(tierId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const elem = document.getElementById('price-tier-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="price-tier-section" style={{ padding: '80px 0', backgroundColor: 'var(--bg-sub)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Price Orbit</span>
          <h2 className="section-title">価格帯ガイド</h2>
          <p className="section-subtitle">
            ご予算に応じて最適なブランド層が明確にわかる価格帯分類ガイド。全{products.length}件中、当価格帯の掲載アイテム: {tierProducts.length}件{totalPages > 1 && ` (ページ ${currentPage} / ${totalPages})`}
          </p>
        </div>

        {/* Tier Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '40px',
        }}>
          {tiers.map((t) => {
            const isActive = t.id === activeTier;
            return (
              <button
                key={t.id}
                onClick={() => handleTierChange(t.id)}
                style={{
                  padding: '20px 16px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--btn-black)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-main)',
                  border: isActive ? '1px solid var(--btn-black)' : '1px solid var(--border-light)',
                  textAlign: 'center',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? 'var(--shadow-subtle)' : 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px' }}>
                  {t.label}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                  {t.brandFocus}
                </div>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '28px',
        }}>
          {paginatedTierProducts.map((product) => (
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
