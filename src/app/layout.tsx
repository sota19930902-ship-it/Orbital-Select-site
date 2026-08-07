import type { Metadata } from 'next';
import { A8Script } from '../components/A8Script';
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
      <body>
        <A8Script />
        {children}
      </body>
    </html>
  );
}
