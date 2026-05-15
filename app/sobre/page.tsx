import Link from 'next/link';
import ServicesGrid from '@/components/home/ServicesGrid';
import { getManyContent } from '@/lib/siteContent';

export const metadata = {
  title: 'Sobre — peliē studio',
  description: 'Quem somos, como trabalhamos e o que entregamos.',
};

export const revalidate = 60;

export default async function SobrePage() {
  const content = await getManyContent(['about', 'about.process', 'about.cta', 'services']);
  const about = content.about;
  const process = content['about.process'];
  const cta = content['about.cta'];

  return (
    <article className="pt-32 md:pt-44 pb-32">
      <section className="container-x">
        <p className="text-xs uppercase tracking-[0.3em] text-bone/50 mb-8">{about.eyebrow}</p>
        <h1 className="text-display font-light leading-[0.9]">
          {about.title}
          <br />
          <span className="italic text-terracotta">{about.titleItalic}</span>
        </h1>
        <p className="mt-12 max-w-2xl text-xl md:text-2xl text-bone/75 leading-relaxed">
          {about.body}
        </p>
      </section>

      <ServicesGrid content={content.services} />

      <section className="container-x mt-32 md:mt-48">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <p className="md:col-span-3 text-xs uppercase tracking-[0.3em] text-bone/50">
            {process.eyebrow}
          </p>
          <h2 className="md:col-span-9 text-section font-light">{process.title}</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-10">
          {process.items.map((p) => (
            <div key={p.n} className="border-t border-bone/10 pt-6">
              <p className="text-terracotta text-sm mb-4">{p.n}</p>
              <h3 className="text-xl md:text-2xl font-light mb-3">{p.title}</h3>
              <p className="text-sm text-bone/60 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x mt-32 md:mt-48 text-center">
        <h2 className="text-section font-light">
          {cta.title}
          <br />
          <span className="italic text-terracotta">{cta.titleItalic}</span>?
        </h2>
        <Link
          href={cta.buttonHref || '/contato'}
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-bone/30 px-8 py-4 text-sm uppercase tracking-[0.18em] hover:bg-bone hover:text-ink transition-all"
        >
          {cta.buttonLabel}
        </Link>
      </section>
    </article>
  );
}
