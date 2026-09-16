import React from 'react';
import { INSTALLATION_STEPS } from '../../utils/constants';
import { ClipboardList, Search, FileText, CheckCircle, ShieldCheck, Wrench, Activity, Sparkles } from 'lucide-react';

const STEP_ICONS = [
  ClipboardList,
  Search,
  FileText,
  CheckCircle,
  ShieldCheck,
  Wrench,
  Activity,
  Sparkles
];

export default function ProcessSteps() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Turnkey Execution Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            How Solar Installation Works
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Our structured 8-step execution methodology ensures smooth installation, high structural safety, and DISCOM net-metering compliance.
          </p>
        </div>

        {/* 8 Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTALLATION_STEPS.map((stepItem, idx) => {
            const Icon = STEP_ICONS[idx] || ClipboardList;
            return (
              <div
                key={stepItem.step}
                className="relative bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 hover:border-emerald-500/60 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-amber-300 font-bold shadow">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 group-hover:text-emerald-400/40 transition-colors">
                      0{stepItem.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{stepItem.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {stepItem.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <span>Step {stepItem.step} of 8</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
