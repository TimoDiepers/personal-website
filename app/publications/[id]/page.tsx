import { publications } from '@/lib/content';
import { notFound } from 'next/navigation';
import TerminalItemPage from '@/components/terminal-item-page';

export function generateStaticParams() {
  return publications.map((p) => ({ id: p.id }));
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = publications.find((p) => p.id === id);
  if (!item) notFound();

  return (
    <TerminalItemPage item={item} category="publications" categoryLabel="publications" />
  );
}
