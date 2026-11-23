import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ServiceCard({ service, isSpecialization = false }) {
  // Dynamically resolve icon from lucide-react with fallback
  const iconName = service.icon || service.iconName || 'Activity';
  const IconComponent = Icons[iconName] || Icons.Activity;

  const linkTo = isSpecialization 
    ? `/specializations#${service.id}` 
    : `/services#${service.id}`;

  return (
    <div className="group relative bg-white dark:bg-slate-900 transition-colors rounded-2xl border border-slate-200 dark:border-slate-800/90 p-6 sm:p-7 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
      {/* Top accent gradient border on hover */}
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-primary-700 via-secondary-400 to-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div>
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center group-hover:bg-primary-700 group-hover:text-white transition-colors duration-300 shadow-sm">
            <IconComponent className="w-7 h-7" />
          </div>

          {service.badge && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold-50 text-gold-700 border border-gold-200">
              {service.badge}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-700 transition-colors">
          {service.title}
        </h3>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
          {service.summary || service.shortDescription}
        </p>

        {/* Feature bullets or treatment types */}
        {(service.features || service.treatmentTypes) && (
          <div className="space-y-2 mb-6 pt-3 border-t border-slate-100">
            {(service.features || service.treatmentTypes).slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-secondary-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={linkTo}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-gold-600 transition-colors"
        >
          <span>المزيد من التفاصيل</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </Link>
        
        <Link
          to="/contact"
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-primary-700 hover:text-white font-medium transition-colors"
        >
          طلب استشارة
        </Link>
      </div>
    </div>
  );
}
