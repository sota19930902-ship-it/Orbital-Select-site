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
  Lightbulb,
  Sun,
  Flame,
  Maximize2,
  Search,
  Compass,
  ArrowRight,
} from 'lucide-react';

export default function LightingGuideArticlePage() {
  const [selectedModalProduct, setSelectedModalProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Find the 5 featured lighting products from synced spreadsheet data
  const ph5ClassicProduct = useMemo(
    () =>
      PRODUCTS.find(
        (p) =>
          p.id.includes('PH5-Classic') ||
          p.id.includes('PH5_Classic') ||
          (p.name.includes('PH 5') && p.name.includes('クラシック'))
      ),
    []
  );

  const panthellaWhiteProduct = useMemo(
    () =>
      PRODUCTS.find(
        (p) =>
          p.id.includes('Panthella_160_Portable_V3_Opal_White') ||
          p.id.includes('panthella-160-portable-v3-opal-white') ||
          (p.name.includes('パンテラ') && p.name.includes('ホワイト'))
      ),
    []
  );

  const akariProduct = useMemo(
    () =>
      PRODUCTS.find(
        (p) =>
          p.id.includes('akari-45d') ||
          p.id.includes('akari_45d') ||
          p.name.includes('AKARI') ||
          p.name.includes('あかり')
      ),
    []
  );

  const vl45Product = useMemo(
    () =>
      PRODUCTS.find(
        (p) =>
          p.id.includes('VL45') ||
          p.name.includes('VL45') ||
          p.name.includes('ラジオハウス')
      ),
    []
  );

  const panthellaBeigeProduct = useMemo(
    () =>
      PRODUCTS.find(
        (p) =>
          p.id.includes('Panthella_160_Portable_V3_Opal_Beige') ||
          p.id.includes('panthella-160-portable-v3-opal-beige') ||
          (p.name.includes('パンテラ') && p.name.includes('ベージュ'))
      ),
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
    number,
    headline,
    subtitle,
    curatorNotes,
    colorVariantNote,
  }: {
    product?: Product;
    number: string;
    headline: string;
    subtitle: string;
    curatorNotes: string;
    colorVariantNote?: string;
  }) => {
    if (!product) return null;

    const mainImage =
      product.images?.[0] ||
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80';
    const affiliateUrl = product.shopLinks?.[0]?.url || 'https://lavita-shop.jp/';
    const brandName = product.brand || 'La Vita';

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
              minHeight: '280px',
              backgroundColor: '#F8F9FA',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            <img
              src={mainImage}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '320px',
                objectFit: 'contain',
                transition: 'transform 0.4s ease',
              }}
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80';
              }}
            />

            {/* Brand & Badge */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: 'rgba(11, 16, 32, 0.88)',
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

            {/* Photo count indicator if multiple */}
            {product.images && product.images.length > 1 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(11, 16, 32, 0.8)',
                  backdropFilter: 'blur(4px)',
                  color: '#FFFFFF',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '3px 10px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                全 {product.images.length} 枚の写真
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => handleToggleWishlist(product)}
              aria-label="お気に入り登録"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                color: isInWishlist(product.id) ? 'var(--accent-gold)' : 'var(--text-muted)',
                transition: 'transform 0.2s ease',
              }}
            >
              <Heart size={18} fill={isInWishlist(product.id) ? 'var(--accent-gold)' : 'transparent'} color="var(--accent-gold)" />
            </button>
          </div>

          {/* Product Info & Action Area */}
          <div
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#FFFFFF',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--accent-gold)',
                  marginBottom: '6px',
                  letterSpacing: '0.06em',
                }}
              >
                <span>{number}</span>
                <span>•</span>
                <span>{headline}</span>
              </div>

              <h4
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  lineHeight: '1.4',
                  marginBottom: '6px',
                }}
              >
                {product.name}
              </h4>

              <div
                style={{
                  fontSize: '0.84rem',
                  color: 'var(--text-sub)',
                  marginBottom: '16px',
                }}
              >
                {subtitle}
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#F8F9FB',
                  borderRadius: '8px',
                  borderLeft: '3px solid var(--accent-gold)',
                  marginBottom: '20px',
                }}
              >
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-main)',
                    lineHeight: '1.7',
                    margin: 0,
                  }}
                >
                  {curatorNotes}
                </p>
                {colorVariantNote && (
                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      lineHeight: '1.6',
                      marginTop: '6px',
                      marginBottom: 0,
                    }}
                  >
                    💡 {colorVariantNote}
                  </p>
                )}
              </div>
            </div>

            {/* Price & Buttons */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-light)',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>参考価格（税込）</span>
                  <div
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: 'var(--accent-gold)',
                      lineHeight: 1.2,
                    }}
                  >
                    ¥{product.price.toLocaleString()}
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '0.74rem',
                    color: '#2B8A3E',
                    backgroundColor: '#EBFBEE',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontWeight: 600,
                  }}
                >
                  正規取扱店取扱品
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setSelectedModalProduct(product)}
                  className="btn-outline"
                  style={{
                    flex: 1,
                    padding: '11px 14px',
                    fontSize: '0.82rem',
                    justifyContent: 'center',
                    gap: '6px',
                    borderRadius: '8px',
                  }}
                >
                  <Eye size={15} />
                  <span>写真・スペックを見る</span>
                </button>

                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    flex: 1.2,
                    padding: '11px 14px',
                    fontSize: '0.82rem',
                    justifyContent: 'center',
                    gap: '6px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--accent-gold)',
                    color: 'var(--bg-space)',
                    fontWeight: 600,
                  }}
                >
                  <span>公式ストアで見る</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-main)',
      }}
    >
      <Header wishlistCount={wishlist.length} onOpenWishlist={() => {}} />

      <main style={{ flex: 1 }}>
        {/* Article Banner Header */}
        <section
          style={{
            backgroundColor: 'var(--bg-space)',
            color: '#FFFFFF',
            padding: '70px 0 60px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle gold ambient glow in background */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(11, 16, 32, 0) 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="container" style={{ maxWidth: '840px', position: 'relative', zIndex: 2 }}>
            <Link
              href="/journal"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--accent-gold)',
                fontSize: '0.82rem',
                marginBottom: '24px',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              <ArrowLeft size={14} /> Voyager Journal 一覧へ戻る
            </Link>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  color: 'var(--accent-gold)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: '20px',
                  letterSpacing: '0.04em',
                }}
              >
                照明・ライティング
              </span>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  fontSize: '0.78rem',
                  color: 'rgba(255, 255, 255, 0.65)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} /> 2026.08.15
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> 5分で読める
                </span>
                <span>• 執筆: ORBITAL SELECT 編集部</span>
              </div>
            </div>

            <h1
              style={{
                fontSize: '2.1rem',
                fontWeight: 500,
                color: '#FFFFFF',
                lineHeight: '1.4',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}
            >
              【2026年最新】空間の格を上げる「名作北欧・デザイナーズ照明」の選び方とおすすめ5選
            </h1>

            <p
              style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.8',
                marginBottom: 0,
              }}
            >
              ルイスポールセンのPH 5やパンテラ、イサム・ノグチのAKARIなど、灯すだけで部屋を上質なホテルライク空間に変える名作照明の魅力と選び方を徹底解説。
            </p>
          </div>
        </section>

        {/* Hero Image */}
        <div
          className="container"
          style={{ maxWidth: '920px', marginTop: '-30px', position: 'relative', zIndex: 10 }}
        >
          <div
            style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              height: '420px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80"
              alt="空間の格を上げる名作北欧・デザイナーズ照明の選び方"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Article Body Section */}
        <section style={{ padding: '60px 0 100px' }}>
          <div className="container" style={{ maxWidth: '840px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '48px 40px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              {/* Intro Lead */}
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: '2.1',
                  color: 'var(--text-main)',
                  marginBottom: '28px',
                  fontWeight: 400,
                }}
              >
                「家具を一通り揃えたけれど、なんだか部屋が垢抜けない」「夜のリビングがどこか落ち着かない」——その原因は、部屋全体を一律に照らす「シーリングライトの光」にあるかもしれません。
              </p>

              <p
                style={{
                  fontSize: '1.02rem',
                  lineHeight: '2.1',
                  color: 'var(--text-main)',
                  marginBottom: '36px',
                }}
              >
                北欧をはじめとする上質なインテリア空間において、照明は単に部屋を明るくする道具ではなく、<strong style={{ color: 'var(--accent-gold)', borderBottom: '2px solid rgba(212, 175, 55, 0.4)' }}>空間の陰影をつくり、心地よい時間と情緒を生み出すアートピース</strong>です。
              </p>

              <div
                style={{
                  padding: '24px 28px',
                  backgroundColor: 'rgba(212, 175, 55, 0.06)',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  marginBottom: '48px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--accent-gold)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    marginBottom: '8px',
                  }}
                >
                  <Sparkles size={16} />
                  <span>この記事のポイント</span>
                </div>
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-main)',
                    lineHeight: '1.8',
                    margin: 0,
                  }}
                >
                  本記事では、空間を格上げする<strong>名作照明選びの3つの鉄則</strong>と、正規取扱プロショップ「La Vita（ラ・ヴィータ）」から厳選した<strong>一生モノとして愛される不朽の名作ライティング5選</strong>をご紹介します。
                </p>
              </div>

              {/* Table of Contents */}
              <div
                style={{
                  backgroundColor: '#F8F9FB',
                  borderRadius: '12px',
                  padding: '24px 28px',
                  marginBottom: '56px',
                  border: '1px solid var(--border-light)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Compass size={16} color="var(--accent-gold)" />
                  <span>目次（INDEX）</span>
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '0.9rem',
                    lineHeight: '1.9',
                  }}
                >
                  <li>
                    <a
                      href="#section-1"
                      style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}
                    >
                      1. 失敗しない名作照明選び｜3つの鉄則
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section-2"
                      style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}
                    >
                      2. ORBITAL SELECT 厳選｜空間を格上げする名作照明5選
                    </a>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-sub)', listStyle: 'circle' }}>
                      <li>① Louis Poulsen｜PH 5 ペンダントライト（クラシック・ホワイト）</li>
                      <li>② Louis Poulsen｜パンテラ 160 ポータブル（オパール・ホワイト）</li>
                      <li>③ Isamu Noguchi｜AKARI（あかり）ペンダントライト 45D</li>
                      <li>④ Louis Poulsen｜VL45 ラジオハウス ペンダント Φ250</li>
                      <li>⑤ Louis Poulsen｜パンテラ 160 ポータブル（オパール・ベージュ）</li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="#section-3"
                      style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}
                    >
                      3. まとめ｜光を変えるだけで、暮らしの景色が変わる
                    </a>
                  </li>
                </ul>
              </div>

              {/* ───────────────────────────────────────────── */}
              {/* SECTION 1 */}
              {/* ───────────────────────────────────────────── */}
              <div id="section-1" style={{ scrollMarginTop: '100px', marginBottom: '64px' }}>
                <div
                  style={{
                    borderBottom: '2px solid var(--accent-gold)',
                    paddingBottom: '12px',
                    marginBottom: '28px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--accent-gold)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Section 01
                  </span>
                  <h2
                    style={{
                      fontSize: '1.65rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      margin: '4px 0 0',
                    }}
                  >
                    1. 失敗しない名作照明選び｜3つの鉄則
                  </h2>
                </div>

                {/* Principle 1 */}
                <div style={{ marginBottom: '36px' }}>
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px',
                    }}
                  >
                    <Lightbulb size={20} color="var(--accent-gold)" />
                    <span>① 一室一灯から「多灯分散（光のグラデーション）」へ</span>
                  </h3>
                  <p
                    style={{
                      fontSize: '0.96rem',
                      lineHeight: '2',
                      color: 'var(--text-sub)',
                      marginBottom: '12px',
                    }}
                  >
                    天井からの1つの強い光ですべてを照らすのではなく、<strong>ペンダントライト・フロアランプ・ポータブルライトを適所に配置する「多灯照明」</strong>が上質空間の基本です。
                  </p>
                  <p
                    style={{
                      fontSize: '0.96rem',
                      lineHeight: '2',
                      color: 'var(--text-sub)',
                      margin: 0,
                    }}
                  >
                    視線の集まる場所や部屋のコーナーに明かりの溜まりをつくることで、空間に奥行きと立体感が生まれます。
                  </p>
                </div>

                {/* Principle 2 */}
                <div style={{ marginBottom: '36px' }}>
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px',
                    }}
                  >
                    <Sun size={20} color="var(--accent-gold)" />
                    <span>② 目に優しい「グレアフリー（眩しさを抑えた設計）」</span>
                  </h3>
                  <p
                    style={{
                      fontSize: '0.96rem',
                      lineHeight: '2',
                      color: 'var(--text-sub)',
                      marginBottom: '12px',
                    }}
                  >
                    眩しい光源（電球のフィラメント）が直接目に入らない構造になっているかどうかが、名作と呼ばれる照明の共通点です。
                  </p>
                  <p
                    style={{
                      fontSize: '0.96rem',
                      lineHeight: '2',
                      color: 'var(--text-sub)',
                      margin: 0,
                    }}
                  >
                    光がシェードに反射して柔らかく広がる設計を選ぶことで、長時間過ごしても目が疲れず、リラックスできる空間が整います。
                  </p>
                </div>

                {/* Principle 3 */}
                <div style={{ marginBottom: '24px' }}>
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px',
                    }}
                  >
                    <SlidersHorizontal size={20} color="var(--accent-gold)" />
                    <span>③ 適切な「吊り下げの高さ」とサイズバランス</span>
                  </h3>
                  <p
                    style={{
                      fontSize: '0.96rem',
                      lineHeight: '2',
                      color: 'var(--text-sub)',
                      marginBottom: '12px',
                    }}
                  >
                    ダイニングテーブルの上にペンダントライトを吊るす場合、<strong>テーブル天板からシェード下部まで「60〜70cm」</strong>の位置が最も美しく、手元を均一に照らしてくれます。
                  </p>
                  <p
                    style={{
                      fontSize: '0.96rem',
                      lineHeight: '2',
                      color: 'var(--text-sub)',
                      margin: 0,
                    }}
                  >
                    視線を遮らず、料理が最も美味しそうに見えるゴールデンバランスです。
                  </p>
                </div>
              </div>

              {/* ───────────────────────────────────────────── */}
              {/* SECTION 2 */}
              {/* ───────────────────────────────────────────── */}
              <div id="section-2" style={{ scrollMarginTop: '100px', marginBottom: '64px' }}>
                <div
                  style={{
                    borderBottom: '2px solid var(--accent-gold)',
                    paddingBottom: '12px',
                    marginBottom: '28px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--accent-gold)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Section 02
                  </span>
                  <h2
                    style={{
                      fontSize: '1.65rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      margin: '4px 0 0',
                    }}
                  >
                    2. ORBITAL SELECT 厳選｜空間を格上げする名作照明5選
                  </h2>
                </div>

                <p style={{ fontSize: '0.96rem', color: 'var(--text-sub)', lineHeight: '1.9', marginBottom: '32px' }}>
                  正規取扱プロショップ「住まいの照明 ラ・ヴィータ（La Vita）」のラインナップから、デザイン史に名を刻む不朽の名作を厳選しました。
                </p>

                {/* 1. PH 5 Classic White */}
                <SyncedProductCard
                  product={ph5ClassicProduct}
                  number="Item 01"
                  headline="1958年の誕生以来、世界中を魅了し続ける光のマスターピース"
                  subtitle="Louis Poulsen｜PH 5 ペンダントライト（クラシック・ホワイト）"
                  curatorNotes="ポール・ヘニングセンによって生み出された近代照明デザインの金字塔。3枚の主要シェードと内部のリフレクターが完璧な対数螺旋を描き、どの角度から見ても電球の眩しさを感じさせない完全なグレアフリーを実現しています。食卓を温かく包み込み、毎日のディナータイムを贅沢な時間へと変えてくれます。"
                  colorVariantNote="ミニマル空間にはオールマットホワイトの「PH 5 モノクローム・ホワイト」もおすすめです。"
                />

                {/* 2. Panthella 160 Portable Opal White */}
                <SyncedProductCard
                  product={panthellaWhiteProduct}
                  number="Item 02"
                  headline="どこでも上質な光を持ち運べる、現代のアイコニックランプ"
                  subtitle="Louis Poulsen｜パンテラ 160 ポータブル（オパール・ホワイト）"
                  curatorNotes="ヴェルナー・パントンがデザインした、有機的なドーム型シェードが美しい名作「パンテラ」の充電式ポータブルモデル。コードレスで片手で持ち運べるため、リビングのサイドテーブル、ベッドサイド、バルコニーなど、気分に合わせて手軽に上質な光を灯せます。USB-C充電対応で実用性も抜群です。"
                />

                {/* 3. AKARI 45D */}
                <SyncedProductCard
                  product={akariProduct}
                  number="Item 03"
                  headline="和紙を通して広がる、光の彫刻"
                  subtitle="Isamu Noguchi｜AKARI（あかり）ペンダントライト 45D"
                  curatorNotes="世界的な彫刻家イサム・ノグチが手がけた「AKARI」シリーズ。竹ヒゴと美濃和紙を用いて職人の手で一つひとつ作られるシェードは、点灯すると和紙特有の柔らかな陰影を空間全体に広げます。和モダン空間はもちろん、北欧ナチュラルやミニマル・モダンのアクセントとしても抜群の相性を誇ります。"
                />

                {/* 4. VL45 Radio House Pendant */}
                <SyncedProductCard
                  product={vl45Product}
                  number="Item 04"
                  headline="空間に静かな透明感をもたらす吹きガラスの銘品"
                  subtitle="Louis Poulsen｜VL45 ラジオハウス ペンダント Φ250"
                  curatorNotes="デンマークの名建築「ラジオハウス」のためにヴィルヘルム・ラウリッツェンが設計したペンダント。熟練のガラス職人による3層吹きガラスのシェードは、光を四方に柔らかく拡散させつつ、下部に向かって直接光を届ける機能美を備えています。真鍮パーツの経年変化も長く楽しめる名作です。"
                />

                {/* 5. Panthella 160 Portable Opal Beige */}
                <SyncedProductCard
                  product={panthellaBeigeProduct}
                  number="Item 05"
                  headline="落ち着いたニュアンスカラーで彩る上質な佇まい"
                  subtitle="Louis Poulsen｜パンテラ 160 ポータブル（オパール・ベージュ）"
                  curatorNotes="パンテラポータブルの洗練されたニュアンスカラー「オパール・ベージュ」。暖かみのあるベージュトーンが、消灯時でもインテリアのアクセントとして静かな存在感を放ちます。ウォールナット材やオーク材などの木製家具とも自然に調和する絶妙な色合いです。"
                />
              </div>

              {/* ───────────────────────────────────────────── */}
              {/* SECTION 3 */}
              {/* ───────────────────────────────────────────── */}
              <div id="section-3" style={{ scrollMarginTop: '100px', marginBottom: '40px' }}>
                <div
                  style={{
                    borderBottom: '2px solid var(--accent-gold)',
                    paddingBottom: '12px',
                    marginBottom: '28px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--accent-gold)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Section 03
                  </span>
                  <h2
                    style={{
                      fontSize: '1.65rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      margin: '4px 0 0',
                    }}
                  >
                    3. まとめ｜光を変えるだけで、暮らしの景色が変わる
                  </h2>
                </div>

                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: '2.1',
                    color: 'var(--text-main)',
                    marginBottom: '20px',
                  }}
                >
                  家具を買い替えるのは大きな決断ですが、照明を1つ名作に変えるだけで、部屋全体の印象と日々の心地よさは劇的に向上します。
                </p>

                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: '2.1',
                    color: 'var(--text-main)',
                    marginBottom: '36px',
                  }}
                >
                  リビングの主役となるペンダントライトや、手元を優しく照らすポータブルランプから、理想のライティングを見つけてみてください。
                </p>

                {/* Big Search Callout Card */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-space)',
                    borderRadius: '16px',
                    padding: '36px 32px',
                    textAlign: 'center',
                    boxShadow: '0 12px 36px rgba(11, 16, 32, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-40%',
                      right: '-10%',
                      width: '300px',
                      height: '300px',
                      background: 'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(11, 16, 32, 0) 70%)',
                      pointerEvents: 'none',
                    }}
                  />

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '4px 14px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(212, 175, 55, 0.15)',
                      color: 'var(--accent-gold)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginBottom: '16px',
                    }}
                  >
                    <Search size={14} />
                    <span>LIGHTING COLLECTION</span>
                  </div>

                  <h3
                    style={{
                      color: '#FFFFFF',
                      fontSize: '1.45rem',
                      fontWeight: 500,
                      marginBottom: '12px',
                    }}
                  >
                    ORBITAL SELECTの全照明コレクションを見る
                  </h3>

                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.75)',
                      fontSize: '0.9rem',
                      lineHeight: '1.7',
                      maxWidth: '540px',
                      margin: '0 auto 24px',
                    }}
                  >
                    ペンダントライト、スタンドライト、ポータブル照明など、提携パートナー正規店から厳選された照明アイテムを一括検索できます。
                  </p>

                  <Link
                    href="/search?category=lighting"
                    className="btn-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 36px',
                      fontSize: '0.95rem',
                      backgroundColor: 'var(--accent-gold)',
                      color: 'var(--bg-space)',
                      fontWeight: 700,
                      borderRadius: '30px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 16px rgba(212, 175, 55, 0.35)',
                      transition: 'transform 0.2s ease, boxShadow 0.2s ease',
                    }}
                  >
                    <span>全照明アイテムを条件指定検索する</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Product Modal for Full Gallery & Details */}
      <ProductModal
        product={selectedModalProduct}
        onClose={() => setSelectedModalProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={selectedModalProduct ? isInWishlist(selectedModalProduct.id) : false}
      />
    </div>
  );
}
