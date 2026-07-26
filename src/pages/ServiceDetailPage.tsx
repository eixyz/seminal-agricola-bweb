import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Home, BarChart3, Droplets, Megaphone, type LucideIcon } from 'lucide-react';
import PageHero from '../components/PageHero';
import CtaBanner from '../components/CtaBanner';
import { fetchServices, fetchService } from '../lib/content';
import { company } from '../lib/data';
import type { Service } from '../lib/types';

const iconMap: Record<string, LucideIcon> = {
  ShoppingBag, Home, BarChart3, Droplets, Megaphone,
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [otherServices, setOtherServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchService(slug ?? ''), fetchServices()])
      .then(([s, all]) => {
        setService(s);
        setOtherServices(all.filter((x) => x.slug !== slug));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <PageHero eyebrow="Serviço" title="A carregar..." subtitle="" crumbs={[{ label: 'Serviços', to: '/servicos' }, { label: '...' }]} />
        <div className="py-20 text-center text-green-800/60">A carregar serviço...</div>
      </>
    );
  }

  if (!service) {
    return (
      <>
        <PageHero eyebrow="Serviço" title="Serviço não encontrado" subtitle="O serviço que procura não existe." crumbs={[{ label: 'Serviços', to: '/servicos' }, { label: 'N/A' }]} />
        <div className="py-20 text-center">
          <Link to="/servicos" className="text-green-600 hover:text-green-900">← Voltar aos Serviços</Link>
        </div>
      </>
    );
  }

  const Icon = iconMap[service.icon];

  return (
    <>
      <PageHero
        eyebrow="Serviço"
        title={service.title}
        subtitle={service.short}
        crumbs={[{ label: 'Serviços', to: '/servicos' }, { label: service.title }]}
      />

      <section className="bg-cream-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Content */}
            <div className="lg:col-span-2">
              <img src={service.image} alt={service.title} className="aspect-[16/9] w-full rounded-3xl object-cover shadow-lg" />

              <div className="mt-8">
                <div className="mb-5 flex items-center gap-3">
                  {Icon && (
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                      <Icon className="h-7 w-7" strokeWidth={1.6} />
                    </span>
                  )}
                  <h2 className="font-serif text-2xl font-600 text-green-900">{service.title}</h2>
                </div>
                <p className="text-base font-300 leading-relaxed text-green-800/70">{service.description}</p>

                {service.sections?.map((sec) => (
                  <div key={sec.heading} className="mt-8">
                    <h3 className="font-serif text-xl font-600 text-green-900">{sec.heading}</h3>
                    {sec.body && <p className="mt-3 text-sm font-300 leading-relaxed text-green-800/70">{sec.body}</p>}
                    {sec.list && (
                      <ul className="mt-3 space-y-2">
                        {sec.list.map((item) => (
                          <li key={item.title} className="text-sm text-green-800/70">
                            <strong className="text-green-800">{item.title}</strong> — {item.desc}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <div className="mt-8">
                  <h3 className="font-serif text-xl font-600 text-green-900">O que Incluímos</h3>
                  <ul className="mt-4 space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-green-800/70">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Gallery */}
              {service.gallery && service.gallery.length > 0 && (
                <div className="mt-10">
                  <h3 className="mb-4 font-serif text-xl font-600 text-green-900">Galeria</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {service.gallery.map((img) => (
                      <div key={img} className="group overflow-hidden rounded-2xl">
                        <img src={img} alt="" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-6 ring-1 ring-green-100">
                <h4 className="font-600 text-green-900">Solicitar Orçamento</h4>
                <p className="mt-1 text-sm text-green-800/50">Resposta rápida via WhatsApp.</p>
                <div className="mt-4 space-y-2">
                  <a href={`https://wa.me/258865602805?text=Olá,%20preciso%20de%20${encodeURIComponent(service.title)}.`} target="_blank" rel="noopener noreferrer" className="block rounded-full bg-green-600 px-5 py-3 text-center text-sm font-600 text-cream-50 transition-all hover:bg-green-500">
                    💬 WhatsApp
                  </a>
                  <Link to="/contacto" className="block rounded-full border border-green-300 px-5 py-3 text-center text-sm font-600 text-green-700 transition-all hover:bg-green-50">
                    ✉️ Contacto
                  </Link>
                </div>
                <div className="mt-4 border-t border-green-100 pt-4">
                  <a href={`tel:${company.phoneRaw}`} className="text-sm text-green-700">📞 {company.phone}</a>
                </div>
              </div>

              <div className="rounded-3xl bg-green-50 p-6 ring-1 ring-green-100">
                <h4 className="font-600 text-green-900">Outros Serviços</h4>
                <div className="mt-3 space-y-2">
                  {otherServices.map((s) => (
                    <Link key={s.slug} to={`/servicos/${s.slug}`} className="block rounded-xl px-3 py-2 text-sm text-green-800/70 transition-colors hover:bg-white hover:text-green-700">
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner title={`Pronto para começar com ${service.title}?`} subtitle="Fale connosco e receba uma proposta personalizada." />
    </>
  );
}
