import React from 'react';
import { Link } from 'react-router-dom';
import { Factory, CheckCircle2, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import Accordion from '../components/common/Accordion';
import { BUSINESS_CONFIG } from '../utils/config';

const INDUSTRIAL_FAQS = [
  {
    id: "i1",
    question: "Can industrial solar systems support 3-phase machinery electrical loads?",
    answer: "Yes. Industrial solar power installations are integrated with 3-phase grid inverters that synchronize with heavy machinery requirements."
  },
  {
    id: "i2",
    question: "What mounting structures are used for industrial metal roof sheds?",
    answer: "We use specialized aluminum / galvanized iron clamp structures tailored to corrugated or trapezoidal industrial roof sheets without compromising roof waterproofing."
  }
];

export default function IndustrialSolar() {
  return (
    <div className="py-12 space-y-16">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              Industrial Solar Solutions
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              High-Capacity Solar Plants for Industry
            </h1>
            <p className="text-slate-300 text-base sm:text-lg">
              Engineered solar power solutions for manufacturing factories, agro-processing units, and warehouses in Beed MIDC and surrounding areas.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/contact" className="px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-bold hover:bg-amber-300 transition-colors">
                Request Industrial Feasibility Survey
              </Link>
              <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Talk to Industrial Consultant</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Scope */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900">Industrial System Engineering</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Our industrial engineering workflow covers shadow profiling, 3-phase load synchronization, safety walkways, and remote SCADA performance tracking.
            </p>
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-emerald-700">Industrial Sectors Served:</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Agro-processing & ginning mills</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Cold storage facilities & warehousing sheds</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Manufacturing units & fabrication workshops</li>
              </ul>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 h-72 lg:h-96">
            <img src="https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=1000&q=80" alt="Industrial Solar Plant" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Industrial Solar FAQs</h2>
        <Accordion items={INDUSTRIAL_FAQS} />
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-slate-900 text-white py-12 rounded-3xl space-y-4">
        <h3 className="text-2xl font-bold">Schedule an On-Site Technical Audit</h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">Contact Alka Green Energy Solar Solutions, Opp. John Deere Tractor Showroom, Jalna Road, Beed.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors">
          <span>Talk to an Expert</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}
