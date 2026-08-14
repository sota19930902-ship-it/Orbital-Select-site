import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '【2026年最新】デザインソファの選び方と厳選5選｜Orbital Select',
  description:
    'リビングの主役となるソファ選びで後悔しないための3つの基準と、MASTERWALやLigne Rosetなど上質空間をつくる名作ソファを徹底解説。',
  keywords: [
    'ソファ 選び方',
    'デザインソファ',
    'ローソファ',
    'ROSETTogo',
    'デニッシュソファ',
    'HABITAT SOFA BED',
    'MUFFY Sofa',
    '幸せになるソファ',
    'MASTERWAL',
    'FLYMEe',
    'インテリア',
    'Orbital Select',
  ],
  openGraph: {
    title: '【2026年最新】デザインソファの選び方と厳選5選｜Orbital Select',
    description:
      'リビングの主役となるソファ選びで後悔しないための3つの基準と、MASTERWALやLigne Rosetなど上質空間をつくる名作ソファを徹底解説。',
    type: 'article',
    publishedTime: '2026-08-14T00:00:00Z',
    authors: ['ORBITAL SELECT Editorial Team'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'デザインソファの選び方と厳選モデル5選',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '【2026年最新】デザインソファの選び方と厳選5選｜Orbital Select',
    description:
      'リビングの主役となるソファ選びで後悔しないための3つの基準と、MASTERWALやLigne Rosetなど上質空間をつくる名作ソファを徹底解説。',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function SofaGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
