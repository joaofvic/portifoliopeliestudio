'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/portfolio/ProjectCard';
import type { Project } from '@/lib/projects';

export default function FeaturedGrid({ projects }: { projects: Project[] }) {
  return (
    <section className="py-24 md:py-40">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between gap-6 mb-16 md:mb-24"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-bone/50 mb-6">Selecionados</p>
            <h2 className="text-section font-light">
              trabalhos
              <br />
              <span className="italic text-terracotta">recentes</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden md:inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] hover:text-terracotta transition-colors"
          >
            <span>Ver todos</span>
            <span className="block h-px w-10 bg-bone/40" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20 md:gap-y-32">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className={i % 2 === 1 ? 'md:mt-32' : ''}
            >
              <ProjectCard project={project} priority={i < 2} />
            </div>
          ))}
        </div>

        <div className="mt-20 md:hidden">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em]"
          >
            <span>Ver todos os projetos</span>
            <span className="block h-px w-10 bg-bone/40" />
          </Link>
        </div>
      </div>
    </section>
  );
}
