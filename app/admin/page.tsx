import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects } from '@/lib/projects';
import { categoryLabel } from '@/lib/categories';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const projects = await getAllProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-bone/50 mb-3">(portfólio)</p>
          <h1 className="text-3xl md:text-4xl font-light">Projetos</h1>
          <p className="text-bone/60 mt-2">
            {projects.length} {projects.length === 1 ? 'projeto' : 'projetos'} no site.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-5 py-3 bg-terracotta text-ink uppercase tracking-[0.2em] text-xs hover:opacity-90"
        >
          Novo projeto
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="border border-bone/10 rounded-2xl p-12 text-center text-bone/60">
          Nenhum projeto cadastrado ainda. Clique em <span className="text-bone">Novo projeto</span> para começar.
        </div>
      ) : (
        <ul className="grid gap-4">
          {projects.map((p) => (
            <li key={p.id ?? p.slug} className="border border-bone/10 rounded-2xl overflow-hidden hover:border-terracotta/50 transition-colors">
              <Link
                href={`/admin/projects/${p.id}`}
                className="flex items-center gap-6 p-4"
              >
                <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-bone/5">
                  {p.cover ? (
                    <Image src={p.cover} alt="" fill className="object-cover" sizes="96px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-bone/30">sem capa</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg truncate">{p.title}</h2>
                    {p.featured && (
                      <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 bg-terracotta/20 text-terracotta rounded">
                        destaque
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-bone/60 truncate">
                    {p.client && `${p.client} · `}
                    {categoryLabel(p.category)} · {p.year}
                  </p>
                  <p className="text-xs text-bone/40 mt-1">/portfolio/{p.slug}</p>
                </div>
                <span className="text-bone/40">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
