import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { categoryLabel } from '@/lib/categories';
import { aspectToClass, isVideoUrl } from '@/lib/media';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — peliē studio`,
    description: project.excerpt,
  };
}

export default async function CasePage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const all = await getAllProjects();
  const idx = all.findIndex((p) => p.slug === project.slug);
  const next = all[(idx + 1) % all.length] ?? project;

  return (
    <article className="pt-32 md:pt-44">
      <header className="container-x mb-16 md:mb-24">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-bone/60 hover:text-terracotta transition-colors mb-12"
        >
          <span>←</span> Voltar ao portfólio
        </Link>

        <p className="text-xs uppercase tracking-[0.3em] text-terracotta mb-6">
          {categoryLabel(project.category)} · {project.year}
        </p>
        <h1 className="text-hero font-light">{project.title}</h1>
        <p className="mt-6 text-xl md:text-2xl text-bone/70">{project.client}</p>
      </header>

      <div className="container-x">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl md:rounded-[2rem] bg-bone/5">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      </div>

      <section className="container-x py-24 md:py-32 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.3em] text-bone/50">(sobre)</p>
        </div>
        <div className="md:col-span-9 prose-pelie max-w-none text-lg md:text-xl leading-relaxed text-bone/85">
          <MDXRemote source={project.content} />
        </div>
      </section>

      {project.gallery.length > 0 && (
        <section className="container-x pb-24 md:pb-32 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
          {project.gallery.map((item, i) => {
            const video = isVideoUrl(item.url);
            return (
              <div
                key={item.url + i}
                className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-bone/5 ${aspectToClass(item.aspect)}`}
              >
                {video ? (
                  /* eslint-disable-next-line jsx-a11y/media-has-caption */
                  <video
                    src={item.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={item.url}
                    alt={`${project.title} — imagem ${i + 1}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
            );
          })}
        </section>
      )}

      <section className="border-t border-bone/10 py-24 md:py-32">
        <div className="container-x flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-bone/50 mb-4">Próximo projeto</p>
            <Link
              href={`/portfolio/${next.slug}`}
              className="text-section font-light hover:text-terracotta transition-colors"
            >
              {next.title} →
            </Link>
          </div>
          <p className="text-bone/50">{next.client} · {next.year}</p>
        </div>
      </section>
    </article>
  );
}
