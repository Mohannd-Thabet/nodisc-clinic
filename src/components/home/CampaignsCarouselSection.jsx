import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, ArrowLeft, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { campaignsData } from '../../data/campaignsData';
import { useLanguage } from '../../context/LanguageContext';
import SequentialCarousel from '../common/SequentialCarousel';

export default function CampaignsCarouselSection() {
  const { lang, isRtl } = useLanguage();
  const isAr = lang === 'ar';

  // Sort campaigns by priority: open -> scheduled -> full/closed
  const sortedCampaigns = useMemo(() => {
    const priority = { open: 1, scheduled: 2, full: 3, closed: 4 };
    return [...campaignsData].sort((a, b) => (priority[a.status] || 99) - (priority[b.status] || 99));
  }, []);

  const getStatusMeta = (status) => {
    switch (status) {
      case 'open':
        return {
          label: isAr ? 'التسجيل مفتوح' : 'Registration Open',
          badgeClass: 'bg-emerald-500/95 text-white border-emerald-400',
        };
      case 'scheduled':
        return {
          label: isAr ? 'مجدولة قريباً' : 'Scheduled Soon',
          badgeClass: 'bg-amber-500/95 text-slate-950 border-amber-400',
        };
      default:
        return {
          label: isAr ? 'اكتملت المقاعد' : 'Seats Full',
          badgeClass: 'bg-slate-700/95 text-slate-200 border-slate-500',
        };
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border-t border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'مبادرات الخدمة المجتمعية' : 'Community Healthcare Initiatives'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isAr ? 'الحملات الطبية والمجانية' : 'Free Medical Campaigns'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
              {isAr
                ? 'أيام طبية مجانية وفحوصات تخصصية بإشراف د. محمد الجرباني وفريق نوديسك مرتبة حسب الأولوية.'
                : 'Free medical days and specialized screenings supervised by Dr. Al-Jarbani & NODISC team, sorted by priority.'}
            </p>
          </div>
          <Link
            to="/campaigns"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-primary-700 dark:text-secondary-400 hover:bg-primary-700 hover:text-white font-bold text-xs shadow-sm transition-all self-start"
          >
            <span>{isAr ? 'كافة الحملات الطبية' : 'All Campaigns'}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <SequentialCarousel
          items={sortedCampaigns}
          autoPlayInterval={4200}
          slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          renderItem={(camp) => {
            const remaining = Math.max(0, (camp.totalCapacity || 0) - (camp.bookedCount || 0));
            const statusMeta = getStatusMeta(camp.status);
            return (
              <Link
                to={`/campaigns/${camp.slug}`}
                className="group block bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary-400 transition-all duration-300 h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={camp.image || '/assets/images/dept_neurosurgery_suite_1795286629702.jpg'}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-sm backdrop-blur-sm ${statusMeta.badgeClass}`}>
                      {statusMeta.label}
                    </span>
                  </div>

                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs">
                    <span className="inline-flex items-center gap-1.5 bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-lg font-semibold">
                      <Users className="w-3.5 h-3.5 text-gold-400" />
                      <span>
                        {camp.status === 'open'
                          ? (isAr ? `متبقي ${remaining} مقعد` : `${remaining} seats left`)
                          : camp.status === 'scheduled'
                          ? (isAr ? `${camp.totalCapacity} مقعد متاح قريباً` : `${camp.totalCapacity} seats upcoming`)
                          : (isAr ? 'مكتمل السعة' : 'Fully Booked')}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="inline-block text-[11px] font-bold text-primary-600 dark:text-secondary-400 bg-primary-50 dark:bg-primary-950/60 px-2.5 py-1 rounded-lg">
                      {camp.departmentName}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors">
                      {camp.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {camp.serviceSummary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1 truncate max-w-[65%]">
                      <Calendar className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                      <span className="truncate">{camp.dayLabel}</span>
                    </span>
                    <span className="font-bold text-primary-700 dark:text-secondary-400 inline-flex items-center gap-1">
                      <span>{isAr ? 'التفاصيل' : 'Details'}</span>
                      {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                </div>
              </Link>
            );
          }}
        />
      </div>
    </section>
  );
}
