import React, { useState, useEffect } from 'react';
import { getCustomerAnalytics } from '../services/api';
import { ShieldAlert, Database, Cpu, TrendingUp, Users, ShoppingCart, Percent, HelpCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // Request stats from analytics placeholder. Returns null.
        const data = await getCustomerAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error('Error fetching admin statistics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const statsPlaceholders = [
    { name: 'Total Sales', value: '$0.00', icon: TrendingUp, detail: 'MySQL sum(order_total) query target' },
    { name: 'Total Orders', value: '0', icon: ShoppingCart, detail: 'MySQL count(orders) query target' },
    { name: 'Total Customers', value: '0', icon: Users, detail: 'MySQL count(users) query target' },
    { name: 'Cart Abandonment Rate', value: '0.0%', icon: Percent, detail: 'Funnel bounce ML query target' }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-indigo-600" />
            Admin Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">ShopAI analytics center and predictive intelligence settings.</p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-full text-xs font-semibold">
          <Database className="h-3.5 w-3.5" />
          Backend DB: Disconnected
        </div>
      </div>

      {/* Connection Notice */}
      <div className="bg-slate-900 text-white rounded-xl p-6 space-y-3 dark:bg-slate-800 border border-slate-800">
        <div className="flex items-center gap-2 text-amber-400">
          <Cpu className="h-5 w-5 animate-pulse" />
          <h2 className="font-bold text-sm">FastAPI & SQLite/MySQL Integration Node</h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          The analytics and machine-learning dashboards are currently offline. In a production build, the frontend communicates with FastAPI endpoints to query sales indices, aggregate shopper metrics from the MySQL schema, and poll active ML predictions.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
            FastAPI: /api/admin/analytics
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
            FastAPI: /api/predict/abandonment
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
            FastAPI: /api/predict/purchase
          </span>
        </div>
      </div>

      {/* Main Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsPlaceholders.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="border border-slate-205 dark:border-slate-800 rounded-lg p-5 bg-white dark:bg-slate-900 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">{stat.name}</span>
                <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              </div>
              <div className="text-2xl font-black text-slate-800 dark:text-white">
                {stat.value}
              </div>
              <div className="text-[10px] text-slate-400 italic">
                {stat.detail}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI / ML Prediction Systems preparation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Purchase Propensity ML Panel */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 p-6 space-y-4">
          <div className="flex items-center gap-2 text-indigo-650 dark:text-indigo-400 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Cpu className="h-5 w-5" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">Customer Predictions (ML Purchase Propensity)</h3>
          </div>
          <div className="text-center py-6 space-y-3 bg-slate-50 dark:bg-slate-950 rounded border border-slate-150/40 dark:border-slate-850">
            <HelpCircle className="h-8 w-8 text-slate-350 dark:text-slate-655 mx-auto" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Conversion Models Offline</p>
              <p className="text-[10px] text-slate-450 max-w-xs mx-auto">
                No active session logs found. Propensity metrics will display when connected to the XGBoost classification model endpoint.
              </p>
            </div>
            <div className="inline-flex text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-mono">
              predictPurchase(userId, productId)
            </div>
          </div>
        </div>

        {/* Abandonment Optimization Panel */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 p-6 space-y-4">
          <div className="flex items-center gap-2 text-indigo-650 dark:text-indigo-400 pb-3 border-b border-slate-100 dark:border-slate-800">
            <TrendingUp className="h-5 w-5" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">Revenue Opportunities</h3>
          </div>
          <div className="text-center py-6 space-y-3 bg-slate-50 dark:bg-slate-950 rounded border border-slate-150/40 dark:border-slate-850">
            <HelpCircle className="h-8 w-8 text-slate-350 dark:text-slate-655 mx-auto" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Funnel Analytics Offline</p>
              <p className="text-[10px] text-slate-450 max-w-xs mx-auto">
                Cart abandonment risk values require trained regression calculations fed by the active checkout state pipelines.
              </p>
            </div>
            <div className="inline-flex text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-mono">
              predictCartAbandonment(cartData)
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
