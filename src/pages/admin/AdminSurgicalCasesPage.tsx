import React, { useState } from 'react';
import {
  Activity,
  AlertCircle,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck2,
  Filter,
  Plus,
  Scissors,
  Search,
  Sparkles,
  Stethoscope,
  UserCheck,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useLanguage } from '../../context/LanguageContext';

interface SurgicalCase {
  id: string;
  caseCode: string;
  patientName: string;
  mrn: string;
  procedureAr: string;
  category: 'spine' | 'brain' | 'microscopic' | 'pain_interventional';
  scheduledDate: string;
  timeSlot: string;
  hospital: string;
  surgeon: string;
  anesthesiaType: string;
  status: 'scheduled' | 'in_recovery' | 'completed' | 'postponed';
  preOpChecklistDone: boolean;
  notes: string;
}

const sampleSurgeries: SurgicalCase[] = [
  {
    id: 'surg-1',
    caseCode: 'SURG-2026-19',
    patientName: 'جميل عبدالله الأنسي',
    mrn: 'MRN-2026-061',
    procedureAr: 'استئصال الانزلاق الغضروفي القطني بالميكروسكوب الجراحي (Microdiscectomy L4-L5)',
    category: 'microscopic',
    scheduledDate: '2026-11-26',
    timeSlot: '09:00 ص – 11:30 ص',
    hospital: 'مركز ابن سينا الطبي التخصصي – صنعاء',
    surgeon: 'د. محمد عبدالله الجرباني',
    anesthesiaType: 'تخدير كلي (General Anesthesia)',
    status: 'scheduled',
    preOpChecklistDone: true,
    notes: 'تم فحص الرنين وتخطيط الأعصاب، تجهيز الدم وفحوصات التخثر مكتملة.',
  },
  {
    id: 'surg-2',
    caseCode: 'SURG-2026-18',
    patientName: 'أروى قاسم المطري',
    mrn: 'MRN-2026-074',
    procedureAr: 'تثبيت الفقرات العنقية الديناميكي واستئصال الغضروف C5-C6 مع قفص كربوني PEEK',
    category: 'spine',
    scheduledDate: '2026-11-28',
    timeSlot: '11:30 ص – 02:00 م',
    hospital: 'مركز ابن سينا الطبي التخصصي – صنعاء',
    surgeon: 'د. محمد عبدالله الجرباني',
    anesthesiaType: 'تخدير كلي مع مراقبة السيالات العصبية المستمرة',
    status: 'scheduled',
    preOpChecklistDone: true,
    notes: 'تحتاج متابعة ضغط الدم وموافقة استشاري الباطنية والتخدير.',
  },
  {
    id: 'surg-3',
    caseCode: 'SURG-2026-17',
    patientName: 'صادق ناجي الوادعي',
    mrn: 'MRN-2026-039',
    procedureAr: 'حقن جذور الأعصاب القطنية الموجه بالأشعة التداخلية والتردد الحراري (Radiofrequency)',
    category: 'pain_interventional',
    scheduledDate: '2026-11-22',
    timeSlot: '04:00 ع – 05:00 ع',
    hospital: 'مركز نوديسك لعلاج الألم – صنعاء',
    surgeon: 'د. محمد عبدالله الجرباني والفريق التداخلي',
    anesthesiaType: 'تخدير موضعي ومهدئ خفيف',
    status: 'completed',
    preOpChecklistDone: true,
    notes: 'تمت العملية بنجاح تام، غادر المريض بعد ساعتين مع تراجع درجات الألم 90%.',
  },
  {
    id: 'surg-4',
    caseCode: 'SURG-2026-16',
    patientName: 'مهدي حمود الحاوري',
    mrn: 'MRN-2026-028',
    procedureAr: 'إزالة ورم سحائي حميد في قاع الجمجمة بالميكروسكوب الجراحي المتطور',
    category: 'brain',
    scheduledDate: '2026-11-15',
    timeSlot: '08:00 ص – 01:30 م',
    hospital: 'مستشفى ابن سينا التخصصي – صنعاء',
    surgeon: 'د. محمد عبدالله الجرباني',
    anesthesiaType: 'تخدير كلي متقدم مع ملاحة جراحية عصبية',
    status: 'completed',
    preOpChecklistDone: true,
    notes: 'استئصال تام للورم مع الحفاظ الكامل على الأعصاب القحفية، المريض في مرحلة التأهيل النهائي.',
  },
];

