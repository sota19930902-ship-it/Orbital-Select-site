'use client';

import React from 'react';
import { Compass } from 'lucide-react';
import { CATEGORY_DEFINITIONS } from '@/utils/categoryCounts';
import { ProductCategory } from '@/types';

interface CategoryQuickBarProps {
  onSelectCategory: (category: string) => void;
  activeCategory?: string | null;
  categoryCounts?: Partial<Record<ProductCategory, number>>;
}

export const CategoryQuickBar: React.FC<CategoryQuickBarProps> = ({
  onSelectCategory,
  activeCategory,
  categoryCounts = {},
}) => {
  const categories = CATEGORY_DEFINITIONS.map((cat) => ({
    id: cat.id,
    labelEn: cat.nameEn,
    labelJp: cat.nameJp,
    icon: cat.icon,
    count: categoryCounts[cat.id] || 0,
  }));

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-space)',
        borderBottom: '1px solid rgba(197, 164, 109, 0.18)',
        padding: '24px 0',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={16} color="var(--accent-gold)" />
            <span
              style={{
                fontSize: '0.78rem',
                letterSpacing: '0.14em',
                fontWeight: '600',
                color: 'var(--accent-gold)',
                textTransform: 'uppercase',
              }}
            >
              Category Quick Navigation
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
            タップして該当カテゴリのコレクションへ素早くアクセス
          </span>
        </div>

        {/* Categories Bar / Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px',
          }}
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  backgroundColor: isActive
                    ? 'rgba(197, 164, 109, 0.2)'
                    : 'rgba(255, 255, 255, 0.04)',
                  border: isActive
                    ? '1px solid var(--accent-gold)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  textAlign: 'left',
                  boxShadow: isActive ? '0 0 16px rgba(197, 164, 109, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: isActive
                      ? 'var(--accent-gold)'
                      : 'rgba(197, 164, 109, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={18} color={isActive ? '#0B1020' : 'var(--accent-gold)'} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      color: isActive ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.7)',
                      lineHeight: '1.2',
                    }}
                  >
                    {cat.labelEn}
                  </div>
                  <div
                    style={{
                      fontSize: '0.86rem',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      lineHeight: '1.3',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {cat.labelJp}
                  </div>
                </div>
                {cat.count > 0 && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: isActive ? '#0B1020' : 'var(--accent-gold)',
                      backgroundColor: isActive
                        ? 'var(--accent-gold)'
                        : 'rgba(197, 164, 109, 0.15)',
                      padding: '2px 7px',
                      borderRadius: '10px',
                      fontWeight: '700',
                      flexShrink: 0,
                    }}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
