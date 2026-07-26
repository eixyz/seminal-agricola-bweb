import { Link } from 'react-router-dom';
import { ArrowUpRight, ShoppingBag, Home, BarChart3, Droplets, Megaphone, type LucideIcon } from 'lucide-react';
import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import { services } from '../lib/data';
import { useReveal } from '../lib/hooks';

const iconMap: Record<string, LucideIcon> = {
  ShoppingBag, Home, BarChart3, Droplets, Megaphone,
};

export default function ServicosPage() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

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
          <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
            {services.map((s, i) => {
              const Icon = iconMap[s.icon];
              return (
                <Link key={s.slug} to={`/servicos/${s.slug}`} className={`reveal reveal-delay-${(i % 3) + 1} ${isVisible ? 'is-visible' : ''} group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-green-100 transition-all duration-500 hover:shadow-xl hover:ring-green-300`}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={s.image} alt={s.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-3">
                      {Icon && (
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700 transition-all group-hover:bg-green-700 group-hover:text-cream-50">
                          <Icon className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                      )}
                      <h3 className="font-serif text-lg font-600 text-green-900">{s.title}</h3>
                    </div>
                    <p className="flex-1 text-sm font-300 leading-relaxed text-green-800/60">{s.short}</p>
                    <ul className="mt-4 space-y-1.5">
                      {s.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-green-800/60">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-600 text-green-600 transition-colors group-hover:text-green-900">
                      Saber Mais <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* CTA card fills the last grid cell */}
            <div className={`reveal reveal-delay-3 ${isVisible ? 'is-visible' : ''} flex flex-col items-center justify-center rounded-3xl bg-green-800 p-8 text-center text-cream-50`}>
              <h3 className="font-serif text-xl font-600">Precisa de algo específico?</h3>
              <p className="mt-3 text-sm font-300 text-cream-100/70">Fale connosco e receba uma proposta personalizada.</p>
              <a href="https://wa.me/258865602805?text=Olá,%20gostaria%20de%20uma%20proposta%20personalizada." target="_blank" rel="noopener noreferrer" className="mt-6 rounded-full bg-cream-50 px-7 py-3 text-sm font-600 text-green-800 transition-all hover:bg-cream-100 hover:shadow-lg">
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
