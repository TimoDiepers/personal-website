import { notFound } from 'next/navigation';

import { codingProjects } from '@/lib/content';
import ContentDetailPage from '@/components/content-detail-page';

type CodingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => codingProjects.map((item) => ({ id: item.id }));

const CodingDetailPage = async ({ params }: CodingDetailPageProps) => {
  const { id } = await params;
  const coding = codingProjects.find((item) => item.id === id);

  if (!coding) {
    notFound();
  }

  return <ContentDetailPage item={coding} />;
};

export default CodingDetailPage;
