'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import ProjectCard from '@/components/portfolio/ProjectCard';
import type { Project } from '@/lib/projects';

export default function FeaturedGrid({ projects }: { projects: Project[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    loop: false,
    containScroll: 'trimSnaps',
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

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
      </div>

      <div className="relative">
        <div
          ref={emblaRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <div className="flex pl-6 md:pl-12 lg:pl-16">
            {projects.map((project, i) => (
              <div
                key={project.slug}
                className="shrink-0 grow-0 basis-[82%] sm:basis-[58%] md:basis-[44%] lg:basis-[36%] pr-6 md:pr-10"
              >
                <ProjectCard project={project} priority={i < 2} />
              </div>
            ))}
            <div className="shrink-0 grow-0 basis-6 md:basis-12 lg:basis-16" aria-hidden />
          </div>
        </div>

        <div className="container-x mt-10 flex items-center justify-between gap-6">
          <div className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-bone/50">
            <span className="h-px w-10 bg-bone/30" />
            <span>arraste</span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone/80 transition-all hover:text-bone hover:border-bone/50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Próximo"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone/80 transition-all hover:text-bone hover:border-bone/50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container-x mt-12 md:hidden">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em]"
        >
          <span>Ver todos os projetos</span>
          <span className="block h-px w-10 bg-bone/40" />
        </Link>
      </div>
    </section>
  );
}
