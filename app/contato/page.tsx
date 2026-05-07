import { site } from '@/content/site';

export const metadata = {
  title: 'Contato — peliē studio',
  description: 'Vamos conversar sobre seu próximo projeto.',
};

export default function ContatoPage() {
  return (
    <article className="pt-32 md:pt-44 pb-32 min-h-screen">
      <section className="container-x">
        <p className="text-xs uppercase tracking-[0.3em] text-bone/50 mb-8">(contato)</p>
        <h1 className="text-display font-light leading-[0.9]">
          conta sua
          <br />
          <span className="italic text-terracotta">ideia</span>.
        </h1>
        <p className="mt-12 max-w-xl text-lg md:text-xl text-bone/65 leading-relaxed">
          A melhor forma de começar é uma conversa. Manda uma mensagem, um e-mail ou DM no Instagram — respondemos em até 48h.
        </p>
      </section>

      <section className="container-x mt-24 md:mt-32 grid md:grid-cols-2 gap-12 md:gap-20">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-bone/50 mb-6">E-mail</p>
          <a
            href={`mailto:${site.email}`}
            className="text-2xl md:text-4xl font-light underline decoration-terracotta underline-offset-8 decoration-1 hover:text-terracotta transition-colors"
          >
            {site.email}
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-bone/50 mb-6">Instagram</p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-2xl md:text-4xl font-light underline decoration-terracotta underline-offset-8 decoration-1 hover:text-terracotta transition-colors"
          >
            {site.instagramHandle}
          </a>
        </div>
      </section>

      <section className="container-x mt-32 md:mt-40 grid md:grid-cols-12 gap-10 border-t border-bone/10 pt-16">
        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.3em] text-bone/50">(brief rápido)</p>
        </div>
        <form className="md:col-span-9 space-y-10">
          <div className="grid md:grid-cols-2 gap-8">
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.18em] text-bone/50 mb-3">
                Seu nome
              </span>
              <input
                type="text"
                name="nome"
                required
                className="w-full bg-transparent border-b border-bone/20 py-3 text-lg text-bone placeholder:text-bone/30 focus:border-terracotta focus:outline-none transition-colors"
                placeholder="Como podemos te chamar?"
              />
            </label>
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.18em] text-bone/50 mb-3">
                E-mail
              </span>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-transparent border-b border-bone/20 py-3 text-lg text-bone placeholder:text-bone/30 focus:border-terracotta focus:outline-none transition-colors"
                placeholder="voce@email.com"
              />
            </label>
          </div>

          <label className="block">
            <span className="block text-xs uppercase tracking-[0.18em] text-bone/50 mb-3">
              Sobre o projeto
            </span>
            <textarea
              name="mensagem"
              rows={5}
              required
              className="w-full bg-transparent border-b border-bone/20 py-3 text-lg text-bone placeholder:text-bone/30 focus:border-terracotta focus:outline-none transition-colors resize-none"
              placeholder="Conta um pouco sobre a marca e o que precisa..."
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center gap-3 rounded-full border border-bone/30 px-8 py-4 text-sm uppercase tracking-[0.18em] hover:bg-bone hover:text-ink transition-all"
          >
            Enviar mensagem
            <span className="block w-2 h-2 rounded-full bg-terracotta" />
          </button>
        </form>
      </section>
    </article>
  );
}
