import React from 'react';
import { Link } from 'react-router-dom';
import { successStories } from '../../data/mediaAndCases';
import { 
  Award, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function SuccessStoriesPreview() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const stories = successStories.slice(0, 2);

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
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    {story.badge}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                  {story.patientName}
                </h3>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs space-y-1 mb-4">
                  <div className="font-bold text-primary-700 dark:text-secondary-400">
                    {isAr ? 'الحالة:' : 'Condition:'} <span className="font-normal text-slate-700 dark:text-slate-300">{story.diagnosis}</span>
                  </div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {isAr ? 'العلاج:' : 'Treatment:'} <span className="font-normal text-slate-600 dark:text-slate-400">{story.treatmentType}</span>
                  </div>
                </div>

                <blockquote className="text-xs italic text-slate-600 dark:text-slate-300 border-r-2 border-gold-400 pr-3 my-4">
                  "{story.patientQuote}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>{story.duration}</span>
                <Link to="/media-center" className="font-bold text-primary-600 dark:text-secondary-400 hover:underline">
                  {isAr ? 'تفاصيل الحالة الكاملة' : 'Full Case Details'}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
