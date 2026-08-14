import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { GAS_API_URL, SpreadsheetApiResponse, SpreadsheetProduct } from '../src/types/product';

async function fetchHtml(url: string): Promise<string> {
  return new Promise((resolve) => {
    try {
      const client = url.startsWith('https') ? https : http;
      const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      });
      req.on('error', () => resolve(''));
      req.setTimeout(5000, () => {
        req.destroy();
        resolve('');
      });
    } catch {
      resolve('');
    }
  });
}

function extractPhotosFromHtml(brandId: string, html: string, mainImageUrl: string, productId: string): string[] {
  const images: string[] = [];
  if (mainImageUrl && mainImageUrl.startsWith('http')) {
    images.push(mainImageUrl.trim());
  }

  if (!html) return images;

  const brand = (brandId || '').toLowerCase();

  if (brand === 'flymee') {
    const matches = [...html.matchAll(/https:\/\/static2\.flymee\.jp\/product_images\/[^\s"']+\.(?:jpg|jpeg|png|webp)/gi)];
    matches.forEach((m) => {
      const u = m[0];
      if (!images.includes(u)) {
        images.push(u);
      }
    });
  } else if (brand === 'masterwal') {
    const matches = [...html.matchAll(/["'](\/img\/goods\/(?:L|D\d+|\d+|S)\/[^"']+\.(?:jpg|jpeg|png|webp))["']/gi)];
    matches.forEach((m) => {
      const u = 'https://www.masterwal.jp' + m[1];
      if (!images.includes(u)) {
        images.push(u);
      }
    });
  } else if (brand === 'lavita') {
    const matches = [...html.matchAll(/https?:\/\/lavita-shop\.jp\/cdn\/shop\/(?:files|products)\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi)];
    matches.forEach((m) => {
      let u = m[0];
      if (u.startsWith('http:')) u = u.replace('http:', 'https:');
      u = u.split('?')[0];
      if (!images.includes(u) && !u.includes('_600x600') && !u.includes('_100x100')) {
        images.push(u);
      }
    });
  }

  return images;
}

async function syncData() {
  console.log(`[Sync] Fetching product data from GAS API: ${GAS_API_URL}`);

  try {
    const response = await fetch(GAS_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const data: SpreadsheetApiResponse = await response.json();
    const products = data.products || [];

    console.log(`[Sync] Retrieved ${products.length} products. Checking for multi-image enrichment...`);

    // Enrich products that only have a single image with official gallery photos
    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      const initialUrls = (p.image_url || '').split(',').map((u) => u.trim()).filter(Boolean);

      if (initialUrls.length <= 1 && p.affiliate_url && p.affiliate_url.startsWith('http')) {
        const html = await fetchHtml(p.affiliate_url);
        const allPhotos = extractPhotosFromHtml(p.brand_id, html, initialUrls[0] || '', p.product_id);
        const chosen = allPhotos.slice(0, 5);
        if (chosen.length > 1) {
          p.image_url = chosen.join(', ');
          console.log(`  ✓ Enriched "${p.product_name}" (${p.brand_id}) with ${chosen.length} gallery images`);
        }
      }
    }

    const dataDir = path.resolve(__dirname, '../src/data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const productsPath = path.join(dataDir, 'products.json');
    const brandsPath = path.join(dataDir, 'brands.json');

    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf-8');
    fs.writeFileSync(brandsPath, JSON.stringify(data.brands || [], null, 2), 'utf-8');

    console.log(`[Sync] Successfully saved ${products.length} products to ${productsPath}`);
    console.log(`[Sync] Successfully saved ${data.brands?.length || 0} brands to ${brandsPath}`);
  } catch (error) {
    console.error('[Sync] Data synchronization failed:', error);
    process.exit(1);
  }
}

syncData();

