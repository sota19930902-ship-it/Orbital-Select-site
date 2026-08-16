import { Product, ProductCategory } from '@/types';
import { Armchair, LayoutGrid, Monitor, Box, Lightbulb, Bed, Tv } from 'lucide-react';
import React from 'react';

export interface CategoryDefinition {
  id: ProductCategory;
  nameEn: string;
  nameJp: string;
  shortNameJp: string;
  desc: string;
  subtitle: string;
  icon: React.ElementType;
  image: string;
}

/**
 * 全8カテゴリのマスター定義（Single Source of Truth）
 */
export const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  {
    id: 'sofa',
    nameEn: 'SOFA',
    nameJp: 'ソファ',
    shortNameJp: 'ソファ',
    desc: 'ローソファ、カウチソファ、オイルレザー、リネンソファ',
    subtitle: '空間の主役となる、至高の座り心地とプロポーション',
    icon: Armchair,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'chair',
    nameEn: 'CHAIR',
    nameJp: 'チェア・椅子',
    shortNameJp: 'チェア',
    desc: 'ダイニングチェア、ラウンジチェア、ワークチェア、スツール',
    subtitle: '名作のシルエットと無垢の肌触りが響き合うアイコニックな椅子',
    icon: Armchair,
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'table',
    nameEn: 'TABLE',
    nameJp: 'テーブル',
    shortNameJp: 'テーブル',
    desc: 'ウォールナット無垢材、モルタル調天板、アッシュ材ダイニングテーブル',
    subtitle: '最高峰ウォールナット無垢材とアイアン脚が織りなす上質な食卓',
    icon: LayoutGrid,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'desk',
    nameEn: 'DESK',
    nameJp: 'デスク・机',
    shortNameJp: 'デスク',
    desc: '1cm単位オーダーデスク、シンプルワークデスク、書斎家具',
    subtitle: '洗練された機能美と木の温もりで、創造性を高めるワークデスク',
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'storage',
    nameEn: 'STORAGE',
    nameJp: '収納・シェルフ',
    shortNameJp: '収納',
    desc: 'サイドボード、シェルフ、キャビネット、オープンラック',
    subtitle: '美しく魅せる収納。空間を端正に整えるキャビネット＆シェルフ',
    icon: Box,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'lighting',
    nameEn: 'LIGHTING',
    nameJp: '照明・ランプ',
    shortNameJp: '照明',
    desc: 'ルイスポールセン名作、4灯シーリング、間接照明、デスクライト',
    subtitle: '北欧デザインの巨匠が生んだ、光の彫刻と空間を彩る名作照明',
    icon: Lightbulb,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tv-board',
    nameEn: 'TV BOARD',
    nameJp: 'TVボード',
    shortNameJp: 'TVボード',
    desc: 'モルタル調ローボード、ウォールナットAVボード、テレビ台',
    subtitle: '空間を広く見せるロースタイルの端正なAVローボード',
    icon: Tv,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bed',
    nameEn: 'BED',
    nameJp: 'ベッド・寝具',
    shortNameJp: 'ベッド',
    desc: 'フロアローベッド、ウォールナットベッドフレーム、マットレス',
    subtitle: '心地よい眠りと上質な寛ぎを届けるベッドフレーム＆マットレス',
    icon: Bed,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
  },
];

/**
 * 単一の集計関数 (Single Source of Truth)
 * 全商品リストから各カテゴリごとの件数を正確に集計
 */
export function calculateCategoryCounts(products: Product[]): Record<ProductCategory, number> {
  const counts: Record<ProductCategory, number> = {
    sofa: 0,
    chair: 0,
    table: 0,
    desk: 0,
    storage: 0,
    lighting: 0,
    'tv-board': 0,
    bed: 0,
  };

  products.forEach((p) => {
    if (p.category && counts[p.category] !== undefined) {
      counts[p.category]++;
    }
  });

  return counts;
}

/**
 * 特定カテゴリの全商品を取得するヘルパー関数
 */
export function getProductsByCategory(products: Product[], categoryId: ProductCategory): Product[] {
  return products.filter((p) => p.category === categoryId);
}
