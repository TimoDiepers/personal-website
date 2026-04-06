import Link from 'next/link';

import { codingProjects, presentations, publications, type ContentItem } from '@/lib/content';

const getYear = (item: ContentItem) => {
  if (item.year) {
    return item.year;
  }

  if (!item.meta) {
    return '—';
  }

  const match = item.meta.match(/(19|20)\d{2}/g);
  return match?.at(-1) ?? '—';
};

const getProseLabel = (item: ContentItem, fallback: string) => {
  return item.proseLabel ?? item.topics[0]?.toLowerCase() ?? fallback;
};

const OverviewSection = ({
  id,
  title,
  items,
  fallbackLabel,
  detailPath,
}: {
  id: string;
  title: string;
  items: ContentItem[];
  fallbackLabel: string;
  detailPath?: string;
}) => {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2 id={id} className="text-sm uppercase tracking-wide">
        {title}
      </h2>
      <ul className="space-y-2">
        {items.map((item) => {
          const body = (
            <>
              <p>{item.title}</p>
              <p className="text-xs">
                {getYear(item)} · {getProseLabel(item, fallbackLabel)}
              </p>
            </>
          );

          if (detailPath) {
            return (
              <li key={item.id}>
                <Link
                  href={`${detailPath}/${item.id}`}
                  className="block border border-foreground px-3 py-2 hover:bg-foreground hover:text-background"
                >
                  {body}
                </Link>
              </li>
            );
          }

          const primaryLink = item.links[0];
          return (
            <li key={item.id}>
              <a
                href={primaryLink?.href ?? '#'}
                target={primaryLink ? '_blank' : undefined}
                rel={primaryLink ? 'noopener noreferrer' : undefined}
                className="block border border-foreground px-3 py-2 hover:bg-foreground hover:text-background"
              >
                {body}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const HomePage = () => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl">Timo Diepers</h1>
        <p className="text-sm">Overview</p>
      </header>

      <OverviewSection
        id="publications-heading"
        title="Publications"
        items={publications}
        fallbackLabel="publication"
        detailPath="/publications"
      />

      <OverviewSection
        id="presentations-heading"
        title="Talks"
        items={presentations}
        fallbackLabel="talk"
      />

      <OverviewSection
        id="projects-heading"
        title="Projects"
        items={codingProjects}
        fallbackLabel="project"
      />
    </main>
  );
};

export default HomePage;
