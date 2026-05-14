import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { db, schema } from '../lib/db';
import { sql } from 'drizzle-orm';

async function main() {
  const dir = path.join(process.cwd(), 'content', 'projects');
  if (!fs.existsSync(dir)) {
    console.log('No content/projects directory — nothing to migrate.');
    return;
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  if (files.length === 0) {
    console.log('No MDX files found.');
    return;
  }

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data, content } = matter(raw);

    const values = {
      slug,
      title: data.title ?? slug,
      client: data.client ?? '',
      year: Number(data.year) || new Date().getFullYear(),
      category: data.category ?? 'branding',
      cover: data.cover ?? '',
      gallery: Array.isArray(data.gallery)
        ? data.gallery
            .filter((u: unknown): u is string => typeof u === 'string' && u.length > 0)
            .map((url: string) => ({ url, aspect: '4/5' as const }))
        : [],
      excerpt: data.excerpt ?? '',
      featured: Boolean(data.featured),
      content: content.trim(),
    };

    await db
      .insert(schema.projects)
      .values(values)
      .onConflictDoUpdate({
        target: schema.projects.slug,
        set: { ...values, updatedAt: sql`now()` },
      });

    console.log(`✓ ${slug}`);
  }

  console.log(`\nMigrated ${files.length} project(s).`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
