import { desc, eq } from 'drizzle-orm';
import type { CategorySlug } from './categories';
import { normalizeGalleryItem, type GalleryItem } from './media';

export type Project = {
  id?: string;
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

async function getDb() {
  if (!process.env.DATABASE_URL) return null;
  const { db, schema } = await import('./db');
  return { db, schema };
}

function rowToProject(row: {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: number;
  category: string;
  cover: string;
  gallery: unknown;
  excerpt: string;
  featured: boolean;
  content: string;
}): Project {
  const galleryRaw = Array.isArray(row.gallery) ? row.gallery : [];
  const gallery = galleryRaw
    .map(normalizeGalleryItem)
    .filter((g): g is GalleryItem => g !== null);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    client: row.client,
    year: row.year,
    category: row.category as Project['category'],
    cover: row.cover,
    gallery,
    excerpt: row.excerpt,
    featured: row.featured,
    content: row.content,
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const conn = await getDb();
  if (!conn) return [];
  const rows = await conn.db
    .select()
    .from(conn.schema.projects)
    .orderBy(desc(conn.schema.projects.year), desc(conn.schema.projects.createdAt));
  return rows.map(rowToProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const conn = await getDb();
  if (!conn) return null;
  const rows = await conn.db
    .select()
    .from(conn.schema.projects)
    .where(eq(conn.schema.projects.slug, slug))
    .limit(1);
  return rows[0] ? rowToProject(rows[0]) : null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const conn = await getDb();
  if (!conn) return null;
  const rows = await conn.db
    .select()
    .from(conn.schema.projects)
    .where(eq(conn.schema.projects.id, id))
    .limit(1);
  return rows[0] ? rowToProject(rows[0]) : null;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.featured);
}
