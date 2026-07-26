import { useEffect, useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { About } from '../../lib/types';
import StringListEditor from '../../components/admin/StringListEditor';

type Draft = Pick<About, 'intro_title' | 'intro_paragraphs' | 'mission' | 'vision' | 'values'>;

const empty: Draft = {
  intro_title: '',
  intro_paragraphs: [],
  mission: '',
  vision: '',
  values: [],
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

export default function AdminAbout() {
  const [draft, setDraft] = useState<Draft>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from('about').select('*').eq('id', 1).maybeSingle().then(({ data, error }) => {
      if (error) setError(error.message);
      if (data) setDraft({
        intro_title: data.intro_title,
        intro_paragraphs: data.intro_paragraphs,
        mission: data.mission,
        vision: data.vision,
        values: data.values,
      });
      setLoading(false);
    });
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    const { error } = await supabase.from('about').update(draft).eq('id', 1);
    setSaving(false);
    if (error) { setError(error.message); return; }
    setSaved(true);
  };

  if (loading) return <p className="text-green-800/60">A carregar...</p>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-600 text-green-900">Página Sobre</h1>
        <p className="mt-1 text-sm text-green-800/60">Edite o conteúdo da página "Sobre Nós".</p>
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {saved && <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">Conteúdo guardado com sucesso.</div>}

      <form onSubmit={save} className="space-y-6 rounded-3xl bg-white p-6 ring-1 ring-green-100">
        <Field label="Título de introdução">
          <input value={draft.intro_title} onChange={e => setDraft({ ...draft, intro_title: e.target.value })} className={inputCls} />
        </Field>

        <div>
          <label className="mb-1.5 block text-sm font-600 text-green-800">Parágrafos de introdução</label>
          <div className="space-y-2">
            {draft.intro_paragraphs.map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <textarea value={p} onChange={e => { const next = [...draft.intro_paragraphs]; next[i] = e.target.value; setDraft({ ...draft, intro_paragraphs: next }); }} rows={3} className={`${inputCls} resize-none`} />
                <button type="button" onClick={() => setDraft({ ...draft, intro_paragraphs: draft.intro_paragraphs.filter((_, idx) => idx !== i) })} className="mt-2 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setDraft({ ...draft, intro_paragraphs: [...draft.intro_paragraphs, ''] })} className="flex items-center gap-1.5 rounded-lg bg-green-100 px-3 py-2 text-xs font-600 text-green-700 hover:bg-green-200">
              <Plus className="h-3.5 w-3.5" /> Adicionar parágrafo
            </button>
          </div>
        </div>

        <Field label="Missão">
          <textarea value={draft.mission} onChange={e => setDraft({ ...draft, mission: e.target.value })} rows={3} className={`${inputCls} resize-none`} />
        </Field>
        <Field label="Visão">
          <textarea value={draft.vision} onChange={e => setDraft({ ...draft, vision: e.target.value })} rows={3} className={`${inputCls} resize-none`} />
        </Field>

        <StringListEditor label="Valores" values={draft.values} onChange={v => setDraft({ ...draft, values: v })} />

        <div>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-600 text-cream-50 transition-colors hover:bg-green-800 disabled:opacity-50">
            <Save className="h-4 w-4" /> {saving ? 'A guardar...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}
