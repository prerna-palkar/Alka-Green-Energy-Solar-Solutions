import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/home/HeroSlider';
import WhySolar from '../components/home/WhySolar';
import ServiceCards from '../components/home/ServiceCards';
import ProcessSteps from '../components/home/ProcessSteps';
import SchemesPreview from '../components/home/SchemesPreview';
import ProjectsPreview from '../components/home/ProjectsPreview';
import Accordion from '../components/common/Accordion';
import { MOCK_FAQS } from '../data/mockFaqs';
import { BUSINESS_CONFIG } from '../utils/config';
import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck, Sparkles, Instagram } from 'lucide-react';

export default function Home() {
  const homeFaqs = MOCK_FAQS.slice(0, 4);

  return (
    <div className="space-y-0">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Why Solar? */}
      <WhySolar />

      {/* 3. Services */}
      <ServiceCards />

      {/* 4. Why Choose Alka Green Energy */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Local Expertise in Beed
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Why Choose Alka Green Energy Solar Solutions
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Situated at Jalna Road, Beed, we bring localized engineering focus to solar installations. From individual rooftop bungalows to multi-block commercial facilities, our goal is to deliver durable, high-yield renewable power.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
                  <h4 className="font-bold text-sm text-white mb-1">Quality Engineered Components</h4>
                  <p className="text-xs text-slate-400">Standardized solar modules and grid-tie string inverters for consistent generation.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <Sparkles className="w-6 h-6 text-amber-400 mb-2" />
                  <h4 className="font-bold text-sm text-white mb-1">Turnkey Consultation</h4>
                  <p className="text-xs text-slate-400">Complete assistance covering initial site audit to DISCOM net-metering paperwork.</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl h-80 lg:h-96">
              <img
                src="https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80"
                alt="Alka Green Energy Solar Installation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs text-emerald-400 font-semibold block mb-1">Located at</span>
                <p className="text-sm font-medium text-slate-200">{BUSINESS_CONFIG.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How Solar Installation Works (8 steps) */}
      <ProcessSteps />

      {/* 6. Government Schemes Preview */}
      <SchemesPreview />

      {/* 7. Projects Preview */}
      <ProjectsPreview />

      {/* 8. FAQ Section Teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Got Questions?
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-600 text-sm">Common inquiries regarding rooftop solar systems and grid connections.</p>
          </div>

          <Accordion items={homeFaqs} />

          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <span>View All Frequently Asked Questions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Consultation CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-emerald-700 via-emerald-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Explore Solar for Your Home or Business?
          </h2>
          <p className="text-emerald-100 text-base max-w-2xl mx-auto">
            Contact our solar specialists in Beed today for a comprehensive site assessment and customized consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-lg transition-all"
            >
              Talk to an Expert
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Contact Preview */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                Contact & Location
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">{BUSINESS_CONFIG.name}</h2>
              
              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <strong className="block text-slate-900">Address:</strong>
                    <span>{BUSINESS_CONFIG.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <strong className="block text-slate-900">Phone:</strong>
                    <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="text-emerald-700 hover:underline">{BUSINESS_CONFIG.phone}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="block text-slate-900">Email:</strong>
                    <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-emerald-700 hover:underline">{BUSINESS_CONFIG.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-rose-500 shrink-0" />
                  <div>
                    <strong className="block text-slate-900">Instagram:</strong>
                    <a href={BUSINESS_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                      {BUSINESS_CONFIG.instagramHandle}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-200 rounded-2xl overflow-hidden shadow-md border border-slate-300 h-72 relative flex items-center justify-center text-center p-6">
              <iframe
                title="Location Map"
                src={BUSINESS_CONFIG.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
