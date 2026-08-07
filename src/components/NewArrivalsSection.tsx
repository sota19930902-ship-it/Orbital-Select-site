'use client';

import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface NewArrivalsSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
  onSelectProduct,
  onToggleWishlist,
  isInWishlist,
}) => {
  const newArrivals = products.slice(0, 4);

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">New Orbits</span>
          <h2 className="section-title">新着ピックアップ家具</h2>
          <p className="section-subtitle">
            提携5ブランドの最新ラインナップと注目モデル。
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '28px',
        }}>
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
