import fs from 'fs';
import path from 'path';
import { GAS_API_URL, SpreadsheetApiResponse } from '../src/types/product';

async function syncData() {
  console.log(`[Sync] Fetching product data from GAS API: ${GAS_API_URL}`);

  try {
    const response = await fetch(GAS_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const data: SpreadsheetApiResponse = await response.json();

    const dataDir = path.resolve(__dirname, '../src/data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const productsPath = path.join(dataDir, 'products.json');
    const brandsPath = path.join(dataDir, 'brands.json');
    const categoriesPath = path.join(dataDir, 'categories.json');

    const EXCLUDE_IMAGE_PATTERNS = [
      'catnav', 'kago1_ad', 'coupon', 'rebiewbnr', 'reviewbnr', 'banner', 'bnr',
      'spacer', 'cal', 'tiktok', 'insta', 'pinta', 'social', 'yahoo', 'google',
      'doubleclick', 'conbini', 'news', 'price'
    ];

    const sanitizedProducts = (data.products || []).map((p) => {
      if (p.image_url && typeof p.image_url === 'string') {
        const rawUrls = p.image_url.split(/,\s*/);
        const cleanUrls = rawUrls.filter((u) => {
          const lower = u.toLowerCase();
          return !EXCLUDE_IMAGE_PATTERNS.some((pat) => lower.includes(pat));
        });
        if (cleanUrls.length > 0) {
          p.image_url = cleanUrls.slice(0, 4).join(', ');
        }
      }
      return p;
    });

    fs.writeFileSync(productsPath, JSON.stringify(sanitizedProducts, null, 2), 'utf-8');
    fs.writeFileSync(brandsPath, JSON.stringify(data.brands || [], null, 2), 'utf-8');

    if (data.categories && Array.isArray(data.categories) && data.categories.length > 0) {
      fs.writeFileSync(categoriesPath, JSON.stringify(data.categories, null, 2), 'utf-8');
      console.log(`[Sync] Successfully saved ${data.categories.length} categories to ${categoriesPath}`);
    }

    console.log(`[Sync] Successfully saved ${data.products?.length || 0} products to ${productsPath}`);
    console.log(`[Sync] Successfully saved ${data.brands?.length || 0} brands to ${brandsPath}`);
  } catch (error) {
    console.error('[Sync] Data synchronization failed:', error);
    process.exit(1);
  }
}

syncData();


