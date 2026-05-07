'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end pb-20 md:pb-32">
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.3em] text-bone/60 mb-12 md:mb-20"
        >
          Estúdio de design
          <span className="mx-3 text-terracotta">·</span>
          desde 2021
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-display font-light"
        >
          <motion.span
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            design para
          </motion.span>
          <motion.span
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="block italic text-terracotta"
          >
            marcas
          </motion.span>
          <motion.span
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            memoráveis.
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-end md:justify-between gap-10"
        >
          <p className="max-w-md text-base md:text-lg text-bone/70 leading-relaxed">
            Branding, social, motion, fotografia e vídeo nascem do mesmo lugar — uma escuta atenta ao que cada marca quer dizer.
          </p>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] hover:text-terracotta transition-colors"
          >
            <span>Ver portfólio</span>
            <span className="block h-px w-12 bg-bone/40 group-hover:w-20 group-hover:bg-terracotta transition-all duration-500" />
          </Link>
        </motion.div>
      </div>

      <div className="absolute right-6 md:right-12 top-1/3 hidden md:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="w-3 h-3 rounded-full bg-terracotta"
        />
      </div>
    </section>
  );
}
