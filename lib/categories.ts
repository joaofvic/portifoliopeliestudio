export const categories = [
  { slug: 'todos', label: 'Todos' },
  { slug: 'branding', label: 'Branding' },
  { slug: 'social', label: 'Social Media' },
  { slug: 'motion', label: 'Motion' },
  { slug: 'fotografia', label: 'Fotografia' },
  { slug: 'headshot', label: 'Headshot' },
  { slug: 'video', label: 'Vídeo' },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];

export const categoryLabel = (slug: string): string =>
  categories.find((c) => c.slug === slug)?.label ?? slug;
