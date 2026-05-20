'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type {
  ContentKey,
  ContentMap,
  HeroContent,
  ClientsContent,
  ClientItem,
  ManifestoContent,
  ServicesContent,
  MethodContent,
  AboutContent,
  ProcessContent,
  CtaContent,
  ContactContent,
  SiteMetaContent,
} from '@/lib/siteContent';
import { Field, RepeatableList, SectionTitle, inputClass } from './formPrimitives';
import MediaUploader from '../MediaUploader';

type Props<K extends ContentKey> = {
  contentKey: K;
  initial: ContentMap[K];
};

const titles: Record<ContentKey, { eyebrow: string; title: string }> = {
  hero: { eyebrow: '(home)', title: 'Hero' },
  'clients.marquee': { eyebrow: '(home)', title: 'Clientes' },
  manifesto: { eyebrow: '(home)', title: 'Manifesto' },
  services: { eyebrow: '(home / sobre)', title: 'Serviços' },
  method: { eyebrow: '(home)', title: 'Método' },
  about: { eyebrow: '(sobre)', title: 'Hero da página Sobre' },
  'about.process': { eyebrow: '(sobre)', title: 'Processo' },
  'about.cta': { eyebrow: '(sobre)', title: 'CTA final' },
  contact: { eyebrow: '(contato)', title: 'Página de contato' },
  'site.meta': { eyebrow: '(site)', title: 'Metadados do site' },
};

export default function SiteContentForm<K extends ContentKey>({ contentKey, initial }: Props<K>) {
  const router = useRouter();
  const [value, setValue] = useState<ContentMap[K]>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function patch(p: Partial<ContentMap[K]>) {
    setValue((v) => ({ ...v, ...p }));
    setSaved(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/content/${encodeURIComponent(contentKey)}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(value),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? 'Falha ao salvar');
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setError('Erro de rede');
    } finally {
      setSaving(false);
    }
  }

  const meta = titles[contentKey];

  return (
    <form onSubmit={save} className="space-y-10 max-w-3xl">
      <SectionTitle eyebrow={meta.eyebrow} title={meta.title} />

      {renderFields(contentKey, value, patch)}

      {error && <p className="text-sm text-terracotta">{error}</p>}
      {saved && <p className="text-sm text-bone/60">Salvo. O site pode levar alguns segundos para atualizar.</p>}

      <div className="flex items-center justify-end pt-6 border-t border-bone/10">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-terracotta text-ink uppercase tracking-[0.2em] text-xs hover:opacity-90 disabled:opacity-50"
        >
          {saving ? 'Salvando…' : 'Salvar alterações'}
        </button>
      </div>
    </form>
  );
}

function renderFields<K extends ContentKey>(
  key: K,
  v: ContentMap[K],
  patch: (p: Partial<ContentMap[K]>) => void,
): React.ReactNode {
  switch (key) {
    case 'hero':
      return <HeroFields v={v as HeroContent} patch={patch as any} />;
    case 'clients.marquee':
      return <ClientsFields v={v as ClientsContent} patch={patch as any} />;
    case 'manifesto':
      return <ManifestoFields v={v as ManifestoContent} patch={patch as any} />;
    case 'services':
      return <ServicesFields v={v as ServicesContent} patch={patch as any} />;
    case 'method':
      return <MethodFields v={v as MethodContent} patch={patch as any} />;
    case 'about':
      return <AboutFields v={v as AboutContent} patch={patch as any} />;
    case 'about.process':
      return <ProcessFields v={v as ProcessContent} patch={patch as any} />;
    case 'about.cta':
      return <CtaFields v={v as CtaContent} patch={patch as any} />;
    case 'contact':
      return <ContactFields v={v as ContactContent} patch={patch as any} />;
    case 'site.meta':
      return <SiteMetaFields v={v as SiteMetaContent} patch={patch as any} />;
    default:
      return null;
  }
}

