'use client';

import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, Compass } from 'lucide-react';

interface EditorsPicksSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const EditorsPicksSection: React.FC<EditorsPicksSectionProps> = ({
  products,
  onSelectProduct,
  onToggleWishlist,
  isInWishlist,
}) => {
  const editorsPicks = products.filter((p) => p.isEditorsPick).slice(0, 4);

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} color="var(--accent-gold)" /> Flyby Picks
          </span>
          <h2 className="section-title">編集部おすすめ家具セレクション</h2>
          <p className="section-subtitle">
            暮らしに静かな美しさをもたらす、タイムレスで愛される名作インテリアをキュレーション。
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '28px',
        }}>
          {editorsPicks.map((product) => (
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
