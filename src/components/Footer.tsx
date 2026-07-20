import { Link } from 'react-router-dom';
import { company, products, services } from '../lib/data';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Footer() {
  return (
    <>
      <footer className="bg-green-950 text-cream-100/70">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="font-serif text-xl font-700 text-cream-50">
                SEMINAL AGRÍCOLA
                <small className="block text-xs font-400 text-cream-100/50">{company.subtitle}</small>
              </div>
              <p className="mt-4 text-sm leading-relaxed">
                Empresa de agronegócio dedicada à inovação tecnológica e à produtividade agrícola, pecuária e aquacultural em Moçambique.
              </p>
              <div className="mt-6 flex gap-3">
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-green-800 text-cream-50 transition-colors hover:bg-gold-500 hover:text-green-950" title="WhatsApp">
                  <WhatsAppIcon />
                </a>
                <a href={`mailto:${company.email}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-green-800 text-cream-50 transition-colors hover:bg-gold-500 hover:text-green-950" title="Email">✉</a>
                <a href={`tel:${company.phoneRaw}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-green-800 text-cream-50 transition-colors hover:bg-gold-500 hover:text-green-950" title="Telefone">📞</a>
              </div>
            </div>

            <div>
              <h5 className="mb-4 font-600 text-cream-50">Produtos</h5>
              <div className="space-y-2.5">
                {products.map((p) => (
                  <Link key={p.slug} to={`/produtos/${p.slug}`} className="block text-sm transition-colors hover:text-gold-400">
                    {p.badge} {p.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h5 className="mb-4 font-600 text-cream-50">Serviços</h5>
              <div className="space-y-2.5">
                {services.map((s) => (
                  <Link key={s.slug} to={`/servicos/${s.slug}`} className="block text-sm transition-colors hover:text-gold-400">
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h5 className="mb-4 font-600 text-cream-50">Empresa</h5>
              <div className="space-y-2.5">
                <Link to="/sobre" className="block text-sm transition-colors hover:text-gold-400">Sobre Nós</Link>
                <Link to="/noticias" className="block text-sm transition-colors hover:text-gold-400">Notícias</Link>
                <Link to="/contacto" className="block text-sm transition-colors hover:text-gold-400">Contacto</Link>
                <a href={`tel:${company.phoneRaw}`} className="block text-sm transition-colors hover:text-gold-400">{company.phone}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-green-900">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-cream-100/50 sm:flex-row">
            <span>© 2026 {company.name} · NUIT: {company.nuit} · {company.location}</span>
            <a href={`mailto:${company.email}`} className="transition-colors hover:text-gold-400">{company.email}</a>
          </div>
        </div>
      </footer>

      <a href={company.whatsappGreeting} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-cream-50 shadow-lg transition-all hover:scale-110 hover:bg-green-700" title="Chate Conosco" aria-label="Chate Conosco no WhatsApp">
        <WhatsAppIcon />
      </a>
    </>
  );
}
