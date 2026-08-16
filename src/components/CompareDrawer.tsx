'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '../types';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';

interface CompareDrawerProps {
  compareList: Product[];
  onRemoveFromCompare: (productId: string) => void;
  onClearCompare: () => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  compareList,
  onRemoveFromCompare,
  onClearCompare,
}) => {
  if (compareList.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 90,
        backgroundColor: 'var(--bg-space)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--accent-gold-border)',
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4)',
        padding: '16px 24px',
        width: '90%',
        maxWidth: '860px',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-gold-bg)',
            border: '1px solid var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Scale size={18} color="var(--accent-gold)" />
        </div>
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: '600', color: '#FFFFFF' }}>
            製品・ブランド比較 ({compareList.length}/4件)
          </div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.65)' }}>
            選択中の家具を並べて仕様・価格・ブランドの特徴を比較します。
          </div>
        </div>
      </div>

      {/* Selected Products Thumbnails */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {compareList.map((product) => (
          <div
            key={product.id}
            style={{
              position: 'relative',
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: '#FFFFFF',
              overflow: 'hidden',
              border: '1px solid var(--border-light)',
            }}
          >
            <img
              src={product.images && product.images.length > 0 ? product.images[0] : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%231a1a24"/><text x="50%" y="50%" font-family="sans-serif" font-size="16" fill="%23555566" text-anchor="middle" dominant-baseline="middle">NO IMAGE</text></svg>'}
              alt={product.name}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%231a1a24"/><text x="50%" y="50%" font-family="sans-serif" font-size="16" fill="%23555566" text-anchor="middle" dominant-baseline="middle">NO IMAGE</text></svg>';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }}
            />
            <button
              onClick={() => onRemoveFromCompare(product.id)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: '#FFFFFF',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={10} />
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={onClearCompare}
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Trash2 size={13} /> クリア
        </button>

        <Link
          href="/compare"
          className="btn-primary"
          style={{
            padding: '10px 20px',
            fontSize: '0.82rem',
            gap: '6px',
            backgroundColor: 'var(--accent-gold)',
            color: 'var(--bg-space)',
            fontWeight: '600',
          }}
        >
          <span>比較ページを見る</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};
