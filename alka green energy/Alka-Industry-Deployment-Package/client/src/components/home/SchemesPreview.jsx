import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { GOVERNMENT_SCHEMES_DATA } from '../../data/mockSchemes';

export default function SchemesPreview() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="space-y-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/20 px-3.5 py-1.5 rounded-full border border-amber-500/30 inline-block">
              Government Policy Framework
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              PM Surya Ghar Yojana & Rooftop Subsidies
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Explore national and state rooftop solar initiatives providing framework guidelines, grid net-metering integration, and central financial assistance for residential solar installations.
            </p>

            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Standardized DISCOM net-metering approval workflow</span>
              </li>
              <li className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Guidance on official portal paperwork and vendor empanelment</span>
              </li>
              <li className="flex items-center gap-3">
                <ExternalLink className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Direct portal links for official state DISCOM applications</span>
              </li>
            </ul>

            <div className="pt-4">
              <Link
                to="/government-schemes"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-lg transition-all"
              >
                <span>Read Full Govt Schemes Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column Card Showcase */}
          <div className="space-y-4">
            {GOVERNMENT_SCHEMES_DATA.schemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 hover:border-emerald-400/50 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{scheme.name}</h3>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-amber-400/20 px-2 py-0.5 rounded">
                    Official Scheme
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-4">{scheme.summary}</p>
                <div className="text-xs text-emerald-300 font-medium flex items-center gap-1">
                  <span>Authority: {scheme.authority}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
