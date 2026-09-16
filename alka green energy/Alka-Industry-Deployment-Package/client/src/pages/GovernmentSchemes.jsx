import React, { useState } from 'react';
import { GOVERNMENT_SCHEMES_DATA } from '../data/mockSchemes';
import { ShieldCheck, FileCheck, CheckCircle2, ExternalLink, Info, HelpCircle } from 'lucide-react';

export default function GovernmentSchemes() {
  const [selectedScheme, setSelectedScheme] = useState(GOVERNMENT_SCHEMES_DATA.schemes[0]);

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
          Government Guidelines & Subsidies
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
          Rooftop Solar Schemes Guide
        </h1>
        <p className="text-slate-600 text-base">
          Understand government policy frameworks, net-metering regulations, and official DISCOM application workflows.
        </p>

        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-xs text-emerald-900 flex items-center gap-2 max-w-2xl mx-auto">
          <Info className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Financial subsidy eligibility and DISCOM technical sanctions are determined according to official Ministry and MSEDCL norms.</span>
        </div>
      </div>

      {/* Scheme Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-4 border-b border-slate-200 pb-4">
        {GOVERNMENT_SCHEMES_DATA.schemes.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => setSelectedScheme(scheme)}
            className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${
              selectedScheme.id === scheme.id
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {scheme.name}
          </button>
        ))}
      </div>

      {/* Selected Scheme Detail Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10">
        
        {/* Title & Authority Banner */}
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded">
            Authority: {selectedScheme.authority}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{selectedScheme.name}</h2>
          <p className="text-slate-600 text-sm leading-relaxed">{selectedScheme.summary}</p>
        </div>

        {/* 2 Column: Eligibility & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Eligibility Criteria */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Eligibility Criteria</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              {selectedScheme.eligibility.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Overview */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-amber-500" />
              <span>Key Benefits & Framework</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              {selectedScheme.benefitsOverview.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Required Documents */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Required Documents Checklist</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectedScheme.requiredDocuments.map((doc, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs text-xs font-medium text-slate-800 flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                  {idx + 1}
                </div>
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="space-y-6 pt-4 border-t border-slate-100">
          <h3 className="text-xl font-bold text-slate-900">Step-by-Step Application Process</h3>
          <div className="space-y-3">
            {selectedScheme.applicationSteps.map((step) => (
              <div key={step.step} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-300 font-bold flex items-center justify-center shrink-0">
                  0{step.step}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Information Links */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
          <h4 className="font-bold text-sm text-amber-400">Official Government Links</h4>
          <div className="flex flex-wrap gap-4">
            {selectedScheme.officialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <span>{link.label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
