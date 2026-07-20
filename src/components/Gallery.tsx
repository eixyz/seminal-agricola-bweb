import { useReveal } from '../lib/hooks';

const imgBase = 'https://raw.githubusercontent.com/eixyz/eloviada_projects/main/agro/images';

const images = [
  { src: `${imgBase}/market/Colheita_de_Milho_Campo_da_Seminal_Agricola.jpg`, alt: 'Colheita de Milho', span: 'lg:row-span-2' },
  { src: `${imgBase}/market/Batata_roxia_e_branca_para_o_mercado.jpg`, alt: 'Batata roxa e branca', span: '' },
  { src: `${imgBase}/irrigation/Sistema_de_Irrigacao_por_aspersores1.jpg`, alt: 'Sistema de Irrigação por aspersores', span: '' },
  { src: `${imgBase}/sombrite/montagem_de_sombrite1.jpg`, alt: 'Montagem de sombrite', span: 'lg:row-span-2' },
  { src: `${imgBase}/market/Cultura_de_pepino1.jpg`, alt: 'Cultura de pepino', span: '' },
  { src: `${imgBase}/market/Cultura_de_Batata_Doce_Campo_da_Seminal_Agricola.jpg`, alt: 'Cultura de Batata-doce', span: '' },
  { src: `${imgBase}/market/Colheita_de_Beterraba1.jpg`, alt: 'Colheita de Beterraba', span: '' },
  { src: `${imgBase}/equipments/Sementes_e_equipamentos2.jpg`, alt: 'Sementes e equipamentos', span: '' },
];

export default function Gallery() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="galeria" className="bg-cream-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto mb-16 max-w-2xl text-center`}>
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-forest-400" />
            <span className="text-sm font-600 uppercase tracking-[0.2em] text-forest-600">Vida no Campo</span>
            <span className="h-px w-10 bg-forest-400" />
          </div>
          <h2 className="font-serif text-4xl font-400 leading-tight text-forest-900 sm:text-5xl">
            Momentos do <span className="font-600 italic text-forest-600">nosso trabalho</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:auto-rows-[220px]">
          {images.map((img, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 4) + 1} ${isVisible ? 'is-visible' : ''} group relative overflow-hidden rounded-2xl ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-forest-950/0 transition-colors duration-300 group-hover:bg-forest-950/30" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-500 text-cream-50">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
