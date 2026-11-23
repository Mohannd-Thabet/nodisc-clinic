import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Activity, 
  ShieldCheck, 
  HeartPulse, 
  ArrowRight, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function NodiscCenterPreview() {
  const { lang, isRtl } = useLanguage();
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const highlights = [
    {
      titleAr: 'علاج الديسك بدون جراحة',
      titleEn: 'Non-Surgical Disc Treatment',
      descAr: 'بروتوكولات الشد الميكانيكي الرقمي لتوسيع المسافة بين الفقرات وإلغاء انضغاط العصب.',
      descEn: 'Digital spinal decompression protocols to restore intervertebral spacing and relieve nerve roots.',
      icon: Activity,
      color: 'text-secondary-500'
    },
    {
      titleAr: 'بروتوكولات التأهيل الدولية المعتمدة',
      titleEn: 'International Rehab Protocols',
      descAr: 'تطبيق النموذج العالمي لمراكز علاج الألم والتأهيل واستعادة الوظيفة الحركية الكاملة.',
      descEn: 'Applying international clinical protocols for pain rehabilitation and functional restoration.',
      icon: Award,
      color: 'text-gold-400'
    },
    {
      titleAr: 'تقليل الاعتماد على المسكنات',
      titleEn: 'Safe Medication Tapering',
      descAr: 'استبدال المسكنات الكيميائية الثقيلة بتقنيات التسكين الفيزيائي والتحفيز العصبي الطبيعي.',
      descEn: 'Replacing heavy analgesic medications with natural neuromuscular stimulation and physical pain relief.',
      icon: HeartPulse,
      color: 'text-emerald-500'
    },
    {
      titleAr: 'تأهيل ما بعد العمليات',
      titleEn: 'Post-Surgical Rehabilitation',
      descAr: 'برامج حركية تضمن التئام الأنسجة ومنع الالتصاقات والعودة السريعة لممارسة العمل.',
      descEn: 'Targeted mobility pathways to prevent adhesions and accelerate safe return to daily activities.',
      icon: ShieldCheck,
      color: 'text-blue-500'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-100/70 to-white dark:from-slate-900/60 dark:to-slate-950 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-xs font-bold border border-primary-200 dark:border-primary-800 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>
                {lang === 'ar' ? 'صرح طبي مؤسسي رائد في اليمن' : 'Pioneering Medical Institution in Yemen'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {lang === 'ar' ? (
                <>
                  مركز <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-cyan-400">نوديسك (NODISC)</span> لعلاج الألم والتأهيل
                </>
              ) : (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-cyan-400">NODISC</span> Pain & Rehab Center
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              {lang === 'ar'
                ? 'أحدث المعايير الدولية المتطورة لعلاج وتأهيل الآلام المزمنة بين يديك في صنعاء، لعلاج الانزلاق الغضروفي المزمن بدون جراحة.'
                : 'Advanced international clinical standards for chronic pain rehabilitation and non-surgical disc care in Sanaa.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/nodisc-pain-rehab"
              className="px-5 py-2.5 rounded-2xl bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold shadow-md shadow-primary-700/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>{lang === 'ar' ? 'استكشف برامج نوديسك' : 'Explore NODISC Programs'}</span>
              <Arrow className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5 ${item.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 leading-snug">
                    {lang === 'ar' ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {lang === 'ar' ? item.descAr : item.descEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-primary-700 dark:text-secondary-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  <span>{lang === 'ar' ? 'معرفة المزيد' : 'Learn More'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