export const AdminSurgicalCasesPage: React.FC = () => {
  const { lang } = useLanguage();
  const [surgeries, setSurgeries] = useState<SurgicalCase[]>(sampleSurgeries);
  const [filterCat, setFilterCat] = useState<string>('all');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const markCompleted = (id: string) => {
    setSurgeries((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'completed' } : s))
    );
    showToast('تم تسجيل اكتمال العملية ونقل الحالة إلى تقارير التعافي والتأهيل');
  };

  const filtered = surgeries.filter(
    (s) => filterCat === 'all' || s.category === filterCat
  );

  return (
    <AdminLayout
      titleAr="إدارة العمليات وجراحة المخ والأعصاب والعمود الفقري"
      titleEn="Surgical Cases & Operations Suite"
    >
      <div className="space-y-6">
        {toast && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{toast}</span>
          </div>
        )}

        {/* Top Banner Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
            <span className="text-xs font-bold text-slate-500">العمليات المجدولة القادمة</span>
            <p className="font-display font-extrabold text-2xl text-[#0F4C5C]">
              {surgeries.filter((s) => s.status === 'scheduled').length} عمليات
            </p>
            <p className="text-[11px] text-teal-700">بإشراف د. محمد الجرباني</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
            <span className="text-xs font-bold text-slate-500">عمليات ناجحة هذا الشهر</span>
            <p className="font-display font-extrabold text-2xl text-emerald-600">
              18 عملية
            </p>
            <p className="text-[11px] text-emerald-700">نسبة نجاح واستقرار 98.4%</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
            <span className="text-xs font-bold text-slate-500">جراحات الميكروسكوب والعمود الفقري</span>
            <p className="font-display font-extrabold text-2xl text-slate-900">
              82%
            </p>
            <p className="text-[11px] text-slate-500">تقنيات دقيقة ذات شق جراحي محدود</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
            <span className="text-xs font-bold text-slate-500">المستشفى والشريك الجراحي</span>
            <p className="font-display font-bold text-sm text-slate-900 mt-1">
              مركز ابن سينا التخصصي
            </p>
            <p className="text-[11px] text-slate-500">غرف عمليات معقمة بنظام العزل الهوائي</p>
          </div>
        </div>

        {/* Action & Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setFilterCat('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterCat === 'all'
                  ? 'bg-[#0F4C5C] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              الكل ({surgeries.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterCat('microscopic')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterCat === 'microscopic'
                  ? 'bg-[#0F4C5C] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              جراحة ميكروسكوبية
            </button>
            <button
              type="button"
              onClick={() => setFilterCat('spine')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterCat === 'spine'
                  ? 'bg-[#0F4C5C] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              تثبيت فقرات العمود الفقري
            </button>
            <button
              type="button"
              onClick={() => setFilterCat('brain')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterCat === 'brain'
                  ? 'bg-[#0F4C5C] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              جراحة المخ والأعصاب
            </button>
            <button
              type="button"
              onClick={() => setFilterCat('pain_interventional')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterCat === 'pain_interventional'
                  ? 'bg-[#0F4C5C] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              علاج الألم التداخلي
            </button>
          </div>

          <button
            type="button"
            onClick={() => showToast('تم فتح نافذة جدولة عملية جراحية جديدة')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F4C5C] text-white text-xs font-bold hover:bg-[#093542] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>جدولة عملية جراحية</span>
          </button>
        </div>

        {/* Surgeries Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-start font-bold">كود الحالة</th>
                  <th className="px-4 py-3 text-start font-bold">المريض</th>
                  <th className="px-4 py-3 text-start font-bold">الإجراء الجراحي</th>
                  <th className="px-4 py-3 text-start font-bold">الموعد والتوقيت</th>
                  <th className="px-4 py-3 text-start font-bold">غرفة العمليات والمستشفى</th>
                  <th className="px-4 py-3 text-start font-bold">الحالة</th>
                  <th className="px-4 py-3 text-start font-bold">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((surg) => (
                  <tr key={surg.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5 font-mono font-bold text-[#0F4C5C]">
                      {surg.caseCode}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900">{surg.patientName}</div>
                      <div className="font-mono text-[10px] text-slate-400">{surg.mrn}</div>
                    </td>
                    <td className="px-4 py-3.5 max-w-xs">
                      <div className="font-bold text-slate-800 line-clamp-1">{surg.procedureAr}</div>
                      <div className="text-[11px] text-slate-500">{surg.anesthesiaType}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-secondary-500" />
                        {surg.scheduledDate}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">{surg.timeSlot}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-slate-800 flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {surg.hospital}
                      </div>
                      <div className="text-[10px] text-teal-700 font-semibold">{surg.surgeon}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          surg.status === 'scheduled'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {surg.status === 'scheduled' ? 'مجدولة ومؤكدة' : 'مكتملة بنجاح'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {surg.status === 'scheduled' ? (
                        <button
                          type="button"
                          onClick={() => markCompleted(surg.id)}
                          className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 transition-colors"
                        >
                          تأكيد الاكتمال
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">في التأهيل</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
