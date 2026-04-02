'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Hero from '@/components/hero';
import ThemeToggle from '@/components/theme-toggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { ContentItem } from '@/lib/content';
import { codingProjects, presentations, publications } from '@/lib/content';

type TabId = 'publications' | 'coding' | 'presentations';

const TABS: { id: TabId; label: string; items: ContentItem[] }[] = [
  { id: 'publications',  label: 'publications',  items: publications  },
  { id: 'coding',        label: 'coding',        items: codingProjects },
  { id: 'presentations', label: 'presentations', items: presentations },
];

// ─── Sticky header ────────────────────────────────────────────────────────────

type StickyHeaderProps = {
  visible: boolean;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

const StickyHeader: React.FC<StickyHeaderProps> = ({ visible, activeTab, onTabChange }) => (
  <div
    className={cn(
      'fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md',
      'transition-[transform,opacity] duration-300 ease-in-out',
      visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none',
    )}
  >
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 min-w-0">
        <Image
          src="/profile_pic_cut.jpeg"
          alt="Timo Diepers"
          width={22}
          height={22}
          className="rounded-full object-cover shrink-0"
          style={{ width: 22, height: 22 }}
        />
        <span className="text-sm font-mono font-semibold truncate">Timo Diepers</span>
      </div>
      <nav className="hidden sm:flex items-center gap-1 text-xs font-mono">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              'px-2 py-1 rounded-md transition-colors',
              activeTab === id
                ? 'text-foreground bg-muted'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {label}
          </button>
        ))}
      </nav>
      <ThemeToggle size="sm" className="shrink-0" />
    </div>
  </div>
);

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
      {/* Title + links row */}
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

      {/* Meta */}
      {item.meta && (
        <p className="text-xs font-mono text-muted-foreground mt-0.5">{item.meta}</p>
      )}

      {/* Topic badges */}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

const PersonalSite = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('publications');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const filtered = {
    publications:  filterItems(publications),
    coding:        filterItems(codingProjects),
    presentations: filterItems(presentations),
  };

  return (
    <>
      <StickyHeader
        visible={scrolled}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <Hero />

        {/* Active tag filter pill */}
        {activeTag && (
          <div className="mt-3 flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <span>filter:</span>
            <span className="text-primary">#{activeTag}</span>
            <button
              onClick={() => setActiveTag(null)}
              className="ml-1 flex items-center gap-0.5 hover:text-primary transition-colors"
              aria-label="Clear filter"
            >
              <X className="h-3 w-3" />
              <span>esc</span>
            </button>
          </div>
        )}

        {/* Main tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as TabId)}
          className="mt-5"
        >
          {/* Underline-style tab list */}
          <TabsList className="w-full justify-start bg-transparent rounded-none border-b border-border p-0 h-auto gap-0">
            {TABS.map(({ id, label }) => {
              const count = filtered[id].length;
              return (
                <TabsTrigger
                  key={id}
                  value={id}
                  className={cn(
                    'font-mono text-xs rounded-none border-b-2 -mb-px border-transparent px-3 pb-2.5 pt-0 gap-1.5',
                    'data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground',
                    'text-muted-foreground',
                  )}
                >
                  <span className="text-emerald-700 dark:text-emerald-500 select-none">{'//'}</span>
                  {label}
                  <span className="text-muted-foreground/40">({count})</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {TABS.map(({ id }) => (
            <TabsContent key={id} value={id} className="mt-0">
              {filtered[id].length > 0 ? (
                filtered[id].map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    activeTag={activeTag}
                    onTagClick={handleTagClick}
                  />
                ))
              ) : (
                <p className="py-4 text-xs font-mono text-muted-foreground">
                  no items matching #{activeTag}
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default PersonalSite;
