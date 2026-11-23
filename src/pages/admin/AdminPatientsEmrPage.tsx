import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Download,
  Eye,
  FileCheck,
  FileHeart,
  FilePlus,
  FileText,
  Filter,
  Image as ImageIcon,
  Phone,
  Printer,
  Search,
  Stethoscope,
  User,
  UserCheck,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useLanguage } from '../../context/LanguageContext';

interface PatientRecord {
  id: string;
  mrn: string; // Medical Record Number
  fullName: string;
  phone: string;
  age: number;
  gender: 'ذكر' | 'أنثى';
  city: string;
  diagnosis: string;
  doctorInCharge: string;
  lastVisit: string;
  status: 'active' | 'completed' | 'surgery_scheduled';
  mriAvailable: boolean;
  historySummary: string;
  treatmentPlan: string;
  medications: string[];
}

const samplePatients: PatientRecord[] = [
  {
    id: 'pat-101',
    mrn: 'MRN-2026-084',
    fullName: 'يحيى عبد الكريم المحمدي',
    phone: '777123456',
    age: 44,
    gender: 'ذكر',
    city: 'صنعاء',
    diagnosis: 'انزلاق غضروفي قطني ضاغط L4-L5 مع اعتلال الجذور وعرق النسا الأيمن',
    doctorInCharge: 'د. محمد عبدالله الجرباني',
    lastVisit: '2026-11-20',
    status: 'active',
    mriAvailable: true,
    historySummary: 'ألم أسفل الظهر يمتد إلى الساق اليمنى منذ 6 أشهر، خدر وضعف حركة أصابع القدم.',
    treatmentPlan: 'برنامج نوديسك المكثف لتأهيل الألم وإزالة الضغط الفقري غير الجراحي + حقن جذور الأعصاب الموجه.',
    medications: ['بريجابالين 75mg', 'سيلوكوكسيب 200mg', 'ميثيل كوبالامين 500mcg'],
  },
  {
    id: 'pat-102',
    mrn: 'MRN-2026-079',
    fullName: 'فاطمة صالح الهمداني',
    phone: '772987654',
    age: 52,
    gender: 'أنثى',
    city: 'إب',
    diagnosis: 'تضيق القناة الفقرية العنقية C5-C6 مع خدر وتنميل اليدين',
    doctorInCharge: 'د. محمد عبدالله الجرباني',
    lastVisit: '2026-11-18',
    status: 'surgery_scheduled',
    mriAvailable: true,
    historySummary: 'صعوبة في مسك الأشياء الدقيقة، آلام مستمرة في الرقبة والكتفين منذ سنة.',
    treatmentPlan: 'مجدولة لعملية ميكروسكوبية لاستئصال الغضروف وتثبيت قفص كربوني ديناميكي PEEK.',
    medications: ['جابابنتين 300mg', 'مرخي عضلات تيزانيدين 2mg'],
  },
  {
    id: 'pat-103',
    mrn: 'MRN-2026-065',
    fullName: 'سلطان مصلح الحكيمي',
    phone: '771456789',
    age: 38,
    gender: 'ذكر',
    city: 'تعز',
    diagnosis: 'انزلاق غضروفي قطني L5-S1 تعافى تماماً بنسبة 95%',
    doctorInCharge: 'د. محمد عبدالله الجرباني',
    lastVisit: '2026-11-10',
    status: 'completed',
    mriAvailable: true,
    historySummary: 'أكمل 3 أسابيع في مركز نوديسك لتأهيل الألم دون الحاجة لأي تدخل جراحي.',
    treatmentPlan: 'تم استكمال برنامج التأهيل بنجاح، يواصل التمارين المنزلية الوقائية.',
    medications: ['فيتامين ب المركب عند اللزوم'],
  },
  {
    id: 'pat-104',
    mrn: 'MRN-2026-051',
    fullName: 'نجوى أحمد السياغي',
    phone: '773654321',
    age: 29,
    gender: 'أنثى',
    city: 'ذمار',
    diagnosis: 'صداع التوتر المزمن وألم الفقار الرقبية العضلي',
    doctorInCharge: 'د. محمد عبدالله الجرباني',
    lastVisit: '2026-11-22',
    status: 'active',
    mriAvailable: false,
    historySummary: 'نوبات صداع مستمرة مرتبطة بالجلوس المكتبي الطويل وتشنج عضلات الرقبة والكتفين.',
    treatmentPlan: 'جلسات الارتجاع البيولوجي (Biofeedback) والعلاج الوظيفي Ergonomics.',
    medications: ['مكملات المغنيسيوم', 'جلسات علاج فيزيائي'],
  },
];

