'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [pending, start] = useTransition();

  function handle() {
    start(async () => {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.replace('/admin/login');
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={pending}
      className="text-bone/60 hover:text-terracotta disabled:opacity-50"
    >
      {pending ? 'Saindo…' : 'Sair'}
    </button>
  );
}
