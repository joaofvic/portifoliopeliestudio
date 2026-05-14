import { NextRequest, NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
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

export async function POST(req: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = (await req.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED_TYPES,
        addRandomSuffix: true,
        maximumSizeInBytes: 100 * 1024 * 1024,
      }),
      onUploadCompleted: async () => {
        // no-op: project rows are updated through the project save endpoint
      },
    });
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('upload error', err);
    return NextResponse.json({ error: err?.message ?? 'upload failed' }, { status: 400 });
  }
}