export const AdminPatientsEmrPage: React.FC = () => {
  const { lang } = useLanguage();
  const [patients, setPatients] = useState<PatientRecord[]>(samplePatients);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(samplePatients[0]);
  const [printModal, setPrintModal] = useState(false);
  const [showMriModal, setShowMriModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = patients.filter(
    (p) =>
      p.fullName.includes(searchQuery) ||
      p.phone.includes(searchQuery) ||
      p.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.diagnosis.includes(searchQuery)
  );

  return (
    <AdminLayout
      titleAr="السجلات الطبية والملف الإلكتروني للمرضى (EMR)"
      titleEn="Electronic Medical Records (EMR)"
    >
      <div className="space-y-6">
        {/* Toast */}
        {toast && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{toast}</span>
          </div>
        )}

        {/* Top Action Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1 min-w-[280px] relative">
            <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث باسم المريض، رقم الهاتف، رقم الملف (MRN)، أو التشخيص..."
              className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 focus:border-[#0F4C5C]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => showToast('تم فتح نافذة إضافة ملف طبي لمريض جديد')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F4C5C] text-white text-xs font-bold hover:bg-[#093542] transition-colors"
            >
              <FilePlus className="w-4 h-4" />
              <span>فتح ملف مريض جديد</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Patient List & Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Patient Directory List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold text-slate-500 px-1">
              إجمالي ملفات المرضى المسجلين: {filtered.length} مريض
            </div>

            <div className="space-y-2.5 max-h-[750px] overflow-y-auto pe-1">
              {filtered.map((pat) => {
                const isSelected = selectedPatient?.id === pat.id;
                return (
                  <div
                    key={pat.id}
                    onClick={() => setSelectedPatient(pat)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      isSelected
                        ? 'border-[#0F4C5C] bg-teal-50/40 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                          <User className="w-4 h-4 text-[#0F4C5C]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{pat.fullName}</h4>
                          <span className="font-mono text-[11px] text-[#0F4C5C] font-semibold">{pat.mrn}</span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          pat.status === 'active'
                            ? 'bg-sky-50 text-sky-800 border border-sky-200'
                            : pat.status === 'surgery_scheduled'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {pat.status === 'active'
                          ? 'قيد العلاج والتأهيل'
                          : pat.status === 'surgery_scheduled'
                          ? 'مجدول لجراحة'
                          : 'تعافى بنجاح'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-2">{pat.diagnosis}</p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1 font-mono">
                        <Phone className="w-3 h-3" />
                        <span dir="ltr">{pat.phone}</span>
                      </span>
                      <span>آخر زيارة: {pat.lastVisit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Patient Detail Profile & Actions (7 cols) */}
          <div className="lg:col-span-7">
            {selectedPatient ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm sticky top-6">
                {/* Header Profile */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-xl text-slate-900">
                        {selectedPatient.fullName}
                      </h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0F4C5C] font-mono font-bold border border-teal-200">
                        {selectedPatient.mrn}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {selectedPatient.gender} • {selectedPatient.age} سنة • المدينة: {selectedPatient.city} • هاتف: <span dir="ltr" className="font-mono">{selectedPatient.phone}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPrintModal(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>طباعة تقرير طبي</span>
                    </button>

                    {selectedPatient.mriAvailable && (
                      <button
                        type="button"
                        onClick={() => setShowMriModal(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F4C5C] hover:bg-[#093542] text-white text-xs font-bold transition-colors"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>صور الرنين والأشعة</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Medical Diagnosis & Doctor */}
                <div className="bg-slate-50 rounded-xl p-4 space-y-2 border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">التشخيص الطبي المعتمد:</span>
                    <span className="text-xs font-bold text-[#0F4C5C] flex items-center gap-1">
                      <Stethoscope className="w-3.5 h-3.5" />
                      {selectedPatient.doctorInCharge}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    {selectedPatient.diagnosis}
                  </p>
                </div>

                {/* History & Symptoms */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-700">التاريخ المرضي والأعراض السريرية:</h4>
                  <p className="text-xs text-slate-600 bg-white border border-slate-200 p-3 rounded-xl leading-relaxed">
                    {selectedPatient.historySummary}
                  </p>
                </div>

                {/* Treatment Plan */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-700">الخطة العلاجية والتأهيلية الموصى بها:</h4>
                  <p className="text-xs text-teal-900 bg-teal-50/70 border border-teal-200 p-3 rounded-xl leading-relaxed font-medium">
                    {selectedPatient.treatmentPlan}
                  </p>
                </div>

                {/* Prescribed Medications */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700">الأدوية والوصفة الحالية:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.medications.map((med, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-mono text-xs font-medium border border-slate-200 flex items-center gap-1.5"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        {med}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500">
                    آخر تحديث للملف: {selectedPatient.lastVisit}
                  </span>
                  <button
                    type="button"
                    onClick={() => showToast('تم حفظ ملاحظة جديدة في الملف الطبي')}
                    className="text-[#0F4C5C] font-bold hover:underline"
                  >
                    + إضافة ملاحظة سريرية جديدة
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
                اختر مريضاً من القائمة لاستعراض الملف الطبي الإلكتروني
              </div>
            )}
          </div>
        </div>

        {/* MRI Scans Modal Simulation */}
        {showMriModal && selectedPatient && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 text-white rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-slate-700 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-teal-400" />
                  <h3 className="font-bold text-base">عارض الأشعة والرنين المغناطيسي (MRI Viewer)</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMriModal(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="bg-black rounded-xl p-4 flex flex-col items-center justify-center min-h-[320px] border border-slate-800 relative">
                <img
                  src="/assets/medical/real_clinic_2.jpg"
                  alt="MRI Scan"
                  className="max-h-[300px] object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/doctor_real.jpg';
                  }}
                />
                <div className="absolute bottom-4 start-4 bg-black/80 px-3 py-1.5 rounded-md text-[11px] font-mono text-teal-300 border border-slate-700">
                  {selectedPatient.mrn} • Lumbar Spine MRI (T2-Sagittal)
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <p>تم رفع الفحص بواسطة المريض • معتمد من د. محمد عبدالله الجرباني</p>
                <button
                  type="button"
                  onClick={() => setShowMriModal(false)}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold"
                >
                  إغلاق العارض
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Printable Official Medical Report Modal */}
        {printModal && selectedPatient && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-8 space-y-6 text-slate-900 shadow-2xl border border-slate-200">
              {/* Report Header */}
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                <div>
                  <h2 className="font-display font-extrabold text-xl text-[#0F4C5C]">
                    عيادة الدكتور محمد عبدالله الجرباني
                  </h2>
                  <p className="text-xs text-slate-600">
                    استشاري جراحة المخ والأعصاب والعمود الفقري • مركز نوديسك لعلاج الألم والتأهيل
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">صنعاء، مركز ابن سينا الطبي • هاتف: 772070207</p>
                </div>
                <div className="text-end font-mono text-xs">
                  <p className="font-bold text-[#0F4C5C]">تقرير طبي رسمي</p>
                  <p className="text-slate-500">التاريخ: {new Date().toLocaleDateString('ar-YE')}</p>
                  <p className="text-slate-500">{selectedPatient.mrn}</p>
                </div>
              </div>

              {/* Patient Basic Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl text-xs">
                <div><span className="text-slate-500">اسم المريض:</span> <strong className="block text-slate-900">{selectedPatient.fullName}</strong></div>
                <div><span className="text-slate-500">العمر / الجنس:</span> <strong className="block text-slate-900">{selectedPatient.age} سنة ({selectedPatient.gender})</strong></div>
                <div><span className="text-slate-500">المدينة:</span> <strong className="block text-slate-900">{selectedPatient.city}</strong></div>
                <div><span className="text-slate-500">رقم الهاتف:</span> <strong className="block text-slate-900 font-mono" dir="ltr">{selectedPatient.phone}</strong></div>
              </div>

              {/* Diagnosis & Summary */}
              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">التشخيص السريري (Clinical Diagnosis):</h4>
                  <p className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-bold text-slate-900">
                    {selectedPatient.diagnosis}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-1">الخطة العلاجية والتوصيات الطبية:</h4>
                  <p className="p-3 bg-teal-50/70 rounded-lg border border-teal-200 text-teal-950 font-medium">
                    {selectedPatient.treatmentPlan}
                  </p>
                </div>
              </div>

              {/* Doctor Stamp & Signature */}
              <div className="pt-6 border-t border-slate-200 flex items-end justify-between">
                <div className="text-[11px] text-slate-400">
                  * هذا التقرير صادر إلكترونياً من المنظومة الطبية المعتمدة لمركز نوديسك
                </div>
                <div className="text-center space-y-1">
                  <p className="font-bold text-xs text-slate-900">د. محمد عبدالله الجرباني</p>
                  <p className="text-[10px] text-slate-500">استشاري جراحة المخ والأعصاب</p>
                  <div className="w-28 h-10 border border-dashed border-slate-300 rounded-md flex items-center justify-center text-[10px] text-slate-400 italic">
                    ختم العيادة والتوقيع
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPrintModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                    setPrintModal(false);
                    showToast('تم إرسال التقرير الطبي لأمر الطباعة');
                  }}
                  className="px-5 py-2 rounded-xl bg-[#0F4C5C] hover:bg-[#093542] text-white text-xs font-bold inline-flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>تأكيد الطباعة الرسمية</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