function HeroFields({ v, patch }: { v: HeroContent; patch: (p: Partial<HeroContent>) => void }) {
  return (
    <>
      <Field label="Linha 1" required>
        <input className={inputClass} value={v.line1} onChange={(e) => patch({ line1: e.target.value })} />
      </Field>
      <Field label="Linha 2 (em itálico/terracota)" required>
        <input className={inputClass} value={v.line2Italic} onChange={(e) => patch({ line2Italic: e.target.value })} />
      </Field>
      <Field label="Linha 3" required>
        <input className={inputClass} value={v.line3} onChange={(e) => patch({ line3: e.target.value })} />
      </Field>
      <MediaUploader
        label="Vídeo (WebM) — preferido"
        kind="video"
        accept="video/webm"
        multiple={false}
        value={v.videoWebm ? [v.videoWebm] : []}
        onChange={(urls) => patch({ videoWebm: urls[0] ?? '' })}
      />
      <MediaUploader
        label="Vídeo (MP4) — fallback"
        kind="video"
        accept="video/mp4"
        multiple={false}
        value={v.videoMp4 ? [v.videoMp4] : []}
        onChange={(urls) => patch({ videoMp4: urls[0] ?? '' })}
      />
      <MediaUploader
        label="Poster (imagem mostrada antes do vídeo)"
        kind="image"
        multiple={false}
        value={v.poster ? [v.poster] : []}
        onChange={(urls) => patch({ poster: urls[0] ?? '' })}
      />
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="CTA — texto">
          <input className={inputClass} value={v.ctaLabel} onChange={(e) => patch({ ctaLabel: e.target.value })} />
        </Field>
        <Field label="CTA — link">
          <input className={inputClass} value={v.ctaHref} onChange={(e) => patch({ ctaHref: e.target.value })} />
        </Field>
      </div>
    </>
  );
}

function ClientsFields({ v, patch }: { v: ClientsContent; patch: (p: Partial<ClientsContent>) => void }) {
  return (
    <>
      <Field label="Título / eyebrow">
        <input className={inputClass} value={v.label} onChange={(e) => patch({ label: e.target.value })} />
      </Field>
      <RepeatableList<ClientItem>
        label="Clientes"
        items={v.items}
        onChange={(items) => patch({ items })}
        empty={{ name: '', logoUrl: '' }}
        render={(item, update) => (
          <>
            <Field label="Nome (usado como alt)">
              <input
                className={inputClass}
                value={item.name}
                onChange={(e) => update({ name: e.target.value })}
              />
            </Field>
            <MediaUploader
              label="Logotipo"
              kind="image"
              multiple={false}
              value={item.logoUrl ? [item.logoUrl] : []}
              onChange={(urls) => update({ logoUrl: urls[0] ?? '' })}
            />
          </>
        )}
      />
    </>
  );
}

function ManifestoFields({ v, patch }: { v: ManifestoContent; patch: (p: Partial<ManifestoContent>) => void }) {
  return (
    <>
      <Field label="Eyebrow">
        <input className={inputClass} value={v.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
      </Field>
      <Field label="Texto" hint="Use ' — ' (espaço, travessão, espaço) para separar trechos com destaque em terracota.">
        <textarea rows={5} className={inputClass} value={v.body} onChange={(e) => patch({ body: e.target.value })} />
      </Field>
    </>
  );
}

function ServicesFields({ v, patch }: { v: ServicesContent; patch: (p: Partial<ServicesContent>) => void }) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Eyebrow"><input className={inputClass} value={v.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} /></Field>
        <Field label="Título"><input className={inputClass} value={v.title} onChange={(e) => patch({ title: e.target.value })} /></Field>
      </div>
      <RepeatableList
        label="Serviços"
        items={v.items}
        onChange={(items) => patch({ items })}
        empty={{ title: '', desc: '' }}
        render={(item, update) => (
          <>
            <Field label="Título"><input className={inputClass} value={item.title} onChange={(e) => update({ title: e.target.value })} /></Field>
            <Field label="Descrição"><textarea rows={2} className={inputClass} value={item.desc} onChange={(e) => update({ desc: e.target.value })} /></Field>
          </>
        )}
      />
    </>
  );
}

