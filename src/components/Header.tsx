'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Star } from 'lucide-react';

interface HeaderProps {
  wishlistCount: number;
  totalBudget?: number;
  onOpenWishlist: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  activeNav?: string;
  onNavClick?: (navId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  wishlistCount,
  onOpenWishlist,
  searchQuery = '',
  onSearchChange,
  onNavClick,
}) => {
  const mainNavItems = [
    { id: 'search', label: '全製品検索', sub: 'Discovery', href: '/search' },
    { id: 'ranking', label: '人気ランキング', sub: 'Featured Orbit', href: '/#ranking-section' },
    { id: 'brands', label: 'ブランド', sub: 'Brands', href: '/brands' },
    { id: 'collections', label: '特集', sub: 'Orbit Collections', href: '/collections' },
    { id: 'journal', label: '記事', sub: 'Voyager Journal', href: '/journal' },
    { id: 'categories', label: 'カテゴリー', sub: 'Categories', href: '/categories' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: 'rgba(250, 250, 248, 0.98)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-light)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Top Announcement Ribbon */}
      <div
        style={{
          backgroundColor: 'var(--bg-space)',
          color: 'var(--text-inverse)',
          padding: '6px 0',
          fontSize: '0.74rem',
          textAlign: 'center',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', whiteSpace: 'nowrap' }}>
          <span style={{ whiteSpace: 'nowrap' }}><strong>ORBITAL SELECT</strong> — Premium Affiliate Furniture Discovery Platform</span>
          <span style={{ color: 'var(--accent-gold)', fontWeight: '500', whiteSpace: 'nowrap' }}>
            全9大提携パートナーブランド 公式カタログ連動
          </span>

        </div>
      </div>

      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
          maxWidth: '1440px',
          gap: '16px',
        }}
      >
        {/* Brand Logo & Search Input Container */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          {/* Brand Logo */}
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', flexShrink: 0, whiteSpace: 'nowrap' }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-space)',
                border: '1px solid var(--accent-gold-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="12" cy="12" rx="9" ry="4" stroke="#C5A46D" strokeWidth="1.2" transform="rotate(-25 12 12)" />
                <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
                <circle cx="18.5" cy="7.5" r="1.5" fill="#C5A46D" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-en)',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  letterSpacing: '0.14em',
                  color: 'var(--text-main)',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                ORBITAL SELECT
              </div>
              <div style={{ fontSize: '0.58rem', color: 'var(--accent-gold)', letterSpacing: '0.12em', marginTop: '3px', whiteSpace: 'nowrap' }}>
                SPACE × FURNITURE DISCOVERY
              </div>
            </div>
          </Link>

          {/* Search Input Box (Height matches Brand Logo: 42px) */}
          {onSearchChange && (
            <div style={{ position: 'relative', width: '250px', height: '42px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="家具・ブランド・テイストで探す..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 14px 0 38px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid var(--accent-gold-border)',
                  fontSize: '0.82rem',
                  color: 'var(--text-main)',
                  outline: 'none',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 10px rgba(197, 164, 109, 0.15)',
                  transition: 'all 0.25s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                  e.currentTarget.style.boxShadow = '0 0 14px rgba(197, 164, 109, 0.35)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-gold-border)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(197, 164, 109, 0.15)';
                }}
              />
              <Search
                size={16}
                color="var(--accent-gold)"
                style={{
                  position: 'absolute',
                  left: '13px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          )}


        </div>

        {/* Primary Navigation with Japanese Labels & English Subtitles */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, whiteSpace: 'nowrap' }}>
          {mainNavItems.map((item) => {
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  if (onNavClick) onNavClick(item.id);
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '6px 10px',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-xs)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                className="nav-link-item"
              >
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    color: 'var(--text-main)',
                    lineHeight: '1.2',
                    whiteSpace: 'nowrap',
                    wordBreak: 'keep-all',
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: '0.62rem',
                    fontFamily: 'var(--font-en)',
                    color: 'var(--accent-gold)',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                    wordBreak: 'keep-all',
                  }}
                >
                  {item.sub}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, whiteSpace: 'nowrap' }}>
          {/* In Orbit Drawer Trigger */}
          <button
            onClick={onOpenWishlist}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-space)',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: '500',
              letterSpacing: '0.04em',
              transition: 'all 0.25s ease',
              border: '1px solid var(--accent-gold-border)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <Star size={14} color="var(--accent-gold)" fill="var(--accent-gold)" style={{ flexShrink: 0 }} />
            <span style={{ whiteSpace: 'nowrap' }}>お気に入り</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-en)', whiteSpace: 'nowrap' }}>In Orbit</span>
            {wishlistCount > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--accent-gold)',
                  color: 'var(--bg-space)',
                  borderRadius: 'var(--radius-full)',
                  padding: '1px 6px',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                }}
              >
                {wishlistCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
