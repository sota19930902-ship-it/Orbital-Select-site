'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductModal } from '@/components/ProductModal';
import { PRODUCTS, PARTNER_BRANDS_INFO } from '@/data/mockData';
import { Product } from '@/types';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Layers,
  Heart,
  Eye,
  Feather,
  Wrench,
  Maximize2,
  Search,
} from 'lucide-react';

export default function SofaGuideArticlePage() {
  const [selectedModalProduct, setSelectedModalProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Find the 5 featured sofa products from synced spreadsheet data
  const rosetTogoProduct = useMemo(
    () => PRODUCTS.find((p) => p.name.includes('ROSETTogo') || p.id.includes('113607') || p.id.includes('113609')),
    []
  );
  const danishSofaProduct = useMemo(
    () => PRODUCTS.find((p) => p.name.includes('デニッシュ') || p.id.includes('CS-DNSO') || p.id.includes('CS_DNSO')),
    []
  );
  const habitatSofaProduct = useMemo(
    () => PRODUCTS.find((p) => p.name.includes('HABITAT') || p.id.includes('102547')),
    []
  );
  const muffySofaProduct = useMemo(
    () => PRODUCTS.find((p) => p.name.includes('MUFFY') || p.id.includes('120272')),
    []
  );
  const shiawaseSofaProduct = useMemo(
    () => PRODUCTS.find((p) => p.name.includes('幸せになるソファ') || p.id.includes('113295') || p.id.includes('113293')),
    []
  );

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.some((p) => p.id === product.id) ? prev.filter((p) => p.id !== product.id) : [...prev, product]
    );
  };

  const isInWishlist = (id: string) => wishlist.some((p) => p.id === id);

  // Helper component to render an interactive synced product card inside article
  const SyncedProductCard = ({
    product,
    headline,
    subtitle,
    curatorNotes,
  }: {
    product?: Product;
    headline: string;
    subtitle: string;
    curatorNotes: string;
  }) => {
    if (!product) return null;

    const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
    const affiliateUrl = product.shopLinks?.[0]?.url || 'https://flymee.jp/';
    const brandName = product.brand || '提携パートナー';

    return (
      <div
        style={{
          margin: '36px 0 48px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-light)',
          overflow: 'hidden',
          boxShadow: '0 12px 32px rgba(11, 16, 32, 0.08)',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            alignItems: 'stretch',
          }}
        >
          {/* Product Image Area */}
          <div
            style={{
              position: 'relative',
              minHeight: '260px',
              backgroundColor: '#F8F9FA',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={mainImage}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '340px',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: 'rgba(11, 16, 32, 0.85)',
                backdropFilter: 'blur(6px)',
                color: 'var(--accent-gold)',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '4px 12px',
                borderRadius: '20px',
                letterSpacing: '0.04em',
              }}
            >
              {brandName}
            </div>

            <button
              onClick={() => handleToggleWishlist(product)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                color: isInWishlist(product.id) ? '#E63946' : 'var(--text-muted)',
              }}
              title="お気に入りに追加"
            >
              <Heart size={16} fill={isInWishlist(product.id) ? '#E63946' : 'none'} />
            </button>
          </div>

          {/* Product Detail Content */}
          <div
            style={{
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '6px' }}>
                {headline}
              </div>
              <h4
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  lineHeight: '1.35',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                {product.name}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.6' }}>
                {subtitle}
              </p>

              {/* Price Display */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  backgroundColor: 'var(--bg-sub)',
                  borderRadius: '10px',
                  marginBottom: '18px',
                  border: '1px solid var(--border-light)',
                }}
              >
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  参考価格（税込）
                </span>
                <span
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    fontFamily: 'var(--font-en)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  ¥{product.price.toLocaleString()}
                </span>
              </div>

              {/* Curator note */}
              <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: '1.7', marginBottom: '20px' }}>
                {curatorNotes}
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
              <button
                onClick={() => setSelectedModalProduct(product)}
                className="btn-outline"
                style={{ flex: 1, minWidth: '130px', justifyContent: 'center', padding: '10px 16px', fontSize: '0.85rem', gap: '6px' }}
              >
                <Eye size={15} />
                <span>詳細を見る</span>
              </button>

              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  flex: 1.2,
                  minWidth: '160px',
                  justifyContent: 'center',
                  padding: '10px 16px',
                  fontSize: '0.85rem',
                  backgroundColor: 'var(--accent-gold)',
                  color: 'var(--bg-space)',
                  gap: '6px',
                }}
              >
                <span>{brandName} 公式ストアへ</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <Header
        wishlistCount={wishlist.length}
        onOpenWishlist={() => {}}
      />

      <main style={{ flex: 1 }}>
        {/* Article Hero Banner Header */}
        <section
          style={{
            backgroundColor: 'var(--bg-space)',
            color: '#FFFFFF',
            padding: '110px 0 70px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Background Gradients */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-30%',
              left: '-10%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="container" style={{ maxWidth: '860px', position: 'relative', zIndex: 10 }}>
            {/* Breadcrumb Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', marginBottom: '24px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                ホーム
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
              <Link href="/journal" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>
                Voyager Journal
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>ソファ選びの決定版</span>
            </div>

            {/* Category & Read Meta Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px', flexWrap: 'wrap' }}>
              <span
                style={{
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--accent-gold)',
                  color: 'var(--accent-gold)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  padding: '4px 14px',
                  borderRadius: '20px',
                  letterSpacing: '0.04em',
                }}
              >
                ソファ選び完全ガイド
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={13} color="var(--accent-gold)" /> 2026.08.14
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={13} color="var(--accent-gold)" /> 読了目安: 6分
                </span>
              </div>
            </div>

            {/* Article Main Title */}
            <h1
              style={{
                fontSize: '2.4rem',
                fontWeight: 600,
                color: '#FFFFFF',
                lineHeight: '1.35',
                marginBottom: '20px',
                fontFamily: 'var(--font-serif)',
                letterSpacing: '-0.02em',
              }}
            >
              【2026年最新】一生モノに出会う「デザインソファの選び方」と厳選モデル5選
            </h1>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: '1.85',
                fontWeight: 300,
              }}
            >
              リビングの主役となるソファ選びで後悔しないための3つの基準と、MASTERWALやLigne Rosetなど上質空間をつくる名作ソファを徹底解説。
            </p>
          </div>
        </section>

        {/* Featured Hero Photography */}
        <div className="container" style={{ maxWidth: '960px', marginTop: '-36px', position: 'relative', zIndex: 20 }}>
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              height: '440px',
              boxShadow: '0 20px 48px rgba(0,0,0,0.25)',
              position: 'relative',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85"
              alt="デザインソファのある上質なリビングルーム"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '20px',
                backgroundColor: 'rgba(11,16,32,0.8)',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                padding: '4px 10px',
                borderRadius: '4px',
              }}
            >
              Photo: ORBITAL SELECT Editorial
            </div>
          </div>
        </div>

        {/* Main Article Body */}
        <section style={{ padding: '60px 0 90px' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '52px 48px',
                borderRadius: '16px',
                border: '1px solid var(--border-light)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              }}
            >
              {/* Introduction */}
              <div
                style={{
                  fontSize: '1.08rem',
                  lineHeight: '2.1',
                  color: 'var(--text-main)',
                  marginBottom: '40px',
                  fontWeight: 400,
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '32px',
                }}
              >
                <p style={{ marginBottom: '16px' }}>
                  リビングルームの印象を決定づけ、日々の暮らしの心地よさを左右する「ソファ」。
                </p>
                <p>
                  一度購入すると長く付き合う家具だからこそ、「デザインに一目惚れしたけれど、部屋に置いたら圧迫感があった」「座り心地が合わずに疲れてしまう」といった失敗は避けたいものです。
                </p>
                <p style={{ marginTop: '16px', color: 'var(--text-sub)', fontSize: '0.96rem' }}>
                  本記事では、インテリアのプロ目線で後悔しないソファ選びの3つの基準と、ORBITAL SELECTが厳選した一生モノとして愛せる名作ソファをご紹介します。
                </p>
              </div>

              {/* Table of Contents Box */}
              <div
                style={{
                  backgroundColor: 'var(--bg-sub)',
                  borderRadius: '12px',
                  padding: '24px 28px',
                  marginBottom: '48px',
                  border: '1px solid var(--border-light)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--accent-gold)' }}>
                  <SlidersHorizontal size={18} />
                  <span style={{ fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.04em' }}>目次 - Table of Contents</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li>
                    <a href="#criteria" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>1.</span> 後悔しないデザインソファ選び｜3つの基準
                    </a>
                  </li>
                  <li>
                    <a href="#selected-models" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>2.</span> ORBITAL SELECT 厳選｜空間を格上げする名作ソファ5選
                    </a>
                  </li>
                  <li>
                    <a href="#summary" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>3.</span> まとめ｜理想のソファで暮らしの軌道（Orbit）を描く
                    </a>
                  </li>
                </ul>
              </div>

              {/* Section 1: 3 Criteria */}
              <section id="criteria" style={{ marginBottom: '56px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-space)',
                      color: 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1rem',
                    }}
                  >
                    1
                  </span>
                  <h2
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-serif)',
                    }}
                  >
                    後悔しないデザインソファ選び｜3つの基準
                  </h2>
                </div>

                {/* Criteria 1 */}
                <div style={{ marginBottom: '32px', paddingLeft: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Maximize2 size={18} color="var(--accent-gold)" />
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      ① 空間を広く見せる「高さ（ロースタイル）」と「視線の抜け」
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.9', color: 'var(--text-sub)' }}>
                    日本の住空間において、ソファの存在感は想像以上に大きくなります。部屋を広くスタイリッシュに見せたい場合は、座面や背もたれが低い「ロータイプ」や、アーム（肘掛け）がすっきりしたデザインを選ぶのが鉄則です。空間の中央に置いても視線が遮られず、開放的なリビングを実現できます。
                  </p>
                </div>

                {/* Criteria 2 */}
                <div style={{ marginBottom: '32px', paddingLeft: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Feather size={18} color="var(--accent-gold)" />
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      ② くつろぎ方に合わせた「内部構造・クッション材」
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.9', color: 'var(--text-sub)', marginBottom: '12px' }}>
                    ソファの心地よさはクッション内部の構造によって決まります。ご自身のライフスタイルに合わせて選びましょう：
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                    <div style={{ backgroundColor: 'var(--bg-sub)', padding: '16px 20px', borderRadius: '8px', borderLeft: '3px solid var(--accent-gold)' }}>
                      <strong style={{ color: 'var(--text-main)', fontSize: '0.92rem', display: 'block', marginBottom: '4px' }}>
                        フェザー（羽毛）+ 高密度ウレタン
                      </strong>
                      <span style={{ fontSize: '0.84rem', color: 'var(--text-sub)', lineHeight: '1.6' }}>
                        包み込まれるような柔らかさと適度な反発力。映画鑑賞や横になってくつろぎたい方に最適です。
                      </span>
                    </div>

                    <div style={{ backgroundColor: 'var(--bg-sub)', padding: '16px 20px', borderRadius: '8px', borderLeft: '3px solid var(--text-main)' }}>
                      <strong style={{ color: 'var(--text-main)', fontSize: '0.92rem', display: 'block', marginBottom: '4px' }}>
                        高反発ウレタン・ライトウェーブ
                      </strong>
                      <span style={{ fontSize: '0.84rem', color: 'var(--text-sub)', lineHeight: '1.6' }}>
                        体圧分散に優れ、長時間座っても腰への負担が少ない構造。読書や作業、来客時にも適しています。
                      </span>
                    </div>
                  </div>
                </div>

                {/* Criteria 3 */}
                <div style={{ paddingLeft: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Wrench size={18} color="var(--accent-gold)" />
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      ③ 暮らしに寄り添う「カバーリングとメンテナンス性」
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.9', color: 'var(--text-sub)' }}>
                    日常使いでの汚れが気になる方や、小さなお子様・ペットがいるご家庭には、カバーを取り外してドライクリーニングや水洗いができる「カバーリング仕様」がおすすめです。季節ごとの模様替えや経年変化後のカバー交換にも対応できます。
                  </p>
                </div>
              </section>

              {/* Section 2: 5 Featured Models */}
              <section id="selected-models" style={{ marginBottom: '56px', borderTop: '1px solid var(--border-subtle)', paddingTop: '44px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-space)',
                      color: 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1rem',
                    }}
                  >
                    2
                  </span>
                  <h2
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-serif)',
                    }}
                  >
                    ORBITAL SELECT 厳選｜空間を格上げする名作ソファ5選
                  </h2>
                </div>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem', marginBottom: '32px' }}>
                  提携パートナーの膨大なコレクションの中から、デザイン性・耐久性・機能美を極めた珠玉の5モデルを厳選しました。
                </p>

                {/* Model 1: ROSETTogo */}
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                    ① 50年以上愛される不朽のアイコニックピース
                  </h3>
                  <div style={{ fontSize: '0.95rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '12px' }}>
                    Ligne Roset｜ROSETTogo（ロゼトーゴ）
                  </div>
                  <p style={{ fontSize: '0.94rem', lineHeight: '1.9', color: 'var(--text-sub)' }}>
                    木枠フレームを一切使わず、高密度ウレタンフォームのみで形成されたフランスの名作。蜂の腹部をモチーフにした独創的なフォルムと、包み込まれるような極上の座り心地が魅力です。非常に軽量で模様替えもしやすく、リビングに1台置くだけでモダンなアート空間を演出します。
                  </p>

                  <SyncedProductCard
                    product={rosetTogoProduct}
                    headline="不朽のアイコンピース"
                    subtitle="1973年誕生のフランス最高峰モダンデザイン"
                    curatorNotes="高密度ウレタンのみで構成された軽量設計。空間の主役となる圧倒的な存在感と包み込まれるようなホールド感が魅力。"
                  />
                </div>

                {/* Model 2: MASTERWAL Danish Sofa */}
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                    ② 最高峰ウォールナットが魅せるロースタイルの極み
                  </h3>
                  <div style={{ fontSize: '0.95rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '12px' }}>
                    MASTERWAL｜かたさ選べる デニッシュ ソファ
                  </div>
                  <p style={{ fontSize: '0.94rem', lineHeight: '1.9', color: 'var(--text-sub)' }}>
                    「100年後のアンティーク家具へ」を掲げるマスターウォールを代表するローソファ。最高グレードの無垢材フレームが醸し出す重厚感と、座面の硬さを好みに合わせてカスタマイズできる機能性を両立。圧迫感のない低重心デザインで、上質な和モダン・ミニマル空間をつくり上げます。
                  </p>

                  <SyncedProductCard
                    product={danishSofaProduct}
                    headline="最高峰ウォールナット無垢材"
                    subtitle="MASTERWAL人気No.1を誇る定番ローデザイン"
                    curatorNotes="低い座面設計で部屋を広く見せるロースタイル。硬さの選べるクッションと一生モノの無垢フレームが極上の安心感を紡ぎます。"
                  />
                </div>

                {/* Model 3: HABITAT SOFA BED */}
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                    ③ 「座る・寝る・くつろぐ」を極めた機能美
                  </h3>
                  <div style={{ fontSize: '0.95rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '12px' }}>
                    journal standard Furniture｜HABITAT SOFA BED
                  </div>
                  <p style={{ fontSize: '0.94rem', lineHeight: '1.9', color: 'var(--text-sub)' }}>
                    本物のマットレスに使われる高機能素材「ライトウェーブ」を採用した本格派ソファベッド。女性一人でも座面をスムーズにスライドでき、最大奥行き100cmの広々としたデイベッドに早変わりします。背面にあしらわれた天然木オーク材が、後ろ姿まで美しい佇まいを見せます。
                  </p>

                  <SyncedProductCard
                    product={habitatSofaProduct}
                    headline="本物の寝心地を備えた3WAY機能美"
                    subtitle="ライトウェーブ高反発クッション採用ソファベッド"
                    curatorNotes="ワンアクションでデイベッドに変形。カバーもクッション中材も水洗い可能で、常に清潔さを保てる実用性の高さが秀逸です。"
                  />
                </div>

                {/* Model 4: MUFFY Sofa */}
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                    ④ 空間に柔らかなアクセントを添える曲線美
                  </h3>
                  <div style={{ fontSize: '0.95rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '12px' }}>
                    NOWHERE LIKE HOME｜MUFFY Sofa（マフィー ソファ）
                  </div>
                  <p style={{ fontSize: '0.94rem', lineHeight: '1.9', color: 'var(--text-sub)' }}>
                    左右非対称のアシンメトリーなラウンドフォルムが印象的な3人掛けソファ。背もたれの幅を抑えることで視線が抜け、すっきりとした抜け感を生み出します。リネンを織り交ぜた上質なファブリックは肌ざわりが良く、自由な姿勢でリラックスできます。
                  </p>

                  <SyncedProductCard
                    product={muffySofaProduct}
                    headline="抜け感を生むアシンメトリーフォルム"
                    subtitle="リネンファブリックのさらりとした質感"
                    curatorNotes="背もたれを片側に寄せた独創的な造形。直線的なお部屋に柔らかなリズムを与え、視線が抜けるため空間を圧迫しません。"
                  />
                </div>

                {/* Model 5: Shiawase Sofa */}
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                    ⑤ 至福のホールド感と多用途な2WAY仕様
                  </h3>
                  <div style={{ fontSize: '0.95rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '12px' }}>
                    FLYMEe｜幸せになるソファ
                  </div>
                  <p style={{ fontSize: '0.94rem', lineHeight: '1.9', color: 'var(--text-sub)' }}>
                    高耐久ウレタンとフェザーを贅沢に組み合わせ、名前の通り「一度座ると立ち上がりたくなくなる」極上の座り心地を追求。付属の脚を外せばフロアソファとしても使用可能で、冬場のコタツ合わせや小さな子どもがいるリビングにも柔軟に対応します。
                  </p>

                  <SyncedProductCard
                    product={shiawaseSofaProduct}
                    headline="贅沢フェザーで包み込む極上の安らぎ"
                    subtitle="フロアソファにも対応する2WAYコンバーチブル"
                    curatorNotes="深めの奥行きとフェザーのふんわりとした柔らかさが至福のひとときを演出。家庭で洗えるフルカバーリング仕様です。"
                  />
                </div>
              </section>

              {/* Section 3: Summary */}
              <section id="summary" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '44px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-space)',
                      color: 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1rem',
                    }}
                  >
                    3
                  </span>
                  <h2
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-serif)',
                    }}
                  >
                    まとめ｜理想のソファで暮らしの軌道（Orbit）を描く
                  </h2>
                </div>

                <div style={{ fontSize: '0.98rem', lineHeight: '2', color: 'var(--text-main)' }}>
                  <p style={{ marginBottom: '16px' }}>
                    ソファは単なる腰掛けではなく、日々の疲れを癒やし、家族や大切な人と過ごす時間を豊かにしてくれる中心的な家具です。
                  </p>
                  <p>
                    サイズや価格帯、お部屋のテイストに合わせて、あなただけの一台を見つけてみてください。ORBITAL SELECTでは、提携ブランドの最新ソファをリアルタイム比較検索できます。
                  </p>
                </div>
              </section>

              {/* Bottom Large CTA Banner */}
              <div
                style={{
                  backgroundColor: 'var(--bg-space)',
                  borderRadius: '16px',
                  padding: '40px 36px',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '400px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(212, 175, 55, 0.15)',
                    color: 'var(--accent-gold)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    padding: '4px 14px',
                    borderRadius: '20px',
                    marginBottom: '16px',
                  }}
                >
                  <Sparkles size={14} /> 全提携ブランド横断検索
                </span>

                <h3
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    marginBottom: '12px',
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  理想のソファをさらに探す
                </h3>

                <p
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '0.92rem',
                    maxWidth: '540px',
                    margin: '0 auto 28px',
                    lineHeight: '1.7',
                  }}
                >
                  FLYMEe、MASTERWAL、ACTUSなど全提携パートナーのソファ製品を、価格帯やテイストに合わせて比較できます。
                </p>

                <Link
                  href="/search?category=sofa"
                  className="btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 36px',
                    fontSize: '0.98rem',
                    backgroundColor: 'var(--accent-gold)',
                    color: 'var(--bg-space)',
                    fontWeight: 600,
                    borderRadius: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(212, 175, 55, 0.35)',
                  }}
                >
                  <Search size={18} />
                  <span>全ソファコレクションを比較・検索する</span>
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Product Detail Modal */}
      {selectedModalProduct && (
        <ProductModal
          product={selectedModalProduct}
          onClose={() => setSelectedModalProduct(null)}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={isInWishlist(selectedModalProduct.id)}
        />
      )}

      <Footer />
    </div>
  );
}
