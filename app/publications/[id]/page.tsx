import Link from 'next/link';
import { notFound } from 'next/navigation';

import { publications } from '@/lib/content';

type PublicationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => publications.map((item) => ({ id: item.id }));

const PublicationDetailPage = async ({ params }: PublicationDetailPageProps) => {
  const { id } = await params;
  const publication = publications.find((item) => item.id === id);

  if (!publication) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-10">
      <Link href="/" className="text-sm underline">
        Back to overview
      </Link>

      <article className="space-y-4">
        <h1 className="text-xl">{publication.title}</h1>
        <p className="text-sm">
          {publication.year ?? '—'} · {publication.proseLabel ?? 'publication'}
        </p>
        <p>{publication.description}</p>

        {publication.meta ? <p className="text-sm">{publication.meta}</p> : null}

        {publication.topics.length > 0 ? (
          <section className="space-y-2">
            <h2 className="text-sm uppercase tracking-wide">Topics</h2>
            <ul className="list-disc space-y-1 pl-5">
              {publication.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {publication.links.length > 0 ? (
          <section className="space-y-2">
            <h2 className="text-sm uppercase tracking-wide">Links</h2>
            <ul className="list-disc space-y-1 pl-5">
              {publication.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  );
};

export default PublicationDetailPage;
