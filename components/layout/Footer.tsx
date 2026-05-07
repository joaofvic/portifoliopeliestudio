import Link from 'next/link';
import { site, navigation } from '@/content/site';

export default function Footer() {
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
              href={`mailto:${site.email}`}
              className="mt-10 inline-block text-xl md:text-2xl underline decoration-terracotta underline-offset-8 decoration-1 hover:text-terracotta transition-colors"
            >
              {site.email}
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
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-terracotta transition-colors"
                >
                  Instagram {site.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-terracotta transition-colors"
                >
                  E-mail
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-bone/40">
          <span>© {year} {site.name}. Todos os direitos reservados.</span>
          <span>{site.location}</span>
        </div>
      </div>
    </footer>
  );
}
