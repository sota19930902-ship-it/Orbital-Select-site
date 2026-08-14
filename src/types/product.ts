/**
 * Google Spreadsheet API (GAS) Product & Brand Data Types
 */

export interface SpreadsheetProduct {
  product_id: string;
  brand_id: string;
  affiliate_url: string;
  product_name: string;
  category_id: string;
  price: number;
  image_url: string;
  description: string;
  status: string;
  updated_at: string;
}

export interface SpreadsheetBrand {
  brand_id: string;
  brand_name: string;
  official_url: string;
  affiliate_top_url: string;
  style: string;
  enabled: string;
}

export interface SpreadsheetApiResponse {
  products: SpreadsheetProduct[];
  brands: SpreadsheetBrand[];
  updated_at: string;
}

export const GAS_API_URL =
  'https://script.google.com/macros/s/AKfycby14DFim0r4eaQA-0pPK8DUKEr8MkLH3Lsyh5IoR384siqQqENEnmAX1OJMfjVFJD0n/exec';
