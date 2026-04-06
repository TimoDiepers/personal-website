'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { publications, presentations, codingProjects, type ContentItem } from '@/lib/content';

// ── Helpers ───────────────────────────────────────────────────────────────────

function getTypeTag(item: ContentItem, category: string): string {
  const t = item.topics[0]?.toLowerCase() ?? '';
  if (category === 'publications') {
    if (t.includes('report'))   return 'report';
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
  return items.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.topics.some(t => t.toLowerCase().includes(query)) ||
    item.meta?.toLowerCase().includes(query)
  );
}

// ── Components ────────────────────────────────────────────────────────────────

function Item({ item, category }: { item: ContentItem; category: string }) {
  const tag  = getTypeTag(item, category);
  const year = extractYear(item.meta);
  return (
    <Link href={`/${category}/${item.id}`} className="item">
      <div className="item-meta">
        {tag}{year && ` · ${year}`}
        {isNew(item) && <span className="item-new">[new]</span>}
      </div>
      <div className="item-title">{item.title}</div>
      {item.description && <div className="item-desc">{item.description}</div>}
    </Link>
  );
}

function Section({ label, items, category }: { label: string; items: ContentItem[]; category: string }) {
  if (items.length === 0) return null;
  return (
    <section>
      <div className="section-label">{label}</div>
      {items.map(item => <Item key={item.id} item={item} category={category} />)}
    </section>
  );
}

type Theme = 'green' | 'amber' | 'cyan';

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
    if (t === 'green') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
  }

  return (
    <>
      {(['green', 'amber', 'cyan'] as Theme[]).map(t => (
        <button key={t} onClick={() => apply(t)} className={`theme-btn${theme === t ? ' active' : ''}`}>
          {t}
        </button>
      ))}
    </>
  );
}

const SOCIAL = [
  { label: 'email',    href: 'mailto:timo.diepers@rwth-aachen.de' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/timo-diepers/' },
  { label: 'github',   href: 'https://github.com/TimoDiepers' },
  { label: 'orcid',    href: 'https://orcid.org/0009-0002-8566-8618' },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.target as Element).tagName !== 'INPUT') {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === 'Escape') { setQuery(''); searchRef.current?.blur(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const pubs = filterItems(publications,   query);
  const pres = filterItems(presentations,  query);
  const proj = filterItems(codingProjects, query);
  const total = pubs.length + pres.length + proj.length;
  const filtering = query.trim().length > 0;

  return (
    <main style={{ maxWidth: '640px', margin: '0 auto', padding: 'clamp(2rem, 6vw, 3.5rem) 1.25rem' }}>

      {/* Header */}
      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ color: '#e8e8e8', fontWeight: 600, marginBottom: '0.2rem' }}>Timo Diepers</div>
        <div style={{ color: '#444', marginBottom: '1rem' }}>Research Associate · RWTH Aachen University</div>
        <p style={{ color: '#555', maxWidth: '50ch', margin: '0 0 1rem' }}>
          I explore methods for designing sustainable processes and systems through
          Life Cycle Assessment and Mathematical Optimization.
        </p>
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          {SOCIAL.map(({ label, href }) => (
            <a key={label} href={href} style={{ color: '#555' }}
               target={label === 'email' ? undefined : '_blank'}
               rel={label === 'email' ? undefined : 'noopener noreferrer'}>
              {label}
            </a>
          ))}
        </div>
      </header>

      <hr />

      {/* Content */}
      <Section label="Publications"         items={pubs} category="publications" />
      {(!filtering || (pubs.length > 0 && pres.length > 0)) && <hr />}
      <Section label="Presentations & Talks" items={pres} category="presentations" />
      {(!filtering || (pres.length > 0 && proj.length > 0)) && <hr />}
      <Section label="Software & Tools"     items={proj} category="projects" />

      {/* Footer */}
      <div style={{
        marginTop: '2.5rem', paddingTop: '1.25rem', borderTop: '1px solid #1e1e1e',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input ref={searchRef} className="search-input" value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="search  ·  / to focus" spellCheck={false} />
          {filtering && (
            <>
              <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', font: 'inherit', padding: 0 }}>×</button>
              <span style={{ color: '#333' }}>{total}</span>
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ThemeSwitcher />
          <span className="cursor" />
        </div>
      </div>

    </main>
  );
}
