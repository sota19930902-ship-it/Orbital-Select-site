import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '提携パートナーブランド一覧 | Orbital Select',
  description:
    'FLYMEe、MASTERWAL、ACTUS、Air Rhizome Interior、La Vitaなど提携インテリアブランドの特徴と公式ストア情報。',
};

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
