import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'カテゴリー一覧 (Categories) | Orbital Select',
  description:
    'ソファ、ダイニングテーブル、チェア、照明、収納家具などカテゴリー別に厳選家具を探す。',
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
