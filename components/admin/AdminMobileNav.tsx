'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { adminNavSections, isAdminItemActive } from './adminNav';

export default function AdminMobileNav() {
  const pathname = usePathname() ?? '';
  const [open, setOpen] = useState(false);

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
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={open}
        className="md:hidden relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone/80 hover:text-bone hover:border-bone/40 transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navegação"
          className="md:hidden fixed inset-0 z-50"
        >
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />
          <div className="relative h-full w-72 max-w-[85vw] bg-ink border-r border-bone/10 flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-bone/10">
              <span className="text-sm uppercase tracking-[0.3em] text-bone/70">
                peliē · admin
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 text-bone/80 hover:text-bone hover:border-bone/40 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-10">
              {adminNavSections.map((s) => (
                <div key={s.group}>
                  <p className="text-xs uppercase tracking-[0.3em] text-bone/40 mb-4">
                    {s.group}
                  </p>
                  <ul className="space-y-3">
                    {s.items.map((it) => {
                      const isActive = isAdminItemActive(pathname, it.href);
                      return (
                        <li key={it.href}>
                          <Link
                            href={it.href}
                            className={`block text-base transition-colors ${
                              isActive
                                ? 'text-terracotta'
                                : 'text-bone/80 hover:text-bone'
                            }`}
                          >
                            {it.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
