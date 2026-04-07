import { notFound } from 'next/navigation';

import { presentations } from '@/lib/content';
import ContentDetailPage from '@/components/content-detail-page';

type PresentationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => presentations.map((item) => ({ id: item.id }));

const PresentationDetailPage = async ({ params }: PresentationDetailPageProps) => {
  const { id } = await params;
  const presentation = presentations.find((item) => item.id === id);

  if (!presentation) {
    notFound();
  }

  return <ContentDetailPage item={presentation} />;
};

export default PresentationDetailPage;
