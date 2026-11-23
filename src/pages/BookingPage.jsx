import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { departmentsData } from '../data/departmentsData';
import { servicesData } from '../data/servicesData';
import {
  saveOrUpdateAppointment,
  findAppointmentByQuery,
  cancelStoredAppointment,
  getStoredAppointments
} from '../data/appointmentsData';
import Breadcrumbs from '../components/common/Breadcrumbs';
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  MapPin,
  MessageSquare,
  Gift,
  FileCheck,
  Stethoscope,
  Activity,
  ArrowRight,
  Send,
  Loader2,
  Building2,
  FileText,
  Search,
  Edit3,
  XCircle,
  Undo2,
  Sparkles
} from 'lucide-react';

const getVisitTypesList = (isAr) => [
  { id: 'new_consult', label: isAr ? 'كشف استشاري ومعاينة جديدة' : 'New Consultation & Examination', badge: isAr ? 'عيادة تخصصية' : 'Specialty Clinic' },
  { id: 'follow_up', label: isAr ? 'مراجعة حالة سابقة وفحص دوري' : 'Follow-up & Periodic Check', badge: isAr ? 'متابعة' : 'Follow-up' },
  { id: 'second_opinion', label: isAr ? 'رأي طبي ثانٍ وقراءة صور الرنين المغناطيسي' : 'Second Opinion & MRI Review', badge: isAr ? 'قراءة MRI' : 'MRI Review' },
  { id: 'surgery_eval', label: isAr ? 'تقييم جراحي ميكروسكوبي وتثبيت فقرات' : 'Microsurgery & Spinal Fusion Evaluation', badge: isAr ? 'حالات جراحية' : 'Surgical Cases' },
  { id: 'nodisc_rehab', label: isAr ? 'جلسة تأهيل وعلاج طبيعي بمركز نوديسك' : 'Nodisc Rehab & Physiotherapy Session', badge: isAr ? 'علاج تحفظي' : 'Conservative Treatment' },
  { id: 'free_campaign', label: isAr ? 'حجز مقعد ضمن اليوم الطبي المجاني' : 'Reserve a Seat in the Free Medical Day', badge: isAr ? 'مبادرة مجتمعية' : 'Community Initiative', isFree: true },
];

const getPeriodOptions = (isAr) => [
  { id: 'morning', label: isAr ? 'الفترة الصباحية (09:00 ص – 02:00 م)' : 'Morning Period (09:00 AM – 02:00 PM)', timeText: isAr ? '09:00 ص – 02:00 م' : '09:00 AM – 02:00 PM' },
  { id: 'evening', label: isAr ? 'الفترة المسائية (04:00 م – 09:00 م)' : 'Evening Period (04:00 PM – 09:00 PM)', timeText: isAr ? '04:00 م – 09:00 م' : '04:00 PM – 09:00 PM' },
];

