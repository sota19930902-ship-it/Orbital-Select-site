'use client';

import React from 'react';
import { SearchFilters } from '../types';
import { PARTNER_BRANDS_INFO } from '../data/mockData';
import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react';

interface SearchSectionProps {
  filters: SearchFilters;
  onFilterChange: (updated: Partial<SearchFilters>) => void;
  onResetFilters: () => void;
  onExecuteSearch: () => void;
  resultCount: number;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  onExecuteSearch,
  resultCount,
}) => {
  return (
    <section style={{
      padding: '44px 0',
      backgroundColor: 'var(--bg-sub)',
      borderBottom: '1px solid var(--border-light)',
    }} id="search-section">
      <div className="container">
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          padding: '32px',
          boxShadow: 'var(--shadow-subtle)',
        }}>
          {/* Header Tag */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={18} color="var(--accent-gold)" />
              <h2 style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-main)' }}>
                条件を指定して家具を探す（10項目詳細検索）
              </h2>
            </div>
            <button
              onClick={onResetFilters}
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-sub)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <RefreshCw size={14} /> 条件リセット
            </button>
          </div>

          {/* Grid of 10 Filters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}>
            {/* 1. Keyword search */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-sub)', marginBottom: '6px', display: 'block' }}>
                ① フリーワード検索
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="例：ウォールナット, デニッシュソファ, MASTERWAL..."
                  value={filters.query}
                  onChange={(e) => onFilterChange({ query: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 36px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-light)',
                    fontSize: '0.88rem',
                    color: 'var(--text-main)',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                  }}
                />
                <Search size={16} color="var(--text-muted)" style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }} />
              </div>
            </div>

            {/* 2. Category */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-sub)', marginBottom: '6px', display: 'block' }}>
                ② カテゴリー
              </label>
              <select
                value={filters.category}
                onChange={(e) => {
                  const val = e.target.value;
                  onFilterChange({ category: val });
                  if (val !== 'all') {
                    window.location.href = `/categories/${val}`;
                  }
                }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                <option value="all">すべてのカテゴリー</option>
                <option value="sofa">ソファ</option>
                <option value="table">ダイニングテーブル</option>
                <option value="chair">チェア</option>
                <option value="lighting">照明</option>
                <option value="storage">収納</option>
                <option value="desk">デスク</option>
                <option value="tv-board">TVボード</option>
                <option value="bed">ベッド</option>
              </select>
            </div>


            {/* 3. Brand */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-sub)', marginBottom: '6px', display: 'block' }}>
                ③ 提携ブランド
              </label>
              <select
                value={filters.brand}
                onChange={(e) => onFilterChange({ brand: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                <option value="all">全パートナーブランドから探す</option>
                {PARTNER_BRANDS_INFO.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}（{b.taste || b.role}）
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Price range */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-sub)', marginBottom: '6px', display: 'block' }}>
                ④ 価格帯
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => onFilterChange({ priceRange: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                <option value="all">すべての価格帯</option>
                <option value="under10">〜10万円（Air Rhizome中心）</option>
                <option value="10to20">10〜20万円（FLYMEe / La Vita中心）</option>
                <option value="20to40">20〜40万円（MASTERWAL / ACTUS中心）</option>
                <option value="over40">40万円以上（MASTERWAL / FLYMEe中心）</option>
              </select>
            </div>

            {/* 5. Taste */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-sub)', marginBottom: '6px', display: 'block' }}>
                ⑤ テイスト
              </label>
              <select
                value={filters.taste}
                onChange={(e) => onFilterChange({ taste: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                <option value="all">すべてのテイスト</option>
                <option value="nordic">北欧・ナチュラル</option>
                <option value="minimal">ミニマル・モダン</option>
                <option value="hotel">ホテルライク</option>
                <option value="vintage">ヴィンテージ・インダストリアル</option>
              </select>
            </div>

            {/* 6. Room */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-sub)', marginBottom: '6px', display: 'block' }}>
                ⑥ 部屋
              </label>
              <select
                value={filters.room}
                onChange={(e) => onFilterChange({ room: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                <option value="all">すべての部屋</option>
                <option value="living">リビング</option>
                <option value="dining">ダイニング</option>
                <option value="bedroom">寝室</option>
                <option value="study">書斎・デスクワーク</option>
              </select>
            </div>

            {/* 7. Material */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-sub)', marginBottom: '6px', display: 'block' }}>
                ⑦ 素材
              </label>
              <select
                value={filters.material}
                onChange={(e) => onFilterChange({ material: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                <option value="all">すべての素材</option>
                <option value="leather">本革オイルレザー</option>
                <option value="oak">オーク無垢材</option>
                <option value="mortar">モルタル調・モールテックス</option>
                <option value="iron">鍛鉄アイアン</option>
                <option value="walnut">ウォールナット</option>
              </select>
            </div>

            {/* 8. Size */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-sub)', marginBottom: '6px', display: 'block' }}>
                ⑧ サイズ
              </label>
              <select
                value={filters.size}
                onChange={(e) => onFilterChange({ size: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                <option value="all">すべてのサイズ</option>
                <option value="compact">コンパクト（一人暮らし）</option>
                <option value="middle">ミドル（2〜3人掛け）</option>
                <option value="large">大型（ファミリー）</option>
                <option value="custom">1cm単位サイズオーダー</option>
              </select>
            </div>

            {/* 9. Color */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-sub)', marginBottom: '6px', display: 'block' }}>
                ⑨ カラー
              </label>
              <select
                value={filters.color}
                onChange={(e) => onFilterChange({ color: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                <option value="all">すべてのカラー</option>
                <option value="camel">キャメル / ブラウン</option>
                <option value="gray">モルタルグレー</option>
                <option value="black">ブラック</option>
                <option value="natural">ナチュラルオーク</option>
              </select>
            </div>

            {/* 10. Sort */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-sub)', marginBottom: '6px', display: 'block' }}>
                ⑩ 並び替え
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              >
                <option value="popular">人気順（おすすめ）</option>
                <option value="price-low">価格が安い順</option>
                <option value="price-high">価格が高い順</option>
                <option value="rating">評価（★）が高い順</option>
              </select>
            </div>
          </div>

          {/* Search Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
              該当商品: <strong style={{ color: 'var(--accent-gold)', fontSize: '1.2rem' }}>{resultCount}</strong> 件
            </div>

            <button
              onClick={onExecuteSearch}
              className="btn-primary"
              style={{ padding: '14px 48px', fontSize: '0.92rem' }}
            >
              <Search size={16} /> この条件で家具を比較検索する
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
