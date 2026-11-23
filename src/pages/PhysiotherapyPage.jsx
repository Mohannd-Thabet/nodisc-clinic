import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  HeartHandshake, 
  Calendar,
  Sparkles,
  PhoneCall,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PhysiotherapyPage() {
  const { t, lang } = useLanguage();

  const services = [
    {
      titleAr: "إعادة التأهيل وتخفيف الضغط الغضروفي غير الجراحي",
      titleEn: "Non-Surgical Spinal Decompression & Traction",
      descAr: "تقنيات متقدمة لإراحة الجذور العصبية المضغوطة والتخلص من ألم الديسك دون حاجة إلى جراحة.",
      descEn: "Advanced protocols relieving compressed spinal nerves and resolving disc pain without surgical intervention.",
      image: "/assets/medical/clinical_15.jpg"
    },
    {
      titleAr: "تأهيل ما بعد جراحات المخ والعمود الفقري",
      titleEn: "Post-Operative Neurosurgical Rehabilitation",
      descAr: "برامج علاج طبيعي مدروسة تسرّع التئام الأنسجة واستعادة النشاط الحركي الطبيعي بأمان.",
      descEn: "Targeted physical therapy regimens accelerating tissue recovery and restoring mobility safely.",
      image: "/assets/medical/clinical_16.jpg"
    },
    {
      titleAr: "علاج آلام الرقبة والظهر المزمنة والإجهاد العضلي",
      titleEn: "Chronic Neck, Back & Musculoskeletal Pain Therapy",
      descAr: "تمارين استطالة وتقوية العضلات العميقة لتصحيح وضعية القوام ومنع تكرار النوبات.",
      descEn: "Core muscle strengthening and stretching programs correcting posture and preventing recurrences.",
      image: "/assets/medical/clinical_17.jpg"
    },
    {
      titleAr: "تأهيل إصابات الأعصاب الطرفية والشلل الحركي",
      titleEn: "Peripheral Nerve Injury & Stroke Rehabilitation",
      descAr: "تحفيز عصبي حركي لاستعادة استجابة الأطراف وتحسين التوازن والتناسق العصبي العضلي.",
      descEn: "Neuromuscular stimulation restoring limb response, balance, and fine motor coordination.",
      image: "/assets/medical/clinical_2.jpg"
    }
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner with original photo */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-800 text-white shadow-2xl p-8 sm:p-12 border border-primary-700/50 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-gold-400/20 text-gold-300 border border-gold-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'ar' ? "المركز التخصصي المعتمد" : "Affiliated Specialized Center"}
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              نوديسك للعلاج الطبيعي والتأهيل
              <span className="block text-secondary-300 text-xl sm:text-2xl font-bold mt-1">
                NODISC PHYSIOTHERAPY & REHABILITATION
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
              {lang === 'ar' 
                ? "«نوديسك... حين ينتهي الألم بخطوة، ابدأ رحلتك الآن». المركز المتكامل للعلاج الطبيعي وإعادة التأهيل العصبي والحركي بإشراف وبروتوكولات الدكتور محمد الجرباني."
                : "«NODISC... Where pain ends with a step, begin your journey now». Integrated center for physical therapy and neuro-rehabilitation under Dr. Al-Jarbani's protocols."}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition-all"
              >
                <Calendar className="w-4 h-4" />
                {lang === 'ar' ? "حجز جلسة تقييم" : "Book an Assessment"}
              </Link>
              <a
                href="https://wa.me/967772070207?text=%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%86%D9%88%D8%AF%D9%8a%D8%B3%D9%83"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                {lang === 'ar' ? "استفسار واتساب مباشر" : "Direct WhatsApp"}
              </a>
            </div>
          </div>

          <div className="w-full lg:w-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 shrink-0">
            <img 
              src="/assets/nodisc_photo.jpg" 
              alt="NODISC Physiotherapy"
              className="w-full h-64 object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>

        {/* Services Grid with Realistic Medical Photos */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {lang === 'ar' ? "برامج وخدمات نوديسك العلاجية" : "NODISC Therapeutic Programs"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {lang === 'ar' 
                ? "برامج متخصصة تستهدف السبب الجذري للألم وتعمل على بناء قوة الجسم دون حاجة للجراحة."
                : "Specialized non-invasive programs addressing root causes of pain and rebuilding musculoskeletal integrity."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col sm:flex-row group"
              >
                <div className="sm:w-48 h-48 sm:h-auto overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.titleAr}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = '/assets/nodisc_photo.jpg'; }}
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-secondary-400 flex items-center justify-center font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors">
                      {lang === 'ar' ? item.titleAr : item.titleEn}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'ar' ? item.descAr : item.descEn}
                    </p>
                  </div>

                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 dark:text-secondary-400 hover:text-primary-800 dark:hover:text-secondary-300 transition-colors"
                  >
                    <span>{lang === 'ar' ? 'حجز جلسة في نوديسك' : 'Book a session at NODISC'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
