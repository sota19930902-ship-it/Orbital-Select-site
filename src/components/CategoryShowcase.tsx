'use client';

import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORY_DEFINITIONS } from '../utils/categoryCounts';
import { ArrowRight } from 'lucide-react';

interface CategoryShowcaseProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  onToggleCompare?: (product: Product) => void;
  isInCompare?: (productId: string) => boolean;
  onViewCategoryAll: (categoryKey: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  products,
  onSelectProduct,
  onToggleWishlist,
  isInWishlist,
  onToggleCompare,
  isInCompare,
  onViewCategoryAll,
}) => {
  return (
    <div style={{ backgroundColor: 'var(--bg-main)' }}>
      {CATEGORY_DEFINITIONS.map((catSection, sectionIdx) => {
        const Icon = catSection.icon;
        const allCategoryProducts = products.filter((p) => p.category === catSection.id);
        // Take top 4 diverse representative items
        const top4Products = allCategoryProducts.slice(0, 4);

        if (allCategoryProducts.length === 0) return null;

        const isEven = sectionIdx % 2 === 1;

        return (
          <section
            key={catSection.id}
            id={`category-showcase-${catSection.id}`}
            style={{
              padding: '80px 0',
              backgroundColor: isEven ? 'var(--bg-sub)' : '#FFFFFF',
              borderBottom: '1px solid var(--border-light)',
            }}
          >
            <div className="container">
              {/* Category Showcase Header */}
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
                    <Icon size={15} />
                    <span>{catSection.nameEn}</span>
                  </div>
                  <h2
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: '600',
                      color: 'var(--text-main)',
                      margin: 0,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {catSection.nameJp} コレクション
                  </h2>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', margin: '6px 0 0' }}>
                    {catSection.subtitle}
                  </p>
                </div>

                {/* View All Button */}
                <button
                  onClick={() => onViewCategoryAll(catSection.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(197, 164, 109, 0.1)',
                    border: '1px solid var(--accent-gold)',
                    color: 'var(--accent-gold)',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
                    e.currentTarget.style.color = '#0B1020';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(197, 164, 109, 0.1)';
                    e.currentTarget.style.color = 'var(--accent-gold)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span>{catSection.nameJp} をすべて見る ({allCategoryProducts.length}件)</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* 4 Items Grid (2x2 / 4-card layout) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '28px',
                }}
              >
                {top4Products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                    onToggleWishlist={onToggleWishlist}
                    isInWishlist={isInWishlist(product.id)}
                    onToggleCompare={onToggleCompare}
                    isInCompare={isInCompare ? isInCompare(product.id) : false}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
