import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Brain, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BrainNeurologyPage() {
  const { t, lang } = useLanguage();

  const conditions = [
    {
      titleAr: "تشخيص وعلاج أورام الدماغ وقاع الجمجمة",
      titleEn: "Brain & Skull Base Tumors",
      descAr: "تقييم أورام الدماغ الحميدة والخبيثة عبر أحدث تقنيات التصوير المقطعي والرنين المغناطيسي، ووضع خطط استئصال جراحية ميكروسكوبية دقيقة مع الحفاظ على وظائف المراكز الحيوية.",
      descEn: "Advanced diagnostic evaluation and microsurgical management for benign and malignant cerebral and skull base lesions while preserving eloquent functional brain cortex.",
      image: "/assets/medical/brain_surgery_1.jpg"
    },
    {
      titleAr: "علاج الصرع واضطرابات الشحنات الدماغية والتشنجات",
      titleEn: "Epilepsy & Seizure Disorders",
      descAr: "بروتوكولات متقدمة لضبط النوبات والصرع المقاوم للعلاجات الدوائية وتحديد البؤر الصرعية بالتخطيط الكهربائي للدماغ للأطفال والبالغين.",
      descEn: "Evidence-based protocols for drug-resistant epilepsy, electroencephalography mapping, and clinical management in both pediatric and adult cohorts.",
      image: "/assets/medical/clinical_1.jpg"
    },
    {
      titleAr: "الصداع المزمن والشقيقة والآلام العصبية الوجهية",
      titleEn: "Chronic Migraine & Trigeminal Neuralgia",
      descAr: "معالجة أسباب الصداع العنقودي والمستمر، والتهابات العصب الخامس الوجهي (Trigeminal Neuralgia) باستخدام التدخلات الدوائية والتحفظية وجراحة تخفيف الضغط الوعائي.",
      descEn: "Diagnosis and therapy for cluster headaches, severe migraines, and vascular microvascular decompression for debilitating trigeminal neuralgia.",
      image: "/assets/medical/clinical_4.jpg"
    },
    {
      titleAr: "إصابات الرأس والكسور ونزيف الدماغ الرضحي",
      titleEn: "Traumatic Brain Injury & Hematomas",
      descAr: "التعامل الفوري مع نزيف ما تحت الجافية وفوق الجافية وكسور عظام الجمجمة الناتجة عن حوادث السير والسقوط لإنقاذ حياة المريض والحد من العجز الحركي.",
      descEn: "Urgent surgical evacuation of subdural/epidural hematomas and skull fracture management secondary to high-velocity trauma.",
      image: "/assets/medical/clinical_3.jpg"
    },
    {
      titleAr: "طب وجراحة المخ والأعصاب للأطفال (Pediatric Neurosurgery)",
      titleEn: "Pediatric Neurosurgery",
      descAr: "علاج استسقاء الدماغ (Hydrocephalus) بالقسطرة وتحويلة البطين، وتشوهات الجمجمة الولادية، وتكيسات الدماغ لدى الأطفال بأساليب جراحية بالغة اللطف.",
      descEn: "Ventriculoperitoneal shunting for hydrocephalus, congenital craniosynostosis corrections, and specialized neurological care for children.",
      image: "/assets/medical/clinical_6.jpg"
    },
    {
      titleAr: "اعتلالات وتنميل الأعصاب الطرفية ومتلازمة النفق الرسغي",
      titleEn: "Peripheral Neuropathy & Carpal Tunnel Syndrome",
      descAr: "تحرير الأعصاب الطرفية المضغوطة باليد والقدم وعلاج التهابات واعتلالات الأعصاب الناجمة عن السكري أو الانضغاط الميكانيكي.",
      descEn: "Minimally invasive nerve decompression for carpal tunnel syndrome, tarsal tunnel, and diabetic peripheral neuropathic pain.",
      image: "/assets/medical/clinical_2.jpg"
    }
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-secondary-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-primary-800 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-secondary-400/20 text-secondary-300 border border-secondary-400/30">
            <Brain className="w-3.5 h-3.5" />
            {lang === 'ar' ? "القسم التخصصي الأول" : "Specialized Cranial Care"}
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            {lang === 'ar' ? "تشخيص وعلاج أمراض المخ والأعصاب" : "Brain, Neurological & Skull Base Disorders"}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
            {lang === 'ar'
              ? "يقدم الدكتور محمد عبدالله الجرباني رعاية استشارية شاملة لأدق حالات الجهاز العصبي المركزي، ابتداءً من استقصاء الصداع المزمن والدوخة، وحتى جراحات أورام الدماغ واستسقاء الرأس."
              : "Consultant Dr. Mohammed Al-Jarbani provides advanced neurological diagnostics and interventions ranging from refractory migraines and epilepsy to skull base oncological resections."}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-secondary-500 hover:bg-secondary-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <Calendar className="w-4 h-4 text-gold-300" />
              {t('common.bookAppointment')}
            </Link>
          </div>
        </div>

        {/* Clinical Grid with Realistic Medical Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditions.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img 
                  src={item.image} 
                  alt={item.titleAr}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
                />
                <div className="absolute top-3 start-3 w-8 h-8 rounded-xl bg-primary-900/80 backdrop-blur-md text-gold-300 font-bold text-xs flex items-center justify-center border border-white/20">
                  0{idx + 1}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors">
                    {lang === 'ar' ? item.titleAr : item.titleEn}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                    {lang === 'ar' ? item.descAr : item.descEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 dark:text-secondary-400 hover:text-primary-800 dark:hover:text-secondary-300 transition-colors"
                  >
                    <span>{lang === 'ar' ? 'طلب استشارة للحالة' : 'Consult for this condition'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
