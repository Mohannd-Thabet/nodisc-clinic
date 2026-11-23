import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Bell, 
  AlertTriangle, 
  HelpCircle, 
  ShieldCheck, 
  Heart,
  ChevronDown,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HealthAwarenessPage() {
  const { t, lang } = useLanguage();

  const emergencyFlags = [
    {
      titleAr: "صداع مفاجئ شديد وعنيف (Thunderclap Headache)",
      descAr: "يوصف بأنه «أشد صداع في العمر»، خاصة إذا صاحبه قيء أو تصلب بالرقبة أو اضطراب في درجة الوعي، يستدعي التوجه الفوري للطوارئ لاستبعاد نزيف تحت العنكبوتية."
    },
    {
      titleAr: "ضعف مفاجئ في جانب واحد من الجسم أو الوجه",
      descAr: "صعوبة في التحدث أو اعوجاج زاوية الفم أو ثقل حاد باليد أو الساق يستدعي الفحص الطارئ لاستبعاد الجلطات الدماغية."
    },
    {
      titleAr: "متلازمة ذيل الفرس (احتباس البول وخدر الحوض)",
      descAr: "فقدان مفاجئ للتحكم بالبول أو الخروج، مصحوباً بخدر بمنطقة الشرج أو ضعف متسارع بالقدمين؛ حالة طارئة تتطلب تدخلاً جراحياً عاجلاً خلال ساعات."
    },
    {
      titleAr: "نوبات صرع وتشنجات للمرة الأولى",
      descAr: "ظهور تشنج أو فقدان وعي لأول مرة لدى البالغين يستدعي تخطيط دماغ ورنين مغناطيسي لتحديد السبب المستبطن."
    }
  ];

  const faqs = [
    {
      qAr: "هل كل انزلاق غضروفي يحتاج إلى عملية جراحية؟",
      aAr: "لا. تشير الدراسات السريرية وخبرة الدكتور الجرباني إلى أن الغالبية العظمى من الانزلاقات الغضروفية تستجيب بنجاح للعلاج التحفظي، الأدوية، وبرامج التأهيل والعلاج الطبيعي التخصصي بمركز نوديسك. التدخل الجراحي لا يُلجأ إليه إلا في حالات العجز العصبي المتزايد أو عدم التحسن بعد استنفاد الطرق التحفظية."
    },
    {
      qAr: "متى يحتاج مريض ألم الظهر إلى إجراء رنين مغناطيسي (MRI)؟",
      aAr: "لا يحتاج كل ألم ظهر إلى رنين فوري. يطلب الطبيب الرنين عند استمرار الألم لأكثر من عدة أسابيع، أو عند وجود أعراض منبهة مثل ألم ممتد للساقين، تنميل، ضعف عضلات، أو تاريخ مرضي خاص."
    },
    {
      qAr: "هل استخدام الهواتف والشاشات يسبب تلفاً دائماً لفقرات الرقبة؟",
      aAr: "انحناء الرقبة المستمر للنظر في الهاتف (Text Neck) يضاعف الضغط الميكانيكي على فقرات الرقبة وعضلاتها، مما يسبب إجهاداً وخشونة مبكرة، ويمكن تلافيه بتصحيح القوام ورفع الشاشة لمستوى العين وممارسة تمارين الإطالة."
    },
    {
      qAr: "ما أسباب تنميل اليدين والأصابع أثناء النوم؟",
      aAr: "غالباً ما يعود ذلك إلى انضغاط العصب الأوسط في الرسغ (متلازمة النفق الرسغي) أو تهيج جذور الأعصاب في الفقرات العنقية. الفحص السريري الدقيق وتخطيط العصب هما السبيل لتحديد السبب بدقة."
    }
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
            <Bell className="w-3.5 h-3.5 text-gold-500" />
            {lang === 'ar' ? "التوعية والإرشاد الصحي" : "Clinical Guidance & Awareness"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {lang === 'ar' ? "دليل التوعية بصحة المخ والعمود الفقري" : "Spine & Neurosurgical Health Guide"}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {lang === 'ar'
              ? "معلومات طبية استرشادية موثوقة بقلم الدكتور محمد الجرباني لمساعدتك على فهم الأعراض وتمييز الحالات الطارئة."
              : "Scientifically reviewed health guidelines helping patients identify early symptoms and critical emergencies."}
          </p>
        </div>

        {/* Emergency Red Flags Section */}
        <div className="bg-red-50 dark:bg-red-950/40 rounded-3xl p-6 sm:p-8 border border-red-200 dark:border-red-900/60 space-y-5">
          <div className="flex items-center gap-2.5 text-red-700 dark:text-red-400 font-bold text-lg">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <h2>{lang === 'ar' ? "علامات وأعراض إسعافية تستدعي التوجه الفوري للطوارئ" : "Neurological Red Flags Requiring Immediate Emergency Care"}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {emergencyFlags.map((item, idx) => (
              <div key={idx} className="bg-white/90 dark:bg-slate-900/90 rounded-2xl p-4 border border-red-100 dark:border-red-900/40 space-y-1.5">
                <h3 className="font-bold text-xs sm:text-sm text-red-900 dark:text-red-300">
                  {item.titleAr}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.descAr}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('home.faqTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t('home.faqSubtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 space-y-2.5"
              >
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-primary-600 dark:text-secondary-400 shrink-0 mt-1" />
                  <span>{faq.qAr}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed ps-6">
                  {faq.aAr}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking CTA Banner */}
        <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-primary-800 to-secondary-700 text-white space-y-4 shadow-xl">
          <h3 className="text-xl font-bold">
            {lang === 'ar' ? "هل لديك استفسار حول حالتك أو صور الأشعة؟" : "Have Questions About Your Scans or Condition?"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            {lang === 'ar'
              ? "يمكنك حجز موعد استشاري لمراجعة ملفك الطبي وفحوصات الرنين ومناقشة الخيارات المناسبة."
              : "Schedule a consultation with Dr. Al-Jarbani to review your MRI and explore tailored treatment plans."}
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <Calendar className="w-4 h-4" />
            {t('common.bookAppointment')}
          </Link>
        </div>

      </div>
    </div>
  );
}
