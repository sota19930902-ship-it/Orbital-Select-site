'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function DisclaimerPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)', paddingTop: '108px' }}>
      <Header wishlistCount={0} onOpenWishlist={() => {}} />

      <main style={{ flex: 1, padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-tag">LEGAL DOCUMENT</span>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '24px' }}>免責事項・アフィリエイト情報開示</h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', marginBottom: '40px' }}>
            最終改定日: 2026年8月1日
          </p>

          <div style={{ backgroundColor: '#FFFFFF', padding: '40px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', lineHeight: '1.9' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)' }}>1. アフィリエイトプログラムに関する開示</h2>
            <p style={{ marginBottom: '24px', color: 'var(--text-sub)' }}>
              ORBITAL SELECT（以下「当サイト」）は、アフィリエイトサービスプロバイダ（A8.net、バリューコマース、アクセストレード、もしもアフィリエイト等）および各提携インテリアブランドと正式なパートナーシップを締結し、商品紹介を行っている成果報酬型アフィリエイトサイトです。
              当サイト内のリンクを経由して各公式ストアで商品が購入された際、当サイトに紹介手数料が支払われる場合があります。
            </p>

            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)' }}>2. 商品購入・決済・配送について</h2>
            <p style={{ marginBottom: '24px', color: 'var(--text-sub)' }}>
              当サイトで紹介している商品は、当サイトが直接販売・発送を行うものではありません。商品の注文・決済・配送・返品・保証につきましては、リンク先の各ブランド公式サイトおよび販売業者との直接の取引となります。
            </p>

            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)' }}>3. 掲載情報の正確性および免責</h2>
            <p style={{ marginBottom: '24px', color: 'var(--text-sub)' }}>
              当サイトでは、正確な価格・仕様・在庫状況を掲載するよう努めておりますが、各ブランドサイト側の改定等により、最新情報と異なる場合があります。お買い物の際は、必ず移動先の公式販売サイトにて最新情報をご確認ください。
            </p>

            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)' }}>4. 損害等の責任について</h2>
            <p style={{ color: 'var(--text-sub)' }}>
              当サイトの掲載情報のご利用、または移動先サイトでのトラブルや損害につきまして、当サイトでは一切の責任を負いかねますのであらかじめご了承ください。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
