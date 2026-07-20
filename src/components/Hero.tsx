import { useEffect, useState } from 'react';
import { ArrowDown, Sprout } from 'lucide-react';

const slides = [
  '/images/equipments/Sementes_e_equipamentos.jpg',
  '/images/irrigation/Kit_de_Irrigacao_por_Gota_a_gota1.jpg',
  '/images/equipments/Adubos1.jpg',
  '/images/irrigation/Bomba_Solar_Future_Pump.jpg',
  '/images/equipments/Grade_Disponivel.jpg',
  '/images/equipments/Sementes_e_equipamentos2.jpg',
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={src}
              alt={`Seminal Agrícola — imagem ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-forest-950/30 to-forest-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-20 lg:px-10">
        <div className="max-w-3xl">
          <div
            className="mb-6 flex items-center gap-3 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="h-px w-12 bg-cream-300/60" />
            <span className="flex items-center gap-2 text-sm font-500 uppercase tracking-[0.25em] text-cream-200">
              <Sprout className="h-4 w-4" />
              Agricultura Sustentável · Moçambique
            </span>
          </div>

          <h1
            className="font-serif text-5xl font-300 leading-[1.05] text-cream-50 opacity-0 animate-fade-up text-balance sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '0.4s' }}
          >
            Do Campo ao Mercado,
            <br />
            com <span className="font-600 italic text-cream-300">Inovação</span> e Qualidade
          </h1>

          <p
            className="mt-8 max-w-xl text-lg font-300 leading-relaxed text-cream-100/90 opacity-0 animate-fade-up sm:text-xl"
            style={{ animationDelay: '0.6s' }}
          >
            Consultoria, produção e fornecimento de produtos agrícolas, pecuários e
            aquaculturais — com tecnologia, rastreabilidade e sustentabilidade em todo Moçambique.
          </p>

          <div
            className="mt-10 flex flex-col gap-4 opacity-0 animate-fade-up sm:flex-row sm:items-center"
            style={{ animationDelay: '0.8s' }}
          >
            <a
              href="#servicos"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-cream-50 px-8 py-4 text-base font-600 text-forest-800 transition-all duration-300 hover:bg-cream-100 hover:shadow-2xl"
            >
              <Sprout className="h-5 w-5 transition-transform group-hover:rotate-12" />
              Ver Serviços
            </a>
            <a
              href="https://wa.me/258865602805?text=Olá,%20gostaria%20de%20mais%20informações."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-50/30 px-8 py-4 text-base font-500 text-cream-50 backdrop-blur-sm transition-all duration-300 hover:border-cream-50/60 hover:bg-cream-50/10"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-cream-50' : 'w-2 bg-cream-50/40'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden lg:flex flex-col items-center gap-2 text-cream-200/60">
        <span className="text-xs font-500 uppercase tracking-[0.2em] [writing-mode:vertical-rl]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
