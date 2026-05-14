import Link from 'next/link';
import { headers } from 'next/headers';
import { getSession } from '@/lib/auth';
import LogoutButton from '@/components/admin/LogoutButton';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ThemeToggle from '@/components/layout/ThemeToggle';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin — peliē studio',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const pathname = headers().get('x-invoke-path') ?? '';
  const isLogin = pathname.endsWith('/admin/login');

  return (
    <div className="min-h-screen bg-ink text-bone">
      {session && !isLogin && (
        <header className="border-b border-bone/10">
          <div className="container-x flex items-center justify-between py-5">
            <Link href="/admin" className="text-sm uppercase tracking-[0.3em] text-bone/70 hover:text-terracotta">
              peliē · admin
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-bone/60 hover:text-terracotta">
                Ver site
              </Link>
              <ThemeToggle />
              <LogoutButton />
            </div>
          </div>
        </header>
      )}
      <main className="container-x py-12 md:py-16">
        {session && !isLogin ? (
          <div className="flex gap-10">
            <AdminSidebar />
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
