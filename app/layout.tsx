import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import ThemeProvider from '@/components/layout/ThemeProvider';
import LogoIntro from '@/components/intro/LogoIntro';

const hostGrotesk = localFont({
  src: [
    { path: '../public/fonts/HostGrotesk.ttf', style: 'normal' },
    { path: '../public/fonts/HostGrotesk-Italic.ttf', style: 'italic' },
  ],
  variable: '--font-host',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'peliē studio — design e direção criativa',
  description:
    'Estúdio de design dedicado a marcas que querem ser lembradas. Branding, social media, motion, fotografia e vídeo.',
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: 'peliē studio',
    description: 'Estúdio de design dedicado a marcas que querem ser lembradas.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={hostGrotesk.variable} suppressHydrationWarning>
      <body className="bg-ink text-bone">
        <ThemeProvider>
          <LogoIntro />
          <SmoothScroll>
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
