'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ContentCard from '@/components/content-card';
import ThemeToggle from '@/components/theme-toggle';
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
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-20 pt-12 text-sm sm:px-6 lg:px-8">
      <header className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={backHref}
            className="group inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors duration-300 hover:text-primary/85 hover:underline hover:underline-offset-4"
          >
            <ArrowLeft className="h-4 w-4 transition-opacity duration-300 group-hover:opacity-80" aria-hidden="true" />
            Back to overview
          </Link>
          <ThemeToggle size="sm" className="opacity-55" />
        </div>
        <div className="space-y-2">
          <h1 className="text-sm font-bold uppercase tracking-wide">
            {title}
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
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
                    className={`cursor-pointer px-1 py-0.5 transition-opacity duration-150 ${
                      isActive
                        ? 'font-medium underline underline-offset-4 decoration-1 text-foreground'
                        : 'opacity-70 hover:opacity-100 text-muted-foreground'
                    }`}
                    aria-pressed={isActive}
                  >
                    [{topic.toLowerCase()}]
                  </button>
                );
              })}
            </div>
            {activeTopics.length > 0 ? (
              <button
                type="button"
                onClick={() => setActiveTopics([])}
                className="ml-auto cursor-pointer px-1 py-0.5 text-sm opacity-70 transition-opacity duration-150 hover:opacity-100"
              >
                clear filters
              </button>
            ) : null}
          </div>
        ) : null}
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredItems.map((item, index) => (
          <ContentCard key={item.id} item={item} delay={index * 0.04} />
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
