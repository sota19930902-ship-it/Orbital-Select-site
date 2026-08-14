import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '全提携ブランド・製品横断検索 | Orbital Select',
  description:
    'FLYMEe、MASTERWAL、ACTUS、Air Rhizome Interior、La Vitaなど提携ブランドの家具・インテリアを一括比較・検索。',
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
