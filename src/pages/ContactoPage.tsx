import { useState } from 'react';
import { Phone, Mail, MapPin, FileText, Clock, Send, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import { company } from '../lib/data';

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const initialForm: FormState = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactoPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = 'Nome é obrigatório';
    if (!form.email.trim()) e.email = 'Email é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido';
    if (!form.subject.trim()) e.subject = 'Assunto é obrigatório';
    if (!form.message.trim()) e.message = 'Mensagem é obrigatória';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const body = `Nome: ${form.name.trim()}%0D%0AEmail: ${form.email.trim()}%0D%0ATelefone: ${form.phone.trim() || '—'}%0D%0A%0D%0A${encodeURIComponent(form.message.trim())}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(form.subject.trim())}&body=${body}`;
    setStatus('success');
    setForm(initialForm);
  };

  const inputClass = (field: keyof FormState) =>
    `w-full rounded-xl border bg-cream-50 px-4 py-3 text-sm text-green-900 placeholder:text-green-800/30 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 ${errors[field] ? 'border-red-300 focus:ring-red-300' : 'border-green-200'}`;

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
            {/* Form */}
            <div className="rounded-3xl bg-white p-8 ring-1 ring-green-100">
              <h3 className="font-serif text-2xl font-600 text-green-900">Envie uma Mensagem</h3>
              <p className="mt-2 text-sm text-green-800/60">Preencha o formulário e responderemos o mais breve possível.</p>

              {status === 'success' && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <p className="font-600 text-green-900">Mensagem enviada com sucesso!</p>
                    <p className="mt-1 text-sm text-green-800/70">Obrigado pelo seu contacto. Responderemos em breve.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-600 text-green-800">Nome *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="O seu nome"
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-600 text-green-800">Telefone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+258 ..."
                      className={inputClass('phone')}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-600 text-green-800">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="email@exemplo.com"
                    className={inputClass('email')}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-600 text-green-800">Assunto *</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder="Sobre o que é a sua mensagem?"
                    className={inputClass('subject')}
                  />
                  {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-600 text-green-800">Mensagem *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Escreva a sua mensagem aqui..."
                    rows={5}
                    className={`${inputClass('message')} resize-none`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3.5 text-sm font-600 text-cream-50 transition-all hover:bg-green-500 sm:w-auto"
                >
                  <Send className="h-4 w-4" />
                  Enviar Mensagem
                </button>
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-8 ring-1 ring-green-100">
                <h3 className="font-serif text-xl font-600 text-green-900">Informações de Contacto</h3>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700"><Phone className="h-5 w-5" /></span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-green-600/60">Telefone / WhatsApp</p>
                      <a href={`tel:${company.phoneRaw}`} className="font-600 text-green-900 transition-colors hover:text-green-600">{company.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700"><Mail className="h-5 w-5" /></span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-green-600/60">Email</p>
                      <a href={`mailto:${company.email}`} className="break-all font-600 text-green-900 transition-colors hover:text-green-600">{company.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700"><MapPin className="h-5 w-5" /></span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-green-600/60">Localização</p>
                      <p className="font-600 text-green-900">{company.location}</p>
                    </div>
                  </div>
                  {/* <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700"><FileText className="h-5 w-5" /></span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-green-600/60">NUIT</p>
                      <p className="font-600 text-green-900">{company.nuit}</p>
                    </div>
                  </div> */}
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
                <img src="/images/equipments/Sementes_e_equipamentos.jpg" alt="Localização" className="h-48 w-full object-cover" loading="lazy" />
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
