import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  UserCheck, 
  Award, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  PhoneCall, 
  Calendar,
  Building,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BiographyPage() {
  const { t, lang } = useLanguage();

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Profile Card Header with Real Doctor Photo */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8">
          
          {/* Doctor Photo in Prestige Frame */}
          <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-primary-800 to-secondary-600 p-1.5 shadow-2xl shrink-0 border-2 border-gold-400/50">
            <img 
              src="/assets/doctor_real.jpg" 
              alt="الدكتور محمد عبدالله الجرباني"
              className="w-full h-full object-cover object-top rounded-[22px]"
              onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent rounded-[22px]" />
            <div className="absolute bottom-2.5 inset-x-2.5 text-center">
              <span className="px-3 py-1 rounded-full bg-primary-900/90 text-gold-300 text-[11px] font-extrabold backdrop-blur-md border border-gold-400/30">
                استشاري جراحة المخ والأعصاب
              </span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-start space-y-3.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
              <UserCheck className="w-3.5 h-3.5 text-gold-500" />
              {lang === 'ar' ? "السيرة الذاتية الرسمية" : "Official Professional Biography"}
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
              الدكتور محمد عبدالله الجرباني
            </h1>

            <p className="text-base sm:text-lg font-bold text-primary-700 dark:text-secondary-400">
              استشاري جراحة المخ والأعصاب والعمود الفقري
            </p>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? "طبيب استشاري متخصص في جراحة المخ والأعصاب والعمود الفقري، يقدم الرعاية السريرية والاستشارات المتقدمة في مركز ابن سيناء الطبي التشخيصي بصنعاء ومراكز التأهيل التابعة، مع تركيز دقيق على الجمع بين التدخلات الجراحية الميكروسكوبية وبدائل العلاج التحفظي والتأهيل الحركي عبر مركز نوديسك."
                : "Senior Consultant in Neurosurgery and Spine Surgery, providing advanced clinical care and consultations at Ibn Sina Diagnostic Medical Center (Sana'a) and affiliated rehabilitation centers."}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link 
                to="/booking"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-primary-700 to-secondary-600 hover:from-primary-800 hover:to-secondary-700 text-white text-xs font-bold shadow-md transition-all"
              >
                <Calendar className="w-4 h-4 text-gold-300" />
                {t('common.bookAppointment')}
              </Link>
              
              <a 
                href="https://wa.me/967772070207"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                واتساب: 772070207
              </a>

              <a 
                href="tel:+967784545908"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-secondary-500" />
                اتصال: 784545908
              </a>
            </div>
          </div>
        </div>

        {/* Biography Content matching exactly the old website schema */}
        <div className="space-y-8">
          
          {/* Approach & Philosophy */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <HeartHandshake className="w-5 h-5 text-secondary-500" />
              {lang === 'ar' ? "الرؤية والنهج السريري" : "Clinical Philosophy & Approach"}
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                {lang === 'ar'
                  ? "«رعاية متخصصة تبدأ بالاستماع إلى حالتك وتقييم الفحوصات ومناقشة الخيارات العلاجية المناسبة». تنطلق رؤية الدكتور محمد الجرباني من الإيمان بأن المريض شريك في القرار العلاجي، حيث يُعطى الوقت الكافي لفحص وتفسير صور الرنين المغناطيسي والأشعة المقطعية ومناقشة كافة الخيارات المتاحة قبل اقتراح أي إجراء جراحي."
                  : "Specialized care beginning with patient listening, meticulous scan evaluation, and transparent discussion of all alternatives."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-center space-y-1">
                  <span className="text-gold-500 font-extrabold text-sm">01</span>
                  <p className="font-bold text-xs text-slate-900 dark:text-white">تقييم الحالة والتاريخ المرضي</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-center space-y-1">
                  <span className="text-secondary-500 font-extrabold text-sm">02</span>
                  <p className="font-bold text-xs text-slate-900 dark:text-white">مراجعة الفحوصات والتقارير</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-center space-y-1">
                  <span className="text-emerald-500 font-extrabold text-sm">03</span>
                  <p className="font-bold text-xs text-slate-900 dark:text-white">مناقشة الخطة العلاجية</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Areas */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Award className="w-5 h-5 text-gold-500" />
              {lang === 'ar' ? "مجالات العمل والخبرة السريرية" : "Core Surgical & Clinical Competencies"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {[
                "جراحات أورام المخ وقاع الجمجمة للأطفال والبالغين",
                "عمليات الانزلاقات الغضروفية (الديسك) القطنية والعنقية الميكروسكوبية",
                "توسيع وتثبيت القناة الشوكية والفقرات بالشرائح والبراغي",
                "تصحيح انحناءات وتشوهات العمود الفقري (الجنف والحدب)",
                "علاج الصرع واضطرابات الشحنات الدماغية وتخطيط الدماغ",
                "إصابات الرأس والكسور ونزيف الدماغ الرضحي الناتج عن الحوادث",
                "علاج آلام الصداع والشقيقة والتهاب العصب الخامس",
                "طب وجراحة المخ والأعصاب للأطفال (استسقاء الرأس والقسطرة)",
                "اعتلالات وآلام الأعصاب الطرفية وتحرير النفق الرسغي",
                "الإشراف على برامج التأهيل الحركي والعلاج الطبيعي التخصصي بنوديسك"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Locations and Schedule */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Building className="w-5 h-5 text-primary-500" />
              {lang === 'ar' ? "مواقع العمل وأوقات الدوام" : "Clinical Practice & Working Schedule"}
            </h2>

            <div className="p-4 rounded-2xl bg-primary-50/50 dark:bg-primary-950/30 border border-primary-100 dark:border-primary-900 space-y-2">
              <h3 className="font-bold text-sm text-primary-900 dark:text-primary-200">
                مركز ابن سيناء الطبي التشخيصي (العيادة الاستشارية الرئيسية)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                صنعاء – شارع تعز – جولة 45 – فوق صيدلية الفيصل
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-700 dark:text-slate-300 pt-1">
                <span>الفترة الصباحية: 9:00 ص – 2:00 م</span>
                <span>•</span>
                <span>الفترة المسائية: 4:00 م – 9:00 م</span>
              </div>
              <p className="text-[11px] text-amber-700 dark:text-amber-400">
                * ملاحظة: أيام الزيارات وتوفر المواعيد تُؤكَّد هاتفياً قبل الحضور.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
