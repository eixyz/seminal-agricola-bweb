import { Download, ArrowRight } from 'lucide-react';
import { useReveal } from '../lib/hooks';

const imgBase = 'https://raw.githubusercontent.com/eixyz/eloviada_projects/main/agro/images';

const news = [
  {
    tag: 'Produção',
    title: 'Nova Safra de Milho 2026',
    excerpt:
      'Colheita recorde este ano, com foco em sustentabilidade e qualidade. Conheça as práticas agrícolas que tornaram possível este resultado.',
    image: `${imgBase}/market/Colheita_de_Milho_Campo_da_Seminal_Agricola.jpg`,
  },
  {
    tag: 'Irrigação',
    title: 'Novos Sistemas de Irrigação Solar',
    excerpt:
      'Implementamos bombas solares Future Pump em parceria com produtores locais, reduzindo custos e aumentando produtividade.',
    image: '/images/irrigation/Bomba_Solar_Future_Pump.jpg',
  },
  {
    tag: 'Infraestrutura',
    title: '10 Estufas Instaladas Este Ano',
    excerpt:
      'A Seminal Agrícola concluiu a instalação de 10 novas estruturas de sombrite e estufa para produtores parceiros na região de Maputo.',
    image: '/images/equipments/Grade_Disponivel.jpg',
  },
  {
    tag: 'Publicidade',
    title: 'Panfleto de Serviços 2026',
    excerpt:
      'Descarregue o nosso panfleto actualizado com todos os serviços disponíveis para a safra 2026. Inclui promoções especiais para novos clientes.',
    image: '/images/adds/Panfeto_dos_servicos.jpg',
    isDownload: true,
  },
];

export default function News() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="noticias" className="bg-cream-100 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto mb-16 max-w-2xl text-center`}>
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-forest-400" />
            <span className="text-sm font-600 uppercase tracking-[0.2em] text-forest-600">Notícias & Publicidades</span>
            <span className="h-px w-10 bg-forest-400" />
          </div>
          <h2 className="font-serif text-4xl font-400 leading-tight text-forest-900 sm:text-5xl">
            Fique a Par das <span className="font-600 italic text-forest-600">Novidades</span>
          </h2>
          <p className="mt-6 text-lg font-300 leading-relaxed text-forest-800/70">
            Últimas notícias sobre agricultura sustentável em Moçambique e as nossas campanhas.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {news.map((item, i) => (
            <article
              key={item.title}
              className={`reveal reveal-delay-${(i % 4) + 1} ${isVisible ? 'is-visible' : ''} group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-forest-100 transition-all duration-500 hover:shadow-2xl hover:ring-forest-300`}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-forest-700 px-3 py-1 text-xs font-600 uppercase tracking-wider text-cream-50">
                  {item.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-lg font-600 text-forest-900">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm font-300 leading-relaxed text-forest-800/60">
                  {item.excerpt}
                </p>
                {item.isDownload ? (
                  <a
                    href={item.image}
                    download
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-forest-600 transition-colors hover:text-forest-900"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                ) : (
                  <a
                    href="#noticias"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-forest-600 transition-colors hover:text-forest-900"
                  >
                    Ler Mais
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-forest-800 px-8 py-12 text-center text-cream-50 lg:px-16 lg:py-16">
          <h3 className="font-serif text-3xl font-400 sm:text-4xl">
            Quer receber as nossas <span className="font-600 italic text-cream-300">novidades?</span>
          </h3>
          <p className="mt-4 text-lg font-300 text-cream-100/70">
            Fale connosco pelo WhatsApp e seja o primeiro a saber das nossas promoções.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/258865602805?text=Olá,%20quero%20receber%20novidades%20da%20Seminal%20Agrícola."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cream-50 px-8 py-3.5 text-sm font-600 text-forest-800 transition-all hover:bg-cream-100 hover:shadow-lg"
            >
              Chate Conosco
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-cream-50/30 px-8 py-3.5 text-sm font-600 text-cream-50 transition-all hover:bg-cream-50/10"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
