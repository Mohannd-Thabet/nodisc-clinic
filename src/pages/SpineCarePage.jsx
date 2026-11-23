import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Activity, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SpineCarePage() {
  const { t, lang } = useLanguage();

  const spineConditions = [
    {
      titleAr: "الانزلاق الغضروفي القطني والعنقي (الديسك)",
      titleEn: "Lumbar & Cervical Disc Herniation",
      descAr: "بروز القرص الغضروفي مسبباً ضغطاً مباشراً على الجذور العصبية، مع ألم ممتد للساق (عرق النسا) أو الذراع، يُعالج بالأساليب التحفظية ونادراً ما يحتاج لجراحة دقيقة.",
      descEn: "Disc protrusion causing direct nerve root compression with radiating sciatica or arm pain, predominantly managed conservatively.",
      image: "/assets/medical/spine_surgery_1.jpg"
    },
    {
      titleAr: "تضيق القناة الشوكية القطنية والعنقية (Spinal Stenosis)",
      titleEn: "Spinal Canal Stenosis",
      descAr: "ضيق المساحة العظمية للحبل الشوكي يسبب ثقلاً وألماً بالساقين أثناء المشي يتحسن عند الانحناء أو الجلوس، ويتم علاجه بتوسيع القناة واستئصال الضغط العظمي.",
      descEn: "Narrowing of spinal canals causing neurogenic claudication while walking, resolved via microscopic decompression.",
      image: "/assets/medical/clinical_5.jpg"
    },
    {
      titleAr: "الانزلاق الفقاري وعدم استقرار الفقرات (Spondylolisthesis)",
      titleEn: "Spondylolisthesis & Instability",
      descAr: "تزحزح فقرة فوق أخرى يؤدي لآلام ميكانيكية شديدة أسفل الظهر مع ضغط عصبي، ويعالج بإعادة رصف وتثبيت الفقرات بالشرائح والبراغي التيتانيوم.",
      descEn: "Vertebral slippage producing mechanical back pain and neurological symptoms, managed with titanium spinal fusion instrumentation.",
      image: "/assets/medical/clinical_7.jpg"
    },
    {
      titleAr: "انحناءات وتشوهات العمود الفقري (الجنف والحدب)",
      titleEn: "Scoliosis & Kyphosis Deformities",
      descAr: "انحناء جانبي أو تقوس غير طبيعي للعمود الفقري عند المراهقين والبالغين يتطلب تقييماً شعاعياً دقيقاً لقياس زوايا كوب (Cobb Angle) وتحديد مسار التقويم.",
      descEn: "Coronal and sagittal spinal curvature anomalies requiring precise Cobb angle measurements and staged reconstructive corrective surgery.",
      image: "/assets/medical/clinical_8.jpg"
    },
    {
      titleAr: "خشونة وتيبس المفاصل الفقرية (Spinal Spondylosis)",
      titleEn: "Degenerative Spine & Spondylosis",
      descAr: "تغيرات تنكسية طبيعية تحدث مع التقدم بالعمر تصيب مفاصل وغضاريف الرقبة وأسفل الظهر، ويتم توفير برامج متقدمة لتسكينها عبر العلاج الطبيعي المتقدم بنوديسك.",
      descEn: "Age-related arthritic degeneration of facet joints and intervertebral discs, managed with specialized NODISC motor rehabilitation.",
      image: "/assets/medical/clinical_9.jpg"
    },
    {
      titleAr: "أورام والتهابات الحبل الشوكي والفقرات (Spinal Tumors & Spondylodiscitis)",
      titleEn: "Spinal Tumors & Infections",
      descAr: "تشخيص واستئصال أورام السحايا والنخاع الشوكي ومعالجة التهابات وخراجات الفقرات الجافية عبر التدخل الجراحي الدقيق والمضادات المستهدفة.",
      descEn: "Neurosurgical resection of extramedullary/intramedullary lesions and emergency drainage of epidural abscesses and discitis.",
      image: "/assets/medical/clinical_10.jpg"
    }
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-800 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-primary-700 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-gold-400/20 text-gold-300 border border-gold-400/30">
            <Activity className="w-3.5 h-3.5" />
            {lang === 'ar' ? "القسم التخصصي الثاني" : "Advanced Spine Surgery"}
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            {lang === 'ar' ? "جراحة ورعاية العمود الفقري والحبل الشوكي" : "Comprehensive Spine & Spinal Cord Surgery"}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
            {lang === 'ar'
              ? "نتبنى نهجاً قائماً على استنفاد الحلول غير الجراحية أولاً، واستخدام أحدث تقنيات التدخل المحدود وتثبيت الفقرات عند وجود ضرورة طبية قاطعة لضمان سلامة الحركة."
              : "We adopt a conservative-first approach, applying minimally invasive decompression and spinal stabilization solely when clinically indicated to preserve mobility."}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <Calendar className="w-4 h-4" />
              {t('common.bookAppointment')}
            </Link>
          </div>
        </div>

        {/* Conditions Grid with Realistic Medical Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spineConditions.map((item, idx) => (
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
