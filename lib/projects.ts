import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { CategorySlug } from './categories';

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: number;
  category: Exclude<CategorySlug, 'todos'>;
  cover: string;
  gallery: string[];
  excerpt: string;
  featured: boolean;
  content: string;
};

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.mdx'));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8');
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,
        client: data.client ?? '',
        year: Number(data.year) || new Date().getFullYear(),
        category: data.category ?? 'branding',
        cover: data.cover ?? '',
        gallery: Array.isArray(data.gallery) ? data.gallery : [],
        excerpt: data.excerpt ?? '',
        featured: Boolean(data.featured),
        content,
      } satisfies Project;
    })
    .sort((a, b) => b.year - a.year);
}

export function getProjectBySlug(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}
