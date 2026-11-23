import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getServiceBySlug } from '../data/servicesData';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { ArrowLeft, Clock, Stethoscope, CheckCircle2 } from 'lucide-react';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const svc = getServiceBySlug(slug);

  if (!svc) return <Navigate to="/services" replace />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Hero */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={svc.image}
          alt={svc.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-600/80 text-white text-[11px] font-bold mb-2">
              {svc.departmentName}
            </span>
            <h1 className="text-xl sm:text-3xl font-black text-white leading-tight">
              {svc.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: 'الخدمات', to: '/services' },
            { label: svc.title },
          ]}
        />

        <div className="py-8 space-y-8">
          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <Stethoscope className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
              {svc.doctorName}
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <Clock className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
              {svc.durationNote}
            </span>
          </div>

          {/* Short Description */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-3">وصف الخدمة</h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {svc.shortDesc}
            </p>
          </div>

          {/* Detailed Checklist */}
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4">تفاصيل الخدمة</h2>
            <div className="space-y-3">
              {svc.details.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Three Stages */}
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4">مراحل الخدمة</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {svc.stages.map((stage, idx) => (
                <div
                  key={idx}
                  className="relative bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="absolute -top-3 right-5 w-7 h-7 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center text-white text-xs font-black shadow-md">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-2 mb-2">
                    {stage.step}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="pb-16">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/50 dark:to-secondary-950/50 rounded-3xl p-6 sm:p-8 border border-primary-100 dark:border-primary-900 text-center">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">
                هل تحتاج هذه الخدمة؟
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">
                احجز موعدك الآن مع {svc.doctorName} واحصل على التقييم والعلاج المناسب لحالتك
              </p>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary-700 to-secondary-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <span>احجز موعد الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
