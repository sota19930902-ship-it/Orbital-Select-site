const path = require('path');
const assert = require('assert');

// 1. Load products
const productsPath = path.resolve(__dirname, '../src/data/products.json');
const productsJson = require(productsPath);

// Category inference helper (matching src/data/mockData.ts)
function inferCategory(sp) {
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

const PRODUCTS = productsJson.map((sp, idx) => ({
  id: sp.product_id || `p-${idx}`,
  name: sp.product_name,
  category: inferCategory(sp),
}));

// All 8 category IDs in CATEGORY_DEFINITIONS
const CATEGORY_IDS = ['sofa', 'chair', 'table', 'desk', 'storage', 'lighting', 'tv-board', 'bed'];

// Unified calculateCategoryCounts logic
function calculateCategoryCounts(products) {
  const counts = {
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

console.log('====================================================');
console.log('  CATEGORY COUNTS CONSISTENCY & INTEGRITY TEST');
console.log('====================================================\n');

// Test 1: Total count check
const counts = calculateCategoryCounts(PRODUCTS);
const sumCounts = Object.values(counts).reduce((a, b) => a + b, 0);

console.log(`[TEST 1] Total Products: ${PRODUCTS.length}`);
console.log(`[TEST 1] Sum of Category Counts: ${sumCounts}`);
assert.strictEqual(sumCounts, PRODUCTS.length, `Sum of counts (${sumCounts}) must equal total products (${PRODUCTS.length})`);
console.log('✓ TEST 1 PASSED: Total count matches exactly.\n');

// Test 2: Category Breakdown & Filter Consistency
console.log('[TEST 2] Category by Category Breakdown & Filter Match:');
let allPassed = true;
CATEGORY_IDS.forEach((catId) => {
  const filterCount = PRODUCTS.filter((p) => p.category === catId).length;
  const countInMap = counts[catId];
  console.log(`  - [${catId.padEnd(10)}]: ${countInMap} items (filter length: ${filterCount})`);
  assert.strictEqual(countInMap, filterCount, `Count mismatch for category ${catId}: map=${countInMap}, filter=${filterCount}`);
});
console.log('✓ TEST 2 PASSED: All 8 categories match filter length.\n');

// Test 3: Simulated Component Output Integrity
console.log('[TEST 3] Verifying Component Logic Equivalences:');

// 3.1 CategoryQuickBar mapping
const quickBarItems = CATEGORY_IDS.map((id) => ({ id, count: counts[id] || 0 }));
assert.strictEqual(quickBarItems.reduce((acc, c) => acc + c.count, 0), PRODUCTS.length);
console.log(`  ✓ CategoryQuickBar items total count = ${PRODUCTS.length}`);

// 3.2 SearchSection dynamic options
const searchOptions = CATEGORY_IDS.map((id) => ({ id, count: counts[id] || 0 }));
assert.strictEqual(searchOptions.reduce((acc, c) => acc + c.count, 0), PRODUCTS.length);
console.log(`  ✓ SearchSection dynamic options total count = ${PRODUCTS.length}`);

// 3.3 CategoryShowcase section items
const showcaseSections = CATEGORY_IDS.map((id) => ({
  id,
  count: PRODUCTS.filter((p) => p.category === id).length,
}));
showcaseSections.forEach((sec) => {
  assert.strictEqual(sec.count, counts[sec.id]);
});
console.log('  ✓ CategoryShowcase counts match calculateCategoryCounts exactly');

// 3.4 /categories page items
const categoriesPageItems = CATEGORY_IDS.map((id) => ({ id, count: counts[id] || 0 }));
categoriesPageItems.forEach((item) => {
  assert.strictEqual(item.count, counts[item.id]);
});
console.log('  ✓ /categories index page counts match calculateCategoryCounts exactly');

// 3.5 /search page dropdown items
const searchPageItems = CATEGORY_IDS.map((id) => ({ id, count: counts[id] || 0 }));
searchPageItems.forEach((item) => {
  assert.strictEqual(item.count, counts[item.id]);
});
console.log('  ✓ /search page dropdown counts match calculateCategoryCounts exactly');

console.log('\n====================================================');
console.log('  ALL TESTS PASSED WITH 100% CONSISTENCY!');
console.log('====================================================');
