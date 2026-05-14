import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createSessionCookie } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const username = typeof body?.username === 'string' ? body.username : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!username || !password) {
    return NextResponse.json({ error: 'missing credentials' }, { status: 400 });
  }

  const ok = await verifyPassword(username, password);
  if (!ok) {
    return NextResponse.json({ error: 'invalid credentials' }, { status: 401 });
  }

  await createSessionCookie(username);
  return NextResponse.json({ ok: true });
}
