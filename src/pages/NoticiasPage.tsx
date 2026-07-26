import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Calendar, Clock } from 'lucide-react';
import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import { fetchNews } from '../lib/content';
import { useReveal } from '../lib/hooks';
import type { NewsArticle } from '../lib/types';

export default function NoticiasPage() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews()
      .then(setNews)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <PageHero eyebrow="Notícias & Publicidades" title="Fique a Par das Novidades" subtitle="" crumbs={[{ label: 'Notícias' }]} />
        <div className="py-20 text-center text-green-800/60">A carregar notícias...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageHero eyebrow="Notícias & Publicidades" title="Fique a Par das Novidades" subtitle="" crumbs={[{ label: 'Notícias' }]} />
        <div className="py-20 text-center text-red-600">Erro ao carregar notícias: {error}</div>
      </>
    );
  }

  if (news.length === 0) {
    return (
      <>
        <PageHero eyebrow="Notícias & Publicidades" title="Fique a Par das Novidades" subtitle="" crumbs={[{ label: 'Notícias' }]} />
        <div className="py-20 text-center text-green-800/60">Nenhuma notícia disponível.</div>
      </>
    );
  }

  const [featured, ...rest] = news;

  return (
    <>
      <PageHero
        eyebrow="Notícias & Publicidades"
        title="Fique a Par das Novidades"
        subtitle="Últimas notícias sobre agricultura sustentável em Moçambique e as nossas campanhas."
        crumbs={[{ label: 'Notícias' }]}
      />

      <section className="bg-cream-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} mb-12`}>
            <Link to={`/noticias/${featured.slug}`} className="group grid overflow-hidden rounded-3xl bg-white ring-1 ring-green-100 transition-all hover:shadow-xl hover:ring-green-300 lg:grid-cols-2">
              <div className="relative h-72 overflow-hidden lg:h-full">
                <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/30 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-green-700 px-4 py-1.5 text-xs font-600 uppercase tracking-wider text-cream-50">{featured.tag}</span>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="flex items-center gap-4 text-xs text-green-800/40">
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {featured.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.read_time}</span>
                </div>
                <h2 className="mt-4 font-serif text-2xl font-600 leading-tight text-green-900 sm:text-3xl">{featured.title}</h2>
                <p className="mt-4 text-base font-300 leading-relaxed text-green-800/60">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-600 text-green-600 transition-colors group-hover:text-green-900">
                  Ler Artigo Completo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item, i) => (
              <Link key={item.slug} to={`/noticias/${item.slug}`} className={`reveal reveal-delay-${(i % 3) + 1} ${isVisible ? 'is-visible' : ''} group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-green-100 transition-all duration-500 hover:shadow-xl hover:ring-green-300`}>
                <div className="relative h-52 overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-green-700 px-3 py-1 text-xs font-600 uppercase tracking-wider text-cream-50">{item.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-green-800/40">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {item.read_time}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-600 text-green-900">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm font-300 leading-relaxed text-green-800/60">{item.excerpt}</p>
                  {item.is_download ? (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-green-600 transition-colors group-hover:text-green-900">
                      <Download className="h-4 w-4" /> Ver & Descarregar
                    </span>
                  ) : (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-green-600 transition-colors group-hover:text-green-900">
                      Ler Mais <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Quer receber as nossas novidades?" subtitle="Fale connosco pelo WhatsApp e seja o primeiro a saber das nossas promoções." />
    </>
  );
}
