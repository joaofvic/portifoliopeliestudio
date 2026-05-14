'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MediaUploader from './MediaUploader';
import ProjectGalleryEditor from './ProjectGalleryEditor';
import { categories } from '@/lib/categories';
import type { Project } from '@/lib/projects';
import type { GalleryItem } from '@/lib/media';

const editableCategories = categories.filter((c) => c.slug !== 'todos');

type Props =
  | { mode: 'create'; project?: undefined }
  | { mode: 'edit'; project: Project };

export default function ProjectForm(props: Props) {
  const router = useRouter();
  const initial = props.mode === 'edit' ? props.project : null;

  const [title, setTitle] = useState(initial?.title ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [client, setClient] = useState(initial?.client ?? '');
  const [year, setYear] = useState<number>(initial?.year ?? new Date().getFullYear());
  const [category, setCategory] = useState(initial?.category ?? 'branding');
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [cover, setCover] = useState<string[]>(initial?.cover ? [initial.cover] : []);
  const [gallery, setGallery] = useState<GalleryItem[]>(initial?.gallery ?? []);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title,
      slug: slug || title,
      client,
      year: Number(year),
      category,
      excerpt,
      content,
      featured,
      cover: cover[0] ?? '',
      gallery,
    };

    const url =
      props.mode === 'create'
        ? '/api/admin/projects'
        : `/api/admin/projects/${props.project.id}`;
    const method = props.mode === 'create' ? 'POST' : 'PATCH';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? 'Falha ao salvar');
        setSaving(false);
        return;
      }
      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Erro de rede');
      setSaving(false);
    }
  }

  async function remove() {
    if (props.mode !== 'edit') return;
    if (!confirm(`Excluir "${props.project.title}"? Esta ação não pode ser desfeita.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/projects/${props.project.id}`, { method: 'DELETE' });
      if (!res.ok) {
        setError('Falha ao excluir');
        setDeleting(false);
        return;
      }
      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Erro de rede');
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-10 max-w-3xl">
      <Field label="Título" required>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field
        label="Slug (URL)"
        hint={`A URL pública será /portfolio/${slug || '...'}. Deixe vazio para gerar do título.`}
      >
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder={title ? title.toLowerCase().replace(/\s+/g, '-') : ''}
          className={inputClass}
        />
      </Field>

      <div className="grid md:grid-cols-3 gap-6">
        <Field label="Cliente">
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Ano" required>
          <input
            type="number"
            required
            min={1900}
            max={2100}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className={inputClass}
          />
        </Field>
        <Field label="Categoria" required>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className={inputClass}
          >
            {editableCategories.map((c) => (
              <option key={c.slug} value={c.slug} className="bg-ink">
                {c.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Resumo (1-2 linhas)">
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className={inputClass}
        />
      </Field>

      <Field label="Descrição completa" hint="Aparece na página do projeto. Aceita markdown simples.">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className={inputClass}
        />
      </Field>

      <MediaUploader
        label="Capa"
        value={cover}
        onChange={setCover}
        multiple={false}
      />

      <ProjectGalleryEditor value={gallery} onChange={setGallery} />

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="w-4 h-4 accent-terracotta"
        />
        <span className="text-sm">Destacar na home</span>
      </label>

      {error && <p className="text-sm text-terracotta">{error}</p>}

      <div className="flex items-center justify-between pt-6 border-t border-bone/10">
        {props.mode === 'edit' ? (
          <button
            type="button"
            onClick={remove}
            disabled={deleting || saving}
            className="text-sm text-terracotta hover:opacity-80 disabled:opacity-50"
          >
            {deleting ? 'Excluindo…' : 'Excluir projeto'}
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={saving || deleting}
          className="px-6 py-3 bg-terracotta text-ink uppercase tracking-[0.2em] text-xs hover:opacity-90 disabled:opacity-50"
        >
          {saving ? 'Salvando…' : props.mode === 'create' ? 'Criar projeto' : 'Salvar alterações'}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  'w-full bg-transparent border-b border-bone/30 focus:border-terracotta py-2 outline-none text-bone';

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.2em] text-bone/50 mb-2">
        {label} {required && <span className="text-terracotta">*</span>}
      </span>
      {children}
      {hint && <span className="block mt-1 text-xs text-bone/40">{hint}</span>}
    </label>
  );
}
