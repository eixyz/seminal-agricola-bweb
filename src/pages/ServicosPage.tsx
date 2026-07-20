import { Link } from 'react-router-dom';
import { ArrowUpRight, ShoppingBag, Home, BarChart3, Droplets, Megaphone, type LucideIcon } from 'lucide-react';
import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import { services } from '../lib/data';

const iconMap: Record<string, LucideIcon> = {
  ShoppingBag, Home, BarChart3, Droplets, Megaphone,
};

export default function ServicosPage() {
  return (
    <>
      <PageHero
        eyebrow="O Que Fazemos"
        title="Serviços"
        subtitle="Visite os diferentes serviços que oferecemos — do projecto à entrega final."
        crumbs={[{ label: 'Serviços' }]}
      />

      <section className="bg-cream-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <Link key={s.slug} to={`/servicos/${s.slug}`} className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-green-100 transition-all duration-500 hover:shadow-xl hover:ring-green-300 sm:flex-row">
                  <div className="relative h-56 overflow-hidden sm:h-auto sm:w-2/5">
                    <img src={s.image} alt={s.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 to-transparent sm:bg-gradient-to-r" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                    <div className="mb-4 flex items-center gap-3">
                      {Icon && (
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700 transition-all group-hover:bg-green-700 group-hover:text-cream-50">
                          <Icon className="h-6 w-6" strokeWidth={1.8} />
                        </span>
                      )}
                      <h3 className="font-serif text-xl font-600 text-green-900">{s.title}</h3>
                    </div>
                    <p className="text-sm font-300 leading-relaxed text-green-800/70">{s.description}</p>
                    <ul className="mt-4 space-y-1.5">
                      {s.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-green-800/60">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-600 text-green-600 transition-colors group-hover:text-green-900">
                      Saber Mais <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* CTA card */}
            <div className="flex flex-col items-center justify-center rounded-3xl bg-green-800 p-10 text-center text-cream-50">
              <h3 className="font-serif text-2xl font-600">Precisa de algo específico?</h3>
              <p className="mt-3 text-base font-300 text-cream-100/70">Fale connosco e receba uma proposta personalizada.</p>
              <a href="https://wa.me/258865602805?text=Olá,%20gostaria%20de%20uma%20proposta%20personalizada." target="_blank" rel="noopener noreferrer" className="mt-6 rounded-full bg-cream-50 px-8 py-3 text-sm font-600 text-green-800 transition-all hover:bg-cream-100 hover:shadow-lg">
                Chate Conosco
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner title="Pronto para começar?" subtitle="Fale connosco e receba uma proposta personalizada para o seu projecto." />
    </>
  );
}
