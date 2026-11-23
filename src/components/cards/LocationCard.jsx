import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Navigation, CheckCircle } from 'lucide-react';

export default function LocationCard({ location }) {
  const whatsappUrl = `https://wa.me/${location.whatsapp}?text=${encodeURIComponent(
    `مرحباً د. محمد الجرباني، أود الاستفسار عن مواعيد الحجز في: ${location.name}`
  )}`;

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="p-6 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white relative">
          {location.isPrimary && (
            <span className="absolute top-4 left-4 bg-gold-400 text-slate-900 dark:text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              العيادة الرئيسية
            </span>
          )}

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-900 transition-colors/20 text-white">
              {location.city}
            </span>
          </div>

          <h3 className="text-xl font-bold leading-tight">
            {location.name}
          </h3>
          <p className="text-xs text-slate-200 mt-1">
            {location.district}
          </p>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4">
          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">العنوان التفصيلي</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                {location.address}
              </p>
              {location.landmark && (
                <span className="text-xs text-secondary-600 block mt-1">
                  علامة مميزة: {location.landmark}
                </span>
              )}
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">أوقات العمل والمعاينة</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {location.workingHours}
              </p>
              <span className="text-xs text-slate-400 italic block mt-0.5">
                {location.hoursNote}
              </span>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">هاتف وتنسيق الحجز</span>
              <a
                href={`tel:${location.phone}`}
                dir="ltr"
                className="text-base font-bold text-primary-700 hover:text-gold-600 transition-colors inline-block"
              >
                {location.phone}
              </a>
            </div>
          </div>

          {/* Available services at this location */}
          {location.servicesAvailable && (
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 block mb-2">الخدمات المتاحة بالموقع:</span>
              <div className="flex flex-wrap gap-1.5">
                {location.servicesAvailable.map((srv, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700"
                  >
                    <CheckCircle className="w-3 h-3 text-secondary-600" />
                    <span>{srv}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Google Maps Interactive Placeholder */}
          <div className="pt-2">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 h-32 flex flex-col items-center justify-center text-center p-3 group">
              {/* Stylized map grid simulation */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md mb-1 animate-bounce">
                  <Navigation className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700">
                  موقع العيادة على الخريطة
                </span>
                <span className="text-[11px] text-slate-500">
                  (مكان مخصص لخريطة Google Maps التفاعلية)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-6 pt-0 grid grid-cols-2 gap-3">
        <a
          href={`tel:${location.phone}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white text-xs sm:text-sm font-semibold transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>اتصال مباشر</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>واتساب الموقع</span>
        </a>
      </div>
    </div>
  );
}
