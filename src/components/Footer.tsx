import { Sprout, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const productLinks = [
  { label: 'Milho', href: '#produtos' },
  { label: 'Arroz & Cereais', href: '#produtos' },
  { label: 'Feijão', href: '#produtos' },
  { label: 'Batata-doce', href: '#produtos' },
  { label: 'Sementes', href: '#produtos' },
];

const serviceLinks = [
  { label: 'Insumos & Equipamentos', href: '#servicos' },
  { label: 'Estufas & Sombrite', href: '#servicos' },
  { label: 'Produção & Mercado', href: '#servicos' },
  { label: 'Sistemas de Irrigação', href: '#servicos' },
  { label: 'Publicidade', href: '#servicos' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-cream-100">
      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-700 text-cream-50">
                <Sprout className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg font-600 text-cream-50">SEMINAL AGRÍCOLA</span>
                <span className="text-[10px] font-400 uppercase tracking-[0.15em] text-cream-200/50">SU, LDA · Agronegócio</span>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-base font-300 leading-relaxed text-cream-100/50">
              Empresa de agronegócio dedicada à inovação tecnológica e à produtividade agrícola,
              pecuária e aquacultural em Moçambique.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://wa.me/258865602805"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-800/50 text-cream-100/70 transition-all hover:bg-forest-700 hover:text-cream-50"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={1.8} />
              </a>
              <a
                href="mailto:seminalagricola@gmail.com"
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-800/50 text-cream-100/70 transition-all hover:bg-forest-700 hover:text-cream-50"
              >
                <Mail className="h-5 w-5" strokeWidth={1.8} />
              </a>
              <a
                href="tel:+258865602805"
                aria-label="Telefone"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-800/50 text-cream-100/70 transition-all hover:bg-forest-700 hover:text-cream-50"
              >
                <Phone className="h-5 w-5" strokeWidth={1.8} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-5 text-sm font-600 uppercase tracking-wider text-cream-200/80">Produtos</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-base font-300 text-cream-100/50 transition-colors hover:text-cream-50">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-5 text-sm font-600 uppercase tracking-wider text-cream-200/80">Serviços</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-base font-300 text-cream-100/50 transition-colors hover:text-cream-50">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 text-sm font-600 uppercase tracking-wider text-cream-200/80">Empresa</h4>
            <ul className="space-y-3">
              <li><a href="#sobre" className="text-base font-300 text-cream-100/50 transition-colors hover:text-cream-50">Sobre Nós</a></li>
              <li><a href="#noticias" className="text-base font-300 text-cream-100/50 transition-colors hover:text-cream-50">Notícias</a></li>
              <li><a href="#contacto" className="text-base font-300 text-cream-100/50 transition-colors hover:text-cream-50">Contacto</a></li>
              <li className="flex items-center gap-2 text-base font-300 text-cream-100/50">
                <Phone className="h-4 w-4 text-forest-400" />
                +258 86 560 2805
              </li>
              <li className="flex items-center gap-2 text-base font-300 text-cream-100/50">
                <MapPin className="h-4 w-4 text-forest-400" />
                Maputo, Moçambique
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-forest-800/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 lg:flex-row lg:px-10">
          <p className="text-sm font-300 text-cream-100/40">
            © {new Date().getFullYear()} SEMINAL AGRICOLA, SU, LDA · NUIT: 401811974 · Maputo, Moçambique
          </p>
          <a href="mailto:seminalagricola@gmail.com" className="text-sm font-300 text-cream-100/40 transition-colors hover:text-cream-50">
            seminalagricola@gmail.com
          </a>
        </div>
      </div>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/258865602805?text=Olá,%20gostaria%20de%20mais%20informações."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chate Conosco no WhatsApp"
        title="Chate Conosco"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all hover:scale-110 hover:shadow-green-500/40"
      >
        <MessageCircle className="h-7 w-7" strokeWidth={2} fill="currentColor" />
      </a>
    </footer>
  );
}
