'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/hero';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { ContentItem } from '@/lib/content';
import { codingProjects, presentations, publications } from '@/lib/content';

// ─── Item row ─────────────────────────────────────────────────────────────────

type ItemRowProps = {
  item: ContentItem;
  activeTag: string | null;
  onTagClick: (tag: string) => void;
};

const ItemRow: React.FC<ItemRowProps> = ({ item, activeTag, onTagClick }) => {
  const primaryLink = item.links[0];
  const extraLinks  = item.links.slice(1);

  return (
    <div className="group py-2.5 border-b border-border/40 last:border-0">
      <div className="flex items-start justify-between gap-3 min-w-0">
        <span className="text-sm font-medium leading-snug group-hover:text-primary transition-colors duration-150 min-w-0">
          {item.title}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          {primaryLink && (
            <a
              href={primaryLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-xs font-mono text-primary hover:text-primary/70 transition-colors whitespace-nowrap"
            >
              {primaryLink.label}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
          {extraLinks.length > 0 && (
            <Popover>
              <PopoverTrigger className="text-xs font-mono text-muted-foreground/50 hover:text-primary transition-colors whitespace-nowrap cursor-pointer">
                +{extraLinks.length}
              </PopoverTrigger>
              <PopoverContent align="end" className="flex flex-col gap-1 w-auto p-2">
                {extraLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-foreground hover:text-primary transition-colors whitespace-nowrap px-2 py-1 rounded-sm hover:bg-muted"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 shrink-0" />
                  </a>
                ))}
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {item.meta && (
        <p className="text-xs font-mono text-muted-foreground mt-0.5">{item.meta}</p>
      )}

      <div className="flex flex-wrap gap-1 mt-1.5">
        {item.topics.map((topic) => {
          const slug = topic.toLowerCase().replace(/\s+/g, '-');
          return (
            <Badge
              key={topic}
              variant={activeTag === slug ? 'active' : 'outline'}
              className="cursor-pointer hover:border-primary/40 hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => onTagClick(slug)}
            >
              {topic}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────

type SectionProps = {
  id: string;
  title: string;
  items: ContentItem[];
  activeTag: string | null;
  onTagClick: (tag: string) => void;
};

const Section: React.FC<SectionProps> = ({ id, title, items, activeTag, onTagClick }) => (
  <section id={id} className="scroll-mt-6">
    <h2 className="flex items-baseline gap-1.5 text-xs font-mono pb-1.5 border-b border-border">
      <span className="text-emerald-700 dark:text-emerald-500 select-none">{'//'}</span>
      <span className="font-semibold uppercase tracking-widest text-muted-foreground">{title}</span>
      <span className="text-muted-foreground/35 font-normal normal-case tracking-normal ml-0.5">
        ({items.length})
      </span>
    </h2>
    {items.length > 0 ? (
      items.map((item) => (
        <ItemRow key={item.id} item={item} activeTag={activeTag} onTagClick={onTagClick} />
      ))
    ) : (
      <p className="py-3 text-xs font-mono text-muted-foreground">no items matching filter</p>
    )}
  </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const PersonalSite = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveTag(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleTagClick = useCallback((tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  }, []);

  const filterItems = useCallback(
    (items: ContentItem[]) =>
      activeTag
        ? items.filter((item) =>
            item.topics.some((t) => t.toLowerCase().replace(/\s+/g, '-') === activeTag))
        : items,
    [activeTag],
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Two-column grid: sidebar left, content right */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-y-6 lg:gap-x-12">
        <Sidebar />

        {/* Right: content */}
        <main className="min-w-0">
          {/* Mobile: bio below header */}
          <p className="text-sm text-muted-foreground leading-snug mb-5 lg:hidden">
            Methods for designing Sustainable Processes &amp; Systems using Life Cycle Assessment and Mathematical Optimization.
          </p>

          {/* Active tag filter pill */}
          {activeTag && (
            <div className="mb-4 flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <span>filter:</span>
              <span className="text-primary">#{activeTag}</span>
              <button
                onClick={() => setActiveTag(null)}
                className={cn(
                  'ml-1 flex items-center gap-0.5 hover:text-primary transition-colors',
                )}
                aria-label="Clear filter"
              >
                <X className="h-3 w-3" />
                <span>esc</span>
              </button>
            </div>
          )}

          <div className="space-y-8">
            <Section id="publications"  title="Publications"    items={filterItems(publications)}   activeTag={activeTag} onTagClick={handleTagClick} />
            <Section id="coding"        title="Coding Projects" items={filterItems(codingProjects)} activeTag={activeTag} onTagClick={handleTagClick} />
            <Section id="presentations" title="Presentations"   items={filterItems(presentations)}  activeTag={activeTag} onTagClick={handleTagClick} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PersonalSite;
