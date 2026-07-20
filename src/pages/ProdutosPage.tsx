import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import { products, company } from '../lib/data';

export default function ProdutosPage() {
  return (
    <>
      <PageHero
        eyebrow="Catálogo"
        title="Os Nossos Produtos"
        subtitle="Produção própria com rastreabilidade desde o campo, opções de embalagem e entrega nacional."
        crumbs={[{ label: 'Produtos' }]}
      />

      <section className="bg-cream-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {products.map((p) => (
              <article key={p.slug} className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-green-100 transition-all duration-500 hover:shadow-xl hover:ring-green-300 sm:flex-row">
                <div className="relative h-64 overflow-hidden sm:h-auto sm:w-2/5">
                  <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 to-transparent sm:bg-gradient-to-r" />
                  <span className="absolute left-4 top-4 rounded-full bg-green-700 px-3 py-1 text-xs font-600 uppercase tracking-wider text-cream-50">{p.badge}</span>
                </div>
                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <h3 className="font-serif text-2xl font-600 text-green-900">{p.name}</h3>
                  <p className="mt-3 text-sm font-300 leading-relaxed text-green-800/70">{p.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {p.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-green-800/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between border-t border-green-100 pt-5">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-green-800/40">Preço</span>
                      <p className="font-600 text-green-800">{p.price}</p>
                    </div>
                    <Link to={`/produtos/${p.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-5 py-2.5 text-sm font-600 text-cream-50 transition-all hover:bg-green-500">
                      Ver Detalhes
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Interessado nos nossos produtos?" subtitle="Consulte o nosso catálogo completo ou fale connosco para um orçamento personalizado." />
    </>
  );
}
