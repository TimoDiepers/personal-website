import Link from 'next/link';
import type { ContentItem } from '@/lib/content';

type Props = {
  item: ContentItem;
  category: string;
  categoryLabel: string;
};

const CATEGORY_BACK: Record<string, string> = {
  publications: 'publications',
  presentations: 'presentations',
  projects: 'projects',
};

export default function TerminalItemPage({ item, category, categoryLabel }: Props) {
  const backPath = '/';
  const prompt = `~/timo-diepers/${CATEGORY_BACK[category]}$`;

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
          color: '#222',
          marginBottom: '2rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid #1c1c1c',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>timo diepers — {categoryLabel}</span>
        <Link href="/" style={{ color: '#444', fontSize: '0.7rem', textDecoration: 'none' }}>
          ← home
        </Link>
      </div>

      {/* cat command */}
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ color: '#444' }}>{prompt} </span>
        <span style={{ color: '#4af626' }}>cat {item.id}</span>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #2a2a2a', marginBottom: '1.5rem' }} />

      {/* Title */}
      <div style={{ color: '#f0f0f0', fontSize: '1rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
        {item.title}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #2a2a2a', marginBottom: '1.5rem' }} />

      {/* Meta fields */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.3rem 1.5rem', marginBottom: '1.5rem' }}>
        {item.meta && (
          <>
            <span style={{ color: '#555' }}>published</span>
            <span style={{ color: '#cccccc' }}>{item.meta}</span>
          </>
        )}
        {item.topics.length > 0 && (
          <>
            <span style={{ color: '#555' }}>topics</span>
            <span style={{ color: '#cccccc' }}>{item.topics.join(' · ')}</span>
          </>
        )}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #2a2a2a', marginBottom: '1.5rem' }} />

      {/* Description */}
      {item.description && (
        <>
          <div
            style={{
              color: '#aaaaaa',
              maxWidth: '72ch',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
            }}
          >
            {item.description}
          </div>
          <div style={{ borderTop: '1px solid #2a2a2a', marginBottom: '1.5rem' }} />
        </>
      )}

      {/* Links */}
      {item.links.length > 0 && (
        <>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ color: '#555', marginBottom: '0.6rem' }}>links</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingLeft: '1rem' }}>
              {item.links.map((link) => (
                <div key={link.label} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                  <span style={{ color: '#555', minWidth: '8rem' }}>[{link.label}]</span>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#4af626', wordBreak: 'break-all' }}
                  >
                    → {link.href}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid #2a2a2a', marginBottom: '2rem' }} />
        </>
      )}

      {/* Back navigation */}
      <div style={{ marginBottom: '0.5rem' }}>
        <span style={{ color: '#444' }}>{prompt} </span>
        <Link href={backPath} style={{ color: '#4af626' }}>
          cd ..
        </Link>
      </div>
      <div>
        <span style={{ color: '#444' }}>~/timo-diepers$ </span>
        <span
          style={{
            display: 'inline-block',
            width: '0.55em',
            height: '1.1em',
            backgroundColor: '#4af626',
            verticalAlign: 'text-bottom',
            marginLeft: '2px',
            animation: 'blink 1s step-end infinite',
          }}
        />
      </div>
    </main>
  );
}
