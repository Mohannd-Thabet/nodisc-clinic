import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles,
  Calendar,
  Phone,
  ShieldCheck,
  Stethoscope,
  HeartHandshake,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function HeroSection() {
  const { t, lang, isRtl } = useLanguage();
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  // Realistic medical background images slideshow
  const bgImages = [
    '/assets/medical/brain_surgery_1.jpg',
    '/assets/medical/spine_surgery_1.jpg',
    '/assets/medical/surgery_micro_1.jpg',
    '/assets/medical/clinical_1.jpg',
    '/assets/medical/clinical_2.jpg',
    '/assets/medical/clinical_5.jpg',
  ];

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 1500); // changes every second/second-and-a-half as requested
    return () => clearInterval(timer);
  }, [bgImages.length]);

  return (
    <section className="relative overflow-hidden text-white pt-12 pb-20 lg:pt-20 lg:pb-28 min-h-[620px] flex items-center">
      
      {/* Dynamic Animated Medical Background Images */}
      {bgImages.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 transform scale-105 ${
            idx === currentBg ? 'opacity-35 scale-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Dark overlay gradients for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/80 via-primary-900/70 to-primary-950/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-transparent to-primary-950/60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            
            {/* Top badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-gold-300">
              <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
              <span>{t('hero.badge')}</span>
            </div>

            {/* Clinic Name and Exact Title */}
            <div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  {lang === 'ar' ? 'نوديسك كلينك' : 'NODISC Clinic'}
                </h1>
                <span className="text-sm sm:text-base font-extrabold font-mono px-3 py-1 rounded-xl bg-white/15 text-gold-300 border border-white/20 backdrop-blur-md" dir="ltr">
                  {lang === 'ar' ? 'NODISC Clinic' : 'Dr. Mohammed Al-Jarbani'}
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 mt-3">
                <span className="w-8 h-1 bg-gold-400 rounded-full"></span>
                <p className="text-base sm:text-xl lg:text-2xl font-bold text-secondary-300">
                  {lang === 'ar'
                    ? 'د. محمد عبدالله الجرباني — استشاري جراحة المخ والأعصاب والعمود الفقري'
                    : 'Dr. Mohammed Al-Jarbani — Consultant Neurosurgeon & Spine Specialist'}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('hero.description')}
            </p>

            {/* Trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">{t('hero.badge1')}</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <Stethoscope className="w-5 h-5 text-secondary-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">{t('hero.badge2')}</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">{t('hero.badge3')}</span>
              </div>
            </div>

          </div>

          {/* Prestige Card With Real Doctor Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-secondary-500/30 to-gold-400/30 rounded-3xl blur-2xl opacity-70"></div>
              
              {/* Main prestige card with animated glowing border */}
              <div className="relative bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/25 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
                
                {/* Doctor's Photo Frame — Clean Medical Pearl & Cyan Prestige Frame */}
                <div className="relative mx-auto w-52 h-64 sm:w-64 sm:h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-white via-cyan-100 to-emerald-100 p-1.5 shadow-[0_20px_50px_rgba(14,165,233,0.28)] ring-4 ring-white/25 group">
                  <img 
                    src="/assets/doctor_real.jpg" 
                    alt={t('common.drName')}
                    className="w-full h-full object-cover object-top rounded-[20px] transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = '/assets/full_logo.jpg';
                    }}
                  />
                  <div className="absolute bottom-2.5 inset-x-3 flex justify-center">
                    <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-primary-900 border border-cyan-200/80 shadow-lg text-[11px] font-extrabold tracking-tight">
                      {lang === 'ar' ? 'د. محمد عبدالله الجرباني' : 'Dr. Mohammed Al-Jarbani'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {t('common.drName')}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-secondary-300">
                    {t('common.drTitle')}
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
