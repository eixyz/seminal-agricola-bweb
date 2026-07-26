import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import { company, products, services } from '../lib/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSub(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-600 tracking-wide transition-colors ${isActive ? 'text-green-700' : 'text-green-800/80 hover:text-green-700'}`;

  return (
    <>
      {/* Topbar */}
      <div className="hidden bg-green-950 text-cream-100/80 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-gold-400" />
            <span>{company.location}</span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`tel:${company.phoneRaw}`} className="flex items-center gap-1.5 transition-colors hover:text-gold-400">
              <Phone className="h-3.5 w-3.5" />
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 transition-colors hover:text-gold-400">
              <Mail className="h-3.5 w-3.5" />
              Email
            </a>
            <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-400">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <header className={`sticky top-0 z-50 bg-cream-50 transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/about/logo_do_Seminal_Agricola.png" alt="Seminal Agrícola" className="h-12 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            <NavLink to="/" className={navLinkClass} end>Início</NavLink>

            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-600 text-green-800/80 transition-colors hover:text-green-700">
                Produtos
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="w-64 rounded-2xl border border-green-100 bg-cream-50 p-2 shadow-xl">
                  {products.map((p) => (
                    <Link key={p.slug} to={`/produtos/${p.slug}`} className="block rounded-xl px-4 py-2.5 text-sm text-green-800/80 transition-colors hover:bg-green-50 hover:text-green-700">
                      {p.badge} {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-600 text-green-800/80 transition-colors hover:text-green-700">
                Serviços
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="w-64 rounded-2xl border border-green-100 bg-cream-50 p-2 shadow-xl">
                  {services.map((s) => (
                    <Link key={s.slug} to={`/servicos/${s.slug}`} className="block rounded-xl px-4 py-2.5 text-sm text-green-800/80 transition-colors hover:bg-green-50 hover:text-green-700">
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <NavLink to="/sobre" className={navLinkClass}>Sobre</NavLink>
            <NavLink to="/noticias" className={navLinkClass}>Notícias</NavLink>
            <NavLink to="/contacto" className="rounded-full bg-green-700 px-5 py-2 text-sm font-600 text-cream-50 transition-all hover:bg-green-800 hover:shadow-lg">
              Contacto
            </NavLink>
          </nav>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-green-800 lg:hidden" aria-label="Abrir menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-green-950/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-cream-50 shadow-2xl">
            <div className="flex items-center justify-between border-b border-green-100 px-6 py-4">
              <div className="font-serif text-lg font-700 text-green-800">
                SEMINAL AGRÍCOLA
                <small className="block text-xs font-400 text-green-600/70">{company.tagline}</small>
              </div>
              <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-green-800" aria-label="Fechar menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-4 py-4">
              <Link to="/" className="block rounded-xl px-4 py-3 text-sm font-600 text-green-800 hover:bg-green-50">Início</Link>

              <button onClick={() => setMobileSub(mobileSub === 'prod' ? null : 'prod')} className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-600 text-green-800 hover:bg-green-50">
                Produtos <ChevronDown className={`h-4 w-4 transition-transform ${mobileSub === 'prod' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSub === 'prod' && (
                <div className="ml-4 space-y-0.5">
                  {products.map((p) => (
                    <Link key={p.slug} to={`/produtos/${p.slug}`} className="block rounded-xl px-4 py-2.5 text-sm text-green-800/70 hover:bg-green-50">
                      {p.badge} {p.name}
                    </Link>
                  ))}
                </div>
              )}

              <button onClick={() => setMobileSub(mobileSub === 'serv' ? null : 'serv')} className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-600 text-green-800 hover:bg-green-50">
                Serviços <ChevronDown className={`h-4 w-4 transition-transform ${mobileSub === 'serv' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSub === 'serv' && (
                <div className="ml-4 space-y-0.5">
                  {services.map((s) => (
                    <Link key={s.slug} to={`/servicos/${s.slug}`} className="block rounded-xl px-4 py-2.5 text-sm text-green-800/70 hover:bg-green-50">
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}

              <Link to="/sobre" className="block rounded-xl px-4 py-3 text-sm font-600 text-green-800 hover:bg-green-50">Sobre Nós</Link>
              <Link to="/noticias" className="block rounded-xl px-4 py-3 text-sm font-600 text-green-800 hover:bg-green-50">Notícias</Link>
              <Link to="/contacto" className="block rounded-xl px-4 py-3 text-sm font-600 text-green-800 hover:bg-green-50">Contacto</Link>
            </div>
            <div className="border-t border-green-100 px-6 py-4 space-y-2">
              <a href={`tel:${company.phoneRaw}`} className="flex items-center gap-2 text-sm text-green-800/70">
                <Phone className="h-4 w-4 text-gold-500" /> {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-2 text-sm text-green-800/70">
                <Mail className="h-4 w-4 text-gold-500" /> {company.email}
              </a>
              <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-green-800/70">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
