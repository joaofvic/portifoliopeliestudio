import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getSession } from '@/lib/auth';

export const runtime = 'nodejs';

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
];

const MAX_SIZE = 100 * 1024 * 1024; // 100 MB

export async function POST(req: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'no file provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `tipo de arquivo não permitido: ${file.type}` },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'arquivo muito grande (máximo 100 MB)' },
        { status: 400 },
      );
    }

    console.log('[upload] uploading:', file.name, file.type, file.size);

    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    console.log('[upload] done:', blob.url);

    return NextResponse.json({ url: blob.url });
  } catch (err: any) {
    console.error('[upload] error:', err?.message, err);
    return NextResponse.json({ error: err?.message ?? 'upload falhou' }, { status: 500 });
  }
}
