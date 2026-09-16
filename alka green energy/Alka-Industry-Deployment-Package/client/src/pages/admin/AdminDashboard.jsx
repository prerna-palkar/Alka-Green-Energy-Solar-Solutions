import React, { useEffect, useState } from 'react';
import { getAdminStats } from '../../services/adminService';
import {
  Users,
  Briefcase,
  TrendingUp,
  CreditCard,
  AlertCircle,
  MessageSquare,
  RefreshCw,
  Zap,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6', '#6366F1'];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAdminStats();
      if (res.status === 'success') {
        setStats(res);
      } else {
        setError(res.message || 'Failed to load dashboard statistics.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Server error loading analytics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 space-y-3">
        <RefreshCw className="w-8 h-8 animate-spin text-emerald-500 mx-auto" />
        <p className="text-sm font-medium">Loading live analytics & financial metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-rose-950/60 border border-rose-800 rounded-2xl text-rose-300 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
        <button onClick={fetchStats} className="px-4 py-2 bg-rose-800 hover:bg-rose-700 text-white font-bold text-xs rounded-xl">
          Retry
        </button>
      </div>
    );
  }

  const s = stats?.summary || {};
  const charts = stats?.charts || {};

  return (
    <div className="space-y-8">
      
      {/* Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">System Analytics & Overview</h1>
          <p className="text-xs text-slate-400">Live operational & financial summary for Alka Green Energy Solar Solutions.</p>
        </div>
        <button
          onClick={fetchStats}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* 8 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Customers</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{s.total_customers}</p>
          <span className="text-[11px] text-emerald-400 font-medium">Registered accounts</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Projects</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{s.total_projects}</p>
          <span className="text-[11px] text-amber-400 font-medium">{s.active_projects} active • {s.completed_projects} completed</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Amount Received</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-400">₹{(s.total_amount_received || 0).toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-slate-400">Recorded offline payments</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Pending Amount</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-400">₹{(s.total_pending_amount || 0).toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-slate-400">Out of ₹{(s.total_project_value || 0).toLocaleString('en-IN')} total</span>
        </div>

      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Financial Overview Bar Chart */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            <span>Financial Overview (₹)</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.financial_overview}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Amount']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                />
                <Bar dataKey="amount" fill="#10B981" radius={[8, 8, 0, 0]}>
                  {charts.financial_overview?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#3B82F6' : index === 1 ? '#10B981' : '#EF4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Customer Types Pie Chart */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            <span>Customer Distribution</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.customer_types}
                  dataKey="count"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => `${entry.label}: ${entry.count}`}
                >
                  {charts.customer_types?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Project Status Table Summary */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-emerald-400" />
          <span>Project Status Pipeline</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {charts.project_status?.map((item) => (
            <div key={item.status} className="p-3 bg-slate-800/80 border border-slate-700/60 rounded-xl text-center space-y-1">
              <span className="text-[11px] text-slate-400 block font-medium truncate">{item.label}</span>
              <span className="text-xl font-bold text-emerald-400 block">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
