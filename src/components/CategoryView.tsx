'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Pagination } from './Pagination';
import { ArrowLeft, SlidersHorizontal, Armchair, LayoutGrid, Monitor, Box, Lightbulb, Sparkles, RefreshCw } from 'lucide-react';
import { PARTNER_BRANDS_INFO } from '../data/mockData';

interface CategoryViewProps {
  categoryKey: string;
  products: Product[];
  onBackToHub: () => void;
  onSelectCategory: (catKey: string) => void;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  onToggleCompare?: (product: Product) => void;
  isInCompare?: (productId: string) => boolean;
}

const CATEGORY_METADATA: Record<
  string,
  {
    nameEn: string;
    nameJp: string;
    description: string;
    icon: React.ElementType;
  }
> = {
  sofa: {
    nameEn: 'SOFA & LOUNGE',
    nameJp: 'ソファ・ラウンジチェア',
    description: '空間の主役となる、至高の座り心地とプロポーションを誇る厳選ソファ。',
    icon: Armchair,
  },
  chair: {
    nameEn: 'CHAIR & STOOL',
    nameJp: 'チェア・椅子・スツール',
    description: '名作のシルエットと無垢の肌触りが響き合うアイコニックな椅子。',
    icon: Armchair,
  },
  table: {
    nameEn: 'DINING & LOW TABLE',
    nameJp: 'ダイニングテーブル・ローテーブル',
    description: '最高峰ウォールナット無垢材とアイアン脚が織りなす上質な食卓。',
    icon: LayoutGrid,
  },
  desk: {
    nameEn: 'DESK & WORKSPACE',
    nameJp: 'デスク・ワークスペース',
    description: '洗練された機能美と木の温もりで、創造性を高めるワークデスク。',
    icon: Monitor,
  },
  storage: {
    nameEn: 'STORAGE & SHELVES',
    nameJp: '収納・シェルフ・キャビネット',
    description: '美しく魅せる収納。空間を端正に整えるキャビネット＆シェルフ。',
    icon: Box,
  },
  lighting: {
    nameEn: 'LIGHTING & LAMPS',
    nameJp: '照明・ペンダント・フロアランプ',
    description: '北欧デザインの巨匠が生んだ、光の彫刻と空間を彩る名作照明。',
    icon: Lightbulb,
  },
};

const ITEMS_PER_PAGE = 24;

