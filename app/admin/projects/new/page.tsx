import Link from 'next/link';
import ProjectForm from '@/components/admin/ProjectForm';

export const dynamic = 'force-dynamic';

export default function NewProjectPage() {
  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-bone/60 hover:text-terracotta mb-10"
      >
        ← Voltar
      </Link>
      <h1 className="text-3xl md:text-4xl font-light mb-10">Novo projeto</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
