'use client';

import React from 'react';
import { Armchair, LayoutGrid, Monitor, Box, Lightbulb, Compass, Bed } from 'lucide-react';

interface CategoryQuickBarProps {
  onSelectCategory: (category: string) => void;
  activeCategory?: string | null;
  categoryCounts?: Record<string, number>;
}

export const CategoryQuickBar: React.FC<CategoryQuickBarProps> = ({
  onSelectCategory,
  activeCategory,
  categoryCounts = {
    table: 0,
    chair: 0,
    desk: 0,
    sofa: 0,
    lighting: 0,
    storage: 0,
    bed: 0,
  },
}) => {
  const categories = [
    {
      id: 'sofa',
      labelEn: 'SOFA',
      labelJp: 'ソファ',
      icon: Armchair,
      count: categoryCounts.sofa || 0,
    },
    {
      id: 'chair',
      labelEn: 'CHAIR',
      labelJp: 'チェア・椅子',
      icon: Armchair,
      count: categoryCounts.chair || 0,
    },
    {
      id: 'table',
      labelEn: 'TABLE',
      labelJp: 'テーブル',
      icon: LayoutGrid,
      count: categoryCounts.table || 0,
    },
    {
      id: 'desk',
      labelEn: 'DESK',
      labelJp: 'デスク・机',
      icon: Monitor,
      count: categoryCounts.desk || 0,
    },
    {
      id: 'storage',
      labelEn: 'STORAGE',
      labelJp: '収納・シェルフ',
      icon: Box,
      count: categoryCounts.storage || 0,
    },
    {
      id: 'bed',
      labelEn: 'BED',
      labelJp: 'ベッド・寝具',
      icon: Bed,
      count: categoryCounts.bed || 0,
    },
    {
      id: 'lighting',
      labelEn: 'LIGHTING',
      labelJp: '照明・ランプ',
      icon: Lightbulb,
      count: categoryCounts.lighting || 0,
    },
  ];

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
