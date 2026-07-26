import { Navigate, NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { Sprout, Package, Wrench, Newspaper, Info, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '../../lib/auth';

const navItems = [
  { to: '/admin/produtos', label: 'Produtos', icon: Package },
  { to: '/admin/servicos', label: 'Serviços', icon: Wrench },
  { to: '/admin/noticias', label: 'Notícias', icon: Newspaper },
  { to: '/admin/sobre', label: 'Sobre', icon: Info },
];

export default function AdminLayout() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-100">
        <p className="text-green-800/60">A carregar...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: '/admin' }} replace />;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-cream-100">
      <header className="sticky top-0 z-40 border-b border-green-100 bg-cream-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link to="/admin" className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-green-700" />
            <span className="font-serif text-lg font-600 text-green-900">Painel Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1.5 text-sm text-green-800/70 transition-colors hover:text-green-700">
              <ExternalLink className="h-3.5 w-3.5" /> Ver site
            </Link>
            <span className="hidden text-xs text-green-800/50 sm:inline">{user.email}</span>
            <button onClick={handleSignOut} className="flex items-center gap-1.5 rounded-full bg-green-100 px-4 py-2 text-sm font-600 text-green-700 transition-colors hover:bg-green-200">
              <LogOut className="h-3.5 w-3.5" /> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-600 transition-colors ${
                    isActive ? 'bg-green-700 text-cream-50' : 'text-green-800/70 hover:bg-green-100 hover:text-green-700'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1">
          {/* Mobile nav */}
          <div className="mb-6 flex gap-2 overflow-x-auto md:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-600 transition-colors ${
                    isActive ? 'bg-green-700 text-cream-50' : 'bg-white text-green-800/70 ring-1 ring-green-100'
                  }`
                }
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </NavLink>
            ))}
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
