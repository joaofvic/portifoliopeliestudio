import { categories, type CategorySlug } from './categories';
import { slugify } from './slug';
import { normalizeGalleryItem, type GalleryItem } from './media';

const allowedCategories = categories
  .map((c) => c.slug)
  .filter((s): s is Exclude<CategorySlug, 'todos'> => s !== 'todos');

export type ProjectInput = {
  slug: string;
  title: string;
  client: string;
  year: number;
  category: Exclude<CategorySlug, 'todos'>;
  cover: string;
  gallery: GalleryItem[];
  excerpt: string;
  featured: boolean;
  content: string;
};

export function parseProjectInput(body: unknown): ProjectInput | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'invalid body' };
  const b = body as Record<string, unknown>;

  const title = typeof b.title === 'string' ? b.title.trim() : '';
  if (!title) return { error: 'title is required' };

  const rawSlug = typeof b.slug === 'string' && b.slug.trim() ? b.slug : title;
  const slug = slugify(rawSlug);

  const category = typeof b.category === 'string' ? b.category : '';
  if (!allowedCategories.includes(category as any)) {
    return { error: 'invalid category' };
  }

  const year = Number(b.year);
  if (!Number.isFinite(year) || year < 1900 || year > 2100) {
    return { error: 'invalid year' };
  }

  const gallery = Array.isArray(b.gallery)
    ? b.gallery
        .map(normalizeGalleryItem)
        .filter((g): g is GalleryItem => g !== null)
    : [];

  return {
    slug,
    title,
    client: typeof b.client === 'string' ? b.client : '',
    year,
    category: category as Exclude<CategorySlug, 'todos'>,
    cover: typeof b.cover === 'string' ? b.cover : '',
    gallery,
    excerpt: typeof b.excerpt === 'string' ? b.excerpt : '',
    featured: Boolean(b.featured),
    content: typeof b.content === 'string' ? b.content : '',
  };
}
