import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { sql } from 'drizzle-orm';
import { db, schema } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { parseProjectInput } from '@/lib/projectInput';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = parseProjectInput(body);
  if ('error' in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const [row] = await db
      .insert(schema.projects)
      .values(parsed)
      .returning({ id: schema.projects.id, slug: schema.projects.slug });

    revalidatePath('/');
    revalidatePath('/portfolio');
    revalidatePath(`/portfolio/${row.slug}`);

    return NextResponse.json({ ok: true, id: row.id, slug: row.slug });
  } catch (err: any) {
    if (err?.code === '23505') {
      return NextResponse.json({ error: 'slug already in use' }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: 'database error' }, { status: 500 });
  }
}
