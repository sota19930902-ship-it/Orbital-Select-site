import { Product, ProductCategory } from '@/types';
import { Armchair, LayoutGrid, Monitor, Box, Lightbulb, Bed, Tv, LucideIcon } from 'lucide-react';
import React from 'react';
import categoriesData from '@/data/categories.json';

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

export interface RawCategoryItem {
  category_id: string;
  category_name: string;
  category_en?: string;
  description?: string;
  display_order?: number;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  sofa: Armchair,
  chair: Armchair,
  table: LayoutGrid,
  desk: Monitor,
  storage: Box,
  lighting: Lightbulb,
  'tv-board': Tv,
  bed: Bed,
};

const CATEGORY_IMAGES: Record<string, string> = {
  sofa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  chair: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80',
  table: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
  desk: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
  storage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
  lighting: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
  'tv-board': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
  bed: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
};

const CATEGORY_SUBTITLES: Record<string, string> = {
  sofa: '空間の主役となる、至高の座り心地とプロポーション',
  chair: '名作のシルエットと無垢の肌触りが響き合うアイコニックな椅子',
  table: '最高峰ウォールナット無垢材とアイアン脚が織りなす上質な食卓',
  desk: '洗練された機能美と木の温もりで、創造性を高めるワークデスク',
  storage: '美しく魅せる収納。空間を端正に整えるキャビネット＆シェルフ',
  lighting: '北欧デザインの巨匠が生んだ、光の彫刻と空間を彩る名作照明',
  'tv-board': '空間を広く見せるロースタイルの端正なAVローボード',
  bed: '心地よい眠りと上質な寛ぎを届けるベッドフレーム＆マットレス',
};

/**
 * Categoriesシート（categories.json）を正とするマスター配列の動的生成
 */
export const CATEGORY_DEFINITIONS: CategoryDefinition[] = (categoriesData as RawCategoryItem[])
  .sort((a, b) => (a.display_order || 99) - (b.display_order || 99))
  .map((c) => {
    const id = c.category_id as ProductCategory;
    return {
      id,
      nameEn: c.category_en || id.toUpperCase(),
      nameJp: c.category_name,
      shortNameJp: c.category_name.split('・')[0] || c.category_name,
      desc: c.description || '',
      subtitle: CATEGORY_SUBTITLES[id] || '厳選インテリア家具コレクション',
      icon: CATEGORY_ICONS[id] || LayoutGrid,
      image: CATEGORY_IMAGES[id] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    };
  });

/**
 * category_id から Categories シートの最新表示名（category_name）を取得
 */
export function getCategoryName(categoryId: ProductCategory | string): string {
  const found = (categoriesData as RawCategoryItem[]).find((c) => c.category_id === categoryId);
  return found?.category_name || categoryId;
}

/**
 * category_id から Categories シートの英語名を取得
 */
export function getCategoryEn(categoryId: ProductCategory | string): string {
  const found = (categoriesData as RawCategoryItem[]).find((c) => c.category_id === categoryId);
  return found?.category_en || String(categoryId).toUpperCase();
}

/**
 * category_id から Categories シートの説明文を取得
 */
export function getCategoryDescription(categoryId: ProductCategory | string): string {
  const found = (categoriesData as RawCategoryItem[]).find((c) => c.category_id === categoryId);
  return found?.description || '';
}

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
