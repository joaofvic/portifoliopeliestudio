'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminNavSections, isAdminItemActive } from './adminNav';

export default function AdminSidebar() {
  const pathname = usePathname() ?? '';

  return (
    <aside className="hidden md:block w-64 shrink-0 border-r border-bone/10 pr-8">
      <nav className="space-y-10 sticky top-24">
        {adminNavSections.map((s) => (
          <div key={s.group}>
            <p className="text-xs uppercase tracking-[0.3em] text-bone/40 mb-4">{s.group}</p>
            <ul className="space-y-2.5">
              {s.items.map((it) => {
                const isActive = isAdminItemActive(pathname, it.href);
                return (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className={`block text-sm transition-colors ${
                        isActive
                          ? 'text-terracotta'
                          : 'text-bone/70 hover:text-bone'
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
    </aside>
  );
}
