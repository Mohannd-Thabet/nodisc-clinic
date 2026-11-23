import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';
import { specializations } from '../data/specializations';
import { doctorInfo } from '../data/doctorInfo';
import { useLanguage } from '../context/LanguageContext';
import * as Icons from 'lucide-react';
import { 
  Stethoscope, 
  Search, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2, 
  Calendar, 
  Phone,
  Activity
} from 'lucide-react';

export default function SpecializationsPage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpecializations = specializations.filter((spec) => {
    const matchesSearch = 
      spec.title.includes(searchQuery) ||
      spec.shortDescription.includes(searchQuery) ||
      spec.fullDescription.includes(searchQuery) ||
      spec.treatmentTypes.some(t => t.includes(searchQuery));
    return matchesSearch;
  });

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-soft">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-gold-300 border border-white/15 text-xs font-semibold mb-4">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{isAr ? 'مجالات التخصص الجراحي والعصبي' : 'Surgical & Neurological Specializations'}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black mb-4">
              {isAr ? 'التخصصات الطبية والجراحية' : 'Medical & Surgical Specializations'}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              {isAr
                ? 'يقدم د. محمد عبدالله الجرباني رعاية استشارية وجراحية متقدمة في 13 تخصصاً طبياً دقيقاً في جراحة المخ والأعصاب والعمود الفقري.'
                : 'Dr. Mohammed Abdullah Al-Jarbani provides advanced consultation and surgical care across 13 precise medical specializations in brain, neurology, and spine surgery.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search bar & count */}
        <div className="bg-white dark:bg-slate-900 transition-colors rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800/90 shadow-soft mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث عن تخصص، أو حالة طبية معينة...' : 'Search for a specialization or medical condition...'}
              className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm outline-none text-slate-800 dark:text-slate-100 transition-all"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
          </div>

          <div className="text-sm font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <span>{isAr ? 'عدد التخصصات المتاحة:' : 'Available Specializations:'}</span>
            <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-800 font-extrabold text-sm">
              {isAr
                ? `${filteredSpecializations.length} من ${specializations.length} تخصصاً`
                : `${filteredSpecializations.length} of ${specializations.length}`}
            </span>
          </div>
        </div>

        {/* Specializations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpecializations.map((spec, index) => {
            const IconComponent = Icons[spec.iconName] || Icons.Activity;

            return (
              <div
                key={spec.id}
                id={spec.id}
                className="bg-white dark:bg-slate-900 transition-colors rounded-2xl border border-slate-200 dark:border-slate-800/90 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 p-6 sm:p-7 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-700 flex items-center justify-center group-hover:bg-primary-700 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      {isAr ? `تخصص #${index + 1}` : `#${index + 1}`}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-700 transition-colors">
                    {spec.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {spec.fullDescription}
                  </p>

                  {/* Treatments list */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
                    <span className="text-xs font-bold text-slate-500 block uppercase">
                      {isAr ? 'أبرز الحالات والتدخلات:' : 'Key Cases & Interventions:'}
                    </span>
                    {spec.treatmentTypes.map((treatment, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{treatment}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary-700 hover:text-gold-600 transition-colors"
                  >
                    <span>{isAr ? 'طلب حجز استشارة' : 'Request Consultation'}</span>
                    {isAr
                      ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    }
                  </Link>

                  <a
                    href={`tel:${doctorInfo.bookingPhone}`}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-primary-700 hover:text-white font-medium transition-colors"
                  >
                    {isAr ? 'استفسار هاتفي' : 'Call'}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-3xl p-8 sm:p-10 text-center shadow-soft">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
            {isAr ? 'لم تجد حالتك الطبية محددة بالاسم؟' : "Couldn't Find Your Condition?"}
          </h3>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto mb-6">
            {isAr
              ? 'أمراض الجهاز العصبي والعمود الفقري متشعبة ومتنوعة. تواصل معنا لمناقشة حالتك مع منسق العيادة وتحديد الموعد الأنسب للمعاينة.'
              : 'Neurological and spinal conditions are vast and varied. Contact us to discuss your case with the clinic coordinator and schedule the best time for an examination.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-sm shadow transition-colors"
            >
              {isAr ? 'حجز موعد استشارة' : 'Book Consultation'}
            </Link>
            <a
              href={`tel:${doctorInfo.bookingPhone}`}
              className="px-6 py-3 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors"
            >
              {isAr ? `اتصال مباشر: ${doctorInfo.bookingPhone}` : `Call: ${doctorInfo.bookingPhone}`}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