export const CategoryView: React.FC<CategoryViewProps> = ({
  categoryKey,
  products,
  onBackToHub,
  onSelectCategory,
  onSelectProduct,
  onToggleWishlist,
  isInWishlist,
  onToggleCompare,
  isInCompare,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');

  const meta = CATEGORY_METADATA[categoryKey] || {
    nameEn: `${categoryKey.toUpperCase()} COLLECTION`,
    nameJp: `${categoryKey}`,
    description: '厳選されたインテリア家具コレクション',
    icon: Sparkles,
  };
  const Icon = meta.icon;

  // Filter products by category
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category === categoryKey);
  }, [products, categoryKey]);

  // Apply Brand & Price Filters & Sorting
  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    // Brand filter
    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.partnerBrandId === selectedBrand);
    }

    // Price range filter
    if (selectedPriceRange === 'under10') {
      result = result.filter((p) => p.price < 100000);
    } else if (selectedPriceRange === '10to20') {
      result = result.filter((p) => p.price >= 100000 && p.price < 200000);
    } else if (selectedPriceRange === '20to40') {
      result = result.filter((p) => p.price >= 200000 && p.price < 400000);
    } else if (selectedPriceRange === 'over40') {
      result = result.filter((p) => p.price >= 400000);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Popular (rating * 100 + reviews * 2)
      result.sort((a, b) => {
        const scoreA = (a.rating * 100) + (a.reviewCount * 2);
        const scoreB = (b.rating * 100) + (b.reviewCount * 2);
        return scoreB - scoreA;
      });
    }

    return result;
  }, [categoryProducts, selectedBrand, selectedPriceRange, sortBy]);

  // Pagination calculations (24 items per page)
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSelectedBrand('all');
    setSelectedPriceRange('all');
    setSortBy('popular');
    setCurrentPage(1);
  };

  const categoryTabList = [
    { id: 'sofa', label: 'ソファ' },
    { id: 'chair', label: 'チェア' },
    { id: 'table', label: 'テーブル' },
    { id: 'desk', label: 'デスク' },
    { id: 'lighting', label: '照明' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Category Header Hero */}
      <div
        style={{
          backgroundColor: 'var(--bg-space)',
          color: '#FFFFFF',
          padding: '48px 0 36px',
          borderBottom: '1px solid rgba(197, 164, 109, 0.25)',
        }}
      >
        <div className="container">
          {/* Back button & Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <button
              onClick={onBackToHub}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(197, 164, 109, 0.3)',
                color: 'var(--accent-gold)',
                fontSize: '0.84rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
                e.currentTarget.style.color = '#0B1020';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = 'var(--accent-gold)';
              }}
            >
              <ArrowLeft size={16} />
              <span>← ショーウィンドウ（トップ）に戻る</span>
            </button>

            <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.5)' }}>
              / カテゴリ一覧 / {meta.nameJp}
            </span>
          </div>

          {/* Title Area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
                backgroundColor: 'rgba(197, 164, 109, 0.18)',
                border: '1px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon size={26} color="var(--accent-gold)" />
            </div>
            <div>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  letterSpacing: '0.14em',
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                }}
              >
                {meta.nameEn}
              </div>
              <h1
                style={{
                  fontSize: '2.2rem',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  margin: '4px 0 0',
                  letterSpacing: '-0.01em',
                }}
              >
                {meta.nameJp}{' '}
                <span style={{ fontSize: '1.3rem', color: 'var(--accent-gold)', fontWeight: '500' }}>
                  ({categoryProducts.length}アイテム掲載中)
                </span>
              </h1>
            </div>
          </div>
          <p style={{ fontSize: '0.94rem', color: 'rgba(255, 255, 255, 0.75)', margin: 0, maxWidth: '680px' }}>
            {meta.description}
          </p>

          {/* Other Categories Switcher Pills */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '28px', flexWrap: 'wrap' }}>
            {categoryTabList.map((cat) => {
              const isActive = cat.id === categoryKey;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    backgroundColor: isActive ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.06)',
                    color: isActive ? '#0B1020' : '#FFFFFF',
                    border: isActive ? '1px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control Panel: Filters & Sorting Bar */}
      <div className="container" style={{ paddingTop: '36px' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            padding: '20px 24px',
            marginBottom: '32px',
            boxShadow: 'var(--shadow-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Left: Filter Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', fontWeight: '600', color: 'var(--text-main)' }}>
              <SlidersHorizontal size={16} color="var(--accent-gold)" />
              <span>絞り込み:</span>
            </div>

            {/* Brand Dropdown */}
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-sub)',
                fontSize: '0.84rem',
                color: 'var(--text-main)',
                outline: 'none',
              }}
            >
              <option value="all">すべてのブランド</option>
              {PARTNER_BRANDS_INFO.filter((b) => (b.productCount || 0) > 0).map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.productCount}件)
                </option>
              ))}
            </select>

            {/* Price Range Dropdown */}
            <select
              value={selectedPriceRange}
              onChange={(e) => {
                setSelectedPriceRange(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-sub)',
                fontSize: '0.84rem',
                color: 'var(--text-main)',
                outline: 'none',
              }}
            >
              <option value="all">すべての価格帯</option>
              <option value="under10">〜10万円</option>
              <option value="10to20">10〜20万円</option>
              <option value="20to40">20〜40万円</option>
              <option value="over40">40万円以上</option>
            </select>

            {(selectedBrand !== 'all' || selectedPriceRange !== 'all') && (
              <button
                onClick={handleResetFilters}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                }}
              >
                <RefreshCw size={12} /> リセット
              </button>
            )}
          </div>

          {/* Right: Sort & Count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '0.86rem', color: 'var(--text-sub)' }}>
              該当: <strong style={{ color: 'var(--text-main)' }}>{filteredProducts.length}</strong> 件
              （{currentPage} / {totalPages} ページ）
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-light)',
                backgroundColor: '#FFFFFF',
                fontSize: '0.84rem',
                color: 'var(--text-main)',
                outline: 'none',
                fontWeight: '500',
              }}
            >
              <option value="popular">人気・注目順</option>
              <option value="price-low">価格が安い順</option>
              <option value="price-high">価格が高い順</option>
              <option value="rating">評価が高い順</option>
            </select>
          </div>
        </div>

        {/* Product Grid (24 items per page) */}
        {paginatedProducts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '64px 20px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '8px' }}>
              該当するアイテムが見つかりませんでした
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', marginBottom: '20px' }}>
              フィルター条件を緩和するか、リセットをお試しください。
            </p>
            <button onClick={handleResetFilters} className="btn-primary">
              フィルターをリセット
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '28px',
              }}
            >
              {paginatedProducts.map((product) => (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ marginTop: '48px' }}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
