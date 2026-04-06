import { notFound } from 'next/navigation';

import { codingProjects } from '@/lib/content';
import ContentDetailPage from '@/components/content-detail-page';

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { id } = await params;
  const project = codingProjects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return <ContentDetailPage item={project} fallbackLabel="project" />;
};

export default ProjectDetailPage;
