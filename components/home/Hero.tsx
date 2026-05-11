'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-32 md:pt-44 pb-20 md:pb-32">
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.3em] text-bone/60 mb-8 md:mb-12"
        >
          Estúdio de design
          <span className="mx-3 text-terracotta">·</span>
          desde 2021
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl md:rounded-[2rem] aspect-[4/5] md:aspect-[16/9] bg-gradient-to-br from-bone/10 to-bone/5"
        >
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero/hero-poster.jpg"
            aria-hidden="true"
          >
            <source src="/hero/hero-bg.webm" type="video/webm" />
            <source src="/hero/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-ink/40" />

          <div className="absolute inset-x-0 bottom-0 p-8 md:p-14 lg:p-20">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-hero font-light text-bone"
            >
              <motion.span
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                design para
              </motion.span>
              <motion.span
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="block italic text-terracotta"
              >
                marcas
              </motion.span>
              <motion.span
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                memoráveis.
              </motion.span>
            </motion.h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-10"
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
    </section>
  );
}
