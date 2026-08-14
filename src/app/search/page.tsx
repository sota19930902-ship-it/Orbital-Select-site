'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PRODUCTS, PARTNER_BRANDS_INFO } from '../../data/mockData';
import { ProductCard } from '../../components/ProductCard';
import { CompareDrawer } from '../../components/CompareDrawer';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ProductModal } from '../../components/ProductModal';
import { Product, PartnerBrandId, ProductCategory } from '../../types';
import { Search, Filter, SlidersHorizontal, RefreshCw, Layers, Sparkles } from 'lucide-react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedTaste, setSelectedTaste] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'popular'>('popular');

  const [selectedModalProduct, setSelectedModalProduct] = useState<Product | null>(null);
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Keyword
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSub = p.subtitle.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
        const matchMat = p.materials.some((m) => m.toLowerCase().includes(q));
        if (!matchName && !matchSub && !matchBrand && !matchDesc && !matchTags && !matchMat) {
          return false;
        }
      }

      // Brand
      if (selectedBrand !== 'all' && p.partnerBrandId !== selectedBrand) {
        return false;
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Price Range
      if (selectedPriceRange !== 'all') {
        if (selectedPriceRange === 'under10' && p.price >= 100000) return false;
        if (selectedPriceRange === '10to20' && (p.price < 100000 || p.price > 200000)) return false;
        if (selectedPriceRange === '20to40' && (p.price < 200000 || p.price > 400000)) return false;
        if (selectedPriceRange === 'over40' && p.price < 400000) return false;
      }

      // Taste
      if (selectedTaste !== 'all' && p.taste !== selectedTaste) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // popular default
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    });
  }, [searchQuery, selectedBrand, selectedCategory, selectedPriceRange, selectedTaste, sortBy]);

  const handleToggleWishlist = (p: Product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === p.id) ? prev.filter((item) => item.id !== p.id) : [...prev, p]
    );
  };

  const handleToggleCompare = (p: Product) => {
    setCompareItems((prev) =>
      prev.some((item) => item.id === p.id) ? prev.filter((item) => item.id !== p.id) : [...prev, p].slice(0, 4)
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedTaste('all');
    setSortBy('popular');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-space)', color: 'var(--text-main)', minHeight: '100vh' }}>
      <Header
        wishlistCount={wishlist.length}
        onOpenWishlist={() => {}}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />


      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '120px 24px 80px' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '20px',
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid var(--accent-gold)',
              fontSize: '0.85rem',
              color: 'var(--accent-gold)',
              marginBottom: '12px',
            }}
          >
            <Sparkles size={14} />
            <span>Product Discovery Hub</span>
          </div>
          <h1 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', color: '#FFFFFF', marginBottom: '12px' }}>
            全提携ブランド・製品横断検索
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '640px', margin: '0 auto' }}>
            FLYMEe、MASTERWAL、ACTUS、Air Rhizome Interior、La Vitaなど、全5大提携パートナー家具を条件に合わせて一元比較・検索できます。
          </p>
        </div>

        {/* Global Search Bar */}
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto 36px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search
            size={20}
            color="var(--accent-gold)"
            style={{ position: 'absolute', left: '20px', pointerEvents: 'none' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="商品名・素材（ウォールナット、アイアン等）・ブランド・キーワードを入力..."
            style={{
              width: '100%',
              padding: '16px 20px 16px 54px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              color: '#FFFFFF',
              fontSize: '1rem',
              outline: 'none',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '16px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              クリア
            </button>
          )}
        </div>

        {/* Control Panel: Filters & Sorting */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              paddingBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)' }}>
              <Filter size={18} />
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>検索フィルター条件</span>
            </div>
            <button
              onClick={handleResetFilters}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              <RefreshCw size={14} />
              <span>条件をリセット</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {/* Brand Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                提携ブランド
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-space)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              >
                <option value="all">すべてのブランド (All Brands)</option>
                {PARTNER_BRANDS_INFO.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.jpName})
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                カテゴリ
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-space)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              >
                <option value="all">すべてのカテゴリ</option>
                <option value="sofa">ソファ (Sofa)</option>
                <option value="table">ダイニングテーブル (Table)</option>
                <option value="chair">チェア・スツール (Chair)</option>
                <option value="lighting">照明 (Lighting)</option>
                <option value="storage">収納・シェルフ (Storage)</option>
                <option value="desk">デスク・机 (Desk)</option>
                <option value="tv-board">TVボード (TV Board)</option>
                <option value="bed">ベッド (Bed)</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                価格帯
              </label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-space)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              >
                <option value="all">すべての価格帯</option>
                <option value="under10">〜10万円未満 (エントリー・ミドル)</option>
                <option value="10to20">10〜20万円</option>
                <option value="20to40">20〜40万円 (ミドルハイ)</option>
                <option value="over40">40万円以上 (最高級ウォールナット等)</option>
              </select>
            </div>

            {/* Taste Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                テイスト
              </label>
              <select
                value={selectedTaste}
                onChange={(e) => setSelectedTaste(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-space)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              >
                <option value="all">すべてのテイスト</option>
                <option value="hotel">ホテルライク・ラグジュアリー</option>
                <option value="nordic">北欧・ナチュラル</option>
                <option value="vintage">ヴィンテージ・インダストリアル</option>
                <option value="minimal">ミニマル・モダン</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                並び替え
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-space)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              >
                <option value="popular">人気・レビュー数順</option>
                <option value="rating">高評価順</option>
                <option value="price-asc">価格が安い順</option>
                <option value="price-desc">価格が高い順</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}
        >
          <div style={{ fontSize: '1.05rem', color: '#FFFFFF' }}>
            該当製品: <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{filteredProducts.length}</span> 件
          </div>
          <Link
            href="/admin/import"
            className="btn-outline"
            style={{ fontSize: '0.85rem', padding: '8px 16px', gap: '6px' }}
          >
            <Layers size={14} />
            <span>CSV製品一括インポート</span>
          </Link>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={setSelectedModalProduct}
                onToggleWishlist={handleToggleWishlist}
                isInWishlist={wishlist.some((w) => w.id === product.id)}
                onToggleCompare={handleToggleCompare}
                isInCompare={compareItems.some((c) => c.id === product.id)}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 24px',
              backgroundColor: 'var(--bg-card)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
            }}
          >
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              条件に一致する製品が見つかりませんでした。
            </p>
            <button onClick={handleResetFilters} className="btn-primary">
              フィルター条件をリセットする
            </button>
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedModalProduct && (
        <ProductModal
          product={selectedModalProduct}
          onClose={() => setSelectedModalProduct(null)}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={wishlist.some((w) => w.id === selectedModalProduct.id)}
        />
      )}


      {/* Compare Drawer */}
      <CompareDrawer
        compareList={compareItems}
        onRemoveFromCompare={(id) => setCompareItems((prev) => prev.filter((i) => i.id !== id))}
        onClearCompare={() => setCompareItems([])}
      />


      <Footer />
    </div>
  );
}
