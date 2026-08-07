'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { PARTNER_BRANDS_INFO } from '@/data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-space)',
        color: '#FFFFFF',
        padding: '64px 0 36px',
        fontSize: '0.85rem',
        borderTop: '1px solid var(--accent-gold-border)',
      }}
    >
      <div className="container">
        {/* Footprints & Footer Grid Links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1.2fr 1.2fr',
            gap: '40px',
            marginBottom: '56px',
          }}
        >
          {/* Brand Concept */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-navy)',
                  border: '1px solid var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <ellipse cx="12" cy="12" rx="9" ry="4" stroke="#C5A46D" strokeWidth="1.2" transform="rotate(-25 12 12)" />
                  <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
                  <circle cx="18.5" cy="7.5" r="1.5" fill="#C5A46D" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-en)',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  letterSpacing: '0.14em',
                  color: '#fff',
                }}
              >
                ORBITAL SELECT
              </span>
            </div>
            <p style={{ lineHeight: '1.75', color: '#aaaaaa', marginBottom: '20px', fontSize: '0.82rem' }}>
              Orbital Select は、「Space × Furniture」をコンセプトに、理想のインテリアをキュレーション・比較する家具ディスカバリープラットフォームです。
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-gold-light)', fontWeight: '500', fontSize: '0.8rem' }}>
              <ShieldCheck size={16} /> 公式アフィリエイト提携プログラム参加サイト
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: '500', fontSize: '0.9rem', marginBottom: '18px', letterSpacing: '0.05em' }}>
              コンテンツ・機能
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, opacity: 0.85 }}>
              <li><Link href="/brands" style={{ color: '#ccc' }}>ブランド一覧 (Brands)</Link></li>
              <li><Link href="/collections" style={{ color: '#ccc' }}>特集 (Orbit Collections)</Link></li>
              <li><Link href="/journal" style={{ color: '#ccc' }}>読みもの (Voyager Journal)</Link></li>
              <li><Link href="/categories" style={{ color: '#ccc' }}>カテゴリー一覧 (Categories)</Link></li>
              <li><Link href="/compare" style={{ color: '#ccc' }}>ブランド比較 (Compare)</Link></li>
            </ul>
          </div>

          {/* Core Partner Brands (Master Data References) */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: '500', fontSize: '0.9rem', marginBottom: '18px', letterSpacing: '0.05em' }}>
              提携パートナーブランド
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, opacity: 0.85 }}>
              {PARTNER_BRANDS_INFO.map((b) => (
                <li key={b.id}>
                  <Link href={`/brands/${b.id}`} style={{ color: '#ccc', fontSize: '0.8rem' }}>
                    • {b.name} ({b.jpName})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & ASP Disclosure */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: '500', fontSize: '0.9rem', marginBottom: '18px', letterSpacing: '0.05em' }}>
              アフィリエイト情報開示
            </h4>
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'var(--bg-navy)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.75rem',
                lineHeight: '1.6',
                color: '#aaaaaa',
              }}
            >
              当サイトは各インテリアブランドおよびASP（A8.net、バリューコマース、アクセストレード、もしもアフィリエイト）と正式提携し情報提供を行っております。商品の購入・決済・配送は各ブランド公式サイトにて行われます。
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.78rem',
            color: '#888888',
          }}
        >
          <div>© 2026 ORBITAL SELECT. All rights reserved. Design Your Orbit.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/privacy-policy" style={{ color: '#aaaaaa' }}>プライバシーポリシー</Link>
            <Link href="/terms" style={{ color: '#aaaaaa' }}>利用規約</Link>
            <Link href="/disclaimer" style={{ color: '#aaaaaa' }}>免責事項・アフィリエイト開示</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
