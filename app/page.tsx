'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { publications, presentations, codingProjects, type ContentItem } from '@/lib/content';

// ── Typewriter ───────────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 70, startDelay = 400) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let i = 0;
    setDisplayed('');
    setDone(false);

    const start = () => {
      const tick = () => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i < text.length) {
          timer = setTimeout(tick, speed + Math.random() * 40 - 20);
        } else {
          setDone(true);
        }
      };
      tick();
    };

    timer = setTimeout(start, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

// ── Delayed reveal ───────────────────────────────────────────────────────────
function DelayedBlock({ delay, children }: { delay: number; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!visible) return null;
  return <div className="fade-in">{children}</div>;
}

// ── Filtering ────────────────────────────────────────────────────────────────
function filterItems(items: ContentItem[], query: string): ContentItem[] {
  if (!query.trim()) return items;
  const q = query.toLowerCase();
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.topics.some((t) => t.toLowerCase().includes(q)) ||
      (item.meta?.toLowerCase().includes(q))
  );
}

// ── Type tag ─────────────────────────────────────────────────────────────────
function getTypeTag(item: ContentItem, category: string): string {
  const t = item.topics[0]?.toLowerCase() ?? '';
  if (category === 'publications') {
    if (t.includes('focus report') || t.includes('report')) return 'report';
    if (t.includes('software')) return 'software';
    return 'journal';
  }
  if (category === 'presentations') {
    if (t.includes('teaching')) return 'workshop';
    if (t.includes('poster')) return 'poster';
    if (t.includes('session')) return 'session';
    return 'talk';
  }
  if (category === 'projects') {
    if (t.includes('website')) return 'website';
    if (t.includes('python')) return 'python pkg';
    return 'tool';
  }
  return '';
}

function isNew(item: ContentItem): boolean {
  return !!item.meta?.includes('2025');
}

// ── Item row with hover preview ───────────────────────────────────────────────
function ItemRow({ item, category }: { item: ContentItem; category: string }) {
  const tag = getTypeTag(item, category);

  return (
    <Link href={`/${category}/${item.id}`} className="terminal-row">
      <div className="terminal-row-main">
        <span className="row-tag">[{tag}]</span>
        <span className="row-title" style={{ color: '#cccccc' }}>
          {item.title}
          {isNew(item) && <span className="row-new">[new]</span>}
        </span>
        <span className="terminal-row-meta">{item.meta}</span>
      </div>
      {item.description && <div className="row-preview">{item.description}</div>}
    </Link>
  );
}

// ── Terminal section ──────────────────────────────────────────────────────────
function TerminalSection({
  command,
  subtitle,
  allItems,
  filteredItems,
  category,
  delay,
  isFiltering,
}: {
  command: string;
  subtitle: string;
  allItems: ContentItem[];
  filteredItems: ContentItem[];
  category: string;
  delay: number;
  isFiltering: boolean;
}) {
  if (isFiltering && filteredItems.length === 0) return null;

  const countLabel = isFiltering
    ? `${filteredItems.length} of ${allItems.length}`
    : `${allItems.length} ${allItems.length === 1 ? 'item' : 'items'}`;

  return (
    <DelayedBlock delay={delay}>
      <div style={{ marginBottom: '2.25rem' }}>
        <div style={{ marginBottom: '0.25rem' }}>
          <span className="prompt-gt">{'>'} </span>
          <span className="cmd-text">{command}</span>
          <span style={{ color: '#2a2a2a', marginLeft: '1.5rem', fontSize: '0.75rem' }}>
            {countLabel}
          </span>
        </div>
        {!isFiltering && (
          <div style={{ color: '#2e2e2e', paddingLeft: '1.2rem', marginBottom: '0.75rem', fontSize: '0.78rem' }}>
            {subtitle}
          </div>
        )}
        <div style={{ paddingLeft: '0.25rem' }}>
          {filteredItems.map((item) => (
            <ItemRow key={item.id} item={item} category={category} />
          ))}
        </div>
      </div>
    </DelayedBlock>
  );
}

// ── Theme switcher ────────────────────────────────────────────────────────────
type Theme = 'green' | 'amber' | 'cyan';
const THEMES: Theme[] = ['green', 'amber', 'cyan'];

