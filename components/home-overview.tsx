'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { codingProjects, presentations, publications, type ContentItem } from '@/lib/content';
import { getItemProseLabel, getItemYear, orderByDateDesc } from '@/lib/content-helpers';

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
      <h2 id={id} className="border-b border-foreground pb-1 text-sm uppercase tracking-[0.2em]">
        {title}
      </h2>
      <ul className="space-y-2">
        {orderByDateDesc(items).map((item) => {
          const body = (
            <>
              <p>{item.title}</p>
              <p className="text-xs">
                {getItemYear(item)} · {getItemProseLabel(item, fallbackLabel)}
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
  const [activeTopics, setActiveTopics] = useState<string[]>([]);

  const filteredPublications = useMemo(
    () => getFilteredItems(publications, activeTopics),
    [activeTopics],
  );
  const filteredPresentations = useMemo(
    () => getFilteredItems(presentations, activeTopics),
    [activeTopics],
  );
  const filteredProjects = useMemo(
    () => getFilteredItems(codingProjects, activeTopics),
    [activeTopics],
  );

  const toggleTopic = (topic: string) => {
    setActiveTopics((current) =>
      current.includes(topic) ? current.filter((activeTopic) => activeTopic !== topic) : [...current, topic],
    );
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl">Timo Diepers</h1>
        <p className="text-sm">Overview / research notes / software</p>
        <nav aria-label="Topic filters" className="flex flex-wrap gap-2 pt-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTopics([])}
            aria-pressed={activeTopics.length === 0}
            className={`border border-foreground px-2 py-1 hover:bg-foreground hover:text-background ${
              activeTopics.length === 0 ? 'bg-foreground text-background ring-1 ring-foreground ring-offset-1' : ''
            }`}
          >
            All
          </button>
          {allTopics.map((filterTopic) => {
            const isActive = activeTopics.includes(filterTopic);

            return (
              <button
                type="button"
                key={filterTopic}
                onClick={() => toggleTopic(filterTopic)}
                aria-pressed={isActive}
                className={`border px-2 py-1 hover:bg-foreground hover:text-background ${
                  isActive
                    ? 'border-foreground bg-foreground text-background ring-1 ring-foreground ring-offset-1'
                    : 'border-foreground'
                }`}
              >
                {filterTopic}
              </button>
            );
          })}
        </nav>
      </header>

      <OverviewSection
        id="publications-heading"
        title="Publications"
        items={filteredPublications}
        fallbackLabel="publication"
        detailPath="/publications"
      />

      <OverviewSection
        id="presentations-heading"
        title="Talks"
        items={filteredPresentations}
        fallbackLabel="talk"
        detailPath="/talks"
      />

      <OverviewSection
        id="projects-heading"
        title="Projects"
        items={filteredProjects}
        fallbackLabel="project"
        detailPath="/projects"
      />

      <footer className="border-t border-foreground pt-4 text-xs">
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
