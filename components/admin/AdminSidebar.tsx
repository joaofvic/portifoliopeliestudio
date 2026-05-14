'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections: { group: string; items: { label: string; href: string }[] }[] = [
  {
    group: 'Projetos',
    items: [
      { label: 'Lista', href: '/admin' },
      { label: 'Novo projeto', href: '/admin/projects/new' },
    ],
  },
  {
    group: 'Home',
    items: [
      { label: 'Hero', href: '/admin/site/hero' },
      { label: 'Clientes (marquee)', href: '/admin/site/clients.marquee' },
      { label: 'Manifesto', href: '/admin/site/manifesto' },
      { label: 'Serviços', href: '/admin/site/services' },
      { label: 'Método', href: '/admin/site/method' },
    ],
  },
  {
    group: 'Sobre',
    items: [
      { label: 'Hero / texto', href: '/admin/site/about' },
      { label: 'Processo', href: '/admin/site/about.process' },
      { label: 'CTA final', href: '/admin/site/about.cta' },
    ],
  },
  {
    group: 'Contato',
    items: [{ label: 'Página de contato', href: '/admin/site/contact' }],
  },
  {
    group: 'Site',
    items: [{ label: 'Metadados', href: '/admin/site/site.meta' }],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname() ?? '';

  return (
    <aside className="hidden md:block w-64 shrink-0 border-r border-bone/10 pr-8">
      <nav className="space-y-10 sticky top-24">
        {sections.map((s) => (
          <div key={s.group}>
            <p className="text-xs uppercase tracking-[0.3em] text-bone/40 mb-4">{s.group}</p>
            <ul className="space-y-2.5">
              {s.items.map((it) => {
                const isActive =
                  it.href === '/admin'
                    ? pathname === '/admin'
                    : pathname === it.href || pathname.startsWith(it.href + '/');
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
