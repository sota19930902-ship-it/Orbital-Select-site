'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { SearchSection } from '@/components/SearchSection';
import { QuickChoiceSection } from '@/components/QuickChoiceSection';
import { FeaturedBrandsSection } from '@/components/FeaturedBrandsSection';
import { RankingSection } from '@/components/RankingSection';
import { EditorsPicksSection } from '@/components/EditorsPicksSection';
import { PriceTierSection } from '@/components/PriceTierSection';
import { TasteSection } from '@/components/TasteSection';
import { ArticlesSection } from '@/components/ArticlesSection';

import { NewArrivalsSection } from '@/components/NewArrivalsSection';
import { ProductCard } from '@/components/ProductCard';

import { ProductModal } from '@/components/ProductModal';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { CompareDrawer } from '@/components/CompareDrawer';
import { Pagination } from '@/components/Pagination';
import { Footer } from '@/components/Footer';

import { PRODUCTS } from '@/data/mockData';
import { Product, SearchFilters } from '@/types';
import { Search, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

export default function Home() {
  const [activeNav, setActiveNav] = useState<string>('top');
  const [isSearchResultsExpanded, setIsSearchResultsExpanded] = useState<boolean>(false);
  const [searchCurrentPage, setSearchCurrentPage] = useState<number>(1);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    brand: 'all',
    priceRange: 'all',
    taste: 'all',
    room: 'all',
    material: 'all',
    size: 'all',
    color: 'all',
    sortBy: 'popular',
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [compareList, setCompareList] = useState<Product[]>([]);

  // Load wishlist from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('orbital_select_wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load wishlist', e);
    }
  }, []);

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      let updated: Product[];
      if (exists) {
        updated = prev.filter((p) => p.id !== product.id);
      } else {
        updated = [...prev, product];
      }
      try {
        localStorage.setItem('orbital_select_wishlist', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save wishlist', e);
      }
      return updated;
    });
  };

  const handleToggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert('一度に比較できるのは最大4件までです。');
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      try {
        localStorage.setItem('orbital_select_wishlist', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleClearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('orbital_select_wishlist');
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const isInCompare = (productId: string) => {
    return compareList.some((p) => p.id === productId);
  };

  // 10-filter Search Engine
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // 1. Keyword search query
      const q = (searchQuery || filters.query).toLowerCase().trim();
      if (q) {
        const matchName = p.name.toLowerCase().includes(q);
        const matchSubtitle = p.subtitle.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
        const matchMat = p.materials.some((m) => m.toLowerCase().includes(q)) || (p.materialText && p.materialText.toLowerCase().includes(q));
        const matchColor = p.color.toLowerCase().includes(q) || (p.colors && p.colors.toLowerCase().includes(q));
        const matchSize = p.dimensions.toLowerCase().includes(q) || (p.size && p.size.toLowerCase().includes(q)) || p.sizeCategory.toLowerCase().includes(q);
        if (!matchName && !matchSubtitle && !matchBrand && !matchDesc && !matchTags && !matchMat && !matchColor && !matchSize) {
          return false;
        }
      }

      // 2. Category
      if (filters.category !== 'all' && p.category !== filters.category) {
        return false;
      }

      // 3. Brand
      if (filters.brand !== 'all' && p.partnerBrandId !== filters.brand) {
        return false;
      }

      // 4. Price range
      if (filters.priceRange !== 'all' && p.priceRangeId !== filters.priceRange) {
        return false;
      }

      // 5. Taste
      if (filters.taste !== 'all' && p.taste !== filters.taste) {
        return false;
      }

      // 6. Room
      if (filters.room !== 'all' && p.room !== filters.room) {
        return false;
      }

      // 7. Material
      if (filters.material !== 'all') {
        const matCombined = `${p.materials.join(' ')} ${p.materialText || ''} ${p.tags.join(' ')} ${p.description}`;
        let matchMat = false;
        if (filters.material === 'leather') matchMat = /本革|レザー|オイルレザー|革|牛革|レザーテックス/i.test(matCombined);
        else if (filters.material === 'oak') matchMat = /オーク|天然木|ウッド/i.test(matCombined);
        else if (filters.material === 'mortar') matchMat = /モルタル|メラミン|モールテックス|コンクリート|アクリル|ガラス/i.test(matCombined);
        else if (filters.material === 'iron') matchMat = /アイアン|スチール|金属|真鍮|アルミ/i.test(matCombined);
        else if (filters.material === 'walnut') matchMat = /ウォールナット|無垢|ウォルナット/i.test(matCombined);
        else matchMat = true;
        if (!matchMat) return false;
      }

      // 8. Size
      if (filters.size !== 'all') {
        const sizeCombined = `${p.size || ''} ${p.dimensions} ${p.sizeCategory} ${p.tags.join(' ')} ${p.name}`;
        if (filters.size === 'custom' && !/サイズオーダー|カスタマイズ|変更可能/i.test(sizeCombined)) return false;
        if (filters.size === 'compact' && !/一人暮らし|1人掛け|2人掛け|110cm|120cm|150cm|Φ160|Φ250|コンパクト|小型/i.test(sizeCombined)) return false;
        if (filters.size === 'middle' && !/2〜3人掛け|2人掛け|3人掛け|160cm|180cm|Φ500/i.test(sizeCombined)) return false;
        if (filters.size === 'large' && !/3人掛け|大型|ファミリー|200cm|220cm|広々/i.test(sizeCombined)) return false;
      }

      // 9. Color
      if (filters.color !== 'all') {
        const colorCombined = `${p.colors || ''} ${p.color} ${p.name} ${p.tags.join(' ')}`;
        if (filters.color === 'camel' && !/キャメル|ブラウン|茶|ベージュ|ナチュラル/i.test(colorCombined)) return false;
        if (filters.color === 'gray' && !/グレー|灰|モルタル/i.test(colorCombined)) return false;
        if (filters.color === 'black' && !/ブラック|黒|ダーク/i.test(colorCombined)) return false;
        if (filters.color === 'natural' && !/ナチュラル|オーク|木目|ホワイト/i.test(colorCombined)) return false;
        if (filters.color === 'white' && !/ホワイト|白|オパール/i.test(colorCombined)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    });
  }, [filters, searchQuery]);

  const SEARCH_ITEMS_PER_PAGE = 40;
  const searchTotalPages = Math.ceil(filteredProducts.length / SEARCH_ITEMS_PER_PAGE);

  const paginatedSearchResults = useMemo(() => {
    const start = (searchCurrentPage - 1) * SEARCH_ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + SEARCH_ITEMS_PER_PAGE);
  }, [filteredProducts, searchCurrentPage]);

  const handleSearchPageChange = (page: number) => {
    setSearchCurrentPage(page);
    const el = document.getElementById('search-result-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const top10Products = useMemo(() => {
    return [...PRODUCTS]
      .sort((a, b) => {
        // Individual product score = (rating * 100) + (reviewCount * 2)
        const scoreA = (a.rating * 100) + (a.reviewCount * 2);
        const scoreB = (b.rating * 100) + (b.reviewCount * 2);
        return scoreB - scoreA;
      })
      .slice(0, 10);
  }, []);

  const totalBudget = useMemo(() => {
    return wishlist.reduce((acc, item) => acc + item.price, 0);
  }, [wishlist]);

  // Navigation Smooth Scroll Handlers
  const handleNavClick = (navId: string) => {
    setActiveNav(navId);
    if (navId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (navId === 'ranking') {
      const el = document.getElementById('ranking-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (navId === 'articles') {
      const el = document.getElementById('articles-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setFilters((prev) => ({ ...prev, category: navId }));
      const el = document.getElementById('search-result-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToRanking = () => {
    const el = document.getElementById('ranking-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExecuteSearch = () => {
    setIsSearchResultsExpanded(true);
    setTimeout(() => {
      const el = document.getElementById('search-result-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectBrandFilter = (brandId: string) => {
    setFilters((prev) => ({ ...prev, brand: brandId, category: 'all' }));
    setIsSearchResultsExpanded(true);
    setTimeout(() => {
      const el = document.getElementById('search-result-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)', paddingTop: '108px' }}>

      {/* Navigation Header */}
      <Header
        wishlistCount={wishlist.length}
        totalBudget={totalBudget}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeNav={activeNav}
        onNavClick={handleNavClick}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* ① Hero Section */}
        <Hero onScrollToRanking={handleScrollToRanking} />

        {/* ② Search Section */}
        <SearchSection
          filters={filters}
          onFilterChange={(updated) => {
            setFilters((prev) => ({ ...prev, ...updated }));
            setIsSearchResultsExpanded(true);
          }}
          onResetFilters={() => {
            setSearchQuery('');
            setFilters({
              query: '',
              category: 'all',
              brand: 'all',
              priceRange: 'all',
              taste: 'all',
              room: 'all',
              material: 'all',
              size: 'all',
              color: 'all',
              sortBy: 'popular',
            });
          }}
          onExecuteSearch={handleExecuteSearch}
          resultCount={filteredProducts.length}
        />

        {/* ③ Quick Choice Section */}
        <QuickChoiceSection
          onSelectChoice={(updated) => {
            setFilters((prev) => ({ ...prev, ...updated }));
            handleExecuteSearch();
          }}
        />

        {/* NEW Section: Featured Brands (Curated Affiliate Partners) */}
        <FeaturedBrandsSection />

        {/* ④ Popular Ranking (Featured Orbit) */}
        <RankingSection
          products={top10Products}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={isInWishlist}
        />

        {/* ⑤ Flyby Picks (Editor's Picks) */}
        <EditorsPicksSection
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={isInWishlist}
        />

        {/* ⑥ Price Guide */}
        <PriceTierSection
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={isInWishlist}
        />

        {/* ⑦ Style Guide */}
        <TasteSection
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={isInWishlist}
        />

        {/* Collapsible Filtered Search Results Section */}
        <section style={{ padding: '60px 0', backgroundColor: '#FFFFFF' }} id="search-result-section">
          <div className="container">
            {/* Accordion Toggle Bar */}
            <div
              onClick={() => setIsSearchResultsExpanded(!isSearchResultsExpanded)}
              style={{
                padding: '24px 32px',
                backgroundColor: 'var(--bg-sub)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-subtle)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }}
            >
              <div>
                <span className="section-tag" style={{ marginBottom: '4px', display: 'inline-block' }}>
                  Filtered Orbit
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '600', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  絞り込み検索結果 <span style={{ color: 'var(--accent-gold)', fontSize: '1.2rem', fontWeight: '600' }}>({filteredProducts.length}件)</span>
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', margin: '6px 0 0' }}>
                  {isSearchResultsExpanded
                    ? 'クリックして検索結果一覧をたたむ'
                    : '指定の条件に一致するブランド家具を一覧表示（クリックで表示）'}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isSearchResultsExpanded ? 'var(--bg-space)' : 'var(--accent-gold)',
                  color: '#FFFFFF',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  transition: 'all 0.25s ease',
                }}
              >
                {isSearchResultsExpanded ? (
                  <>検索結果をたたむ <ChevronUp size={18} /></>
                ) : (
                  <>検索結果を表示する ({filteredProducts.length}件) <ChevronDown size={18} /></>
                )}
              </div>
            </div>

            {/* Collapsible Content Area */}
            {isSearchResultsExpanded && (
              <div style={{ marginTop: '36px', animation: 'fadeIn 0.35s ease' }}>
                {filteredProducts.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '64px 0',
                      backgroundColor: 'var(--bg-sub)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    <Search size={48} color="var(--accent-gold)" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                      条件に一致する家具が見つかりませんでした
                    </h3>
                    <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', marginBottom: '20px' }}>
                      検索条件を広げるか、全リセットをお試しください。
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFilters({
                          query: '',
                          category: 'all',
                          brand: 'all',
                          priceRange: 'all',
                          taste: 'all',
                          room: 'all',
                          material: 'all',
                          size: 'all',
                          color: 'all',
                          sortBy: 'popular',
                        });
                      }}
                      className="btn-primary"
                    >
                      <RefreshCw size={16} /> 条件を全リセットする
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
                      {paginatedSearchResults.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onSelectProduct={(p) => setSelectedProduct(p)}
                          onToggleWishlist={handleToggleWishlist}
                          isInWishlist={isInWishlist(product.id)}
                          onToggleCompare={handleToggleCompare}
                          isInCompare={isInCompare(product.id)}
                        />
                      ))}
                    </div>

                    <Pagination
                      currentPage={searchCurrentPage}
                      totalPages={searchTotalPages}
                      onPageChange={handleSearchPageChange}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </section>


        {/* ⑩ Editorial (Voyager Journal) */}
        <ArticlesSection />

        {/* ⑪ New Arrivals */}
        <NewArrivalsSection
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={isInWishlist}
        />
      </main>


      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={selectedProduct ? isInWishlist(selectedProduct.id) : false}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveItem={handleRemoveFromWishlist}
        onClearAll={handleClearWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Compare Drawer Floating Bar */}
      <CompareDrawer
        compareList={compareList}
        onRemoveFromCompare={handleRemoveFromCompare}
        onClearCompare={handleClearCompare}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
