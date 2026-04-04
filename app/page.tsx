'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { publications, presentations, codingProjects, type ContentItem } from '@/lib/content';

// ── Typewriter hook ──────────────────────────────────────────────────────────
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
  return !!item.meta && item.meta.includes('2025');
}

// ── Item row with hover preview ───────────────────────────────────────────────
function ItemRow({ item, category }: { item: ContentItem; category: string }) {
  const tag = getTypeTag(item, category);
  const showNew = isNew(item);

  return (
    <Link href={`/${category}/${item.id}`} className="terminal-row">
      <div className="terminal-row-main">
        <span className="row-tag">[{tag}]</span>
        <span className="row-title" style={{ color: '#cccccc' }}>
          {item.title}
          {showNew && <span className="row-new">[new]</span>}
        </span>
        <span className="terminal-row-meta">{item.meta}</span>
      </div>
      {item.description && (
        <div className="row-preview">{item.description}</div>
      )}
    </Link>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function TerminalSection({
  command,
  subtitle,
  items,
  category,
  delay,
}: {
  command: string;
  subtitle: string;
  items: ContentItem[];
  category: string;
  delay: number;
}) {
  return (
    <DelayedBlock delay={delay}>
      <div style={{ marginBottom: '2.25rem' }}>
        <div style={{ marginBottom: '0.25rem' }}>
          <span className="prompt-gt">{'>'} </span>
          <span className="cmd-text">{command}</span>
          <span style={{ color: '#2a2a2a', marginLeft: '1.5rem', fontSize: '0.75rem' }}>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        <div style={{ color: '#323232', paddingLeft: '1.2rem', marginBottom: '0.75rem', fontSize: '0.78rem' }}>
          {subtitle}
        </div>
        <div style={{ paddingLeft: '0.25rem' }}>
          {items.map((item) => (
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

  // Load saved theme on mount and apply it
  useEffect(() => {
    const saved = (localStorage.getItem('terminal-theme') ?? 'green') as Theme;
    setTheme(saved);
    if (saved === 'green') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', saved);
    }
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
          className={`theme-btn ${theme === t ? 'active' : ''}`}
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
  const { displayed, done } = useTypewriter('about', 75, 300);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setShowContent(true), 450);
      return () => clearTimeout(t);
    }
  }, [done]);

  const pubDelay   = 200;
  const presDelay  = pubDelay  + 350;
  const projDelay  = presDelay + 350;
  const promptDelay = projDelay + 350;

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
          <TerminalSection
            command="publications"
            subtitle="peer-reviewed papers and technical reports"
            items={publications}
            category="publications"
            delay={pubDelay}
          />
          <TerminalSection
            command="presentations & talks"
            subtitle="conferences, workshops, and invited sessions"
            items={presentations}
            category="presentations"
            delay={presDelay}
          />
          <TerminalSection
            command="software & tools"
            subtitle="open-source packages and applications"
            items={codingProjects}
            category="projects"
            delay={projDelay}
          />

          {/* Final prompt + theme switcher */}
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
