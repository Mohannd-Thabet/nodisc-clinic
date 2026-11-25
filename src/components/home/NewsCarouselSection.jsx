import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { newsAndVisits } from '../../data/mediaAndCases';
import { useLanguage } from '../../context/LanguageContext';
import SequentialCarousel from '../common/SequentialCarousel';

const fallbackNewsImages = [
  '/assets/images/dept_rehab_gym_1795286629619.jpg',
  '/assets/images/dept_neurosurgery_suite_1795286629702.jpg',
  '/assets/images/dept_pain_clinic_1795286628900.jpg',
  '/assets/medical/brain_surgery_1.jpg',
];

export default function NewsCarouselSection() {
  const { lang, isRtl } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>{isAr ? 'المركز الإعلامي والتغطيات' : 'Media Center & Coverage'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isAr ? 'أخبار المركز والزيارات العلمية' : 'Center News & Scientific Visits'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
              {isAr
                ? 'أحدث التجهيزات الطبية، الشراكات الاستراتيجية، والفعاليات التوعوية لمركز نوديسك.'
                : 'Latest medical equipment launches, strategic partnerships, and awareness events at NODISC.'}
            </p>
          </div>
          <Link
            to="/media-center"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-primary-700 dark:text-secondary-400 hover:bg-primary-700 hover:text-white font-bold text-xs shadow-sm transition-all self-start"
          >
            <span>{isAr ? 'كافة الأخبار والتغطيات' : 'All News & Coverage'}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <SequentialCarousel
          items={newsAndVisits}
          autoPlayInterval={4600}
          slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          renderItem={(news, idx) => (
            <Link
              to={`/news/${news.slug}`}
              className="group block bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary-400 transition-all duration-300 h-full flex flex-col"
            >
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={fallbackNewsImages[idx % fallbackNewsImages.length]}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-primary-900/85 backdrop-blur-md text-gold-300 text-[10px] font-bold border border-white/15">
                  {news.category}
                </span>
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/65 text-white text-[11px] font-mono">
                  <Calendar className="w-3 h-3 text-gold-400" />
                  <span>{news.date}</span>
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {news.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-primary-700 dark:text-secondary-400">
                  <span>{isAr ? 'اقرأ التفاصيل' : 'Read Details'}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </div>
              </div>
            </Link>
          )}
        />
      </div>
    </section>
  );
}
