import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '../lib/hooks';

const imgBase = 'https://raw.githubusercontent.com/eixyz/eloviada_projects/main/agro/images';

const products = [
  {
    name: 'Milho',
    badge: '🌽 Cereal',
    description:
      'Milho seco de produção própria, colhido e processado com rigoroso controlo de qualidade. Disponível a granel ou em embalagens de 5 a 50 kg, adequado para consumo humano e ração animal.',
    features: [
      'Granel ou embalado (5, 10, 25 e 50 kg)',
      'Certificado de origem disponível',
      'Rastreabilidade completa desde o campo',
      'Entrega nacional — retalho, grossistas e hotéis',
    ],
    image: `${imgBase}/market/Colheita_de_Milho_Campo_da_Seminal_Agricola.jpg`,
    price: 'Sob consulta',
  },
  {
    name: 'Arroz & Cereais',
    badge: '🌾 Cereais',
    description:
      'Arroz e outros cereais de produção própria, com garantia de qualidade e origem. Disponíveis em diferentes embalagens conforme a necessidade do cliente.',
    features: [
      'Arroz polido e integral',
      'Outros cereais disponíveis',
      'Entrega nacional',
      'Opções de embalagem flexíveis',
    ],
    image: `${imgBase}/market/Campo_de_Producao_de_Milho_da_Seminal_Agricola.jpg`,
    price: 'Sob consulta',
  },
  {
    name: 'Feijão',
    badge: '🫘 Leguminosa',
    description:
      'Feijão de qualidade superior, seleccionado e embalado com cuidado. Rico em proteínas e ideal para consumo familiar ou institucional.',
    features: [
      'Diferentes variedades',
      'Seleção e calibragem rigorosa',
      'Embalagens de 1 a 50 kg',
      'Disponível a granel',
    ],
    image: `${imgBase}/market/Cultura_de_Beterraba_campo_de_producao_da_Seminal_Agricola.jpg`,
    price: 'Sob consulta',
  },
  {
    name: 'Batata-doce',
    badge: '🥔 Tuber',
    description:
      'Batata-doce de produção própria, colhida no ponto ideal de maturação. Disponível em diferentes variedades — roxa e branca — com entrega nacional.',
    features: [
      'Variedades roxa e branca',
      'Colheita no ponto de maturação',
      'Entrega por encomenda',
      'Qualidade de mercado garantida',
    ],
    image: `${imgBase}/market/Batata_roxa_e_branca_para_o_mercado.jpg`,
    price: 'Sob consulta',
  },
  {
    name: 'Sementes',
    badge: '🌱 Insumo',
    description:
      'Sementes certificadas e melhoradas, adaptadas às condições locais. Alta taxa de germinação (>90%) para milho, feijão, hortícolas e outras culturas.',
    features: [
      'Variedades melhoradas e OPV',
      'Germinação >90%',
      'Certificadas e rastreadas',
      'Apoio técnico incluído',
    ],
    image: '/images/equipments/Sementes_e_equipamentos.jpg',
    price: 'Sob consulta',
  },
];

const waBase = 'https://wa.me/258865602805?text=Olá,%20quero%20orçamento%20para%20';

export default function Products() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="produtos" className="relative overflow-hidden bg-forest-950 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#67986c_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto mb-16 max-w-2xl text-center`}>
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-forest-400" />
            <span className="text-sm font-600 uppercase tracking-[0.2em] text-forest-300">Catálogo</span>
            <span className="h-px w-10 bg-forest-400" />
          </div>
          <h2 className="font-serif text-4xl font-400 leading-tight text-cream-50 sm:text-5xl">
            Os Nossos <span className="font-600 italic text-cream-300">Produtos</span>
          </h2>
          <p className="mt-6 text-lg font-300 leading-relaxed text-cream-100/70">
            Produção própria com rastreabilidade desde o campo, opções de embalagem e entrega nacional.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {products.map((product, i) => (
            <article
              key={product.name}
              className={`reveal reveal-delay-${(i % 2) + 1} ${isVisible ? 'is-visible' : ''} group flex flex-col overflow-hidden rounded-3xl bg-forest-900/50 ring-1 ring-forest-700/50 transition-all duration-500 hover:ring-forest-500/60 sm:flex-row`}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden sm:h-auto sm:w-2/5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent sm:bg-gradient-to-r" />
                <span className="absolute top-4 left-4 rounded-full bg-forest-700 px-3 py-1 text-xs font-600 uppercase tracking-wider text-cream-50">
                  {product.badge}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <h3 className="font-serif text-2xl font-600 text-cream-50">{product.name}</h3>
                <p className="mt-3 text-sm font-300 leading-relaxed text-cream-100/70">
                  {product.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-400 text-cream-100/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-forest-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between border-t border-forest-700/50 pt-5">
                  <div>
                    <span className="text-xs font-400 uppercase tracking-wider text-cream-100/40">Preço</span>
                    <p className="font-600 text-cream-200">{product.price}</p>
                  </div>
                  <a
                    href={`${waBase}${encodeURIComponent(product.name)} da Seminal Agrícola.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-1.5 rounded-full bg-forest-600 px-5 py-2.5 text-sm font-600 text-cream-50 transition-all hover:bg-forest-500"
                  >
                    Solicitar
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
