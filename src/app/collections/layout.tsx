import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '特集コレクション (Orbit Collections) | Orbital Select',
  description:
    'ブランドの枠を超え、ライフスタイルと空気感で組み合わせるマルチブランドコーディネート。',
};

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
