'use client';

import Image from 'next/image';
import { upload } from '@vercel/blob/client';
import { useRef, useState } from 'react';

type Props = {
  multiple?: boolean;
  value: string[];
  onChange: (urls: string[]) => void;
  label: string;
  accept?: string;
  kind?: 'image' | 'video';
};

export default function MediaUploader({ multiple, value, onChange, label, accept = 'image/*', kind = 'image' }: Props) {
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
      const uploaded: string[] = [];
      let i = 0;
      for (const file of Array.from(files)) {
        i++;
        setProgress(`Enviando ${i}/${files.length}…`);
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/admin/upload',
        });
        uploaded.push(blob.url);
      }
      onChange(multiple ? [...value, ...uploaded] : uploaded.slice(-1));
    } catch (e: any) {
      setError(e?.message ?? 'Falha no upload');
    } finally {
      setBusy(false);
      setProgress(null);
      if (inputRef.current) inputRef.current.value = '';
    }
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
        <span className="block text-xs uppercase tracking-[0.2em] text-bone/50">{label}</span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="text-xs uppercase tracking-[0.2em] text-terracotta hover:opacity-80 disabled:opacity-50"
        >
          {busy ? progress ?? 'Enviando…' : multiple ? '+ Adicionar' : value[0] ? 'Trocar' : '+ Adicionar'}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
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
          Clique para enviar {kind === 'video'
            ? (multiple ? 'vídeos' : 'um vídeo')
            : (multiple ? 'imagens' : 'uma imagem')}
        </button>
      ) : (
        <div className={multiple ? 'grid grid-cols-2 md:grid-cols-4 gap-3' : 'max-w-md'}>
          {value.map((url, idx) => (
            <div
              key={url + idx}
              draggable={multiple}
              onDragStart={() => setDragIdx(idx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragIdx !== null) reorder(dragIdx, idx);
                setDragIdx(null);
              }}
              className="relative aspect-square rounded-lg overflow-hidden bg-bone/5 group"
            >
              {kind === 'video' ? (
                /* eslint-disable-next-line jsx-a11y/media-has-caption */
                <video src={url} muted playsInline controls className="absolute inset-0 w-full h-full object-cover bg-ink" />
              ) : (
                <Image src={url} alt="" fill sizes="200px" className="object-cover" />
              )}
              <button
                type="button"
                onClick={() => remove(idx)}
                className="absolute top-2 right-2 bg-ink/80 hover:bg-terracotta text-bone text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Remover
              </button>
              {multiple && (
                <span className="absolute bottom-2 left-2 bg-ink/80 text-bone text-[10px] px-2 py-0.5 rounded">
                  {idx + 1}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-2 text-sm text-terracotta">{error}</p>}
      {multiple && value.length > 1 && (
        <p className="mt-3 text-xs text-bone/40">Arraste para reordenar.</p>
      )}
    </div>
  );
}
