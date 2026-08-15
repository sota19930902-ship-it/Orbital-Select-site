/**
 * mockData.ts
 * ============
 * スプレッドシート（GAS API）から同期されたデータのみを提供します。
 * ハードコードされた商品データ・記事・コレクション等は全て削除済みです。
 * データを更新するには `pnpm run sync` を実行してください。
 */

import {
  PartnerBrandInfo,
  Product,
  Article,
  OrbitCollection,
  BrandComparison,
  RoomCoordination,
  InstagramPost,
  PartnerBrandId,
  ProductCategory,
} from '../types';
import { SpreadsheetProduct, SpreadsheetBrand } from '../types/product';
import productsJson from './products.json';
import brandsJson from './brands.json';

// ─────────────────────────────────────────────
// ブランドID 正規化ヘルパー
// ─────────────────────────────────────────────
function toPartnerBrandId(brandIdRaw: string): PartnerBrandId {
  const s = brandIdRaw.toLowerCase();
  if (s === 'masterwal') return 'masterwal';
  if (s === 'lavita') return 'lavita';
  if (s === 'actus') return 'actus';
  if (s === 'air-rhizome' || s === 'air_rhizome') return 'air_rhizome';
  if (s === 'kanademono') return 'kanademono';
  if (s === 'crashgate') return 'crashgate';
  if (s === 'receno') return 'receno';
  if (s === 'lowya') return 'lowya';
  return 'flymee';
}

// ─────────────────────────────────────────────
// カテゴリー推定ヘルパー
// ─────────────────────────────────────────────
function inferCategory(sp: SpreadsheetProduct): ProductCategory {
  const cat = (sp.category_id || '').toLowerCase();
  const text = ((sp.product_name || '') + ' ' + (sp.description || '')).toLowerCase();

  if (cat.includes('sofa') || cat.includes('ソファ') || text.includes('sofa') || text.includes('ソファ')) return 'sofa';
  if (
    cat.includes('light') || cat.includes('照明') ||
    text.includes('ペンダント') || text.includes('ライト') || text.includes('ランプ') ||
    text.includes('panthella') || text.includes('akari') || text.includes('ph 5') ||
    text.includes('ルイスポールセン') || text.includes('照明')
  ) return 'lighting';
  if (cat.includes('bed') || cat.includes('ベッド') || cat.includes('寝具') || text.includes('ベッド') || text.includes('寝具') || text.includes('マットレス')) return 'bed';
  if (cat.includes('tv') || text.includes('tvボード') || text.includes('テレビボード') || text.includes('avボード') || text.includes('テレビ台')) return 'tv-board';
  if (cat.includes('storage') || cat.includes('収納') || text.includes('シェルフ') || text.includes('キャビネット') || text.includes('チェスト') || text.includes('サイドボード') || text.includes('ラック') || text.includes('ハンガー')) return 'storage';
  if (cat.includes('desk') || cat.includes('デスク') || cat.includes('机') || text.includes('デスク') || text.includes('机')) return 'desk';
  if (cat.includes('chair') || cat.includes('チェア') || cat.includes('椅子') || text.includes('chair') || text.includes('チェア') || text.includes('スツール') || text.includes('ベンチ')) return 'chair';
  if (cat.includes('table') || cat.includes('テーブル') || text.includes('table') || text.includes('テーブル')) return 'table';
  return 'sofa';
}

// ─────────────────────────────────────────────
// フォールバック画像マップ
// ─────────────────────────────────────────────
const FALLBACK_IMAGES: Record<ProductCategory, string> = {
  sofa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
  lighting: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
  chair: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=1000&q=80',
  table: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80',
  storage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
  desk: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
  'tv-board': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
  bed: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
};

// ─────────────────────────────────────────────
// ブランド情報マップ（brands.json から構築）
// ─────────────────────────────────────────────
const BRANDS_MAP = new Map<string, SpreadsheetBrand>();
(brandsJson as SpreadsheetBrand[]).forEach((b) => {
  if (b?.brand_id) {
    BRANDS_MAP.set(b.brand_id.toLowerCase(), b);
    // air-rhizome と air_rhizome 両方登録
    BRANDS_MAP.set(b.brand_id.toLowerCase().replace('-', '_'), b);
  }
});

// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// テキスト正規化・欠損値（NaN等）サニタイズヘルパー
// ─────────────────────────────────────────────
export function cleanText(val: any): string | undefined {
  if (val === null || val === undefined) return undefined;
  const t = String(val).trim();
  if (!t || /^(nan|null|undefined|不明|未記載|記載なし|-|–)$/i.test(t)) {
    return undefined;
  }
  return t;
}

// ─────────────────────────────────────────────
// ブランド別 商品点数集計
// ─────────────────────────────────────────────
const BRAND_PRODUCT_COUNTS: Record<string, number> = {};
(productsJson as SpreadsheetProduct[]).forEach((p) => {
  const bId = toPartnerBrandId(p.brand_id || 'flymee');
  BRAND_PRODUCT_COUNTS[bId] = (BRAND_PRODUCT_COUNTS[bId] || 0) + 1;
});

// ─────────────────────────────────────────────
// PARTNER_BRANDS_INFO（brands.json から生成）
// ─────────────────────────────────────────────
export const PARTNER_BRANDS_INFO: PartnerBrandInfo[] = (brandsJson as SpreadsheetBrand[]).map((b) => {
  const id = toPartnerBrandId(b.brand_id);
  const heroImageMap: Record<string, string> = {
    flymee: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    masterwal: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    lavita: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
    actus: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    'air-rhizome': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    air_rhizome: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
  };

  const productCount = BRAND_PRODUCT_COUNTS[id] || 0;
  const isComingSoon = productCount === 0;

  return {
    id,
    name: b.brand_name,
    jpName: b.brand_name,
    role: isComingSoon ? `${b.brand_name}（近日掲載予定）` : (b.style || `${b.brand_name}の上質なインテリア`),
    taste: b.style || 'モダン・ラグジュアリー',
    priceRangeText: '要確認',
    minPrice: 30000,
    maxPrice: 1500000,
    targetAsp: ['A8.net', 'アクセストレード'],
    description: isComingSoon
      ? `${b.brand_name}の掲載商品は現在準備中です。近日公開予定です。`
      : `${b.brand_name}の正規パートナーストア。上質なデザイン家具・インテリアを提案します。`,
    philosophy: `${b.brand_name}が追求するデザインと品質。`,
    features: [`${b.brand_name}正規取扱`, '上質なデザイン', '確かな品質保証'],
    targetUsers: `${b.brand_name}の家具をお探しの方`,
    diffPoint: `${b.brand_name}ならではの独自デザインと品質。`,
    logoText: b.brand_name,
    officialUrl: b.official_url || b.affiliate_top_url || '#',
    affiliatePlaceholderUrl: b.affiliate_top_url || '#',
    heroImage: heroImageMap[b.brand_id] || heroImageMap[b.brand_id.replace('-', '_')] || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    categories: ['sofa', 'table', 'chair', 'lighting', 'storage', 'desk', 'tv-board', 'bed'],
    isFeaturedPartner: true,
    productCount,
    isComingSoon,
  };
});

// ─────────────────────────────────────────────
// 全商品・全形式対応 複数画像抽出ヘルパー関数
// ─────────────────────────────────────────────
/**
 * スプレッドシートやAPI、CSV等の様々な入力形式から有効な画像URLを配列として抽出
 * - カンマ区切り: "url1, url2, url3"
 * - 改行区切り: "url1\nurl2"
 * - セミコロン / パイプ / 空白区切り: "url1; url2", "url1 | url2"
 * - 配列形式: images: ["url1", "url2"]
 * - 連番カラム: image_url_1, image_url_2, image1, image2 等
 */
