import type { ContentItem } from '@/lib/content';

export const getItemYear = (item: ContentItem) => {
  if (item.year) {
    return item.year;
  }

  if (!item.meta) {
    return '—';
  }

  const matches = item.meta.match(/\b(19\d{2}|2[01]\d{2})\b/g);
  return matches?.at(-1) ?? '—';
};

export const getItemProseLabel = (item: ContentItem, fallback: string) => {
  return item.proseLabel ?? item.topics?.[0]?.toLowerCase() ?? fallback;
};

export const getItemYearValue = (item: ContentItem) => {
  const year = getItemYear(item);
  if (year === '—') {
    return Number.NEGATIVE_INFINITY;
  }

  const parsedYear = Number(year);
  return Number.isFinite(parsedYear) ? parsedYear : Number.NEGATIVE_INFINITY;
};

export const orderByDateDesc = (items: ContentItem[]) => {
  return [...items].sort((a, b) => getItemYearValue(b) - getItemYearValue(a));
};
