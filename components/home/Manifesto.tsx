'use client';

import { motion } from 'framer-motion';
import { site } from '@/content/site';

export default function Manifesto() {
  return (
    <section className="py-24 md:py-40">
      <div className="container-x grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-xs uppercase tracking-[0.3em] text-bone/50"
          >
            (manifesto)
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-9"
        >
          <p className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-tight">
            {site.manifesto.split('—').map((part, i, arr) => (
              <span key={i}>
                {part.trim()}
                {i < arr.length - 1 && (
                  <span className="text-terracotta italic"> — </span>
                )}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
