import Link from 'next/link';

import ThemeToggle from '@/components/theme-toggle';
import type { ContentItem } from '@/lib/content';
import { getItemType, getItemYear } from '@/lib/content-helpers';

type ContentDetailPageProps = {
  item: ContentItem;
};

const ContentDetailPage = ({ item }: ContentDetailPageProps) => {
  const itemType = getItemType(item, 'Item');
  const itemYear = getItemYear(item);
  const hasYear = itemYear !== '—';

  const detailLine = hasYear ? `${itemType} · ${itemYear}` : itemType;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-10 text-sm">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="text-sm underline">
          Back to overview
        </Link>
        <ThemeToggle size="sm" className="opacity-55" />
      </div>

      <article className="space-y-4">
        <h1 className="text-sm font-bold">{item.title}</h1>
        <p className="text-sm">{detailLine}</p>

        {item.topics.length > 0 ? (
          <section className="pt-1">
            <ul className="flex flex-wrap gap-2">
              {item.topics.map((topic) => (
                <li key={topic}>
                  <span className="inline-flex items-center text-sm">
                    [{topic.toLowerCase()}]
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p>{item.description}</p>

        {item.links.length > 0 ? (
          <section className="space-y-2">
            <h2 className="text-sm uppercase tracking-wide">Links</h2>
            <ul className="list-disc space-y-1 pl-5">
              {item.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline underline decoration-1 underline-offset-4"
                    style={{ textDecoration: 'underline', textUnderlineOffset: '0.2em' }}
                  >
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