function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('green');

  useEffect(() => {
    const saved = (localStorage.getItem('terminal-theme') ?? 'green') as Theme;
    setTheme(saved);
    if (saved !== 'green') document.documentElement.setAttribute('data-theme', saved);
  }, []);

  function applyTheme(t: Theme) {
    setTheme(t);
    localStorage.setItem('terminal-theme', t);
    if (t === 'green') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', t);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
      <span className="prompt-gt">{'>'} </span>
      <span style={{ color: '#2a2a2a', fontSize: '0.8rem', marginRight: '0.25rem' }}>theme</span>
      {THEMES.map((t) => (
        <button
          key={t}
          onClick={() => applyTheme(t)}
          className={`theme-btn${theme === t ? ' active' : ''}`}
          aria-pressed={theme === t}
        >
          {theme === t ? `[● ${t}]` : `[○ ${t}]`}
        </button>
      ))}
    </div>
  );
}

// ── Social links ──────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  { label: 'email',    href: 'mailto:timo.diepers@rwth-aachen.de' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/timo-diepers/' },
  { label: 'github',   href: 'https://github.com/TimoDiepers' },
  { label: 'orcid',    href: 'https://orcid.org/0009-0002-8566-8618' },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const { displayed, done } = useTypewriter('about', 75, 300);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setShowContent(true), 450);
      return () => clearTimeout(t);
    }
  }, [done]);

  // '/' focuses search, Escape clears it
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

  const isFiltering = searchQuery.trim().length > 0;
  const filteredPubs   = filterItems(publications,    searchQuery);
  const filteredPres   = filterItems(presentations,   searchQuery);
  const filteredProj   = filterItems(codingProjects,  searchQuery);
  const totalResults   = filteredPubs.length + filteredPres.length + filteredProj.length;

  const pubDelay    = 200;
  const presDelay   = pubDelay   + 350;
  const projDelay   = presDelay  + 350;
  const promptDelay = projDelay  + 350;

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: 'clamp(1.25rem, 4vw, 2.5rem)',
        maxWidth: '960px',
        margin: '0 auto',
        fontSize: '0.875rem',
        lineHeight: 1.7,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          color: '#1e1e1e',
          marginBottom: '2rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid #1a1a1a',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        timo diepers — personal site
      </div>

      {/* About */}
      <div style={{ marginBottom: '2.25rem' }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <span className="prompt-gt">{'>'} </span>
          <span className="cmd-text">{displayed}</span>
          {!done && <span className="cursor" />}
        </div>

        {done && (
          <div className="fade-in" style={{ lineHeight: 1.9, paddingLeft: '1.2rem' }}>
            <div style={{ color: '#f0f0f0', fontSize: '1rem' }}>Timo Diepers</div>
            <div style={{ color: '#888' }}>Research Associate · RWTH Aachen University</div>
            <div
              style={{
                color: '#666',
                marginTop: '0.6rem',
                maxWidth: '58ch',
                lineHeight: 1.75,
                fontSize: '0.83rem',
              }}
            >
              I explore methods for designing sustainable processes and systems
              through Life Cycle Assessment and Mathematical Optimization.
              Most of my work is open-source.
            </div>
            <div style={{ marginTop: '0.9rem', display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={label === 'email' ? undefined : '_blank'}
                  rel={label === 'email' ? undefined : 'noopener noreferrer'}
                >
                  [{label}]
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {showContent && (
        <>
          {/* Search bar */}
          <DelayedBlock delay={100}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span className="prompt-gt">{'>'} </span>
                <span style={{ color: '#2a2a2a' }}>grep</span>
                <input
                  ref={searchRef}
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="filter by title, topic, or venue  ·  press / to focus"
                  aria-label="Search items"
                  spellCheck={false}
                />
                {isFiltering && (
                  <button
                    onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#444',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: '0.85rem',
                      padding: '0 0.2rem',
                    }}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
                {isFiltering && (
                  <span style={{ color: '#333', fontSize: '0.78rem', marginLeft: '0.5rem' }}>
                    {totalResults} result{totalResults !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </DelayedBlock>

          <TerminalSection
            command="publications"
            subtitle="peer-reviewed papers and technical reports"
            allItems={publications}
            filteredItems={filteredPubs}
            category="publications"
            delay={pubDelay}
            isFiltering={isFiltering}
          />
          <TerminalSection
            command="presentations & talks"
            subtitle="conferences, workshops, and invited sessions"
            allItems={presentations}
            filteredItems={filteredPres}
            category="presentations"
            delay={presDelay}
            isFiltering={isFiltering}
          />
          <TerminalSection
            command="software & tools"
            subtitle="open-source packages and applications"
            allItems={codingProjects}
            filteredItems={filteredProj}
            category="projects"
            delay={projDelay}
            isFiltering={isFiltering}
          />

          <DelayedBlock delay={promptDelay}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <ThemeSwitcher />
              <div>
                <span className="prompt-gt">{'>'} </span>
                <span className="cursor" />
              </div>
            </div>
          </DelayedBlock>
        </>
      )}
    </main>
  );
}
