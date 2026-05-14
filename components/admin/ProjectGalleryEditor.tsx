'use client';

import Image from 'next/image';
import { upload } from '@vercel/blob/client';
import { useRef, useState } from 'react';
import { GALLERY_ASPECTS, isVideoUrl, type GalleryItem, type GalleryAspect } from '@/lib/media';

type Props = {
  value: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
};

export default function ProjectGalleryEditor({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const uploaded: GalleryItem[] = [];
      let i = 0;
      for (const file of Array.from(files)) {
        i++;
        setProgress(`Enviando ${i}/${files.length}…`);
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/admin/upload',
        });
        uploaded.push({ url: blob.url, aspect: '4/5' });
      }
      onChange([...value, ...uploaded]);
    } catch (e: any) {
      setError(e?.message ?? 'Falha no upload');
    } finally {
      setBusy(false);
      setProgress(null);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  function updateItem(idx: number, patch: Partial<GalleryItem>) {
    const next = value.slice();
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  }

  function remove(idx: number) {
    const next = value.slice();
    next.splice(idx, 1);
    onChange(next);
  }

  function reorder(from: number, to: number) {
    if (from === to) return;
    const next = value.slice();
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="block text-xs uppercase tracking-[0.2em] text-bone/50">
          Galeria (imagens e vídeos)
        </span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="text-xs uppercase tracking-[0.2em] text-terracotta hover:opacity-80 disabled:opacity-50"
        >
          {busy ? progress ?? 'Enviando…' : '+ Adicionar'}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/mp4,video/webm"
        multiple
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />

      {value.length === 0 ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="w-full border border-dashed border-bone/30 rounded-xl py-10 text-bone/50 hover:border-terracotta hover:text-terracotta"
        >
          Clique para enviar imagens ou vídeos
        </button>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {value.map((item, idx) => {
            const video = isVideoUrl(item.url);
            return (
              <div
                key={item.url + idx}
                draggable
                onDragStart={() => setDragIdx(idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragIdx !== null) reorder(dragIdx, idx);
                  setDragIdx(null);
                }}
                className="rounded-lg overflow-hidden border border-bone/10 bg-bone/5"
              >
                <div className={`relative bg-ink ${item.aspect === '5/4' ? 'aspect-[5/4]' : 'aspect-[4/5]'}`}>
                  {video ? (
                    /* eslint-disable-next-line jsx-a11y/media-has-caption */
                    <video
                      src={item.url}
                      muted
                      playsInline
                      loop
                      controls
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <Image src={item.url} alt="" fill sizes="240px" className="object-cover" />
                  )}
                  <span className="absolute top-2 left-2 bg-ink/80 text-bone text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded">
                    {video ? 'vídeo' : 'imagem'}
                  </span>
                  <span className="absolute bottom-2 left-2 bg-ink/80 text-bone text-[10px] px-2 py-0.5 rounded">
                    {idx + 1}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 p-3">
                  <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-bone/60">
                    <span>Proporção</span>
                    <select
                      value={item.aspect}
                      onChange={(e) => updateItem(idx, { aspect: e.target.value as GalleryAspect })}
                      className="bg-transparent border-b border-bone/30 text-bone py-1 outline-none focus:border-terracotta"
                    >
                      {GALLERY_ASPECTS.map((a) => (
                        <option key={a} value={a} className="bg-ink">
                          {a}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    className="text-[11px] uppercase tracking-[0.18em] text-terracotta hover:opacity-80"
                  >
                    Remover
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {error && <p className="mt-3 text-sm text-terracotta">{error}</p>}
      {value.length > 1 && (
        <p className="mt-3 text-xs text-bone/40">
          Arraste os itens para reordenar. Proporção <strong>4/5</strong> é vertical;{' '}
          <strong>5/4</strong> é horizontal.
        </p>
      )}
    </div>
  );
}