export default function BookingPage() {
  const { t, lang } = useLanguage();
  const isAr = lang === 'ar';
  const visitTypesList = getVisitTypesList(isAr);
  const periodOptions = getPeriodOptions(isAr);
  const [searchParams] = useSearchParams();

  // Active View Tab: 'new' (New / Edit Form) | 'lookup' (Query & Manage)
  const [activeTab, setActiveTab] = useState('new');

  // Edit Mode Tracking
  const [editingCode, setEditingCode] = useState(null);

  // Lookup / Query State
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupSearched, setLookupSearched] = useState(false);

  // Campaign State
  const totalCampaignSeats = 50;
  const [bookedCampaignSeats, setBookedCampaignSeats] = useState(43);
  const remainingCampaignSeats = totalCampaignSeats - bookedCampaignSeats;

  // Form Fields
  const [departmentId, setDepartmentId] = useState('neurosurgery');
  const [serviceId, setServiceId] = useState('srv-neuro-consult');
  const [doctorId, setDoctorId] = useState('د. محمد عبد الله الجرباني');
  const [visitType, setVisitType] = useState('new_consult');
  const [preferredDay, setPreferredDay] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  });
  const [preferredPeriod, setPreferredPeriod] = useState('morning');
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [previousFileNumber, setPreviousFileNumber] = useState('');
  const [notes, setNotes] = useState('');

  // UI States
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedVoucher, setSubmittedVoucher] = useState(null);

  // Read URL query params
  useEffect(() => {
    const deptParam = searchParams.get('dept');
    const srvParam = searchParams.get('service');
    const typeParam = searchParams.get('type');
    const lookupParam = searchParams.get('lookup');

    if (deptParam && departmentsData.some(d => d.id === deptParam)) {
      setDepartmentId(deptParam);
    }
    if (srvParam && servicesData.some(s => s.id === srvParam || s.slug === srvParam)) {
      const match = servicesData.find(s => s.id === srvParam || s.slug === srvParam);
      if (match) {
        setServiceId(match.id);
        setDepartmentId(match.departmentId);
        setDoctorId(match.doctorName);
      }
    }
    if (typeParam === 'free_campaign') {
      setVisitType('free_campaign');
    }
    if (lookupParam) {
      setActiveTab('lookup');
      setLookupQuery(lookupParam);
      const res = findAppointmentByQuery(lookupParam);
      setLookupResult(res);
      setLookupSearched(true);
    }
  }, [searchParams]);

  // Available services for the chosen department
  const availableServices = servicesData.filter(s => s.departmentId === departmentId);

  // When department changes, sync service and doctor
  const handleDepartmentChange = (newDeptId) => {
    setDepartmentId(newDeptId);
    const matchedServices = servicesData.filter(s => s.departmentId === newDeptId);
    if (matchedServices.length > 0) {
      setServiceId(matchedServices[0].id);
      setDoctorId(matchedServices[0].doctorName);
    } else {
      setServiceId('');
    }
  };

  // When service changes, sync doctor
  const handleServiceChange = (newSrvId) => {
    setServiceId(newSrvId);
    const srv = servicesData.find(s => s.id === newSrvId);
    if (srv) {
      setDoctorId(srv.doctorName);
    }
  };

  const validate = () => {
    const errs = {};
    if (!departmentId) errs.departmentId = 'يرجى اختيار القسم الطبي المطلوب';
    if (!serviceId) errs.serviceId = 'يرجى اختيار الخدمة أو نوع الاستشارة';
    if (!preferredDay) errs.preferredDay = 'يرجى تحديد التاريخ المناسب';
    if (patientName.trim().length < 3) errs.patientName = 'يرجى كتابة اسم المريض بالكامل (ثلاثي على الأقل)';
    if (phone.replace(/\D/g, '').length < 8) errs.phone = 'يرجى إدخال رقم هاتف صحيح للتواصل وتأكيد الحجز';
    if (visitType === 'free_campaign' && remainingCampaignSeats <= 0 && !editingCode) {
      errs.visitType = 'نعتذر، اكتملت كافة المقاعد المخصصة للحملة المجانية';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Form Submission (Both New Booking & Editing Existing Booking)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      if (visitType === 'free_campaign' && !editingCode) {
        setBookedCampaignSeats(prev => Math.min(totalCampaignSeats, prev + 1));
      }

      // Preserve existing code if editing, or generate a fresh one
      const refCode = editingCode || `ND-${Math.floor(100000 + Math.random() * 900000)}`;
      const selectedDept = departmentsData.find(d => d.id === departmentId);
      const selectedSrv = servicesData.find(s => s.id === serviceId);
      const selectedVt = visitTypesList.find(v => v.id === visitType);
      const periodObj = periodOptions.find(p => p.id === preferredPeriod);

      const voucher = {
        code: refCode,
        patientName: patientName.trim(),
        phone: phone.trim(),
        departmentId,
        departmentName: selectedDept?.nameAr || 'قسم جراحة المخ والأعصاب',
        serviceId,
        serviceTitle: selectedSrv?.title || 'استشارة طبية',
        doctorName: doctorId || selectedDept?.headDoctor,
        visitType,
        visitTypeLabel: selectedVt?.label,
        isFreeCampaign: visitType === 'free_campaign',
        date: preferredDay,
        period: preferredPeriod,
        periodText: periodObj?.timeText || 'الفترة الصباحية',
        fileNumber: previousFileNumber.trim() || 'غير مسجل مسبقاً',
        notes: notes.trim() || 'لا توجد ملاحظات إضافية',
        status: editingCode ? 'modified' : 'confirmed',
        createdAt: new Date().toLocaleDateString('ar-YE', { dateStyle: 'full' }),
      };

      // Persist in localStorage
      saveOrUpdateAppointment(voucher);

      setSubmittedVoucher(voucher);
      setIsSubmitting(false);

      // WhatsApp Message
      const actionTitle = editingCode ? 'تحديث وتعديل موعد سابق' : 'تأكيد حجز موعد جديد';
      const text = `السلام عليكم ورحمة الله، أود ${actionTitle} في نوديسك كلينك (د. محمد الجرباني):\n\n🎫 رقم الحجز المرجعي: ${voucher.code}\n👤 اسم المريض: ${voucher.patientName}\n📞 رقم الهاتف: ${voucher.phone}\n🏥 القسم: ${voucher.departmentName}\n🩺 الخدمة المطلوبة: ${voucher.serviceTitle}\n👨‍⚕️ الطبيب: ${voucher.doctorName}\n📋 نوع الزيارة: ${voucher.visitTypeLabel}\n📅 التاريخ: ${voucher.date}\n⏰ الفترة: ${voucher.periodText}\n🗂 رقم الملف: ${voucher.fileNumber}\n📝 الملاحظات والشكوى: ${voucher.notes}`;
      const whatsappUrl = `https://wa.me/967772070207?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  // Start Editing an Existing Booking
  const handleStartEdit = (booking) => {
    setEditingCode(booking.code);
    setDepartmentId(booking.departmentId || 'neurosurgery');
    setServiceId(booking.serviceId || 'srv-neuro-consult');
    setDoctorId(booking.doctorName || 'د. محمد عبد الله الجرباني');
    setVisitType(booking.visitType || 'new_consult');
    setPreferredDay(booking.date || '');
    setPreferredPeriod(booking.period || 'morning');
    setPatientName(booking.patientName || '');
    setPhone(booking.phone || '');
    setPreviousFileNumber(booking.fileNumber === 'غير مسجل مسبقاً' ? '' : (booking.fileNumber || ''));
    setNotes(booking.notes === 'لا توجد ملاحظات إضافية' ? '' : (booking.notes || ''));

    setSubmittedVoucher(null);
    setActiveTab('new');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Cancel an Appointment
  const handleCancelBooking = (code) => {
    if (window.confirm(`هل أنت متأكد من رغبتك في إلغاء الحجز رقم (${code})؟`)) {
      cancelStoredAppointment(code);
      if (submittedVoucher && submittedVoucher.code === code) {
        setSubmittedVoucher(prev => ({ ...prev, status: 'cancelled' }));
      }
      if (lookupResult && lookupResult.code === code) {
        setLookupResult(prev => ({ ...prev, status: 'cancelled' }));
      }
      alert('تم إلغاء الحجز بنجاح. يمكنك مراسلة العيادة عبر الواتساب في حال رغبت بتنسيق موعد بديل.');
    }
  };

  // Lookup Form Search Action
  const handleLookupSearch = (e) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;
    const res = findAppointmentByQuery(lookupQuery.trim());
    setLookupResult(res);
    setLookupSearched(true);
  };

  const selectedDeptObj = departmentsData.find(d => d.id === departmentId);
  const selectedSrvObj = servicesData.find(s => s.id === serviceId);
  const selectedVtObj = visitTypesList.find(v => v.id === visitType);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 sm:py-16 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{ label: 'حجز موعد طبي' }]} />

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-800 dark:text-primary-300 text-xs font-bold border border-primary-200 dark:border-primary-800">
            <Calendar className="w-3.5 h-3.5 text-gold-500" />
            <span>نظام الحجز والتعديل الذكي الموحد</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            حجز موعد واستشارة طبية في نوديسك
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            احجز موعدك بسهولة، أو استعلم عن حجز سابق لتعديل التاريخ أو التوقيت أو البيانات في أي وقت.
          </p>

          {/* Mode Navigation Tabs */}
          <div className="pt-3 flex justify-center">
            <div className="p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm inline-flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('new');
                  if (submittedVoucher) setSubmittedVoucher(null);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'new'
                    ? 'bg-primary-700 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{editingCode ? `تعديل الحجز (${editingCode})` : 'حجز موعد جديد'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('lookup')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'lookup'
                    ? 'bg-primary-700 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>الاستعلام أو تعديل حجز سابق</span>
              </button>
            </div>
          </div>
        </div>

        {/* Free Campaign Banner (Only in new mode) */}
        {activeTab === 'new' && !editingCode && !submittedVoucher && (
          <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-amber-600 via-gold-600 to-amber-700 text-slate-950 shadow-lg border border-amber-400/40 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/20 text-slate-950 text-xs font-bold mb-2">
                  <Gift className="w-3.5 h-3.5" />
                  <span>حملة طبية مجانية نشطة حالياً</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black">
                  اليوم الطبي المجاني لفحص آلام الظهر والانزلاق الغضروفي
                </h3>
                <p className="text-xs text-slate-900/80 font-medium leading-relaxed">
                  معاينة واستشارة مجانية وقراءة صور الرنين المغناطيسي بإشراف الدكتور محمد عبد الله الجرباني وفريق نوديسك بمركز ابن سينا.
                </p>
              </div>

              <div className="sm:text-left shrink-0 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/50">
                <div className="text-[11px] font-bold text-slate-900 mb-1">المقاعد المتبقية:</div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black font-mono">{remainingCampaignSeats}</span>
                  <span className="text-xs font-bold text-slate-800">من أصل {totalCampaignSeats} مقعد</span>
                </div>
                <div className="w-36 h-2 rounded-full bg-slate-900/20 mt-2 overflow-hidden">
                  <div
                    className="h-full bg-slate-950 rounded-full transition-all duration-500"
                    style={{ width: `${(bookedCampaignSeats / totalCampaignSeats) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-950/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVisitType('free_campaign')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    visitType === 'free_campaign'
                      ? 'bg-slate-950 text-gold-300 ring-2 ring-gold-400'
                      : 'bg-slate-950 text-white hover:bg-slate-900'
                  }`}
                >
                  {visitType === 'free_campaign' ? '✓ تم تحديد خيار الحملة المجانية' : 'حجز مقعد ضمن الحملة المجانية الآن'}
                </button>
                <Link
                  to="/campaigns"
                  className="px-3 py-2 rounded-xl bg-white/30 hover:bg-white/40 text-slate-950 font-bold text-xs transition-colors"
                >
                  عرض تفاصيل كافة الحملات ←
                </Link>
              </div>
              <span className="text-[11px] font-bold opacity-80">يغلق الحجز تلقائياً عند اكتمال الـ 50 مقعداً</span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: LOOKUP & MANAGE PREVIOUS BOOKINGS                       */}
        {/* ============================================================== */}
        {activeTab === 'lookup' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-secondary-400 flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    الاستعلام عن حجز سابق لتعديله أو إلغائه
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    أدخل رقم الحجز المرجعي (مثال: ND-849201) أو رقم هاتفك المسجل أثناء الحجز
                  </p>
                </div>
              </div>

              <form onSubmit={handleLookupSearch} className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={lookupQuery}
                    onChange={(e) => setLookupQuery(e.target.value)}
                    placeholder="رقم الحجز (ND-XXXXXX) أو رقم الهاتف..."
                    className="w-full pr-10 pl-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>بحث واستعلام</span>
                </button>
              </form>

              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
                <span>نماذج سريعة للتجربة:</span>
                <button
                  type="button"
                  onClick={() => {
                    setLookupQuery('ND-849201');
                    const r = findAppointmentByQuery('ND-849201');
                    setLookupResult(r);
                    setLookupSearched(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-primary-700 dark:text-secondary-400 font-mono font-bold hover:underline"
                >
                  ND-849201
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLookupQuery('772070207');
                    const r = findAppointmentByQuery('772070207');
                    setLookupResult(r);
                    setLookupSearched(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-primary-700 dark:text-secondary-400 font-mono font-bold hover:underline"
                >
                  772070207
                </button>
              </div>
            </div>

            {/* Lookup Result Card */}
            {lookupSearched && (
              lookupResult ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-primary-500/30 dark:border-secondary-500/30 shadow-xl space-y-6 animate-in zoom-in-95">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <FileCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block mb-0.5">سند الموعد المسجل:</span>
                        <h3 className="text-xl font-black font-mono text-primary-700 dark:text-secondary-400" dir="ltr">
                          {lookupResult.code}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                        lookupResult.status === 'cancelled'
                          ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:border-red-800'
                          : lookupResult.status === 'modified'
                          ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800'
                      }`}
                    >
                      {lookupResult.status === 'cancelled'
                        ? 'ملغي'
                        : lookupResult.status === 'modified'
                        ? 'معدّل'
                        : 'مؤكد في النظام'}
                    </span>
                  </div>

                  {/* Booking Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-slate-400 block mb-0.5">اسم المريض:</span>
                      <strong className="text-slate-900 dark:text-white text-sm">{lookupResult.patientName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">رقم الهاتف للتواصل:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white" dir="ltr">{lookupResult.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">القسم الطبي:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{lookupResult.departmentName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">الخدمة المطلوبة:</span>
                      <span className="font-semibold text-primary-700 dark:text-secondary-400">{lookupResult.serviceTitle}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">تاريخ الحضور:</span>
                      <span className="font-bold text-slate-900 dark:text-white text-xs">{lookupResult.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">الفترة الزمنية:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{lookupResult.periodText}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-400 block mb-0.5">الملاحظات والشكوى:</span>
                      <p className="text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                        {lookupResult.notes}
                      </p>
                    </div>
                  </div>

                  {/* Actions for this Found Booking */}
                  {lookupResult.status !== 'cancelled' ? (
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {/* EDIT BUTTON */}
                      <button
                        type="button"
                        onClick={() => handleStartEdit(lookupResult)}
                        className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-primary-700 to-secondary-500 hover:from-primary-800 hover:to-secondary-600 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>تعديل تفاصيل الموعد الآن</span>
                      </button>

                      {/* CANCEL BUTTON */}
                      <button
                        type="button"
                        onClick={() => handleCancelBooking(lookupResult.code)}
                        className="py-3 px-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/40 dark:hover:bg-red-900/60 font-bold text-xs border border-red-200 dark:border-red-800 flex items-center gap-1.5 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>إلغاء الحجز</span>
                      </button>

                      {/* WHATSAPP RE-CONFIRM */}
                      <a
                        href={`https://wa.me/967772070207?text=${encodeURIComponent(`السلام عليكم، بخصوص الحجز رقم ${lookupResult.code} باسم ${lookupResult.patientName}، أود الاستفسار والتأكيد.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-500" />
                        <span>مراسلة واتساب</span>
                      </a>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-center space-y-2">
                      <p className="text-xs text-red-700 dark:text-red-300 font-bold">هذا الحجز تم إلغاؤه مسبقاً.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCode(null);
                          setActiveTab('new');
                        }}
                        className="px-5 py-2 rounded-xl bg-primary-700 text-white text-xs font-bold"
                      >
                        حجز موعد بديل جديد
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center space-y-3">
                  <AlertCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">لم يتم العثور على أي حجز مطابق</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    تأكد من كتابة كود الحجز مثل (ND-849201) أو رقم الهاتف المعتمد أثناء تسجيل الحجز.
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 1: NEW BOOKING / EDIT MODE FORM                            */}
        {/* ============================================================== */}
        {activeTab === 'new' && (
          submittedVoucher ? (
            /* Result Voucher (If submitted or updated) */
            <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-500/40 dark:border-emerald-500/30 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-8 h-8 shrink-0" />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {submittedVoucher.status === 'modified'
                        ? 'تم تحديث وتعديل بيانات الحجز بنجاح!'
                        : 'تم استلام طلب حجز الموعد بنجاح!'}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {submittedVoucher.status === 'modified'
                        ? 'تم حفظ التعديلات وإصدار السند المحدث بنفس الكود المرجعي'
                        : 'تم إصدار سند الموعد المرجعي وإرسال التفاصيل مباشرة لمنسق العيادة'}
                    </p>
                  </div>
                </div>

                <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-800">
                  {submittedVoucher.status === 'modified' ? 'تم التعديل' : 'حجز مؤكد'}
                </span>
              </div>

              {/* Voucher Details */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">رقم الحجز المرجعي:</span>
                  <span className="text-xl font-black font-mono text-primary-700 dark:text-secondary-400" dir="ltr">
                    {submittedVoucher.code}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">اسم المريض:</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{submittedVoucher.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">القسم الطبي:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{submittedVoucher.departmentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">الخدمة المطلوبة:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{submittedVoucher.serviceTitle}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">الطبيب المشرف:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{submittedVoucher.doctorName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">نوع الموعد:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{submittedVoucher.visitTypeLabel}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">التاريخ والفترة:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{submittedVoucher.date} — {submittedVoucher.periodText}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">رقم الهاتف:</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200" dir="ltr">{submittedVoucher.phone}</span>
                </div>
              </div>

              {/* Simulated SMS Box */}
              <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-primary-800 dark:text-sky-300">
                  <MessageSquare className="w-4 h-4" />
                  <span>رسالة التأكيد النصية (SMS Confirmation Preview):</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 p-3 rounded-xl border border-sky-100 dark:border-sky-900 leading-relaxed font-mono">
                  {`نوديسك كلينك: عزيزي/تي ${submittedVoucher.patientName}، تم ${submittedVoucher.status === 'modified' ? 'تعديل' : 'استلام'} طلب حجزكم (${submittedVoucher.serviceTitle}) ليوم ${submittedVoucher.date} (${submittedVoucher.periodText}) بمركز ابن سينا بصنعاء. رقم الحجز: ${submittedVoucher.code}. للتواصل: 784545908.`}
                </p>
              </div>

              {/* Action Buttons: Includes Direct Edit Button */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* 1. WHATSAPP CONFIRMATION */}
                <a
                  href={`https://wa.me/967772070207?text=${encodeURIComponent(`السلام عليكم، تم ${submittedVoucher.status === 'modified' ? 'تعديل' : 'حجز'} موعد برقم مرجعي: ${submittedVoucher.code} باسم ${submittedVoucher.patientName} لتأكيد الحضور.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال وتأكيد السند عبر الواتساب</span>
                </a>

                {/* 2. DIRECT EDIT BUTTON (As requested by user!) */}
                <button
                  type="button"
                  onClick={() => handleStartEdit(submittedVoucher)}
                  className="py-3.5 px-5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 font-bold text-xs sm:text-sm border border-amber-300 dark:border-amber-800 flex items-center gap-2 transition-colors"
                >
                  <Edit3 className="w-4 h-4 text-amber-600" />
                  <span>تعديل بيانات هذا الحجز</span>
                </button>

                {/* 3. BOOK ANOTHER / RESET */}
                <button
                  type="button"
                  onClick={() => {
                    setEditingCode(null);
                    setSubmittedVoucher(null);
                  }}
                  className="py-3.5 px-5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  حجز موعد جديد
                </button>
              </div>
            </div>
          ) : (
            /* Main Interactive Booking Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Booking Form */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6"
              >
                {/* EDIT MODE BANNER */}
                {editingCode && (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-400 dark:border-amber-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
                    <div className="flex items-center gap-2.5 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
                      <Edit3 className="w-5 h-5 text-amber-600 shrink-0" />
                      <div>
                        <strong>أنت الآن في وضع تعديل الحجز: </strong>
                        <span className="font-mono font-black" dir="ltr">{editingCode}</span>
                        <p className="text-[11px] opacity-80 mt-0.5">يمكنك تصحيح اليوم، الفترة، القسم، أو الشكوى، ثم الضغط على زر حفظ التعديلات أدناه.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCode(null);
                        setPatientName('');
                        setPhone('');
                        setNotes('');
                        setPreviousFileNumber('');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-bold shrink-0 hover:bg-amber-100 transition-colors flex items-center gap-1"
                    >
                      <Undo2 className="w-3.5 h-3.5" />
                      <span>إلغاء التعديل</span>
                    </button>
                  </div>
                )}

                {/* Step 1: Department & Service */}
                <div className="space-y-4">
                  <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <Building2 className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
                    <span>1. القسم والخدمة التخصصية</span>
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Department Select */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        القسم الطبي التخصصي *:
                      </label>
                      <select
                        value={departmentId}
                        onChange={(e) => handleDepartmentChange(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      >
                        {departmentsData.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.nameAr}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Service Select */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        الخدمة أو الإجراء المطلوب *:
                      </label>
                      <select
                        value={serviceId}
                        onChange={(e) => handleServiceChange(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white ${
                          errors.serviceId ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {availableServices.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                      {errors.serviceId && <p className="text-[11px] text-red-500 mt-1">{errors.serviceId}</p>}
                    </div>
                  </div>

                  {/* Doctor Info Card */}
                  <div className="p-3.5 rounded-2xl bg-primary-50/60 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-900 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
                      <span className="text-slate-600 dark:text-slate-300">الطبيب المشرف على الاستشارة:</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{doctorId}</strong>
                    </div>
                    <span className="text-[11px] text-primary-700 dark:text-secondary-400 font-semibold">
                      مركز ابن سينا التخصصي
                    </span>
                  </div>
                </div>

                {/* Step 2: Visit Type */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <Activity className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
                    <span>2. نوع الزيارة والغرض من الموعد</span>
                  </h3>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {visitTypesList.map((vt) => {
                      const isSelected = visitType === vt.id;
                      return (
                        <div
                          key={vt.id}
                          onClick={() => setVisitType(vt.id)}
                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-950/40 shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                vt.isFree
                                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              {vt.badge}
                            </span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-primary-600 bg-primary-600' : 'border-slate-300 dark:border-slate-600'
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                            {vt.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Date & Time Period */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <Calendar className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
                    <span>3. اليوم والفترة الزمنية المناسبة</span>
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        تاريخ الموعد المفضل *:
                      </label>
                      <input
                        type="date"
                        value={preferredDay}
                        onChange={(e) => setPreferredDay(e.target.value)}
                        min={new Date().toISOString().slice(0, 10)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        الفترة الزمنية المفضلة *:
                      </label>
                      <select
                        value={preferredPeriod}
                        onChange={(e) => setPreferredPeriod(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      >
                        {periodOptions.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Step 4: Patient Info */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <User className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
                    <span>4. بيانات المريض والتواصل</span>
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        اسم المريض بالكامل *:
                      </label>
                      <input
                        type="text"
                        placeholder="مثال: محمد عبدالله الشامي"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white ${
                          errors.patientName ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                        }`}
                      />
                      {errors.patientName && <p className="text-[11px] text-red-500 mt-1">{errors.patientName}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        رقم الهاتف / الواتساب *:
                      </label>
                      <input
                        type="tel"
                        dir="ltr"
                        placeholder="77XXXXXXXX أو 78XXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white tabular-nums ${
                          errors.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                    </div>

                    {/* Previous File Number */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        رقم الملف الطبي بالمركز (إن وُجد مسبقاً):
                      </label>
                      <input
                        type="text"
                        placeholder="مثال: MED-4921 (اختياري للزيارات السابقة)"
                        value={previousFileNumber}
                        onChange={(e) => setPreviousFileNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    {/* Medical Notes */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        ملاحظات أو شكوى طبية (ألم ظهر، رقبة، عرق النسا، رنين مغناطيسي...):
                      </label>
                      <textarea
                        rows={3}
                        placeholder="اكتب باختصار موقع الألم وشدته وما إذا كانت توجد صور رنين مغناطيسي حديثة..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-500 hover:from-primary-800 hover:to-secondary-600 text-white font-black text-sm shadow-lg shadow-primary-700/20 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{editingCode ? 'جاري تحديث بيانات الحجز...' : 'جاري تسجيل الموعد وإصدار السند...'}</span>
                      </>
                    ) : (
                      <>
                        {editingCode ? <Edit3 className="w-5 h-5 text-gold-300" /> : <Calendar className="w-5 h-5 text-gold-300" />}
                        <span>{editingCode ? `حفظ التعديلات وتحديث الحجز (${editingCode})` : 'تأكيد طلب الحجز وإصدار سند الموعد'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {editingCode && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCode(null);
                        setPatientName('');
                        setPhone('');
                        setNotes('');
                        setPreviousFileNumber('');
                      }}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      إلغاء وضع التعديل والبدء بحجز جديد
                    </button>
                  )}
                </div>
              </form>

              {/* Live Summary Panel (Side) */}
              <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-primary-600 dark:text-secondary-400" />
                    <span>{editingCode ? 'ملخص التعديل للحجز' : 'الملخص المباشر لطلب الحجز'}</span>
                  </h3>

                  {editingCode && (
                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 font-bold flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5 shrink-0" />
                      <span>تعديل رقم الحجز: {editingCode}</span>
                    </div>
                  )}

                  <dl className="space-y-3 text-xs">
                    <div>
                      <dt className="text-slate-400 mb-0.5">القسم الطبي:</dt>
                      <dd className="font-bold text-slate-900 dark:text-white">{selectedDeptObj?.nameAr || '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 mb-0.5">الخدمة التخصصية:</dt>
                      <dd className="font-bold text-primary-700 dark:text-secondary-400">{selectedSrvObj?.title || '—'}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 mb-0.5">الطبيب المشرف:</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{doctorId}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 mb-0.5">نوع الموعد:</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">{selectedVtObj?.label}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 mb-0.5">التاريخ والفترة:</dt>
                      <dd className="font-semibold text-slate-800 dark:text-slate-200">
                        {preferredDay} · {periodOptions.find(p => p.id === preferredPeriod)?.label}
                      </dd>
                    </div>
                  </dl>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span>مركز ابن سينا الطبي — صنعاء</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                      <span>استفسار فوري: 784545908</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )
        )}
      </div>
    </div>
  );
}
