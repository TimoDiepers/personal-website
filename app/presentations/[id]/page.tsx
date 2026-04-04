import { presentations } from '@/lib/content';
import { notFound } from 'next/navigation';
import TerminalItemPage from '@/components/terminal-item-page';

export function generateStaticParams() {
  return presentations.map((p) => ({ id: p.id }));
}

export default async function PresentationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = presentations.find((p) => p.id === id);
  if (!item) notFound();

  return (
    <TerminalItemPage item={item} category="presentations" categoryLabel="presentations" />
  );
}
