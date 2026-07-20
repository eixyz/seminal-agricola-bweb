import { Download, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import { news, company } from '../lib/data';

export default function NoticiasPage() {
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {news.map((item) => (
              <article key={item.title} className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-green-100 transition-all duration-500 hover:shadow-xl hover:ring-green-300">
                <div className="relative h-52 overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-green-700 px-3 py-1 text-xs font-600 uppercase tracking-wider text-cream-50">{item.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-lg font-600 text-green-900">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm font-300 leading-relaxed text-green-800/60">{item.excerpt}</p>
                  {item.isDownload ? (
                    <a href={item.image} download className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-green-600 transition-colors hover:text-green-900">
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  ) : (
                    <a href="#noticias" className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-green-600 transition-colors hover:text-green-900">
                      Ler Mais <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Quer receber as nossas novidades?" subtitle="Fale connosco pelo WhatsApp e seja o primeiro a saber das nossas promoções." />
    </>
  );
}
