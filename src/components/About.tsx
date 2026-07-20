import { Target, Eye, Gem, MapPin, Phone, Mail, FileText } from 'lucide-react';
import { useReveal } from '../lib/hooks';

const mvv = [
  {
    icon: Target,
    title: 'Missão',
    text: 'Ser o trampolim para o sector de agronegócio — apoiando produtores, empresas e comunidades a crescer com tecnologia, eficiência e sustentabilidade.',
  },
  {
    icon: Eye,
    title: 'Visão',
    text: 'Investir, apostar, inovar e assistir em tecnologias da cadeia do agronegócio — tornando-nos referência em agricultura moderna em Moçambique.',
  },
  {
    icon: Gem,
    title: 'Valores',
    items: ['Proactividade', 'Coragem', 'Inovação', 'Responsabilidade'],
  },
];

const companyInfo = [
  { icon: FileText, label: 'Denominação', value: 'SEMINAL AGRICOLA, SU, LDA' },
  { icon: MapPin, label: 'Localização', value: 'Maputo, Moçambique' },
  { icon: FileText, label: 'NUIT', value: '401811974' },
  { icon: Phone, label: 'Telefone', value: '+258 86 560 2805', href: 'tel:+258865602805' },
  { icon: Mail, label: 'Email', value: 'seminalagricola@gmail.com', href: 'mailto:seminalagricola@gmail.com' },
];

const partners = [
  { name: 'Agrodac LDA', src: 'https://raw.githubusercontent.com/eixyz/eloviada_projects/main/agro/images/partners/Agrodac_LDA.png' },
  { name: 'ETG Group', src: 'https://raw.githubusercontent.com/eixyz/eloviada_projects/main/agro/images/partners/etgGroup.webp' },
  { name: 'Mozatecnol', src: 'https://raw.githubusercontent.com/eixyz/eloviada_projects/main/agro/images/partners/MOZATECNOL_LOGO.png' },
];

export default function About() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="sobre" className="relative overflow-hidden bg-cream-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Intro */}
        <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} grid items-center gap-16 lg:grid-cols-2`}>
          <div className="relative">
            <img
              src="/images/about/logo_do_Seminal_Agricola.png"
              alt="Logo da Seminal Agrícola"
              className="rounded-3xl object-cover shadow-2xl shadow-forest-900/20"
            />
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-forest-800 px-6 py-4 text-cream-50 shadow-xl lg:-right-8">
              <p className="font-serif text-2xl font-600">NUIT</p>
              <p className="text-sm font-400 text-cream-200">401811974</p>
            </div>
            <div className="absolute -top-6 -left-6 -z-10 h-32 w-32 rounded-3xl bg-forest-200/60" />
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-forest-400" />
              <span className="text-sm font-600 uppercase tracking-[0.2em] text-forest-600">A Nossa História</span>
            </div>
            <h2 className="font-serif text-4xl font-400 leading-tight text-forest-900 sm:text-5xl">
              Sobre a <span className="font-600 italic text-forest-600">SEMINAL AGRÍCOLA</span>
            </h2>
            <div className="mt-6 space-y-4 text-lg font-300 leading-relaxed text-forest-800/80">
              <p>
                A <strong>SEMINAL AGRICOLA, SU, LDA</strong> é uma empresa de agronegócio dedicada à
                inovação tecnológica e à produtividade agrícola, pecuária e aquacultural. O nosso
                escopo abrange consultoria e serviços especializados: assistência técnica, sistemas
                de produção e de irrigação, reservatórios de água, montagem de estufas e sombrite,
                fornecimento de insumos e equipamentos, mentoria de agronegócio e pesquisas.
              </p>
              <p>
                Trabalhamos lado a lado com pequenos e médios produtores para melhorar rendimento,
                qualidade e ligação ao mercado — contribuindo para o fortalecimento da cadeia
                alimentar local e o desenvolvimento sustentável de Moçambique.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contacto" className="rounded-full bg-forest-700 px-6 py-3 text-sm font-600 text-cream-50 transition-all hover:bg-forest-800 hover:shadow-lg">
                Fale Connosco
              </a>
              <a href="#servicos" className="rounded-full border border-forest-300 px-6 py-3 text-sm font-600 text-forest-700 transition-all hover:bg-forest-50">
                Ver Serviços
              </a>
            </div>
          </div>
        </div>

        {/* Mission / Vision / Values */}
        <div className="mt-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-600 uppercase tracking-[0.2em] text-forest-600">Identidade</span>
            <h3 className="mt-2 font-serif text-3xl font-400 text-forest-900 sm:text-4xl">
              Missão, Visão & Valores
            </h3>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {mvv.map((item, i) => (
              <div
                key={item.title}
                className={`reveal reveal-delay-${i + 1} ${isVisible ? 'is-visible' : ''} group rounded-3xl bg-white p-8 ring-1 ring-forest-100 transition-all duration-300 hover:ring-forest-300 hover:shadow-xl`}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-100 text-forest-700 transition-all duration-300 group-hover:bg-forest-700 group-hover:text-cream-50">
                  <item.icon className="h-7 w-7" strokeWidth={1.6} />
                </div>
                <h4 className="mb-3 font-serif text-xl font-600 text-forest-900">{item.title}</h4>
                {item.text ? (
                  <p className="text-base font-300 leading-relaxed text-forest-800/70">{item.text}</p>
                ) : (
                  <ul className="space-y-2">
                    {item.items!.map((val) => (
                      <li key={val} className="flex items-center gap-2 text-base font-400 text-forest-800/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                        {val}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Company data */}
        <div className="mt-20">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-600 uppercase tracking-[0.2em] text-forest-600">Identificação</span>
            <h3 className="mt-2 font-serif text-3xl font-400 text-forest-900 sm:text-4xl">Dados da Empresa</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {companyInfo.map((info) => (
              <div key={info.label} className="rounded-2xl bg-white p-6 ring-1 ring-forest-100 transition-all hover:shadow-lg">
                <info.icon className="mb-3 h-6 w-6 text-forest-600" strokeWidth={1.8} />
                <p className="text-xs font-500 uppercase tracking-wider text-forest-600/60">{info.label}</p>
                {info.href ? (
                  <a href={info.href} className="mt-1 block font-600 text-forest-900 transition-colors hover:text-forest-600">
                    {info.value}
                  </a>
                ) : (
                  <p className="mt-1 font-600 text-forest-900">{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="mt-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-sm font-600 uppercase tracking-[0.2em] text-forest-600">Rede</span>
            <h3 className="mt-2 font-serif text-3xl font-400 text-forest-900 sm:text-4xl">Nossos Parceiros</h3>
            <p className="mt-4 text-base font-300 text-forest-800/60">
              Colaboramos com organizações que partilham o nosso compromisso com qualidade e sustentabilidade.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {partners.map((partner) => (
              <div key={partner.name} className="flex h-24 w-40 items-center justify-center rounded-2xl bg-white p-6 ring-1 ring-forest-100 transition-all hover:shadow-lg">
                <img src={partner.src} alt={partner.name} className="max-h-full max-w-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
