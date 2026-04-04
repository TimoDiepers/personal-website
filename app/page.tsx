'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { publications, presentations, codingProjects, type ContentItem } from '@/lib/content';

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

function DelayedBlock({ delay, children }: { delay: number; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!visible) return null;
  return <div className="fade-in">{children}</div>;
}

function ItemRow({ item, category }: { item: ContentItem; category: string }) {
  return (
    <Link href={`/${category}/${item.id}`} className="terminal-row">
      <span style={{ color: '#444', userSelect: 'none' }}>{'>'}</span>
      <span className="row-title" style={{ color: '#cccccc' }}>
        {item.title}
      </span>
      <span className="terminal-row-meta">{item.meta}</span>
    </Link>
  );
}

function TerminalSection({
  command,
  items,
  category,
  delay,
}: {
  command: string;
  items: ContentItem[];
  category: string;
  delay: number;
}) {
  return (
    <DelayedBlock delay={delay}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '0.6rem' }}>
          <span style={{ color: '#444' }}>~/timo-diepers$ </span>
          <span style={{ color: '#4af626' }}>{command}</span>
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

const SOCIAL_LINKS = [
  { label: 'email', href: 'mailto:timo.diepers@rwth-aachen.de' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/timo-diepers/' },
  { label: 'github', href: 'https://github.com/TimoDiepers' },
  { label: 'orcid', href: 'https://orcid.org/0009-0002-8566-8618' },
];

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const { displayed, done } = useTypewriter('whoami', 70, 300);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setShowContent(true), 450);
      return () => clearTimeout(t);
    }
  }, [done]);

  const pubDelay = 200;
  const presDelay = pubDelay + 350;
  const projDelay = presDelay + 350;
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
      {/* Terminal title bar */}
      <div
        style={{
          color: '#222',
          marginBottom: '2rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid #1c1c1c',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        timo diepers — personal site
      </div>

      {/* whoami command + output */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <span style={{ color: '#444' }}>~/timo-diepers$ </span>
          <span style={{ color: '#4af626' }}>{displayed}</span>
          {!done && <span className="cursor" />}
        </div>

        {done && (
          <div className="fade-in" style={{ lineHeight: 1.9 }}>
            <div style={{ color: '#f0f0f0', fontSize: '1rem' }}>Timo Diepers</div>
            <div style={{ color: '#999' }}>Research Associate @ RWTH Aachen University</div>
            <div style={{ color: '#555' }}>
              Life Cycle Assessment · Sustainability · Mathematical Optimization
            </div>
            <div style={{ marginTop: '0.9rem', display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={label === 'email' ? undefined : '_blank'}
                  rel={label === 'email' ? undefined : 'noopener noreferrer'}
                  style={{ color: '#4af626' }}
                >
                  [{label}]
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content sections appear after whoami resolves */}
      {showContent && (
        <>
          <TerminalSection
            command="ls publications/"
            items={publications}
            category="publications"
            delay={pubDelay}
          />
          <TerminalSection
            command="ls presentations/"
            items={presentations}
            category="presentations"
            delay={presDelay}
          />
          <TerminalSection
            command="ls projects/"
            items={codingProjects}
            category="projects"
            delay={projDelay}
          />
          <DelayedBlock delay={promptDelay}>
            <div>
              <span style={{ color: '#444' }}>~/timo-diepers$ </span>
              <span className="cursor" />
            </div>
          </DelayedBlock>
        </>
      )}
    </main>
  );
}
