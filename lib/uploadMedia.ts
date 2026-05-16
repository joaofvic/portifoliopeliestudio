import { upload } from '@vercel/blob/client';

export const MAX_UPLOAD_BYTES = 100 * 1024 * 1024; // 100 MB

const HEIC_TYPES = ['image/heic', 'image/heif'];

function isHeic(file: File) {
  if (HEIC_TYPES.includes(file.type)) return true;
  return /\.(heic|heif)$/i.test(file.name);
}

async function convertHeicToJpeg(file: File): Promise<File> {
  const heic2any = (await import('heic2any')).default;
  const converted = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.9 });
  const blob = Array.isArray(converted) ? converted[0] : converted;
  const name = file.name.replace(/\.(heic|heif)$/i, '') + '.jpg';
  return new File([blob], name, { type: 'image/jpeg' });
}

export type UploadOptions = {
  onProgress?: (percent: number) => void;
};

export async function uploadMedia(input: File, opts: UploadOptions = {}): Promise<{ url: string }> {
  let file = input;

  if (isHeic(file)) {
    try {
      file = await convertHeicToJpeg(file);
    } catch {
      throw new Error(
        "Não foi possível converter a foto HEIC do iPhone. No iPhone, vá em Ajustes › Câmera › Formatos e escolha 'Mais Compatível', ou converta a imagem para JPG.",
      );
    }
  }

  try {
    const blob = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: '/api/admin/upload',
      contentType: file.type || undefined,
      onUploadProgress: opts.onProgress
        ? (p) => opts.onProgress!(Math.round(p.percentage))
        : undefined,
    });
    return { url: blob.url };
  } catch (err) {
    throw new Error(toFriendlyMessage(err));
  }
}

export function toFriendlyMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err ?? '');
  const lower = msg.toLowerCase();

  if (lower.includes('maximumsizeinbytes') || lower.includes('too large') || lower.includes('size')) {
    return 'A imagem é muito grande. Envie um arquivo de até 100 MB.';
  }
  if (lower.includes('content type') || lower.includes('allowedcontenttypes') || lower.includes('not allowed')) {
    return 'Formato não suportado. Use JPG, PNG, WebP, GIF ou vídeo MP4/WebM.';
  }
  if (lower.includes('private store') || lower.includes('public access')) {
    return 'O armazenamento de mídia está configurado como privado. Avise o administrador para liberar o acesso público do Vercel Blob.';
  }
  if (lower.includes('aborted') || lower.includes('timeout') || lower.includes('network') || lower.includes('failed to fetch')) {
    return 'Conexão interrompida durante o envio. Verifique a internet e tente novamente.';
  }
  return msg || 'Falha no upload. Tente novamente.';
}
