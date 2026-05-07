'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { categories, type CategorySlug } from '@/lib/categories';

type Props = {
  active: CategorySlug;
  onChange: (slug: CategorySlug) => void;
  counts: Record<string, number>;
};

export default function FilterChips({ active, onChange, counts }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Filtrar projetos por categoria"
      className="flex flex-wrap items-center gap-2 md:gap-3"
    >
      {categories.map((cat) => {
        const isActive = cat.slug === active;
        const count = counts[cat.slug] ?? 0;
        return (
          <button
            key={cat.slug}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.slug)}
            className={clsx(
              'relative isolate inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm md:text-base transition-colors',
              isActive
                ? 'text-ink border-bone'
                : 'text-bone/80 border-bone/20 hover:border-bone/50',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="active-pill"
                className="absolute inset-0 -z-10 rounded-full bg-bone"
                transition={{ type: 'spring', stiffness: 400, damping: 38 }}
              />
            )}
            <span>{cat.label}</span>
            <span
              className={clsx(
                'text-xs tabular-nums transition-colors',
                isActive ? 'text-ink/50' : 'text-bone/40',
              )}
            >
              {String(count).padStart(2, '0')}
            </span>
          </button>
        );
      })}
    </div>
  );
}
