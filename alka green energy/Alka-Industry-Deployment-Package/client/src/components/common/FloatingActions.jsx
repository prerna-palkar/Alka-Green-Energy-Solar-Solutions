import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../utils/config';

export default function FloatingActions() {
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent('Hello Alka Green Energy Solar Solutions, I would like to inquire about solar installation.')}`;
  const phoneUrl = `tel:${BUSINESS_CONFIG.phoneRaw}`;

  return (
    <div className="fixed bottom-6 left-6 z-30 flex flex-col gap-3 group">
      {/* Floating Call Button */}
      <a
        href={phoneUrl}
        aria-label="Call Alka Green Energy Solar Solutions"
        title="Call Us Now"
        className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:bg-emerald-700 hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Alka Green Energy"
        title="Chat on WhatsApp"
        className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 animate-bounce-subtle"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
