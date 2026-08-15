export type PartnerBrandId =
  | 'masterwal'
  | 'air_rhizome'
  | 'beaubelle'
  | 'lavita'
  | 'flymee'
  | 'kanademono'
  | 'crashgate'
  | 'receno'
  | 'lowya'
  | 'actus';

export type ProductCategory =
  | 'sofa'
  | 'table'
  | 'chair'
  | 'storage'
  | 'lighting'
  | 'desk'
  | 'tv-board'
  | 'bed';

export interface PartnerBrandInfo {
  id: PartnerBrandId;
  name: string;
  jpName: string;
  role: string;
  taste: string;
  priceRangeText: string;
  minPrice: number;
  maxPrice: number;
  targetAsp: string[];
  description: string;
  philosophy: string;
  features: string[];
  targetUsers: string;
  diffPoint: string;
  logoText: string;
  officialUrl: string;
  affiliatePlaceholderUrl: string;
  heroImage: string;
  categories: ProductCategory[];
  isFeaturedPartner?: boolean;
  productCount?: number;
  isComingSoon?: boolean;
  logoImage?: string;
  affiliateBannerUrl?: string;
}

export interface ShopLink {
  name: string;
  label: string;
  price: number;
  url: string;
  badge?: string;
  isOfficial?: boolean;
}

export interface Product {
  id: string;
  rank?: number;
  name: string;
  subtitle: string;
  brand: string;
  partnerBrandId: PartnerBrandId;
  category: ProductCategory;
  taste: 'nordic' | 'minimal' | 'hotel' | 'vintage' | 'modern';
  room: 'living' | 'dining' | 'bedroom' | 'study';
  price: number;
  priceRangeId: 'under10' | '10to20' | '20to40' | 'over40';
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  materials: string[];
  materialText?: string;
  dimensions: string;
  color: string;
  colors?: string;
  size?: string;
  sizeCategory: string;
  tags: string[];
  editorialComment?: string;
  pros: string[];
  cons: string[];
  targetUser: string;
  shopLinks: ShopLink[];
  affiliateUrl?: string;
  isTopRanked?: boolean;
  isEditorsPick?: boolean;
  isNewArrival?: boolean;
}

export interface SearchFilters {
  query: string;
  category: string;
  brand: string;
  priceRange: string;
  taste: string;
  room: string;
  material: string;
  size: string;
  color: string;
  sortBy: 'popular' | 'price-low' | 'price-high' | 'rating';
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  summary: string;
  contentHtml?: string;
  comparedBrands?: string[];
  tags: string[];
}

export interface OrbitCollection {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  heroImage: string;
  lifestyleConcept: string;
  productIds: string[];
  tags: string[];
}

export interface BrandComparison {
  id: string;
  brand1Id: PartnerBrandId;
  brand2Id: PartnerBrandId;
  title: string;
  summary: string;
  designPhilosophyDiff: string;
  priceSegmentDiff: string;
  materialCraftDiff: string;
  recommendedForBrand1: string;
  recommendedForBrand2: string;
}

export interface RoomCoordination {
  id: string;
  title: string;
  subtitle: string;
  roomType: 'living' | 'dining' | 'bedroom' | 'study';
  taste: string;
  usedBrands: string[];
  image: string;
  productIds: string[];
}

export interface InstagramPost {
  id: string;
  author: string;
  likes: number;
  image: string;
  roomType: string;
  taggedBrands: string[];
  caption: string;
}
