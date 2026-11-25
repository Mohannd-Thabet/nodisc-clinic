import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, ArrowRight, Stethoscope } from 'lucide-react';
import { departmentsData } from '../../data/departmentsData';
import { useLanguage } from '../../context/LanguageContext';
import SequentialCarousel from '../common/SequentialCarousel';

export default function DepartmentsCarouselSection() {
  const { lang, isRtl } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-secondary-400 border border-primary-200 dark:border-primary-800 text-xs font-bold mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'وحدات المركز التخصصية' : 'Specialized Medical Units'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isAr ? 'الأقسام الطبية المتخصصة' : 'Specialized Medical Departments'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
              {isAr
                ? 'منظومة طبية متكاملة تجمع جراحة المخ والأعصاب، علاج الألم التداخلي، التأهيل الحركي، وصيدلية نوديسك.'
                : 'An integrated medical system uniting neurosurgery, interventional pain management, physical rehabilitation, and NODISC pharmacy.'}
            </p>
          </div>
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-primary-700 dark:text-secondary-400 hover:bg-primary-700 hover:text-white font-bold text-xs shadow-sm transition-all self-start"
          >
            <span>{isAr ? 'استعراض جميع الأقسام' : 'Explore All Departments'}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <SequentialCarousel
          items={departmentsData}
          autoPlayInterval={4500}
          slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          renderItem={(dept) => (
            <Link
              to={`/departments/${dept.slug}`}
              className="group block bg-slate-50 dark:bg-slate-800/70 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={dept.image || '/assets/images/dept_neurosurgery_suite_1795286629702.jpg'}
                  alt={isAr ? dept.nameAr : dept.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-3 inset-x-3 flex items-center gap-2 text-white text-xs">
                  <span className="inline-flex items-center gap-1.5 bg-primary-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 font-semibold">
                    <Stethoscope className="w-3.5 h-3.5 text-gold-400" />
                    <span className="truncate">{dept.headDoctor}</span>
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors line-clamp-1">
                    {isAr ? dept.nameAr : dept.nameEn}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {dept.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-primary-700 dark:text-secondary-400">
                  <span>{isAr ? 'دخول القسم الطبي' : 'Explore Department'}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </div>
              </div>
            </Link>
          )}
        />
      </div>
    </section>
  );
}
