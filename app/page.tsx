'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { publications, presentations, codingProjects, type ContentItem } from '@/lib/content';

// ── Helpers ──────────────────────────────────────────────────────────────────

function getTypeTag(item: ContentItem, category: string): string {
  const t = item.topics[0]?.toLowerCase() ?? '';
  if (category === 'publications') {
    if (t.includes('report')) return 'report';
    if (t.includes('software')) return 'software';
    return 'journal';
  }
  if (category === 'presentations') {
    if (t.includes('teaching')) return 'workshop';
    if (t.includes('poster'))   return 'poster';
    if (t.includes('session'))  return 'session';
    return 'talk';
  }
  if (category === 'projects') {
    if (t.includes('website')) return 'website';
    if (t.includes('python'))  return 'python pkg';
    return 'tool';
  }
  return '';
}

function extractYear(meta?: string) {
  return meta?.match(/\b(20\d{2})\b/)?.[1] ?? '';
}

function isNew(item: ContentItem) {
  return !!item.meta?.includes('2025');
}

function filterItems(items: ContentItem[], q: string) {
  if (!q.trim()) return items;
  const query = q.toLowerCase();
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.topics.some((t) => t.toLowerCase().includes(query)) ||
      item.meta?.toLowerCase().includes(query),
  );
}

// ── Item card ────────────────────────────────────────────────────────────────

function ItemCard({ item, category }: { item: ContentItem; category: string }) {
  const tag  = getTypeTag(item, category);
  const year = extractYear(item.meta);

  return (
    <Link href={`/${category}/${item.id}`} className="item-card">
      <div className="item-meta">
        <span className="item-tag">{tag}</span>
        {year && <span className="item-year"> · {year}</span>}
        {isNew(item) && <span className="item-new">[new]</span>}
      </div>
      <div className="item-title">{item.title}</div>
      {item.description && <div className="item-desc">{item.description}</div>}
    </Link>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

function Section({
  label,
  items,
  category,
}: {
  label: string;
  items: ContentItem[];
  category: string;
}) {
  if (items.length === 0) return null;
  return (
    <section>
      <div className="section-label">{label}</div>
      <div>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} category={category} />
        ))}
      </div>
    </section>
  );
}

// ── Theme switcher ───────────────────────────────────────────────────────────

type Theme = 'green' | 'amber' | 'cyan';
const THEMES: Theme[] = ['green', 'amber', 'cyan'];

function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('green');

  useEffect(() => {
    const saved = (localStorage.getItem('terminal-theme') ?? 'green') as Theme;
    setTheme(saved);
    if (saved !== 'green') document.documentElement.setAttribute('data-theme', saved);
  }, []);

  function apply(t: Theme) {
    setTheme(t);
    localStorage.setItem('terminal-theme', t);
    if (t === 'green') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', t);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {THEMES.map((t) => (
        <button
          key={t}
          onClick={() => apply(t)}
          className={`theme-btn${theme === t ? ' active' : ''}`}
          aria-pressed={theme === t}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ── Social links ──────────────────────────────────────────────────────────────

const SOCIAL = [
  { label: 'email',    href: 'mailto:timo.diepers@rwth-aachen.de' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/timo-diepers/' },
  { label: 'github',   href: 'https://github.com/TimoDiepers' },
  { label: 'orcid',   href: 'https://orcid.org/0009-0002-8566-8618' },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const isFiltering = searchQuery.trim().length > 0;
  const filteredPubs  = filterItems(publications,   searchQuery);
  const filteredPres  = filterItems(presentations,  searchQuery);
  const filteredProj  = filterItems(codingProjects, searchQuery);
  const totalResults  = filteredPubs.length + filteredPres.length + filteredProj.length;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === '/' && (e.target as Element).tagName !== 'INPUT') {
      e.preventDefault();
      searchRef.current?.focus();
    }
    if (e.key === 'Escape') {
      setSearchQuery('');
      searchRef.current?.blur();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: 'clamp(2rem, 6vw, 4rem) clamp(1.25rem, 4vw, 2.5rem)',
        maxWidth: '680px',
        margin: '0 auto',
        fontSize: '0.875rem',
        lineHeight: 1.7,
      }}
    >
      {/* ── Header ─────────────────────────────────── */}
      <header className="stagger" style={{ marginBottom: '3.5rem' }}>
        <div style={{ color: '#e8e8e8', fontSize: '1rem', marginBottom: '0.2rem' }}>
          Timo Diepers
        </div>
        <div style={{ color: '#444', fontSize: '0.8rem', marginBottom: '1.1rem' }}>
          Research Associate · RWTH Aachen University
        </div>
        <div
          style={{
            color: '#555',
            fontSize: '0.8rem',
            maxWidth: '52ch',
            lineHeight: 1.75,
            marginBottom: '1.25rem',
          }}
        >
          I explore methods for designing sustainable processes and systems through
          Life Cycle Assessment and Mathematical Optimization. Most of my work is
          open-source.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {SOCIAL.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{ fontSize: '0.78rem', color: '#555' }}
              target={label === 'email' ? undefined : '_blank'}
              rel={label === 'email' ? undefined : 'noopener noreferrer'}
            >
              {label}
            </a>
          ))}
        </div>
      </header>

      {/* ── Sections ───────────────────────────────── */}
      <div className="fade-in" style={{ animationDelay: '0.25s', opacity: 0 }}>
        <Section label="Publications" items={filteredPubs} category="publications" />

        {(!isFiltering || (filteredPubs.length > 0 && filteredPres.length > 0)) && (
          <hr className="divider" />
        )}

        <Section label="Presentations & Talks" items={filteredPres} category="presentations" />

        {(!isFiltering || (filteredPres.length > 0 && filteredProj.length > 0)) && (
          <hr className="divider" />
        )}

        <Section label="Software & Tools" items={filteredProj} category="projects" />
      </div>

      {/* ── Footer ─────────────────────────────────── */}
      <footer className="page-footer">
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <input
            ref={searchRef}
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search  ·  / to focus"
            aria-label="Search"
            spellCheck={false}
          />
          {isFiltering && (
            <>
              <button
                onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}
                style={{
                  background: 'none', border: 'none',
                  color: '#444', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: '0.9rem', padding: 0,
                }}
                aria-label="Clear"
              >
                ×
              </button>
              <span style={{ color: '#333', fontSize: '0.75rem' }}>
                {totalResults} result{totalResults !== 1 ? 's' : ''}
              </span>
            </>
          )}
        </div>

        {/* Theme + cursor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeSwitcher />
          <span className="cursor" />
        </div>
      </footer>
    </main>
  );
}
