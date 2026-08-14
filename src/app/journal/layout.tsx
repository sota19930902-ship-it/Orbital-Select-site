import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Voyager Journal (特集・読みもの) | Orbital Select',
  description:
    '家具選びの哲学、ブランド探訪、空間づくりの知恵を深掘りするオルビタル・マガジン。',
};

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
