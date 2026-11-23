import React, { useState } from 'react';
import SectionTitle from '../components/common/SectionTitle';
import LocationCard from '../components/cards/LocationCard';
import { locations } from '../data/locations';
import { doctorInfo } from '../data/doctorInfo';
import { MapPin, Phone, MessageCircle, AlertCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LocationsPage() {
  const [selectedCity, setSelectedCity] = useState('all');

  const filteredLocations = selectedCity === 'all'
    ? locations
    : locations.filter((loc) => loc.city === selectedCity);

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-soft">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-slate-900 transition-colors/10 text-gold-300 border border-white/15 text-xs font-semibold mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>مواقع العيادات والمراكز</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black mb-4">
              العيادات والمواقع المعتمدة
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              يستقبل الدكتور محمد عبدالله الجرباني مرضاه في عدة مراكز طبية مجهزة في العاصمة صنعاء ومحافظة الحديدة لضمان سهولة الوصول وتوفير الرعاية الأقرب إليكم.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* City Filter Tabs */}
        <div className="bg-white dark:bg-slate-900 transition-colors rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800/90 shadow-soft mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-700 ml-2">تصفية حسب المدينة:</span>
            {[
              { id: 'all', label: 'كافة المواقع (4)' },
              { id: 'صنعاء', label: 'صنعاء (3 مراكز)' },
              { id: 'الحديدة', label: 'الحديدة (مركز 1)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCity(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCity === tab.id
                    ? 'bg-primary-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>يُنصح دوماً بالحجز وتأكيد الموعد مسبقاً قبل التوجه للعيادة</span>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>

        {/* General Direct Booking Callout */}
        <div className="mt-16 bg-white dark:bg-slate-900 transition-colors rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800/90 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                مركز الاتصال والتنسيق الموحد
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                لكافة استفسارات المواعيد، تأكيد توفر الطبيب في أي من فروع صنعاء أو الحديدة، أو ترتيب الحالات الطارئة، يمكنكم التواصل مباشرة مع خط الحجز الموحد.
              </p>
              <div className="flex items-center gap-2 text-primary-700 font-extrabold text-lg sm:text-xl pt-1">
                <Phone className="w-5 h-5 text-gold-500" />
                <span dir="ltr">784545908</span>
                <span className="text-xs font-normal text-slate-500">(هاتف / واتساب)</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-sm shadow transition-colors"
              >
                <Calendar className="w-4 h-4 text-gold-300" />
                <span>حجز موعد عبر النموذج</span>
              </Link>
              <a
                href={`https://wa.me/${doctorInfo.whatsappPhone}?text=${encodeURIComponent(doctorInfo.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>محادثة واتساب مباشرة</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