export function extractProductImages(sp: Record<string, any>, fallbackUrl: string): string[] {
  const extracted: string[] = [];

  const addUrl = (val: any) => {
    if (!val) return;
    if (typeof val === 'string') {
      const normalized = val.replace(/\{width\}/gi, '800');
      const matches = normalized.match(/https?:\/\/[^\s,;"'|<>()[\]{}]+/gi);
      if (matches) {
        matches.forEach((raw) => {
          const clean = raw.trim().replace(/[),;.]+$/, '');
          if (clean && !extracted.includes(clean)) {
            extracted.push(clean);
          }
        });
      }
    } else if (Array.isArray(val)) {
      val.forEach(addUrl);
    }
  };

  // 1. sp.images
  if (sp.images) addUrl(sp.images);
  // 2. sp.image_urls
  if (sp.image_urls) addUrl(sp.image_urls);
  // 3. sp.image_url
  if (sp.image_url) addUrl(sp.image_url);

  // 4. 連番カラム (image_url_1, image_url_2, image1, image2, ...)
  Object.keys(sp).forEach((key) => {
    if (/^image(_url)?_?\d+$/i.test(key)) {
      addUrl(sp[key]);
    }
  });

  return extracted.length > 0 ? extracted : [fallbackUrl];
}

// ─────────────────────────────────────────────
// PRODUCTS（products.json から生成）
// ─────────────────────────────────────────────
export const PRODUCTS: Product[] = (() => {
  try {
    return (productsJson as SpreadsheetProduct[]).map((sp, idx) => {
      const brandIdLower = (sp.brand_id || 'flymee').toLowerCase();
      const brandInfo = BRANDS_MAP.get(brandIdLower);
      const partnerBrandId = toPartnerBrandId(sp.brand_id || 'flymee');
      const brandName = brandInfo?.brand_name || (sp.brand_id ? sp.brand_id.toUpperCase() : 'FLYMEe');
      const category = inferCategory(sp);

      const price = Number(sp.price) || 50000;
      let priceRangeId: 'under10' | '10to20' | '20to40' | 'over40' = 'under10';
      if (price < 100000) priceRangeId = 'under10';
      else if (price <= 200000) priceRangeId = '10to20';
      else if (price <= 400000) priceRangeId = '20to40';
      else priceRangeId = 'over40';

      // 全商品対応：すべての画像URLを抽出
      const images = extractProductImages(sp, FALLBACK_IMAGES[category]);

      const affiliateUrl = (sp.affiliate_url && sp.affiliate_url.startsWith('http'))
        ? sp.affiliate_url
        : (brandInfo?.affiliate_top_url || '#');

      const cleanId = (sp.product_id || `sp-${idx}`).replace(/[^a-zA-Z0-9_-]/g, '_');

      // スプレッドシート追加列のサニタイズ（欠損値・NaN等の完全除外）
      const colorsClean = cleanText(sp.colors);
      const sizeClean = cleanText(sp.size);
      const materialsClean = cleanText(sp.materials);
      const descClean = cleanText(sp.description);

      const parsedMaterials = materialsClean
        ? materialsClean
            .split(/[,/、・;]/)
            .map((m) => cleanText(m))
            .filter((m): m is string => Boolean(m))
        : [];
      const materialsList = parsedMaterials.length > 0 ? parsedMaterials : ['高品質素材'];

      const tags: string[] = [brandName];
      const categoryLabels: Record<string, string> = {
        sofa: 'ソファ',
        table: 'テーブル',
        chair: 'チェア',
        lighting: '照明',
        storage: '収納',
        desk: 'デスク',
        'tv-board': 'TVボード',
        bed: 'ベッド',
      };
      if (categoryLabels[category]) tags.push(categoryLabels[category]);

      if (colorsClean) {
        tags.push(colorsClean);
      }
      parsedMaterials.forEach((m) => {
        if (!tags.includes(m)) tags.push(m);
      });
      // 欠損値（NaN, undefined, 不明等）を完全に除外
      const cleanTags = tags.filter((t) => Boolean(cleanText(t)));

      const finalDescription = descClean || '詳細は商品ページでご確認ください。';

      return {
        id: `gas-${cleanId}`,
        rank: idx + 1,
        name: sp.product_name || '名称不明家具',
        subtitle: descClean ? (descClean.length > 48 ? descClean.slice(0, 48) + '...' : descClean) : `${brandName}の厳選家具`,
        brand: brandName,
        partnerBrandId,
        category,
        taste: category === 'lighting' ? 'nordic' : partnerBrandId === 'air_rhizome' ? 'natural' : 'hotel',
        room: category === 'bed' ? 'bed' : category === 'desk' ? 'study' : category === 'chair' || category === 'table' ? 'dining' : 'living',
        price,
        priceRangeId,
        rating: 4.85,
        reviewCount: 32 + idx * 3,
        images,
        description: finalDescription,
        materials: materialsList,
        materialText: materialsClean || undefined,
        dimensions: sizeClean || 'サイズ詳細は公式サイトでご確認ください',
        color: colorsClean || 'カラーバリエーションは公式サイトでご確認ください',
        colors: colorsClean || undefined,
        size: sizeClean || undefined,
        sizeCategory: sizeClean || '標準',
        tags: cleanTags,
        editorialComment: finalDescription,
        pros: ['正規パートナー取扱品', '上質なデザイン・品質保証'],
        cons: ['最新在庫状況は公式サイトをご確認ください'],
        targetUser: `${brandName}の上質なデザイン家具をお探しの方`,
        shopLinks: [
          {
            name: `${brandName} 公式ストア`,
            label: `${brandName}で見る`,
            price,
            url: affiliateUrl,
            isOfficial: true,
          },
        ],
        affiliateUrl,
        isTopRanked: idx < 5,
        isEditorsPick: idx % 3 === 0,
        isNewArrival: true,
      } satisfies Product;
    });
  } catch (err) {
    console.error('[mockData] Failed to parse synced products:', err);
    return [];
  }
})();

// ─────────────────────────────────────────────
// 記事・コレクション等 — スプレッドシート未管理のため空配列
// ─────────────────────────────────────────────

/** ジャーナル記事（スプレッドシート未連携・空配列） */
export const VOYAGER_JOURNAL_ARTICLES: Article[] = [
  {
    id: 'lighting-guide',
    title: '【2026年最新】空間の格を上げる「名作北欧・デザイナーズ照明」の選び方とおすすめ5選',
    subtitle: 'ルイスポールセンのPH 5やパンテラ、イサム・ノグチのAKARIなど、灯すだけで部屋を上質なホテルライク空間に変える名作照明の魅力と選び方を徹底解説。',
    category: '照明・ライティング',
    readTime: '5分',
    date: '2026-08-15',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
    summary: '「家具を一通り揃えたけれど、なんだか部屋が垢抜けない」「夜のリビングがどこか落ち着かない」——その原因は、部屋全体を一律に照らす「シーリングライトの光」にあるかもしれません。空間の陰影をつくり、心地よい時間と情緒を生み出す名作照明選びの3つの鉄則と、厳選した不朽の名作ライティングをご紹介します。',
    comparedBrands: ['La Vita', 'Louis Poulsen', 'Isamu Noguchi'],
    tags: ['照明', 'Louis Poulsen', 'Isamu Noguchi', 'La Vita', '北欧照明', 'ホテルライク', 'インテリアガイド'],
  },
  {
    id: 'sofa-guide',
    title: '【2026年最新】一生モノに出会う「デザインソファの選び方」と厳選モデル5選',
    subtitle: '後悔しないソファ選びの3つの基準を解説。FLYMEeのROSETTogoやMASTERWALの無垢ローソファなど、空間を格上げする厳選デザインソファ5選をご紹介。',
    category: 'ソファ',
    readTime: '6分',
    date: '2026-08-14',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    summary: 'リビングルームの印象を決定づけ、日々の暮らしの心地よさを左右する「ソファ」。インテリアのプロ目線で後悔しないソファ選びの3つの基準と、ORBITAL SELECTが厳選した一生モノとして愛せる名作ソファをご紹介します。',
    comparedBrands: ['Ligne Roset', 'MASTERWAL', 'journal standard Furniture', 'NOWHERE LIKE HOME'],
    tags: ['ソファ', 'MASTERWAL', 'FLYMEe', 'デザイン家具', 'インテリアガイド'],
  },
];

/** ARTICLES は VOYAGER_JOURNAL_ARTICLES のエイリアス */
export const ARTICLES: Article[] = VOYAGER_JOURNAL_ARTICLES;

/** Orbit コレクション（スプレッドシート未連携・空配列） */
export const ORBIT_COLLECTIONS: OrbitCollection[] = [];

/** ブランド比較（スプレッドシート未連携・空配列） */
export const BRAND_COMPARISONS: BrandComparison[] = [];

/** ルームコーディネーション（スプレッドシート未連携・空配列） */
export const ROOM_COORDINATIONS: RoomCoordination[] = [];

/** Instagram 投稿（スプレッドシート未連携・空配列） */
export const INSTAGRAM_POSTS: InstagramPost[] = [];
