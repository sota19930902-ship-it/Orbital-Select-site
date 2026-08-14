'use client';

import React from 'react';
import { SearchFilters } from '../types';
import { Tag, Compass, Home, ChevronRight } from 'lucide-react';

interface QuickChoiceSectionProps {
  onSelectChoice: (updated: Partial<SearchFilters>) => void;
}

export const QuickChoiceSection: React.FC<QuickChoiceSectionProps> = ({ onSelectChoice }) => {
  return (
    <section style={{ padding: '72px 0 56px', backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">GUIDED NAVIGATION</span>
          <h2 className="section-title">まず何を重視しますか？</h2>
          <p className="section-subtitle">
            ブランド名を知らなくても安心。
            <br />
            ご希望の「価格」「テイスト」「部屋」から直感的に絞り込めます。
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
                <h3 style={{ fontSize: '1.2rem', fontWeight: '500', color: 'var(--text-main)' }}>価格で探す</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>ご予算に合わせて探す</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'under10', label: '〜10万円', brand: 'Air Rhizome中心（手頃で高コスパ）' },
                { id: '10to20', label: '10〜20万円', brand: 'FLYMEe / La Vita（デザイン照明・家具）' },
                { id: '20to40', label: '20〜40万円', brand: 'ACTUS / FLYMEe（上質モダン）' },
                { id: 'over40', label: '40万円以上', brand: 'MASTERWAL / FLYMEe（最高峰ラグジュアリー）' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectChoice({ priceRange: item.id })}
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
                <h3 style={{ fontSize: '1.2rem', fontWeight: '500', color: 'var(--text-main)' }}>テイストで探す</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>理想のインテリアスタイルから</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'nordic', label: '北欧・ナチュラル', brand: 'ACTUS + Air Rhizome' },
                { id: 'minimal', label: 'ミニマル・モダン', brand: 'MASTERWAL + FLYMEe' },
                { id: 'hotel', label: 'ホテルライク', brand: 'FLYMEe + La Vita' },
                { id: 'vintage', label: 'ヴィンテージ・インダストリアル', brand: 'FLYMEe + MASTERWAL' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectChoice({ taste: item.id })}
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
                <h3 style={{ fontSize: '1.2rem', fontWeight: '500', color: 'var(--text-main)' }}>部屋で探す</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>配置するお部屋空間から</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'living', label: 'リビング', desc: 'ソファ / ローテーブル / ラック' },
                { id: 'dining', label: 'ダイニング', desc: 'ダイニングセット / ペンダント照明' },
                { id: 'bedroom', label: '寝室', desc: 'ベッド / ナイトテーブル / ラグ' },
                { id: 'study', label: '書斎・デスクワーク', desc: 'デスク / ワーキングチェア / キャビネット' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectChoice({ room: item.id })}
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
