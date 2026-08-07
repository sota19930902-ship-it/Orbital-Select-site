'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { VOYAGER_JOURNAL_ARTICLES, PARTNER_BRANDS_INFO } from '../../../data/mockData';
import { ArrowLeft, Calendar, Clock, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function JournalArticleDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const articleId = resolvedParams.id;

  const article = VOYAGER_JOURNAL_ARTICLES.find((a) => a.id === articleId) || VOYAGER_JOURNAL_ARTICLES[0];
  const mentionedBrands = PARTNER_BRANDS_INFO.filter(
    (b) => article.comparedBrands?.includes(b.name) || article.tags.includes(b.name)
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <Header wishlistCount={0} onOpenWishlist={() => {}} />

      <main style={{ flex: 1 }}>
        {/* Article Banner Header */}
        <section
          style={{
            backgroundColor: 'var(--bg-space)',
            color: '#FFFFFF',
            padding: '70px 0',
            textAlign: 'center',
          }}
        >
          <div className="container" style={{ maxWidth: '800px' }}>
            <Link
              href="/journal"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--accent-gold)',
                fontSize: '0.82rem',
                marginBottom: '20px',
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={14} /> Voyager Journal 一覧へ戻る
            </Link>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '0.78rem', color: 'var(--accent-gold-light)', marginBottom: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={13} /> {article.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} /> {article.readTime}
              </span>
              <span>• {article.category}</span>
            </div>

            <h1 style={{ fontSize: '2.2rem', fontWeight: '400', color: '#FFFFFF', lineHeight: '1.35', marginBottom: '16px' }}>
              {article.title}
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.8' }}>
              {article.subtitle}
            </p>
          </div>
        </section>

        {/* Hero Image */}
        <div className="container" style={{ maxWidth: '900px', marginTop: '-40px', position: 'relative', zIndex: 10 }}>
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '420px', boxShadow: 'var(--shadow-lg)' }}>
            <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Article Body */}
        <section style={{ padding: '60px 0 80px' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '48px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-subtle)' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: '2', color: 'var(--text-main)', marginBottom: '32px', fontWeight: '500' }}>
                {article.summary}
              </p>

              <h2 style={{ fontSize: '1.4rem', fontWeight: '500', marginBottom: '16px', color: 'var(--text-main)', borderLeft: '4px solid var(--accent-gold)', paddingLeft: '12px' }}>
                1. 理想のインテリア体験と空間の本質
              </h2>
              <p style={{ fontSize: '0.94rem', lineHeight: '1.9', color: 'var(--text-sub)', marginBottom: '28px' }}>
                家具は単なる生活の道具ではなく、毎日の過ごし方や心のあり方を映し出す空間のアートピースです。特にウォールナット無垢材や天然木、グレアフリー照明などの本物のマテリアルは、年月の経過とともに美しい深みと風合いを育みます。
              </p>

              <h2 style={{ fontSize: '1.4rem', fontWeight: '500', marginBottom: '16px', color: 'var(--text-main)', borderLeft: '4px solid var(--accent-gold)', paddingLeft: '12px' }}>
                2. ブランド選びの判断基準
              </h2>
              <p style={{ fontSize: '0.94rem', lineHeight: '1.9', color: 'var(--text-sub)', marginBottom: '36px' }}>
                予算やライフスタイルに応じた選択肢を見極めることが成功のキーとなります。一生モノの主役家具にはMASTERWALやLa Vitaの名作を選び、デスク環境にはKANADEMONO、ファミリーダイニングにはACTUSを組み合わせるなどのクロスブランドコーディネートがおすすめです。
              </p>

              {/* Mentioned Brands Box */}
              {mentionedBrands.length > 0 && (
                <div style={{ backgroundColor: 'var(--bg-space)', color: '#FFFFFF', padding: '28px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-gold-border)' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', marginBottom: '16px', fontWeight: '500' }}>
                    この記事に登場した注目ブランド
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {mentionedBrands.map((b) => (
                      <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>{b.name}</strong>
                          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', marginLeft: '8px' }}>({b.role})</span>
                        </div>
                        <Link href={`/brands/${b.id}`} className="btn-outline" style={{ padding: '6px 14px', fontSize: '0.78rem', color: '#fff', borderColor: 'var(--accent-gold)' }}>
                          <span>ブランドを見る</span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
