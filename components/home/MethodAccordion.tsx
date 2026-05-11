'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const pillars = [
  {
    letter: 'P',
    title: 'Propósito',
    body: 'Descobrir a essência da marca, o porquê da existência e a direção que guia todas as decisões.',
  },
  {
    letter: 'E',
    title: 'Estrutura',
    body: 'Organizar posicionamento, oferta e prioridades para que a marca tenha clareza e consistência.',
  },
  {
    letter: 'L',
    title: 'Linguagem',
    body: 'Definir tom, narrativa e sistema verbal para comunicar com precisão e personalidade.',
  },
  {
    letter: 'I',
    title: 'Identidade',
    body: 'Construir o universo visual da marca, traduzindo estratégia em forma, cor, tipografia e composição.',
  },
  {
    letter: 'E',
    title: 'Expressão',
    body: 'Levar a marca para o mundo com presença, coerência e impacto em cada ponto de contato.',
  },
];

export default function MethodAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-40">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-12 gap-10 mb-16 md:mb-24"
        >
          <p className="md:col-span-3 text-xs uppercase tracking-[0.3em] text-bone/50">
            (método)
          </p>
          <div className="md:col-span-9">
            <h2 className="text-section font-light">
              estratégia que dá{' '}
              <span className="italic text-terracotta">forma à marca</span>.
            </h2>
            <p className="mt-6 max-w-xl text-base md:text-lg text-bone/60 leading-relaxed">
              O acrônimo <span className="text-bone">PELIĒ</span> guia cinco etapas
              do nosso processo — do propósito à expressão.
            </p>
          </div>
        </motion.div>

        <ul className="border-t border-bone/10">
          {pillars.map((p, i) => {
            const isOpen = open === i;
            const panelId = `pillar-panel-${i}`;
            const buttonId = `pillar-button-${i}`;
            return (
              <li key={i} className="border-b border-bone/10">
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group w-full flex items-center gap-6 md:gap-10 py-7 md:py-10 text-left"
                >
                  <span className="text-xs text-bone/40 tabular-nums w-8 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
                    <span className="text-terracotta">{p.letter}</span>
                    {p.title.slice(1)}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-bone/20 transition-all duration-300 group-hover:border-bone/40 ${
                      isOpen ? 'rotate-45 border-terracotta/60' : ''
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 md:pb-12 pl-14 md:pl-[4.5rem] pr-14 md:pr-20 max-w-2xl text-base md:text-lg text-bone/70 leading-relaxed">
                        {p.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
