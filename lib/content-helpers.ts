import type { ContentItem } from '@/lib/content';

export const getItemYear = (item: ContentItem) => {
  return item.year ?? '—';
};

export const getItemType = (item: ContentItem, fallback: string) => {
  return item.type ?? fallback;
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
