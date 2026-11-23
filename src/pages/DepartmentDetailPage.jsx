import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getDepartmentBySlug } from '../data/departmentsData';
import { servicesData } from '../data/servicesData';
import { libraryData } from '../data/libraryData';
import { successStories } from '../data/mediaAndCases';
import Breadcrumbs from '../components/common/Breadcrumbs';
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Clock,
  Phone,
  ShoppingBag,
  Upload,
  CheckCircle2,
  Wrench,
  Stethoscope,
  BookOpen,
  Award,
  ChevronLeft,
  MapPin,
  Sparkles,
  FileText,
  Activity,
  ShieldCheck,
  HeartPulse,
  Target,
  TrendingUp,
  Users
} from 'lucide-react';

export default function DepartmentDetailPage() {
  const { slug } = useParams();
  const dept = getDepartmentBySlug(slug);

  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  if (!dept) return <Navigate to="/departments" replace />;

  const deptServices = servicesData.filter((s) => s.departmentId === dept.id);
  const deptTopics = libraryData.filter((l) => l.departmentId === dept.id);
  const deptStories = successStories.filter((s) => s.departmentId === dept.id || (!s.departmentId && dept.id === 'neurosurgery'));

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-16">
      {/* 1. Department Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 text-white py-12 sm:py-16 border-b border-primary-800/40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-secondary-400 block tracking-wider" dir="ltr">
                {dept.nameEn}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {dept.nameAr}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                {dept.shortDesc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {dept.isPharmacy ? (
                  <>
                    <Link
                      to="/nodisc-store"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>تصفح المتجر الطبي</span>
                    </Link>
                    <Link
                      to="/nodisc-store?action=prescription"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all"
                    >
                      <Upload className="w-4 h-4 text-gold-300" />
                      <span>ارفع وصفتك الطبية (الروشتة)</span>
                    </Link>
                  </>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to={`/booking?dept=${dept.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-500 hover:from-primary-800 hover:to-secondary-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-primary-700/20 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Calendar className="w-4 h-4 text-gold-300" />
                      <span>{dept.ctaLabel}</span>
                    </Link>
                    {dept.id === 'pain' && (
                      <Link
                        to="/nodisc-pain-rehab"
                        className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all active:scale-95"
                      >
                        <Award className="w-4 h-4 text-gold-300" />
                        <span>بوابة نوديسك الشاملة للتأهيل</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Department Image */}
            <div className="lg:col-span-5 h-64 sm:h-80 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl relative">
              <img
                src={dept.image}
                alt={dept.nameAr}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = '/assets/full_logo.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-xs text-white font-semibold">
                صرح نوديسك الطبي — مركز ابن سيناء
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 mt-6">
        <Breadcrumbs
          items={[
            { label: 'الأقسام الطبية', to: '/departments' },
            { label: dept.nameAr },
          ]}
        />

        {/* 2. Overview & Scope */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-600 dark:text-secondary-400" />
              <span>نطاق عمل ورسالة القسم</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {dept.fullOverview}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {dept.scopeItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed shadow-xs flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-secondary-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pain Rehabilitation Center: Full Mayo Clinic Standards Showcase */}
        {dept.id === 'pain' && dept.mayoStandards && (
          <div className="space-y-12">
            
            {/* Banner: Mayo Clinic Pain Rehabilitation Center Standards */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 text-white border border-primary-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold border border-gold-400/30">
                  <Award className="w-4 h-4 text-gold-300" />
                  <span>البروتوكولات المتقدمة لمركز إعادة تأهيل الألم وعلاج العمود الفقري</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  النهج التكاملي لاستعادة الحركة وفطام المسكنات
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                  {dept.mayoStandards.philosophy}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/nodisc-pain-rehab"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-secondary-600 hover:bg-secondary-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-secondary-600/30 transition-all active:scale-95"
                  >
                    <span>استكشاف بوابة نوديسك لعلاج الألم والتأهيل</span>
                    <ChevronLeft className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/booking?dept=pain"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all active:scale-95"
                  >
                    <Calendar className="w-4 h-4 text-gold-300" />
                    <span>حجز موعد تقييم استشاري</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* The 4 Core Pillars of PRC */}
            <section className="space-y-6">
              <div className="max-w-2xl">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  الركائز الأربع المعتمدة لبرنامج إعادة تأهيل الألم
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  نموذج علاجي شامل يعالج أصل المشكلة العصبية والحركية بدلاً من مجرد تسكين الأعراض
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {dept.mayoStandards.pillars.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-2xl font-black text-primary-300 dark:text-primary-800 font-mono mb-3 group-hover:text-secondary-500 transition-colors">
                        {item.num}
                      </div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mb-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Structured Clinical Programs (البرامج العلاجية المعتمدة) */}
            <section className="space-y-6">
              <div className="max-w-2xl">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  البرامج العلاجية المعتمدة بالمركز
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  مسارات مصممة بدقة لتناسب احتياجات المرضى المقيمين والقادمين من المحافظات
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dept.mayoStandards.programs.map((prog) => (
                  <div
                    key={prog.id}
                    className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-secondary-400 text-xs font-bold border border-primary-200 dark:border-primary-800">
                          {prog.badge}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-secondary-500" />
                          <span>{prog.duration}</span>
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                        {prog.name}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl">
                        <strong className="text-slate-800 dark:text-slate-100 block mb-0.5">الفئة المستهدفة:</strong>
                        {prog.audience}
                      </p>

                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          أبرز عناصر ومحاور البرنامج:
                        </span>
                        {prog.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                      <Link
                        to={`/booking?dept=pain&service=${encodeURIComponent(prog.name)}`}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-600 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 group"
                      >
                        <Calendar className="w-4 h-4 text-secondary-500 group-hover:text-white" />
                        <span>طلب الالتحاق بهذا البرنامج</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Conditions Treated (الحالات المعالجة) */}
            <section className="p-6 sm:p-8 rounded-3xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  الحالات السريرية التي يغطيها المركز وفق المعايير العالمية
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  علاج متقدم للحالات المعقدة وحالات الألم المزمن التي لم تستجب للمسكنات والعلاجات السابقة
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {dept.mayoStandards.conditions.map((cond, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary-500 shrink-0" />
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {cond.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pr-4">
                      {cond.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Core Treatment Components (عناصر الخطة التأهيلية) */}
            <section className="space-y-6">
              <div className="max-w-2xl">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  العناصر الأساسية لبروتوكول إعادة التأهيل
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  تكامل بين الطب التداخلي والعلاج الوظيفي والفيزيائي والتنظيم الدوائي
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {dept.mayoStandards.coreComponents.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-secondary-50 dark:bg-secondary-950/60 text-secondary-600 dark:text-secondary-400 flex items-center justify-center font-bold">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {comp.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {comp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Clinical Outcomes Grid */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {dept.mayoStandards.clinicalOutcomes.map((out, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs space-y-1"
                >
                  <div className="text-2xl sm:text-3xl font-black text-primary-700 dark:text-secondary-400 font-mono">
                    {out.value}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-snug">
                    {out.label}
                  </p>
                </div>
              ))}
            </section>

          </div>
        )}

        {/* 3. Pharmacy Specific: Categories Grid */}
        {dept.isPharmacy && dept.pharmacyCategories && (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  أقسام صيدلية ومتجر نوديسك
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  تصفح المستلزمات الطبية المعتمدة واطلب مع خدمة التوصيل المباشر
                </p>
              </div>
              <Link
                to="/nodisc-store"
                className="text-xs font-bold text-primary-700 dark:text-secondary-400 hover:underline inline-flex items-center gap-1"
              >
                <span>دخول المتجر بالكامل</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {dept.pharmacyCategories.map((cat, idx) => (
                <Link
                  key={idx}
                  to={cat.link}
                  className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-300 dark:hover:border-secondary-700 transition-all hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 4. Rehabilitation Specific: Equipment & Facility Gallery */}
        {dept.equipmentList && dept.equipmentList.length > 0 && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-secondary-500" />
                <span>التجهيزات والتقنيات الطبية المعتمدة</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                صالة تأهيل متطورة مجهزة بأحدث أجهزة الشد الميكانيكي والتحفيز العصبي التسكيني
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dept.equipmentList.map((eq, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5"
                >
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-500 shrink-0" />
                    <span>{eq.name}</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pr-4 leading-relaxed">
                    {eq.purpose}
                  </p>
                </div>
              ))}
            </div>

            {dept.gallery && dept.gallery.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <h3 className="font-black text-base text-slate-900 dark:text-white">
                  معرض مرافق وصالة التأهيل
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {dept.gallery.map((g, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="h-52 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
                        <img src={g.url} alt={g.caption} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{g.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 5. Department Services List with Direct Booking Prefill */}
        {deptServices.length > 0 && (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  الخدمات والإجراءات الطبية المتاحة بالقسم
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  اختر الخدمة للاطلاع على تفاصيلها ومراحلها الثلاث أو احجز مباشرة
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deptServices.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-secondary-500" />
                        <span>{srv.durationNote}</span>
                      </span>
                      {srv.featured && (
                        <span className="px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-600 dark:text-gold-300 text-[10px] font-black">
                          ★ مميزة
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      <Link to={`/services/${srv.slug}`} className="hover:text-primary-700 dark:hover:text-secondary-400 transition-colors">
                        {srv.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {srv.shortDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <Link
                      to={`/services/${srv.slug}`}
                      className="text-xs font-bold text-primary-700 dark:text-secondary-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>تفاصيل الخدمة ومراحلها</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      to={`/booking?dept=${dept.id}&service=${srv.id}`}
                      className="px-4 py-2 rounded-xl bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>احجز هذه الخدمة</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Linked Doctor / Medical Team */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            الإشراف الطبي والكادر المتخصص
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="sm:col-span-4 flex justify-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-primary-500/30 shadow-md">
                <img
                  src={dept.doctorImage || '/assets/doctor_photo.webp'}
                  alt={dept.headDoctor}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = '/assets/doctor_real.jpg'; }}
                />
              </div>
            </div>

            <div className="sm:col-span-8 space-y-3">
              <div>
                <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
                  {dept.headDoctor}
                </h3>
                <p className="text-xs font-bold text-primary-700 dark:text-secondary-400 mt-0.5">
                  {dept.doctorRole}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {dept.doctorBio}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to={`/booking?dept=${dept.id}`}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-700 to-secondary-500 text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-gold-300" />
                  <span>طلب موعد استشارة مع الطبيب</span>
                </Link>

                <Link
                  to="/about"
                  className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-primary-700 px-3 py-2"
                >
                  السيرة الذاتية الكاملة ←
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Linked Topics & Procedures from Medical Library */}
        {deptTopics.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  مقالات وإجراءات طبية مرتبطة بالقسم
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  معلومات طبية موثوقة حول حالات العمود الفقري وطرق العلاج الحديثة
                </p>
              </div>
              <Link to="/library" className="text-xs font-bold text-primary-700 dark:text-secondary-400 hover:underline">
                المكتبة الطبية الكاملة ←
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {deptTopics.map((item) => (
                <Link
                  key={item.id}
                  to={`/library/${item.slug}`}
                  className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md hover:border-primary-300 dark:hover:border-secondary-700 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-secondary-400">
                      {item.typeLabel}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-primary-600 dark:text-secondary-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    اقرأ المزيد <ChevronLeft className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 8. Linked Success Stories */}
        {deptStories.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  قصص نجاح وتجارب شفاء معتمدة
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  تجارب واقعية لمرضى استعادوا عافيتهم وحركتهم الطبيعية بعد العلاج
                </p>
              </div>
              <Link to="/media-center" className="text-xs font-bold text-primary-700 dark:text-secondary-400 hover:underline">
                جميع قصص النجاح ←
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {deptStories.slice(0, 2).map((story) => (
                <div
                  key={story.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      ✓ حالة تعافي معتمدة
                    </span>
                    <span className="text-[11px] text-slate-400">{story.date}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {story.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {story.summary}
                  </p>
                  <div className="pt-2 text-[11px] text-primary-700 dark:text-secondary-400 font-semibold">
                    المريض: {story.patient}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 9. Department FAQs (الأسئلة الشائعة) */}
        {dept.faqs && dept.faqs.length > 0 && (
          <section className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                الأسئلة الشائعة حول هذا القسم
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                إجابات تفصيلية من استشاريي نوديسك على أبرز استفسارات المراجعين
              </p>
            </div>

            <div className="space-y-3">
              {dept.faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-5 py-4 text-right flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isOpen ? 'rotate-180 text-primary-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 10. Working Hours, Location & Final CTA */}
        <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-primary-800/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h2 className="text-xl sm:text-2xl font-black">
                هل تحتاج لتقييم حالتك في {dept.nameAr}؟
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                احجز موعدك الآن عبر نظام الحجز الإلكتروني أو تواصل مباشرة مع منسق العيادة
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-secondary-400" />
                  {dept.workingHoursNote}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  {dept.contactNote}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  صنعاء — مركز ابن سيناء الطبي
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-wrap gap-3 justify-start lg:justify-end">
              {dept.isPharmacy ? (
                <Link
                  to="/nodisc-store"
                  className="px-6 py-3 rounded-2xl bg-white text-primary-950 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-md"
                >
                  فتح المتجر الطبي
                </Link>
              ) : (
                <Link
                  to={`/booking?dept=${dept.id}`}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary-600 via-secondary-500 to-teal-400 hover:from-primary-700 hover:to-teal-500 text-white font-black text-xs sm:text-sm transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-gold-300" />
                  <span>احجز موعدك الآن</span>
                </Link>
              )}
              <Link
                to="/contact"
                className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-colors"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
