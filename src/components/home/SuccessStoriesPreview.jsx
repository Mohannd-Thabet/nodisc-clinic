import React from 'react';
import { Link } from 'react-router-dom';
import { successStories } from '../../data/mediaAndCases';
import {
  Star,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
  Building2,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SequentialCarousel from '../common/SequentialCarousel';

const storyImages = [
  '/assets/medical/clinical_1.jpg',
  '/assets/medical/clinical_2.jpg',
  '/assets/medical/clinical_3.jpg',
];

const storyDepartments = [
  { ar: 'قسم جراحة المخ والأعصاب والعمود الفقري', en: 'Neurosurgery & Spine Department' },
  { ar: 'مركز نوديسك لعلاج الألم والتأهيل', en: 'NODISC Pain Rehabilitation Center' },
  { ar: 'وحدة جراحة العمود الفقري والتأهيل', en: 'Spine Surgery & Rehab Unit' },
];

export default function SuccessStoriesPreview() {
  const { lang, isRtl } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <section className="py-16 bg-slate-100/60 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/20 text-gold-600 dark:text-gold-300 text-xs font-bold border border-gold-400/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'حالات موثقة سريرياً' : 'Clinically Documented Cases'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {isAr
                ? <>قصص نجاح وتعافي <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-amber-600">مرضى نوديسك</span></>
                : <>NODISC Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-amber-600">Recovery Stories</span></>
              }
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              {isAr
                ? 'تجارب حقيقية لمرضى استعادوا قدرتهم على الحركة والعمل بعد معاناتهم مع الانزلاق الغضروفي.'
                : 'Real experiences from patients who regained mobility and returned to work after suffering from disc herniation.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/media-center"
              className="px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-gold-500 text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2"
            >
              <span>{isAr ? 'مشاهدة كل القصص والأخبار' : 'View All Stories & News'}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>
        </div>

        {/* Sequential Success Stories Carousel */}
        <SequentialCarousel
          items={successStories}
          autoPlayInterval={4400}
          slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          renderItem={(story, idx) => {
            const dept = storyDepartments[idx % storyDepartments.length];
            const imgSrc = story.image || storyImages[idx % storyImages.length];
            return (
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden h-full">
                <div>
                  {/* Story Image Header */}
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={imgSrc}
                      alt={story.patientName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500/95 text-white text-[11px] font-bold shadow-sm">
                      {story.badge}
                    </span>
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/65 text-white text-[11px] font-mono">
                      <Calendar className="w-3 h-3 text-gold-400" />
                      <span>{story.date}</span>
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary-600 dark:text-secondary-400 bg-primary-50 dark:bg-primary-950/50 px-2.5 py-1 rounded-lg truncate max-w-[75%]">
                        <Building2 className="w-3 h-3 shrink-0" />
                        <span className="truncate">{isAr ? dept.ar : dept.en}</span>
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                      {story.patientName}
                    </h3>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs space-y-1 mb-3">
                      <div className="font-bold text-primary-700 dark:text-secondary-400 line-clamp-1">
                        {isAr ? 'الحالة:' : 'Condition:'} <span className="font-normal text-slate-700 dark:text-slate-300">{story.diagnosis}</span>
                      </div>
                      <div className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                        {isAr ? 'العلاج:' : 'Treatment:'} <span className="font-normal text-slate-600 dark:text-slate-400">{story.treatmentType}</span>
                      </div>
                    </div>

                    <blockquote className="text-xs italic text-slate-600 dark:text-slate-300 border-r-2 border-gold-400 pr-3 line-clamp-3">
                      "{story.patientQuote}"
                    </blockquote>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate max-w-[60%]">{story.duration}</span>
                  <Link to="/media-center" className="font-bold text-primary-600 dark:text-secondary-400 hover:underline shrink-0">
                    {isAr ? 'تفاصيل الحالة' : 'Case Details'}
                  </Link>
                </div>
              </div>
            );
          }}
        />

      </div>
    </section>
  );
}
