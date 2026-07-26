import { Target, Eye, Gem, MapPin, Phone, Mail, FileText } from 'lucide-react';
import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import { company, partners } from '../lib/data';
import { useReveal } from '../lib/hooks';

const mvv = [
  { icon: Target, title: 'Missão', text: 'Ser o trampolim para o sector de agronegócio — apoiando produtores, empresas e comunidades a crescer com tecnologia, eficiência e sustentabilidade.' },
  { icon: Eye, title: 'Visão', text: 'Investir, apostar, inovar e assistir em tecnologias da cadeia do agronegócio — tornando-nos referência em agricultura moderna em Moçambique.' },
  { icon: Gem, title: 'Valores', items: ['Proactividade', 'Coragem', 'Inovação', 'Responsabilidade'] },
];

const companyInfo = [
  { icon: FileText, label: 'Denominação', value: company.name },
  { icon: MapPin, label: 'Localização', value: company.location },
  // { icon: FileText, label: 'NUIT', value: company.nuit },
  { icon: Phone, label: 'Telefone', value: company.phone, href: `tel:${company.phoneRaw}` },
  { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
];

export default function SobrePage() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <>
      <PageHero
        eyebrow="A Nossa História"
        title="Sobre a SEMINAL AGRÍCOLA"
        subtitle="Conheça quem somos, o que nos move e como transformamos o agronegócio em Moçambique."
        crumbs={[{ label: 'Sobre' }]}
      />

      {/* Intro */}
      <section className="bg-cream-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} grid items-center gap-16 lg:grid-cols-2`}>
            <div className="relative">
              <img src="/images/about/logo_do_Seminal_Agricola.png" alt="Logo Seminal Agrícola" className="rounded-3xl object-cover shadow-2xl shadow-green-900/20" />
              <div className="absolute -left-6 -top-6 -z-10 h-32 w-32 rounded-3xl bg-green-200/60" />
            </div>
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-green-400" />
                <span className="text-sm font-600 uppercase tracking-[0.2em] text-green-600">Empresa</span>
              </div>
              <h2 className="font-serif text-3xl font-600 leading-tight text-green-900 sm:text-4xl">
                {company.shortName}, SU, LDA
              </h2>
              <div className="mt-6 space-y-4 text-base font-300 leading-relaxed text-green-800/80">
                <p>
                  A <strong>SEMINAL AGRICOLA, SU, LDA</strong> é uma empresa de agronegócio dedicada à inovação tecnológica e à produtividade agrícola, pecuária e aquacultural. O nosso escopo abrange consultoria e serviços especializados: assistência técnica, sistemas de produção e de irrigação, reservatórios de água, montagem de estufas e sombrite, fornecimento de insumos e equipamentos, mentoria de agronegócio e pesquisas.
                </p>
                <p>
                  Trabalhamos lado a lado com pequenos e médios produtores para melhorar rendimento, qualidade e ligação ao mercado — contribuindo para o fortalecimento da cadeia alimentar local e o desenvolvimento sustentável de Moçambique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-cream-100 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-600 uppercase tracking-[0.2em] text-green-600">Identidade</span>
            <h2 className="mt-2 font-serif text-3xl font-600 text-green-900 sm:text-4xl">Missão, Visão & Valores</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {mvv.map((item) => (
              <div key={item.title} className="group rounded-3xl bg-cream-50 p-8 ring-1 ring-green-100 transition-all hover:ring-green-300 hover:shadow-xl">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700 transition-all group-hover:bg-green-700 group-hover:text-cream-50">
                  <item.icon className="h-7 w-7" strokeWidth={1.6} />
                </div>
                <h3 className="mb-3 font-serif text-xl font-600 text-green-900">{item.title}</h3>
                {item.text ? (
                  <p className="text-base font-300 leading-relaxed text-green-800/70">{item.text}</p>
                ) : (
                  <ul className="space-y-2">
                    {item.items!.map((val) => (
                      <li key={val} className="flex items-center gap-2 text-base text-green-800/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        {val}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company data */}
      <section className="bg-cream-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-600 uppercase tracking-[0.2em] text-green-600">Identificação</span>
            <h2 className="mt-2 font-serif text-3xl font-600 text-green-900">Dados da Empresa</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companyInfo.map((info) => (
              <div key={info.label} className="rounded-2xl bg-white p-6 ring-1 ring-green-100 transition-all hover:shadow-lg">
                <info.icon className="mb-3 h-6 w-6 text-green-600" strokeWidth={1.8} />
                <p className="text-xs font-500 uppercase tracking-wider text-green-600/60">{info.label}</p>
                {info.href ? (
                  <a href={info.href} className="mt-1 block break-all font-600 text-green-900 transition-colors hover:text-green-600">{info.value}</a>
                ) : (
                  <p className="mt-1 font-600 text-green-900">{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-cream-100 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-sm font-600 uppercase tracking-[0.2em] text-green-600">Rede</span>
            <h2 className="mt-2 font-serif text-3xl font-600 text-green-900">Nossos Parceiros</h2>
            <p className="mt-4 text-base font-300 text-green-800/60">Colaboramos com organizações que partilham o nosso compromisso com qualidade e sustentabilidade.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {partners.map((p) => (
              <div key={p.name} className="flex h-24 w-40 items-center justify-center rounded-2xl bg-cream-50 p-6 ring-1 ring-green-100 transition-all hover:shadow-lg">
                <img src={p.src} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Quer trabalhar connosco?" subtitle="Fale connosco e descubra como podemos ajudar o seu projecto agrícola a crescer." />
    </>
  );
}
