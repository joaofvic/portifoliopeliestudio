'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { navigation } from '@/content/site';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 inset-x-0 z-50 transition-[padding,backdrop-filter] duration-500',
        scrolled
          ? 'py-4 backdrop-blur-md bg-ink/70 border-b border-bone/5'
          : 'py-6 md:py-8 bg-transparent border-b border-transparent',
      )}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <Link href="/" aria-label="peliē studio — início" className="group">
          <span className="font-sans text-xl md:text-2xl tracking-tight font-light">
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
            className="group inline-flex items-center gap-2 rounded-full border border-bone/20 px-5 py-2.5 text-sm uppercase tracking-[0.18em] text-bone hover:bg-bone hover:text-ink transition-all"
          >
            <span>Conversar</span>
            <span className="block w-1.5 h-1.5 rounded-full bg-terracotta group-hover:bg-ink transition-colors" />
          </Link>
        </div>
      </div>
    </header>
  );
}
