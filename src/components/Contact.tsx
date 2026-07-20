import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Loader2, Clock, MessageCircle } from 'lucide-react';
import { useReveal } from '../lib/hooks';
import { supabase } from '../lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error';

const schedule = [
  { day: 'Segunda – Sexta', hours: '08:00 – 17:00' },
  { day: 'Sábado', hours: '08:00 – 12:00' },
  { day: 'Domingo', hours: 'Encerrado' },
  { day: 'WhatsApp', hours: 'Sempre disponível' },
];

export default function Contact() {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || null,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const { error } = await supabase.from('contact_inquiries').insert(data);
      if (error) throw error;
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Algo correu mal. Tente novamente.');
    }
  };

  return (
    <section id="contacto" className="bg-cream-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Info side */}
          <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} lg:col-span-2`}>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-forest-400" />
              <span className="text-sm font-600 uppercase tracking-[0.2em] text-forest-600">Fale Connosco</span>
            </div>
            <h2 className="font-serif text-4xl font-400 leading-tight text-forest-900 sm:text-5xl">
              Entre em <span className="font-600 italic text-forest-600">contacto</span>
            </h2>
            <p className="mt-6 text-lg font-300 leading-relaxed text-forest-800/70">
              Estamos disponíveis para responder às suas questões sobre produtos, serviços e parcerias.
            </p>

            <div className="mt-10 space-y-5">
              <a href="tel:+258865602805" className="group flex items-center gap-4 transition-colors hover:text-forest-900">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-100 text-forest-700 transition-colors group-hover:bg-forest-700 group-hover:text-cream-50">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-400 text-forest-700/60">Telefone / WhatsApp</p>
                  <p className="font-600 text-forest-900">+258 86 560 2805</p>
                </div>
              </a>

              <a href="mailto:seminalagricola@gmail.com" className="group flex items-center gap-4 transition-colors hover:text-forest-900">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-100 text-forest-700 transition-colors group-hover:bg-forest-700 group-hover:text-cream-50">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-400 text-forest-700/60">Email</p>
                  <p className="font-600 text-forest-900">seminalagricola@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-100 text-forest-700">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-400 text-forest-700/60">Localização</p>
                  <p className="font-600 text-forest-900">Maputo, Moçambique</p>
                </div>
              </div>

              <a
                href="https://wa.me/258865602805?text=Olá,%20gostaria%20de%20mais%20informações."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 transition-colors hover:text-forest-900"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-100 text-forest-700 transition-colors group-hover:bg-forest-700 group-hover:text-cream-50">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-400 text-forest-700/60">WhatsApp</p>
                  <p className="font-600 text-forest-900">Conversar agora</p>
                </div>
              </a>
            </div>

            {/* Schedule */}
            <div className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-forest-100">
              <h3 className="mb-4 flex items-center gap-2 font-600 text-forest-900">
                <Clock className="h-5 w-5 text-forest-600" />
                Horário de Atendimento
              </h3>
              <div className="space-y-2">
                {schedule.map((s) => (
                  <div key={s.day} className="flex items-center justify-between border-b border-forest-50 pb-2 last:border-0 last:pb-0">
                    <span className="text-sm font-400 text-forest-800/70">{s.day}</span>
                    <span className="text-sm font-600 text-forest-900">{s.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className={`reveal reveal-delay-2 ${isVisible ? 'is-visible' : ''} lg:col-span-3`}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white p-8 shadow-xl shadow-forest-900/5 ring-1 ring-forest-100 lg:p-10"
            >
              <h3 className="mb-6 font-serif text-2xl font-600 text-forest-900">Envie uma Mensagem</h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-600 text-forest-800">Nome Completo *</label>
                  <input
                    type="text" id="name" name="name" required placeholder="O seu nome"
                    className="w-full rounded-xl border border-forest-200 bg-cream-50 px-4 py-3 text-forest-900 placeholder:text-forest-400 transition-all focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-600 text-forest-800">Email *</label>
                  <input
                    type="email" id="email" name="email" required placeholder="o.seu@email.com"
                    className="w-full rounded-xl border border-forest-200 bg-cream-50 px-4 py-3 text-forest-900 placeholder:text-forest-400 transition-all focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-600 text-forest-800">
                    Telefone <span className="font-400 text-forest-500">(opcional)</span>
                  </label>
                  <input
                    type="tel" id="phone" name="phone" placeholder="+258 86 000 0000"
                    className="w-full rounded-xl border border-forest-200 bg-cream-50 px-4 py-3 text-forest-900 placeholder:text-forest-400 transition-all focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-600 text-forest-800">Assunto *</label>
                  <select
                    id="subject" name="subject" required
                    className="w-full rounded-xl border border-forest-200 bg-cream-50 px-4 py-3 text-forest-900 transition-all focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                  >
                    <option value="">Seleccionar tópico</option>
                    <option value="Orçamento de Produtos">Orçamento de Produtos</option>
                    <option value="Serviços Agrícolas">Serviços Agrícolas</option>
                    <option value="Parceria">Parceria</option>
                    <option value="Informação Geral">Informação Geral</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-sm font-600 text-forest-800">Mensagem *</label>
                <textarea
                  id="message" name="message" required rows={5}
                  placeholder="Como podemos ajudar..."
                  className="w-full resize-none rounded-xl border border-forest-200 bg-cream-50 px-4 py-3 text-forest-900 placeholder:text-forest-400 transition-all focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                />
              </div>

              {status === 'success' && (
                <div className="mt-5 flex items-center gap-3 rounded-xl bg-forest-50 px-4 py-3 text-forest-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-500">Obrigado! A sua mensagem foi enviada. Entraremos em contacto em breve.</p>
                </div>
              )}
              {status === 'error' && (
                <div className="mt-5 flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-red-700">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-500">{errorMsg}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest-700 px-6 py-4 text-base font-600 text-cream-50 transition-all duration-300 hover:bg-forest-800 hover:shadow-lg disabled:opacity-60 sm:w-auto"
              >
                {status === 'loading' ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> A enviar...</>
                ) : (
                  <><Send className="h-5 w-5" /> Enviar Mensagem</>
                )}
              </button>

              <p className="mt-4 text-sm font-300 text-forest-700/50">
                Ou contacte-nos directamente pelo{' '}
                <a href="https://wa.me/258865602805" target="_blank" rel="noopener noreferrer" className="font-600 text-forest-600 hover:text-forest-900">
                  WhatsApp
                </a>{' '}
                para uma resposta imediata.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
