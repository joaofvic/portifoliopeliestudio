'use client';

import type { ClientsContent } from '@/lib/siteContent';

export default function ClientMarquee({ content }: { content: ClientsContent }) {
  const items = [...content.items, ...content.items];

  return (
    <section className="border-y border-bone/10 py-10 md:py-14 overflow-hidden">
      <div className="container-x mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-bone/50">{content.label}</p>
      </div>
      <div
        className="group relative overflow-hidden"
        aria-label="Lista de clientes"
      >
        <div className="marquee-track flex gap-16 md:gap-24 animate-marquee group-hover:[animation-play-state:paused]">
          {items.map((name, idx) => (
            <span
              key={`${name}-${idx}`}
              className="text-3xl md:text-5xl font-light tracking-tight whitespace-nowrap text-bone/80 hover:text-terracotta transition-colors"
            >
              {name}
              <span className="ml-16 md:ml-24 text-terracotta">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
