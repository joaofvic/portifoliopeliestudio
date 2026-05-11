'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import FilterChips from './FilterChips';
import ProjectCard from './ProjectCard';
import { categories, type CategorySlug } from '@/lib/categories';
import type { Project } from '@/lib/projects';

const VALID = new Set(categories.map((c) => c.slug));

export default function PortfolioClient({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const initial = (params.get('cat') ?? 'todos') as CategorySlug;
  const [active, setActive] = useState<CategorySlug>(
    VALID.has(initial) ? initial : 'todos',
  );

  useEffect(() => {
    const fromUrl = (params.get('cat') ?? 'todos') as CategorySlug;
    if (VALID.has(fromUrl) && fromUrl !== active) setActive(fromUrl);
  }, [params, active]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { todos: projects.length };
    for (const p of projects) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [projects]);

  const filtered = useMemo(
    () =>
      active === 'todos'
        ? projects
        : projects.filter((p) => p.category === active),
    [active, projects],
  );

  const handleChange = (slug: CategorySlug) => {
    setActive(slug);
    const url = slug === 'todos' ? '/portfolio' : `/portfolio?cat=${slug}`;
    router.replace(url, { scroll: false });
  };

  return (
    <>
      <div className="container-x sticky top-20 md:top-24 z-30 py-4 bg-ink/80 backdrop-blur-md">
        <FilterChips active={active} onChange={handleChange} counts={counts} />
      </div>

      <div className="container-x mt-12 md:mt-20">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 md:gap-y-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} priority={i < 3} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center py-32 text-bone/40">
            Em breve novos projetos nesta categoria.
          </p>
        )}
      </div>
    </>
  );
}
