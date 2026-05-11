'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/projects';
import { categoryLabel } from '@/lib/categories';

type Props = {
  project: Project;
  priority?: boolean;
  layout?: 'tall' | 'wide';
};

export default function ProjectCard({ project, priority = false, layout = 'tall' }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/portfolio/${project.slug}`} className="block">
        <div
          className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-bone/5 ${
            layout === 'wide' ? 'aspect-[4/3]' : 'aspect-[4/5]'
          }`}
        >
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
        </div>

        <div className="mt-5 flex items-end justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-light tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-bone/50 mt-1">{project.client}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs uppercase tracking-[0.18em] text-terracotta">
              {categoryLabel(project.category)}
            </p>
            <p className="text-xs text-bone/40 mt-1">{project.year}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
