import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_CONFIG } from '../utils/config';
import { Sun, Target, Eye, ShieldCheck, Users, Award, MapPin, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="py-12 space-y-16">
      
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              About Alka Green Energy
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Powering Beed With Sustainable Solar Solutions
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Located at Jalna Road, Beed, Alka Green Energy Solar Solutions delivers customized rooftop solar PV systems for residential, commercial, and industrial energy consumers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-amber-300 flex items-center justify-center shadow">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              To provide reliable, high-yield rooftop solar solutions in Beed and nearby districts, enabling households and enterprises to lower electricity expenditures while contributing to environmental sustainability.
            </p>
          </div>

          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center shadow">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              To become a trusted regional solar energy service provider recognized for transparent engineering, compliance with DISCOM grid standards, and dedicated client service.
            </p>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">Our Core Principles</h2>
          <p className="text-slate-600 text-sm">Guided by engineering discipline and client transparency.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-bold text-slate-900 text-base">Structural Quality</h4>
            <p className="text-xs text-slate-600 leading-relaxed">Engineered mounting structures designed for local wind loads and weather resilience.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-bold text-slate-900 text-base">Regulatory Compliance</h4>
            <p className="text-xs text-slate-600 leading-relaxed">Assistance with DISCOM net-metering approvals and government scheme documentation.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-bold text-slate-900 text-base">Customer Support</h4>
            <p className="text-xs text-slate-600 leading-relaxed">Dedicated consultation from pre-installation survey to system handover and monitoring.</p>
          </div>
        </div>
      </section>

      {/* Team Placeholder Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Leadership & Engineering Team</h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            [Client Placeholder]: Team profiles and engineering bios will be populated once confirmed by client management.
          </p>
        </div>
      </section>

      {/* Certifications Placeholder Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Empanelment & Certifications</h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            [Client Placeholder]: Official DISCOM empanelments, licenses, and accreditation certificates will be listed here upon receipt of verified documentation.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Have Questions About Installing Solar?</h3>
          <p className="text-emerald-100 text-sm max-w-xl mx-auto">Visit our Beed office opposite John Deere Tractor Showroom on Jalna Road or reach out online.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-bold hover:bg-amber-300 transition-colors">
            <span>Contact Us Today</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