function MethodFields({ v, patch }: { v: MethodContent; patch: (p: Partial<MethodContent>) => void }) {
  return (
    <>
      <Field label="Eyebrow"><input className={inputClass} value={v.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} /></Field>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Título"><input className={inputClass} value={v.title} onChange={(e) => patch({ title: e.target.value })} /></Field>
        <Field label="Título (parte em itálico/terracota)"><input className={inputClass} value={v.titleItalic} onChange={(e) => patch({ titleItalic: e.target.value })} /></Field>
      </div>
      <Field label="Introdução">
        <textarea rows={3} className={inputClass} value={v.intro} onChange={(e) => patch({ intro: e.target.value })} />
      </Field>
      <RepeatableList
        label="Pilares"
        items={v.pillars}
        onChange={(pillars) => patch({ pillars })}
        empty={{ letter: '', title: '', body: '' }}
        render={(item, update) => (
          <>
            <div className="grid md:grid-cols-3 gap-4">
              <Field label="Letra (1 char)"><input maxLength={2} className={inputClass} value={item.letter} onChange={(e) => update({ letter: e.target.value })} /></Field>
              <div className="md:col-span-2"><Field label="Título"><input className={inputClass} value={item.title} onChange={(e) => update({ title: e.target.value })} /></Field></div>
            </div>
            <Field label="Descrição"><textarea rows={2} className={inputClass} value={item.body} onChange={(e) => update({ body: e.target.value })} /></Field>
          </>
        )}
      />
    </>
  );
}

function AboutFields({ v, patch }: { v: AboutContent; patch: (p: Partial<AboutContent>) => void }) {
  return (
    <>
      <Field label="Eyebrow"><input className={inputClass} value={v.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} /></Field>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Título"><input className={inputClass} value={v.title} onChange={(e) => patch({ title: e.target.value })} /></Field>
        <Field label="Título (parte em itálico/terracota)"><input className={inputClass} value={v.titleItalic} onChange={(e) => patch({ titleItalic: e.target.value })} /></Field>
      </div>
      <Field label="Texto"><textarea rows={5} className={inputClass} value={v.body} onChange={(e) => patch({ body: e.target.value })} /></Field>
    </>
  );
}

function ProcessFields({ v, patch }: { v: ProcessContent; patch: (p: Partial<ProcessContent>) => void }) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Eyebrow"><input className={inputClass} value={v.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} /></Field>
        <Field label="Título"><input className={inputClass} value={v.title} onChange={(e) => patch({ title: e.target.value })} /></Field>
      </div>
      <RepeatableList
        label="Etapas"
        items={v.items}
        onChange={(items) => patch({ items })}
        empty={{ n: '', title: '', desc: '' }}
        render={(item, update) => (
          <>
            <div className="grid md:grid-cols-3 gap-4">
              <Field label="Número"><input className={inputClass} value={item.n} onChange={(e) => update({ n: e.target.value })} /></Field>
              <div className="md:col-span-2"><Field label="Título"><input className={inputClass} value={item.title} onChange={(e) => update({ title: e.target.value })} /></Field></div>
            </div>
            <Field label="Descrição"><textarea rows={2} className={inputClass} value={item.desc} onChange={(e) => update({ desc: e.target.value })} /></Field>
          </>
        )}
      />
    </>
  );
}

function CtaFields({ v, patch }: { v: CtaContent; patch: (p: Partial<CtaContent>) => void }) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Título"><input className={inputClass} value={v.title} onChange={(e) => patch({ title: e.target.value })} /></Field>
        <Field label="Título (parte em itálico/terracota)"><input className={inputClass} value={v.titleItalic} onChange={(e) => patch({ titleItalic: e.target.value })} /></Field>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Botão — texto"><input className={inputClass} value={v.buttonLabel} onChange={(e) => patch({ buttonLabel: e.target.value })} /></Field>
        <Field label="Botão — link"><input className={inputClass} value={v.buttonHref} onChange={(e) => patch({ buttonHref: e.target.value })} /></Field>
      </div>
    </>
  );
}

