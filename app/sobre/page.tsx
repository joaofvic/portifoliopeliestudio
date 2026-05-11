import Link from 'next/link';
import { site } from '@/content/site';
import ServicesGrid from '@/components/home/ServicesGrid';

export const metadata = {
  title: 'Sobre — peliē studio',
  description: 'Quem somos, como trabalhamos e o que entregamos.',
};

const process = [
  { n: '01', title: 'Escuta', desc: 'Conversa profunda sobre marca, contexto e objetivos.' },
  { n: '02', title: 'Estratégia', desc: 'Posicionamento, conceito e direção criativa.' },
  { n: '03', title: 'Criação', desc: 'Desenvolvimento visual em ciclos curtos.' },
  { n: '04', title: 'Entrega', desc: 'Aplicações, manuais e suporte de implementação.' },
];

export default function SobrePage() {
  return (
    <article className="pt-32 md:pt-44 pb-32">
      <section className="container-x">
        <p className="text-xs uppercase tracking-[0.3em] text-bone/50 mb-8">(sobre)</p>
        <h1 className="text-display font-light leading-[0.9]">
          um estúdio
          <br />
          <span className="italic text-terracotta">pequeno</span> por escolha.
        </h1>
        <p className="mt-12 max-w-2xl text-xl md:text-2xl text-bone/75 leading-relaxed">
          {site.about}
        </p>
      </section>

      <ServicesGrid />

      <section className="container-x mt-32 md:mt-48">
        <div className="grid md:grid-cols-12 gap-10 mb-20">
          <p className="md:col-span-3 text-xs uppercase tracking-[0.3em] text-bone/50">
            (processo)
          </p>
          <h2 className="md:col-span-9 text-section font-light">como trabalhamos</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-10">
          {process.map((p) => (
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
          quer trabalhar
          <br />
          <span className="italic text-terracotta">com a gente</span>?
        </h2>
        <Link
          href="/contato"
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-bone/30 px-8 py-4 text-sm uppercase tracking-[0.18em] hover:bg-bone hover:text-ink transition-all"
        >
          Iniciar conversa
        </Link>
      </section>
    </article>
  );
}
