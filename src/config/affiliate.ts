import { PartnerBrandId } from '../types';

export interface AffiliateBrandConfig {
  brandId: PartnerBrandId;
  defaultOfficialUrl: string;
  affiliatePlaceholderUrl: string;
  aspName: string;
  affiliateParams: string;
}

export const GLOBAL_AFFILIATE_CONFIG: Record<string, AffiliateBrandConfig> = {
  masterwal: {
    brandId: 'masterwal',
    defaultOfficialUrl: 'https://www.masterwal.jp',
    affiliatePlaceholderUrl: 'https://www.masterwal.jp',
    aspName: 'A8.net',
    affiliateParams: 'utm_source=a8&utm_medium=affiliate&utm_campaign=orbital_select',
  },
  air_rhizome: {
    brandId: 'air_rhizome',
    defaultOfficialUrl: 'https://www.air-r.jp',
    affiliatePlaceholderUrl: 'https://www.air-r.jp',
    aspName: 'A8.net',
    affiliateParams: 'utm_source=a8&utm_medium=affiliate&utm_campaign=orbital_select',
  },
  beaubelle: {
    brandId: 'beaubelle',
    defaultOfficialUrl: 'https://beaubelle.shop',
    affiliatePlaceholderUrl: 'https://beaubelle.shop',
    aspName: 'A8.net',
    affiliateParams: 'utm_source=a8&utm_medium=affiliate&utm_campaign=orbital_select',
  },
  lavita: {
    brandId: 'lavita',
    defaultOfficialUrl: 'https://lavita-shop.jp',
    affiliatePlaceholderUrl: 'https://lavita-shop.jp',
    aspName: 'アクセストレード',
    affiliateParams: 'utm_source=accesstrade&utm_medium=affiliate&utm_campaign=orbital_select',
  },
  flymee: {
    brandId: 'flymee',
    defaultOfficialUrl: 'https://flymee.jp',
    affiliatePlaceholderUrl: 'https://flymee.jp',
    aspName: 'A8.net',
    affiliateParams: 'utm_source=a8&utm_medium=affiliate&utm_campaign=orbital_select',
  },
  kanademono: {
    brandId: 'kanademono',
    defaultOfficialUrl: 'https://kanademono.design',
    affiliatePlaceholderUrl: 'https://kanademono.design',
    aspName: 'A8.net',
    affiliateParams: 'utm_source=a8&utm_medium=affiliate&utm_campaign=orbital_select',
  },
  crashgate: {
    brandId: 'crashgate',
    defaultOfficialUrl: 'https://crashgate.jp',
    affiliatePlaceholderUrl: 'https://crashgate.jp',
    aspName: 'バリューコマース',
    affiliateParams: 'utm_source=valuecommerce&utm_medium=affiliate&utm_campaign=orbital_select',
  },
  receno: {
    brandId: 'receno',
    defaultOfficialUrl: 'https://www.receno.com',
    affiliatePlaceholderUrl: 'https://www.receno.com',
    aspName: 'A8.net',
    affiliateParams: 'utm_source=a8&utm_medium=affiliate&utm_campaign=orbital_select',
  },
  lowya: {
    brandId: 'lowya',
    defaultOfficialUrl: 'https://www.low-ya.com',
    affiliatePlaceholderUrl: 'https://www.low-ya.com',
    aspName: 'もしもアフィリエイト',
    affiliateParams: 'utm_source=moshimo&utm_medium=affiliate&utm_campaign=orbital_select',
  },
  actus: {
    brandId: 'actus',
    defaultOfficialUrl: 'https://online.actus-interior.com',
    affiliatePlaceholderUrl: 'https://online.actus-interior.com',
    aspName: 'バリューコマース',
    affiliateParams: 'utm_source=valuecommerce&utm_medium=affiliate&utm_campaign=vc&icadid=adw99v',
  },
};

/**
 * 全ブランドに対して正式なアフィリエイト・トラッキングパラメータを付与したURLを生成する関数
 */
export function getAffiliateUrl(partnerBrandId: string, customShopUrl?: string, productName?: string): string {
  const config = GLOBAL_AFFILIATE_CONFIG[partnerBrandId];
  const params = config ? config.affiliateParams : 'utm_source=orbital_select&utm_medium=affiliate';

  const appendParams = (url: string) => {
    if (!url || url === '#') return '#';
    if (url.includes('utm_source=')) return url;
    const delimiter = url.includes('?') ? '&' : '?';
    return `${url}${delimiter}${params}`;
  };

  // 1. Deep Link URL with verified search parameters
  if (productName && productName.length > 0) {
    let keyword = productName;
    if (productName.includes('WILDWOOD')) keyword = 'WILDWOOD';
    else if (productName.includes('DANISH')) keyword = 'DANISH';
    else if (productName.includes('Wism')) keyword = 'Wism';
    else if (productName.includes('Luma')) keyword = 'Luma';
    else if (productName.includes('RECONTE')) keyword = 'RECONTE';
    else if (productName.includes('AIR CORNER')) keyword = 'AIR CORNER';
    else if (productName.includes('PH 5')) keyword = 'PH5';
    else if (productName.includes('Panthella')) keyword = 'Panthella';
    else if (productName.includes('THE TABLE')) keyword = 'TABLE';
    else if (productName.includes('OPIAM')) keyword = 'オピアム';
    else if (productName.includes('AGRA')) keyword = 'AGRA';
    else if (productName.includes('テレビ台')) keyword = 'テレビ台';
    else if (productName.includes('ベッド')) keyword = 'ベッド';
    else {
      keyword = productName
        .replace(/^(MASTERWAL|KANADEMONO|Louis Poulsen|Air Rhizome|BeauBelle|LOWYA|CRASH GATE|Re:CENO|ACTUS)/i, '')
        .replace(/[\(\)（）]/g, ' ')
        .trim();
    }

    const encoded = encodeURIComponent(keyword);

    switch (partnerBrandId) {
      case 'masterwal':
        return appendParams(`https://www.masterwal.jp/shop/goods/search.aspx?search=x&keyword=${encoded}`);
      case 'air_rhizome':
        return appendParams(`https://www.air-r.jp/products/list.php?name=${encoded}`);
      case 'beaubelle':
        return appendParams(`https://beaubelle.shop/?s=${encoded}`);
      case 'lavita':
        return appendParams(`https://lavita-shop.jp/?s=${encoded}`);
      case 'flymee':
        return appendParams(`https://flymee.jp`);
      case 'kanademono':
        return appendParams(`https://kanademono.design/search?q=${encoded}`);
      case 'crashgate':
        return appendParams(`https://crashgate.jp/shop/goods/search.aspx?keyword=${encoded}`);
      case 'receno':
        return appendParams(`https://www.receno.com`);
      case 'lowya':
        return appendParams(`https://www.low-ya.com/search?q=${encoded}`);
      case 'actus':
        return appendParams(`https://online.actus-interior.com/?keyword=${encoded}`);
    }
  }

  // 2. Custom URL Fallback
  if (customShopUrl && customShopUrl.startsWith('http')) {
    return appendParams(customShopUrl);
  }

  // 3. Fallback to Brand Base URL
  return appendParams(config?.defaultOfficialUrl || '#');
}
