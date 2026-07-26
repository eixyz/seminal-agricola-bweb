import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import { fetchProducts, fetchProduct } from '../lib/content';
import { company } from '../lib/data';
import type { Product } from '../lib/types';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    Promise.all([fetchProduct(slug ?? ''), fetchProducts()])
      .then(([p, all]) => {
        setProduct(p);
        setOtherProducts(all.filter((x) => x.slug !== slug));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <PageHero eyebrow="Produto" title="A carregar..." subtitle="" crumbs={[{ label: 'Produtos', to: '/produtos' }, { label: '...' }]} />
        <div className="py-20 text-center text-green-800/60">A carregar produto...</div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <PageHero eyebrow="Produto" title="Produto não encontrado" subtitle="O produto que procura não existe." crumbs={[{ label: 'Produtos', to: '/produtos' }, { label: 'N/A' }]} />
        <div className="py-20 text-center">
          <Link to="/produtos" className="text-green-600 hover:text-green-900">← Voltar aos Produtos</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Produto"
        title={product.name}
        subtitle={product.description}
        crumbs={[{ label: 'Produtos', to: '/produtos' }, { label: product.name }]}
      />

      <section className="bg-cream-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Gallery */}
            <div className="lg:col-span-2">
              <img src={product.images[activeImg]} alt={product.name} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg" />
              {product.images.length > 1 && (
                <div className="mt-4 flex gap-3">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)} className={`h-20 w-28 overflow-hidden rounded-xl ring-2 transition-all ${i === activeImg ? 'ring-green-600' : 'ring-transparent hover:ring-green-300'}`}>
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-10">
                <h3 className="font-serif text-xl font-600 text-green-900">Características</h3>
                <ul className="mt-4 space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-green-800/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-6 ring-1 ring-green-100">
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-700 uppercase tracking-wider text-green-700">{product.badge}</span>
                <h2 className="mt-4 font-serif text-2xl font-600 text-green-900">{product.name}</h2>
                <div className="mt-4 flex items-center justify-between border-t border-green-100 pt-4">
                  <span className="text-sm text-green-800/60">Preço:</span>
                  <strong className="font-600 text-green-800">{product.price}</strong>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 ring-1 ring-green-100">
                <h4 className="font-600 text-green-900">Solicitar Orçamento</h4>
                <p className="mt-1 text-sm text-green-800/50">Resposta rápida via WhatsApp.</p>
                <div className="mt-4 space-y-2">
                  <a href={`https://wa.me/258865602805?text=Olá,%20quero%20orçamento%20para%20${encodeURIComponent(product.name)}%20da%20Seminal%20Agrícola.`} target="_blank" rel="noopener noreferrer" className="block rounded-full bg-green-600 px-5 py-3 text-center text-sm font-600 text-cream-50 transition-all hover:bg-green-500">
                    💬 WhatsApp
                  </a>
                  <Link to="/contacto" className="block rounded-full border border-green-300 px-5 py-3 text-center text-sm font-600 text-green-700 transition-all hover:bg-green-50">
                    ✉️ Contacto
                  </Link>
                </div>
                <div className="mt-4 border-t border-green-100 pt-4">
                  <a href={`tel:${company.phoneRaw}`} className="text-sm text-green-700">📞 {company.phone}</a>
                </div>
              </div>

              <div className="rounded-3xl bg-green-50 p-6 ring-1 ring-green-100">
                <h4 className="font-600 text-green-900">Outros Produtos</h4>
                <div className="mt-3 space-y-2">
                  {otherProducts.map((p) => (
                    <Link key={p.slug} to={`/produtos/${p.slug}`} className="block rounded-xl px-3 py-2 text-sm text-green-800/70 transition-colors hover:bg-white hover:text-green-700">
                      {p.badge} {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner title={`Interessado em ${product.name}?`} subtitle="Fale connosco e receba uma proposta personalizada." />
    </>
  );
}
