import { getContent } from '@/lib/siteContent';

export const metadata = {
  title: 'Contato — peliē studio',
  description: 'Vamos conversar sobre seu próximo projeto.',
};

export const revalidate = 60;

export default async function ContatoPage() {
  const c = await getContent('contact');

  return (
    <article className="pt-32 md:pt-44 pb-32 min-h-screen">
      <section className="container-x">
        <p className="text-xs uppercase tracking-[0.3em] text-bone/50 mb-8">{c.eyebrow}</p>
        <h1 className="text-display font-light leading-[0.9]">
          {c.title}
          <br />
          <span className="italic text-terracotta">{c.titleItalic}</span>.
        </h1>
        <p className="mt-12 max-w-xl text-lg md:text-xl text-bone/65 leading-relaxed">
          {c.intro}
        </p>
      </section>

      <section className="container-x mt-24 md:mt-32 grid md:grid-cols-2 gap-12 md:gap-20">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-bone/50 mb-6">{c.emailLabel}</p>
          <a
            href={`mailto:${c.email}`}
            className="text-2xl md:text-4xl font-light underline decoration-terracotta underline-offset-8 decoration-1 hover:text-terracotta transition-colors"
          >
            {c.email}
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-bone/50 mb-6">{c.instagramLabel}</p>
          <a
            href={c.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-2xl md:text-4xl font-light underline decoration-terracotta underline-offset-8 decoration-1 hover:text-terracotta transition-colors"
          >
            {c.instagramHandle}
          </a>
        </div>
      </section>

      <section className="container-x mt-32 md:mt-40 grid md:grid-cols-12 gap-10 border-t border-bone/10 pt-16">
        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.3em] text-bone/50">{c.formEyebrow}</p>
        </div>
        <form className="md:col-span-9 space-y-10">
          <div className="grid md:grid-cols-2 gap-8">
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.18em] text-bone/50 mb-3">
                {c.formNameLabel}
              </span>
              <input
                type="text"
                name="nome"
                required
                className="w-full bg-transparent border-b border-bone/20 py-3 text-lg text-bone placeholder:text-bone/30 focus:border-terracotta focus:outline-none transition-colors"
                placeholder={c.formNamePlaceholder}
              />
            </label>
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.18em] text-bone/50 mb-3">
                {c.formEmailLabel}
              </span>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-transparent border-b border-bone/20 py-3 text-lg text-bone placeholder:text-bone/30 focus:border-terracotta focus:outline-none transition-colors"
                placeholder={c.formEmailPlaceholder}
              />
            </label>
          </div>

          <label className="block">
            <span className="block text-xs uppercase tracking-[0.18em] text-bone/50 mb-3">
              {c.formMessageLabel}
            </span>
            <textarea
              name="mensagem"
              rows={5}
              required
              className="w-full bg-transparent border-b border-bone/20 py-3 text-lg text-bone placeholder:text-bone/30 focus:border-terracotta focus:outline-none transition-colors resize-none"
              placeholder={c.formMessagePlaceholder}
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center gap-3 rounded-full border border-bone/30 px-8 py-4 text-sm uppercase tracking-[0.18em] hover:bg-bone hover:text-ink transition-all"
          >
            {c.formSubmitLabel}
            <span className="block w-2 h-2 rounded-full bg-terracotta" />
          </button>
        </form>
      </section>
    </article>
  );
}
