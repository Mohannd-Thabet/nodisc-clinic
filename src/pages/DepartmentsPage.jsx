import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { departmentsData } from '../data/departmentsData';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { ArrowLeft, Users, Clock, MapPin, ChevronLeft, Building2 } from 'lucide-react';

export default function DepartmentsPage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-700 text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-secondary-400/20 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-5">
            <Building2 className="w-4 h-4 text-gold-300" />
            <span className="text-xs font-bold text-gold-200">
              {isAr ? 'صرح نوديسك الطبي المتكامل' : 'NODISC Integrated Medical Complex'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4">
            {isAr ? 'الأقسام الطبية التخصصية' : 'Specialized Medical Departments'}
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'أربعة أقسام متكاملة تحت إشراف استشاري متعدد التخصصات لتقديم رعاية شاملة من التشخيص والعلاج التحفظي إلى الجراحة الميكروسكوبية والتأهيل الحركي'
              : 'Four integrated departments under a multi-specialty consultant providing comprehensive care from diagnosis and conservative treatment to microscopic surgery and motor rehabilitation'}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{ label: isAr ? 'الأقسام الطبية' : 'Medical Departments' }]} />

        {/* Departments Grid */}
        <section className="py-10 space-y-8">
          {departmentsData.map((dept, idx) => (
            <Link
              key={dept.id}
              to={`/departments/${dept.slug}`}
              className="group block bg-white dark:bg-slate-900 rounded-3xl shadow-md hover:shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-2/5 lg:w-1/3 h-56 md:h-auto relative overflow-hidden">
                  <img
                    src={dept.image}
                    alt={isAr ? dept.nameAr : dept.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/assets/full_logo.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
                  <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold border border-white/30">
                      {isAr
                        ? `قسم ${idx + 1} من ${departmentsData.length}`
                        : `Dept ${idx + 1} of ${departmentsData.length}`}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 sm:p-7 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors">
                      {isAr ? dept.nameAr : dept.nameEn}
                    </h2>
                    <p className="text-xs text-primary-600 dark:text-secondary-400 font-semibold mb-3" dir="ltr">
                      {dept.nameEn}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {dept.shortDesc}
                    </p>

                    {/* Scope Preview */}
                    <div className="space-y-1.5 mb-4">
                      {dept.scopeItems.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-secondary-400 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                      {dept.scopeItems.length > 3 && (
                        <span className="text-xs text-primary-600 dark:text-secondary-400 font-semibold">
                          {isAr
                            ? `+ ${dept.scopeItems.length - 3} خدمات أخرى...`
                            : `+ ${dept.scopeItems.length - 3} more services...`}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {dept.headDoctor}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 dark:text-secondary-400 group-hover:gap-2.5 transition-all">
                      <span>{dept.ctaLabel}</span>
                      <ChevronLeft className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* CTA Section */}
        <section className="pb-16 text-center">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/50 dark:to-secondary-950/50 rounded-3xl p-8 sm:p-12 border border-primary-100 dark:border-primary-900">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
              {isAr ? 'لا تعرف أي قسم يناسب حالتك؟' : "Not sure which department suits your condition?"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 max-w-lg mx-auto">
              {isAr
                ? 'احجز موعد استشارة أولية مع الدكتور محمد الجرباني وسيتم توجيهك للقسم المناسب بعد التقييم السريري الدقيق'
                : 'Book an initial consultation with Dr. Mohammed Al-Jarbani and you will be directed to the appropriate department after a thorough clinical evaluation'}
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary-700 to-secondary-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>{isAr ? 'احجز موعد استشارة' : 'Book a Consultation'}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
