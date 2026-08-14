import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '【2026年最新】空間の格を上げる「名作北欧・デザイナーズ照明」の選び方とおすすめ5選｜Orbital Select',
  description:
    'ルイスポールセンのPH 5やパンテラ、イサム・ノグチのAKARIなど、灯すだけで部屋を上質なホテルライク空間に変える名作照明の魅力と選び方を徹底解説。',
  keywords: [
    '照明 選び方',
    '北欧照明',
    'デザイナーズ照明',
    'PH 5',
    'パンテラ ポータブル',
    'AKARI',
    'VL45 ラジオハウス',
    'Louis Poulsen',
    'イサムノグチ',
    'La Vita',
    'ペンダントライト',
    'ホテルライク',
    'Orbital Select',
  ],
  openGraph: {
    title: '【2026年最新】空間の格を上げる「名作北欧・デザイナーズ照明」の選び方とおすすめ5選｜Orbital Select',
    description:
      'ルイスポールセンのPH 5やパンテラ、イサム・ノグチのAKARIなど、灯すだけで部屋を上質なホテルライク空間に変える名作照明の魅力と選び方を徹底解説。',
    type: 'article',
    publishedTime: '2026-08-15T00:00:00Z',
    authors: ['ORBITAL SELECT Editorial Team'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: '空間の格を上げる名作北欧・デザイナーズ照明の選び方とおすすめ5選',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '【2026年最新】空間の格を上げる「名作北欧・デザイナーズ照明」の選び方とおすすめ5選｜Orbital Select',
    description:
      'ルイスポールセンのPH 5やパンテラ、イサム・ノグチのAKARIなど、灯すだけで部屋を上質なホテルライク空間に変える名作照明の魅力と選び方を徹底解説。',
    images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function LightingGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
