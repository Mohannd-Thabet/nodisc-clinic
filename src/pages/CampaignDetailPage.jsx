import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getCampaignBySlug } from '../data/campaignsData';
import Breadcrumbs from '../components/common/Breadcrumbs';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Gift,
  Share2,
  MessageCircle,
  ArrowLeft,
  ChevronLeft,
  FileText,
  ShieldCheck,
  Send,
  PhoneCall,
  SlidersHorizontal
} from 'lucide-react';

const statusConfig = {
  open: {
    label: 'التسجيل مفتوح الآن',
    badgeClass: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    barClass: 'bg-emerald-500',
    icon: CheckCircle2,
  },
  full: {
    label: 'اكتملت المقاعد',
    badgeClass: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    barClass: 'bg-amber-500',
    icon: XCircle,
  },
  scheduled: {
    label: 'قادمة قريباً',
    badgeClass: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30',
    barClass: 'bg-sky-500',
    icon: AlertCircle,
  },
  ended: {
    label: 'انتهت الحملة',
    badgeClass: 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30',
    barClass: 'bg-slate-400',
    icon: XCircle,
  },
};

export default function CampaignDetailPage() {
  const { slug } = useParams();
  const campaign = getCampaignBySlug(slug);

  // States
  const [previewStatus, setPreviewStatus] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [hasMri, setHasMri] = useState('yes');
  const [registeredRef, setRegisteredRef] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!campaign) return <Navigate to="/campaigns" replace />;

  const currentStatus = previewStatus || campaign.status;
  const sc = statusConfig[currentStatus] || statusConfig.ended;
  const StatusIcon = sc.icon;

  const bookedCount = currentStatus === 'full' ? campaign.totalCapacity : campaign.bookedCount;
  const remainingSeats =
    currentStatus === 'full'
      ? 0
      : Math.max(0, campaign.totalCapacity - bookedCount);
  const percentage = Math.min(
    100,
    Math.round((bookedCount / campaign.totalCapacity) * 100)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (patientName.trim().length < 3) {
      setErrorMsg('يرجى إدخال اسم المريض الثلاثي بشكل صحيح.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 7) {
      setErrorMsg('يرجى إدخال رقم هاتف يمني صحيح (مثال: 772070207 أو 784545908).');
      return;
    }

    // Generate Reference ID
    const refId = `CMP-${Math.floor(10000 + Math.random() * 90000)}`;
    setRegisteredRef({
      refId,
      name: patientName.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
      hasMri,
      time: new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' }),
    });
  };

  const shareText = `طلب تسجيل في الحملة المجانية:\nالمريض: ${patientName}\nالرقم: ${phone}\nالحملة: ${campaign.title}\nالمرجع: ${registeredRef?.refId}`;
  const whatsappUrl = `https://wa.me/967772070207?text=${encodeURIComponent(
    `السلام عليكم، قمت بالتسجيل في ${campaign.title}.\nالاسم: ${registeredRef?.name}\nالرقم المرجعي: ${registeredRef?.refId}\nرقم التواصل: ${registeredRef?.phone}`
  )}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-16">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-primary-950 to-slate-900 text-white py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-400 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${sc.badgeClass}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              <span>{sc.label}</span>
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-300 font-semibold">{campaign.departmentName}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight mb-3">
            {campaign.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {campaign.serviceSummary}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { label: 'الحملات الطبية', to: '/campaigns' },
            { label: campaign.title },
          ]}
        />

        {/* State Preview Switcher for Reviewers (same as nodisc-clinic) */}
        <div className="my-6 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <SlidersHorizontal className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
            <span>لوحة تجربة واختبار حالات الحملة (Reviewer Mode):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setPreviewStatus(null);
                setRegisteredRef(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                previewStatus === null
                  ? 'bg-primary-700 text-white border-primary-700 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              الحالة الحقيقية
            </button>
            <button
              onClick={() => {
                setPreviewStatus('open');
                setRegisteredRef(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                previewStatus === 'open'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              مفتوح للتسجيل
            </button>
            <button
              onClick={() => {
                setPreviewStatus('full');
                setRegisteredRef(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                previewStatus === 'full'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              اكتملت المقاعد
            </button>
            <button
              onClick={() => {
                setPreviewStatus('scheduled');
                setRegisteredRef(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                previewStatus === 'scheduled'
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              مجدولة قريباً
            </button>
            <button
              onClick={() => {
                setPreviewStatus('ended');
                setRegisteredRef(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                previewStatus === 'ended'
                  ? 'bg-slate-700 text-white border-slate-700 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              منتهية (أرشيف)
            </button>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Main Details Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Featured Image */}
            <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 aspect-video relative bg-slate-900">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/full_logo.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Campaign Specifications Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Gift className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>تفاصيل ومواعيد الحملة الطبية</span>
              </h2>

              {/* Data Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <Calendar className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
                    <span>تاريخ ويوم الحملة:</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {campaign.dayLabel}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <Clock className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
                    <span>الفترة وساعات المعاينة:</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {campaign.periodLabel}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <MapPin className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
                    <span>الموقع والعيادة:</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {campaign.locationLabel}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <Users className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
                    <span>الطبيب المشرف:</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {campaign.doctorName}
                  </p>
                </div>
              </div>

              {/* Free Meaning Scope Callout */}
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                <h3 className="font-bold text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ماذا تشمل المجانية في هذه الحملة؟</span>
                </h3>
                <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
                  {campaign.freeScopeExplanation}
                </p>
              </div>

              {/* Guidelines & Notes */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  إرشادات وتعليمات الحضور:
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {campaign.notes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-secondary-400 shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form & Capacity (5 cols) */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 sticky top-24">
              {/* Capacity Bar Header */}
              <div className="space-y-2.5 pb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
                    <span>المقاعد الشاغرة:</span>
                  </span>
                  <span className="font-black font-mono text-slate-900 dark:text-white tabular-nums">
                    {remainingSeats} / {campaign.totalCapacity}
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${sc.barClass} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  * تخضع المقاعد لسياسة الأسبقية في التسجيل الإلكتروني، ويتم إغلاق الاستمارة فور اكتمال العدد.
                </p>
              </div>

              {/* SUCCESS STATE */}
              {registeredRef ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 text-center space-y-4 animate-in zoom-in-95">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="font-black text-lg text-emerald-900 dark:text-emerald-200">
                      تم تأكيد تسجيلك في الحملة المجانية!
                    </h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                      احتفظ بالرقم المرجعي وأظهره عند مراجعة قسم الاستقبال في مركز ابن سينا
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700/60 font-mono text-center">
                    <span className="text-[11px] text-slate-400 block mb-0.5">الرقم المرجعي للحجز:</span>
                    <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300 tracking-wider">
                      {registeredRef.refId}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 text-start space-y-1 bg-white/70 dark:bg-slate-900/70 p-3.5 rounded-xl">
                    <p><strong>المريض:</strong> {registeredRef.name}</p>
                    <p><strong>رقم الهاتف:</strong> {registeredRef.phone}</p>
                    <p><strong>موعد الحضور:</strong> {campaign.dayLabel}</p>
                    <p><strong>الفترة:</strong> {campaign.periodLabel}</p>
                  </div>

                  <div className="pt-2 space-y-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>إرسال تفاصيل الحجز عبر واتساب للتأكيد</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setRegisteredRef(null)}
                      className="w-full py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all"
                    >
                      تسجيل مريض آخر
                    </button>
                  </div>
                </div>
              ) : currentStatus === 'open' ? (
                /* REGISTRATION FORM */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                      نموذج التسجيل الفوري في الحملة
                    </h3>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      اسم المريض الثلاثي *
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="مثال: يحيى صالح الأحمدي"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      رقم الهاتف / الواتساب *
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="772070207"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:border-primary-500 text-start"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      سيتم إرسال رسالة التأكيد وموعد الحضور الدقيق إلى هذا الرقم.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      هل توجد لديك أشعة رنين مغناطيسي (MRI) سابقة؟
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setHasMri('yes')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          hasMri === 'yes'
                            ? 'bg-primary-700 text-white border-primary-700'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        نعم، متوفرة معي
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasMri('no')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          hasMri === 'no'
                            ? 'bg-primary-700 text-white border-primary-700'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        لا، فحص سريري فقط
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      وصف مختصر للشكوى أو الألم (اختياري)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="مثال: ألم أسفل الظهر يمتد للساق اليسرى منذ شهرين..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-black text-sm shadow-lg shadow-emerald-600/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>تأكيد طلب التسجيل في الحملة المجانية</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                    بالتسجيل فإنك تؤكد حضورك في التوقيت المحدد لإفساح المجال لجميع المرضى المحتاجين.
                  </p>
                </form>
              ) : (
                /* INACTIVE STATES (Full, Scheduled, Ended) */
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mx-auto text-slate-600 dark:text-slate-300">
                    <StatusIcon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {currentStatus === 'full'
                        ? 'عذراً، اكتملت جميع المقاعد المخصصة'
                        : currentStatus === 'scheduled'
                        ? 'لم يبدأ التسجيل في هذه الحملة بعد'
                        : 'انتهت فعاليات هذه الحملة الطبية'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {currentStatus === 'full'
                        ? 'تم حجز كافة المقاعد المتاحة لهذه الجولة. يمكنك التسجيل في قائمة الانتظار أو حجز موعد كشف اعتيادي مع الدكتور محمد الجرباني.'
                        : currentStatus === 'scheduled'
                        ? 'سيتم فتح نافذة التسجيل الإلكتروني قبل موعد الحملة بخمسة أيام. يمكنك متابعة الموقع أو ترك رقمك عبر الواتساب لإشعارك فور الفتح.'
                        : 'هذه الحملة منتهية ومؤرشفة في سجلات العيادة، تابعنا لمعرفة مواعيد الحملات القادمة.'}
                    </p>
                  </div>

                  <div className="pt-2 space-y-2">
                    <Link
                      to="/booking"
                      className="block w-full py-3 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs shadow-md transition-all"
                    >
                      حجز موعد عيادة اعتيادي
                    </Link>

                    <a
                      href="https://wa.me/967772070207?text=مرحباً، أود إضافتي لقائمة الانتظار للحملات الطبية القادمة"
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-all"
                    >
                      التواصل عبر واتساب (772070207)
                    </a>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
