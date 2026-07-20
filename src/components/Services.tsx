import { ShoppingBag, Home, BarChart3, Droplets, Megaphone, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../lib/hooks';

const imgBase = 'https://raw.githubusercontent.com/eixyz/eloviada_projects/main/agro/images';

const services = [
  {
    icon: ShoppingBag,
    title: 'Insumos & Equipamentos',
    short: 'Sementes, adubos, fitossanitários e equipamentos com apoio técnico.',
    description:
      'Gama completa de insumos e equipamentos agrícolas para produtores de todos os tamanhos. Marcas reconhecidas, apoio técnico no pré e pós-venda.',
    features: [
      'Sementes certificadas (>90% germinação)',
      'Fertilizantes & fitossanitários homologados',
      'Equipamentos: grades, arados, pulverizadores',
      'Fornecimento a retalho e por grosso',
    ],
    image: '/images/equipments/Adubos1.jpg',
  },
  {
    icon: Home,
    title: 'Estufas & Sombrite',
    short: 'Projecto e montagem de estufas e sombrite para todo o ano.',
    description:
      'Estruturas de estufa e sombrite permitem controlar as condições climáticas, proteger as culturas e estender o período de produção ao longo do ano.',
    features: [
      'Estufa tipo túnel para hortícolas',
      'Sombrite em diferentes densidades (30-75%)',
      'Sistemas hidropónicos integrados',
      'Instalação com irrigação integrada',
    ],
    image: '/images/equipments/Grade_Disponivel.jpg',
  },
  {
    icon: BarChart3,
    title: 'Produção & Mercado',
    short: 'Apoio técnico e comercial do planeamento à venda.',
    description:
      'Apoio aos produtores em todas as etapas do ciclo produtivo — desde o planeamento da safra até à venda do produto final — garantindo rentabilidade e acesso a mercados.',
    features: [
      'Planeamento de safra e rotação de culturas',
      'Boas Práticas Agrícolas (BPA)',
      'Ligação a compradores institucionais',
      'Logística e distribuição coordenada',
    ],
    image: `${imgBase}/market/Cultura_de_Milho_campo_da_Seminal_Agricola.jpg`,
  },
  {
    icon: Droplets,
    title: 'Sistemas de Irrigação',
    short: 'Projecto, fornecimento e instalação com energia solar.',
    description:
      'Projectamos, fornecemos e instalamos sistemas de irrigação completos, adaptados ao tipo de cultura, topografia e disponibilidade de água. Trabalhamos com energias renováveis.',
    features: [
      'Gota-a-gota, aspersão e canhão hidráulico',
      'Pivot central para grandes áreas',
      'Bombas solares Future Pump',
      'Reservatórios e captação de água da chuva',
    ],
    image: '/images/irrigation/Kit_de_Irrigacao_por_Gota_a_gota1.jpg',
  },
  {
    icon: Megaphone,
    title: 'Publicidade',
    short: 'Visibilidade e promoção dos seus produtos agrícolas.',
    description:
      'Serviços de publicidade e promoção para produtores e empresas do sector agrícola. Ajudamos a dar visibilidade aos seus produtos e serviços no mercado.',
    features: [
      'Panfletos e materiais promocionais',
      'Campanhas de marketing agrícola',
      'Promoção de safra e produtos sazonais',
      'Parcerias com meios de comunicação',
    ],
    image: '/images/adds/Panfeto_dos_servicos.jpg',
  },
];

const waBase = 'https://wa.me/258865602805?text=Olá,%20preciso%20de%20';

export default function Services() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="servicos" className="bg-cream-100 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} mx-auto mb-16 max-w-2xl text-center`}>
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-forest-400" />
            <span className="text-sm font-600 uppercase tracking-[0.2em] text-forest-600">O Que Fazemos</span>
            <span className="h-px w-10 bg-forest-400" />
          </div>
          <h2 className="font-serif text-4xl font-400 leading-tight text-forest-900 sm:text-5xl">
            Nossos <span className="font-600 italic text-forest-600">Serviços</span>
          </h2>
          <p className="mt-6 text-lg font-300 leading-relaxed text-forest-800/70">
            Soluções completas de agronegócio — do projecto à entrega final.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service, i) => (
            <article
              key={service.title}
              className={`reveal reveal-delay-${(i % 2) + 1} ${isVisible ? 'is-visible' : ''} group relative overflow-hidden rounded-3xl bg-white ring-1 ring-forest-100 transition-all duration-500 hover:shadow-2xl hover:ring-forest-300`}
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative h-56 overflow-hidden sm:h-auto sm:w-2/5">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent sm:bg-gradient-to-r" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-100 text-forest-700 transition-all duration-300 group-hover:bg-forest-700 group-hover:text-cream-50">
                      <service.icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <h3 className="font-serif text-xl font-600 text-forest-900">{service.title}</h3>
                  </div>
                  <p className="text-sm font-300 leading-relaxed text-forest-800/70">{service.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm font-400 text-forest-800/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-forest-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`${waBase}${encodeURIComponent(service.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-600 text-forest-600 transition-colors hover:text-forest-900"
                  >
                    Solicitar Orçamento
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}

          {/* CTA card */}
          <div className={`reveal reveal-delay-3 ${isVisible ? 'is-visible' : ''} flex flex-col items-center justify-center rounded-3xl bg-forest-800 p-10 text-center text-cream-50`}>
            <h3 className="font-serif text-2xl font-600">Precisa de algo específico?</h3>
            <p className="mt-3 text-base font-300 text-cream-100/70">
              Fale connosco e receba uma proposta personalizada.
            </p>
            <a
              href="https://wa.me/258865602805?text=Olá,%20gostaria%20de%20uma%20proposta%20personalizada."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 rounded-full bg-cream-50 px-8 py-3 text-sm font-600 text-forest-800 transition-all hover:bg-cream-100 hover:shadow-lg"
            >
              Chate Conosco
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
