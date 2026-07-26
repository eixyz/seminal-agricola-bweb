import { useState } from 'react';
import { Plus, X } from 'lucide-react';

type Props = {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
};

export default function StringListEditor({ label, values, onChange, placeholder }: Props) {
  const [draft, setDraft] = useState('');

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...values, v]);
    setDraft('');
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-600 text-green-800">{label}</label>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={v}
              onChange={(e) => {
                const next = [...values];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="flex-1 rounded-lg border border-green-200 bg-cream-50 px-3 py-2 text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label="Remover"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
            placeholder={placeholder ?? 'Adicionar...'}
            className="flex-1 rounded-lg border border-dashed border-green-300 bg-cream-50 px-3 py-2 text-sm text-green-900 placeholder:text-green-800/30 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="button"
            onClick={add}
            className="rounded-lg bg-green-100 p-2 text-green-700 transition-colors hover:bg-green-200"
            aria-label="Adicionar"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
