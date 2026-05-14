import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'peliē — links',
  description: 'Encontre a peliē em todos os canais.',
};

type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

const links: LinkItem[] = [
  { label: 'Site', href: '/' },
  { label: 'WhatsApp', href: 'https://wa.me/message/6E475L2RRD7EC1', external: true },
  { label: 'Portfólio', href: '/portfolio' },
];

export default function LinksPage() {
  const year = new Date().getFullYear();

  return (
    <div data-theme="light" className="min-h-screen bg-ink text-bone flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        <Image
          src="/brand/logo-ink.svg"
          alt="peliē"
          width={140}
          height={48}
          priority
          className="h-12 w-auto"
        />
        <p className="mt-4 text-sm tracking-wide text-bone/70">
          estúdio criativo<span className="text-terracotta">.</span>
        </p>

        <nav className="mt-12 w-full flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-center gap-2.5 w-full rounded-full border border-bone/20 px-5 py-3.5 text-base transition-colors duration-200 hover:bg-bone hover:text-ink"
            >
              <span>{link.label}</span>
              <span className="block w-1.5 h-1.5 rounded-full bg-terracotta transition-colors group-hover:bg-ink" />
            </a>
          ))}
        </nav>

        <footer className="mt-12 text-xs text-bone/50">
          © {year} peliē estúdio criativo
        </footer>
      </div>
    </div>
  );
}
