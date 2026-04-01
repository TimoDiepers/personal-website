'use client';

import React, { useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Hero from '@/components/hero';
import ContactSection from '@/components/contact-section';
import type { ContentItem } from '@/lib/content';
import { codingProjects, presentations, publications } from '@/lib/content';

const ItemRow: React.FC<{ item: ContentItem }> = ({ item }) => (
  <div className="group py-2 border-b border-border/40 last:border-0">
    <div className="flex items-start justify-between gap-3 min-w-0">
      <span className="text-sm font-medium leading-snug group-hover:text-primary transition-colors duration-150 min-w-0">
        {item.title}
      </span>
      <div className="flex gap-2 items-center shrink-0">
        {item.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-xs font-mono text-primary hover:text-primary/70 transition-colors whitespace-nowrap"
          >
            {link.label}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        ))}
      </div>
    </div>
    {item.meta && (
      <p className="text-xs font-mono text-muted-foreground mt-0.5">{item.meta}</p>
    )}
    <div className="flex flex-wrap gap-x-2 mt-0.5">
      {item.topics.map((topic) => (
        <span key={topic} className="text-xs text-muted-foreground/60 font-mono">
          #{topic.toLowerCase().replace(/\s+/g, '-')}
        </span>
      ))}
    </div>
  </div>
);

type SectionProps = { id: string; title: string; items: ContentItem[] };

const Section: React.FC<SectionProps> = ({ id, title, items }) => (
  <section id={id}>
    <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground pb-1.5 border-b border-border mb-0">
      {title}
    </h2>
    {items.map((item) => (
      <ItemRow key={item.id} item={item} />
    ))}
  </section>
);

const PersonalSite = () => {
  const handleExploreClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleContactClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <Hero
        onExploreClick={handleExploreClick}
        onContactClick={handleContactClick}
      />
      <main className="mt-6 space-y-6">
        <Section id="publications" title="Publications" items={publications} />
        <Section id="coding" title="Coding Projects" items={codingProjects} />
        <Section id="presentations" title="Presentations" items={presentations} />
      </main>
      <ContactSection />
    </div>
  );
};

export default PersonalSite;
