import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Calendar, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { useLanguage } from '../../context/LanguageContext';
import SequentialCarousel from '../common/SequentialCarousel';

export default function FeaturedServicesCarouselSection() {
  const { lang, isRtl } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary-50 dark:bg-secondary-950/60 text-secondary-700 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-800 text-xs font-bold mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>{isAr ? 'بروتوكولات التشخيص والعلاج' : 'Diagnostic & Treatment Protocols'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isAr ? 'الخدمات الطبية المختارة' : 'Featured Medical Services'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
              {isAr
                ? 'استشارات وتدخلات جراحية وتأهيلية متخصصة مع إمكانية حجز الخدمة مباشرة.'
                : 'Specialized consultations, surgical interventions, and rehabilitation with direct booking.'}
            </p>
          </div>
          <Link
            to="/services-list"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-primary-700 dark:text-secondary-400 hover:bg-primary-700 hover:text-white font-bold text-xs shadow-sm transition-all self-start"
          >
            <span>{isAr ? 'كافة الخدمات الطبية' : 'All Medical Services'}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <SequentialCarousel
          items={servicesData}
          autoPlayInterval={4200}
          slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          renderItem={(srv, idx) => (
            <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary-400 transition-all duration-300 h-full flex flex-col">
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={srv.image || '/assets/images/dept_neurosurgery_suite_1795286629702.jpg'}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/assets/medical/surgery_micro_1.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Sequential Numbering Badge */}
                <span className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-gold-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
                  <Clock className="w-3 h-3 text-gold-400" />
                  <span>{srv.durationNote}</span>
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="inline-block text-[11px] font-bold text-primary-600 dark:text-secondary-400 bg-primary-50 dark:bg-primary-950/60 px-2.5 py-1 rounded-lg">
                    {srv.departmentName}
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {srv.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <Link
                    to={`/booking?service=${encodeURIComponent(srv.slug)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold-300" />
                    <span>{isAr ? 'حجز الخدمة' : 'Book Service'}</span>
                  </Link>
                  <Link
                    to={`/services/${srv.slug}`}
                    className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-primary-700 dark:hover:text-secondary-400 inline-flex items-center gap-1"
                  >
                    <span>{isAr ? 'التفاصيل' : 'Details'}</span>
                    {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </Link>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}
