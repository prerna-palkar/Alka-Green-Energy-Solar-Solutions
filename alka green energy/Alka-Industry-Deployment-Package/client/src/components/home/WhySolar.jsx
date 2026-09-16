import React from 'react';
import { Sun, ShieldCheck, TrendingDown, Leaf, Zap, RefreshCw } from 'lucide-react';

const BENEFITS = [
  {
    icon: Leaf,
    title: "100% Clean & Sustainable",
    desc: "Solar energy reduces carbon footprint by utilizing clean, renewable sunlight freely available year-round."
  },
  {
    icon: TrendingDown,
    title: "Reduced Grid Dependence",
    desc: "Generating your own solar power protects your household or business from escalating electricity tariff hikes."
  },
  {
    icon: ShieldCheck,
    title: "Long-Term Energy Value",
    desc: "Quality photovoltaic solar panels provide dependable operational performance for decades with minimal maintenance."
  },
  {
    icon: Zap,
    title: "Energy Independence",
    desc: "Produce power directly on your own roof, securing reliable energy supply for your daily operational needs."
  }
];

export default function WhySolar() {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Why Transition to Solar?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Empower Your Property With Renewable Energy
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Transitioning to rooftop solar energy brings long-term environmental and financial advantages to homes, stores, and manufacturing facilities across Beed.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-amber-300 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{b.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
