import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import {
  ContentKey,
  defaults,
  getContent,
  isContentKey,
  revalidatePathsForKey,
  upsertContent,
} from '@/lib/siteContent';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest, { params }: { params: { key: string } }) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (!isContentKey(params.key)) {
    return NextResponse.json({ error: 'unknown key' }, { status: 404 });
  }
  const value = await getContent(params.key);
  return NextResponse.json({ value });
}

export async function PUT(req: NextRequest, { params }: { params: { key: string } }) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (!isContentKey(params.key)) {
    return NextResponse.json({ error: 'unknown key' }, { status: 404 });
  }
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }

  const key = params.key as ContentKey;
  const merged = { ...(defaults[key] as object), ...(body as object) } as any;

  try {
    await upsertContent(key, merged);
    for (const p of revalidatePathsForKey(key)) revalidatePath(p);
    return NextResponse.json({ ok: true, value: merged });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'database error' }, { status: 500 });
  }
}
