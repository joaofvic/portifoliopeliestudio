import Hero from '@/components/home/Hero';
import Manifesto from '@/components/home/Manifesto';
import ClientMarquee from '@/components/home/ClientMarquee';
import FeaturedGrid from '@/components/home/FeaturedGrid';
import MethodAccordion from '@/components/home/MethodAccordion';
import { getFeaturedProjects } from '@/lib/projects';

export default function HomePage() {
  const featured = getFeaturedProjects().slice(0, 4);
  return (
    <>
      <Hero />
      <ClientMarquee />
      <Manifesto />
      <FeaturedGrid projects={featured} />
      <MethodAccordion />
    </>
  );
}
