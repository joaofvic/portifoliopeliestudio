import { Suspense } from 'react';
import PortfolioClient from '@/components/portfolio/PortfolioClient';
import { getAllProjects } from '@/lib/projects';

export const metadata = {
  title: 'Portfólio — peliē studio',
  description: 'Trabalhos de branding, social, motion, fotografia, headshot e vídeo.',
};

export const revalidate = 60;

export default async function PortfolioPage() {
  const projects = await getAllProjects();

  return (
    <section className="pt-32 md:pt-44 pb-32">
      <div className="container-x mb-16 md:mb-24">
        <p className="text-xs uppercase tracking-[0.3em] text-bone/50 mb-8">
          (portfólio)
        </p>
        <h1 className="text-display font-light leading-[0.9]">
          Seleção de
          <span className="block italic text-terracotta">projetos.</span>
        </h1>
        <p className="mt-10 max-w-xl text-base md:text-lg text-bone/60">
          Filtre por tipo de trabalho ou navegue por todos. Cada projeto começa com uma escuta, e termina virando algo que a marca pode chamar de seu.
        </p>
      </div>

      <Suspense fallback={null}>
        <PortfolioClient projects={projects} />
      </Suspense>
    </section>
  );
}
