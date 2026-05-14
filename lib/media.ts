export type GalleryAspect = '4/5' | '5/4';

export type GalleryItem = {
  url: string;
  aspect: GalleryAspect;
};

export const GALLERY_ASPECTS: GalleryAspect[] = ['4/5', '5/4'];

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.m4v'];

export function isVideoUrl(url: string): boolean {
  if (!url) return false;
  const lower = url.toLowerCase().split('?')[0];
  return VIDEO_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export function aspectToClass(aspect: GalleryAspect): string {
  return aspect === '5/4' ? 'aspect-[5/4]' : 'aspect-[4/5]';
}

export function normalizeGalleryItem(input: unknown): GalleryItem | null {
  if (!input) return null;
  if (typeof input === 'string') {
    return input ? { url: input, aspect: '4/5' } : null;
  }
  if (typeof input === 'object') {
    const obj = input as Record<string, unknown>;
    const url = typeof obj.url === 'string' ? obj.url : '';
    if (!url) return null;
    const aspect: GalleryAspect = obj.aspect === '5/4' ? '5/4' : '4/5';
    return { url, aspect };
  }
  return null;
}
