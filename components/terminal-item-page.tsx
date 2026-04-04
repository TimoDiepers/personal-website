import Link from 'next/link';
import type { ContentItem } from '@/lib/content';

type Props = {
  item: ContentItem;
  category: string;
  categoryLabel: string;
};

function getVenueLabel(category: string): string {
  if (category === 'publications') return 'published in';
  if (category === 'presentations') return 'presented at';
  return 'role';
}

function getItemType(item: ContentItem, category: string): string {
  const topics = item.topics.map((t) => t.toLowerCase());
  if (category === 'publications') {
    if (topics.some((t) => t.includes('focus report') || t.includes('report'))) return 'Technical Report';
    if (topics.some((t) => t.includes('software'))) return 'Software Paper';
    return 'Journal Paper';
  }
  if (category === 'presentations') {
    if (topics.some((t) => t.includes('teaching'))) return 'Teaching Workshop';
    if (topics.some((t) => t.includes('poster'))) return 'Poster Presentation';
    if (topics.some((t) => t.includes('session'))) return 'Invited Session';
    return 'Conference Talk';
  }
  if (category === 'projects') {
    if (topics.some((t) => t.includes('webapp') || t.includes('web app'))) return 'Web Application';
    if (topics.some((t) => t.includes('website'))) return 'Website';
    return 'Software Package';
  }
  return '';
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '9rem 1fr',
        gap: '0 0.75rem',
        marginBottom: '0.3rem',
      }}
    >
      <span style={{ color: '#444' }}>{label}</span>
      <span style={{ color: '#cccccc' }}>{value}</span>
    </div>
  );
}

export default function TerminalItemPage({ item, category, categoryLabel }: Props) {
  const venueLabel = getVenueLabel(category);
  const itemType = getItemType(item, category);
  const isNew = !!item.meta && item.meta.includes('2025');

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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>timo diepers — {categoryLabel}</span>
        <Link
          href="/"
          style={{ color: '#444', fontSize: '0.7rem', textDecoration: 'none', letterSpacing: '0.05em' }}
        >
          ← overview
        </Link>
      </div>

      {/* Breadcrumb */}
      <div style={{ marginBottom: '1.5rem', fontSize: '0.8rem' }}>
        <span className="prompt-gt">{'>'} </span>
        <span style={{ color: '#333' }}>{categoryLabel} / </span>
        <span style={{ color: '#555' }}>{item.id}</span>
      </div>

      <div style={{ borderTop: '1px solid #1a1a1a', marginBottom: '1.75rem' }} />

      {/* Title */}
      <div
        style={{
          color: '#f0f0f0',
          fontSize: '1rem',
          lineHeight: 1.55,
          maxWidth: '72ch',
          marginBottom: '0.4rem',
        }}
      >
        {item.title}
        {isNew && <span className="row-new">[new]</span>}
      </div>

      <div style={{ borderTop: '1px solid #1a1a1a', margin: '1.5rem 0' }} />

      {/* Fields */}
      <div style={{ marginBottom: '1.75rem' }}>
        {item.meta    && <FieldRow label={venueLabel} value={item.meta} />}
        {itemType     && <FieldRow label="type"       value={itemType} />}
        {item.topics.length > 0 && (
          <FieldRow label="topics" value={item.topics.join(' · ')} />
        )}
      </div>

      {item.description && (
        <>
          <div style={{ borderTop: '1px solid #1a1a1a', marginBottom: '1.75rem' }} />
          <div
            style={{
              color: '#999',
              maxWidth: '68ch',
              lineHeight: 1.85,
              marginBottom: '1.75rem',
            }}
          >
            {item.description}
          </div>
        </>
      )}

      {item.links.length > 0 && (
        <>
          <div style={{ borderTop: '1px solid #1a1a1a', marginBottom: '1.75rem' }} />
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ color: '#3a3a3a', marginBottom: '0.6rem', fontSize: '0.8rem' }}>links</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '0.75rem' }}>
              {item.links.map((link) => (
                <div key={link.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ color: '#444', minWidth: '7rem' }}>[{link.label}]</span>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ wordBreak: 'break-all' }}>
                    {link.href}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div style={{ borderTop: '1px solid #1a1a1a', marginTop: '2rem', paddingTop: '1.5rem' }}>
        <Link href="/">← back to overview</Link>
        <div style={{ marginTop: '1.25rem' }}>
          <span className="prompt-gt">{'>'} </span>
          <span
            style={{
              display: 'inline-block',
              width: '0.55em',
              height: '1.1em',
              backgroundColor: 'var(--accent)',
              verticalAlign: 'text-bottom',
              marginLeft: '2px',
              animation: 'blink 1s step-end infinite',
            }}
          />
        </div>
      </div>
    </main>
  );
}
