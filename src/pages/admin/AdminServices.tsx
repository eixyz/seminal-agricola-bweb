import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Service, ServiceSection } from '../../lib/types';
import StringListEditor from '../../components/admin/StringListEditor';

type Draft = Omit<Service, 'id' | 'created_at' | 'updated_at'>;

const empty: Draft = {
  slug: '',
  icon: 'ShoppingBag',
  title: '',
  short: '',
  description: '',
  features: [],
  image: '',
  gallery: [],
  sections: [],
  sort_order: 0,
};

const inputCls = 'w-full rounded-lg border border-green-200 bg-cream-50 px-3 py-2 text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-600 text-green-800">{label}</label>
      {children}
    </div>
  );
}

export default function AdminServices() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [draft, setDraft] = useState<Draft>(empty);
  const [showEditor, setShowEditor] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('services').select('*').order('sort_order', { ascending: true });
    if (error) setError(error.message);
    setItems((data ?? []) as Service[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startNew = () => { setEditing(null); setDraft(empty); setShowEditor(true); setError(null); };
  const startEdit = (s: Service) => {
    setEditing(s);
    setDraft({
      slug: s.slug, icon: s.icon, title: s.title, short: s.short, description: s.description,
      features: s.features, image: s.image, gallery: s.gallery, sections: s.sections, sort_order: s.sort_order,
    });
    setShowEditor(true);
    setError(null);
  };
  const closeEditor = () => { setEditing(null); setDraft(empty); setShowEditor(false); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...draft, features: draft.features, gallery: draft.gallery, sections: draft.sections };
    let result;
    if (editing) {
      result = await supabase.from('services').update(payload).eq('id', editing.id).select().single();
    } else {
      result = await supabase.from('services').insert(payload).select().single();
    }
    setSaving(false);
    if (result.error) { setError(result.error.message); return; }
    await load();
    closeEditor();
  };

  const remove = async (s: Service) => {
    if (!confirm(`Eliminar "${s.title}"?`)) return;
    const { error } = await supabase.from('services').delete().eq('id', s.id);
    if (error) { setError(error.message); return; }
    await load();
  };

  const updateSection = (i: number, patch: Partial<ServiceSection>) => {
    const next = [...draft.sections];
    next[i] = { ...next[i], ...patch };
    setDraft({ ...draft, sections: next });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-600 text-green-900">Serviços</h1>
          <p className="mt-1 text-sm text-green-800/60">{items.length} serviço(s)</p>
        </div>
        {!showEditor && (
          <button onClick={startNew} className="inline-flex items-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-600 text-cream-50 transition-colors hover:bg-green-800">
            <Plus className="h-4 w-4" /> Novo Serviço
          </button>
        )}
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {showEditor ? (
        <form onSubmit={save} className="rounded-3xl bg-white p-6 ring-1 ring-green-100">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-xl font-600 text-green-900">{editing ? 'Editar Serviço' : 'Novo Serviço'}</h2>
            <button type="button" onClick={closeEditor} className="flex items-center gap-1.5 text-sm text-green-700 hover:text-green-900">
              <ArrowLeft className="h-4 w-4" /> Voltar à lista
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Título"><input required value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} className={inputCls} /></Field>
            <Field label="Slug (URL)"><input required value={draft.slug} onChange={e => setDraft({ ...draft, slug: e.target.value })} className={inputCls} /></Field>
            <Field label="Ícone (lucide)"><input value={draft.icon} onChange={e => setDraft({ ...draft, icon: e.target.value })} placeholder="ShoppingBag / Home / BarChart3 / Droplets / Megaphone" className={inputCls} /></Field>
            <Field label="Ordem"><input type="number" value={draft.sort_order} onChange={e => setDraft({ ...draft, sort_order: Number(e.target.value) })} className={inputCls} /></Field>
            <Field label="Imagem principal"><input required value={draft.image} onChange={e => setDraft({ ...draft, image: e.target.value })} className={inputCls} /></Field>
          </div>

          <div className="mt-5">
            <Field label="Resumo curto"><input required value={draft.short} onChange={e => setDraft({ ...draft, short: e.target.value })} className={inputCls} /></Field>
          </div>
          <div className="mt-5">
            <Field label="Descrição"><textarea required value={draft.description} onChange={e => setDraft({ ...draft, description: e.target.value })} rows={3} className={`${inputCls} resize-none`} /></Field>
          </div>

          <div className="mt-5 space-y-5">
            <StringListEditor label="Características" values={draft.features} onChange={v => setDraft({ ...draft, features: v })} />
            <StringListEditor label="Galeria (caminhos)" values={draft.gallery} onChange={v => setDraft({ ...draft, gallery: v })} />
          </div>

          {/* Sections editor */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-600 text-green-800">Secções de conteúdo</label>
              <button type="button" onClick={() => setDraft({ ...draft, sections: [...draft.sections, { heading: '', body: '' }] })} className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-600 text-green-700 hover:bg-green-200">
                <Plus className="h-3.5 w-3.5" /> Adicionar secção
              </button>
            </div>
            <div className="space-y-4">
              {draft.sections.map((sec, i) => (
                <div key={i} className="rounded-2xl border border-green-100 bg-cream-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-600 uppercase tracking-wider text-green-600">Secção {i + 1}</span>
                    <button type="button" onClick={() => setDraft({ ...draft, sections: draft.sections.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <input value={sec.heading} onChange={e => updateSection(i, { heading: e.target.value })} placeholder="Título da secção" className={`${inputCls} mb-2`} />
                  <textarea value={sec.body} onChange={e => updateSection(i, { body: e.target.value })} placeholder="Corpo da secção" rows={2} className={`${inputCls} resize-none`} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-600 text-cream-50 transition-colors hover:bg-green-800 disabled:opacity-50">
              <Save className="h-4 w-4" /> {saving ? 'A guardar...' : 'Guardar'}
            </button>
          </div>
        </form>
      ) : loading ? (
        <p className="text-green-800/60">A carregar...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(s => (
            <div key={s.id} className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-green-100">
              <div className="h-32 overflow-hidden">
                <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-serif text-lg font-600 text-green-900">{s.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-green-800/60">{s.short}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => startEdit(s)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-100 py-2 text-xs font-600 text-green-700 transition-colors hover:bg-green-200">
                    <Pencil className="h-3.5 w-3.5" /> Editar
                  </button>
                  <button onClick={() => remove(s)} className="rounded-lg bg-red-50 px-3 text-red-500 transition-colors hover:bg-red-100">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
