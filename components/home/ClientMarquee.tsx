'use client';

import Image from 'next/image';
import type { ClientsContent, ClientItem } from '@/lib/siteContent';

export default function ClientMarquee({ content }: { content: ClientsContent }) {
  const normalized: ClientItem[] = content.items.map((it) =>
    typeof it === 'string' ? { name: it, logoUrl: '' } : it
  );
  const items = [...normalized, ...normalized];

  return (
    <section className="border-y border-bone/10 py-10 md:py-14 overflow-hidden">
      <div className="container-x mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-bone/50">{content.label}</p>
      </div>
      <div
        className="group relative overflow-hidden"
        aria-label="Lista de clientes"
      >
        <div className="marquee-track flex items-center gap-16 md:gap-24 animate-marquee group-hover:[animation-play-state:paused]">
          {items.map((item, idx) => (
            <span
              key={`${item.name}-${idx}`}
              className="flex items-center gap-16 md:gap-24 whitespace-nowrap"
            >
              {item.logoUrl ? (
                <Image
                  src={item.logoUrl}
                  alt={item.name}
                  width={200}
                  height={80}
                  className="h-10 md:h-14 w-auto object-contain"
                />
              ) : (
                <span className="text-3xl md:text-5xl font-light tracking-tight text-bone/80 hover:text-terracotta transition-colors">
                  {item.name}
                </span>
              )}
              <span className="text-terracotta">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
