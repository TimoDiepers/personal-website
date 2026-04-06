import { notFound } from 'next/navigation';

import { presentations } from '@/lib/content';
import ContentDetailPage from '@/components/content-detail-page';

type TalkDetailPageProps = {
  params: Promise<{ id: string }>;
};

const TalkDetailPage = async ({ params }: TalkDetailPageProps) => {
  const { id } = await params;
  const talk = presentations.find((item) => item.id === id);

  if (!talk) {
    notFound();
  }

  return <ContentDetailPage item={talk} fallbackLabel="talk" />;
};

export default TalkDetailPage;
