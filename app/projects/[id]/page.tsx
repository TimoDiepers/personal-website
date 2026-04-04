import { codingProjects } from '@/lib/content';
import { notFound } from 'next/navigation';
import TerminalItemPage from '@/components/terminal-item-page';

export function generateStaticParams() {
  return codingProjects.map((p) => ({ id: p.id }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = codingProjects.find((p) => p.id === id);
  if (!item) notFound();

  return (
    <TerminalItemPage item={item} category="projects" categoryLabel="projects" />
  );
}
