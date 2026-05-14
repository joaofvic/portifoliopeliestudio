'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';
import LogoIntro from '../intro/LogoIntro';
import type { ContactContent, SiteMetaContent } from '@/lib/siteContent';

type Props = {
  children: React.ReactNode;
  meta: SiteMetaContent;
  contact: ContactContent;
};

export default function SiteChrome({ children, meta, contact }: Props) {
  const pathname = usePathname() ?? '';
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <LogoIntro />
      <SmoothScroll>
        <Header contact={contact} />
        <main>{children}</main>
        <Footer meta={meta} contact={contact} />
      </SmoothScroll>
    </>
  );
}
