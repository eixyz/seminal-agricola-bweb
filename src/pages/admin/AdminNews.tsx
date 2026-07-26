import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { NewsArticle, NewsContent } from '../../lib/types';
import StringListEditor from '../../components/admin/StringListEditor';

type Draft = Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>;

const empty: Draft = {
  slug: '',
  tag: '',
  title: '',
  excerpt: '',
  image: '',
  date: '',
  author: '',
  read_time: '',
  content: [],
  gallery: [],
  is_download: false,
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

export default function AdminNews() {
  const [items, setItems] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  const [draft, setDraft] = useState<Draft>(empty);
  const [showEditor, setShowEditor] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('news').select('*').order('sort_order', { ascending: true });
    if (error) setError(error.message);
    setItems((data ?? []) as NewsArticle[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startNew = () => { setEditing(null); setDraft(empty); setShowEditor(true); setError(null); };
  const startEdit = (n: NewsArticle) => {
    setEditing(n);
    setDraft({
      slug: n.slug, tag: n.tag, title: n.title, excerpt: n.excerpt, image: n.image,
      date: n.date, author: n.author, read_time: n.read_time, content: n.content,
      gallery: n.gallery, is_download: n.is_download, sort_order: n.sort_order,
    });
    setShowEditor(true);
    setError(null);
  };
  const closeEditor = () => { setEditing(null); setDraft(empty); setShowEditor(false); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...draft, content: draft.content, gallery: draft.gallery };
    let result;
    if (editing) {
      result = await supabase.from('news').update(payload).eq('id', editing.id).select().single();
    } else {
      result = await supabase.from('news').insert(payload).select().single();
    }
    setSaving(false);
    if (result.error) { setError(result.error.message); return; }
    await load();
    closeEditor();
  };

  const remove = async (n: NewsArticle) => {
    if (!confirm(`Eliminar "${n.title}"?`)) return;
    const { error } = await supabase.from('news').delete().eq('id', n.id);
    if (error) { setError(error.message); return; }
    await load();
  };

  const updateContent = (i: number, patch: Partial<NewsContent>) => {
    const next = [...draft.content];
    next[i] = { ...next[i], ...patch };
    setDraft({ ...draft, content: next });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-600 text-green-900">Notícias</h1>
          <p className="mt-1 text-sm text-green-800/60">{items.length} artigo(s)</p>
        </div>
        {!showEditor && (
          <button onClick={startNew} className="inline-flex items-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-600 text-cream-50 transition-colors hover:bg-green-800">
            <Plus className="h-4 w-4" /> Novo Artigo
          </button>
        )}
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {showEditor ? (
        <form onSubmit={save} className="rounded-3xl bg-white p-6 ring-1 ring-green-100">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-xl font-600 text-green-900">{editing ? 'Editar Artigo' : 'Novo Artigo'}</h2>
            <button type="button" onClick={closeEditor} className="flex items-center gap-1.5 text-sm text-green-700 hover:text-green-900">
              <ArrowLeft className="h-4 w-4" /> Voltar à lista
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Título"><input required value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} className={inputCls} /></Field>
            <Field label="Slug (URL)"><input required value={draft.slug} onChange={e => setDraft({ ...draft, slug: e.target.value })} className={inputCls} /></Field>
            <Field label="Etiqueta (tag)"><input value={draft.tag} onChange={e => setDraft({ ...draft, tag: e.target.value })} placeholder="Produção" className={inputCls} /></Field>
            <Field label="Data"><input value={draft.date} onChange={e => setDraft({ ...draft, date: e.target.value })} placeholder="15 de Janeiro de 2026" className={inputCls} /></Field>
            <Field label="Autor"><input value={draft.author} onChange={e => setDraft({ ...draft, author: e.target.value })} className={inputCls} /></Field>
            <Field label="Tempo de leitura"><input value={draft.read_time} onChange={e => setDraft({ ...draft, read_time: e.target.value })} placeholder="4 min de leitura" className={inputCls} /></Field>
            <Field label="Imagem"><input required value={draft.image} onChange={e => setDraft({ ...draft, image: e.target.value })} className={inputCls} /></Field>
            <Field label="Ordem"><input type="number" value={draft.sort_order} onChange={e => setDraft({ ...draft, sort_order: Number(e.target.value) })} className={inputCls} /></Field>
          </div>

          <div className="mt-5">
            <Field label="Resumo"><textarea required value={draft.excerpt} onChange={e => setDraft({ ...draft, excerpt: e.target.value })} rows={2} className={`${inputCls} resize-none`} /></Field>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <input type="checkbox" id="is_download" checked={draft.is_download} onChange={e => setDraft({ ...draft, is_download: e.target.checked })} className="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-green-400" />
            <label htmlFor="is_download" className="text-sm font-600 text-green-800">Artigo descarregável (panfleto)</label>
          </div>

          {/* Content sections */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-600 text-green-800">Secções do artigo</label>
              <button type="button" onClick={() => setDraft({ ...draft, content: [...draft.content, { heading: '', body: '' }] })} className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-600 text-green-700 hover:bg-green-200">
                <Plus className="h-3.5 w-3.5" /> Adicionar secção
              </button>
            </div>
            <div className="space-y-4">
              {draft.content.map((sec, i) => (
                <div key={i} className="rounded-2xl border border-green-100 bg-cream-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-600 uppercase tracking-wider text-green-600">Secção {i + 1}</span>
                    <button type="button" onClick={() => setDraft({ ...draft, content: draft.content.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <input value={sec.heading} onChange={e => updateContent(i, { heading: e.target.value })} placeholder="Título" className={`${inputCls} mb-2`} />
                  <textarea value={sec.body} onChange={e => updateContent(i, { body: e.target.value })} placeholder="Corpo" rows={3} className={`${inputCls} resize-none`} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <StringListEditor label="Galeria (caminhos)" values={draft.gallery} onChange={v => setDraft({ ...draft, gallery: v })} />
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
          {items.map(n => (
            <div key={n.id} className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-green-100">
              <div className="h-32 overflow-hidden">
                <img src={n.image} alt={n.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="text-xs font-600 uppercase tracking-wider text-green-600">{n.tag}</span>
                <h3 className="mt-1 font-serif text-lg font-600 text-green-900">{n.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-green-800/60">{n.excerpt}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => startEdit(n)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-100 py-2 text-xs font-600 text-green-700 transition-colors hover:bg-green-200">
                    <Pencil className="h-3.5 w-3.5" /> Editar
                  </button>
                  <button onClick={() => remove(n)} className="rounded-lg bg-red-50 px-3 text-red-500 transition-colors hover:bg-red-100">
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
