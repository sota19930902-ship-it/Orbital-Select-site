'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)', paddingTop: '108px' }}>
      <Header wishlistCount={0} onOpenWishlist={() => {}} />

      <main style={{ flex: 1, padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className="section-tag">LEGAL DOCUMENT</span>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '24px' }}>プライバシーポリシー</h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', marginBottom: '40px' }}>
            最終改定日: 2026年8月1日
          </p>

          <div style={{ backgroundColor: '#FFFFFF', padding: '40px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', lineHeight: '1.9' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)' }}>1. 個人情報の収集および利用について</h2>
            <p style={{ marginBottom: '24px', color: 'var(--text-sub)' }}>
              ORBITAL SELECT（以下「当サイト」）では、お問い合わせやサービス利用に際して、お名前・メールアドレス等の個人情報をご提供いただく場合があります。収集した個人情報は、お問い合わせへの回答やサービス向上に必要な範囲内でのみ利用いたします。
            </p>

            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)' }}>2. クッキー（Cookie）およびアクセス解析ツールについて</h2>
            <p style={{ marginBottom: '24px', color: 'var(--text-sub)' }}>
              当サイトでは、サービスの利便性向上およびトラフィック分析のためにCookieを使用しています。また、Google Analytics等のアクセス解析ツールを利用し、匿名のトラフィックデータを収集しています。ブラウザの設定によりCookieの受け取りを拒否することも可能です。
            </p>

            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)' }}>3. 第三者への個人情報提供の禁止</h2>
            <p style={{ marginBottom: '24px', color: 'var(--text-sub)' }}>
              当サイトは、法令に基づき開示することが必要である場合を除き、ご本人の同意を得ずに個人情報を第三者に開示・提供することはありません。
            </p>

            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)' }}>4. プライバシーポリシーの改定</h2>
            <p style={{ color: 'var(--text-sub)' }}>
              当サイトは、法令の制定・改定および運営方針の変更に伴い、本プライバシーポリシーを予告なく変更することがあります。最新の内容は本ページにて随時公開いたします。
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
