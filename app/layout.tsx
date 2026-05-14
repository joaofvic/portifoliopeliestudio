import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ThemeProvider from '@/components/layout/ThemeProvider';
import SiteChrome from '@/components/layout/SiteChrome';
import { getContent, getManyContent } from '@/lib/siteContent';

const hostGrotesk = localFont({
  src: [
    { path: '../public/fonts/HostGrotesk.ttf', style: 'normal' },
    { path: '../public/fonts/HostGrotesk-Italic.ttf', style: 'italic' },
  ],
  variable: '--font-host',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getContent('site.meta');
  return {
    title: `${meta.name} — ${meta.tagline}`,
    description: meta.defaultDescription,
    icons: { icon: '/favicon.png' },
    openGraph: {
      title: meta.name,
      description: meta.defaultDescription,
      type: 'website',
      locale: 'pt_BR',
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const chrome = await getManyContent(['site.meta', 'contact']);
  return (
    <html lang="pt-BR" className={hostGrotesk.variable} suppressHydrationWarning>
      <body className="bg-ink text-bone">
        <ThemeProvider>
          <SiteChrome meta={chrome['site.meta']} contact={chrome.contact}>
            {children}
          </SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
