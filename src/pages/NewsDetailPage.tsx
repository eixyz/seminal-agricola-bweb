import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Download, Share2 } from 'lucide-react';
import CtaBanner from '../components/CtaBanner';
import { fetchNewsArticle, fetchNews } from '../lib/content';
import type { NewsArticle } from '../lib/types';

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [related, setRelated] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([fetchNewsArticle(slug ?? ''), fetchNews()])
      .then(([a, all]) => {
        setArticle(a);
        setRelated(all.filter((n) => n.slug !== slug).slice(0, 3));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-cream-50 px-6">
        <p className="text-green-800/60">A carregar artigo...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-cream-50 px-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-600 text-green-900">Artigo não encontrado</h1>
          <p className="mt-4 text-green-800/60">O artigo que procura não existe ou foi removido.</p>
          <Link to="/noticias" className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-600 text-cream-50 transition-all hover:bg-green-500">
            <ArrowLeft className="h-4 w-4" /> Voltar a Notícias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero with image */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/60 to-green-950/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-4xl px-6 pb-12">
            <Link to="/noticias" className="mb-4 inline-flex items-center gap-1.5 text-sm font-600 text-cream-100/80 transition-colors hover:text-cream-50">
              <ArrowLeft className="h-4 w-4" /> Notícias
            </Link>
            <span className="inline-block rounded-full bg-green-600 px-3 py-1 text-xs font-600 uppercase tracking-wider text-cream-50">{article.tag}</span>
            <h1 className="mt-4 font-serif text-3xl font-600 leading-tight text-cream-50 sm:text-5xl">{article.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-cream-100/70">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {article.date}</span>
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {article.author}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {article.read_time}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-cream-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          {/* Excerpt / lead */}
          <p className="mb-10 border-l-4 border-green-500 pl-6 font-serif text-xl font-400 italic leading-relaxed text-green-800/80">
            {article.excerpt}
          </p>

          {/* Content sections */}
          <div className="space-y-10">
            {article.content.map((section, i) => (
              <div key={i}>
                <h2 className="mb-3 font-serif text-2xl font-600 text-green-900">{section.heading}</h2>
                <p className="text-base font-300 leading-[1.8] text-green-800/70">{section.body}</p>
              </div>
            ))}
          </div>

          {/* Gallery */}
          {article.gallery && article.gallery.length > 0 && (
            <div className="mt-12">
              <h3 className="mb-5 font-serif text-xl font-600 text-green-900">Galeria</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {article.gallery.map((img, i) => (
                  <div key={i} className="group overflow-hidden rounded-2xl ring-1 ring-green-100">
                    <img src={img} alt={`${article.title} — imagem ${i + 1}`} className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Download / Share actions */}
          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-green-100 pt-8">
            {article.is_download && (
              <a href={article.image} download className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-600 text-cream-50 transition-all hover:bg-green-500 hover:shadow-lg">
                <Download className="h-4 w-4" /> Descarregar Panfleto
              </a>
            )}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: article.title, url: window.location.href });
                } else {
                  navigator.clipboard?.writeText(window.location.href);
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border border-green-200 px-6 py-3 text-sm font-600 text-green-800 transition-all hover:bg-green-50"
            >
              <Share2 className="h-4 w-4" /> Partilhar
            </button>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-cream-100 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-8 font-serif text-2xl font-600 text-green-900">Outras Notícias</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} to={`/noticias/${item.slug}`} className="group flex flex-col overflow-hidden rounded-3xl bg-cream-50 ring-1 ring-green-100 transition-all hover:shadow-xl hover:ring-green-300">
                  <div className="relative h-44 overflow-hidden">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-green-700 px-3 py-1 text-xs font-600 uppercase tracking-wider text-cream-50">{item.tag}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs text-green-800/40">{item.date}</p>
                    <h3 className="mt-1 font-serif text-base font-600 text-green-900">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm font-300 text-green-800/60">{item.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-green-600 transition-colors group-hover:text-green-900">
                      Ler Mais <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner title="Tem perguntas sobre este artigo?" subtitle="Fale connosco e teremos todo o gosto em ajudar." />
    </>
  );
}
