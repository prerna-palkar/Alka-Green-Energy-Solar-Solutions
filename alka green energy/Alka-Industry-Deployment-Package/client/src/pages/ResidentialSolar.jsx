import React from 'react';
import { Link } from 'react-router-dom';
import { Home, CheckCircle2, ShieldCheck, Sun, ArrowRight, Phone } from 'lucide-react';
import Accordion from '../components/common/Accordion';
import { BUSINESS_CONFIG } from '../utils/config';

const RESIDENTIAL_FAQS = [
  {
    id: "r1",
    question: "How much roof area is required for a 3 kW or 5 kW solar system?",
    answer: "Generally, approximately 80 to 100 square feet of shadow-free rooftop space is required per kilowatt (kW) of solar panel installation."
  },
  {
    id: "r2",
    question: "Can I connect my residential solar system to the electricity grid?",
    answer: "Yes. Our residential setups are grid-tied with bi-directional net meters installed by the local DISCOM, allowing surplus electricity generated during the day to be exported to the grid."
  },
  {
    id: "r3",
    question: "How do I apply for the PM Surya Ghar government rooftop solar scheme?",
    answer: "Our team assists homeowners with the registration and document uploading on the official PM Surya Ghar National Portal and coordinates site inspection with local DISCOM officials."
  }
];

export default function ResidentialSolar() {
  return (
    <div className="py-12 space-y-16">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              Residential Solar Solutions
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Power Your Home With Clean Rooftop Solar
            </h1>
            <p className="text-slate-300 text-base sm:text-lg">
              Reliable, high-efficiency solar systems designed for bungalows, row houses, and residential apartments across Beed.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/contact" className="px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-bold hover:bg-amber-300 transition-colors">
                Request Free Home Site Survey
              </Link>
              <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Talk to Expert</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Suitable Customers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900">Residential System Overview</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Our residential rooftop solar solutions are customized based on your house orientation, shading factors, and monthly electricity consumption.
            </p>
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-emerald-700">Suitable Property Types:</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Independent bungalows & villas</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dual-story residential homes</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Housing societies & residential apartments</li>
              </ul>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 h-72 lg:h-96">
            <img src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80" alt="Residential Solar Home" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Residential Solar FAQs</h2>
        <Accordion items={RESIDENTIAL_FAQS} />
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-slate-900 text-white py-12 rounded-3xl space-y-4">
        <h3 className="text-2xl font-bold">Ready for Clean Residential Solar Energy?</h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">Get in touch with Alka Green Energy Solar Solutions, Opp. John Deere Tractor Showroom, Jalna Road, Beed.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors">
          <span>Talk to an Expert</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}
