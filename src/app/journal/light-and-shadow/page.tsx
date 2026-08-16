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
  Heart,
  Share2,
  Bookmark,
  Check,
  Eye,
  SlidersHorizontal,
  Compass,
  ArrowUpRight,
} from 'lucide-react';

export default function LightAndShadowEditorialPage() {
  const [selectedModalProduct, setSelectedModalProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [copied, setCopied] = useState(false);

  // Wishlist toggle handler
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (id: string) => wishlist.some((p) => p.id === id);

  // 1. Portable Table Lamp (パンテラ 160 ポータブル)
  const portableLamp = useMemo<Product>(() => {
    const found = PRODUCTS.find(
      (p) =>
        p.id.includes('Panthella_160_Portable_V3_Opal_White') ||
        p.id.includes('panthella-160-portable') ||
        (p.name.includes('パンテラ') && p.name.includes('ポータブル'))
    );
    if (found) return found;

    return {
      id: 'panthella-portable-opal',
      name: 'Panthella 160 Portable V3 Opal White',
      subtitle: 'コードレスで光を自由に持ち運ぶ名作ポータブルランプ',
      brand: 'Louis Poulsen / La Vita',
      partnerBrandId: 'lavita',
      category: 'lighting',
      taste: 'minimal',
      room: 'living',
      price: 39600,
      priceRangeId: 'under10',
      rating: 4.9,
      reviewCount: 38,
      images: [
        'http://lavita-shop.jp/cdn/shop/files/panthella-160-portable-v3-opal_1.jpg',
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      ],
      description: 'コードレスで家中どこへでも持ち運べる名作。低い位置に柔らかな光の溜まりをつくる分散照明の決定版。',
      materials: ['オパールアクリル', 'アルミダイキャスト'],
      dimensions: 'Φ160 × H232 mm (0.5kg)',
      color: 'オパール・ホワイト',
      colors: 'オパール・ホワイト',
      sizeCategory: 'コンパクト',
      tags: ['Louis Poulsen', 'ポータブル照明', '北欧'],
      editorialComment: 'コードレスで家中どこへでも持ち運べる名作。低い位置に柔らかな光の溜まりをつくる分散照明の決定版。',
      pros: ['持ち運び自由', '眩しさを抑えた優しい拡散光', '美しいシルエット'],
      cons: ['屋外常設には非対応'],
      targetUser: '読書灯やベッドサイド、コーナーの陰影づくりを楽しみたい方',
      shopLinks: [
        {
          name: 'La Vita 公式ストア',
          label: '正規店 La Vita で見る',
          price: 39600,
          url: 'https://lavita-shop.jp/products/panthella-160-portable-v3-opal-white',
          isOfficial: true,
        },
      ],
      affiliateUrl: 'https://lavita-shop.jp/products/panthella-160-portable-v3-opal-white',
    };
  }, []);

  // 2. Brass Floor Stand Light (VL45 / 真鍮アクセント照明)
  const brassStandLight = useMemo<Product>(() => {
    const found = PRODUCTS.find(
      (p) =>
        p.id.includes('VL45') ||
        p.id.includes('PH5-Classic') ||
        (p.materials && p.materials.some((m) => m.includes('真鍮')))
    );
    if (found) return found;

    return {
      id: 'vl45-radio-house-brass',
      name: 'VL45 Radiohus Pendant & Brass Fixture',
      subtitle: '無垢真鍮の経年変化と乳白ガラスが紡ぐ上質な光',
      brand: 'Louis Poulsen / La Vita',
      partnerBrandId: 'lavita',
      category: 'lighting',
      taste: 'hotel',
      room: 'living',
      price: 94600,
      priceRangeId: 'under10',
      rating: 4.8,
      reviewCount: 24,
      images: [
        'http://lavita-shop.jp/cdn/shop/files/vl45-radiohus-pendant_1_4b55cdab-cbbe-46a2-9230-a6e997d7daf9.jpg',
        'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80',
      ],
      description: '真鍮パーツの経年変化と乳白ガラスのやわらかな反射光が、壁面に深みのあるグラデーションをもたらす。',
      materials: ['3層吹きガラス', '無塗装真鍮（ブラス）'],
      dimensions: 'Φ250 × H246 mm',
      color: 'オパールガラス × 真鍮',
      colors: 'オパールガラス × 真鍮',
      sizeCategory: '標準',
      tags: ['真鍮', '経年変化', 'Louis Poulsen'],
      editorialComment: '真鍮パーツの経年変化と乳白ガラスのやわらかな反射光が、壁面に深みのあるグラデーションをもたらす。',
      pros: ['育てる真鍮の質感', '眩しさをカットした上質な光'],
      cons: ['重量があるため取付位置の確認推奨'],
      targetUser: '本物の素材感と陰影の深さにこだわりたい方',
      shopLinks: [
        {
          name: 'La Vita 公式ストア',
          label: '正規店 La Vita で見る',
          price: 94600,
          url: 'https://lavita-shop.jp',
          isOfficial: true,
        },
      ],
      affiliateUrl: 'https://lavita-shop.jp',
    };
  }, []);

  // 3. Matte Ceramic / Sculptural Shade (AKARI / セラミックオブジェ)
  const sculpturalObject = useMemo<Product>(() => {
    const found = PRODUCTS.find(
      (p) =>
        p.id.includes('akari') ||
        p.name.includes('AKARI') ||
        p.id.includes('102016')
    );
    if (found) return found;

    return {
      id: 'akari-sculptural-lighting',
      name: 'Isamu Noguchi AKARI 45D / Sculptural Light',
      subtitle: '和紙と竹骨が創り出す、光と影の有機的彫刻',
      brand: 'Isamu Noguchi / La Vita',
      partnerBrandId: 'lavita',
      category: 'lighting',
      taste: 'minimal',
      room: 'living',
      price: 30030,
      priceRangeId: 'under10',
      rating: 4.9,
      reviewCount: 52,
      images: [
        'http://lavita-shop.jp/cdn/shop/files/akari-45d-cd-4.jpg',
        'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
      ],
      description: '光を吸収し輪郭を優しくぼかす和紙・マットテクスチャ。点灯時だけでなく消灯時も彫刻として佇む。',
      materials: ['和紙', '竹ひご', 'スチール'],
      dimensions: 'Φ450 × H430 mm',
      color: 'ホワイト（和紙生成り）',
      colors: 'ホワイト（和紙生成り）',
      sizeCategory: '標準',
      tags: ['AKARI', 'イサムノグチ', '光の彫刻'],
      editorialComment: '光を吸収し輪郭を優しくぼかす和紙・マットテクスチャ。点灯時だけでなく消灯時も彫刻として佇む。',
      pros: ['彫刻のような造形美', '均一で柔らかい拡散光', 'どんな空間にも馴染む'],
      cons: ['水濡れ・引っ掛けに注意'],
      targetUser: '空間に静謐さと有機的な陰影の広がりを求める方',
      shopLinks: [
        {
          name: 'La Vita 公式ストア',
          label: '正規店 La Vita で見る',
          price: 30030,
          url: 'https://lavita-shop.jp',
          isOfficial: true,
        },
      ],
      affiliateUrl: 'https://lavita-shop.jp',
    };
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAFAF8', color: '#2D3748' }}>
      <Header wishlistCount={wishlist.length} onOpenWishlist={() => {}} />

      {/* Main Editorial Content */}
      <main style={{ flex: 1, paddingBottom: '120px' }}>
        {/* Navigation Breadcrumbs */}
        <div style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '860px', padding: '16px 24px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#718096' }}>
              <Link href="/" style={{ color: '#718096', textDecoration: 'none' }}>Top</Link>
              <ChevronRight size={13} />
              <Link href="/journal" style={{ color: '#718096', textDecoration: 'none' }}>Journal</Link>
              <ChevronRight size={13} />
              <span style={{ color: '#2D3748', fontWeight: '500' }}>Interior Styling</span>
            </nav>
          </div>
        </div>

        {/* 1. HERO SECTION (First View) */}
        <header style={{ paddingTop: '56px', paddingBottom: '70px' }}>
          <div className="container" style={{ maxWidth: '860px', padding: '0 24px' }}>
            {/* Meta tags */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    backgroundColor: 'rgba(212, 175, 55, 0.12)',
                    color: '#B7791F',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    letterSpacing: '0.08em',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    textTransform: 'uppercase',
                  }}
                >
                  Journal / Interior Styling
                </span>
                <span style={{ fontSize: '0.8rem', color: '#A0AEC0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> 読了目安：約4分
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={handleCopyLink}
                  aria-label="記事リンクをコピー"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    color: '#4A5568',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {copied ? <Check size={13} color="#38A169" /> : <Share2 size={13} />}
                  <span>{copied ? 'URLをコピーしました' : 'シェア'}</span>
                </button>
              </div>
            </div>

            {/* Title (H1) */}
            <h1
              style={{
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', Georgia, serif",
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: '600',
                color: '#1A202C',
                lineHeight: '1.42',
                letterSpacing: '0.03em',
                marginBottom: '32px',
              }}
            >
              光を「置く」感覚。
              <br className="hidden sm:inline" />
              陰影がつくる空間の奥行きと素材の表情
            </h1>

            {/* Lead Text */}
            <div
              style={{
                fontSize: '1.12rem',
                lineHeight: '1.9',
                color: '#4A5568',
                backgroundColor: '#FFFFFF',
                padding: '32px 36px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #EAEAE6',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                marginBottom: '48px',
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif",
              }}
            >
              <p style={{ marginBottom: '18px' }}>
                天井の照明ひとつで部屋全体を煌々と照らす。そんな当たり前だった光の使い方に、そろそろ疑問を持ってもいい頃かもしれません。均一な明るさは安心感を与える一方で、空間から陰影を奪い、素材が本来持つ表情を平坦にしてしまいます。北欧のインテリアやミニマリズムの思想が長く大切にしてきたのは、光を「隅々まで届かせる」ことではなく、「必要な場所に置く」という発想でした。
              </p>
              <p style={{ margin: 0 }}>
                この記事では、光と影のグラデーションがなぜ空間に奥行きを与えるのか、そのロジックと、陰影の中でこそ美しく見える素材の選び方について解説します。
              </p>
            </div>

            {/* Hero Main Visual (Full bleed / 16:9) */}
            <figure style={{ margin: 0 }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.07)',
                  backgroundColor: '#1A1D24',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1600&q=85"
                  alt="薄暗い夕景の室内、低い位置のテーブルランプ1灯のみが点灯し、壁に柔らかな影が伸びている空間"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <figcaption
                style={{
                  textAlign: 'center',
                  fontSize: '0.78rem',
                  color: '#718096',
                  marginTop: '12px',
                  letterSpacing: '0.04em',
                }}
              >
                薄暗い夕景の室内。低い位置に置かれた1灯の光が、壁面に柔らかな陰影の階調を描き出す。
              </figcaption>
            </figure>
          </div>
        </header>

        {/* 2. SECTION 01: 一室多灯という基本姿勢 */}
        <section style={{ paddingTop: '80px', paddingBottom: '90px' }}>
          <div className="container" style={{ maxWidth: '680px', padding: '0 24px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                color: '#B7791F',
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}
            >
              Section 01
            </span>
            <h2
              style={{
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', Georgia, serif",
                fontSize: 'clamp(1.5rem, 3vw, 1.95rem)',
                fontWeight: '600',
                color: '#1A202C',
                lineHeight: '1.45',
                marginBottom: '32px',
                letterSpacing: '0.02em',
              }}
            >
              一室多灯という基本姿勢
            </h2>

            <div style={{ fontSize: '1.02rem', lineHeight: '2.0', color: '#2D3748', marginBottom: '48px' }}>
              <p style={{ marginBottom: '24px' }}>
                天井の主照明ひとつに頼る「一室一灯」から、複数の灯りを低い位置に分散させる「一室多灯」へ。この切り替えが、陰影のある空間づくりの出発点です。
              </p>
              <p style={{ marginBottom: '24px' }}>
                天井からの均一な光は、部屋の隅々を平等に照らす代わりに、あらゆる場所を同じ明るさに揃えてしまいます。結果として視線はどこにも留まらず、空間は間延びして見えがちです。一方、ソファサイドやコーナーに低めの灯りを置くと、明るい場所と暗い場所のコントラストが自然に生まれ、視線がその濃淡を追いかけるように動き始めます。この「視線の誘導」こそが、部屋に奥行きを感じさせる最初の仕掛けです。
              </p>
              <p style={{ margin: 0 }}>
                ポイントは、光源の数を増やすことよりも、その高さと配置を意識すること。目線より低い位置に光を置くことで、天井や壁面には柔らかな陰影が生まれ、空間全体の印象がぐっと落ち着いたものになります。
              </p>
            </div>
          </div>

          {/* Section 01 Inline Image: 2-Column Grid */}
          <div className="container" style={{ maxWidth: '860px', padding: '0 24px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginBottom: '14px',
              }}
            >
              {/* Left: 天井全体照明 */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid #EAEAE6' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
                    alt="天井全体照明（平坦な印象の空間例）"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'rgba(0,0,0,0.65)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: '600',
                      letterSpacing: '0.04em',
                    }}
                  >
                    一室一灯（均一な明るさ）
                  </div>
                </div>
                <div style={{ padding: '14px 18px', fontSize: '0.82rem', color: '#718096', lineHeight: '1.6' }}>
                  天井の主照明のみ。部屋全体が明るい反面、陰影が薄く平坦な印象になりやすい。
                </div>
              </div>

              {/* Right: フロアランプ＋テーブルランプ */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid #EAEAE6' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
                    alt="フロアランプ＋テーブルランプ（陰影と奥行きのある空間例）"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'rgba(183, 121, 31, 0.9)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: '600',
                      letterSpacing: '0.04em',
                    }}
                  >
                    一室多灯（低位置の分散光）
                  </div>
                </div>
                <div style={{ padding: '14px 18px', fontSize: '0.82rem', color: '#718096', lineHeight: '1.6' }}>
                  低めの位置に複数の灯りを分散。光と影のコントラストが部屋に奥行きを生み出す。
                </div>
              </div>
            </div>

            <p
              style={{
                textAlign: 'center',
                fontSize: '0.82rem',
                color: '#718096',
                margin: '0 auto',
                letterSpacing: '0.04em',
              }}
            >
              キャプション：「光源の高さを下げることで、空間に心地よい視線の溜まりが生まれる」
            </p>
          </div>
        </section>

        {/* 3. SECTION 02: 光の受け皿としての素材選び */}
        <section style={{ paddingTop: '80px', paddingBottom: '90px', borderTop: '1px solid #EFEFEA' }}>
          <div className="container" style={{ maxWidth: '680px', padding: '0 24px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                color: '#B7791F',
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}
            >
              Section 02
            </span>
            <h2
              style={{
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', Georgia, serif",
                fontSize: 'clamp(1.5rem, 3vw, 1.95rem)',
                fontWeight: '600',
                color: '#1A202C',
                lineHeight: '1.45',
                marginBottom: '32px',
                letterSpacing: '0.02em',
              }}
            >
              光の受け皿としての素材選び
            </h2>

            <div style={{ fontSize: '1.02rem', lineHeight: '2.0', color: '#2D3748', marginBottom: '40px' }}>
              <p style={{ marginBottom: '24px' }}>
                陰影をデザインするうえで見落とせないのが、光を受け止める素材そのものの質感です。同じ灯りでも、当たる素材によって表情はまったく異なります。
              </p>
              <p style={{ margin: 0 }}>
                マットな質感の素材は光を柔らかく吸収し、輪郭をぼかしながら陰影に馴染みます。陶器のざらついた肌合いや、ウッドの木目に落ちる細かな陰は、光源が動くたびに微妙な表情の変化を見せてくれる。一方で真鍮のような反射素材は、経年変化によって生まれる艶とくすみのムラが、光を受けるたびに違う顔を見せます。新品の均一な輝きよりも、使い込まれた真鍮の不揃いな反射のほうが、陰影の中でははるかに雄弁です。
              </p>
            </div>

            {/* Blockquote: 「光を吸うもの」と「光を返すもの」 */}
            <blockquote
              style={{
                margin: '0 0 52px 0',
                padding: '28px 32px',
                backgroundColor: '#FFFFFF',
                borderLeft: '4px solid #D4AF37',
                borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif",
              }}
            >
              <strong style={{ fontSize: '1.12rem', color: '#1A202C', display: 'block', marginBottom: '10px', letterSpacing: '0.02em' }}>
                「光を吸うもの」と「光を返すもの」
              </strong>
              <p style={{ margin: 0, fontSize: '0.96rem', lineHeight: '1.85', color: '#4A5568' }}>
                マットな質感ばかりでは陰影が沈み込みすぎてしまい、反射素材ばかりでは落ち着きが失われます。両者を適度に配置することで、灯りをひとつ点けるだけで空間に深みのあるコントラストが生まれます。
              </p>
            </blockquote>
          </div>

          {/* Section 02 Material Contrast Visual (Side-by-Side) */}
          <div className="container" style={{ maxWidth: '860px', padding: '0 24px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {/* Left: マットなセラミック・ウッド */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid #EAEAE6' }}>
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80"
                    alt="ざらつきのあるマットなセラミック・ウッドのテクスチャ（光を吸収）"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'rgba(11, 16, 32, 0.8)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: '600',
                      letterSpacing: '0.04em',
                    }}
                  >
                    光を吸収する：陶器・無垢木材
                  </div>
                </div>
                <div style={{ padding: '14px 18px', fontSize: '0.82rem', color: '#718096', lineHeight: '1.6' }}>
                  ざらつきのあるマットな陶器や無垢材の木目は、光を柔らかく吸い込み、穏やかなグラデーションを生む。
                </div>
              </div>

              {/* Right: 経年変化した真鍮・スモークガラス */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid #EAEAE6' }}>
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80"
                    alt="経年変化した真鍮・スモークガラスのテクスチャ（光を柔らかく反射）"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'rgba(11, 16, 32, 0.8)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: '600',
                      letterSpacing: '0.04em',
                    }}
                  >
                    光を柔らかく返す：真鍮・ガラス
                  </div>
                </div>
                <div style={{ padding: '14px 18px', fontSize: '0.82rem', color: '#718096', lineHeight: '1.6' }}>
                  経年変化を帯びた真鍮やスモークガラスは、光を優しく跳ね返し、静かな輝きのアクセントをつくる。
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SECTION 03: コーナーと壁面に影を落とす */}
        <section style={{ paddingTop: '80px', paddingBottom: '90px', borderTop: '1px solid #EFEFEA' }}>
          <div className="container" style={{ maxWidth: '680px', padding: '0 24px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                color: '#B7791F',
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}
            >
              Section 03
            </span>
            <h2
              style={{
                fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', Georgia, serif",
                fontSize: 'clamp(1.5rem, 3vw, 1.95rem)',
                fontWeight: '600',
                color: '#1A202C',
                lineHeight: '1.45',
                marginBottom: '32px',
                letterSpacing: '0.02em',
              }}
            >
              コーナーと壁面に影を落とす
            </h2>

            <div style={{ fontSize: '1.02rem', lineHeight: '2.0', color: '#2D3748', marginBottom: '48px' }}>
              <p style={{ marginBottom: '24px' }}>
                光と影の関係性を最も実感できるのが、部屋のコーナーや壁面です。何もない壁に光を斜めから当てるだけで、そこに柔らかなグラデーションが生まれ、平面だった壁が立体的な奥行きを持ち始めます。
              </p>
              <p style={{ marginBottom: '24px' }}>
                たとえば、コーナーに背の高いスタンドライトを置き、光を壁に沿わせるように投げかけると、灯り自体の存在感以上に、壁面に伸びる影の形が空間の印象を決定づけます。フラワーベースのような小さなオブジェも、直接光を当てるのではなく、少し離れた場所からの間接的な光で照らすことで、輪郭の影が壁に落ち、単なる置物以上の存在感を持つようになります。
              </p>
              <p style={{ margin: 0 }}>
                大切なのものは、「照らす」ことと「影を落とす」ことを同時に考える視点です。何を照らすかだけでなく、その先にどんな影ができるかまで意識してスタイリングすると、部屋の中に自然と視線の起点が生まれていきます。
              </p>
            </div>

            {/* Large Visual (Vertical 3:4) */}
            <figure style={{ margin: '0 auto', maxWidth: '520px' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '3/4',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
                  backgroundColor: '#EAEAE6',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=85"
                  alt="壁面に落ちるベース（花瓶）の美しいシルエットとグラデーション光"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <figcaption
                style={{
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  color: '#718096',
                  marginTop: '14px',
                  letterSpacing: '0.04em',
                }}
              >
                壁面に落ちるフラワーベースの美しいシルエット。斜めからの柔らかな光が、単なる壁をアートピースに変える。
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 5. EPILOGUE & FEATURED PRODUCTS */}
        <section style={{ paddingTop: '90px', paddingBottom: '40px', borderTop: '1px solid #EFEFEA', backgroundColor: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '860px', padding: '0 24px' }}>
            {/* Epilogue Text */}
            <div style={{ maxWidth: '680px', margin: '0 auto 64px auto' }}>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  color: '#B7791F',
                  letterSpacing: '0.12em',
                  display: 'block',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}
              >
                Epilogue
              </span>
              <h2
                style={{
                  fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', Georgia, serif",
                  fontSize: 'clamp(1.4rem, 2.8vw, 1.8rem)',
                  fontWeight: '600',
                  color: '#1A202C',
                  lineHeight: '1.45',
                  marginBottom: '24px',
                }}
              >
                陰影という名の、住まいの贅沢
              </h2>

              <div
                style={{
                  fontSize: '1.05rem',
                  lineHeight: '2.0',
                  color: '#2D3748',
                  fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif",
                }}
              >
                <p style={{ margin: 0 }}>
                  均一な明るさを手放し、陰影のグラデーションを取り入れること。それは、部屋を暗くすることではなく、光の質と素材の表情に丁寧に向き合うということです。ポータブルなテーブルランプをひとつコーナーに置く、経年変化を纏った真鍮のスタンドライトを選ぶ、マットな質感のセラミックベースで光を受け止める——そうした小さな選択の積み重ねが、住まいに奥行きという名の贅沢をもたらしてくれます。
                </p>
              </div>
            </div>

            {/* Featured Items Divider Header */}
            <div style={{ borderTop: '1px solid #EAEAE6', paddingTop: '48px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#B7791F', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Featured Products
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1A202C', marginTop: '2px' }}>
                    この記事で触れたアイテム
                  </h3>
                </div>
                <span style={{ fontSize: '0.78rem', color: '#718096' }}>
                  ※ カードクリックでスペック・販売詳細をご覧いただけます
                </span>
              </div>
            </div>

            {/* 3-Column Minimal Product Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
                marginBottom: '56px',
              }}
            >
              {/* Product 1: Portable Table Lamp */}
              <div
                style={{
                  backgroundColor: '#FAFAF8',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #EAEAE6',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                }}
              >
                <div
                  style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: '#FFFFFF', cursor: 'pointer', overflow: 'hidden' }}
                  onClick={() => setSelectedModalProduct(portableLamp)}
                >
                  <img
                    src={portableLamp.images[0]}
                    alt={portableLamp.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px', transition: 'transform 0.3s ease' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(11,16,32,0.85)',
                      color: 'var(--accent-gold)',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-xs)',
                    }}
                  >
                    1. Portable Table Lamp
                  </div>
                </div>

                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '4px' }}>
                    {portableLamp.brand}
                  </span>
                  <h4
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: '600',
                      color: '#1A202C',
                      marginBottom: '8px',
                      lineHeight: '1.4',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedModalProduct(portableLamp)}
                  >
                    {portableLamp.name}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#718096', lineHeight: '1.55', marginBottom: '14px' }}>
                    低位置の分散照明として。コードレスで必要な場所へ光を運ぶ名作ポータブル。
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #EAEAE6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: '#1A202C' }}>
                      ¥{portableLamp.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => setSelectedModalProduct(portableLamp)}
                      className="btn-outline"
                      style={{ padding: '6px 14px', fontSize: '0.78rem', borderRadius: 'var(--radius-xs)' }}
                    >
                      詳細を見る <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 2: Brass Floor Stand Light */}
              <div
                style={{
                  backgroundColor: '#FAFAF8',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #EAEAE6',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                }}
              >
                <div
                  style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: '#FFFFFF', cursor: 'pointer', overflow: 'hidden' }}
                  onClick={() => setSelectedModalProduct(brassStandLight)}
                >
                  <img
                    src={brassStandLight.images[0]}
                    alt={brassStandLight.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px', transition: 'transform 0.3s ease' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(11,16,32,0.85)',
                      color: 'var(--accent-gold)',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-xs)',
                    }}
                  >
                    2. Brass Accent Light
                  </div>
                </div>

                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '4px' }}>
                    {brassStandLight.brand}
                  </span>
                  <h4
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: '600',
                      color: '#1A202C',
                      marginBottom: '8px',
                      lineHeight: '1.4',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedModalProduct(brassStandLight)}
                  >
                    {brassStandLight.name}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#718096', lineHeight: '1.55', marginBottom: '14px' }}>
                    経年変化を楽しむ反射素材として。真鍮と乳白ガラスが壁面に優美な陰影を落とす。
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #EAEAE6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: '#1A202C' }}>
                      ¥{brassStandLight.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => setSelectedModalProduct(brassStandLight)}
                      className="btn-outline"
                      style={{ padding: '6px 14px', fontSize: '0.78rem', borderRadius: 'var(--radius-xs)' }}
                    >
                      詳細を見る <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 3: Matte Ceramic / Sculptural Object */}
              <div
                style={{
                  backgroundColor: '#FAFAF8',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #EAEAE6',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                }}
              >
                <div
                  style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: '#FFFFFF', cursor: 'pointer', overflow: 'hidden' }}
                  onClick={() => setSelectedModalProduct(sculpturalObject)}
                >
                  <img
                    src={sculpturalObject.images[0]}
                    alt={sculpturalObject.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px', transition: 'transform 0.3s ease' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(11,16,32,0.85)',
                      color: 'var(--accent-gold)',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-xs)',
                    }}
                  >
                    3. Sculptural Object
                  </div>
                </div>

                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '4px' }}>
                    {sculpturalObject.brand}
                  </span>
                  <h4
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: '600',
                      color: '#1A202C',
                      marginBottom: '8px',
                      lineHeight: '1.4',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedModalProduct(sculpturalObject)}
                  >
                    {sculpturalObject.name}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#718096', lineHeight: '1.55', marginBottom: '14px' }}>
                    光を柔らかく受け止め、影を落とすオブジェとして。和紙と竹骨が創る光の彫刻。
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #EAEAE6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: '#1A202C' }}>
                      ¥{sculpturalObject.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => setSelectedModalProduct(sculpturalObject)}
                      className="btn-outline"
                      style={{ padding: '6px 14px', fontSize: '0.78rem', borderRadius: 'var(--radius-xs)' }}
                    >
                      詳細を見る <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Journal Navigation */}
            <div style={{ textAlign: 'center', paddingTop: '32px', borderTop: '1px solid #EAEAE6' }}>
              <Link
                href="/journal"
                className="btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 32px', fontSize: '0.88rem' }}
              >
                <ArrowLeft size={15} /> Voyager Journal 一覧へ戻る
              </Link>
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
