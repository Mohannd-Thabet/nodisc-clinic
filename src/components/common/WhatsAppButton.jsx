import React from 'react';
import { MessageCircle } from 'lucide-react';
import { doctorInfo } from '../../data/doctorInfo';

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${doctorInfo.whatsappPhone}?text=${encodeURIComponent(doctorInfo.whatsappMessage)}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب للحجز والاستفسار"
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="hidden sm:inline-block font-semibold text-sm">
          حجز واتساب سريع
        </span>
      </a>
      
      {/* Tooltip for mobile */}
      <span className="absolute -top-10 left-0 bg-slate-900 text-white text-xs px-2.5 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none sm:hidden">
        تواصل مباشرة عبر واتساب
      </span>
    </div>
  );
}
