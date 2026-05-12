'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { navigation, site } from '@/content/site';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-50 transition-[padding,backdrop-filter] duration-500',
          scrolled || open
            ? 'py-4 backdrop-blur-md bg-ink/70 border-b border-bone/5'
            : 'py-6 md:py-8 bg-transparent border-b border-transparent',
        )}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Link href="/" aria-label="peliē studio — início" className="group">
            <span className="font-sans text-lg md:text-xl tracking-tight font-light">
              peliē<span className="text-terracotta">.</span>studio
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10 text-sm uppercase tracking-[0.18em]">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative py-1 text-bone/80 hover:text-bone transition-colors"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-terracotta transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contato"
              className="group hidden md:inline-flex items-center gap-2 rounded-full border border-bone/20 px-5 py-2.5 text-sm uppercase tracking-[0.18em] text-bone hover:bg-bone hover:text-ink transition-all"
            >
              <span>Conversar</span>
              <span className="block w-1.5 h-1.5 rounded-full bg-terracotta group-hover:bg-ink transition-colors" />
            </Link>
            <button
              type="button"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone hover:bg-bone hover:text-ink transition-all"
            >
              {open ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 bg-ink pt-24 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block text-4xl font-light hover:text-terracotta transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              className="mt-16 pt-8 border-t border-bone/10 space-y-3 text-sm text-bone/60"
            >
              <a href={`mailto:${site.email}`} className="block hover:text-terracotta transition-colors">
                {site.email}
              </a>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="block hover:text-terracotta transition-colors">
                {site.instagramHandle}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
