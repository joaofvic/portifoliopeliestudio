import LoginForm from '@/components/admin/LoginForm';

export const dynamic = 'force-dynamic';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  return (
    <div className="max-w-sm mx-auto pt-16">
      <p className="text-xs uppercase tracking-[0.3em] text-bone/50 mb-6">
        (acesso restrito)
      </p>
      <h1 className="text-3xl font-light mb-10">Entrar</h1>
      <LoginForm nextPath={searchParams.next} />
    </div>
  );
}
