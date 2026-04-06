import Link from 'next/link';

import { publications } from '@/lib/content';

const HomePage = () => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl">Timo Diepers</h1>
        <p className="text-sm">Publications overview</p>
      </header>

      <section aria-labelledby="publications-heading" className="space-y-3">
        <h2 id="publications-heading" className="text-sm uppercase tracking-wide">
          Publications
        </h2>
        <ul className="space-y-2">
          {publications.map((publication) => (
            <li key={publication.id}>
              <Link
                href={`/publications/${publication.id}`}
                className="block border border-foreground px-3 py-2 hover:bg-foreground hover:text-background"
              >
                <p>{publication.title}</p>
                <p className="text-xs">
                  {publication.year ?? '—'} · {publication.proseLabel ?? 'publication'}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default HomePage;
