'use client';

import { motion } from 'framer-motion';
import type { ServicesContent } from '@/lib/siteContent';

export default function ServicesGrid({ content }: { content: ServicesContent }) {
  return (
    <section className="py-24 md:py-40">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-12 gap-10 mb-16 md:mb-20"
        >
          <p className="md:col-span-3 text-xs uppercase tracking-[0.3em] text-bone/50">
            {content.eyebrow}
          </p>
          <h2 className="md:col-span-9 text-section font-light">{content.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
          {content.items.map((s, i) => (
            <motion.div
              key={`${s.title}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
              className="border-t border-bone/10 pt-8 flex gap-6"
            >
              <span className="text-xs text-bone/40 tabular-nums">
                ({String(i + 1).padStart(2, '0')})
              </span>
              <div>
                <h3 className="text-2xl md:text-3xl font-light mb-3">{s.title}</h3>
                <p className="text-bone/65 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
