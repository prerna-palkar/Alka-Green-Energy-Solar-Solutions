import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, CheckCircle2, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import Accordion from '../components/common/Accordion';
import { BUSINESS_CONFIG } from '../utils/config';

const COMMERCIAL_FAQS = [
  {
    id: "c1",
    question: "How does commercial rooftop solar lower daytime operational expenses?",
    answer: "Commercial establishments consume significant electrical energy during daytime hours when solar radiation is highest. By producing solar power directly on-site, businesses offset high grid tariffs."
  },
  {
    id: "c2",
    question: "Can commercial solar installations qualify for tax benefits?",
    answer: "Yes. Eligible commercial solar investments can qualify for accelerated depreciation tax benefits under Indian income tax guidelines."
  }
];

export default function CommercialSolar() {
  return (
    <div className="py-12 space-y-16">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              Commercial Solar Systems
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Reduce Business Energy Overheads
            </h1>
            <p className="text-slate-300 text-base sm:text-lg">
              Scalable rooftop solar installations for commercial complexes, retail stores, hospitals, and educational hubs in Beed.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/contact" className="px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-bold hover:bg-amber-300 transition-colors">
                Request Commercial Consultation
              </Link>
              <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Talk to Commercial Expert</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Suitable Businesses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900">Commercial Solar Scope</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We design commercial solar setups focused on structural durability, maximum daylight yield, and seamless integration with existing commercial distribution boards.
            </p>
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-emerald-700">Suitable Commercial Entities:</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Commercial retail complexes & showrooms</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Private hospitals, clinics & diagnostic centers</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Educational institutes, schools & colleges</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Hotels, banquet halls & office premises</li>
              </ul>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 h-72 lg:h-96">
            <img src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1000&q=80" alt="Commercial Solar Installation" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Commercial Solar FAQs</h2>
        <Accordion items={COMMERCIAL_FAQS} />
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-slate-900 text-white py-12 rounded-3xl space-y-4">
        <h3 className="text-2xl font-bold">Optimize Your Business Energy Strategy</h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">Visit our Beed office opposite John Deere Showroom on Jalna Road or contact our commercial sales team.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors">
          <span>Talk to an Expert</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}
