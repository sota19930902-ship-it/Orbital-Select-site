'use client';

import React from 'react';
import { SearchFilters } from '../types';
import { Tag, Compass, Home, ChevronRight } from 'lucide-react';

interface QuickChoiceSectionProps {
  onSelectChoice: (updated: Partial<SearchFilters>) => void;
}

export const QuickChoiceSection: React.FC<QuickChoiceSectionProps> = ({ onSelectChoice }) => {
  const handleChoiceClick = (updated: Partial<SearchFilters>) => {
    onSelectChoice(updated);
    setTimeout(() => {
      const el = document.getElementById('search-filter-section') || document.getElementById('search-result-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <section style={{ padding: '72px 0 56px', backgroundColor: 'var(--bg-main)' }} id="quick-choice-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">QUICK START</span>
          <h2 className="section-title">まずは目的・こだわりから選ぶ（かんたん3ステップ）</h2>
          <p className="section-subtitle">
            気になる「価格帯」「テイスト」「部屋」をタップするだけで、下部の詳細検索エンジンへ自動反映・絞り込みます。
          </p>
        </div>

        {/* 3 Large Choice Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
        }}>
          {/* Card 1: 価格で探す */}
          <div style={{
            backgroundColor: 'var(--bg-sub)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            padding: '32px',
            boxShadow: 'var(--shadow-subtle)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-walnut-bg)',
                border: '1px solid var(--accent-walnut)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Tag size={20} color="var(--accent-walnut)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '500', color: 'var(--text-main)' }}>① 価格で探す</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>ご予算に合わせて探す</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'under10', label: '〜10万円', brand: 'Air Rhizome / FLYMEe（手頃で高コスパ）' },
                { id: '10to20', label: '10〜20万円', brand: 'FLYMEe / La Vita（デザイン照明・チェア）' },
                { id: '20to40', label: '20〜40万円', brand: 'MASTERWAL / FLYMEe（上質無垢モダン）' },
                { id: 'over40', label: '40万円以上', brand: 'MASTERWAL / FLYMEe（最高峰ラグジュアリー）' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleChoiceClick({ priceRange: item.id })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                    textAlign: 'left',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-walnut)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>{item.label}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>{item.brand}</span>
                  </div>
                  <ChevronRight size={16} color="var(--text-sub)" />
                </button>
              ))}
            </div>
          </div>

          {/* Card 2: テイストで探す */}
          <div style={{
            backgroundColor: 'var(--bg-sub)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            padding: '32px',
            boxShadow: 'var(--shadow-subtle)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-walnut-bg)',
                border: '1px solid var(--accent-walnut)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Compass size={20} color="var(--accent-walnut)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '500', color: 'var(--text-main)' }}>② テイストで探す</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>理想のインテリアスタイルから</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'nordic', label: '北欧・ナチュラル', brand: 'La Vita + FLYMEe（名作照明・無垢）' },
                { id: 'minimal', label: 'ミニマル・モダン', brand: 'MASTERWAL + FLYMEe（直線美・上質）' },
                { id: 'hotel', label: 'ホテルライク', brand: 'MASTERWAL + La Vita（高級感・洗練）' },
                { id: 'vintage', label: 'ヴィンテージ・インダストリアル', brand: 'FLYMEe + MASTERWAL（アイアン・レザー）' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleChoiceClick({ taste: item.id })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                    textAlign: 'left',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-walnut)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>{item.label}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>{item.brand}</span>
                  </div>
                  <ChevronRight size={16} color="var(--text-sub)" />
                </button>
              ))}
            </div>
          </div>

          {/* Card 3: 部屋で探す */}
          <div style={{
            backgroundColor: 'var(--bg-sub)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            padding: '32px',
            boxShadow: 'var(--shadow-subtle)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-walnut-bg)',
                border: '1px solid var(--accent-walnut)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Home size={20} color="var(--accent-walnut)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '500', color: 'var(--text-main)' }}>③ 部屋で探す</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>配置するお部屋空間から</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'living', label: 'リビング', desc: 'ソファ / ローテーブル / ラック' },
                { id: 'dining', label: 'ダイニング', desc: 'ダイニングテーブル / チェア / ペンダント照明' },
                { id: 'bedroom', label: '寝室', desc: 'ベッド / ナイトテーブル / スタンド照明' },
                { id: 'study', label: '書斎・デスクワーク', desc: 'デスク / ワーキングチェア / キャビネット' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleChoiceClick({ room: item.id })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                    textAlign: 'left',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-walnut)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>{item.label}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>{item.desc}</span>
                  </div>
                  <ChevronRight size={16} color="var(--text-sub)" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
