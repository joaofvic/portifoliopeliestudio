import { eq, inArray } from 'drizzle-orm';
import { site as siteDefaults } from '@/content/site';
import { clients as clientsDefaults } from '@/content/clients';

export type HeroContent = {
  line1: string;
  line2Italic: string;
  line3: string;
  videoWebm: string;
  videoMp4: string;
  poster: string;
  ctaLabel: string;
  ctaHref: string;
};

export type ClientsContent = {
  label: string;
  items: string[];
};

export type ManifestoContent = {
  eyebrow: string;
  body: string;
};

export type ServiceItem = { title: string; desc: string };
export type ServicesContent = {
  eyebrow: string;
  title: string;
  items: ServiceItem[];
};

export type MethodPillar = { letter: string; title: string; body: string };
export type MethodContent = {
  eyebrow: string;
  title: string;
  titleItalic: string;
  intro: string;
  pillars: MethodPillar[];
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  titleItalic: string;
  body: string;
};

export type ProcessItem = { n: string; title: string; desc: string };
export type ProcessContent = {
  eyebrow: string;
  title: string;
  items: ProcessItem[];
};

export type CtaContent = {
  title: string;
  titleItalic: string;
  buttonLabel: string;
  buttonHref: string;
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  titleItalic: string;
  intro: string;
  emailLabel: string;
  email: string;
  instagramLabel: string;
  instagram: string;
  instagramHandle: string;
  formEyebrow: string;
  formNameLabel: string;
  formNamePlaceholder: string;
  formEmailLabel: string;
  formEmailPlaceholder: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formSubmitLabel: string;
};

export type SiteMetaContent = {
  name: string;
  shortName: string;
  tagline: string;
  defaultDescription: string;
  whatsapp: string;
  location: string;
};

export type ContentMap = {
  hero: HeroContent;
  'clients.marquee': ClientsContent;
  manifesto: ManifestoContent;
  services: ServicesContent;
  method: MethodContent;
  about: AboutContent;
  'about.process': ProcessContent;
  'about.cta': CtaContent;
  contact: ContactContent;
  'site.meta': SiteMetaContent;
};

export type ContentKey = keyof ContentMap;

export const CONTENT_KEYS: ContentKey[] = [
  'hero',
  'clients.marquee',
  'manifesto',
  'services',
  'method',
  'about',
  'about.process',
  'about.cta',
  'contact',
  'site.meta',
];

export const defaults: ContentMap = {
  hero: {
    line1: 'design para',
    line2Italic: 'marcas',
    line3: 'memoráveis.',
    videoWebm: '/hero/hero-bg.webm',
    videoMp4: '/hero/hero-bg.mp4',
    poster: '/hero/hero-poster.jpg',
    ctaLabel: 'Ver portfólio',
    ctaHref: '/portfolio',
  },
  'clients.marquee': {
    label: 'Marcas que passaram por aqui',
    items: clientsDefaults,
  },
  manifesto: {
    eyebrow: '(manifesto)',
    body: siteDefaults.manifesto,
  },
  services: {
    eyebrow: '(serviços)',
    title: 'o que fazemos',
    items: [
      { title: 'Branding', desc: 'Identidade, naming, manual de marca e sistemas visuais.' },
      { title: 'Social Media', desc: 'Estratégia e produção contínua de conteúdo.' },
      { title: 'Motion', desc: 'Animação para vinhetas, redes e apresentações.' },
      { title: 'Fotografia', desc: 'Direção e produção fotográfica de produto e estilo de vida.' },
      { title: 'Headshot', desc: 'Retratos corporativos com tratamento autoral.' },
      { title: 'Vídeo', desc: 'Filmes de marca, lançamentos e campanhas.' },
    ],
  },
  method: {
    eyebrow: '(método)',
    title: 'estratégia que dá',
    titleItalic: 'forma à marca',
    intro:
      'Mais do que uma assinatura, Peliē é a base do nosso processo. Cinco etapas estruturadas que guiam a marca em uma jornada clara: do propósito à expressão.',
    pillars: [
      { letter: 'P', title: 'Propósito', body: 'Descobrir a essência da marca, o porquê da existência e a direção que guia todas as decisões.' },
      { letter: 'E', title: 'Estrutura', body: 'Organizar posicionamento, oferta e prioridades para que a marca tenha clareza e consistência.' },
      { letter: 'L', title: 'Linguagem', body: 'Definir tom, narrativa e sistema verbal para comunicar com precisão e personalidade.' },
      { letter: 'I', title: 'Identidade', body: 'Construir o universo visual da marca, traduzindo estratégia em forma, cor, tipografia e composição.' },
      { letter: 'E', title: 'Expressão', body: 'Levar a marca para o mundo com presença, coerência e impacto em cada ponto de contato.' },
    ],
  },
  about: {
    eyebrow: '(sobre)',
    title: 'um estúdio',
    titleItalic: 'pequeno por escolha',
    body: siteDefaults.about,
  },
  'about.process': {
    eyebrow: '(processo)',
    title: 'como trabalhamos',
    items: [
      { n: '01', title: 'Escuta', desc: 'Conversa profunda sobre marca, contexto e objetivos.' },
      { n: '02', title: 'Estratégia', desc: 'Posicionamento, conceito e direção criativa.' },
      { n: '03', title: 'Criação', desc: 'Desenvolvimento visual em ciclos curtos.' },
      { n: '04', title: 'Entrega', desc: 'Aplicações, manuais e suporte de implementação.' },
    ],
  },
  'about.cta': {
    title: 'quer trabalhar',
    titleItalic: 'com a gente',
    buttonLabel: 'Iniciar conversa',
    buttonHref: '/contato',
  },
  contact: {
    eyebrow: '(contato)',
    title: 'Sua ideia merece',
    titleItalic: 'espaço',
    intro:
      'Fale com a gente por e-mail, mensagem ou Instagram — será um prazer entender o que você quer construir.',
    emailLabel: 'E-mail',
    email: siteDefaults.email,
    instagramLabel: 'Instagram',
    instagram: siteDefaults.instagram,
    instagramHandle: siteDefaults.instagramHandle,
    formEyebrow: '(brief rápido)',
    formNameLabel: 'Seu nome',
    formNamePlaceholder: 'Como podemos te chamar?',
    formEmailLabel: 'E-mail',
    formEmailPlaceholder: 'voce@email.com',
    formMessageLabel: 'Sobre o projeto',
    formMessagePlaceholder: 'Conta um pouco sobre a marca e o que precisa...',
    formSubmitLabel: 'Enviar mensagem',
  },
  'site.meta': {
    name: siteDefaults.name,
    shortName: siteDefaults.shortName,
    tagline: siteDefaults.tagline,
    defaultDescription: siteDefaults.about,
    whatsapp: siteDefaults.whatsapp,
    location: siteDefaults.location,
  },
};

