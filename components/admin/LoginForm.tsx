'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm({ nextPath }: { nextPath?: string }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error === 'invalid credentials' ? 'Usuário ou senha incorretos.' : 'Falha ao entrar.');
        setPending(false);
        return;
      }
      const target = nextPath && nextPath.startsWith('/admin') ? nextPath : '/admin';
      router.replace(target);
      router.refresh();
    } catch {
      setError('Erro de rede.');
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className="block text-xs uppercase tracking-[0.2em] text-bone/50 mb-2">Usuário</span>
        <input
          type="text"
          autoComplete="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-transparent border-b border-bone/30 focus:border-terracotta py-2 outline-none text-bone"
        />
      </label>
      <label className="block">
        <span className="block text-xs uppercase tracking-[0.2em] text-bone/50 mb-2">Senha</span>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border-b border-bone/30 focus:border-terracotta py-2 outline-none text-bone"
        />
      </label>
      {error && <p className="text-sm text-terracotta">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-4 px-6 py-3 bg-terracotta text-ink uppercase tracking-[0.2em] text-xs hover:opacity-90 disabled:opacity-50"
      >
        {pending ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  );
}
