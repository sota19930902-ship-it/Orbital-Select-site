import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Orbital Select — Space × Furniture Discovery Platform',
  description:
    'MASTERWAL、La Vitaなど人気の厳選インテリアブランドを比較探求。',

  keywords: [
    'Orbital Select',
    'オービタルセレクト',
    'MASTERWAL',
    'La Vita',
    '高級家具比較',
    'アフィリエイト',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script src="//statics.a8.net/a8link/a8linkmgr.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              a8linkmgr({
                "config_id": "xuxzuGXh2ibMRHpHtnyH"
              });
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