export function isContentKey(key: string): key is ContentKey {
  return (CONTENT_KEYS as string[]).includes(key);
}

async function getDb() {
  if (!process.env.DATABASE_URL) return null;
  const { db, schema } = await import('./db');
  return { db, schema };
}

export async function getContent<K extends ContentKey>(key: K): Promise<ContentMap[K]> {
  const conn = await getDb();
  if (!conn) return defaults[key];
  try {
    const rows = await conn.db
      .select()
      .from(conn.schema.siteContent)
      .where(eq(conn.schema.siteContent.key, key))
      .limit(1);
    if (!rows[0]) return defaults[key];
    return { ...defaults[key], ...(rows[0].value as object) } as ContentMap[K];
  } catch (err) {
    console.error('getContent failed', key, err);
    return defaults[key];
  }
}

export async function getManyContent<K extends ContentKey>(keys: K[]): Promise<{ [P in K]: ContentMap[P] }> {
  const result = {} as { [P in K]: ContentMap[P] };
  for (const k of keys) result[k] = defaults[k] as ContentMap[K] as ContentMap[typeof k];

  const conn = await getDb();
  if (!conn) return result;
  try {
    const rows = await conn.db
      .select()
      .from(conn.schema.siteContent)
      .where(inArray(conn.schema.siteContent.key, keys as unknown as string[]));
    for (const row of rows) {
      if (isContentKey(row.key)) {
        (result as any)[row.key] = { ...(defaults as any)[row.key], ...(row.value as object) };
      }
    }
  } catch (err) {
    console.error('getManyContent failed', err);
  }
  return result;
}

export async function upsertContent<K extends ContentKey>(key: K, value: ContentMap[K]): Promise<void> {
  const conn = await getDb();
  if (!conn) throw new Error('database not configured');
  await conn.db
    .insert(conn.schema.siteContent)
    .values({ key, value: value as object })
    .onConflictDoUpdate({
      target: conn.schema.siteContent.key,
      set: { value: value as object, updatedAt: new Date() },
    });
}

export function revalidatePathsForKey(key: ContentKey): string[] {
  switch (key) {
    case 'hero':
    case 'clients.marquee':
    case 'manifesto':
    case 'method':
      return ['/'];
    case 'services':
      return ['/', '/sobre'];
    case 'about':
    case 'about.process':
    case 'about.cta':
      return ['/sobre'];
    case 'contact':
      return ['/contato'];
    case 'site.meta':
      return ['/', '/sobre', '/contato', '/portfolio'];
    default:
      return ['/'];
  }
}
