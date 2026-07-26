import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Product } from '../../lib/types';
import StringListEditor from '../../components/admin/StringListEditor';

type Draft = Omit<Product, 'id' | 'created_at' | 'updated_at'>;

const empty: Draft = {
  slug: '',
  name: '',
  badge: '',
  description: '',
  features: [],
  images: [],
  price: 'Sob consulta',
  sort_order: 0,
};

export default function AdminProducts() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [draft, setDraft] = useState<Draft>(empty);
  const [showEditor, setShowEditor] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('sort_order', { ascending: true });
    if (error) setError(error.message);
    setItems((data ?? []) as Product[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startNew = () => { setEditing(null); setDraft(empty); setShowEditor(true); setError(null); };
  const startEdit = (p: Product) => {
    setEditing(p);
    setDraft({
      slug: p.slug, name: p.name, badge: p.badge, description: p.description,
      features: p.features, images: p.images, price: p.price, sort_order: p.sort_order,
    });
    setShowEditor(true);
    setError(null);
  };
  const closeEditor = () => { setEditing(null); setDraft(empty); setShowEditor(false); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...draft, features: draft.features, images: draft.images };
    let result;
    if (editing) {
      result = await supabase.from('products').update(payload).eq('id', editing.id).select().single();
    } else {
      result = await supabase.from('products').insert(payload).select().single();
    }
    setSaving(false);
    if (result.error) { setError(result.error.message); return; }
    await load();
    closeEditor();
  };

  const remove = async (p: Product) => {
    if (!confirm(`Eliminar "${p.name}"?`)) return;
    const { error } = await supabase.from('products').delete().eq('id', p.id);
    if (error) { setError(error.message); return; }
    await load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-600 text-green-900">Produtos</h1>
          <p className="mt-1 text-sm text-green-800/60">{items.length} produto(s) no catálogo</p>
        </div>
        {!showEditor && (
          <button onClick={startNew} className="inline-flex items-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-600 text-cream-50 transition-colors hover:bg-green-800">
            <Plus className="h-4 w-4" /> Novo Produto
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {showEditor ? (
        <form onSubmit={save} className="rounded-3xl bg-white p-6 ring-1 ring-green-100">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-xl font-600 text-green-900">{editing ? 'Editar Produto' : 'Novo Produto'}</h2>
            <button type="button" onClick={closeEditor} className="flex items-center gap-1.5 text-sm text-green-700 hover:text-green-900">
              <ArrowLeft className="h-4 w-4" /> Voltar à lista
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nome">
              <input required value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Slug (URL)">
              <input required value={draft.slug} onChange={e => setDraft({ ...draft, slug: e.target.value })} placeholder="milho" className={inputCls} />
            </Field>
            <Field label="Etiqueta (badge)">
              <input value={draft.badge} onChange={e => setDraft({ ...draft, badge: e.target.value })} placeholder="🌽 Cereal" className={inputCls} />
            </Field>
            <Field label="Preço">
              <input value={draft.price} onChange={e => setDraft({ ...draft, price: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Ordem">
              <input type="number" value={draft.sort_order} onChange={e => setDraft({ ...draft, sort_order: Number(e.target.value) })} className={inputCls} />
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Descrição">
              <textarea required value={draft.description} onChange={e => setDraft({ ...draft, description: e.target.value })} rows={3} className={`${inputCls} resize-none`} />
            </Field>
          </div>

          <div className="mt-5 space-y-5">
            <StringListEditor label="Características" values={draft.features} onChange={v => setDraft({ ...draft, features: v })} placeholder="Nova característica..." />
            <StringListEditor label="Imagens (caminhos)" values={draft.images} onChange={v => setDraft({ ...draft, images: v })} placeholder="/images/equipments/..." />
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
          {items.map(p => (
            <div key={p.id} className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-green-100">
              <div className="h-32 overflow-hidden">
                <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="text-xs font-600 uppercase tracking-wider text-green-600">{p.badge}</span>
                <h3 className="mt-1 font-serif text-lg font-600 text-green-900">{p.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-green-800/60">{p.description}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => startEdit(p)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-100 py-2 text-xs font-600 text-green-700 transition-colors hover:bg-green-200">
                    <Pencil className="h-3.5 w-3.5" /> Editar
                  </button>
                  <button onClick={() => remove(p)} className="rounded-lg bg-red-50 px-3 text-red-500 transition-colors hover:bg-red-100">
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

const inputCls = 'w-full rounded-lg border border-green-200 bg-cream-50 px-3 py-2 text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-600 text-green-800">{label}</label>
      {children}
    </div>
  );
}
