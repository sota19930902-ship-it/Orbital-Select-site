import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ブランド徹底比較 (Brand Comparison) | Orbital Select',
  description:
    '理念・価格帯・マテリアル・おすすめユーザーを横並びで比較検証。',
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
