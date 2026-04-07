'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import ThemeToggle from '@/components/theme-toggle';
import { codingProjects, presentations, publications, type ContentItem } from '@/lib/content';
import { getItemType, getItemYear, orderByDateDesc } from '@/lib/content-helpers';

const socialLinks = [
  { href: 'mailto:timo.diepers@rwth-aachen.de', label: 'Mail' },
  { href: 'https://www.linkedin.com/in/timo-diepers/', label: 'LinkedIn' },
  { href: 'https://github.com/TimoDiepers', label: 'GitHub' },
  { href: 'https://orcid.org/0009-0002-8566-8618', label: 'ORCID' },
];

const OverviewSection = ({
  id,
  title,
  items,
  fallbackType,
  detailPath,
}: {
  id: string;
  title: string;
  items: ContentItem[];
  fallbackType: string;
  detailPath?: string;
}) => {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2 id={id} className="border-b border-foreground pb-1 text-sm lowercase tracking-[0.2em]">
        {title}
      </h2>
      <ul className="space-y-2">
        {orderByDateDesc(items).map((item) => {
          const body = (
            <>
              <p className="font-bold">{item.title}</p>
              <p className="text-sm">
                {getItemYear(item)} · {getItemType(item, fallbackType)}
              </p>
            </>
          );

          if (detailPath) {
            return (
              <li key={item.id}>
                <Link
                  href={`${detailPath}/${item.id}`}
                  prefetch
                  className="block border border-foreground px-3 py-2 transition-colors duration-150 hover:bg-foreground hover:text-background hover:ring-1 hover:ring-foreground/60"
                >
                  {body}
                </Link>
              </li>
            );
          }

          const primaryLink = item.links?.[0];

          if (!primaryLink) {
            return (
              <li key={item.id}>
                <div className="block border border-foreground px-3 py-2">{body}</div>
              </li>
            );
          }

          return (
            <li key={item.id}>
              <a
                href={primaryLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-foreground px-3 py-2 transition-colors duration-150 hover:bg-foreground hover:text-background hover:ring-1 hover:ring-foreground/60"
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

const getFilteredItems = (items: ContentItem[], activeTopics: string[]) => {
  if (activeTopics.length === 0) {
    return items;
  }

  return items.filter((item) => activeTopics.some((topic) => item.topics.includes(topic)));
};

const allTopics = Array.from(
  new Set([...publications, ...presentations, ...codingProjects].flatMap((item) => item.topics)),
).sort((a, b) => a.localeCompare(b));

const HomeOverview = () => {
  const router = useRouter();
  const [activeTopics, setActiveTopics] = useState<string[]>([]);

  useEffect(() => {
    const routes = [
      ...publications.map((item) => `/publications/${item.id}`),
      ...presentations.map((item) => `/presentations/${item.id}`),
      ...codingProjects.map((item) => `/coding/${item.id}`),
    ];

    const prefetchRoutes = () => {
      routes.forEach((route) => router.prefetch(route));
    };

    if (typeof window === 'undefined') {
      return;
    }

    const win = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (win.requestIdleCallback && win.cancelIdleCallback) {
      const idleHandle = win.requestIdleCallback(prefetchRoutes, { timeout: 1500 });
      return () => win.cancelIdleCallback?.(idleHandle);
    }

    const timeoutHandle = globalThis.setTimeout(prefetchRoutes, 250);
    return () => globalThis.clearTimeout(timeoutHandle);
  }, [router]);

  const filteredPublications = useMemo(
    () => getFilteredItems(publications, activeTopics),
    [activeTopics],
  );
  const filteredPresentations = useMemo(
    () => getFilteredItems(presentations, activeTopics),
    [activeTopics],
  );
  const filteredCoding = useMemo(
    () => getFilteredItems(codingProjects, activeTopics),
    [activeTopics],
  );

  const toggleTopic = (topic: string) => {
    setActiveTopics((current) =>
      current.includes(topic) ? current.filter((activeTopic) => activeTopic !== topic) : [...current, topic],
    );
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-6 py-10 text-sm">
      <header className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-sm font-bold">Timo Diepers</h1>
          <ThemeToggle size="sm" className="opacity-55" />
        </div>
        <p className="text-sm">Overview / research notes / software</p>
        <nav
          aria-label="Topic filters"
          className="flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-8 text-sm"
        >
          <span className="text-sm">Filter:</span>
          <button
            type="button"
            onClick={() => setActiveTopics([])}
            aria-pressed={activeTopics.length === 0}
            className={`cursor-pointer px-1 py-0.5 transition-opacity duration-150 ${
              activeTopics.length === 0
                ? 'font-medium underline underline-offset-4 decoration-1'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            all
          </button>
          {allTopics.map((filterTopic) => {
            const isActive = activeTopics.includes(filterTopic);

            return (
              <button
                type="button"
                key={filterTopic}
                onClick={() => toggleTopic(filterTopic)}
                aria-pressed={isActive}
                className={`cursor-pointer px-1 py-0.5 transition-opacity duration-150 ${
                  isActive
                    ? 'font-medium underline underline-offset-4 decoration-1'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                [{filterTopic.toLowerCase()}]
              </button>
            );
          })}
        </nav>
      </header>

      <OverviewSection
        id="publications-heading"
        title="Publications"
        items={filteredPublications}
        fallbackType="Publication"
        detailPath="/publications"
      />

      <OverviewSection
        id="presentations-heading"
        title="Presentations"
        items={filteredPresentations}
        fallbackType="Presentation"
        detailPath="/presentations"
      />

      <OverviewSection
        id="coding-heading"
        title="Coding"
        items={filteredCoding}
        fallbackType="Coding"
        detailPath="/coding"
      />

      <footer className="border-t border-foreground pt-4 text-sm">
        <nav aria-label="Social links" className="flex flex-wrap gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="border border-foreground px-2 py-1 hover:bg-foreground hover:text-background"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
    </main>
  );
};

export default HomeOverview;
