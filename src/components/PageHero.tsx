import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type Crumb = { label: string; to?: string };

export default function PageHero({ eyebrow, title, subtitle, crumbs }: { eyebrow: string; title: ReactNode; subtitle: string; crumbs: Crumb[] }) {
  return (
    <section className="relative overflow-hidden bg-green-900 py-20 text-cream-50">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#7bbb80_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <nav className="mb-4 flex items-center gap-2 text-sm text-cream-100/60">
          <Link to="/" className="transition-colors hover:text-gold-400">Início</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <span className="text-gold-400">›</span>
              {c.to ? (
                <Link to={c.to} className="transition-colors hover:text-gold-400">{c.label}</Link>
              ) : (
                <span className="text-cream-100/80">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <span className="text-sm font-600 uppercase tracking-[0.2em] text-gold-400">{eyebrow}</span>
        <h1 className="mt-3 font-serif text-4xl font-600 leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg font-300 leading-relaxed text-cream-100/70">{subtitle}</p>
      </div>
    </section>
  );
}
