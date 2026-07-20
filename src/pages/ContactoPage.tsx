import { Phone, Mail, MapPin, FileText, Clock } from 'lucide-react';
import PageHero from '../components/PageHero';
import { company } from '../lib/data';

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Fale Connosco"
        title="Contacto"
        subtitle="Estamos disponíveis para responder às suas questões sobre produtos, serviços e parcerias."
        crumbs={[{ label: 'Contacto' }]}
      />

      <section className="bg-cream-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Form / CTA */}
            <div className="rounded-3xl bg-white p-8 ring-1 ring-green-100">
              <h3 className="font-serif text-2xl font-600 text-green-900">Envie uma Mensagem</h3>
              <div className="mt-6 rounded-2xl border border-gold-200 bg-gold-50 p-6">
                <p className="font-600 text-green-900">O formulário está temporariamente desativado.</p>
                <p className="mt-2 text-sm text-green-800/70">Para contactar-nos, use WhatsApp ou telefone. Respondemos rapidamente.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-600 px-6 py-3 text-sm font-600 text-cream-50 transition-all hover:bg-green-500">
                    💬 WhatsApp
                  </a>
                  <a href={`tel:${company.phoneRaw}`} className="rounded-full border border-green-300 px-6 py-3 text-sm font-600 text-green-700 transition-all hover:bg-green-50">
                    📞 Telefone
                  </a>
                </div>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-8 ring-1 ring-green-100">
                <h3 className="font-serif text-xl font-600 text-green-900">Informações de Contacto</h3>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700"><Phone className="h-5 w-5" /></span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-green-600/60">Telefone / WhatsApp</p>
                      <a href={`tel:${company.phoneRaw}`} className="font-600 text-green-900 hover:text-green-600">{company.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700"><Mail className="h-5 w-5" /></span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-green-600/60">Email</p>
                      <a href={`mailto:${company.email}`} className="font-600 text-green-900 hover:text-green-600">{company.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700"><MapPin className="h-5 w-5" /></span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-green-600/60">Localização</p>
                      <p className="font-600 text-green-900">{company.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700"><FileText className="h-5 w-5" /></span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-green-600/60">NUIT</p>
                      <p className="font-600 text-green-900">{company.nuit}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-8 ring-1 ring-green-100">
                <h3 className="font-serif text-xl font-600 text-green-900">Horário de Atendimento</h3>
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-green-100 pb-3">
                    <span className="flex items-center gap-2 text-sm text-green-800/70"><Clock className="h-4 w-4 text-green-500" /> Segunda – Sexta</span>
                    <strong className="text-sm text-green-900">08:00 – 17:00</strong>
                  </div>
                  <div className="flex items-center justify-between border-b border-green-100 pb-3">
                    <span className="flex items-center gap-2 text-sm text-green-800/70"><Clock className="h-4 w-4 text-green-500" /> Sábado</span>
                    <strong className="text-sm text-green-900">08:00 – 12:00</strong>
                  </div>
                  <div className="flex items-center justify-between border-b border-green-100 pb-3">
                    <span className="flex items-center gap-2 text-sm text-green-800/70"><Clock className="h-4 w-4 text-green-500" /> Domingo</span>
                    <strong className="text-sm text-green-900">Encerrado</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-green-800/70">💬 WhatsApp</span>
                    <strong className="text-sm text-green-900">Sempre disponível</strong>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl ring-1 ring-green-100">
                <img src={`${'https://raw.githubusercontent.com/eixyz/eloviada_projects/main/agro/images'}/market/Cultura_de_Milho_campo_da_Seminal_Agricola.jpg`} alt="Localização" className="h-48 w-full object-cover" loading="lazy" />
                <div className="bg-white p-4">
                  <p className="text-xs text-green-800/50">📌 Endereço exacto disponível mediante contacto prévio.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
