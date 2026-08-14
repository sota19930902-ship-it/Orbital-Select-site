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

    fs.writeFileSync(productsPath, JSON.stringify(data.products || [], null, 2), 'utf-8');
    fs.writeFileSync(brandsPath, JSON.stringify(data.brands || [], null, 2), 'utf-8');

    console.log(`[Sync] Successfully saved ${data.products?.length || 0} products to ${productsPath}`);
    console.log(`[Sync] Successfully saved ${data.brands?.length || 0} brands to ${brandsPath}`);
  } catch (error) {
    console.error('[Sync] Data synchronization failed:', error);
    process.exit(1);
  }
}

syncData();
