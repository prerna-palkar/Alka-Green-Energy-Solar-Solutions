import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, MapPin, Phone, Mail, Instagram, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../utils/config';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-amber-400 shadow-lg">
                <Sun className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <span className="text-lg font-bold text-white block leading-tight">
                  ALKA GREEN ENERGY
                </span>
                <span className="text-[10px] tracking-widest font-bold text-amber-400 uppercase block">
                  SOLAR SOLUTIONS
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your trusted partner for high-efficiency rooftop solar installations in Beed and surrounding regions. Clean energy solutions for residential, commercial, and industrial clients.
            </p>
            
            {/* Instagram Social Badge */}
            <a
              href={BUSINESS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-amber-500/20 text-xs font-medium text-slate-200 hover:border-amber-400/40 hover:text-amber-300 transition-all group"
            >
              <Instagram className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
              <span>Follow {BUSINESS_CONFIG.instagramHandle}</span>
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> Solar Projects
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> Installation Gallery
                </Link>
              </li>
              <li>
                <Link to="/government-schemes" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> Government Solar Schemes
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solar Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Solar Solutions
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services/residential" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Residential Solar Systems</span>
                </Link>
              </li>
              <li>
                <Link to="/services/commercial" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Commercial Solar Rooftops</span>
                </Link>
              </li>
              <li>
                <Link to="/services/industrial" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Industrial Solar Plants</span>
                </Link>
              </li>
              <li className="pt-2">
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs">
                  <span className="text-amber-400 font-semibold block mb-1">PM Surya Ghar Yojana</span>
                  <span className="text-slate-400">Explore rooftop solar subsidies and DISCOM net-metering support.</span>
                  <Link to="/government-schemes" className="text-emerald-400 hover:underline block mt-1 font-medium">Learn details &rarr;</Link>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Address & Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Get In Touch
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  <strong className="text-white block font-medium">Business Address:</strong>
                  {BUSINESS_CONFIG.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="hover:text-emerald-400 transition-colors">
                  {BUSINESS_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-emerald-400 transition-colors">
                  {BUSINESS_CONFIG.email}
                </a>
              </div>
              <div className="pt-2">
                <span className="text-xs text-slate-400 block font-medium mb-1">Working Hours:</span>
                <span className="text-xs bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-emerald-400 inline-block">
                  {BUSINESS_CONFIG.workingHours}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>Opp. John Deere Tractor Showroom, Jalna Road, Beed</span>
            <span>•</span>
            <Link to="/contact" className="hover:text-emerald-400">Privacy Policy & Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
