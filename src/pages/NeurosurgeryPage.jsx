import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Scissors, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NeurosurgeryPage() {
  const { t, lang } = useLanguage();

  const surgicalProcedures = [
    {
      titleAr: "استئصال الانزلاق الغضروفي الميكروسكوبي الدقيق (Microdiscectomy)",
      titleEn: "Microscopic Lumbar & Cervical Discectomy",
      descAr: "عملية محدودة التداخل تجرى عبر شق جراحي صغير واستخدام الميكروسكوب الجراحي لإزالة الجزء الضاغط على العصب دون المساس بسلامة عضلات وأربطة الظهر.",
      descEn: "Minimally invasive microscopic excision of herniated disc fragment relieving nerve roots with preservation of spinal integrity.",
      image: "/assets/medical/surgery_micro_1.jpg"
    },
    {
      titleAr: "توسيع القناة العصبية وإزالة الضغط العظمي (Spinal Decompression)",
      titleEn: "Laminectomy & Foraminotomy",
      descAr: "تحرير الحبل الشوكي والجذور العصبية من الضغط الناجم عن تضخم الأربطة أو البروزات العظمية الناتجة عن الخشونة المتقدمة.",
      descEn: "Decompression of the spinal canal and neural foramina relieving severe radicular pain and neurogenic claudication.",
      image: "/assets/medical/clinical_11.jpg"
    },
    {
      titleAr: "تثبيت ودمج الفقرات بالشرائح والبراغي التيتانيوم (Spinal Fusion)",
      titleEn: "Instrumented Spinal Fusion",
      descAr: "إعادة بناء وتثبيت استقرار العمود الفقري في حالات عدم الاستقرار أو الانزلاق الفقاري والكسور الرضحية لتمكين المريض من المشي بأمان.",
      descEn: "Restoration of mechanical spinal stability using pedicle screws and cages in cases of spondylolisthesis and unstable fractures.",
      image: "/assets/medical/clinical_12.jpg"
    },
    {
      titleAr: "جراحات أورام الدماغ والمخيخ وقاع الجمجمة (Craniotomy & Tumor Resection)",
      titleEn: "Craniotomy & Brain Tumor Resection",
      descAr: "فتح الجمجمة الموضعي واستئصال الأورام السحائية والأورام الدبقية وأكياس السائل الدماغي باستخدام أحدث أدوات الملاحة الجراحية الدقيقة.",
      descEn: "Elective craniotomy for surgical excision of meningiomas, gliomas, and skull base neoplasms preserving vital brain pathways.",
      image: "/assets/medical/brain_surgery_1.jpg"
    },
    {
      titleAr: "جراحة تحويلة الدماغ لعلاج استسقاء الرأس (VP Shunt)",
      titleEn: "Ventriculoperitoneal (VP) Shunt Placement",
      descAr: "تركيب صمام لتصريف السائل النخاعي الزائد من بطينات الدماغ إلى التجويف البطني لتخفيف الضغط الداخلي على المخ للكبار والأطفال.",
      descEn: "Placement of ventriculoperitoneal shunt system alleviating raised intracranial pressure in hydrocephalus for pediatric and adult cases.",
      image: "/assets/medical/clinical_13.jpg"
    },
    {
      titleAr: "تصحيح كسور الجمجمة وإصلاح تسرب السائل النخاعي",
      titleEn: "Skull Fracture Repair & CSF Leak Repair",
      descAr: "ترميم عظام الجمجمة المنخسفة ومعالجة تسرب السائل الدماغي النخاعي لمنع التهابات السحايا بعد حوادث السير والإصابات البالغة.",
      descEn: "Elevation of depressed skull fractures and dural repair preventing meningitis following major cranial trauma.",
      image: "/assets/medical/clinical_14.jpg"
    }
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-primary-800 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-secondary-400/20 text-secondary-300 border border-secondary-400/30">
            <Scissors className="w-3.5 h-3.5" />
            {lang === 'ar' ? "العمليات والتدخلات الجراحية" : "Advanced Neurosurgical Interventions"}
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            {lang === 'ar' ? "العمليات الجراحية الدقيقة للمخ والأعصاب والعمود الفقري" : "Specialized Cranial & Spinal Operative Procedures"}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
            {lang === 'ar'
              ? "تُجرى العمليات الجراحية وفق أعلى معايير السلامة المهنية ومراعاة بروتوكولات التعقيم والملاحة العصبية الحديثة لتقليل فترة الإقامة بالمستشفى وتسريع الشفاء."
              : "Operations are performed adhering strictly to microscopic precision, modern neural monitoring, and accelerated post-op recovery protocols."}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <Calendar className="w-4 h-4 text-gold-300" />
              {lang === 'ar' ? "طلب تقييم جراحي" : "Request Surgical Evaluation"}
            </Link>
          </div>
        </div>

        {/* Procedures Grid with Realistic Medical Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surgicalProcedures.map((item, idx) => (
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
                    <span>{lang === 'ar' ? 'حجز تقييم للعملية' : 'Book surgical evaluation'}</span>
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
