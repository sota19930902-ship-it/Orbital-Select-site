import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'カテゴリー一覧 (Categories) | Orbital Select',
  description:
    'ソファ、チェア・椅子、テーブル、デスク・机、収納・シェルフ、照明・ランプ、TVボード、ベッド・寝具などカテゴリー別に厳選家具を探す。',
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
