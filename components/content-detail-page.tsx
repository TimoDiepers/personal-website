import Link from 'next/link';

import type { ContentItem } from '@/lib/content';
import { getItemProseLabel, getItemYear } from '@/lib/content-helpers';

type ContentDetailPageProps = {
  item: ContentItem;
  fallbackLabel: string;
};

const ContentDetailPage = ({ item, fallbackLabel }: ContentDetailPageProps) => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-10">
      <Link href="/" className="text-sm underline">
        Back to overview
      </Link>

      <article className="space-y-4">
        <h1 className="text-xl">{item.title}</h1>
        <p className="text-sm">
          {getItemYear(item)} · {getItemProseLabel(item, fallbackLabel)}
        </p>
        <p>{item.description}</p>
        {item.meta ? <p className="text-sm">{item.meta}</p> : null}

        {item.topics.length > 0 ? (
          <section className="space-y-2">
            <h2 className="text-sm uppercase tracking-wide">Topics</h2>
            <ul className="list-disc space-y-1 pl-5">
              {item.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {item.links.length > 0 ? (
          <section className="space-y-2">
            <h2 className="text-sm uppercase tracking-wide">Links</h2>
            <ul className="list-disc space-y-1 pl-5">
              {item.links.map((link) => (
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

export default ContentDetailPage;
