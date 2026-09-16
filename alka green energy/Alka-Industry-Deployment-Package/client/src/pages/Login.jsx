import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Mail, Lock, LogIn, AlertCircle, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../utils/config';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await login(email, password);
      if (res.status === 'success') {
        if (res.user.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setErrorMsg(res.message || 'Invalid email or password.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Login failed. Please check credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-4 flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 shadow-lg space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-amber-300 flex items-center justify-center mx-auto shadow-md">
            <Sun className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{BUSINESS_CONFIG.shortName} Portal Access</h2>
          <p className="text-xs text-slate-500">Sign in to your customer or admin account</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="admin@alkagreenenergy.com or user1@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow transition-colors active:scale-98"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" /> Sign In to Portal
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Don't have an account?{' '}
          <Link to="/register" className="text-emerald-700 font-semibold hover:underline">
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
}
