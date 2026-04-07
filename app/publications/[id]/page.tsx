import { notFound } from 'next/navigation';

import ContentDetailPage from '@/components/content-detail-page';
import { publications } from '@/lib/content';

type PublicationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => publications.map((item) => ({ id: item.id }));

const PublicationDetailPage = async ({ params }: PublicationDetailPageProps) => {
  const { id } = await params;
  const publication = publications.find((item) => item.id === id);

  if (!publication) {
    notFound();
  }

  return <ContentDetailPage item={publication} />;
};

export default PublicationDetailPage;
