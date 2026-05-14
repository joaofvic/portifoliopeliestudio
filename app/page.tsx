import Hero from '@/components/home/Hero';
import Manifesto from '@/components/home/Manifesto';
import ClientMarquee from '@/components/home/ClientMarquee';
import ServicesGrid from '@/components/home/ServicesGrid';
import FeaturedGrid from '@/components/home/FeaturedGrid';
import MethodAccordion from '@/components/home/MethodAccordion';
import { getFeaturedProjects } from '@/lib/projects';
import { getManyContent } from '@/lib/siteContent';

export const revalidate = 60;

export default async function HomePage() {
  const [featured, content] = await Promise.all([
    getFeaturedProjects().then((p) => p.slice(0, 4)),
    getManyContent(['hero', 'clients.marquee', 'manifesto', 'services', 'method']),
  ]);
  return (
    <>
      <Hero content={content.hero} />
      <ClientMarquee content={content['clients.marquee']} />
      <Manifesto content={content.manifesto} />
      <ServicesGrid content={content.services} />
      <FeaturedGrid projects={featured} />
      <MethodAccordion content={content.method} />
    </>
  );
}
