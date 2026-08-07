'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)', paddingTop: '108px' }}>
      <Header wishlistCount={0} onOpenWishlist={() => {}} />

      <main style={{ flex: 1, padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-tag">LEGAL DOCUMENT</span>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '24px' }}>利用規約</h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', marginBottom: '40px' }}>
            最終改定日: 2026年8月1日
          </p>

          <div style={{ backgroundColor: '#FFFFFF', padding: '40px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', lineHeight: '1.9' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)' }}>1. 規約の適用</h2>
            <p style={{ marginBottom: '24px', color: 'var(--text-sub)' }}>
              本利用規約は、ORBITAL SELECT（以下「当サイト」）が提供するすべてのコンテンツおよびサービスを利用するすべてのユーザーに適用されます。当サイトを利用された場合、本規約に同意したものとみなします。
            </p>

            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)' }}>2. 著作権および知的財産権</h2>
            <p style={{ marginBottom: '24px', color: 'var(--text-sub)' }}>
              当サイトに掲載されているテキスト・デザイン・ロゴ等の著作権およびその他の知的財産権は、当サイトまたは各権利保有者に帰属します。無断での転載・複製・再配布を禁じます。
            </p>

            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)' }}>3. 禁止事項</h2>
            <p style={{ marginBottom: '24px', color: 'var(--text-sub)' }}>
              ユーザーは、当サイトの利用にあたり、公序良俗に反する行為、第三者の権利を侵害する行為、当サイトの正常な運営を妨害するスクレイピングや不正アクセス等の行為を行ってはなりません。
            </p>

            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)' }}>4. サービスの変更および停止</h2>
            <p style={{ color: 'var(--text-sub)' }}>
              当サイトは、ユーザーへの事前通知なくサービス内容の変更・追加・停止を行うことができるものとします。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
