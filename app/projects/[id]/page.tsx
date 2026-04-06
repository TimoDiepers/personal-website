import Link from 'next/link';
import { notFound } from 'next/navigation';

import { codingProjects } from '@/lib/content';
import { getItemProseLabel, getItemYear } from '@/lib/content-helpers';

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { id } = await params;
  const project = codingProjects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-10">
      <Link href="/" className="text-sm underline">
        Back to overview
      </Link>

      <article className="space-y-4">
        <h1 className="text-xl">{project.title}</h1>
        <p className="text-sm">
          {getItemYear(project)} · {getItemProseLabel(project, 'project')}
        </p>
        <p>{project.description}</p>
        {project.meta ? <p className="text-sm">{project.meta}</p> : null}

        {project.topics.length > 0 ? (
          <section className="space-y-2">
            <h2 className="text-sm uppercase tracking-wide">Topics</h2>
            <ul className="list-disc space-y-1 pl-5">
              {project.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.links.length > 0 ? (
          <section className="space-y-2">
            <h2 className="text-sm uppercase tracking-wide">Links</h2>
            <ul className="list-disc space-y-1 pl-5">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  );
};

export default ProjectDetailPage;
