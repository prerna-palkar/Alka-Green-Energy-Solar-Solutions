import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building2, Factory, ArrowRight, Check } from 'lucide-react';

export default function Services() {
  return (
    <div className="py-12 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
          Solar Services Overview
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
          Turnkey Solar Power Solutions
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          We engineer, supply, install, and service rooftop solar photovoltaic systems for homes, businesses, and industrial plants in Beed.
        </p>
      </section>

      {/* Services Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Residential */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-amber-300 flex items-center justify-center">
              <Home className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Residential Rooftop Solar</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Designed for individual homeowners, row houses, and residential societies wanting to cut monthly electricity costs with grid-connected solar power.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Bi-directional net-metering integration</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Support for PM Surya Ghar scheme documentation</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Heavy-duty corrosion-resistant rooftop mounting</li>
            </ul>
            <div className="pt-2">
              <Link to="/services/residential" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800">
                <span>View Residential Specifications</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="h-64 lg:h-80 rounded-2xl overflow-hidden border border-slate-200">
            <img src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80" alt="Residential Solar" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Commercial */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="h-64 lg:h-80 rounded-2xl overflow-hidden border border-slate-200 order-2 lg:order-1">
            <img src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80" alt="Commercial Solar" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-4 order-1 lg:order-2">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Commercial Solar Systems</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Targeted for commercial stores, hospitals, educational institutions, and shopping complexes seeking to offset high daytime electrical tariffs.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Tailored array design based on daily load profile</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Accelerated tax depreciation guidance</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> High-voltage protection and safety switches</li>
            </ul>
            <div className="pt-2">
              <Link to="/services/commercial" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800">
                <span>View Commercial Specifications</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Industrial */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center">
              <Factory className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Industrial Solar Power Plants</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              High-capacity solar setups for manufacturing plants, textile units, cold storages, and agricultural processing factories.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Designed for 3-phase high voltage connected load</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Heavy wind load rated roof mounting structures</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Remote performance logging telemetry</li>
            </ul>
            <div className="pt-2">
              <Link to="/services/industrial" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800">
                <span>View Industrial Specifications</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="h-64 lg:h-80 rounded-2xl overflow-hidden border border-slate-200">
            <img src="https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80" alt="Industrial Solar" className="w-full h-full object-cover" />
          </div>
        </div>

      </section>
    </div>
  );
}
