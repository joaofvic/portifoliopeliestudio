export type AdminNavSection = {
  group: string;
  items: { label: string; href: string }[];
};

export const adminNavSections: AdminNavSection[] = [
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
      { label: 'Clientes', href: '/admin/site/clients.marquee' },
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

export function isAdminItemActive(pathname: string, href: string): boolean {
  if (href === '/admin') return pathname === '/admin';
  return pathname === href || pathname.startsWith(href + '/');
}
