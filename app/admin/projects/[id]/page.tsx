import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects';
import ProjectForm from '@/components/admin/ProjectForm';

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
  if (!project) notFound();

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-bone/60 hover:text-terracotta mb-10"
      >
        ← Voltar
      </Link>
      <h1 className="text-3xl md:text-4xl font-light mb-2">{project.title}</h1>
      <p className="text-bone/50 text-sm mb-10">/portfolio/{project.slug}</p>
      <ProjectForm mode="edit" project={project} />
    </div>
  );
}