function ContactFields({ v, patch }: { v: ContactContent; patch: (p: Partial<ContactContent>) => void }) {
  return (
    <>
      <Field label="Eyebrow"><input className={inputClass} value={v.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} /></Field>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Título"><input className={inputClass} value={v.title} onChange={(e) => patch({ title: e.target.value })} /></Field>
        <Field label="Título (parte em itálico/terracota)"><input className={inputClass} value={v.titleItalic} onChange={(e) => patch({ titleItalic: e.target.value })} /></Field>
      </div>
      <Field label="Introdução"><textarea rows={3} className={inputClass} value={v.intro} onChange={(e) => patch({ intro: e.target.value })} /></Field>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Label E-mail"><input className={inputClass} value={v.emailLabel} onChange={(e) => patch({ emailLabel: e.target.value })} /></Field>
        <Field label="E-mail"><input className={inputClass} value={v.email} onChange={(e) => patch({ email: e.target.value })} /></Field>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Field label="Label Instagram"><input className={inputClass} value={v.instagramLabel} onChange={(e) => patch({ instagramLabel: e.target.value })} /></Field>
        <Field label="Instagram URL"><input className={inputClass} value={v.instagram} onChange={(e) => patch({ instagram: e.target.value })} /></Field>
        <Field label="Instagram handle"><input className={inputClass} value={v.instagramHandle} onChange={(e) => patch({ instagramHandle: e.target.value })} /></Field>
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-bone/40 pt-4">Formulário</p>
      <Field label="Eyebrow do formulário"><input className={inputClass} value={v.formEyebrow} onChange={(e) => patch({ formEyebrow: e.target.value })} /></Field>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Label nome"><input className={inputClass} value={v.formNameLabel} onChange={(e) => patch({ formNameLabel: e.target.value })} /></Field>
        <Field label="Placeholder nome"><input className={inputClass} value={v.formNamePlaceholder} onChange={(e) => patch({ formNamePlaceholder: e.target.value })} /></Field>
        <Field label="Label e-mail"><input className={inputClass} value={v.formEmailLabel} onChange={(e) => patch({ formEmailLabel: e.target.value })} /></Field>
        <Field label="Placeholder e-mail"><input className={inputClass} value={v.formEmailPlaceholder} onChange={(e) => patch({ formEmailPlaceholder: e.target.value })} /></Field>
        <Field label="Label mensagem"><input className={inputClass} value={v.formMessageLabel} onChange={(e) => patch({ formMessageLabel: e.target.value })} /></Field>
        <Field label="Placeholder mensagem"><input className={inputClass} value={v.formMessagePlaceholder} onChange={(e) => patch({ formMessagePlaceholder: e.target.value })} /></Field>
      </div>
      <Field label="Texto do botão"><input className={inputClass} value={v.formSubmitLabel} onChange={(e) => patch({ formSubmitLabel: e.target.value })} /></Field>
    </>
  );
}

function SiteMetaFields({ v, patch }: { v: SiteMetaContent; patch: (p: Partial<SiteMetaContent>) => void }) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Nome do site"><input className={inputClass} value={v.name} onChange={(e) => patch({ name: e.target.value })} /></Field>
        <Field label="Nome curto"><input className={inputClass} value={v.shortName} onChange={(e) => patch({ shortName: e.target.value })} /></Field>
      </div>
      <Field label="Tagline"><input className={inputClass} value={v.tagline} onChange={(e) => patch({ tagline: e.target.value })} /></Field>
      <Field label="Descrição padrão"><textarea rows={3} className={inputClass} value={v.defaultDescription} onChange={(e) => patch({ defaultDescription: e.target.value })} /></Field>
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="WhatsApp"><input className={inputClass} value={v.whatsapp} onChange={(e) => patch({ whatsapp: e.target.value })} /></Field>
        <Field label="Localização"><input className={inputClass} value={v.location} onChange={(e) => patch({ location: e.target.value })} /></Field>
      </div>
    </>
  );
}
