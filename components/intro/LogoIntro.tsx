'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function LogoIntro() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<'in' | 'out' | 'gone'>('in');
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;
    setMounted(true);
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.style.overflow = 'hidden';
    const total = reduced ? 200 : 2200;
    setTimeout(() => {
      setPhase('out');
      document.body.style.overflow = '';
      setTimeout(() => setPhase('gone'), 700);
    }, total);
  }, []);

  if (!mounted || phase === 'gone') return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      style={{
        opacity: phase === 'out' ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: phase === 'out' ? 'none' : 'auto',
      }}
      aria-hidden="true"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 12 }}
        animate={{
          scale: [0.85, 1, 1, 0.4],
          opacity: [0, 1, 1, 0],
          y: [12, 0, 0, -120],
        }}
        transition={{
          duration: 2,
          times: [0, 0.25, 0.7, 1],
          ease: [0.4, 0, 0.2, 1],
        }}
        className="flex flex-col items-center text-center"
      >
        <Image
          src="/brand/logo-terracotta.svg"
          alt="peliē"
          width={1717}
          height={399}
          priority
          className="w-[60vw] max-w-[420px] md:max-w-[560px] h-auto"
        />
        <p className="mt-6 font-sans font-light uppercase tracking-[0.3em] text-xs md:text-sm text-bone/60">
          estúdio criativo
        </p>
      </motion.div>

      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1, 0] }}
        transition={{
          duration: 2,
          times: [0, 0.4, 0.7, 1],
          ease: [0.4, 0, 0.2, 1],
        }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 h-px w-32 origin-left bg-terracotta"
      />
    </div>
  );
}
