import { useEffect, useState } from 'react';
import { Menu, X, Sprout, ChevronDown } from 'lucide-react';
import { useScrollPosition } from '../lib/hooks';

const products = [
  { label: 'Milho', href: '#produtos', icon: '🌽' },
  { label: 'Arroz & Cereais', href: '#produtos', icon: '🌾' },
  { label: 'Feijão', href: '#produtos', icon: '🫘' },
  { label: 'Batata-doce', href: '#produtos', icon: '🥔' },
  { label: 'Sementes', href: '#produtos', icon: '🌱' },
];

const services = [
  { label: 'Insumos & Equipamentos', href: '#servicos', icon: '🛒' },
  { label: 'Estufas & Sombrite', href: '#servicos', icon: '🏗️' },
  { label: 'Produção & Mercado', href: '#servicos', icon: '📊' },
  { label: 'Sistemas de Irrigação', href: '#servicos', icon: '💧' },
  { label: 'Publicidade', href: '#servicos', icon: '📢' },
];

const navLinks = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Produtos', href: '#produtos', dropdown: products },
  { label: 'Serviços', href: '#servicos', dropdown: services },
  { label: 'Notícias', href: '#noticias' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const scrolled = useScrollPosition();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream-50/95 backdrop-blur-md shadow-[0_1px_20px_rgba(54,62,38,0.08)] py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 ${
            scrolled ? 'bg-forest-700 text-cream-50' : 'bg-cream-50/15 text-cream-50 backdrop-blur-sm ring-1 ring-cream-50/30'
          } group-hover:scale-110`}>
            <Sprout className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <div className="flex flex-col leading-none">
            <span className={`font-serif text-xl font-600 tracking-tight transition-colors duration-500 ${
              scrolled ? 'text-forest-800' : 'text-cream-50'
            }`}>
              SEMINAL AGRÍCOLA
            </span>
            <span className={`text-[10px] font-400 uppercase tracking-[0.15em] transition-colors duration-500 ${
              scrolled ? 'text-forest-600/60' : 'text-cream-200/70'
            }`}>
              Agronegócio · Moçambique
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={link.href}
                className={`group relative flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-500 transition-colors duration-300 ${
                  scrolled ? 'text-forest-700 hover:text-forest-900' : 'text-cream-100/90 hover:text-cream-50'
                }`}
              >
                {link.label}
                {link.dropdown && <ChevronDown className="h-3.5 w-3.5" />}
                <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-forest-500 transition-all duration-300 group-hover:w-3/4" />
              </a>
              {link.dropdown && openDropdown === link.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="w-64 rounded-2xl bg-cream-50 p-2 shadow-2xl ring-1 ring-forest-100">
                    {link.dropdown.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpenDropdown(null)}
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-500 text-forest-700 transition-colors hover:bg-forest-50"
                      >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:block">
          <a
            href="https://wa.me/258865602805?text=Olá,%20gostaria%20de%20mais%20informações."
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full px-6 py-2.5 text-sm font-600 transition-all duration-300 ${
              scrolled
                ? 'bg-forest-700 text-cream-50 hover:bg-forest-800 hover:shadow-lg hover:shadow-forest-700/30'
                : 'bg-cream-50 text-forest-800 hover:bg-cream-100 hover:shadow-lg'
            }`}
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
            scrolled ? 'text-forest-800' : 'text-cream-50'
          }`}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="mx-4 mt-2 rounded-3xl bg-cream-50 p-5 shadow-2xl">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-500 text-forest-800 transition-colors hover:bg-forest-50"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="https://wa.me/258865602805"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-forest-700 px-4 py-3 text-center text-base font-600 text-cream-50"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
