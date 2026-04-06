import Link from 'next/link';
import type { ContentItem } from '@/lib/content';

function getVenueLabel(category: string) {
  if (category === 'publications')  return 'published in';
  if (category === 'presentations') return 'presented at';
  return 'role';
}

function getItemType(item: ContentItem, category: string): string {
  const t = item.topics.map(x => x.toLowerCase());
  if (category === 'publications') {
    if (t.some(x => x.includes('report')))   return 'Technical Report';
    if (t.some(x => x.includes('software'))) return 'Software Paper';
    return 'Journal Paper';
  }
  if (category === 'presentations') {
    if (t.some(x => x.includes('teaching'))) return 'Teaching Workshop';
    if (t.some(x => x.includes('poster')))   return 'Poster Presentation';
    if (t.some(x => x.includes('session')))  return 'Invited Session';
    return 'Conference Talk';
  }
  if (category === 'projects') {
    if (t.some(x => x.includes('webapp') || x.includes('web app'))) return 'Web Application';
    if (t.some(x => x.includes('website'))) return 'Website';
    return 'Software Package';
  }
  return '';
}

export default function TerminalItemPage({ item, category, categoryLabel }: {
  item: ContentItem;
  category: string;
  categoryLabel: string;
}) {
  const isNew = item.meta?.includes('2025');

  return (
    <main style={{ maxWidth: '640px', margin: '0 auto', padding: 'clamp(2rem, 6vw, 3.5rem) 1.25rem' }}>

      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', color: '#404040' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>{categoryLabel}</span>
        <Link href="/" style={{ color: '#404040' }}>← overview</Link>
      </div>

      {/* Title */}
      <h1 style={{ color: '#e0e0e0', fontSize: 'inherit', fontWeight: 600, lineHeight: 1.5, margin: '0 0 0.25rem' }}>
        {item.title}
        {isNew && <span style={{ color: 'var(--accent)', fontWeight: 'normal', opacity: 0.6, marginLeft: '0.5rem' }}>[new]</span>}
      </h1>

      <hr style={{ border: 'none', borderTop: '1px solid #1e1e1e', margin: '1.5rem 0' }} />

      {/* Meta */}
      <div style={{ marginBottom: '1.5rem' }}>
        {item.meta && (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.2rem' }}>
            <span style={{ color: '#404040', minWidth: '8rem' }}>{getVenueLabel(category)}</span>
            <span style={{ color: '#888' }}>{item.meta}</span>
          </div>
        )}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.2rem' }}>
          <span style={{ color: '#404040', minWidth: '8rem' }}>type</span>
          <span style={{ color: '#888' }}>{getItemType(item, category)}</span>
        </div>
        {item.topics.length > 0 && (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ color: '#404040', minWidth: '8rem' }}>topics</span>
            <span style={{ color: '#888' }}>{item.topics.join(' · ')}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {item.description && (
        <>
          <hr style={{ border: 'none', borderTop: '1px solid #1e1e1e', margin: '1.5rem 0' }} />
          <p style={{ color: '#666', maxWidth: '58ch', lineHeight: 1.85, margin: '0 0 1.5rem' }}>
            {item.description}
          </p>
        </>
      )}

      {/* Links */}
      {item.links.length > 0 && (
        <>
          <hr style={{ border: 'none', borderTop: '1px solid #1e1e1e', margin: '1.5rem 0' }} />
          <div style={{ color: '#404040', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>links</div>
          {item.links.map(link => (
            <div key={link.label} style={{ display: 'flex', gap: '1rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
              <span style={{ color: '#404040', minWidth: '8rem' }}>{link.label}</span>
              <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ wordBreak: 'break-all' }}>
                {link.href}
              </a>
            </div>
          ))}
        </>
      )}

      {/* Back */}
      <div style={{ marginTop: '3rem', paddingTop: '1.25rem', borderTop: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: '#555' }}>← back to overview</Link>
        <span className="cursor" />
      </div>

    </main>
  );
}
