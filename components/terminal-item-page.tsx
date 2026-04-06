import Link from 'next/link';
import type { ContentItem } from '@/lib/content';

type Props = {
  item: ContentItem;
  category: string;
  categoryLabel: string;
};

function getVenueLabel(category: string) {
  if (category === 'publications') return 'published in';
  if (category === 'presentations') return 'presented at';
  return 'role';
}

function getItemType(item: ContentItem, category: string): string {
  const topics = item.topics.map((t) => t.toLowerCase());
  if (category === 'publications') {
    if (topics.some((t) => t.includes('report')))   return 'Technical Report';
    if (topics.some((t) => t.includes('software'))) return 'Software Paper';
    return 'Journal Paper';
  }
  if (category === 'presentations') {
    if (topics.some((t) => t.includes('teaching'))) return 'Teaching Workshop';
    if (topics.some((t) => t.includes('poster')))   return 'Poster Presentation';
    if (topics.some((t) => t.includes('session')))  return 'Invited Session';
    return 'Conference Talk';
  }
  if (category === 'projects') {
    if (topics.some((t) => t.includes('webapp') || t.includes('web app'))) return 'Web Application';
    if (topics.some((t) => t.includes('website'))) return 'Website';
    return 'Software Package';
  }
  return '';
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '9rem 1fr',
        gap: '0 0.75rem',
        marginBottom: '0.3rem',
        fontSize: '0.8rem',
      }}
    >
      <span style={{ color: '#383838' }}>{label}</span>
      <span style={{ color: '#888' }}>{value}</span>
    </div>
  );
}

export default function TerminalItemPage({ item, category, categoryLabel }: Props) {
  const isNew = !!item.meta?.includes('2025');
  const itemType = getItemType(item, category);
  const venueLabel = getVenueLabel(category);

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
      {/* ── Nav ──────────────────────────────────────── */}
      <div
        style={{
          marginBottom: '3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          fontSize: '0.72rem',
          color: '#333',
        }}
      >
        <span style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {categoryLabel}
        </span>
        <Link href="/" style={{ color: '#383838', fontSize: '0.75rem' }}>
          ← overview
        </Link>
      </div>

      {/* ── Title ────────────────────────────────────── */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            color: '#e0e0e0',
            fontSize: '0.95rem',
            fontWeight: 'normal',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {item.title}
          {isNew && (
            <span style={{ color: 'var(--accent)', opacity: 0.6, fontSize: '0.7rem', marginLeft: '0.5rem' }}>
              [new]
            </span>
          )}
        </h1>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #1a1a1a', margin: '1.75rem 0' }} />

      {/* ── Meta ─────────────────────────────────────── */}
      <div style={{ marginBottom: '1.75rem' }}>
        {item.meta    && <Row label={venueLabel} value={item.meta} />}
        {itemType     && <Row label="type"       value={itemType} />}
        {item.topics.length > 0 && (
          <Row label="topics" value={item.topics.join(' · ')} />
        )}
      </div>

      {/* ── Description ──────────────────────────────── */}
      {item.description && (
        <>
          <hr style={{ border: 'none', borderTop: '1px solid #1a1a1a', margin: '1.75rem 0' }} />
          <p
            style={{
              color: '#666',
              fontSize: '0.825rem',
              lineHeight: 1.85,
              maxWidth: '62ch',
              margin: '0 0 1.75rem',
            }}
          >
            {item.description}
          </p>
        </>
      )}

      {/* ── Links ────────────────────────────────────── */}
      {item.links.length > 0 && (
        <>
          <hr style={{ border: 'none', borderTop: '1px solid #1a1a1a', margin: '1.75rem 0' }} />
          <div>
            <div style={{ color: '#333', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              links
            </div>
            {item.links.map((link) => (
              <div key={link.label} style={{ marginBottom: '0.4rem', fontSize: '0.8rem' }}>
                <span style={{ color: '#383838', display: 'inline-block', minWidth: '7rem' }}>
                  {link.label}
                </span>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent)', wordBreak: 'break-all' }}
                >
                  {link.href}
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Back ─────────────────────────────────────── */}
      <div
        style={{
          marginTop: '3.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #1a1a1a',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/" style={{ color: '#555', fontSize: '0.8rem' }}>
          ← back to overview
        </Link>
        <span
          style={{
            display: 'inline-block',
            width: '0.5em',
            height: '0.85em',
            backgroundColor: 'var(--accent)',
            opacity: 0.6,
            animation: 'blink 1.1s step-end infinite',
          }}
        />
      </div>
    </main>
  );
}
