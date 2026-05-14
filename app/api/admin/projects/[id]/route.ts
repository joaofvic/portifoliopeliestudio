import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { eq, sql } from 'drizzle-orm';
import { del } from '@vercel/blob';
import { db, schema } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { parseProjectInput } from '@/lib/projectInput';

export const runtime = 'nodejs';

function isBlobUrl(u: string): boolean {
  return /\.public\.blob\.vercel-storage\.com\//.test(u);
}

async function deleteBlobs(urls: string[]) {
  const blobs = urls.filter(isBlobUrl);
  if (blobs.length === 0) return;
  try {
    await del(blobs);
  } catch (e) {
    console.warn('blob delete failed', e);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = parseProjectInput(body);
  if ('error' in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const existing = await db
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.id, params.id))
    .limit(1);

  if (!existing[0]) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  try {
    await db
      .update(schema.projects)
      .set({ ...parsed, updatedAt: sql`now()` })
      .where(eq(schema.projects.id, params.id));

    const oldMedia = [existing[0].cover, ...(existing[0].gallery ?? [])];
    const newMedia = new Set([parsed.cover, ...parsed.gallery]);
    const orphaned = oldMedia.filter((u) => u && !newMedia.has(u));
    await deleteBlobs(orphaned);

    revalidatePath('/');
    revalidatePath('/portfolio');
    if (existing[0].slug !== parsed.slug) {
      revalidatePath(`/portfolio/${existing[0].slug}`);
    }
    revalidatePath(`/portfolio/${parsed.slug}`);

    return NextResponse.json({ ok: true, slug: parsed.slug });
  } catch (err: any) {
    if (err?.code === '23505') {
      return NextResponse.json({ error: 'slug already in use' }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: 'database error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const existing = await db
    .select()
    .from(schema.projects)
    .where(eq(schema.projects.id, params.id))
    .limit(1);

  if (!existing[0]) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  await db.delete(schema.projects).where(eq(schema.projects.id, params.id));

  await deleteBlobs([existing[0].cover, ...(existing[0].gallery ?? [])]);

  revalidatePath('/');
  revalidatePath('/portfolio');
  revalidatePath(`/portfolio/${existing[0].slug}`);

  return NextResponse.json({ ok: true });
}
