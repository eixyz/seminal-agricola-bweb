import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ShoppingBag, Home, BarChart3, Droplets, Megaphone, type LucideIcon } from 'lucide-react';
import { company, products, services, news, partners, imgBase } from '../lib/data';
import { useReveal } from '../lib/hooks';

const slides = [
  `${imgBase}/market/Colheita_de_Milho_Campo_da_Seminal_Agricola.jpg`,
  `${imgBase}/market/Batata_roxa_e_branca_para_o_mercado.jpg`,
  '/images/irrigation/Sistema_de_Irrigacao_por_aspersores1.jpg',
  '/images/sombrite/Hidroponico.png',
  `${imgBase}/market/Cultura_de_pepino1.jpg`,
  '/images/equipments/Sementes_e_equipamentos.jpg',
];

const iconMap: Record<string, LucideIcon> = {
  ShoppingBag, Home, BarChart3, Droplets, Megaphone,
};

export default function HomePage() {
  const [slideIdx, setSlideIdx] = useState(0);
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  useEffect(() => {
    const t = setInterval(() => setSlideIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {slides.map((src, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === slideIdx ? 'opacity-100' : 'opacity-0'}`}>
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/80 via-green-950/50 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-2xl text-cream-50">
            <div className="animate-fade-up text-sm font-600 uppercase tracking-[0.2em] text-gold-400" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
              🌱 Agricultura Sustentável · Moçambique
            </div>
            <h1 className="mt-4 font-serif text-4xl font-600 leading-tight sm:text-6xl" style={{ animation: 'fadeUp 0.8s ease-out 0.2s forwards', opacity: 0 }}>
              Do Campo ao Mercado,<br />com Inovação e Qualidade
            </h1>
            <p className="mt-6 max-w-xl text-lg font-300 leading-relaxed text-cream-100/80" style={{ animation: 'fadeUp 0.8s ease-out 0.4s forwards', opacity: 0 }}>
              Consultoria, produção e fornecimento de produtos agrícolas, pecuários e aquaculturais — com tecnologia, rastreabilidade e sustentabilidade em todo Moçambique.
            </p>
            <div className="mt-8 flex flex-wrap gap-4" style={{ animation: 'fadeUp 0.8s ease-out 0.6s forwards', opacity: 0 }}>
              <Link to="/servicos" className="inline-flex items-center gap-2 rounded-full bg-green-600 px-7 py-3.5 text-sm font-600 text-cream-50 transition-all hover:bg-green-500 hover:shadow-lg">
                Ver Serviços <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={company.whatsappGreeting} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cream-50/30 px-7 py-3.5 text-sm font-600 text-cream-50 transition-all hover:bg-cream-50/10">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlideIdx(i)} className={`h-2 rounded-full transition-all ${i === slideIdx ? 'w-8 bg-gold-400' : 'w-2 bg-cream-50/50'}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* Intro strip */}
      <section className="bg-cream-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} grid gap-10 lg:grid-cols-2`}>
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-10 bg-gold-500" />
                <span className="text-sm font-600 uppercase tracking-[0.2em] text-green-600">A Nossa História</span>
              </div>
              <h2 className="font-serif text-3xl font-600 leading-tight text-green-900 sm:text-4xl">
                Sobre a <span className="italic text-green-600">SEMINAL AGRÍCOLA</span>
              </h2>
              <p className="mt-5 text-base font-300 leading-relaxed text-green-800/70">
                A <strong>SEMINAL AGRICOLA, SU, LDA</strong> é uma empresa de agronegócio dedicada à inovação tecnológica e à produtividade agrícola, pecuária e aquacultural. O nosso escopo abrange consultoria e serviços especializados: assistência técnica, sistemas de produção e de irrigação, reservatórios de água, montagem de estufas e sombrite, fornecimento de insumos e equipamentos, mentoria de agronegócio e pesquisas.
              </p>
              <Link to="/sobre" className="mt-6 inline-flex items-center gap-2 text-sm font-600 text-green-600 transition-colors hover:text-green-900">
                Saber Mais <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <img src="/images/about/logo_do_Seminal_Agricola.png" alt="Logo Seminal Agrícola" className="rounded-3xl object-cover shadow-xl" />
              <div className="absolute -bottom-5 -right-4 rounded-2xl bg-green-800 px-6 py-4 text-cream-50 shadow-lg">
                <p className="font-serif text-2xl font-600">NUIT</p>
                <p className="text-sm text-cream-200">{company.nuit}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-cream-100 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-green-400" />
              <span className="text-sm font-600 uppercase tracking-[0.2em] text-green-600">O Que Fazemos</span>
              <span className="h-px w-10 bg-green-400" />
            </div>
            <h2 className="font-serif text-4xl font-600 leading-tight text-green-900">
              Nossos <span className="italic text-green-600">Serviços</span>
            </h2>
            <p className="mt-4 text-lg font-300 text-green-800/70">Soluções completas de agronegócio — do projecto à entrega final.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon];
              return (
                <Link key={s.slug} to={`/servicos/${s.slug}`} className="group flex flex-col overflow-hidden rounded-3xl bg-cream-50 ring-1 ring-green-100 transition-all duration-500 hover:shadow-xl hover:ring-green-300" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={s.image} alt={s.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-3">
                      {Icon && (
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700 transition-all group-hover:bg-green-700 group-hover:text-cream-50">
                          <Icon className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                      )}
                      <h3 className="font-serif text-lg font-600 text-green-900">{s.title}</h3>
                    </div>
                    <p className="flex-1 text-sm font-300 leading-relaxed text-green-800/60">{s.short}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-green-600 transition-colors group-hover:text-green-900">
                      Saber Mais <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products preview */}
      <section className="bg-green-950 py-20 text-cream-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-green-400" />
              <span className="text-sm font-600 uppercase tracking-[0.2em] text-green-300">Catálogo</span>
              <span className="h-px w-10 bg-green-400" />
            </div>
            <h2 className="font-serif text-4xl font-600 leading-tight text-cream-50">
              Os Nossos <span className="italic text-cream-300">Produtos</span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Link key={p.slug} to={`/produtos/${p.slug}`} className="group overflow-hidden rounded-3xl bg-green-900/50 ring-1 ring-green-700/50 transition-all hover:ring-green-500/60">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-green-700 px-3 py-1 text-xs font-600 uppercase tracking-wider text-cream-50">{p.badge}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-600 text-cream-50">{p.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm font-300 text-cream-100/60">{p.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-cream-200 transition-colors group-hover:text-gold-400">
                    Ver Detalhes <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News preview */}
      <section className="bg-cream-100 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-green-400" />
              <span className="text-sm font-600 uppercase tracking-[0.2em] text-green-600">Notícias & Publicidades</span>
              <span className="h-px w-10 bg-green-400" />
            </div>
            <h2 className="font-serif text-4xl font-600 leading-tight text-green-900">
              Fique a Par das <span className="italic text-green-600">Novidades</span>
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {news.map((item) => (
              <article key={item.title} className="group flex flex-col overflow-hidden rounded-3xl bg-cream-50 ring-1 ring-green-100 transition-all hover:shadow-xl hover:ring-green-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-green-700 px-3 py-1 text-xs font-600 uppercase tracking-wider text-cream-50">{item.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-base font-600 text-green-900">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm font-300 leading-relaxed text-green-800/60">{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-cream-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <span className="text-sm font-600 uppercase tracking-[0.2em] text-green-600">Rede</span>
            <h2 className="mt-2 font-serif text-3xl font-600 text-green-900">Nossos Parceiros</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((p) => (
              <div key={p.name} className="flex h-24 w-36 items-center justify-center rounded-2xl bg-cream-100 p-6 ring-1 ring-green-100 transition-all hover:shadow-lg">
                <img src={p.src} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
