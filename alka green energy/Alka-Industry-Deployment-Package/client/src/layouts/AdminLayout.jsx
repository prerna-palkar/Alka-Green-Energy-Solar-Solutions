import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BUSINESS_CONFIG } from '../utils/config';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CreditCard,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  HelpCircle,
  FolderLock,
  LogOut,
  Menu,
  X,
  Sun,
  ShieldCheck,
  Bell
} from 'lucide-react';

const ADMIN_NAV = [
  { label: 'Overview', path: '/admin', icon: LayoutDashboard },
  { label: 'Customers', path: '/admin/customers', icon: Users },
  { label: 'Projects', path: '/admin/projects', icon: Briefcase },
  { label: 'Manual Payments', path: '/admin/payments', icon: CreditCard },
  { label: 'Enquiries & Leads', path: '/admin/enquiries', icon: MessageSquare },
  { label: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
  { label: 'Govt Schemes', path: '/admin/government-schemes', icon: FileText },
  { label: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
  { label: 'Documents', path: '/admin/documents', icon: FolderLock },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans antialiased">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-amber-300 shadow">
            <Sun className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white tracking-tight leading-tight">ALKA SOLAR</h1>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">ADMIN PORTAL</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                {user?.name ? user.name[0] : 'A'}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-emerald-400">Master Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Body Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-sm text-slate-200">Management Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{BUSINESS_CONFIG.city} Office</span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-colors font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Mobile Slide-out Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Dynamic Route Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
