'use client';

import React from 'react';

export const inputClass =
  'w-full bg-transparent border-b border-bone/30 focus:border-terracotta py-2 outline-none text-bone';

export function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.2em] text-bone/50 mb-2">
        {label} {required && <span className="text-terracotta">*</span>}
      </span>
      {children}
      {hint && <span className="block mt-1 text-xs text-bone/40">{hint}</span>}
    </label>
  );
}

export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="text-xs uppercase tracking-[0.3em] text-bone/50 mb-3">{eyebrow}</p>
      <h1 className="text-3xl md:text-4xl font-light">{title}</h1>
    </div>
  );
}

type RepeatableListProps<T> = {
  label: string;
  items: T[];
  onChange: (next: T[]) => void;
  empty: T;
  render: (item: T, update: (patch: Partial<T>) => void, idx: number) => React.ReactNode;
};

export function RepeatableList<T>({ label, items, onChange, empty, render }: RepeatableListProps<T>) {
  function update(idx: number, patch: Partial<T>) {
    const next = items.slice();
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  }
  function move(from: number, to: number) {
    if (to < 0 || to >= items.length) return;
    const next = items.slice();
    const [it] = next.splice(from, 1);
    next.splice(to, 0, it);
    onChange(next);
  }
  function remove(idx: number) {
    const next = items.slice();
    next.splice(idx, 1);
    onChange(next);
  }
  function add() {
    onChange([...items, { ...empty } as T]);
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="block text-xs uppercase tracking-[0.2em] text-bone/50">{label}</span>
        <button
          type="button"
          onClick={add}
          className="text-xs uppercase tracking-[0.2em] text-terracotta hover:opacity-80"
        >
          + Adicionar
        </button>
      </div>
      <ul className="space-y-6">
        {items.map((item, idx) => (
          <li key={idx} className="border border-bone/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-bone/40">#{idx + 1}</span>
              <div className="flex items-center gap-3 text-xs">
                <button type="button" onClick={() => move(idx, idx - 1)} className="text-bone/60 hover:text-bone disabled:opacity-30" disabled={idx === 0}>↑</button>
                <button type="button" onClick={() => move(idx, idx + 1)} className="text-bone/60 hover:text-bone disabled:opacity-30" disabled={idx === items.length - 1}>↓</button>
                <button type="button" onClick={() => remove(idx)} className="text-terracotta hover:opacity-80">remover</button>
              </div>
            </div>
            <div className="space-y-4">{render(item, (patch) => update(idx, patch), idx)}</div>
          </li>
        ))}
        {items.length === 0 && (
          <li className="text-sm text-bone/50 border border-dashed border-bone/20 rounded-xl p-6 text-center">
            Nenhum item. Clique em "+ Adicionar".
          </li>
        )}
      </ul>
    </div>
  );
}
