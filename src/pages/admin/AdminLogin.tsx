import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Sprout } from 'lucide-react';
import { useAuth } from '../../lib/auth';

export default function AdminLogin() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? '/admin';

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fn = mode === 'login' ? signIn : signUp;
    const { error } = await fn(email.trim(), password);
    setSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    if (mode === 'signup') {
      setError('Conta criada. Pode agora entrar.');
      setMode('login');
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-950 px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2 text-cream-100/70 transition-colors hover:text-gold-400">
          <Sprout className="h-5 w-5" />
          <span className="font-serif text-lg">Seminal Agrícola</span>
        </Link>

        <div className="rounded-3xl bg-cream-50 p-8 shadow-2xl ring-1 ring-green-200">
          <h1 className="font-serif text-2xl font-600 text-green-900">
            {mode === 'login' ? 'Entrar no Painel' : 'Criar Conta de Admin'}
          </h1>
          <p className="mt-2 text-sm text-green-800/60">
            {mode === 'login'
              ? 'Acesso reservado a administradores do site.'
              : 'Crie a primeira conta de administrador.'}
          </p>

          {error && (
            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-600 text-green-800">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600/50" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@seminal.co.mz"
                  className="w-full rounded-xl border border-green-200 bg-cream-50 py-3 pl-10 pr-4 text-sm text-green-900 placeholder:text-green-800/30 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-600 text-green-800">Palavra-passe</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600/50" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-green-200 bg-cream-50 py-3 pl-10 pr-4 text-sm text-green-900 placeholder:text-green-800/30 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-700 px-6 py-3.5 text-sm font-600 text-cream-50 transition-all hover:bg-green-800 disabled:opacity-50"
            >
              {submitting ? 'A processar...' : mode === 'login' ? 'Entrar' : 'Criar Conta'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 border-t border-green-100 pt-5 text-center text-sm text-green-800/60">
            {mode === 'login' ? (
              <>
                Ainda sem conta?{' '}
                <button onClick={() => { setMode('signup'); setError(null); }} className="font-600 text-green-700 hover:text-green-900">
                  Criar conta
                </button>
              </>
            ) : (
              <>
                Já tem conta?{' '}
                <button onClick={() => { setMode('login'); setError(null); }} className="font-600 text-green-700 hover:text-green-900">
                  Entrar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
