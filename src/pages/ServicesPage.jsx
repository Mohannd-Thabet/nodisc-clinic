import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';
import { services } from '../data/services';
import { doctorInfo } from '../data/doctorInfo';
import * as Icons from 'lucide-react';
import { 
  CheckCircle2, 
  Calendar, 
  MessageCircle, 
  AlertCircle, 
  Sparkles, 
  Stethoscope 
} from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-soft">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-slate-900 transition-colors/10 text-gold-300 border border-white/15 text-xs font-semibold mb-4">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>رعاية جراحية وطبية متكاملة</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black mb-4">
              الخدمات الطبية والجراحية
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              تفصيل شامل للخدمات والتدخلات الجراحية والعلاجية المتقدمة التي يقدمها الدكتور محمد عبدالله الجرباني في مراكز وعيادات صنعاء والحديدة.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {services.map((service, index) => {
          const IconComponent = Icons[service.icon] || Icons.Activity;
          const isEven = index % 2 === 1;

          return (
            <section
              key={service.id}
              id={service.id}
              className="bg-white dark:bg-slate-900 transition-colors rounded-3xl p-8 sm:p-10 lg:p-12 border border-slate-200 dark:border-slate-800/90 shadow-soft transition-all duration-300 hover:shadow-card-hover"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left/Right Column: Icon and Features */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : ''} space-y-6`}>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-200/70 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-primary-700 text-white flex items-center justify-center shadow-md">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-white dark:bg-slate-900 transition-colors text-primary-800 shadow-sm border border-primary-200">
                        {service.badge}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                      ما تشمله هذه الخدمة الطبية:
                    </h4>

                    <div className="space-y-2.5">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preparation Tip Box */}
                  {service.preparationTip && (
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-900 leading-relaxed">
                        <strong className="block font-bold mb-0.5 text-amber-950">إرشاد مهم للمريض:</strong>
                        {service.preparationTip}
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Content Column */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : ''} space-y-5`}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold-400"></span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      الخدمة رقم {index + 1}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {service.title}
                  </h2>

                  <p className="text-base sm:text-lg font-semibold text-secondary-700 leading-relaxed">
                    {service.summary}
                  </p>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-sm shadow transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-gold-300" />
                      <span>حجز موعد لهذه الخدمة</span>
                    </Link>

                    <a
                      href={`https://wa.me/${doctorInfo.whatsappPhone}?text=${encodeURIComponent(
                        `مرحباً د. محمد الجرباني، أود الاستفسار عن خدمة: ${service.title}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>استفسار واتساب</span>
                    </a>
                  </div>
                </div>

              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
