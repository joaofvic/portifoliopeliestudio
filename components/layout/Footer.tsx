import Link from 'next/link';
import { navigation } from '@/content/site';
import type { ContactContent, SiteMetaContent } from '@/lib/siteContent';

type Props = {
  meta: SiteMetaContent;
  contact: ContactContent;
};

export default function Footer({ meta, contact }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-bone/10 mt-32">
      <div className="container-x py-16 md:py-24">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-section font-light leading-none">
              vamos criar
              <br />
              <span className="italic text-terracotta">algo memorável</span>?
            </p>
            <Link
              href={`mailto:${contact.email}`}
              className="mt-10 inline-block text-xl md:text-2xl underline decoration-terracotta underline-offset-8 decoration-1 hover:text-terracotta transition-colors"
            >
              {contact.email}
            </Link>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] text-bone/50 mb-4">Navegar</p>
            <ul className="space-y-2 text-base">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-terracotta transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] text-bone/50 mb-4">Social</p>
            <ul className="space-y-2 text-base">
              <li>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-terracotta transition-colors"
                >
                  Instagram {contact.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-terracotta transition-colors"
                >
                  E-mail
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-bone/40">
          <span>© {year} {meta.name}. Todos os direitos reservados.</span>
          <span>{meta.location}</span>
        </div>
      </div>
    </footer>
  );
}
