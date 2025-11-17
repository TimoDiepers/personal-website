'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from '@/components/theme-toggle';
import ContentCard from '@/components/content-card';
import type { ContentItem } from '@/lib/content';

const sortTopics = (topics: string[]) =>
  [...new Set(topics)].sort((a, b) => a.localeCompare(b));

type ContentCollectionProps = {
  title: string;
  intro: string;
  items: ContentItem[];
  backHref: string;
};

const ContentCollection = ({
  title,
  intro,
  items,
  backHref,
}: ContentCollectionProps) => {
  const availableTopics = useMemo(() => {
    const allTopics = items.flatMap((item) => item.topics);
    return sortTopics(allTopics);
  }, [items]);

  const [activeTopics, setActiveTopics] = useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    setActiveTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((entry) => entry !== topic)
        : [...prev, topic]
    );
  };

  const filteredItems = useMemo(() => {
    if (activeTopics.length === 0) {
      return items;
    }

    return items.filter((item) =>
      activeTopics.every((topic) => item.topics.includes(topic))
    );
  }, [items, activeTopics]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <header className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={backHref}
            className="group inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-x-1 hover:text-primary/85"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
            Back to overview
          </Link>
          <ThemeToggle className="ml-auto" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            {intro}
          </p>
        </div>
        {availableTopics.length > 0 ? (
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex flex-wrap gap-2">
              {availableTopics.map((topic) => {
                const isActive = activeTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => toggleTopic(topic)}
                    className="relative inline-flex items-center rounded-full bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors duration-300 hover:cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/15"
                    aria-pressed={isActive}
                  >
                    {isActive ? (
                      <span className="absolute inset-0 rounded-full text-foreground bg-primary/15 dark:bg-primary/25" />
                    ) : null}
                    <span className="relative z-10 text-xs font-sm text-muted-foreground">
                      {topic}
                    </span>
                  </button>
                );
              })}
            </div>
            {activeTopics.length > 0 ? (
              <button
                type="button"
                onClick={() => setActiveTopics([])}
                className="ml-auto inline-flex items-center bg-card uppercase rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide text-primary dark:text-primary/70 transition-colors duration-300 hover:bg-primary/5 dark:hover:bg-primary/15 hover:cursor-pointer"
              >
                Clear Filters
              </button>
            ) : null}
          </div>
        ) : null}
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredItems.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          No items match the selected topics.
        </p>
      ) : null}
    </div>
  );
};

export default ContentCollection;
