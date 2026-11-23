import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { servicesData } from '../data/servicesData';
import { departmentsData } from '../data/departmentsData';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { Clock, ChevronLeft, Filter, Stethoscope, ArrowLeft } from 'lucide-react';

export default function ServicesListPage() {
  const { lang } = useLanguage();
  const [activeDept, setActiveDept] = useState('all');

  const filtered =
    activeDept === 'all'
      ? servicesData
      : servicesData.filter((s) => s.departmentId === activeDept);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-700 text-white py-14 sm:py-18">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-5">
            <Stethoscope className="w-4 h-4 text-gold-300" />
            <span className="text-xs font-bold text-gold-200">خدمات نوديسك الطبية</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">الخدمات والإجراءات الطبية</h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto">
            جميع الخدمات الاستشارية، الجراحية، التأهيلية والصيدلانية التي نقدمها في صرح نوديسك
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{ label: 'الخدمات الطبية' }]} />

        {/* Filter Tabs */}
        <div className="py-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveDept('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeDept === 'all'
                  ? 'bg-primary-700 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Filter className="w-3.5 h-3.5 inline ml-1" />
              جميع الخدمات ({servicesData.length})
            </button>
            {departmentsData.map((dept) => {
              const count = servicesData.filter((s) => s.departmentId === dept.id).length;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveDept(dept.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeDept === dept.id
                      ? 'bg-primary-700 text-white shadow-md'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {dept.nameAr.replace('نوديسك ', '').substring(0, 25)}
                  <span className="mr-1 text-[10px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <section className="pb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((svc) => (
              <Link
                key={svc.id}
                to={`/services/${svc.slug}`}
                className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-primary-300 dark:hover:border-secondary-700 transition-all hover:-translate-y-1"
              >
                <div className="h-40 relative overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {svc.featured && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-gold-500 text-white text-[10px] font-black">
                      ★ مميزة
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/40 backdrop-blur text-white text-[10px] font-bold">
                    {svc.departmentName}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2 group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors line-clamp-2">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {svc.shortDesc}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {svc.durationNote}
                    </span>
                    <span className="text-xs font-bold text-primary-600 dark:text-secondary-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                      التفاصيل <ChevronLeft className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400 dark:text-slate-500">
              <p className="text-sm">لا توجد خدمات في هذا القسم حالياً</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
