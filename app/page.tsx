'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Hero from '@/components/hero';
import ContactSection from '@/components/contact-section';
import ThemeToggle from '@/components/theme-toggle';
import type { ContentItem } from '@/lib/content';
import { codingProjects, presentations, publications } from '@/lib/content';

// ─── Section color palette (CSS vars → theme-aware) ───────────────────────────

const SECTION_COLORS: Record<string, string> = {
  top:           'var(--chart-1)',
  publications:  'var(--chart-1)',
  coding:        'var(--chart-3)',
  presentations: 'var(--chart-5)',
};

// ─── Scroll progress bar ──────────────────────────────────────────────────────
// Fills top-to-bottom as you scroll; color shifts per section like an IDE gutter

const ScrollProgressBar: React.FC<{ progress: number; section: string }> = ({ progress, section }) => (
  <div aria-hidden className="fixed left-0 top-0 bottom-0 w-[3px] z-40 pointer-events-none">
    <div
      style={{
        height: `${progress * 100}%`,
        backgroundColor: SECTION_COLORS[section] ?? 'var(--chart-1)',
        transition: 'height 80ms linear, background-color 600ms ease-in-out',
      }}
    />
  </div>
);

// ─── Sticky header ────────────────────────────────────────────────────────────

const StickyHeader: React.FC<{ visible: boolean }> = ({ visible }) => (
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
      <nav className="hidden sm:flex items-center gap-4 text-xs font-mono text-muted-foreground">
        <a href="#publications"  className="hover:text-primary transition-colors">publications</a>
        <a href="#coding"        className="hover:text-primary transition-colors">coding</a>
        <a href="#presentations" className="hover:text-primary transition-colors">presentations</a>
        <a href="#contact"       className="hover:text-primary transition-colors">contact</a>
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
  const [open, setOpen] = useState(false);
  const primaryLink = item.links[0];
  const extraLinks  = item.links.slice(1);

  return (
    <div className="group py-2 border-b border-border/40 last:border-0">
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
            <button
              onClick={() => setOpen(v => !v)}
              className={cn(
                'text-xs font-mono transition-colors whitespace-nowrap',
                open ? 'text-primary' : 'text-muted-foreground/50 hover:text-primary',
              )}
              aria-expanded={open}
            >
              {open ? '−' : `+${extraLinks.length}`}
            </button>
          )}
        </div>
      </div>

      {open && (
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 ml-0">
          {extraLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-xs font-mono text-primary hover:text-primary/70 transition-colors"
            >
              {link.label}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          ))}
        </div>
      )}

      {item.meta && (
        <p className="text-xs font-mono text-muted-foreground mt-0.5">{item.meta}</p>
      )}
      <div className="flex flex-wrap gap-x-2 mt-0.5">
        {item.topics.map((topic) => {
          const slug = topic.toLowerCase().replace(/\s+/g, '-');
          return (
            <button
              key={topic}
              onClick={() => onTagClick(slug)}
              className={cn(
                'text-xs font-mono transition-colors cursor-pointer hover:text-primary',
                activeTag === slug ? 'text-primary font-semibold' : 'text-muted-foreground/60',
              )}
            >
              #{slug}
            </button>
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

const Section: React.FC<SectionProps> = ({ id, title, items, activeTag, onTagClick }) => {
  if (items.length === 0) return null;
  return (
    <section id={id}>
      <h2 className="text-xs font-mono pb-1.5 border-b border-border mb-0 flex items-baseline gap-1.5">
        <span className="text-emerald-700 dark:text-emerald-500 select-none font-normal">{'//'}</span>
        <span className="font-semibold uppercase tracking-widest text-muted-foreground">{title}</span>
        <span className="text-muted-foreground/35 font-normal normal-case tracking-normal ml-0.5">
          ({items.length})
        </span>
      </h2>
      {items.map((item) => (
        <ItemRow key={item.id} item={item} activeTag={activeTag} onTagClick={onTagClick} />
      ))}
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const PersonalSite = () => {
  const [scrolled,      setScrolled]      = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollSection,  setScrollSection]  = useState('top');
  const [activeTag,     setActiveTag]     = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 72);

      // Reading progress 0→1
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? sy / total : 0);

      // Section color: walk in reverse DOM order, first one whose top is above 40% viewport
      const ids = ['presentations', 'coding', 'publications'] as const;
      let found = 'top';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
          found = id;
          break;
        }
      }
      setScrollSection(found);
    };

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

  const handleExploreClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleContactClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const filterItems = useCallback(
    (items: ContentItem[]) =>
      activeTag
        ? items.filter((item) =>
            item.topics.some((t) => t.toLowerCase().replace(/\s+/g, '-') === activeTag))
        : items,
    [activeTag],
  );

  const filteredPubs = filterItems(publications);
  const filteredCode = filterItems(codingProjects);
  const filteredPres = filterItems(presentations);
  const noResults    = activeTag && !filteredPubs.length && !filteredCode.length && !filteredPres.length;

  return (
    <>
      <ScrollProgressBar progress={scrollProgress} section={scrollSection} />
      <StickyHeader visible={scrolled} />

      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <Hero
          onExploreClick={handleExploreClick}
          onContactClick={handleContactClick}
        />

        {activeTag && (
          <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
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

        <main className="mt-6 space-y-6">
          <Section id="publications"   title="Publications"    items={filteredPubs} activeTag={activeTag} onTagClick={handleTagClick} />
          <Section id="coding"         title="Coding Projects" items={filteredCode} activeTag={activeTag} onTagClick={handleTagClick} />
          <Section id="presentations"  title="Presentations"   items={filteredPres} activeTag={activeTag} onTagClick={handleTagClick} />
          {noResults && (
            <p className="text-xs font-mono text-muted-foreground">no items matching #{activeTag}</p>
          )}
        </main>

        <ContactSection />
      </div>
    </>
  );
};

export default PersonalSite;
