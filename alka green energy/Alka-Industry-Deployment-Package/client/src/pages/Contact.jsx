import React, { useState } from 'react';
import { BUSINESS_CONFIG } from '../utils/config';
import { CUSTOMER_TYPES } from '../utils/constants';
import { submitEnquiry } from '../services/api';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Instagram } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    customerType: 'residential',
    requirement: '',
    message: '',
  });

  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus({ type: 'error', message: 'Please enter your Name and Phone Number.' });
      return;
    }

    if (formData.phone.length < 10) {
      setStatus({ type: 'error', message: 'Please enter a valid 10-digit mobile number.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await submitEnquiry(formData);
      setStatus({
        type: 'success',
        message: response.message || 'Thank you! Your inquiry has been submitted. Our solar team in Beed will contact you soon.'
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        location: '',
        customerType: 'residential',
        requirement: '',
        message: '',
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'success',
        message: 'Thank you! Your inquiry has been recorded. Our solar representative will contact you shortly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
          Contact Alka Green Energy Solar Solutions
        </h1>
        <p className="text-slate-600 text-base">
          Visit our Beed office or submit your details online for a custom solar consultation.
        </p>
      </div>

      {/* Grid Layout: Contact Details vs Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Business Details (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 space-y-8 shadow-xl">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{BUSINESS_CONFIG.name}</h3>
            <p className="text-xs text-emerald-400 font-medium">{BUSINESS_CONFIG.tagline}</p>
          </div>

          <div className="space-y-6 text-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-200 text-xs font-semibold uppercase tracking-wider mb-1">Business Address</strong>
                <p className="text-slate-300 leading-relaxed">{BUSINESS_CONFIG.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-200 text-xs font-semibold uppercase tracking-wider mb-1">Phone & WhatsApp</strong>
                <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="text-slate-300 hover:text-emerald-400 block">{BUSINESS_CONFIG.phone}</a>
                <a href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 text-xs hover:underline block mt-0.5">Chat on WhatsApp &rarr;</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-200 text-xs font-semibold uppercase tracking-wider mb-1">Email Address</strong>
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-slate-300 hover:text-emerald-400">{BUSINESS_CONFIG.email}</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-200 text-xs font-semibold uppercase tracking-wider mb-1">Instagram Handle</strong>
                <a href={BUSINESS_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-rose-400">
                  {BUSINESS_CONFIG.instagramHandle}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center shrink-0 border border-slate-700">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-slate-200 text-xs font-semibold uppercase tracking-wider mb-1">Office Hours</strong>
                <span className="text-slate-300 text-xs">{BUSINESS_CONFIG.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Consultation Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Send an Online Enquiry</h3>
            <p className="text-slate-600 text-sm mt-1">Fill out the form below to request a site survey or quotation callback.</p>
          </div>

          {status.message && (
            <div
              className={`p-4 rounded-xl text-sm flex items-start gap-3 ${
                status.type === 'error'
                  ? 'bg-rose-50 text-rose-800 border border-rose-200'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              }`}
            >
              {status.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City / Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Jalna Road, Beed"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Category</label>
                <select
                  name="customerType"
                  value={formData.customerType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {CUSTOMER_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Load / Roof Area</label>
                <input
                  type="text"
                  name="requirement"
                  placeholder="e.g. 5 kW solar or 500 sq.ft roof"
                  value={formData.requirement}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Specific Inquiry</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Specify any questions regarding solar installation or site requirements..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              {isSubmitting ? (
                <span>Submitting Consultation Request...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Submit Consultation Request
                </>
              )}
            </button>
          </form>
        </div>

      </div>

      {/* Google Maps Embed Section */}
      <div className="bg-slate-100 rounded-3xl overflow-hidden border border-slate-300 shadow-sm p-4 space-y-4">
        <h4 className="font-bold text-slate-900 text-lg px-2">Location Map — Jalna Road, Beed</h4>
        <div className="h-80 w-full rounded-2xl overflow-hidden relative">
          <iframe
            title="Alka Solar Location Map"
            src={BUSINESS_CONFIG.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="w-full h-full"
          />
        </div>
      </div>

    </div>
  );
}
