import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building2, Factory, Check, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    id: "residential",
    icon: Home,
    title: "Residential Solar",
    subtitle: "Rooftop Systems for Houses & Bungalows",
    desc: "Custom rooftop solar setups designed for individual homes and residential complexes to reduce domestic electricity expenses.",
    benefits: [
      "Lower monthly domestic electricity bills",
      "Net-metering integration with DISCOM",
      "Eligible for government rooftop solar subsidy",
      "Low maintenance with long panel lifespan"
    ],
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    path: "/services/residential"
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial Solar",
    subtitle: "Rooftop Power for Offices & Retail",
    desc: "Scalable rooftop solar systems that offset heavy daytime electricity consumption for stores, complexes, and office buildings.",
    benefits: [
      "Offset expensive peak commercial power rates",
      "Accelerated depreciation tax benefits",
      "Enhances corporate sustainability profile",
      "Customized steel mounting structures"
    ],
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80",
    path: "/services/commercial"
  },
  {
    id: "industrial",
    icon: Factory,
    title: "Industrial Solar",
    subtitle: "High-Capacity Solar for Factories",
    desc: "Turnkey solar power solutions for manufacturing plants, cold storages, and industrial warehouses with heavy connected loads.",
    benefits: [
      "Designed for high 3-phase electrical loads",
      "Remote SCADA performance telemetry",
      "Protects against grid voltage fluctuations",
      "Optimized ROI for heavy energy consumers"
    ],
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
    path: "/services/industrial"
  }
];

export default function ServiceCards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Our Core Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Comprehensive Solar Solutions
            </h2>
            <p className="text-slate-600 text-base max-w-xl mt-2">
              Engineered for maximum yield, structural safety, and long-term reliability across Beed.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <span>View All Service Specifications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col group"
              >
                {/* Image Banner */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2.5 text-white">
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-amber-300 shadow">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{s.title}</h3>
                      <span className="text-xs text-emerald-300">{s.subtitle}</span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Key Benefits:</span>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {s.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={s.path}
                    className="w-full py-3 px-4 rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
